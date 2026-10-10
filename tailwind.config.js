/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f7f6f0",
        ink: "#1d2924",
        muted: "#667169",
        lime: "#e3ff76",
        line: "#d8dbd2",
        "lime-hover": "#efffae",
        "ink-dark": "#121b17",
      },
      fontFamily: {
        display: ["FieldDisplay", "sans-serif"],
        sans: ["FieldSans", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 24s linear infinite",
        marquee: "marquee 35s linear infinite",
        pulseSlow: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
