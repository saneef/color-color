import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { VitePWA } from "vite-plugin-pwa";

import siteInfo from "./src/lib/site-info.js";

export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    createHtmlPlugin({
      inject: {
        data: { ...siteInfo, domain: process.env.PLAUSIBLE_DOMAINS || "" },
      },
    }),
    svelte(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "color × color",
        short_name: "colorcolor",
        background_color: "#e5e7eb",
        theme_color: "#111827",
      },
    }),
  ],
});
