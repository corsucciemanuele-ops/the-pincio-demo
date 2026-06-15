# The Pincio — Interactive Demo

> *L'estate ha un indirizzo.*
> Pool · Bites · Bar — Vista Lago di Mercatale, Montefeltro. Apertura estate 2027.

A working, contemporary hospitality experience built on the approved **V2** as
narrative and visual foundation. The goal is not a prettier website — it is to
put The Pincio years ahead of standard Italian hospitality sites.

## The idea

The Pincio is not a restaurant, not a traditional resort, not a generic beach
club. It is a contemporary destination that joins premium hospitality, design,
technology, immersion, depth and emotion — with restraint. Luxury here is quiet.

The whole site is built around one narrative spine from the V2:
**la giornata in tre tempi** — Pool (morning) → Bites (noon) → Bar (sunset).
Light, water, slowness, the lake always "inside the scene."

## Strategy

- **Motion** — Lenis smooth scroll drives a single GSAP ticker → ScrollTrigger,
  so smoothing and scroll-bound animation never drift. Everything is slow and
  settled: masked line-by-line headline reveals, a velocity-reactive place-name
  marquee, magnetic CTAs. Only `power3`/`expo` easing. Honours
  `prefers-reduced-motion`.
- **Depth** — Layered parallax (WebGL water → Montefeltro ridgeline → content)
  plus a colour grade that moves morning → noon → sunset across sections, so
  depth is felt in time, not only in z.
- **3D** — One ambient WebGL water surface (raw GLSL on a viewport plane via
  React Three Fiber): gentle ripples, a sunset reflection, soft caustics,
  subtle pointer/scroll influence. Technology felt, never exhibited.
  Dynamically imported (`ssr: false`) with a CSS-gradient fallback.
- **Hierarchy** — Header → Hero → Marquee → La giornata in tre tempi →
  Gallery (horizontal pin-scroll) → Le sere → Invito (email capture) →
  Dove siamo → Footer.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · GSAP · ScrollTrigger
· Lenis · React Three Fiber (three.js).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start
```
