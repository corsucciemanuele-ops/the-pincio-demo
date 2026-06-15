import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paper & ink — warm, quiet, expensive
        cream: "#F5F0E6",
        ivory: "#EFE8D9",
        sand: "#E7DDC9",
        ink: "#26251F",
        graphite: "#3A382F",
        stone: "#8C887C",
        mist: "#B6B1A3",
        // Accents drawn from the lake & the hill
        sage: "#5E6F62",
        "sage-deep": "#3E4B43",
        gold: "#A98E5F",
        "gold-soft": "#C2A877",
        // Time of day — the day in three acts
        morning: "#DCD7C4",
        noon: "#CBD3CC",
        dusk: "#7E6E73",
        sunset: "#C58A6A",
        amber: "#E0A86E",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.32em",
        wide: "0.18em",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
