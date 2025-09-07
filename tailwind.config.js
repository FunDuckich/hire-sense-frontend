/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        equalize: {
          '0%, 100%': { height: '0.5rem' },
          '50%': { height: '2.5rem' },
        }
      },
      animation: {
        equalize: 'equalize 1.2s infinite ease-in-out',
      }
    },
  },
  plugins: [],
}