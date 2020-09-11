module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: { version: 3, proposals: true },
        targets: "> 0.25%, not dead",
      },
    ],
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-runtime",
  ],
};
