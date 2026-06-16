"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import GalleryFrame, { FrameKind } from "./scenes/GalleryFrame";

type Panel = {
  title: string;
  time: string;
  kind: FrameKind;
};

const PANELS: Panel[] = [
  { title: "Luce.", time: "Mattino", kind: "luce" },
  { title: "Acqua.", time: "Mezzogiorno", kind: "acqua" },
  { title: "Tavola.", time: "Pomeriggio", kind: "tavola" },
  { title: "Le sere del Pincio.", time: "Tramonto", kind: "sere" },
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
        className="flex h-screen w-max items-end gap-6 px-6 pb-[6vh] will-change-transform sm:gap-8 sm:px-10"
      >
        {PANELS.map((p, i) => (
          <figure
            key={i}
            className="relative h-[80vh] w-[70vw] shrink-0 overflow-hidden rounded-[3px] shadow-[0_50px_90px_-50px_rgba(0,0,0,0.8)] ring-1 ring-white/10 sm:w-[42vw] lg:w-[27vw]"
          >
            <div data-panel-img className="absolute inset-0 will-change-transform">
              <GalleryFrame kind={p.kind} />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />
            <figcaption className="absolute bottom-8 left-8 z-10">
              <p className="font-display text-3xl text-cream drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:text-4xl">
                {p.title}
              </p>
              <p className="label mt-2 text-cream/70">{p.time}</p>
            </figcaption>
            <span className="label absolute right-6 top-6 z-10 text-cream/50">
              0{i + 1}
            </span>
          </figure>
        ))}

        {/* Tail spacer so the last frame can fully arrive */}
        <div className="h-1 w-[6vw] shrink-0" aria-hidden />
      </div>
    </section>
  );
}
