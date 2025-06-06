/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f0fe',
          100: '#e4e4fd',
          200: '#cdcdfc',
          300: '#a8a8f9',
          400: '#7c7cf4',
          500: '#5555ee',
          600: '#3e3ee3',
          700: '#2d2a73',
          800: '#272564',
          900: '#252151',
        },
        accent: {
          50: '#fef9ec',
          100: '#fef0c9',
          200: '#fde18e',
          300: '#fca311',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f4f4f8',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#1e1e1e',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        josefin: ['Josefin Sans', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};