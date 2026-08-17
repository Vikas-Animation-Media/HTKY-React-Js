/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all JS/TS/JSX/TSX files in the src directory for Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

