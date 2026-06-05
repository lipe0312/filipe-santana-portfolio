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
