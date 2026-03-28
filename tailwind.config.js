/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./app.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#6366f1',
          dark: '#4f46e5',
          accent: '#ec4899'
        }
      },
      borderRadius: {
        'cloud': '3rem',
      }
    },
  },
  plugins: [],
}