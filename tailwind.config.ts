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
        ink: {
          DEFAULT: "#0a192f",
          soft: "#1e293b",
          muted: "#475569",
        },
        emerald: {
          DEFAULT: "#059669",
          deep: "#047857",
          dark: "#064e3b",
          soft: "#d1fae5",
          mist: "#ecfdf5",
          glow: "#10b981",
        },
        teal: {
          DEFAULT: "#059669",
          deep: "#047857",
          soft: "#d1fae5",
          mist: "#ecfdf5",
        },
        navy: {
          DEFAULT: "#0a192f",
          dark: "#050d1a",
          surface: "#0f233f",
          soft: "#1e293b",
          subtle: "#e2e8f0",
        },
        sage: "#059669",
        sand: "#f8fafc",
        line: "#e2e8f0",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 40px -20px rgba(12, 46, 58, 0.28)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "wave-drift": {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(-2%) translateY(1%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "fade-up-delay": "fade-up 0.7s ease-out 0.12s both",
        "fade-up-delay-2": "fade-up 0.7s ease-out 0.24s both",
        "fade-in": "fade-in 0.5s ease-out both",
        "wave-drift": "wave-drift 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
