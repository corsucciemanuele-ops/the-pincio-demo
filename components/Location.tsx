"use client";

import HeadingReveal from "./HeadingReveal";
import Reveal from "./Reveal";

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

        {/* Stylised map plate */}
        <Reveal className="relative">
          <a
            data-reveal-child
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="grain group relative block aspect-[4/3] w-full overflow-hidden rounded-[2px]"
            style={{
              background:
                "linear-gradient(160deg, #DFE5DB 0%, #C3D0C6 50%, #9FB1A3 100%)",
            }}
          >
            {/* Lake shape */}
            <svg
              viewBox="0 0 400 300"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <path
                d="M40 180 C 90 130 140 150 190 150 C 250 150 300 120 360 160 C 380 200 320 240 250 235 C 170 228 90 250 50 220 Z"
                fill="#7E988A"
                opacity="0.55"
              />
              <path
                d="M0 90 C 80 70 140 110 220 90 C 300 70 360 100 400 80"
                fill="none"
                stroke="#4E5A50"
                strokeWidth="1"
                opacity="0.4"
              />
              <g>
                <circle cx="250" cy="150" r="6" fill="#A98E5F" />
                <circle
                  cx="250"
                  cy="150"
                  r="14"
                  fill="none"
                  stroke="#A98E5F"
                  strokeWidth="1"
                  className="origin-center transition-transform duration-700 group-hover:scale-150"
                  style={{ transformBox: "fill-box" }}
                />
              </g>
            </svg>
            <span className="label absolute bottom-6 left-6 text-ink/70">
              The Pincio · Il Colle
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
