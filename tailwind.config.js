/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      colors: {
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5d9e2',
          300: '#b0b7c6',
          400: '#828ca5',
          500: '#626d88',
          600: '#4d566f',
          700: '#3f475a',
          800: '#363c4c',
          900: '#1f2330',
          950: '#13151d',
        },
        accent: {
          500: '#5b6cff',
          600: '#4453ff',
          700: '#3641d9',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 17, 26, 0.04), 0 4px 16px rgba(15, 17, 26, 0.06)',
      },
    },
  },
  plugins: [],
};
