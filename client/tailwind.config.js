/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      colors: {
        bg: "#140E1F",
        surface: "#1F1730",
        surface2: "#2A2040",
        ink: "#F3EEFA",
        muted: "#B3A3C7",
        pink: "#FF5D8F",
        orange: "#FFAE5C",
        mint: "#3FE0C5",
      },

      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },

      backgroundImage: {
        momentum:
          "linear-gradient(120deg, #FF5D8F 0%, #FFAE5C 100%)",
      },
    },
  },

  plugins: [],
};