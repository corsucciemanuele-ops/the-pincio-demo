"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import HeadingReveal from "./HeadingReveal";
import Reveal from "./Reveal";
import PoolScene from "./scenes/PoolScene";
import BitesScene from "./scenes/BitesScene";
import BarScene from "./scenes/BarScene";

type Act = {
  n: string;
  tag: string;
  title: React.ReactNode;
  body: string;
  Scene: () => JSX.Element;
};

const ACTS: Act[] = [
  {
    n: "01",
    tag: "Pool",
    title: "Dentro l'acqua, senza fretta.",
    body: "Acqua calma, sole, nessun orologio.",
    Scene: PoolScene,
  },
  {
    n: "02",
    tag: "Bites",
    title: "La tavola, più leggera.",
    body: "La mano del Nido del Corvo, in versione bordo piscina.",
    Scene: BitesScene,
  },
  {
    n: "03",
    tag: "Bar",
    title: "Le sere hanno un rito.",
    body: "Quando il sole cala sull'acqua, il colle cambia ritmo. Un calice, niente fretta.",
    Scene: BarScene,
  },
];

export default function Tempi() {
  const root = useRef<HTMLDivElement>(null);
  const scenes = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>("[data-act]");

      blocks.forEach((block, i) => {
        ScrollTrigger.create({
          trigger: block,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });

        if (reduced) return;
        // Parallax the big numeral inside each block
        const num = block.querySelector("[data-num]");
        if (num) {
          gsap.to(num, {
            yPercent: -40,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // Crossfade sticky scenes when the active act changes.
  useEffect(() => {
    scenes.current.forEach((s, i) => {
      if (!s) return;
      gsap.to(s, {
        autoAlpha: i === active ? 1 : 0,
        duration: 1.1,
        ease: "power2.inOut",
      });
    });
  }, [active]);

  return (
    <section id="giornata" ref={root} className="relative bg-cream">
      {/* Intro */}
      <div className="container-edge pt-28 pb-10 sm:pt-36">
        <div className="mb-6 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="" className="h-6 w-auto opacity-80" />
          <p className="label text-stone">La giornata, in tre tempi</p>
        </div>
        <HeadingReveal
          className="max-w-3xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.04] text-ink"
          lines={["Dove la giornata", <em key="i" className="italic text-sage">rallenta.</em>]}
        />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2">
        {/* Sticky visual — three real environments, crossfaded */}
        <div className="sticky top-0 hidden h-screen items-center overflow-hidden lg:flex">
          <div className="relative m-10 h-[78vh] w-full overflow-hidden rounded-[3px] shadow-[0_40px_80px_-40px_rgba(40,30,20,0.55)] ring-1 ring-black/5">
            {ACTS.map((a, i) => {
              const Scene = a.Scene;
              return (
                <div
                  key={i}
                  ref={(r) => {
                    scenes.current[i] = r;
                  }}
                  className="absolute inset-0"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <Scene />
                  <div className="pointer-events-none absolute bottom-8 left-8 z-10">
                    <p className="label text-white/75 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
                      {a.tag}
                    </p>
                    <p className="font-display text-5xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                      {a.n}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Acts */}
        <div>
          {ACTS.map((a, i) => (
            <article
              key={i}
              data-act
              className="flex min-h-screen flex-col justify-center border-t border-ink/10 px-6 py-20 sm:px-10 lg:border-t-0 lg:pr-16"
            >
              <div className="relative">
                <span
                  data-num
                  className="pointer-events-none absolute -top-24 -left-2 font-display text-[9rem] font-light leading-none text-ink/[0.06] sm:text-[12rem]"
                >
                  {a.n}
                </span>

                {/* Mobile scene */}
                <div className="relative mb-8 h-64 w-full overflow-hidden rounded-[3px] shadow-[0_24px_50px_-30px_rgba(40,30,20,0.5)] lg:hidden">
                  <a.Scene />
                </div>

                <Reveal>
                  <p data-reveal-child className="label mb-5 text-sage">
                    {a.n} — {a.tag}
                  </p>
                  <h3
                    data-reveal-child
                    className="max-w-md font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.05] text-ink"
                  >
                    {a.title}
                  </h3>
                  <p
                    data-reveal-child
                    className="mt-6 max-w-sm text-lg leading-relaxed text-stone"
                  >
                    {a.body}
                  </p>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
