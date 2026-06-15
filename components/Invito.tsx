"use client";

import { useState } from "react";
import HeadingReveal from "./HeadingReveal";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";

export default function Invito() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) {
      setError("Inserisci un indirizzo email valido.");
      return;
    }
    setError("");
    // Demo: no backend — acknowledge locally.
    setDone(true);
  };

  return (
    <section id="invito" className="relative bg-cream">
      <div className="container-edge flex min-h-[80vh] flex-col items-center justify-center py-28 text-center sm:py-36">
        <Reveal>
          <p data-reveal-child className="label mb-8 text-stone">
            Apertura estate 2027
          </p>
        </Reveal>

        <HeadingReveal
          className="font-display text-[clamp(2.4rem,6.5vw,5.5rem)] font-light leading-[0.98] text-ink"
          lines={[
            "I posti migliori",
            <span key="i">
              si prendono <em className="italic text-sage">prima.</em>
            </span>,
          ]}
        />

        <Reveal className="mt-10 max-w-xl">
          <p data-reveal-child className="text-lg leading-relaxed text-stone">
            The Pincio apre nell&apos;estate 2027. Lascia il tuo contatto per
            ricevere inviti, date private e aggiornamenti sull&apos;apertura.
          </p>
        </Reveal>

        <Reveal className="mt-12 w-full max-w-md">
          {!done ? (
            <form
              data-reveal-child
              onSubmit={submit}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-2 border-b border-ink/25 pb-2 focus-within:border-ink transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="la-tua@email.it"
                  className="w-full bg-transparent py-2 text-center font-display text-xl text-ink outline-none placeholder:text-mist sm:text-left"
                  aria-label="Email"
                />
                <MagneticButton
                  className="label shrink-0 rounded-full bg-ink px-6 py-3 text-cream transition-colors duration-500 hover:bg-sage-deep"
                  strength={0.25}
                >
                  Ricevi l&apos;invito
                </MagneticButton>
              </div>
              {error && (
                <p className="text-left text-sm text-sunset">{error}</p>
              )}
              <p className="text-left text-xs text-mist">
                Niente spam. Solo The Pincio.
              </p>
            </form>
          ) : (
            <div
              data-reveal-child
              className="flex flex-col items-center gap-3 rounded-[2px] border border-sage/30 bg-ivory px-8 py-10"
            >
              <p className="font-display text-2xl text-sage-deep">
                Sei sulla lista.
              </p>
              <p className="text-sm text-stone">
                Ti scriveremo prima di tutti gli altri.
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
