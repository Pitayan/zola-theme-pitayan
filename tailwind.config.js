const path = require("path")

module.exports = {
  darkMode: "class",
  content: [
    path.resolve(__dirname, "assets/**/*.{ts,js,svg}"),
    './templates/**/*.html'
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in-scale": {
          "0%": {
            opacity: "0",
            transform: "scale(0) rotate(270deg)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) rotate(360deg)",
          },
        },
      },
      animation: {
        "fade-in-scale": "fade-in-scale 0.5s ease-in-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
