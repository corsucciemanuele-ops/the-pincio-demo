import { NextResponse } from "next/server";

/**
 * Invite list endpoint.
 *
 * Prototype: validates input and returns ok. To collect for real, plug a list
 * here — e.g. Supabase insert, or a mail provider (Mailchimp/Resend). Add the
 * credentials as env vars and replace the TODO block.
 */
export async function POST(req: Request) {
  let email = "";
  let consent = false;
  try {
    const body = await req.json();
    email = String(body?.email ?? "").trim();
    consent = Boolean(body?.consent);
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!valid || !consent) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  // TODO: persist to a real list (Supabase / Resend / Mailchimp) using env vars.
  // Example (Supabase):
  //   await supabase.from("invites").insert({ email, consent, ts: new Date() });
  console.log("[invito] signup:", email, "consent:", consent);

  return NextResponse.json({ ok: true });
}
