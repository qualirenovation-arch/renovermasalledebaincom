/**
 * Script de pré-rendu SSG (approche hybride)
 * Pré-rend uniquement les pages SEO critiques
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { JSDOM } from "jsdom";

// --- Polyfill browser globals AVANT tout import React ---
const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
  url: "https://renovermasalledebain.com",
  pretendToBeVisual: true,
});

// Copy all window properties to global
Object.defineProperty(globalThis, 'window', { value: dom.window, writable: true, configurable: true });
Object.defineProperty(globalThis, 'document', { value: dom.window.document, writable: true, configurable: true });
Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, writable: true, configurable: true });
globalThis.localStorage = dom.window.localStorage;
globalThis.sessionStorage = dom.window.sessionStorage;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.HTMLDivElement = dom.window.HTMLDivElement;
globalThis.HTMLSpanElement = dom.window.HTMLSpanElement;
globalThis.HTMLAnchorElement = dom.window.HTMLAnchorElement;
globalThis.HTMLImageElement = dom.window.HTMLImageElement;
globalThis.Element = dom.window.Element;
globalThis.Node = dom.window.Node;
globalThis.Text = dom.window.Text;
globalThis.Event = dom.window.Event;
globalThis.CustomEvent = dom.window.CustomEvent;
globalThis.SVGElement = dom.window.SVGElement || class SVGElement {};
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0);
globalThis.cancelAnimationFrame = clearTimeout;
globalThis.getComputedStyle = dom.window.getComputedStyle;
globalThis.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
globalThis.MutationObserver = dom.window.MutationObserver;
globalThis.matchMedia = () => ({
  matches: false,
  media: '',
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
});
globalThis.Image = dom.window.Image;
globalThis.HTMLCanvasElement = dom.window.HTMLCanvasElement || class HTMLCanvasElement {};
globalThis.DOMParser = dom.window.DOMParser;
globalThis.XMLSerializer = dom.window.XMLSerializer;
globalThis.scroll = () => {};
globalThis.scrollTo = () => {};
globalThis.scrollBy = () => {};
globalThis.location = dom.window.location;
globalThis.history = dom.window.history;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- Configuration Supabase ---
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://wacqnrxbszvznfqiiuxm.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhY3Fucnhic3p2em5mcWlpdXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNDcxMzAsImV4cCI6MjA4NDgyMzEzMH0.SYmRw93UuWxXVaxzcvlbB1AAXdQTgY4eEPuqajUEuRA";

// --- Pages SEO critiques uniquement ---
const SEO_ROUTES = [
  "/",
  "/renovation-salle-de-bain-paris",
  "/realisations",
  "/pourquoi-nous",
  "/guide-travaux",
  "/faq",
  "/a-propos",
  "/presse",
  "/avis",
  "/qualirenovation",
  "/partenaires",
  "/photographe",
  "/videos-conseils",
  "/mentions-legales",
  "/politique-confidentialite",
];

async function getDynamicRoutes() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data, error } = await supabase
      .from("albums")
      .select("slug")
      .eq("is_in_progress", false)
      .order("display_order");

    if (error) {
      console.warn("⚠️  Erreur Supabase, routes dynamiques ignorées:", error.message);
      return [];
    }

    const routes = (data || []).map((a) => `/realisations/${a.slug}`);
    console.log(`📦 ${routes.length} réalisations trouvées`);
    return routes;
  } catch (err) {
    console.warn("⚠️  Impossible de se connecter à Supabase:", err.message);
    return [];
  }
}

async function prerender() {
  const clientDir = path.resolve(__dirname, "dist/client");
  const serverDir = path.resolve(__dirname, "dist/server");

  if (!fs.existsSync(clientDir) || !fs.existsSync(serverDir)) {
    console.error("❌ dist/client ou dist/server introuvable.");
    process.exit(1);
  }

  const template = fs.readFileSync(path.resolve(clientDir, "index.html"), "utf-8");
  const { render } = await import(path.resolve(serverDir, "entry-server.js"));

  const dynamicRoutes = await getDynamicRoutes();
  const allRoutes = [...SEO_ROUTES, ...dynamicRoutes];

  console.log(`\n🚀 Pré-rendu de ${allRoutes.length} pages SEO critiques...\n`);

  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  for (const url of allRoutes) {
    try {
      const { html: appHtml, helmet } = render(url);

      const headTags = [
        helmet?.title?.toString() || "",
        helmet?.meta?.toString() || "",
        helmet?.link?.toString() || "",
        helmet?.script?.toString() || "",
      ].filter(Boolean).join("\n    ");

      let finalHtml = template
        .replace("<!--app-head-->", headTags)
        .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      if (!template.includes("<!--app-head-->") && headTags) {
        finalHtml = finalHtml.replace("</head>", `    ${headTags}\n  </head>`);
      }

      const filePath = url === "/"
        ? path.resolve(clientDir, "index.html")
        : path.resolve(clientDir, `${url.slice(1)}/index.html`);

      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, finalHtml);

      console.log(`  ✅ ${url}`);
      successCount++;
    } catch (err) {
      console.error(`  ⚠️  ${url}: ${err.message}`);
      errors.push(url);
      errorCount++;
    }
  }

  console.log(`\n📊 Résultat: ${successCount} succès, ${errorCount} erreurs sur ${allRoutes.length} pages`);
  if (errors.length > 0) {
    console.log(`\n⚠️  Pages en erreur (seront servies en mode SPA):`);
    errors.forEach((e) => console.log(`   - ${e}`));
  }
  console.log("");

  // Ne pas échouer si certaines pages ont des erreurs - elles seront servies en SPA
  if (successCount === 0) {
    process.exit(1);
  }
}

prerender();
