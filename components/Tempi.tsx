"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import HeadingReveal from "./HeadingReveal";
import Reveal from "./Reveal";

type Act = {
  n: string;
  tag: string;
  title: React.ReactNode;
  body: string;
  scene: string; // background gradient for the sticky visual
  glow: string;
};

const ACTS: Act[] = [
  {
    n: "01",
    tag: "Pool",
    title: "Dove la giornata rallenta.",
    body: "Acqua calma. Lago all'orizzonte. Nessuna fretta.",
    scene:
      "linear-gradient(165deg, #F2ECDD 0%, #DDE0D2 45%, #BFC9C0 72%, #8FA396 100%)",
    glow: "radial-gradient(60% 50% at 70% 18%, rgba(224,168,110,0.35), transparent 70%)",
  },
  {
    n: "02",
    tag: "Bites",
    title: "La tavola segue il sole.",
    body: "La mano del Nido del Corvo, più leggera, più libera.",
    scene:
      "linear-gradient(165deg, #F4EBD7 0%, #E9D9BD 40%, #D9BE96 74%, #B59A6C 100%)",
    glow: "radial-gradient(55% 50% at 30% 20%, rgba(224,168,110,0.45), transparent 70%)",
  },
  {
    n: "03",
    tag: "Bar",
    title: "Il tramonto è un rito.",
    body: "Quando il lago si accende, il colle cambia ritmo. Un calice, la luce che cala, niente fretta.",
    scene:
      "linear-gradient(165deg, #E9C9A6 0%, #C58A6A 38%, #8B6A6E 70%, #4E4452 100%)",
    glow: "radial-gradient(60% 60% at 60% 12%, rgba(255,196,128,0.55), transparent 65%)",
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
        <p className="label mb-6 text-stone">La giornata, in tre tempi</p>
        <HeadingReveal
          className="max-w-3xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.04] text-ink"
          lines={["Dove la giornata", <em key="i" className="italic text-sage">rallenta.</em>]}
        />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2">
        {/* Sticky visual */}
        <div className="sticky top-0 hidden h-screen items-center overflow-hidden lg:flex">
          <div className="grain relative m-10 h-[78vh] w-full overflow-hidden rounded-[2px]">
            {ACTS.map((a, i) => (
              <div
                key={i}
                ref={(r) => {
                  scenes.current[i] = r;
                }}
                className="absolute inset-0"
                style={{
                  background: a.scene,
                  opacity: i === 0 ? 1 : 0,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: a.glow }}
                />
                {/* Quiet water band at the foot of the scene */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="label text-white/70">{a.tag}</p>
                  <p className="font-display text-5xl text-white/90">{a.n}</p>
                </div>
              </div>
            ))}
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
                <div
                  className="grain relative mb-8 h-56 w-full overflow-hidden rounded-[2px] lg:hidden"
                  style={{ background: a.scene }}
                >
                  <div className="absolute inset-0" style={{ background: a.glow }} />
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
