/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slide: {
          '0%': {height: '0px'},
          '100%': {height: '100px'}
        }
      },
      animation: {
        slide: 'slide 1s ease .5 forwards'
      },
      fontFamily: {
        comforter: ["'Comforter Brush'"]
      },
      screens: {
        xs: '470px'
      },
      aspectRatio: {
        product: '0.35'
      }
  },
  plugins: [],
}}
