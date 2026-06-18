"use client";

const WORDS = [
  "Montefeltro",
  "Luce",
  "Piscina",
  "Verde",
  "Aperitivo",
  "Le sere",
  "Sassocorvaro",
  "Il Colle",
  "Nido del Corvo",
];

/**
 * Place/world marquee. Uses a global CSS keyframe class (.marquee-track) that
 * ALWAYS animates — no hover, no JS, not disabled by reduced-motion — so it
 * scrolls on touch devices too. Two identical tracks for a seamless loop.
 */
export default function Marquee() {
  const Track = () => (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden>
      {WORDS.map((w, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="font-display text-2xl text-graphite sm:text-3xl">{w}</span>
          <span className="text-gold">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="relative overflow-hidden border-y border-ink/10 bg-ivory py-7">
      <div className="marquee-track">
        <Track />
        <Track />
      </div>
    </section>
  );
}
