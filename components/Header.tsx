"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const NAV = [
  { label: "Le sere", href: "#sere" },
  { label: "Il luogo", href: "#pool" },
  { label: "Dove siamo", href: "#dove" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { y: -24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1.2, delay: 0.3, ease: "power3.out" }
      );
    }
  }, []);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
    if (el && lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    else if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={barRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${
        scrolled ? "bg-cream/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-edge flex h-20 items-center justify-between">
        <button
          onClick={() => go("#top")}
          className="flex items-center gap-3"
          aria-label="The Pincio — home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-mark.svg"
            alt=""
            className={`h-9 w-auto transition-[filter] duration-500 ${
              scrolled ? "" : "drop-shadow-[0_1px_8px_rgba(20,14,8,0.45)]"
            }`}
          />
          <span className="font-display text-xl tracking-wide text-ink">
            The Pincio
          </span>
        </button>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <button
              key={n.href}
              onClick={() => go(n.href)}
              className="label text-stone transition-colors duration-300 hover:text-ink"
            >
              {n.label}
            </button>
          ))}
          <button
            onClick={() => go("#invito")}
            className="label rounded-full border border-ink/25 px-5 py-2.5 text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
          >
            Ricevi l&apos;invito
          </button>
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span
            className={`h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-ink/10 bg-cream/95 backdrop-blur-md transition-[max-height] duration-500 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="container-edge flex flex-col gap-5 py-8">
          {NAV.map((n) => (
            <button
              key={n.href}
              onClick={() => go(n.href)}
              className="text-left font-display text-2xl text-ink"
            >
              {n.label}
            </button>
          ))}
          <button
            onClick={() => go("#invito")}
            className="label mt-2 self-start rounded-full border border-ink/25 px-5 py-2.5 text-ink"
          >
            Ricevi l&apos;invito
          </button>
        </div>
      </div>
    </header>
  );
}
