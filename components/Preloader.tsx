"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Cinematic entrance. A count to 100 over a graded field, the wordmark
 * resolving, then a curtain wipe up to reveal the site. Scroll is locked
 * until it finishes.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const lenis = () => (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis()?.stop();
    document.body.style.overflow = "hidden";

    const finish = () => {
      lenis()?.start();
      document.body.style.overflow = "";
      el.style.display = "none";
      window.dispatchEvent(new Event("pincio:preloaded"));
    };

    if (prefersReducedMotion()) {
      setN(100);
      finish();
      return;
    }

    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(counter, {
      v: 100,
      duration: 1.9,
      ease: "power2.inOut",
      onUpdate: () => setN(Math.round(counter.v)),
    })
      .to(".pl-brand", { autoAlpha: 0, y: -14, duration: 0.5, ease: "power2.in" }, "+=0.15")
      .to(".pl-panel", {
        yPercent: -100,
        duration: 1.0,
        ease: "expo.inOut",
        stagger: 0.08,
      }, "-=0.1");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div ref={root} className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* panels that wipe up */}
      <div className="absolute inset-0 flex">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="pl-panel h-full w-1/4"
            style={{ background: "linear-gradient(to bottom,#0E1430,#2C2640 55%,#7A4A5A)" }}
          />
        ))}
      </div>
      <div className="pl-brand relative z-10 flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-white.svg" alt="The Pincio" className="h-28 w-auto opacity-90 drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)]" />
        <div className="mt-6 flex items-baseline gap-2 font-display text-white/80">
          <span className="text-5xl tabular-nums">{n}</span>
          <span className="text-lg text-white/40">/ 100</span>
        </div>
        <p className="label mt-4 text-white/40">Estate 2027</p>
      </div>
    </div>
  );
}
