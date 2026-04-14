import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

// Only hydrate in production when real SSG content is present (has a data attribute set by prerender)
const hasPrerenderedContent =
  import.meta.env.PROD && container.hasAttribute("data-server-rendered");

if (hasPrerenderedContent) {
  hydrateRoot(
    container,
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
} else {
  createRoot(container).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
}
