/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tkd: {
          red: '#dc2626',
          'red-dark': '#991b1b',
          'red-light': '#fef2f2',
          black: '#0f0f10',
          'black-dark': '#050505',
          charcoal: '#1f242d',
          gold: '#eab308',
          silver: '#94a3b8',
          bronze: '#d97706',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'tkd': '0 10px 25px -5px rgba(220, 38, 38, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        'tkd-lg': '0 20px 35px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -5px rgba(220, 38, 38, 0.1)',
      }
    },
  },
  plugins: [],
}
