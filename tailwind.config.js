/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'navbar-layout': 'linear-gradient(rgb(74, 41, 83),rgb(74, 29, 85))',

        'table-header': 'linear-gradient(to bottom, rgb(74, 29, 85,0.8),rgb(74, 29, 85))',
        'table-body': 'linear-gradient(rgb(90, 48, 100), rgb(90, 48, 100))',

        'menu-header': 'linear-gradient( rgb(102, 35, 119),rgb(74, 26, 87))',
        'menu-body': 'linear-gradient(rgb(88, 33, 102),rgb(83, 27, 97, 0.7))',
        
        'menu-option': 'linear-gradient( #5c3372,#5c3372)',
        'menu-option-selected': 'linear-gradient(#5c3372,#653380)',
         
        'chart-layout': 'linear-gradient(to bottom, rgb(73, 32, 85),rgb(73, 32, 85))',
     },
     colors: {
      'purple-layout': 'rgb(74, 29, 85)',
      'purple-button': '#5c3372',
      'purple-button-hover': '#703b8d',
      primary: {
        light: "rgb(82, 50, 104)",
      },
      secondary: {
        light: "rgb(74, 29, 85)",
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
          background: "rgb(106, 53, 134)",
          "border-radius": "10px",
        },
      });
    }),

  ],
};
