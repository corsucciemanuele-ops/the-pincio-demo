"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "@/lib/gsap";
import WaterBackdrop from "./water/WaterBackdrop";
import Ridge from "./Ridge";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLHeadingElement>(null);
  const ridge = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      // Intro: headline lines settle up, eyebrow + meta fade in.
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

      // Parallax depth on scroll: backdrop slow, ridge mid, content lifts.
      gsap.to(backdrop.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(ridge.current, {
        yPercent: -22,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(content.current, {
        yPercent: -12,
        autoAlpha: 0.15,
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
      {/* Layer 0 — water */}
      <div ref={backdrop} className="absolute inset-0 -z-20">
        <WaterBackdrop />
      </div>

      {/* Layer 1 — ridgeline */}
      <div
        ref={ridge}
        className="pointer-events-none absolute inset-x-0 bottom-[14%] -z-10"
      >
        <Ridge className="h-[26vh] w-full text-sage-deep/25" />
      </div>

      {/* Layer 2 — content */}
      <div ref={content} className="container-edge relative z-10 pb-20 sm:pb-24">
        <p
          data-hero-fade
          className="label mb-8 text-stone"
          style={{ visibility: "hidden" }}
        >
          Sassocorvaro Auditore · Montefeltro — Estate 2027
        </p>

        <h1
          ref={head}
          className="font-display font-light leading-[0.92] text-ink"
        >
          <span className="reveal-line text-[clamp(3rem,11vw,9.5rem)]">
            <span>L&apos;estate ha</span>
          </span>
          <span className="reveal-line text-[clamp(3rem,11vw,9.5rem)]">
            <span>
              un <em className="italic text-sage">indirizzo.</em>
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p
            data-hero-fade
            className="label text-stone"
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
              <p className="label text-stone">The Pincio</p>
              <p className="font-display text-lg text-ink">Estate 2027</p>
            </div>
            <MagneticButton
              href="#invito"
              className="label rounded-full bg-ink px-8 py-4 text-cream transition-colors duration-500 hover:bg-sage-deep"
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
        <span className="label text-[10px] text-stone">Scorri</span>
        <span className="block h-10 w-px overflow-hidden bg-ink/15">
          <span className="block h-1/2 w-full animate-[drop_2s_ease-in-out_infinite] bg-ink/50" />
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
