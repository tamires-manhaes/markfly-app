import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./routes";
import "./index.css";
import "./lib/i18n";

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 0.1, // Adjust as needed
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
