/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'whatsapp-green': '#25D366',
        'whatsapp-teal': '#128C7E',
        'whatsapp-light': '#DCF8C6',
        'gray-750': '#2D3748',
        'gray-850': '#1A202C',
      },
      boxShadow: {
        'message': '0 1px 0.5px rgba(0, 0, 0, 0.13)',
      },
    },
  },
  plugins: [],
};