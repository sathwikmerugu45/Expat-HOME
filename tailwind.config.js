/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in-from-top-4': 'slide-in-from-top-4 0.5s ease-out',
        'slide-in-from-bottom-4': 'slide-in-from-bottom-4 0.5s ease-out',
        'slide-in-from-left-4': 'slide-in-from-left-4 0.5s ease-out',
        'slide-in-from-right-4': 'slide-in-from-right-4 0.5s ease-out',
        'slide-in-from-bottom-8': 'slide-in-from-bottom-8 0.5s ease-out',
        'slide-in-from-top-8': 'slide-in-from-top-8 0.5s ease-out',
        'pulse-glow': 'pulse-glow 2s infinite',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in-from-top-4': {
          from: { opacity: '0', transform: 'translateY(-1rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-from-bottom-4': {
          from: { opacity: '0', transform: 'translateY(1rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-from-left-4': {
          from: { opacity: '0', transform: 'translateX(-1rem)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-from-right-4': {
          from: { opacity: '0', transform: 'translateX(1rem)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-from-bottom-8': {
          from: { opacity: '0', transform: 'translateY(2rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-from-top-8': {
          from: { opacity: '0', transform: 'translateY(-2rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(16, 185, 129, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};