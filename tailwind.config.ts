import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        telugu: ["var(--font-telugu)", "var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "fluid-sm": "clamp(0.875rem, 2vw, 0.9375rem)",
        "fluid-base": "clamp(1rem, 2.5vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 2.5vw, 1.25rem)",
        "fluid-xl": "clamp(1.25rem, 3vw, 1.5rem)",
        "fluid-2xl": "clamp(1.5rem, 4vw, 2rem)",
      },
    },
  },
  plugins: [],
};

export default config;
