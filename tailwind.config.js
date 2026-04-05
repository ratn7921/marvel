/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        marvel: {
          red: '#ec1d24',
          black: '#000000',
          dark: '#151515',
          light: '#f5f5f5',
        }
      },
      fontFamily: {
        marvel: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
