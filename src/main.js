import * as Sentry from "@sentry/browser";
import App from "./App.svelte";

if (process.env.NODE_ENV === "production" && process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });
}

const app = new App({
  target: document.body,
  props: {},
});

export default app;
