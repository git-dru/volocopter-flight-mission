/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mainBackgroundColor": '#FAFAFA',
        "columnBackgroundColor": '#F3F4F5',
        "preFlight": "#F98E2B",
        "flight": "#467AFF",
        "postFlight": "#49CD80"
      }
    },
  },
  plugins: [],
}

