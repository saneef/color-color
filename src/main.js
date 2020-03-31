import * as Sentry from "@sentry/browser";
import App from "./App.svelte";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://a364449699644f6697c0d35053b5ac79@sentry.io/5183356",
  });
}

const app = new App({
  target: document.body,
  props: {},
});

export default app;
