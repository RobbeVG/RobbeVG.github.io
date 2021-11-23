module.exports = {
  mode: 'jit', //just in time mode - faster builds - (dev preview)
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], //removes unused styles
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
