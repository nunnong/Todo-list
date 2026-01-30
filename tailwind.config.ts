import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#f9fafb",
        },
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          800: "#1e293b",
          900: "#0f172a",
        },
        violet: {
          100: "#ede9fe",
          600: "#7c3aed",
        },
        rose: {
          500: "#f43f5e",
        },
        lime: {
          300: "#bef264",
        },
        amber: {
          800: "#92400e",
        },
      },
      fontFamily: {
        nanum: ["var(--font-nanum)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
