/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'layout-background': 'linear-gradient(to right,rgb(252, 239, 248),rgb(236, 245, 255))',

        'navbar-layout': 'linear-gradient(#fff,#fff)',

        'table-header': 'linear-gradient(#E3E4E6,#E3E4E6)',
        'table-body': 'linear-gradient(rgb(250, 250, 250),rgb(250, 250, 250))',

        
        'menu-header': 'linear-gradient( rgb(255, 255, 255),rgb(255, 255, 255))',
        'menu-body': 'linear-gradient( rgb(248, 248, 248),rgb(248, 248, 248))',

        'menu-option': 'linear-gradient( #ffffff, #ffffff)',
        'menu-option-active': 'linear-gradient(to right, rgb(255, 255, 255),rgb(255, 238, 238))',


        'box-layout': 'linear-gradient(rgb(255, 255, 255),rgb(255, 255, 255))',

        'chart-bg': 'linear-gradient(rgb(250, 250, 250),rgb(250, 250, 250))',

        'custom-test': 'linear-gradient(rgb(255, 255, 255),rgb(255, 144, 172))',
     },
     fontSize: {
      '10px': '10px',
      '14px': '14px',
      '15px': '15px',
      '16px': '16px',
      '18px': '18px',
      '20px': '20px',
      '24px': '24px',
      '26px': '26px',
      '28px': '28px',
      '30px': '30px',
    },
     colors: {
      'default-txt-color': '#000',
      'input-placeholder-txt-color': ' rgb(85, 85, 85)',
      'input-bg-color': 'rgb(241, 241, 241)',

      'menu-option-border': 'rgb(206, 153, 166)',

      'button-bg': 'rgb(221, 94, 125)',
      'button-txt-color': 'rgb(255, 255, 255)',
      'button-bg-hover': 'rgb(241, 80, 121)',

      primary: {
        light: "rgb(15, 41, 95)",
      },
     },
     fontFamily: {
      custom: ['LouisGeorge'],
      sans: ['Inter', 'sans-serif'],
      playwrite: ['"Playwrite IN"', 'sans-serif'],
      quicksand: ['"Quicksand"', 'sans-serif'],
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    },
    animation: {
      'fade-in': 'fadeIn 0.5s ease-out forwards',
    },
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-light::-webkit-scrollbar": {
          width: "6px",
        },
        ".scrollbar-light::-webkit-scrollbar-track": {
          background: "transparent",
        },
        ".scrollbar-light::-webkit-scrollbar-thumb": {
          background: "rgb(201, 100, 125)",
          "border-radius": "10px",
        },
      });
    }),

  ],
};
