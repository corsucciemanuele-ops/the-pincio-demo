"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Manifesto del luogo — la prima cosa che si legge dopo la frase Pineta.
 * Spina del brand: immersione, non vista. Testo blindato (non riscrivere).
 */
export default function Manifesto() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-mani]", {
        y: 30,
        autoAlpha: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.18,
        scrollTrigger: { trigger: el, start: "top 78%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" className="relative bg-cream">
      <div ref={root} className="container-edge max-w-4xl py-28 text-center sm:py-40">
        {/* prima riga: la spina del brand, in evidenza */}
        <h2
          data-mani
          className="font-display text-[clamp(2.2rem,6vw,5rem)] font-light leading-[1.04] text-ink"
        >
          Non una vista da osservare.
          <br />
          <em className="italic text-sage">Un luogo in cui entrare.</em>
        </h2>

        <p
          data-mani
          className="mx-auto mt-10 max-w-2xl text-[clamp(1.05rem,2vw,1.4rem)] leading-relaxed text-stone"
        >
          Sul colle, immersi nel Montefeltro: piscina, tramonti e sere
          d&apos;estate.
        </p>

        <p
          data-mani
          className="mt-6 font-display text-[clamp(1.3rem,3vw,2.1rem)] font-light italic text-graphite"
        >
          The Pincio è un invito a rallentare.
        </p>
      </div>
    </section>
  );
}
