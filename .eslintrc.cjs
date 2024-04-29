module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  plugins: ["svelte"],
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
    },
  ],
  rules: {},
};
