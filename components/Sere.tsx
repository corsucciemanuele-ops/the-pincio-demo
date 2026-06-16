"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import HeadingReveal from "./HeadingReveal";
import EventsScene from "./scenes/EventsScene";

const EVENTS = [
  { name: "Sunset aperitivo", note: "Ogni sera d'estate" },
  { name: "Cene sotto le stelle", note: "Su prenotazione" },
  { name: "Eventi privati", note: "Il colle, solo per voi" },
];

export default function Sere() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]");
      gsap.from(rows, {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: "[data-rows]", start: "top 78%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="sere" ref={root} className="relative overflow-hidden bg-[#15171F] text-cream">
      {/* Night terrace environment */}
      <EventsScene />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#10121a]/85 via-[#10121a]/45 to-transparent" />
      <div className="container-edge relative z-10 grid grid-cols-1 gap-14 py-28 sm:py-36 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label mb-6 text-cream/50">Le sere del Pincio</p>
          <HeadingReveal
            className="font-display text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.05] text-cream"
            lines={[
              "Alcune sere",
              <em key="i" className="italic text-gold-soft">
                meritano un luogo.
              </em>,
            ]}
          />
          <p className="mt-8 max-w-md leading-relaxed text-cream/70">
            Aperitivi al tramonto, cene sotto le stelle, musica dal vivo ed
            eventi privati. Sempre con il lago dentro la scena.
          </p>
        </div>

        <div data-rows className="lg:col-span-7 lg:pt-2">
          {EVENTS.map((e, i) => (
            <div
              key={i}
              data-row
              className="group flex items-baseline justify-between border-b border-cream/15 py-8 transition-colors duration-500 hover:border-cream/40"
            >
              <span className="font-display text-2xl text-cream sm:text-3xl">
                {e.name}
              </span>
              <span className="label text-cream/50 transition-colors duration-500 group-hover:text-gold-soft">
                {e.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
