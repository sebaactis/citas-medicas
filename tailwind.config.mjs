/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

module.exports = {
  darkMode: "class",
  content: [
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
  }
};