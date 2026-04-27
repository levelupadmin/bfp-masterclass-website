import { NextResponse } from "next/server";
import { z } from "zod";

const RegisterSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(254),
  phone: z.string().min(7).max(20),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = RegisterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // TODO: integrate the real CRM. Suggested options:
  //   - Resend transactional email + Google Sheet (via Apps Script webhook)
  //   - ConvertKit / Mailchimp form subscribe
  //   - Tally / Typeform webhook
  // For now we log the submission server-side so you can see it during dev.
  // eslint-disable-next-line no-console
  console.log("[BFP] new registration:", {
    ...parsed.data,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
