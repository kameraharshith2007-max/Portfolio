/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Layered dark grey palette — NOT pitch black
        surface: {
          950: '#0A0A0B',
          900: '#101012',
          850: '#151517',
          800: '#1A1A1D',
          750: '#202024',
          700: '#252529',
          650: '#2A2A2F',
          600: '#303035',
          500: '#3A3A40',
          400: '#4A4A52',
          300: '#5E5E68',
        },
        ink: {
          100: '#FFFFFF',
          90: '#F5F5F7',
          80: '#E8E8EC',
          70: '#CFCFD5',
          60: '#AFAFB8',
          50: '#8E8E98',
          40: '#6E6E78',
        },
        accent: {
          100: '#F4E4C1',
          200: '#E8D09A',
          300: '#D4B876',
          400: '#C9A961',
          500: '#B0914A',
          600: '#8C7338',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'wide-2': '0.08em',
        'wide-3': '0.15em',
        'ultra': '0.25em',
      },
      animation: {
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
        'ken-burns-slow': 'kenBurns 30s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
      },
      keyframes: {
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.08) translate(-1%, -1%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
