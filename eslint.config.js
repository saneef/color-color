import prettier from "eslint-config-prettier";
import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import svelteConfig from "./svelte.config.js";
import { defineConfig } from "eslint/config";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,

  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },

  {
    files: ["**/*.svelte", "**/*.svelte.js"],
    languageOptions: { parserOptions: { svelteConfig } },
  },
]);
