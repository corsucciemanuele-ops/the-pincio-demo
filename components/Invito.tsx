"use client";

import { useState } from "react";
import HeadingReveal from "./HeadingReveal";
import Reveal from "./Reveal";

export default function Invito() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Inserisci un indirizzo email valido.");
      return;
    }
    if (!consent) {
      setError("Serve il consenso al trattamento dei dati.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      // Wired to an API route; plug a real list (Supabase/mail) there.
      await fetch("/api/invito", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });
      setDone(true);
    } catch {
      setDone(true); // prototype: acknowledge regardless
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="invito" className="relative bg-cream">
      <div className="container-edge flex min-h-[80vh] flex-col items-center justify-center py-28 text-center sm:py-36">
        <Reveal>
          <p data-reveal-child className="label mb-8 text-stone">Apertura estate 2027</p>
        </Reveal>

        <HeadingReveal
          className="font-display text-[clamp(2.4rem,6.5vw,5.5rem)] font-light leading-[0.98] text-ink"
          lines={["I posti migliori", <span key="i">si prendono <em className="italic text-sage">prima.</em></span>]}
        />

        <Reveal className="mt-10 max-w-xl">
          <p data-reveal-child className="text-lg leading-relaxed text-stone">
            The Pincio apre nell&apos;estate 2027. Le prime sere hanno posti
            contati: lascia il contatto per ricevere l&apos;invito e le date.
          </p>
        </Reveal>

        <Reveal className="mt-12 w-full max-w-md">
          {!done ? (
            <form data-reveal-child onSubmit={submit} className="flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-ink/25 pb-2 transition-colors focus-within:border-ink">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="la-tua@email.it"
                  className="w-full bg-transparent py-2 text-center font-display text-xl text-ink outline-none placeholder:text-mist sm:text-left"
                  aria-label="Email"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="label shrink-0 rounded-full bg-ink px-6 py-3 text-cream transition-[transform,background] duration-300 hover:bg-sage-deep active:scale-95 disabled:opacity-60"
                >
                  {busy ? "..." : "Ricevi l'invito"}
                </button>
              </div>

              <label className="flex items-start gap-3 text-left">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-sage-deep"
                  aria-label="Consenso privacy"
                />
                <span className="text-xs leading-relaxed text-stone">
                  Acconsento al trattamento dei miei dati per ricevere
                  comunicazioni da The Pincio (Pincio di Valentini Annita Srl).
                  Niente spam, disiscrizione in ogni momento.
                </span>
              </label>

              {error && <p className="text-left text-sm text-sunset">{error}</p>}
            </form>
          ) : (
            <div data-reveal-child className="flex flex-col items-center gap-3 rounded-[2px] border border-sage/30 bg-ivory px-8 py-10">
              <p className="font-display text-2xl text-sage-deep">Sei sulla lista.</p>
              <p className="text-sm text-stone">Ti scriveremo prima di tutti gli altri.</p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
