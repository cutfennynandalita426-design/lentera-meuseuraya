/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-brown': '#4A2C1D',
        'wood-brown': '#6B3E26',
        'gold': '#F2C94C',
        'cream': '#F7E7C6',
        'forest-green': '#6D8B32',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(242,201,76,0.3)' },
          '50%': { boxShadow: '0 0 24px rgba(242,201,76,0.6)' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'correct-flash': {
          '0%': { backgroundColor: 'rgba(109,139,50,0.3)' },
          '50%': { backgroundColor: 'rgba(109,139,50,0.6)' },
          '100%': { backgroundColor: 'rgba(109,139,50,0.15)' },
        },
        'wrong-flash': {
          '0%': { backgroundColor: 'rgba(180,60,60,0.3)' },
          '50%': { backgroundColor: 'rgba(180,60,60,0.6)' },
          '100%': { backgroundColor: 'rgba(180,60,60,0.15)' },
        },
        'crown-bounce': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-8px) rotate(-5deg)' },
          '75%': { transform: 'translateY(-8px) rotate(5deg)' },
        },
        'timer-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-in': 'bounce-in 0.6s ease-out forwards',
        'correct-flash': 'correct-flash 0.6s ease-out',
        'wrong-flash': 'wrong-flash 0.6s ease-out',
        'crown-bounce': 'crown-bounce 1.5s ease-in-out infinite',
        'timer-pulse': 'timer-pulse 0.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
