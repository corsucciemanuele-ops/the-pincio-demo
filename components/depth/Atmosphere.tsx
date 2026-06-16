"use client";

/**
 * Stackable atmospheric overlays that make layered art read as a photographed
 * space: grain, vignette, a warm light bloom, and a horizon haze.
 * All purely decorative and non-interactive.
 */

export function Grain({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 mix-blend-multiply"
      style={{
        opacity,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

export function Vignette({ strength = 0.5 }: { strength?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background: `radial-gradient(120% 95% at 50% 42%, transparent 52%, rgba(20,16,12,${strength}) 130%)`,
      }}
    />
  );
}

export function Bloom({
  x = 60,
  y = 30,
  color = "rgba(255,210,150,0.5)",
  size = 70,
}: {
  x?: number;
  y?: number;
  color?: string;
  size?: number;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 mix-blend-screen"
      style={{
        background: `radial-gradient(${size}% ${size}% at ${x}% ${y}%, ${color}, transparent 70%)`,
      }}
    />
  );
}

export function Haze({
  color = "rgba(244,222,190,0.55)",
  top = 40,
  height = 28,
}: {
  color?: string;
  top?: number;
  height?: number;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0"
      style={{
        top: `${top}%`,
        height: `${height}%`,
        background: `linear-gradient(to bottom, transparent, ${color} 50%, transparent)`,
        filter: "blur(8px)",
      }}
    />
  );
}
