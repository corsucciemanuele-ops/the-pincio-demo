"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import DepthScene from "./depth/DepthScene";
import HeadingReveal from "./HeadingReveal";
import MediaSlot from "./MediaSlot";

type Dish = { name: string; note: string; slot: string; poster: string };

// Reserved, graded frames — drop real plating photography into the slots.
const DISHES: Dish[] = [
  { name: "Crudo di lago", note: "Apertura", slot: "food-1", poster: "linear-gradient(160deg,#F3E7CE,#E1B98E 60%,#B07A4E)" },
  { name: "Tagliolini, agrumi", note: "Primo", slot: "food-2", poster: "linear-gradient(160deg,#F4ECD6,#E6C77E 60%,#C08A3C)" },
  { name: "Pesce, erbe del colle", note: "Secondo", slot: "food-3", poster: "linear-gradient(160deg,#EAE9D0,#AEC29A 60%,#6E8A66)" },
  { name: "Dolce al tramonto", note: "Fine", slot: "food-4", poster: "linear-gradient(160deg,#F4DAC6,#E68E72 58%,#B0506A)" },
];

export default function FoodExperience() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-dish]").forEach((card, i) => {
        gsap.to(card, {
          yPercent: -10 - (i % 3) * 6,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="food" ref={root} className="relative overflow-hidden bg-whitewash">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 82% 0%, rgba(255,193,120,0.16), transparent 60%)" }}
      />
      <div className="container-edge relative z-10 py-28 sm:py-36">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.png" alt="" className="h-6 w-auto opacity-80" />
            <p className="label text-terracotta">Food Experience</p>
          </div>
          <HeadingReveal
            className="font-display text-[clamp(2.2rem,5vw,4.4rem)] font-light leading-[1.02] text-ink"
            lines={["La mano del Nido del Corvo,", <em key="i" className="italic text-coral">più libera.</em>]}
          />
          <p className="mt-7 max-w-md leading-relaxed text-stone">
            Piatti che seguono la luce: crudi, primi, pesce d&apos;acqua dolce,
            dolci al tramonto. Ogni portata, una piccola scena.
          </p>
        </div>

        <DepthScene className="relative mt-20" intensity={1.1} perspective={1100}>
          <div className="grid grid-cols-2 gap-5 sm:gap-8 lg:grid-cols-4">
            {DISHES.map((d, i) => (
              <article key={i} data-dish className="dish group" style={{ marginTop: `${(i % 2) * 40}px` }}>
                <div className="dish-tilt">
                  <MediaSlot
                    slot={d.slot}
                    poster={d.poster}
                    className="aspect-[3/4] w-full rounded-[3px] shadow-[0_44px_70px_-34px_rgba(60,40,20,0.55)] ring-1 ring-black/5"
                    overlay="linear-gradient(to top, rgba(20,12,8,0.35), transparent 55%)"
                  >
                    <div className="absolute bottom-5 left-5 z-10">
                      <p className="font-display text-xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">{d.name}</p>
                      <span className="label text-white/70">{d.note}</span>
                    </div>
                  </MediaSlot>
                </div>
              </article>
            ))}
          </div>
        </DepthScene>
      </div>

      <style jsx>{`
        .dish-tilt {
          transform: perspective(1100px) rotateX(calc(var(--my, 0) * -6deg)) rotateY(calc(var(--mx, 0) * 6deg));
          transition: transform 0.3s ease-out;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .dish:hover .dish-tilt {
          transform: perspective(1100px) rotateX(calc(var(--my, 0) * -6deg)) rotateY(calc(var(--mx, 0) * 6deg)) translateZ(26px) scale(1.03);
        }
      `}</style>
    </section>
  );
}
