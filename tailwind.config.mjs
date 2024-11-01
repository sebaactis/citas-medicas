/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: 'var(--color-foreground)',
        'muted-foreground': 'var(--color-muted-foreground)',
      },
    }
  },
};