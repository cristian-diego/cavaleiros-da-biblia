/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2', // Friendly blue
        secondary: '#FFD700', // Cheerful yellow
        success: '#2ECC71', // Bright green
        warning: '#F1C40F', // Warm yellow
        danger: '#E74C3C', // Soft red
        background: '#F8F9FA', // Light background
        'kid-blue': '#4A90E2',
        'kid-yellow': '#FFD700',
        'kid-green': '#2ECC71',
        'kid-red': '#E74C3C',
        'kid-purple': '#9B59B6',
        'kid-orange': '#E67E22',
      },
      borderRadius: {
        kid: '1rem',
        'kid-lg': '1.5rem',
        'kid-xl': '2rem',
      },
      fontSize: {
        'kid-sm': '1rem',
        'kid-base': '1.125rem',
        'kid-lg': '1.25rem',
        'kid-xl': '1.5rem',
        'kid-2xl': '2rem',
      },
      spacing: {
        kid: '1rem',
        'kid-lg': '1.5rem',
        'kid-xl': '2rem',
      },
      animation: {
        'bounce-soft': 'bounce 1s infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
};
