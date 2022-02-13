const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{html,vue,js,ts,jsx,tsx}'],
  theme: {
    extend:{
      colors: {
        background: {
          DEFAULT: '#2B195E',
          100: '#6E4BCF',
          200: '#5733BF',
          300: '#482A9E',
          400: '#3A227E',
          500: '#2B195E',
          600: '#22144A',
          700: '#190E36',
          800: '#0F0922',
          900: '#06040D'
        },
        primary: {  
          DEFAULT: '#3B357D',
          100: '#817AC7',
          200: '#6961BC',
          300: '#534AAF',
          400: '#474096',
          500: '#3B357D',
          600: '#2D2960',
          700: '#201D44',
          800: '#121127',
          900: '#05040A'
        },
        secondary: {
          DEFAULT: '#66FCF1',
          100: '#DEFEFC',
          200: '#C0FEF9',
          300: '#A2FDF6',
          400: '#84FDF4',
          500: '#66FCF1',
          600: '#43FBEE',
          700: '#20FBEB',
          800: '#05F2E1',
          900: '#04CFC0'
        },
        tertiary: '#ecc94b'
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding'
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
        'mono': ['Roboto Mono', 'monospace']
      }
    }
  },
  variants: {
    extend: {
      lineClamp: ["hover"]
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
