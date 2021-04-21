const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");

module.exports = {
  purge: {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    options: {
      defaultExtractor: (content) => [
        ...tailwindExtractor(content),
        ...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
      ],
      keyframes: true,
    },
  },
  theme: {
    extend: {
      colors: {
        'dark-blue': 'rgb(30, 52, 88)',
        orange: 'rgb(238, 125, 68)',
        teal: 'rgb(3, 174, 173)',
        'light-teal': 'rgb(135, 204, 204)',
        red: 'rgb(189, 22, 34)',
        green: 'rgb(141,198,63)',
        pink: 'rgb(233,74,122)',
        'dark-grey': 'rgb(64,70,73)',
        purple: 'rgb(134,69,153)',
        'light-grey': 'rgb(229,229,229)'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
