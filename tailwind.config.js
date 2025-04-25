/** @type {import('tailwindcss').Config} */
const { vars } = require('nativewind/theme');

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Theme colors using CSS variables
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        success: '#2ECC71', // Bright green
        warning: '#F1C40F', // Warm yellow
        danger: '#E74C3C', // Soft red
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
  plugins: [
    // Set default theme values
    ({ addBase }) =>
      addBase({
        ':root': {
          '--color-primary': '74 144 226', // kid-bible blue
          '--color-secondary': '107 70 193', // kid-adventurers purple
          '--color-background': '245 245 245',
          '--color-text': '45 55 72',
          '--color-accent': '255 255 255',
        },
      }),
  ],
};
