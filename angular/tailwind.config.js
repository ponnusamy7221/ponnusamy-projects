/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      height: {
        '8.5': '34px',
        '13': '50px',
        '18.5': '74px',
        '38.5': '151px',
        '50': '201px'
      },
      colors: {
        'grey-dc': '#D1D1D1',
        'primary-dc': '#722BE2',
        'body-dc': '#F4F4F4',
        'menu-active': '#B188FF',
        'menu-outline': '#333333',
        'menu-hover': '#EEE5FF',
        'primary-button': '#E8E1FF',
        'primary-button-outline': '#B188FF',
        'snow-green': '#DEFFDF',
        'snow-green-outline': '#A3E5BD',
        'snow-red': '#FFD4D9',
        'snow-red-outline': '#FF88A2',
        'card-label': '#828282',
        'label': '#7C7C7C',
        'value': '#2B2B2B'
      },

      fontSize: {
        'xxs': '9px',
        'ssm': '10px',
        'smm': '14px',
        '1xl': '18px',
      },
      width: {
        '8.5': '34px',
        '13': '50px',
        '18.5': '74px',
        '22': '5.625rem',
        '1/2.5': '28%',
        '1/2.8': '30%'
      },
      gap: {
        '2.5': '0.375rem'
      },
      gridTemplateRows: {
        '19': '76px'
      }
    },
  },
  plugins: [],
}

