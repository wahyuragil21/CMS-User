/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#007965',
        'secondary': '#00AF91',
        'tertiary': '#B80000',
        'quaternary': '#F58634',
      },
      letterSpacing: {
        widest: '1em',
      }
    },
  },
  plugins: [require("daisyui")],
}


