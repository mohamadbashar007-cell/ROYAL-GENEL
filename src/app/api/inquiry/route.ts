import { NextResponse } from "next/server";
import { formatInquiryText, inquirySchema } from "../../../lib/inquiry";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_384;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

type RateLimitEntry = { count: number; resetAt: number };

// Best effort per process. A shared store is needed for a global limit across
// serverless instances, but this still curbs accidental repeated submissions.
const rateLimits = new Map<string, RateLimitEntry>();

function json(body: Record<string, unknown>, status: number, extraHeaders?: HeadersInit) {
  const headers = new Headers(extraHeaders);
  headers.set("Cache-Control", "no-store");
  return NextResponse.json(body, {
    status,
    headers,
  });
}

function clientKey(request: Request): string {
  // These headers are set by common hosting proxies. They are a best effort
  // identity and should not be treated as an authentication boundary.
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  ).slice(0, 100);
}

function rateLimit(key: string): number | null {
  const now = Date.now();
  const current = rateLimits.get(key);

  if (rateLimits.size >= 2000) {
    for (const [entryKey, entry] of rateLimits) {
      if (entry.resetAt <= now) rateLimits.delete(entryKey);
    }
    // Bound memory if many different addresses reach a long-lived process.
    if (rateLimits.size >= 5000 && !current) {
      const oldestKey = rateLimits.keys().next().value;
      if (oldestKey) rateLimits.delete(oldestKey);
    }
  }

  if (!current || now >= current.resetAt) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  } else if (current.count >= RATE_LIMIT_MAX) {
    return Math.max(1, Math.ceil((current.resetAt - now) / 1000));
  } else {
    current.count += 1;
  }

  return null;
}

class BodyTooLargeError extends Error {}

async function readJson(request: Request): Promise<unknown> {
  if (!request.body) return null;

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let byteCount = 0;
  let text = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      byteCount += value.byteLength;
      if (byteCount > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new BodyTooLargeError();
      }

      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } finally {
    reader.releaseLock();
  }

  return JSON.parse(text);
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!/^application\/json(?:\s*;|$)/i.test(contentType)) {
    return json({ ok: false, error: "Send the inquiry as JSON." }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Inquiry is too large." }, 413);
  }

  const retryAfter = rateLimit(clientKey(request));
  if (retryAfter !== null) {
    return json(
      { ok: false, error: "Too many inquiries. Please try again later." },
      429,
      { "Retry-After": String(retryAfter) },
    );
  }

  let input: unknown;
  try {
    input = await readJson(request);
  } catch (error) {
    if (error instanceof BodyTooLargeError) {
      return json({ ok: false, error: "Inquiry is too large." }, 413);
    }
    return json({ ok: false, error: "Invalid JSON request." }, 400);
  }

  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      fields[field] ??= issue.message;
    }
    return json({ ok: false, error: "Please review the form and try again.", fields }, 400);
  }

  if (parsed.data.website.trim()) {
    return json({ ok: false, error: "Unable to submit this inquiry." }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.INQUIRY_TO_EMAIL?.trim();
  const from = process.env.INQUIRY_FROM_EMAIL?.trim();

  if (!apiKey || !to || !from) {
    return json(
      { ok: false, error: "Online inquiries are currently unavailable. Please check back later." },
      503,
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: parsed.data.email,
        subject: "New trade inquiry | Royal Genel Overseas Trading",
        text: formatInquiryText(parsed.data),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    const result: unknown = await response.json().catch(() => null);
    if (
      !response.ok ||
      !result ||
      typeof result !== "object" ||
      !("id" in result) ||
      typeof result.id !== "string" ||
      !result.id
    ) {
      console.error("Inquiry delivery was not accepted by the mail provider.", {
        providerStatus: response.status,
      });
      return json(
        { ok: false, error: "We could not send your inquiry. Please try again later." },
        502,
      );
    }

    return json({ ok: true, message: "Your inquiry has been sent. We will be in touch soon." }, 200);
  } catch {
    // Keep the inquiry and credentials out of server logs and responses.
    console.error("Inquiry delivery failed due to a transport error.");
    return json(
      { ok: false, error: "We could not send your inquiry. Please try again later." },
      502,
    );
  }
}
