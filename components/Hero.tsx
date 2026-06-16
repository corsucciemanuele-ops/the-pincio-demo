"use client";

import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";
import HeroScene from "./scenes/HeroScene";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLHeadingElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const lines = head.current?.querySelectorAll(".reveal-line > span");
      if (lines && !reduced) {
        gsap.set(lines, { yPercent: 118 });
        gsap.to(lines, {
          yPercent: 0,
          duration: 1.5,
          ease: EASE.settle,
          stagger: 0.14,
          delay: 0.55,
        });
      }

      gsap.fromTo(
        "[data-hero-fade]",
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.3,
          ease: EASE.soft,
          stagger: 0.14,
          delay: reduced ? 0 : 1.1,
        }
      );

      if (reduced) return;

      // Content lifts and dissolves as the scene takes over.
      gsap.to(content.current, {
        yPercent: -14,
        autoAlpha: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden"
    >
      {/* The environment */}
      <HeroScene />

      {/* Legibility scrim only at the foot */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-2/5 bg-gradient-to-t from-[#1c160f]/45 via-[#1c160f]/10 to-transparent" />

      {/* Content */}
      <div ref={content} className="container-edge relative z-10 pb-20 sm:pb-24">
        <p
          data-hero-fade
          className="label mb-8 text-cream/85 drop-shadow-[0_1px_8px_rgba(40,28,16,0.45)]"
          style={{ visibility: "hidden" }}
        >
          Sassocorvaro Auditore · Montefeltro — Estate 2027
        </p>

        <h1
          ref={head}
          className="font-display font-light leading-[0.92] text-cream drop-shadow-[0_2px_18px_rgba(40,28,16,0.4)]"
        >
          <span className="reveal-line text-[clamp(3rem,11vw,9.5rem)]">
            <span>L&apos;estate ha</span>
          </span>
          <span className="reveal-line text-[clamp(3rem,11vw,9.5rem)]">
            <span>
              un <em className="italic text-[#F2E4C9]">indirizzo.</em>
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p
            data-hero-fade
            className="label text-cream/80 drop-shadow-[0_1px_8px_rgba(40,28,16,0.45)]"
            style={{ visibility: "hidden" }}
          >
            Pool • Bites • Bar — Vista Lago di Mercatale
          </p>

          <div
            data-hero-fade
            style={{ visibility: "hidden" }}
            className="flex items-center gap-6"
          >
            <div className="hidden text-right sm:block">
              <p className="label text-cream/70">The Pincio</p>
              <p className="font-display text-lg text-cream">Estate 2027</p>
            </div>
            <MagneticButton
              href="#invito"
              className="label rounded-full border border-white/15 bg-ink/85 px-8 py-4 text-cream shadow-[0_10px_30px_-8px_rgba(20,14,8,0.6)] backdrop-blur-sm transition-colors duration-500 hover:bg-sage-deep"
            >
              Ricevi l&apos;invito
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-hero-fade
        style={{ visibility: "hidden" }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="label text-[10px] text-cream/70">Scorri</span>
        <span className="block h-10 w-px overflow-hidden bg-white/25">
          <span className="block h-1/2 w-full animate-[drop_2s_ease-in-out_infinite] bg-cream/70" />
        </span>
      </div>

      <style jsx>{`
        @keyframes drop {
          0% {
            transform: translateY(-100%);
          }
          60%,
          100% {
            transform: translateY(200%);
          }
        }
      `}</style>
    </section>
  );
}
