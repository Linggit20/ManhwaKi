/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2493FA',
        't-white' : '#F3F9FF',
        'bg-300' : '#1F2229',
        'bg-200' : '2C384E',
        'bg-100' : '242A37'
      }
    },
  },
  plugins: [],
}

