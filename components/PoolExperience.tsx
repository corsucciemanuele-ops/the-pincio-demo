"use client";

import DepthScene from "./depth/DepthScene";
import Layer from "./depth/Layer";
import { Grain, Vignette, Bloom } from "./depth/Atmosphere";
import { Hills, Palm, Loungers } from "./scenes/primitives";
import PoolBand from "./scenes/PoolBand";
import HeadingReveal from "./HeadingReveal";
import Reveal from "./Reveal";

const FEATURES = ["Piscina", "Lettini", "Cocktail", "Sunset"];

/** Pool Experience — turquoise water, loungers, cocktails, dynamic light. */
export default function PoolExperience() {
  return (
    <section
      id="pool"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <DepthScene className="absolute inset-0" intensity={1}>
        {/* sky */}
        <Layer depth={4} scroll={5} scale={1.16}>
          <div
            className="h-full w-full"
            style={{ background: "linear-gradient(to bottom,#7FD6DC 0%,#46BFD0 22%,#23B0C0 38%)" }}
          />
        </Layer>
        <Bloom x={72} y={14} color="rgba(255,240,210,0.6)" size={55} />
        {/* hills */}
        <Layer depth={16} scroll={9} blur={1.6}>
          <Hills color="#7FB8B6" baseline={30} amp={4} variant={1} />
        </Layer>
        {/* the pool fills most of the frame */}
        <Layer depth={40} scroll={8}>
          <div className="absolute inset-x-0 bottom-0" style={{ top: "34%" }}>
            <PoolBand
              webgl
              reflection="linear-gradient(to bottom,#9FE6E6 0%,#37BAC8 28%,#1296A6 62%,#0B7080 100%)"
              tint="#2BB6C4"
            />
          </div>
        </Layer>
        {/* dynamic light sweep across the water */}
        <Layer depth={44} scroll={6}>
          <div className="absolute inset-x-0" style={{ top: "34%", bottom: 0 }}>
            <div className="pool-sweep absolute inset-0 mix-blend-screen" />
          </div>
        </Layer>
        {/* loungers + figures on the near deck */}
        <Layer depth={66} scroll={12}>
          <div className="absolute inset-x-0" style={{ top: "30%", height: "22%" }}>
            <Loungers color="rgba(255,252,246,0.95)" shade="rgba(15,90,100,0.3)" />
          </div>
        </Layer>
        {/* palm */}
        <Layer depth={88} scroll={18} blur={0.5}>
          <div className="absolute bottom-[6%] right-[-3%]" style={{ width: "24%", height: "70%" }}>
            <Palm color="#0E3A38" flip />
          </div>
        </Layer>
        <Grain opacity={0.04} />
        <Vignette strength={0.34} />
      </DepthScene>

      {/* scrim for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#06343c]/55 via-[#06343c]/10 to-transparent" />

      {/* content */}
      <div className="container-edge relative z-10">
        <Reveal>
          <p data-reveal-child className="label mb-6 text-white/80">
            Pool Experience
          </p>
        </Reveal>
        <HeadingReveal
          className="max-w-2xl font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[0.98] text-white drop-shadow-[0_2px_18px_rgba(6,40,46,0.5)]"
          lines={["Dentro l'acqua,", <em key="i" className="italic">fino al tramonto.</em>]}
        />
        <Reveal className="mt-10 flex flex-wrap gap-3">
          {FEATURES.map((f) => (
            <span
              key={f}
              data-reveal-child
              className="label rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-white backdrop-blur-md"
            >
              {f}
            </span>
          ))}
        </Reveal>
      </div>

      <style jsx>{`
        .pool-sweep {
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255, 255, 255, 0.28) 48%,
            rgba(255, 240, 210, 0.18) 52%,
            transparent 70%
          );
          background-size: 280% 100%;
          animation: sweep 9s ease-in-out infinite;
        }
        @keyframes sweep {
          0% {
            background-position: 140% 0;
          }
          100% {
            background-position: -60% 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .pool-sweep {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
