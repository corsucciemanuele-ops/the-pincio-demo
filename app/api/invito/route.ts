import { NextResponse } from "next/server";

/**
 * Invite list endpoint — READY, "da cablare" a Supabase.
 *
 * Come attivarlo (zero modifiche al codice):
 *  1) Crea la tabella su Supabase:
 *       create table invites (
 *         id uuid primary key default gen_random_uuid(),
 *         email text not null,
 *         consent boolean not null default false,
 *         created_at timestamptz not null default now()
 *       );
 *  2) Su Vercel → Project → Settings → Environment Variables, aggiungi:
 *       SUPABASE_URL                = https://<progetto>.supabase.co
 *       SUPABASE_SERVICE_ROLE_KEY   = <service role key>
 *  3) Redeploy. Da quel momento gli iscritti finiscono nella tabella `invites`.
 *
 * Finché le env non ci sono: valida + registra il consenso e risponde ok
 * (nessun dato perso a livello di UX, ma NON persiste ancora).
 */
export async function POST(req: Request) {
  let email = "";
  let consent = false;
  try {
    const body = await req.json();
    email = String(body?.email ?? "").trim().toLowerCase();
    consent = Boolean(body?.consent);
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!valid || !consent) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Wired automatically once the env vars exist — no Supabase SDK needed.
  if (url && key) {
    try {
      const res = await fetch(`${url}/rest/v1/invites`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify([{ email, consent }]),
      });
      if (!res.ok) {
        const detail = await res.text();
        console.error("[invito] supabase insert failed:", res.status, detail);
        return NextResponse.json({ ok: false, error: "store_failed" }, { status: 502 });
      }
      return NextResponse.json({ ok: true, stored: true });
    } catch (e) {
      console.error("[invito] supabase error:", e);
      return NextResponse.json({ ok: false, error: "store_error" }, { status: 502 });
    }
  }

  // Not wired yet: acknowledge but flag that it is not persisted.
  console.log("[invito] (DA CABLARE — nessuna env Supabase) signup:", email, "consent:", consent);
  return NextResponse.json({ ok: true, stored: false });
}
