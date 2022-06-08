module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Open Sans'],
        display: ['Raleway']
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp'),],
}
