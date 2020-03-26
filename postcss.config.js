const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.svelte"],
  whitelistPatterns: [/svelte-/],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

const production = !process.env.ROLLUP_WATCH;

module.exports = {
  plugins: [
    require("postcss-import")(),
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-nesting"),
    ...(production
      ? [
          purgecss,
          require("cssnano")({
            preset: [
              "default",
              {
                discardComments: {
                  removeAll: true,
                },
              },
            ],
          }),
        ]
      : []),
  ],
};
