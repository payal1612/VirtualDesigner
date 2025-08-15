/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FAF8F9',
          100: '#F5F1F2',
          200: '#EBE3E5',
          300: '#E1D5D8',
          400: '#D7C7CB',
          500: '#A7727D',
          600: '#955B68',
          700: '#7A4A56',
          800: '#5F3943',
          900: '#442831',
        },
        cream: {
          50: '#FEFCFA',
          100: '#FDF9F3',
          200: '#FBF3E7',
          300: '#F9EDDB',
          400: '#EDDBC7',
          500: '#EDDBC7',
          600: '#E5CDB5',
          700: '#DDBFA3',
          800: '#D5B191',
          900: '#CDA37F',
        },
        beige: {
          50: '#FEFCF9',
          100: '#FDF9F3',
          200: '#FBF3E7',
          300: '#F8EAD8',
          400: '#F8EAD8',
          500: '#F8EAD8',
          600: '#F0DCC6',
          700: '#E8CEB4',
          800: '#E0C0A2',
          900: '#D8B290',
        },
        lightest: {
          50: '#FEFEFE',
          100: '#FDFCFA',
          200: '#FBF9F5',
          300: '#F9F5E7',
          400: '#F9F5E7',
          500: '#F9F5E7',
          600: '#F1EDD9',
          700: '#E9E5CB',
          800: '#E1DDBD',
          900: '#D9D5AF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};