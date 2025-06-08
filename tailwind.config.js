/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ['bg-primary-100', 'bg-primary-200', 'bg-primary-300', 'bg-primary-400', 'bg-primary-500', 'bg-primary-600',],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#A38BE920',
          200: '#A38BE9',
          300: '#906CE5',
          400: '#7E4CE0',
          500: '#7D40D9',
          600: '#B5ABEE',
        },
      },
    },
  },
  plugins: [], 
};
