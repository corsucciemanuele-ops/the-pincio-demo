# THE PINCIO — Internal Motion / WebGL Pattern Library

> Phases 1–3 of the brief. Built from established knowledge of the referenced
> studios and techniques (Immersive Garden, Active Theory / Hennessy "House of
> Moves", and award-winning Awwwards WebGL / Three.js / R3F work).
>
> **Note on research:** this execution environment has no outbound internet, so
> the patterns below are catalogued from documented technique — not scraped
> live from the sites. Where a pattern is a studio signature it's named.
>
> **We copy only mechanics** — movement, depth, animation, structure,
> transitions, scroll behaviour, media handling, light. Never colour, copy or
> branding.

## Scoring legend (1–10)

- **WOW** — perceived impact / "five years ahead" factor.
- **COMPLEXITY** — build + maintenance cost.
- **MOBILE WEIGHT** — performance cost on mid-range phones. **Higher = heavier
  / worse.** (We want high-utility, low-mobile-weight patterns as the spine,
  and reserve a couple of heavy ones for desktop-only WOW moments.)
- **UTILITY** — usefulness specifically for The Pincio.

---

## The library

| # | Pattern | Source / signature | WOW | Cmplx | Mob.wt | Utility | Pincio use |
|---|---------|--------------------|-----|-------|--------|---------|-----------|
| 1 | Lenis smooth scroll + GSAP ScrollTrigger (single ticker) | Universal foundation | 5 | 2 | 2 | 10 | Already in. The backbone everything hangs on. |
| 2 | Multi-layer parallax (scroll **and** pointer), atmospheric haze + DoF blur on far planes | Immersive Garden | 8 | 4 | 3 | 10 | Already in (DepthScene/Layer). Hero, location, acts. |
| 3 | WebGL plane-image **displacement on scroll velocity** (RGB split, curl) | Immersive Garden signature | 9 | 7 | 6 | 9 | Gallery + media reveals — images "breathe" and warp with scroll speed. |
| 4 | Scroll-scrubbed **video / image sequence** (frame-accurate) | Apple / Hennessy | 9 | 6 | 7 | 9 | Sunset finale + hero drone shot scrubbed by scroll. Needs real footage. |
| 5 | **Video texture on geometry** (video mapped to a water/plane mesh, refracted) | Active Theory | 9 | 7 | 7 | 8 | Pool water = real video refracted through a ripple shader. Needs footage. |
| 6 | WebGL **fluid / caustics water shader** | Awwwards WebGL | 8 | 6 | 5 | 9 | Already in (hero pool). Extend to a full Pool Experience surface. |
| 7 | R3F **camera dolly on scroll** (drei ScrollControls), 3D scene traverse | Awwwards Three.js | 9 | 8 | 7 | 7 | Optional desktop hero: move the camera *through* the terrace. |
| 8 | **Pinned horizontal / fullscreen cinematic** sequence | Immersive Garden | 8 | 5 | 4 | 9 | Already in (gallery). Push to fullscreen, huge media. |
| 9 | **Masked text reveals** (line/char), weight/letter-spacing easing | Universal editorial | 7 | 3 | 2 | 9 | Already in (HeadingReveal). Keep. |
| 10 | **Time-of-day lighting rig** — sky gradient + sun position + bloom animate on scroll | Bespoke (our sunset) | 10 | 6 | 4 | 10 | **The WOW finale.** Sun sinks, sky shifts, lights ignite, logo resolves. |
| 11 | **Particles** — light motes / embers / fireflies (instanced) | Awwwards WebGL | 7 | 5 | 6 | 7 | Sunset + night terrace. Instanced points, cheap if capped. |
| 12 | **Post-processing** — bloom, god-rays, subtle grain/vignette | Three.js postpro | 8 | 7 | 8 | 6 | Desktop-only WOW layer; off on mobile. Heavy — use sparingly. |
| 13 | **Magnetic + trailing cursor**, WebGL ripple-on-move | Active Theory | 6 | 4 | 3 | 6 | Already have magnetic. Add subtle water ripple on hero only. |
| 14 | **Page / section transitions** — curtain wipe, WebGL crossfade | Immersive Garden | 8 | 6 | 4 | 7 | Cinematic section-to-section dissolves. |
| 15 | **Media reveal** — clip-path / scale-from-1.1 + blur clear on enter | Universal cinematic | 7 | 3 | 2 | 9 | Every real photo enters like a film cut, not a fade. |
| 16 | **"Emerge from depth" cards** — item lifts off background w/ shadow + micro-3D tilt | Awwwards e-commerce | 7 | 4 | 3 | 9 | **Food Experience** — each dish floats up with parallax + tilt. |
| 17 | **Velocity-reactive marquee** | Universal | 5 | 2 | 2 | 6 | Already in. Keep. |
| 18 | **Progressive media + blur-up + preloader reveal** | Universal perf | 6 | 4 | 3 | 9 | Essential once real photos/video land — perceived speed = luxury. |
| 19 | **Sticky scene with scrubbed timeline** (one scene, many states) | Immersive Garden | 8 | 5 | 4 | 9 | Already in (Tempi acts). Reuse for Pool/Sunset. |
| 20 | **Scroll-driven SVG/light mask** (sun glow follows scroll) | Bespoke | 6 | 3 | 3 | 7 | Cheap way to animate light across a static real photo. |

### How they compose into The Pincio

- **Spine (all viewports, low mobile weight):** 1, 2, 8, 9, 15, 16, 18, 19, 20.
- **Desktop WOW layer (graceful fallback on mobile):** 3, 4, 5, 6, 7, 10, 11, 12, 14.
- **The single biggest moment:** **#10 the sunset finale** — highest WOW × highest utility, moderate weight. This is where the logo resolves.

### Mobile strategy

Detect with `matchMedia` + `prefers-reduced-motion` + a lightweight GPU check.
On phones: keep parallax (cheap), swap WebGL video-water for a looping muted
`<video playsinline>` poster, drop post-processing, cap particles, and serve
smaller media. The experience degrades to "beautiful and fast", never "broken".

---

## Phase 4 — build plan (gated on two decisions)

Target sections: **Hero (7-layer)** · **Cinematic Gallery** · **Pool
Experience** · **Food Experience** · **Sunset Experience (finale/WOW)**.

Two things must be settled first because they change everything downstream —
see the questions posed alongside this document.
