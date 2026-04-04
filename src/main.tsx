import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

if (import.meta.env.PROD && container.innerHTML.trim().length > 0) {
  // En production, si le HTML est déjà pré-rendu, on hydrate
  hydrateRoot(
    container,
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
} else {
  // En développement ou si pas de pré-rendu, on crée normalement
  createRoot(container).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
}
