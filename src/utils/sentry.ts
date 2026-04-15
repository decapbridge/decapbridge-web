import * as Sentry from "@sentry/react";
import { env } from "/src/utils/env";

if (typeof window !== "undefined" && env("VITE_DECAPBRIDGE_IS_CLOUD")) {
  Sentry.init({
    dsn: env("VITE_DECAPBRIDGE_SENTRY_DSN"),
    environment: import.meta.env.MODE,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
  });
}
