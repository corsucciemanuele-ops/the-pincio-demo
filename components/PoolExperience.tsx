"use client";

import FieldScene from "./scenes/FieldScene";
import HeadingReveal from "./HeadingReveal";
import Reveal from "./Reveal";

const FEATURES = ["Piscina", "Lettini", "Cocktail", "Sunset"];

/** Pool Experience — turquoise water, dynamic light, ready for real footage. */
export default function PoolExperience() {
  return (
    <section id="pool" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <FieldScene
        slot="pool"
        poster={
          "radial-gradient(70% 50% at 72% 12%, rgba(255,244,214,0.6), transparent 58%)," +
          "linear-gradient(to bottom, #8FE0E2 0%, #38B6C6 30%, #1294A6 64%, #0B6E80 100%)"
        }
        light="radial-gradient(44% 40% at 70% 14%, rgba(255,240,210,0.55), transparent 70%)"
        nearHaze="radial-gradient(80% 100% at 22% 120%, rgba(20,150,166,0.55), transparent 70%)"
        bloom={{ x: 72, y: 14, color: "rgba(255,236,196,0.45)", size: 60 }}
        vignette={0.4}
        intensity={1}
      />

      {/* dynamic light sweep across the water */}
      <div className="pool-sweep pointer-events-none absolute inset-0 mix-blend-screen" />

      {/* legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#06343c]/55 via-[#06343c]/10 to-transparent" />

      <div className="container-edge relative z-10">
        <Reveal>
          <div data-reveal-child className="mb-6 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark-white.png" alt="" className="h-6 w-auto opacity-85" />
            <p className="label text-white/80">Pool Experience</p>
          </div>
        </Reveal>
        <HeadingReveal
          className="max-w-2xl font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[0.98] text-white drop-shadow-[0_2px_18px_rgba(6,40,46,0.5)]"
          lines={["Dentro l'acqua,", <em key="i" className="italic">fino al tramonto.</em>]}
        />
        <Reveal className="mt-10 flex flex-wrap gap-3">
          {FEATURES.map((f) => (
            <button
              key={f}
              type="button"
              data-reveal-child
              className="label select-none rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-white backdrop-blur-md transition-transform duration-150 ease-out active:translate-y-0.5 active:scale-95 active:bg-white/20"
            >
              {f}
            </button>
          ))}
        </Reveal>
      </div>

      <style jsx>{`
        .pool-sweep {
          background: linear-gradient(105deg, transparent 30%, rgba(255, 255, 255, 0.22) 48%, rgba(255, 240, 210, 0.14) 52%, transparent 70%);
          background-size: 280% 100%;
          animation: sweep 9s ease-in-out infinite;
        }
        @keyframes sweep {
          0% { background-position: 140% 0; }
          100% { background-position: -60% 0; }
        }
        @media (prefers-reduced-motion: reduce) { .pool-sweep { animation: none; } }
      `}</style>
    </section>
  );
}
