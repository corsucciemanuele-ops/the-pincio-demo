"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Closing brand moment. A quiet dark field, soft embers drifting upward
 * (animated, low opacity — not static dots), and the logo resolving on scroll.
 * No lake/sunset footage (that belongs to Nido del Corvo).
 */
const EMBERS = Array.from({ length: 14 }).map((_, i) => ({
  left: (i * 37) % 100,
  delay: (i % 7) * 1.1,
  dur: 9 + (i % 5) * 2,
  size: 2 + (i % 3),
  drift: (i % 2 ? 1 : -1) * (8 + (i % 4) * 6),
}));

export default function SunsetFinale() {
  const trigger = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trigger.current;
    const st = stage.current;
    if (!el || !st) return;

    // Scroll-driven (not auto-playing) → safe to run even with Reduce Motion,
    // so the logo "comes forward" on mobile too and the section isn't dead scroll.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 1 },
      });
      tl.fromTo(".finale-logo",
        { autoAlpha: 0, scale: 0.86, filter: "blur(8px)" },
        { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.4, ease: "power2.out" }, 0.25)
        .fromTo(".finale-tag", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.5);
    }, st);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={trigger} id="finale" className="relative h-[200vh] bg-indigo">
      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden">
        {/* quiet dark field */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 80%, #2A2640 0%, #141430 45%, #070A1E 100%)" }} />

        {/* embers rising */}
        <div className="absolute inset-0">
          {EMBERS.map((e, i) => (
            <span
              key={i}
              className="ember absolute rounded-full"
              style={{
                left: `${e.left}%`,
                bottom: "-6%",
                width: e.size,
                height: e.size,
                background: "radial-gradient(circle, rgba(255,214,160,0.95), rgba(255,200,140,0) 70%)",
                ["--drift" as string]: `${e.drift}px`,
                animationDelay: `${e.delay}s`,
                animationDuration: `${e.dur}s`,
              }}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 42%, transparent 55%, rgba(4,6,18,0.6) 120%)" }} />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
          <div className="finale-logo flex flex-col items-center opacity-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-white.svg" alt="The Pincio" className="w-[min(72vw,440px)] drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)]" />
          </div>
          <p className="finale-tag mt-6 font-display text-2xl italic text-white/85 opacity-0 sm:text-3xl">
            L&apos;estate ha un indirizzo.
          </p>
        </div>
      </div>

      <style jsx>{`
        .ember {
          animation-name: rise;
          animation-timing-function: ease-in;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
          opacity: 0;
        }
        @keyframes rise {
          0% { transform: translate3d(0, 0, 0); opacity: 0; }
          15% { opacity: 0.8; }
          80% { opacity: 0.5; }
          100% { transform: translate3d(var(--drift, 0), -78vh, 0); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
