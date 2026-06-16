"use client";

const WORDS = [
  "Piscina",
  "Bordo acqua",
  "Aperitivo",
  "Le sere",
  "Montefeltro",
  "Sassocorvaro",
  "Il Colle",
  "Nido del Corvo",
  "Lago di Mercatale",
];

/**
 * Place/world marquee. Pure CSS transform animation so it scrolls on touch
 * too (no JS, no hover dependency). Two identical tracks slide left for a
 * seamless loop.
 */
export default function Marquee() {
  const Track = () => (
    <div className="mq-track flex shrink-0 items-center gap-10 pr-10" aria-hidden>
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
      <div className="mq-row flex w-max">
        <Track />
        <Track />
      </div>
      <style jsx>{`
        .mq-row {
          animation: mq 38s linear infinite;
          will-change: transform;
        }
        @keyframes mq {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mq-row { animation: none; }
        }
      `}</style>
    </section>
  );
}
