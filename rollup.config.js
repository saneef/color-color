import autoPreprocess from "svelte-preprocess";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import livereload from "rollup-plugin-livereload";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import { template } from "./html-template.js";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    dir: "public",
    ...(production
      ? {
          entryFileNames: "[name].[hash].js",
          chunkFileNames: "[name].[hash].js",
          assetFileNames: "[name].[hash][extname]",
        }
      : {}),
  },
  plugins: [
    svelte({
      preprocess: autoPreprocess({
        postcss: true,
      }),
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      emitCss: true,
    }),
    replace({
      "process.env.NODE_ENV": !production
        ? JSON.stringify("development")
        : JSON.stringify("production"),
      "process.env.SENTRY_DSN": JSON.stringify(process.env.SENTRY_DSN),
    }),
    postcss({
      extract: true,
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    production &&
      babel({
        extensions: [".js", ".mjs", ".html", ".svelte"],
        babelHelpers: "runtime",
        exclude: [
          "node_modules/@babel/**",
          "node_modules/core-js/**",
          "node_modules/core-js-*/**",
        ],
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
      }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production &&
      terser({
        output: {
          comments: false,
        },
      }),

    html({
      template,
      attributes: {
        html: { lang: "en" },
        link: null,
        script: {
          async: "async",
          defer: "defer",
        },
      },
    }),
  ],
  watch: {
    clearScreen: false,
  },
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        });
      }
    },
  };
}
