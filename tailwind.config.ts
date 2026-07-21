import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        boggs: {
          green: "#2F5233",
          "green-deep": "#233D26",
          grass: "#7CA24B",
          flagstone: "#6E6A62",
          mulch: "#5A3B27",
          cream: "#F4EFE6",
          "cream-dim": "#E9E2D4",
          steel: "#2B3A42",
          "steel-light": "#3C525E",
          black: "#1E1B17",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        head: ["var(--font-head)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        wide: "1240px",
      },
      boxShadow: {
        soft: "0 18px 50px -20px rgba(30,27,23,0.35)",
        card: "0 10px 30px -14px rgba(30,27,23,0.30)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
