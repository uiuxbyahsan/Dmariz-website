/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FAF6F0",
          deep: "#F3EADD",
        },
        maroon: {
          DEFAULT: "#5C1A22",
          dark: "#3D1117",
          light: "#7A2731",
        },
        gold: {
          DEFAULT: "#C9A769",
          light: "#E8C896",
          dark: "#B08E4F",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(circle, rgba(201,167,105,0.18) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-grid": "22px 22px",
      },
    },
  },
  plugins: [],
};
