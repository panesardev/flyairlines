/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#395886",
        "secondary": "#eaf0fb",
        "accent": "#638ECB",
        "base": "#F0F3FA",
      },
    },
  },
  plugins: [],
}