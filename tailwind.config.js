/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      backgroundImage: {
        "home-button": "url('/assets/gradient.jpg')",
      },
      dropShadow: {
        disc: "0px 0px 0px 43px rgba(0,0,0,0.21)",
      },
      colors: {
        main: "#191B28",
      },
      textColor: {
        black: "#181C27",
      },
    },
  },
  plugins: [],
};
