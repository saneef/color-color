import { defineConfig } from "vite";
import svelte from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";
import { injectHtml } from "vite-plugin-html";
import siteInfo from "./site-info.js";

export default defineConfig({
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
  ],
});
