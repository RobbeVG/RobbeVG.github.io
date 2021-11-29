const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.yellow,
      green: colors.green,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink,
      black: colors.black,
      white: colors.white,

      primary: '#3B357D',
      secondary: '#66FCF1',
      tertiary: '#ecc94b'
    },
    fontFamily: {
      'sans': ['Roboto'],
    },
    extend: {
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
