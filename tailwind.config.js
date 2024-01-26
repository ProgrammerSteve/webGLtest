const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/****/***/**/*.{js,ts,jsx,tsx}",
    "./src/***/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xxs': "350px",
      'xs': "500px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
}