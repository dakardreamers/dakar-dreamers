import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F5F0E6", ivory: "#FBF8F1", sand: "#D9C7A7",
        choco: "#3B2A1E", olive: "#6B6B3A", ink: "#1A1512",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      letterSpacing: { widest2: "0.35em" },
      animation: {
        marquee: "marquee 28s linear infinite",
        "fade-up": "fadeUp 0.9s cubic-bezier(0.2,0.7,0.2,1) forwards",
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        fadeUp: { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};
export default config;