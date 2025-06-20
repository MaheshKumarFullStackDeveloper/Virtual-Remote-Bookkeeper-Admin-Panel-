module.exports = withMT({
 
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', "sans-serif"], // Set "DM Sans" as the font family
        dmSans: ['DM Sans', 'sans-serif'],
        georgia: ['Georgia', 'serif'],
        roboto: ['Roboto', 'sans-serif'],

      },
      screens: {
        'csm': '600px', // Custom breakpoint for 600px
      },

    }, 
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}",'./pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
],
  plugins: [ function({ addUtilities }) {
    addUtilities({
      '.line-clamp-2': {
        display: '-webkit-box',
        '-webkit-line-clamp': '2',
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
      },
    });
  },
],
  safelist: [
    "bg-[rgb(42,108,101)]"
  ],

});
