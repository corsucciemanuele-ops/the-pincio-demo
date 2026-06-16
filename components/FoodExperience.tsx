"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import DepthScene from "./depth/DepthScene";
import HeadingReveal from "./HeadingReveal";

type Dish = { name: string; note: string; plate: string; food: string };

// Placeholder plating — engineered to be swapped for real photography.
// Drop a real image into the .dish-photo slot and remove the gradients.
const DISHES: Dish[] = [
  { name: "Crudo di lago", note: "Apertura", plate: "#F4EFE6", food: "radial-gradient(circle at 50% 45%, #F0A39A, #D9685F 60%, transparent 72%)" },
  { name: "Tagliolini, agrumi", note: "Primo", plate: "#F2ECE0", food: "radial-gradient(circle at 50% 50%, #F2C56A, #D99A3C 62%, transparent 74%)" },
  { name: "Pesce, erbe del colle", note: "Secondo", plate: "#F4EFE6", food: "radial-gradient(circle at 50% 48%, #CDE3C2, #88B07E 60%, transparent 73%)" },
  { name: "Dolce al tramonto", note: "Fine", plate: "#F2ECE0", food: "radial-gradient(circle at 50% 50%, #F4B79C, #E4806A 60%, transparent 74%)" },
];

export default function FoodExperience() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-dish]").forEach((card, i) => {
        // Emerge from depth: rise + scale + fade as it enters.
        gsap.fromTo(
          card,
          { y: 90, scale: 0.9, autoAlpha: 0 },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: (i % 2) * 0.08,
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
        // Continuous gentle float + parallax lift through the section.
        gsap.to(card, {
          yPercent: -12 - (i % 3) * 6,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="food" ref={root} className="relative overflow-hidden bg-whitewash">
      {/* warm light wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 80% 0%, rgba(255,193,120,0.18), transparent 60%)" }}
      />
      <div className="container-edge relative z-10 py-28 sm:py-36">
        <div className="max-w-3xl">
          <p className="label mb-6 text-terracotta">Food Experience</p>
          <HeadingReveal
            className="font-display text-[clamp(2.2rem,5vw,4.4rem)] font-light leading-[1.02] text-ink"
            lines={["La mano del Nido del Corvo,", <em key="i" className="italic text-coral">più libera.</em>]}
          />
          <p className="mt-7 max-w-md leading-relaxed text-stone">
            Piatti che seguono la luce: crudi, primi, pesce d&apos;acqua dolce,
            dolci al tramonto. Ogni portata, una piccola scena.
          </p>
        </div>

        <DepthScene className="relative mt-20" intensity={1.2} perspective={900}>
          <div className="grid grid-cols-2 gap-6 sm:gap-10 lg:grid-cols-4">
            {DISHES.map((d, i) => (
              <article
                key={i}
                data-dish
                className="dish group"
                style={{ marginTop: `${(i % 2) * 36}px` }}
              >
                <div className="dish-tilt relative aspect-square w-full overflow-hidden rounded-full shadow-[0_40px_60px_-30px_rgba(60,40,20,0.5)] ring-1 ring-black/5">
                  {/* PLATE — replace this block with a real photo */}
                  <div className="dish-photo absolute inset-0" style={{ background: d.plate }}>
                    <div className="absolute inset-[14%] rounded-full" style={{ background: d.food }} />
                    <div className="absolute inset-0 rounded-full" style={{ boxShadow: "inset 0 10px 26px -10px rgba(0,0,0,0.18)" }} />
                  </div>
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <p className="font-display text-xl text-ink">{d.name}</p>
                  <span className="label text-stone">{d.note}</span>
                </div>
              </article>
            ))}
          </div>
        </DepthScene>
      </div>

      <style jsx>{`
        .dish-tilt {
          transform: perspective(900px)
            rotateX(calc(var(--my, 0) * -7deg))
            rotateY(calc(var(--mx, 0) * 7deg));
          transition: transform 0.25s ease-out, box-shadow 0.5s ease;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .dish:hover .dish-tilt {
          transform: perspective(900px)
            rotateX(calc(var(--my, 0) * -7deg))
            rotateY(calc(var(--mx, 0) * 7deg)) translateZ(30px) scale(1.03);
        }
      `}</style>
    </section>
  );
}
