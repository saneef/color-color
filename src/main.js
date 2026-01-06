import * as Sentry from "@sentry/browser";
import { mount } from "svelte";
import { registerSW } from "virtual:pwa-register";
import App from "./App.svelte";

if (process.env.NODE_ENV === "production" && process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    allowUrls: [/https?:\/\/(www\.)?colorcolor\.in/],
  });
}

const app = mount(App, {
  target: document.body,
  props: {},
});

registerSW();

export default app;
