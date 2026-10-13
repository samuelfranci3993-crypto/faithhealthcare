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
        brand: {
          DEFAULT: "#0284c7", // Light/Medical Sky Blue
          hover: "#0369a1",
          dark: "#075985",
          light: "#e0f2fe", // Soft pastel sky blue
          mist: "#f0f9ff", // Crisp ice blue
          peach: "#f0f9ff", // Soft blue wash
          orange: "#0ea5e9", // Electric sky
          yellow: "#38bdf8", // Cyan sky accent
        },
        ink: {
          DEFAULT: "#0f172a", // Deep slate
          soft: "#334155",
          muted: "#64748b",
        },
        emerald: {
          DEFAULT: "#0284c7",
          deep: "#0369a1",
          soft: "#e0f2fe",
          mist: "#f0f9ff",
        },
        teal: {
          DEFAULT: "#0284c7",
          deep: "#0369a1",
          soft: "#e0f2fe",
          mist: "#f0f9ff",
        },
        sky: {
          DEFAULT: "#0284c7",
          light: "#e0f2fe",
          dark: "#0369a1",
        },
        line: "#e2e8f0",
        sand: "#f8fafc",
        sage: "#64748b",
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
