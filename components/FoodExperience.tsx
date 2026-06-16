"use client";

import HeadingReveal from "./HeadingReveal";
import Reveal from "./Reveal";

/**
 * Bites — not a tasting menu. Aperitivo, finger food, cocktail, poolside.
 * No photography until there are real Pincio shots (placeholder by design).
 */
export default function FoodExperience() {
  return (
    <section id="food" className="relative overflow-hidden bg-whitewash">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 82% 0%, rgba(255,193,120,0.14), transparent 60%)" }}
      />
      <div className="container-edge relative z-10 py-28 sm:py-36">
        <div className="mb-6 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.svg" alt="" className="h-6 w-auto opacity-80" />
          <p className="label text-terracotta">Bites</p>
        </div>

        <HeadingReveal
          className="max-w-3xl font-display text-[clamp(2.2rem,5vw,4.4rem)] font-light leading-[1.02] text-ink"
          lines={["Bites, non portate.", <em key="i" className="italic text-coral">Più libera, più leggera.</em>]}
        />

        <Reveal className="mt-8 max-w-xl">
          <p data-reveal-child className="text-lg leading-relaxed text-stone">
            La mano del Nido del Corvo, in versione bordo piscina. Aperitivo
            lungo, finger food, cocktail. Piccole cose, fatte bene.
          </p>
        </Reveal>

        {/* Awaiting real Pincio photography */}
        <Reveal className="mt-14">
          <div
            data-reveal-child
            className="flex aspect-[16/7] w-full items-center justify-center rounded-[3px] border border-ink/10 bg-ivory/60"
          >
            <p className="label text-mist">Le immagini del Pincio, presto</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
