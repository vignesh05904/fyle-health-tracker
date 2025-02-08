/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'table-header': 'linear-gradient(rgb(75, 26, 87),rgb(75, 26, 87))',
        'table-body': 'linear-gradient(rgb(90, 48, 100, 0.8), rgb(90, 48, 100))',

        'menu-header': 'linear-gradient(rgb(83, 27, 97),rgb(83, 27, 97))',
        'menu-body': 'linear-gradient(rgb(102, 36, 119, 0.8),rgb(83, 27, 97, 0.6))',
        
        'menu-option': 'linear-gradient(#5c3372,#5c3372)',
        'menu-option-selected': 'linear-gradient(#5c3372,#653380)',
         
        'chart-layout': 'linear-gradient(rgb(76, 38, 97),rgb(92, 51, 114, 0.6))',
     },
     colors: {
      'purple-layout': 'rgba(132, 17, 143, 0.36)',
      'purple-button': '#5c3372',
      'purple-button-hover': '#703b8d',
      primary: {
        light: "rgb(82, 50, 104)",
      },
      secondary: {
        light: "rgb(238, 42, 153)",
      },
     },
     fontFamily: {
      custom: ['LouisGeorge'], 
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
          width: "4px",
        },
        ".scrollbar-light::-webkit-scrollbar-track": {
          background: "transparent",
        },
        ".scrollbar-light::-webkit-scrollbar-thumb": {
          background: "#5c3372",
          "border-radius": "10px",
        },
      });
    }),

  ],
};
