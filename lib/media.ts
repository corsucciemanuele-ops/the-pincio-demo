/**
 * Central registry for real assets.
 *
 * Each slot points at its expected file in /public/media. Drop a file with the
 * matching name and it appears automatically; if the file is missing, the
 * <MediaSlot> silently falls back to its graded placeholder (it listens for a
 * load error). So you can add assets one at a time, in any order.
 *
 *   type "video" → muted autoplay loop (drone / pool / sunset clips)
 *   type "image" → still photography (food, gallery, location)
 *
 * Expected files (see public/media/README.md for full specs):
 *   hero.mp4  sunset.mp4  pool.mp4  location.jpg
 *   gallery-luce.jpg  gallery-acqua.jpg  gallery-tavola.jpg  gallery-sere.jpg
 *   food-1.jpg  food-2.jpg  food-3.jpg  food-4.jpg
 */
export type MediaEntry = { type: "video" | "image"; src: string; poster?: string } | null;

export const MEDIA: Record<string, MediaEntry> = {
  // 🎬 videos (16:9, muted loop) — graceful fallback to poster if missing
  "hero": { type: "video", src: "/media/hero.mp4", poster: "/media/hero.jpg" },
  "sunset": { type: "video", src: "/media/sunset.mp4", poster: "/media/sunset.jpg" },
  "pool": { type: "video", src: "/media/pool.mp4", poster: "/media/pool.jpg" },

  // 📷 location — landscape 4:3 (photo, or swap to a clip later)
  "location": { type: "image", src: "/media/location.jpg" },

  // 📷 gallery — vertical 4:5 (sere is a real sunset clip)
  "gallery-luce": { type: "image", src: "/media/gallery-luce.jpg" },
  "gallery-acqua": { type: "image", src: "/media/gallery-acqua.jpg" },
  "gallery-tavola": { type: "image", src: "/media/gallery-tavola.jpg" },
  "gallery-sere": { type: "video", src: "/media/gallery-sere.mp4", poster: "/media/gallery-sere.jpg" },

  // 📷 food — vertical 3:4
  "food-1": { type: "image", src: "/media/food-1.jpg" },
  "food-2": { type: "image", src: "/media/food-2.jpg" },
  "food-3": { type: "image", src: "/media/food-3.jpg" },
  "food-4": { type: "image", src: "/media/food-4.jpg" },
};

export function getMedia(key: string): MediaEntry {
  return MEDIA[key] ?? null;
}
