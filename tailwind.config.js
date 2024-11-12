/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#4ade80',
          secondary: '#38bdf8',
          light: '#f0fdf4',
          dark: '#064e3b'
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
      },
    },
  },
  plugins: [],
};