/**
 * Central registry for real assets, all served from /public/media.
 * Missing files fall back to the graded placeholder (MediaSlot listens for a
 * load error), so assets can be added/replaced freely.
 *
 *   type "video" → muted autoplay loop
 *   type "image" → still photography
 */
export type MediaEntry = { type: "video" | "image"; src: string; poster?: string } | null;

export const MEDIA: Record<string, MediaEntry> = {
  // HERO — opening: the white pool-portal clip (logo overlaid on top)
  "hero": { type: "video", src: "/media/hero.mp4", poster: "/media/hero.jpg" },

  // SUNSET FINALE — real sunset-over-lake clip
  "sunset": { type: "video", src: "/media/finale.mp4", poster: "/media/finale.jpg" },

  // POOL EXPERIENCE — pool still
  "pool": { type: "image", src: "/media/pool-still.jpg" },

  // LA GIORNATA — three acts (real stills)
  "tempi-pool": { type: "image", src: "/media/tempi-pool.jpg" },
  "tempi-bites": { type: "image", src: "/media/food-1.jpg" },
  "tempi-bar": { type: "image", src: "/media/tempi-bar.jpg" },

  // LE SERE — sun-over-lake clip
  "sere": { type: "video", src: "/media/gallery-sere.mp4", poster: "/media/gallery-sere.jpg" },

  // DOVE SIAMO — villa + pool still
  "location": { type: "image", src: "/media/location.jpg" },

  // GALLERY — vertical
  "gallery-luce": { type: "image", src: "/media/gallery-luce.jpg" },
  "gallery-acqua": { type: "image", src: "/media/gallery-acqua.jpg" },
  "gallery-tavola": { type: "image", src: "/media/gallery-tavola.jpg" },
  "gallery-sere": { type: "video", src: "/media/gallery-sere.mp4", poster: "/media/gallery-sere.jpg" },

  // FOOD — real plating
  "food-1": { type: "image", src: "/media/food-1.jpg" },
  "food-2": { type: "image", src: "/media/food-2.jpg" },
  "food-3": { type: "image", src: "/media/food-3.jpg" },
  "food-4": { type: "image", src: "/media/food-4.jpg" },
};

export function getMedia(key: string): MediaEntry {
  return MEDIA[key] ?? null;
}
