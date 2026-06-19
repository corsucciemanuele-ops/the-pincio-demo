"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Closing brand moment. A quiet dark field, soft embers drifting upward
 * (animated, low opacity — not static dots), and the logo resolving on scroll.
 * No lake/sunset footage (that belongs to Nido del Corvo).
 */
// Soft, sparse fireflies — few, large, blurred, slow → premium (not "pixels").
const EMBERS = Array.from({ length: 11 }).map((_, i) => ({
  left: (i * 53 + 7) % 100,
  delay: (i % 6) * 1.8,
  dur: 15 + (i % 5) * 2.5,
  size: 4 + (i % 4) * 1.6,
  drift: (i % 2 ? 1 : -1) * (22 + (i % 4) * 10),
  peak: 0.35 + (i % 3) * 0.12,
}));

export default function SunsetFinale() {
  const trigger = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trigger.current;
    const st = stage.current;
    if (!el || !st) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: tall sticky section, logo resolves on a scrub timeline.
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 1 },
        });
        tl.fromTo(".finale-logo",
          { autoAlpha: 0, scale: 0.86, filter: "blur(8px)" },
          { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.4, ease: "power2.out" }, 0.25)
          .fromTo(".finale-tag", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.5);
      });

      // Mobile: normal 100vh section, logo reveals once on enter (rock-solid on
      // touch — no sticky/scrub jank, no dead scroll).
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(".finale-logo",
          { autoAlpha: 0, scale: 0.9, filter: "blur(6px)", y: 24 },
          { autoAlpha: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: st, start: "top 60%" } });
        gsap.fromTo(".finale-tag",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: st, start: "top 50%" } });
      });
    }, st);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={trigger} id="finale" className="relative h-[100svh] bg-indigo lg:h-[200vh]">
      <div ref={stage} className="relative h-[100svh] overflow-hidden lg:sticky lg:top-0">
        {/* quiet dark field */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 80%, #2A2640 0%, #141430 45%, #070A1E 100%)" }} />

        {/* fireflies drifting up */}
        <div className="absolute inset-0">
          {EMBERS.map((e, i) => (
            <span
              key={i}
              className="ember absolute rounded-full"
              style={{
                left: `${e.left}%`,
                bottom: "-8%",
                width: e.size,
                height: e.size,
                background: "radial-gradient(circle, rgba(255,222,176,0.95), rgba(255,200,140,0) 72%)",
                filter: "blur(1px)",
                ["--drift" as string]: `${e.drift}px`,
                ["--peak" as string]: e.peak,
                animationDelay: `${e.delay}s`,
                animationDuration: `${e.dur}s`,
              }}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 42%, transparent 55%, rgba(4,6,18,0.6) 120%)" }} />

        <div className="absolute inset-0 z-10 flex items-center justify-center text-center">
          {/* breathing warm halo — gives the logo life (never fully static) */}
          <div className="finale-halo pointer-events-none absolute" />
          <div className="relative flex flex-col items-center">
            <div className="finale-logo flex flex-col items-center opacity-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-white.svg" alt="The Pincio" className="w-[min(72vw,440px)] drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)]" />
            </div>
            <p className="finale-tag mt-6 font-display text-2xl italic text-white/85 opacity-0 sm:text-3xl">
              L&apos;estate ha un indirizzo.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ember {
          animation-name: rise;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
          opacity: 0;
        }
        @keyframes rise {
          0% { transform: translate3d(0, 0, 0); opacity: 0; }
          20% { opacity: var(--peak, 0.4); }
          80% { opacity: calc(var(--peak, 0.4) * 0.6); }
          100% { transform: translate3d(var(--drift, 0), -86vh, 0); opacity: 0; }
        }
        .finale-halo {
          width: min(86vw, 560px);
          height: min(86vw, 560px);
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(255,200,140,0.18), rgba(255,200,140,0.05) 45%, transparent 70%);
          animation: halo 7s ease-in-out infinite;
          will-change: transform, opacity;
        }
        @keyframes halo {
          0%, 100% { transform: scale(0.92); opacity: 0.5; }
          50% { transform: scale(1.06); opacity: 0.85; }
        }
      `}</style>
    </section>
  );
}
