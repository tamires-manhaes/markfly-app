import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./routes";
import "./index.css";
import "./lib/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
