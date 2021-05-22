import { defineConfig } from "vite";
import svelte from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";
import { injectHtml } from "vite-plugin-html";
import legacy from "@vitejs/plugin-legacy";

import siteInfo from "./site-info.js";

export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    injectHtml({
      injectData: {
        ...siteInfo,
      },
    }),
    svelte(),
    VitePWA({
      registerType: "autoUpdate",
    }),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
});
