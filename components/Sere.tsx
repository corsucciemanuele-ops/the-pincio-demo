"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import HeadingReveal from "./HeadingReveal";
import EventsScene from "./scenes/EventsScene";
import { SERATE } from "@/lib/events";

const EVENTS = [
  { name: "Sunset aperitivo", note: "Ogni sera d'estate" },
  { name: "Cene a bordo piscina", note: "Su prenotazione" },
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
          <div className="mb-6 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark-white.png" alt="" className="h-6 w-auto opacity-85" />
            <p className="label text-cream/60">Le sere del Pincio</p>
          </div>
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
            Aperitivi, cene a bordo piscina, musica ed eventi privati. Sempre
            con l&apos;acqua dentro la scena.
          </p>
        </div>

        <div data-rows className="lg:col-span-7 lg:pt-2">
          {EVENTS.map((e, i) => (
            <div
              key={i}
              data-row
              className="flex items-baseline justify-between border-b border-cream/15 py-8"
            >
              <span className="font-display text-2xl text-cream sm:text-3xl">{e.name}</span>
              <span className="label text-cream/50">{e.note}</span>
            </div>
          ))}

          {/* Prossime serate — content-managed, empty until real dates exist */}
          <div className="pt-10">
            <p className="label mb-4 text-cream/40">Prossime serate</p>
            {SERATE.length === 0 ? (
              <p className="font-display text-xl italic text-cream/45">
                Il calendario delle serate sarà annunciato. Lascia il contatto
                per saperlo per primo.
              </p>
            ) : (
              SERATE.map((s, i) => (
                <div key={i} className="flex items-baseline justify-between border-b border-cream/10 py-5">
                  <span className="font-display text-xl text-cream">{s.title}</span>
                  <span className="label text-cream/50">{s.date}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
