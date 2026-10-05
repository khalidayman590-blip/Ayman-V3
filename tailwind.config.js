/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './App.tsx',
    './index.tsx',
    './components/**/*.{ts,tsx}',
    './diwan/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'system-ui', 'sans-serif'],
        shaer: ['Amiri', 'serif'],
      },
      colors: {
        ليل: '#0a0805',
        ليل٢: '#14100a',
        ذهب: {
          100: '#f7e3a1',
          200: '#ecd08a',
          300: '#dcb96a',
          400: '#d3a94f',
          500: '#c39a3d',
          600: '#a47b28',
          700: '#7d5c1c',
        },
      },
    },
  },
  plugins: [],
};
