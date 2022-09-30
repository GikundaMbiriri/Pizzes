/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar-hide"),
  ],
  theme: {
    extend: {
      fontFamily: {
        Henny: ["Henny Penny", "cursive"],
        Playfair: ["Playfair Display", "serif"],
        Farsan: ["Farsan", "cursive"],
        Abel: ["Abel", "sans-serif"],
      },
      keyframes: {
        fade: {
          "0%": { opacity: 0 },
          " 20%": { opacity: 1 },
          " 33% ": { opacity: 1 },
          "53%": { opacity: 0 },
          " 100%": { opacity: 0 },
        },
      },
      colors: {
        "pizzes-pink": "#f3078998",
      },
    },
  },
};
