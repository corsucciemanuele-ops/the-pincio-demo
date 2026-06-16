/**
 * Central registry for real assets, served from /public/media.
 *
 * POSITIONING (v2): The Pincio = POOL only — water, poolside, le sere.
 * The lake / sunset / terrace / restaurant-food imagery belongs to
 * "Nido del Corvo" and must NOT appear here. Where no real Pincio pool photo
 * exists, the slot stays null → MediaSlot shows a graded placeholder.
 *
 *   type "video" → muted autoplay loop · type "image" → still
 */
export type MediaEntry = { type: "video" | "image"; src: string; poster?: string } | null;

export const MEDIA: Record<string, MediaEntry> = {
  // HERO — aerial/pool clip, logo locked on top
  "hero": { type: "video", src: "/media/hero.mp4", poster: "/media/hero.jpg" },

  // POOL EXPERIENCE — the heart of the brand
  "pool": { type: "image", src: "/media/pool-still.jpg" },

  // LA GIORNATA — three acts (poolside stills, placeholder-grade)
  "tempi-pool": { type: "image", src: "/media/tempi-pool.jpg" },
  "tempi-bites": { type: "image", src: "/media/gallery-acqua.jpg" },
  "tempi-bar": { type: "image", src: "/media/tempi-bar.jpg" },

  // DOVE SIAMO — poolside on the colle (NOT a lake-view terrace)
  "location": { type: "image", src: "/media/location.jpg" },

  // ── Awaiting real Pincio pool photography → placeholders for now ──
  "sere": null,
  "gallery-luce": null,
  "gallery-acqua": null,
  "gallery-tavola": null,
  "gallery-sere": null,
};

export function getMedia(key: string): MediaEntry {
  return MEDIA[key] ?? null;
}
