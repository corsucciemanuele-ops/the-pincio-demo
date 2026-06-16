# /public/media — real assets drop zone

Drop files here with the **exact names** below. Each maps 1:1 to a slot in
`lib/media.ts`. Missing files fall back automatically to the graded placeholder,
so you can add them one at a time, in any order. After adding files, just
redeploy (or restart `npm run dev`).

## Videos — MP4 (H.264, yuv420p), muted, loopable
| File | Section | Aspect | Duration | Resolution (min → ideal) |
|------|---------|--------|----------|--------------------------|
| `hero.mp4`   | Hero (full-bleed) | 16:9 horizontal | 8–12s loop | 1920×1080 → 3840×2160 |
| `sunset.mp4` | Sunset finale     | 16:9 horizontal | 10–15s     | 1920×1080 → 4K |
| `pool.mp4`   | Pool Experience   | 16:9 horizontal | 8–12s loop | 1920×1080 → 4K |

Optional poster stills (first frame, shown while the video loads):
`hero.jpg`, `sunset.jpg`, `pool.jpg`.

## Photos — JPEG, sRGB, warm exposure, no watermark
| File | Section | Aspect | Resolution (min → ideal) |
|------|---------|--------|--------------------------|
| `location.jpg`        | Dove siamo | 4:3 horizontal | 1600×1200 → 4K |
| `gallery-luce.jpg`    | Gallery / Mattino    | 4:5 vertical | 1080×1350 → 1600×2000 |
| `gallery-acqua.jpg`   | Gallery / Mezzogiorno| 4:5 vertical | 1080×1350 → 1600×2000 |
| `gallery-tavola.jpg`  | Gallery / Pomeriggio | 4:5 vertical | 1080×1350 → 1600×2000 |
| `gallery-sere.jpg`    | Gallery / Tramonto   | 4:5 vertical | 1080×1350 → 1600×2000 |
| `food-1.jpg` … `food-4.jpg` | Food Experience | 3:4 vertical | 1200×1600 → 2000×2667 |

## Priority
- 🔴 **Minimum for a visible jump:** `hero.mp4` + `food-1…4.jpg` (5 files).
- 🟡 Recommended: add `sunset.mp4`, `pool.mp4`, `gallery-*.jpg`.
- 🟢 Optional: `location.jpg`, a 9:16 mobile crop of the hero, extra variants.

## Notes
- Videos should be muted and ideally seamless (start ≈ end). Keep them light
  (~8–20 MB); heavier files get compressed during integration.
- These can be **test assets** — but match the mood (warm light, water, golden
  hour, Mediterranean) so the premium/emotional read is honest.
- `location` can be a short drone clip instead of a photo — say so and it'll be
  switched to a video slot.
