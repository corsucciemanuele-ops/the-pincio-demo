"use client";

import HeadingReveal from "./HeadingReveal";
import Reveal from "./Reveal";
import LocationScene from "./scenes/LocationScene";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Sassocorvaro+Auditore+Lago+di+Mercatale";

export default function Location() {
  return (
    <section id="dove" className="relative border-t border-ink/10 bg-ivory">
      <div className="container-edge grid grid-cols-1 gap-14 py-28 sm:py-36 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="label mb-8 text-stone">Dove siamo</p>
          <HeadingReveal
            className="max-w-md font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1] text-ink"
            lines={[
              "Una terrazza naturale",
              "sul Lago di Mercatale.",
            ]}
          />
          <Reveal className="mt-8">
            <p data-reveal-child className="max-w-sm leading-relaxed text-stone">
              Sullo stesso colle del Ristorante Sul Colle — Nido del Corvo.
            </p>
            <div data-reveal-child className="mt-10">
              <p className="label text-stone">
                Via Colle Igea 22/B — Sassocorvaro Auditore (PU)
              </p>
              <p className="label mt-1 text-stone">Marche, Italia</p>
            </div>
            <a
              data-reveal-child
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="label mt-8 inline-block border-b border-sage pb-1 text-sage transition-colors duration-300 hover:text-sage-deep"
            >
              Apri in Google Maps ↗
            </a>
          </Reveal>
        </div>

        {/* Montefeltro landscape — the colle over the lake */}
        <Reveal className="relative">
          <a
            data-reveal-child
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[3px] shadow-[0_40px_80px_-44px_rgba(40,30,20,0.55)] ring-1 ring-black/5"
          >
            <LocationScene />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            {/* location pin */}
            <span className="absolute left-[58%] top-[58%] z-10 flex h-3 w-3 -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-soft/60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-gold shadow" />
            </span>
            <span className="label absolute bottom-6 left-6 z-10 text-cream/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
              The Pincio · Il Colle
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
