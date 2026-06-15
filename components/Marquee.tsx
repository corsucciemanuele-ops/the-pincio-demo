"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const WORDS = [
  "Montefeltro",
  "Lago di Mercatale",
  "Sassocorvaro",
  "Il Colle",
  "Nido del Corvo",
];

/**
 * Infinite place-name marquee that quickens with scroll velocity, then
 * eases back to its base drift. Speaks the geography of the place.
 */
export default function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;

    let x = 0;
    let base = 0.4; // px per frame, base drift
    let extra = 0;
    const half = () => el.scrollWidth / 2;

    const lenis = (window as unknown as {
      __lenis?: { on: (e: string, cb: (a: { velocity: number }) => void) => void };
    }).__lenis;

    const onScroll = (e: { velocity: number }) => {
      extra = gsap.utils.clamp(-6, 6, e.velocity * 0.6);
    };
    lenis?.on("scroll", onScroll);

    const tick = () => {
      extra = gsap.utils.interpolate(extra, 0, 0.06);
      x -= base + extra;
      const h = half();
      if (h > 0) {
        if (x <= -h) x += h;
        if (x > 0) x -= h;
      }
      el.style.transform = `translate3d(${x}px,0,0)`;
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
    };
  }, []);

  const items = [...WORDS, ...WORDS];

  return (
    <section className="relative overflow-hidden border-y border-ink/10 bg-ivory py-7">
      <div
        ref={track}
        className="flex w-max items-center gap-10 whitespace-nowrap will-change-transform"
      >
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl text-graphite sm:text-3xl">
              {w}
            </span>
            <span className="text-gold" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
