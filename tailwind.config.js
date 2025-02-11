/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'layout-background': 'linear-gradient(to left,#FAFAFA, #FAFAFA)',

        'navbar-layout': 'linear-gradient(#fff,#fff)',

        'table-header': 'linear-gradient(#E3E4E6,#E3E4E6)',
        'table-body': 'linear-gradient(rgb(250, 250, 250),rgb(250, 250, 250))',

        
        'menu-header': 'linear-gradient( rgb(255, 255, 255),rgb(255, 255, 255))',
        'menu-body': 'linear-gradient( rgb(248, 248, 248),rgb(248, 248, 248))',
        

        'menu-option': 'linear-gradient( #ffffff, #ffffff)',
        'menu-option-active': 'linear-gradient(to right, rgb(255, 255, 255),rgb(255, 238, 238))',


        'box-layout': 'linear-gradient(rgb(255, 255, 255),rgb(255, 255, 255))',

        'chart-bg': 'linear-gradient(rgb(253, 253, 253),rgb(253, 253, 253))',
     },
     colors: {
      'default-txt-color': '#000',
      'input-placeholder-txt-color': ' rgb(85, 85, 85)',
      'input-bg-color': 'rgb(241, 241, 241)',

      'menu-option-border': 'rgb(221, 94, 125)',

      'button-bg': 'rgb(221, 94, 125)',
      'button-txt-color': '#fff',
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
          background: "rgb(207, 116, 139)",
          "border-radius": "10px",
        },
      });
    }),

  ],
};
