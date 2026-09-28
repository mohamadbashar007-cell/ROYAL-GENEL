import { z } from "zod";

const singleLine = (label: string, maxLength: number) =>
  z
    .string()
    .trim()
    .min(2, `${label} must be at least 2 characters.`)
    .max(maxLength, `${label} must be ${maxLength} characters or fewer.`)
    .refine((value) => !/[\r\n\u0000-\u001f\u007f]/.test(value), {
      message: `${label} must be on one line.`,
    });

export const inquirySchema = z
  .object({
    name: singleLine("Name", 120),
    email: z
      .string()
      .trim()
      .max(254, "Email address is too long.")
      .email("Enter a valid email address."),
    company: z
      .string()
      .trim()
      .max(160, "Company must be 160 characters or fewer.")
      .refine((value) => !/[\r\n\u0000-\u001f\u007f]/.test(value), {
        message: "Company must be on one line.",
      })
      .optional()
      .default(""),
    message: z
      .string()
      .trim()
      .min(10, "Message must be at least 10 characters.")
      .max(5000, "Message must be 5,000 characters or fewer."),
    // A visually hidden field in the form. Real visitors leave it empty.
    website: z.string().max(250).optional().default(""),
  })
  .strict();

export type Inquiry = z.infer<typeof inquirySchema>;

export function formatInquiryText(inquiry: Inquiry): string {
  return [
    "New trade inquiry from the Royal Genel Overseas Trading website",
    "",
    `Name: ${inquiry.name}`,
    `Company: ${inquiry.company || "Not provided"}`,
    `Email: ${inquiry.email}`,
    "",
    "Message:",
    inquiry.message,
  ].join("\n");
}
