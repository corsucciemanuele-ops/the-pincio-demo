import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "The Pincio",
    short_name: "The Pincio",
    description:
      "Sul colle, nel cuore del Montefeltro, The Pincio nasce come destinazione d'estate: piscina, aperitivi e sere a bordo acqua. Apertura estate 2027.",
    start_url: "/",
    display: "fullscreen",
    display_override: ["fullscreen", "standalone"],
    background_color: "#F5F0E6",
    theme_color: "#F5F0E6",
    lang: "it",
    orientation: "portrait",
    categories: ["food", "lifestyle", "travel"],
    icons: [
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
