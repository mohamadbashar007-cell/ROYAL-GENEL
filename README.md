# Royal Genel Overseas Trading

A responsive, English-language website for Royal Genel Overseas Trading, built with **Next.js 16, React 19, and TypeScript**. It includes four pages, original brand imagery, SEO metadata, and a server-side inquiry endpoint.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For a production run:

```bash
npm run build
npm run start
```

Quality checks:

```bash
npm run typecheck
npm run lint
```

## Pages and code

| Route | Purpose |
| --- | --- |
| `/` | Editorial homepage and service overview |
| `/about` | Company story, values, and Istanbul perspective |
| `/services` | Trading services, process, and FAQ |
| `/contact` | Inquiry form and location |
| `/api/inquiry` | Validated server-side email delivery |

Pages live in `src/app`, shared interface components in `src/components`, and original images in `public/images`. Global styles are in `src/app/globals.css`. The earlier static prototype is preserved in `legacy-static/` for reference; Next.js does not use it.

## Enable inquiry delivery

The company has not supplied an official email address yet. By default, the contact form lets visitors **copy** a prepared inquiry. It does not claim to send it.

When the official address is available, copy `.env.example` to `.env.local` and set:

```dotenv
RESEND_API_KEY=your_resend_api_key
INQUIRY_TO_EMAIL=official_company_email@example.com
INQUIRY_FROM_EMAIL=Royal Genel <inquiries@verified-sending-domain.com>
NEXT_PUBLIC_SITE_URL=https://your-real-domain.example
```

Verify the sending domain with Resend, then restart or rebuild the app. The contact page switches to **Send inquiry** and posts to `/api/inquiry`. The endpoint validates fields, checks a hidden spam field, applies a best-effort in-memory rate limit, and returns an error if delivery cannot be confirmed. No message contents or credentials are logged.

For production at scale, use a shared rate-limit store across server instances. Set `NEXT_PUBLIC_SITE_URL` to the live public URL so social metadata and the sitemap resolve correctly.

## Content and assets

The public copy intentionally avoids invented company history, trade volumes, partner counts, contact details, and product categories. Replace it with verified company information before launch.

The four photographs in `public/images` were created for this project using the built-in image generation tool. Prompts used:

- `hero-ship.png`: Premium editorial photograph of a cargo ship at an Istanbul port at golden hour, crimson container accents and calm space on the left for headline text; no logos or readable text.
- `containers.png`: Premium editorial photograph of red, cream, and muted gold shipping containers at a sunlit port, geometric perspective and a partially open container with palletized goods; no logos or readable text.
- `istanbul-crossroads.png`: Photorealistic Bosphorus panorama at golden hour with Istanbul domes and minarets, a cargo vessel and subtle distant port cranes; warm gold and deep burgundy, dark left third for copy; no text or logos.
- `trade-detail.png`: Photorealistic close-up of export logistics with unbranded wrapped cartons, a burgundy container, and blank paperwork on a clipboard; warm side light and no readable text or logos.
