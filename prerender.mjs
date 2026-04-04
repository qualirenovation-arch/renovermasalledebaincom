/**
 * Script de pré-rendu SSG
 * Génère un fichier .html pour chaque route (statique + dynamique)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { JSDOM } from "jsdom";

// Polyfill browser globals pour le SSR via jsdom
const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
  url: "https://renovermasalledebain.com",
});
globalThis.window = dom.window;
globalThis.document = dom.window.document;
Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, writable: true, configurable: true });
globalThis.localStorage = dom.window.localStorage;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.Element = dom.window.Element;
globalThis.Node = dom.window.Node;
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0);
globalThis.cancelAnimationFrame = clearTimeout;
globalThis.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
globalThis.MutationObserver = dom.window.MutationObserver;
globalThis.matchMedia = () => ({ matches: false, addListener: () => {}, removeListener: () => {}, addEventListener: () => {}, removeEventListener: () => {} });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- Configuration ---
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://wacqnrxbszvznfqiiuxm.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhY3Fucnhic3p2em5mcWlpdXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNDcxMzAsImV4cCI6MjA4NDgyMzEzMH0.SYmRw93UuWxXVaxzcvlbB1AAXdQTgY4eEPuqajUEuRA";

// Routes statiques
const STATIC_ROUTES = [
  "/",
  "/a-propos",
  "/pourquoi-nous",
  "/realisations",
  "/presse",
  "/partenaires",
  "/partenaires/contact",
  "/devis",
  "/devis/completer",
  "/devis/rappel",
  "/devis/confirmation",
  "/faq",
  "/mentions-legales",
  "/politique-confidentialite",
  "/photographe",
  "/guide-travaux",
  "/videos-conseils",
  "/degats-eaux",
  "/visuels-houzz",
  "/visuels-instagram-highlights",
  "/devenir-partenaire",
  "/avis",
  "/renovation-salle-de-bain-paris",
  "/qualirenovation",
];

async function getDynamicRoutes() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data, error } = await supabase
      .from("albums")
      .select("slug, static_slug")
      .order("display_order");

    if (error) {
      console.warn("⚠️  Erreur Supabase, routes dynamiques ignorées:", error.message);
      return [];
    }

    const routes = [];
    for (const album of data || []) {
      routes.push(`/realisations/${album.slug}`);
      if (album.static_slug && album.static_slug !== album.slug) {
        routes.push(`/realisations/${album.static_slug}`);
      }
    }
    console.log(`📦 ${routes.length} routes dynamiques trouvées`);
    return routes;
  } catch (err) {
    console.warn("⚠️  Impossible de se connecter à Supabase:", err.message);
    return [];
  }
}

async function prerender() {
  const clientDir = path.resolve(__dirname, "dist/client");
  const serverDir = path.resolve(__dirname, "dist/server");

  // Vérifier que les builds existent
  if (!fs.existsSync(clientDir) || !fs.existsSync(serverDir)) {
    console.error("❌ dist/client ou dist/server introuvable. Lancez d'abord build:client et build:server.");
    process.exit(1);
  }

  // Charger le template HTML
  const template = fs.readFileSync(path.resolve(clientDir, "index.html"), "utf-8");

  // Charger le module serveur
  const { render } = await import(path.resolve(serverDir, "entry-server.js"));

  // Récupérer toutes les routes
  const dynamicRoutes = await getDynamicRoutes();
  const allRoutes = [...STATIC_ROUTES, ...dynamicRoutes];

  console.log(`\n🚀 Pré-rendu de ${allRoutes.length} pages...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const url of allRoutes) {
    try {
      const { html: appHtml, helmet } = render(url);

      // Construire les balises <head> depuis Helmet
      const headTags = [
        helmet?.title?.toString() || "",
        helmet?.meta?.toString() || "",
        helmet?.link?.toString() || "",
        helmet?.script?.toString() || "",
      ]
        .filter(Boolean)
        .join("\n    ");

      // Injecter dans le template
      let finalHtml = template
        .replace("<!--app-head-->", headTags)
        .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      // Si pas de placeholder <!--app-head-->, injecter avant </head>
      if (!template.includes("<!--app-head-->") && headTags) {
        finalHtml = finalHtml.replace("</head>", `    ${headTags}\n  </head>`);
      }

      // Déterminer le chemin du fichier
      const filePath =
        url === "/"
          ? path.resolve(clientDir, "index.html")
          : path.resolve(clientDir, `${url.slice(1)}/index.html`);

      // Créer les dossiers si nécessaire
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, finalHtml);

      console.log(`  ✅ ${url}`);
      successCount++;
    } catch (err) {
      console.error(`  ❌ ${url}: ${err.message}`);
      errorCount++;
    }
  }

  console.log(`\n📊 Résultat: ${successCount} succès, ${errorCount} erreurs sur ${allRoutes.length} pages\n`);

  if (errorCount > 0) {
    process.exit(1);
  }
}

prerender();
