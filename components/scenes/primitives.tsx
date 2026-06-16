"use client";

/**
 * SVG environment primitives — the building blocks of every scene.
 * Soft silhouettes, not clipart: meant to be blurred, hazed and layered so
 * they read as a real Montefeltro space (hill, cypress, pool, stone).
 */

const fill = (c: string) => ({ fill: c });

/**
 * A receding ridgeline whose crest sits at `baseline`% of the layer height,
 * so it can be aligned exactly to a horizon. `amp` controls how jagged the
 * crest is; `variant` shifts the silhouette.
 */
export function Hills({
  color = "#7E8C7E",
  baseline = 55,
  amp = 4,
  variant = 0,
  className = "",
}: {
  color?: string;
  baseline?: number;
  amp?: number;
  variant?: 0 | 1 | 2 | 3;
  className?: string;
}) {
  const b = baseline * 10; // map to a 0..1000 viewBox
  const k = amp * 9;
  const v = [
    `M0 1000 L0 ${b + 22} C 240 ${b - k} 430 ${b + k * 0.5} 620 ${b - k * 0.4} C 840 ${b - k * 1.3} 1040 ${b + k * 0.3} 1440 ${b - k * 0.8} L1440 1000 Z`,
    `M0 1000 L0 ${b + 10} C 200 ${b + k * 0.4} 400 ${b - k * 0.8} 640 ${b - k * 0.2} C 900 ${b + k * 0.6} 1120 ${b - k * 0.6} 1440 ${b + k * 0.2} L1440 1000 Z`,
    `M0 1000 L0 ${b} C 280 ${b - k * 0.5} 520 ${b + k * 0.7} 760 ${b - k * 0.3} C 1020 ${b - k} 1240 ${b + k * 0.4} 1440 ${b - k * 0.5} L1440 1000 Z`,
    `M0 1000 L0 ${b + 28} C 220 ${b - k * 1.4} 460 ${b + k * 0.3} 700 ${b - k * 0.6} C 960 ${b - k * 1.6} 1200 ${b + k * 0.2} 1440 ${b - k} L1440 1000 Z`,
  ];
  return (
    <svg
      viewBox="0 0 1440 1000"
      preserveAspectRatio="none"
      className={`h-full w-full ${className}`}
      aria-hidden
    >
      <path d={v[variant]} {...fill(color)} />
    </svg>
  );
}

/** A row of cypress + rounded Mediterranean trees on a knoll. */
export function TreeLine({
  color = "#3C4A3E",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 260"
      preserveAspectRatio="xMidYMax slice"
      className={`h-full w-full ${className}`}
      aria-hidden
    >
      <g {...fill(color)}>
        {/* ground knoll */}
        <path d="M0 260 L0 210 C 240 188 520 200 760 196 C 1020 192 1240 204 1440 198 L1440 260 Z" />
        {/* cypresses */}
        {[180, 230, 286, 1150, 1208].map((x, i) => (
          <path
            key={i}
            d={`M${x} 205 C ${x - 14} 170 ${x - 9} 120 ${x} 86 C ${x + 9} 120 ${x + 14} 170 ${x} 205 Z`}
          />
        ))}
        {/* rounded trees */}
        {[
          [620, 168, 56],
          [690, 176, 44],
          [980, 172, 50],
        ].map(([x, y, r], i) => (
          <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.86} />
        ))}
      </g>
    </svg>
  );
}

/** Large soft foliage for corner framing (olive/laurel-like sprays). */
export function Foliage({
  color = "#2E3A30",
  className = "",
  flip = false,
}: {
  color?: string;
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 420 520"
      className={`h-full w-full ${className}`}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      <g {...fill(color)}>
        <path
          d="M40 520 C 40 360 70 240 150 150 C 120 230 120 320 150 430 C 130 470 90 500 40 520 Z"
          opacity="0.95"
        />
        {/* leaf sprays */}
        {Array.from({ length: 14 }).map((_, i) => {
          const t = i / 13;
          const x = 60 + t * 150;
          const y = 470 - t * 380;
          const a = -40 + t * 30;
          return (
            <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
              <ellipse cx="34" cy="0" rx="40" ry="11" opacity="0.9" />
              <ellipse cx="-30" cy="14" rx="34" ry="9" opacity="0.75" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/** Warm out-of-focus light dots — bar / events bokeh. */
export function Bokeh({
  color = "255,200,140",
  count = 22,
  className = "",
  seed = 1,
}: {
  color?: string;
  count?: number;
  className?: string;
  seed?: number;
}) {
  // Deterministic pseudo-random so SSR and client agree.
  const rnd = (n: number) => {
    const x = Math.sin(n * 999 + seed * 53) * 10000;
    return x - Math.floor(x);
  };
  return (
    <svg viewBox="0 0 1000 600" className={`h-full w-full ${className}`} aria-hidden>
      <defs>
        <radialGradient id={`bk-${seed}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`rgba(${color},0.9)`} />
          <stop offset="60%" stopColor={`rgba(${color},0.35)`} />
          <stop offset="100%" stopColor={`rgba(${color},0)`} />
        </radialGradient>
      </defs>
      {Array.from({ length: count }).map((_, i) => {
        const r = 6 + rnd(i + 1) * 30;
        return (
          <circle
            key={i}
            cx={rnd(i + 2) * 1000}
            cy={120 + rnd(i + 3) * 460}
            r={r}
            fill={`url(#bk-${seed})`}
            opacity={0.4 + rnd(i + 5) * 0.5}
          />
        );
      })}
    </svg>
  );
}

/** Festoon string lights — for the night events scene. */
export function Festoon({
  glow = "#FFD79A",
  className = "",
}: {
  glow?: string;
  className?: string;
}) {
  const strands = [
    { y: 70, sag: 60 },
    { y: 110, sag: 90 },
    { y: 150, sag: 70 },
  ];
  return (
    <svg viewBox="0 0 1440 400" className={`h-full w-full ${className}`} aria-hidden>
      <defs>
        <radialGradient id="bulb" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glow} stopOpacity="1" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      {strands.map((s, si) => {
        const d = `M -40 ${s.y} Q 720 ${s.y + s.sag} 1480 ${s.y}`;
        const bulbs = Array.from({ length: 22 }).map((_, i) => {
          const t = i / 21;
          const x = -40 + t * 1520;
          // approximate catenary height
          const y = s.y + s.sag * (1 - Math.pow(2 * t - 1, 2));
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="13" fill="url(#bulb)" opacity="0.9" />
              <circle cx={x} cy={y} r="2.4" fill={glow} />
            </g>
          );
        });
        return (
          <g key={si}>
            <path d={d} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
            {bulbs}
          </g>
        );
      })}
    </svg>
  );
}

/** A still pool of water with soft surface bands and a light glint. */
export function PoolSurface({
  className = "",
  tint = "#9FB6B0",
  highlight = "rgba(255,240,210,0.5)",
}: {
  className?: string;
  tint?: string;
  highlight?: string;
}) {
  return (
    <svg
      viewBox="0 0 1000 500"
      preserveAspectRatio="none"
      className={`h-full w-full ${className}`}
      aria-hidden
    >
      <defs>
        <linearGradient id="pool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tint} stopOpacity="0.55" />
          <stop offset="100%" stopColor={tint} stopOpacity="0.95" />
        </linearGradient>
        <filter id="ripple">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.04" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="18" />
        </filter>
      </defs>
      <rect width="1000" height="500" fill="url(#pool)" />
      <g filter="url(#ripple)" opacity="0.6">
        {Array.from({ length: 9 }).map((_, i) => (
          <rect
            key={i}
            x="-40"
            y={40 + i * 52}
            width="1080"
            height="10"
            fill={highlight}
            opacity={0.25 + (i % 3) * 0.12}
          />
        ))}
      </g>
    </svg>
  );
}

/** Backlit stemware silhouettes for the bar / table. */
export function Glassware({
  color = "rgba(20,14,10,0.82)",
  rim = "rgba(255,210,150,0.8)",
  className = "",
}: {
  color?: string;
  rim?: string;
  className?: string;
}) {
  const glasses = [
    { x: 150, s: 1.0 },
    { x: 250, s: 0.82 },
    { x: 760, s: 0.95 },
    { x: 850, s: 1.12 },
  ];
  return (
    <svg viewBox="0 0 1000 360" preserveAspectRatio="xMidYMax slice" className={`h-full w-full ${className}`} aria-hidden>
      {glasses.map((g, i) => {
        const h = 150 * g.s;
        const w = 46 * g.s;
        const y = 320;
        return (
          <g key={i} transform={`translate(${g.x} ${y})`} fill={color}>
            {/* bowl */}
            <path d={`M${-w} ${-h} C ${-w} ${-h + 46} ${-w + 10} ${-h + 70} 0 ${-h + 74} C ${w - 10} ${-h + 70} ${w} ${-h + 46} ${w} ${-h} Z`} />
            {/* stem + foot */}
            <rect x={-2} y={-h + 74} width={4} height={h - 84} />
            <rect x={-w * 0.5} y={-8} width={w} height={6} rx={2} />
            {/* rim highlight */}
            <path d={`M${-w} ${-h} C ${-w} ${-h + 46} ${-w + 10} ${-h + 70} 0 ${-h + 74}`} fill="none" stroke={rim} strokeWidth="1.5" opacity="0.7" />
          </g>
        );
      })}
    </svg>
  );
}

/** A still lake band with a soft reflection. */
export function Lake({
  className = "",
  top = "#CBD6CE",
  bottom = "#7C9087",
}: {
  className?: string;
  top?: string;
  bottom?: string;
}) {
  return (
    <svg viewBox="0 0 1000 240" preserveAspectRatio="none" className={`h-full w-full ${className}`} aria-hidden>
      <defs>
        <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={top} />
          <stop offset="100%" stopColor={bottom} />
        </linearGradient>
      </defs>
      <rect width="1000" height="240" fill="url(#lake)" />
      <g stroke="rgba(255,255,255,0.35)" strokeWidth="2">
        {[40, 80, 120, 165, 205].map((y, i) => (
          <line key={i} x1="120" y1={y} x2="880" y2={y} opacity={0.5 - i * 0.07} />
        ))}
      </g>
    </svg>
  );
}

/** A hilltop village silhouette — Sassocorvaro on the colle. */
export function Village({ color = "#5A5550", className = "" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 600 200" preserveAspectRatio="xMidYMax meet" className={`h-full w-full ${className}`} aria-hidden>
      <g {...fill(color)}>
        <path d="M120 200 L130 120 L160 120 L165 96 L210 96 L214 120 L300 120 L305 80 L340 80 L344 120 L420 120 L430 200 Z" />
        {/* tower / rocca */}
        <rect x="276" y="56" width="36" height="64" />
        <path d="M270 56 L318 56 L294 38 Z" />
        {/* little windows */}
        {[150, 190, 250, 360].map((x, i) => (
          <rect key={i} x={x} y={130} width="8" height="14" fill="rgba(255,220,160,0.5)" />
        ))}
      </g>
    </svg>
  );
}
