/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./app.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkBg: '#05070a', // Negro casi puro para OLED
        darkCard: '#0f141e', // Gris azulado profundo para tarjetas
        accent: {
          primary: '#6366f1', // Indigo eléctrico
          secondary: '#ec4899', // Rosa vibrante
          success: '#10b981', // Esmeralda
          warning: '#f59e0b', // Ámbar
        }
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
      }
    },
  },
  plugins: [],
}