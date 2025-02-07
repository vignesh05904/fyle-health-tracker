/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-table-header': 'linear-gradient(rgb(85, 30, 114),rgb(83, 34, 109))',
        'custom-table-body': 'linear-gradient(#5c3372, #5c3372)',
        'custom-button': 'linear-gradient(#662477,#662477)',
        'custom-purple': ' #7a218b',
        'custom-pink': ' #e73be7',
        'menu-color': 'linear-gradient(#5c3372, #5c3372)',
        'menu-color-selected': 'linear-gradient(#5c3372,rgb(101, 51, 128))',
     },
     colors: {
      'custom-pink': 'rgba(132, 17, 143, 0.36)',
      'custom-white': '#fff',
      'purple-button': '#5c3372',
      'purple-button-hover': 'rgb(112, 59, 141)',
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

    }
  },
  plugins: [],
};
