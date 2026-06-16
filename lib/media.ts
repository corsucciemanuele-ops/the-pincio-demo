/**
 * Central registry for real assets. Everything is null for now — the site
 * runs on graded placeholders. To go live, drop a file in /public and set its
 * src here; the matching <MediaSlot> swaps from placeholder to real media with
 * zero component changes.
 *
 * type "video" → muted autoplay loop (drone / pool / sunset clips)
 * type "image" → still photography (food, gallery, location)
 */
export type MediaEntry = { type: "video" | "image"; src: string; poster?: string } | null;

export const MEDIA: Record<string, MediaEntry> = {
  "hero": null, // full-bleed golden-hour drone of pool + lake
  "pool": null, // pool water / loungers / people clip
  "gallery-luce": null,
  "gallery-acqua": null,
  "gallery-tavola": null,
  "gallery-sere": null,
  "food-1": null,
  "food-2": null,
  "food-3": null,
  "food-4": null,
  "location": null, // drone of the colle over the lake
  "sunset": null, // sunset timelapse
};

export function getMedia(key: string): MediaEntry {
  return MEDIA[key] ?? null;
}
