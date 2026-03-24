/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        bg: { primary: '#06080f', secondary: '#0c1022', card: 'rgba(14, 19, 40, 0.85)' },
        accent: { cyan: '#00d4ff', amber: '#ffb800', emerald: '#34d399', rose: '#fb7185' },
        txt: { primary: '#f0f2f8', secondary: '#8891a5', muted: '#4a5168' },
      },
    }
  },
  plugins: []
};
