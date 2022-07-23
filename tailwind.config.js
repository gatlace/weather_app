/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "morning": "url('./src/assets/backgrounds/morning.jpg')",
        "day": "url('./src/assets/backgrounds/day.jpg')",
        "evening": "url('./src/assets/backgrounds/evening.jpg')",
        "night": "url('./src/assets/backgrounds/night.jpg')",
      },
      boxShadow: {
        'outline': '0 0 10px 2px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
