"use client";

import FieldScene from "./scenes/FieldScene";
import HeadingReveal from "./HeadingReveal";
import Reveal from "./Reveal";

/**
 * L'esperienza del luogo (ex "Pool Experience").
 * La piscina è il cuore, raccontata come atmosfera / immersione — non un menu
 * di servizi. La riga "Bites" vive qui dentro, leggera, nel racconto.
 */
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#06343c]/65 via-[#06343c]/15 to-transparent" />

      <div className="container-edge relative z-10">
        <Reveal>
          <div data-reveal-child className="mb-6 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark-white.svg" alt="" className="h-6 w-auto opacity-85" />
            <p className="label text-white/80">L&apos;esperienza del luogo</p>
          </div>
        </Reveal>

        <HeadingReveal
          className="max-w-2xl font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[0.98] text-white drop-shadow-[0_2px_18px_rgba(6,40,46,0.5)]"
          lines={["Dentro l'acqua,", <em key="i" className="italic">fino al tramonto.</em>]}
        />

        <Reveal className="mt-8 max-w-md">
          {/* immersione, non lista di servizi */}
          <p data-reveal-child className="text-lg leading-relaxed text-white/85 drop-shadow-[0_1px_10px_rgba(6,40,46,0.5)]">
            La piscina è il centro: acqua, pietra chiara, il verde del colle
            intorno. Un&apos;oasi disegnata, dove le ore non contano.
          </p>
          {/* riga Bites, leggera, dentro il racconto */}
          <p data-reveal-child className="mt-6 font-display text-xl italic leading-relaxed text-white/90 drop-shadow-[0_1px_10px_rgba(6,40,46,0.5)]">
            La mano del Nido del Corvo, più libera — aperitivo, bites, cocktail
            a bordo piscina.
          </p>
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
      `}</style>
    </section>
  );
}
