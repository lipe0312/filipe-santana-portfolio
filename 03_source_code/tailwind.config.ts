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
        "background-base": "var(--color-background-base)",
        "surface": "var(--color-surface)",
        "border": "var(--color-border)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "accent": "var(--color-accent)",
        "pearl": "#FCFCFC",
        "alabaster": "#F9FAFB",
        "soft-slate": "#F1F5F9",
        "zinc-mist": "#F4F4F5",
      },
      keyframes: {
        "blob-a": {
          "0%": { transform: "translate(0%, 0%)" },
          "50%": { transform: "translate(12%, -18%)" },
          "100%": { transform: "translate(-8%, 10%)" },
        },
        "blob-b": {
          "0%": { transform: "translate(0%, 0%)" },
          "50%": { transform: "translate(-14%, 12%)" },
          "100%": { transform: "translate(6%, -9%)" },
        },
        "blob-c": {
          "0%": { transform: "translate(0%, 0%)" },
          "50%": { transform: "translate(10%, 16%)" },
          "100%": { transform: "translate(-12%, -6%)" },
        },
      },
      animation: {
        "blob-slow": "blob-a 24s ease-in-out infinite alternate",
        "blob-mid": "blob-b 31s ease-in-out infinite alternate",
        "blob-fast": "blob-c 18s ease-in-out infinite alternate",
      },
      borderRadius: {
        "card": "var(--radius-card)",
        "tag": "var(--radius-tag)",
      },
      spacing: {
        "gap": "var(--spacing-gap)",
        "padding": "var(--spacing-padding)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-geist-sans)", "Inter", "sans-serif"],
      },
      screens: {
        mobile: "0px",
        tablet: "768px",
        desktop: "1024px",
        wide: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
