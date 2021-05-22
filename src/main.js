import * as Sentry from "@sentry/browser";
import App from "./App.svelte";
import { registerSW } from "virtual:pwa-register";

if (process.env.NODE_ENV === "production" && process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    allowUrls: [/https?:\/\/(www\.)?colorcolor\.in/],
  });
}

const app = new App({
  target: document.body,
  props: {},
});

registerSW();

export default app;
