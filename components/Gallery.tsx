"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type Panel = {
  title: string;
  time: string;
  bg: string;
};

const PANELS: Panel[] = [
  {
    title: "Luce.",
    time: "Mattino",
    bg: "linear-gradient(150deg, #F4EEE0 0%, #E6E2D0 55%, #C9D0C4 100%)",
  },
  {
    title: "Acqua.",
    time: "Mezzogiorno",
    bg: "linear-gradient(150deg, #DCE4DD 0%, #AEC0B5 55%, #7E988A 100%)",
  },
  {
    title: "Tavola.",
    time: "Pomeriggio",
    bg: "linear-gradient(150deg, #F0E3C8 0%, #DCC094 55%, #B89968 100%)",
  },
  {
    title: "Le sere del Pincio.",
    time: "Tramonto",
    bg: "linear-gradient(150deg, #E7B98F 0%, #C5806A 50%, #6E5560 100%)",
  },
];

export default function Gallery() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = root.current;
    const el = track.current;
    if (!section || !el) return;
    if (prefersReducedMotion()) return; // fall back to native horizontal scroll

    const ctx = gsap.context(() => {
      const getScroll = () => el.scrollWidth - window.innerWidth;

      const tween = gsap.to(el, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Subtle parallax on each panel's inner image as it crosses.
      gsap.utils.toArray<HTMLElement>("[data-panel-img]").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.12, xPercent: -4 },
          {
            scale: 1.0,
            xPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={root} className="relative overflow-hidden bg-ink">
      <div className="container-edge absolute left-0 right-0 top-0 z-20 pt-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="label mb-4 text-cream/50">Gallery</p>
            <h2 className="max-w-xl font-display text-[clamp(1.8rem,3.5vw,3rem)] font-light leading-tight text-cream">
              Una giornata, dall&apos;alba alla notte.
            </h2>
          </div>
          <p className="label hidden items-center gap-2 text-cream/50 sm:flex">
            Scorri <span aria-hidden>→</span>
          </p>
        </div>
      </div>

      <div
        ref={track}
        className="flex h-screen w-max items-center gap-6 px-6 will-change-transform sm:gap-8 sm:px-10"
      >
        {PANELS.map((p, i) => (
          <figure
            key={i}
            className="grain relative h-[62vh] w-[78vw] shrink-0 overflow-hidden rounded-[2px] sm:w-[46vw] lg:w-[34vw]"
          >
            <div
              data-panel-img
              className="absolute inset-0 will-change-transform"
              style={{ background: p.bg }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <figcaption className="absolute bottom-7 left-7">
              <p className="font-display text-3xl text-cream sm:text-4xl">
                {p.title}
              </p>
              <p className="label mt-2 text-cream/60">{p.time}</p>
            </figcaption>
            <span className="label absolute right-6 top-6 text-cream/40">
              0{i + 1}
            </span>
          </figure>
        ))}

        {/* Tail spacer so the last panel can fully arrive */}
        <div className="h-1 w-[6vw] shrink-0" aria-hidden />
      </div>
    </section>
  );
}
