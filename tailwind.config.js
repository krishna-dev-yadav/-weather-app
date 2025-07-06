/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // this line is crucial for React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}