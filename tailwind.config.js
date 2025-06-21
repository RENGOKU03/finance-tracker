/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans], // Set Inter as the primary sans-serif font
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans], // Keep Poppins if you use it for specific elements
      },
      // You can add custom shadows for glass morphism
      boxShadow: {
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.15) inset',
      }
    },
  },
  plugins: [],
}