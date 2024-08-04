/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          light: '',
        },
        secondary: {
          light: '',
        },
        'custom-red': '#FC4B4E',
        'custom-yellow': '#FEC740',
        'custom-gray-1': '#8A949F',
        'custom-gray-2': '#B7BDC4',
        'custom-gray-3': '#E4E6E9',
        'custom-gray-4': '#F4F5F5',
      },
    },
  },
};
