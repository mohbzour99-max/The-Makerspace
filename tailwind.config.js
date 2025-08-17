/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f9d2d8',
          300: '#f4adb8',
          400: '#ec7d92',
          500: '#e04d6e',
          600: '#cd2d54',
          700: '#721f31',
          800: '#5c1a28',
          900: '#4d1722',
        },
        secondary: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#1d1d1b',
        },
        accent: {
          50: '#fefcf3',
          100: '#fef7e0',
          200: '#fdecc0',
          300: '#fbdc95',
          400: '#f8c668',
          500: '#f5b041',
          600: '#e99025',
          700: '#ae801c',
          800: '#8f6a1e',
          900: '#75571d',
        }
      },
      fontFamily: {
        'sans': ['Roboto', 'system-ui', 'sans-serif'],
        'arabic': ['Helvetica Neue LT', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        '8xl': '100rem',
      }
    },
  },
  plugins: [],
}