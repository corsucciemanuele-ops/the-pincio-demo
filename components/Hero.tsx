"use client";

import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";
import HeroScene from "./scenes/HeroScene";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-in]",
        { autoAlpha: 0, y: 26 },
        { autoAlpha: 1, y: 0, duration: 1.4, ease: EASE.soft, stagger: 0.16, delay: reduced ? 0 : 0.4 }
      );

      if (reduced) return;

      // The brand lockup breathes gently — always present over the footage.
      gsap.to(logo.current, {
        scale: 1.035,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Content lifts and dissolves as the scene takes over.
      gsap.to(content.current, {
        yPercent: -12,
        autoAlpha: 0.08,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden">
      <HeroScene />

      {/* soft scrim behind the brand for legibility on bright footage */}
      <div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: "radial-gradient(60% 50% at 50% 46%, rgba(10,16,28,0.42), transparent 70%)" }} />

      {/* eyebrow */}
      <p data-hero-in className="absolute top-28 left-1/2 z-10 -translate-x-1/2 label text-center text-cream/85 drop-shadow-[0_1px_10px_rgba(8,16,24,0.6)]">
        Sassocorvaro Auditore · Montefeltro — Estate 2027
      </p>

      {/* brand lockup — front and centre, always */}
      <div ref={content} className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={logo}
          data-hero-in
          src="/logo-white.svg"
          alt="The Pincio — Pool Bites Bar"
          className="w-[min(78vw,520px)] drop-shadow-[0_10px_50px_rgba(6,12,22,0.65)]"
        />
        <p data-hero-in className="mt-6 font-display text-[clamp(1.6rem,4vw,3rem)] font-light italic leading-tight text-cream drop-shadow-[0_2px_16px_rgba(8,16,24,0.6)]">
          L&apos;estate ha un indirizzo.
        </p>
      </div>

      {/* bottom meta */}
      <p data-hero-in className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 label text-center text-cream/75 drop-shadow-[0_1px_10px_rgba(8,16,24,0.6)]">
        Pool · Bites · Bar — Sul colle, a bordo piscina
      </p>
    </section>
  );
}
