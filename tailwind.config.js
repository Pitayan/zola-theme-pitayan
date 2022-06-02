const path = require("path")

module.exports = {
  darkMode: "class",
  content: [
    path.resolve(__dirname, "assets/**/*.{ts,js,svg}"),
    './templates/**/*.html'
  ],
  variants: {
    extend: {},
  },
  plugins: [],
}
