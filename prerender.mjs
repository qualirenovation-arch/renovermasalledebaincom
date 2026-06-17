/**
 * Script de pré-rendu SSG (approche hybride)
 * Pré-rend uniquement les pages SEO critiques
 * Injecte les balises title/meta/OG directement (bypass helmet)
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
  matches: false, media: '', onchange: null,
  addListener: () => {}, removeListener: () => {},
  addEventListener: () => {}, removeEventListener: () => {},
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

// --- Configuration ---
const BASE_URL = "https://renovermasalledebain.com";
const SITE_NAME = "RenoverMaSalleDeBain.com";
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://wacqnrxbszvznfqiiuxm.supabase.co";
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhY3Fucnhic3p2em5mcWlpdXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNDcxMzAsImV4cCI6MjA4NDgyMzEzMH0.SYmRw93UuWxXVaxzcvlbB1AAXdQTgY4eEPuqajUEuRA";

// --- SEO data per static route ---
const PAGE_SEO = {
  "/": {
    title: "Rénovation salle de bain Paris",
    description: "Rénovation de salle de bain haut de gamme à Paris et Île-de-France. Conception + réalisation clé en main. Un chantier heureux.",
  },
  "/renovation-salle-de-bain-paris": {
    title: "Rénovation salle de bain Paris – Devis gratuit",
    description: "Spécialiste rénovation salle de bain à Paris. Conception, coordination et réalisation clé en main. Devis gratuit sous 48h.",
  },
  "/realisations": {
    title: "Nos réalisations",
    description: "Découvrez nos rénovations de salles de bain à Paris et Île-de-France : zellige, marbre, terrazzo. Avant/Après de nos chantiers.",
  },
  "/devis": {
    title: "Demande de devis",
    description: "Demandez votre devis gratuit pour la rénovation de votre salle de bain à Paris et Île-de-France. Réponse sous 48h.",
  },
  "/pourquoi-nous": {
    title: "Notre méthode",
    description: "Découvrez l'approche RMSB : conception, anticipation, coordination. Pour un chantier heureux sans stress.",
  },
  "/guide-travaux": {
    title: "Guide Travaux",
    description: "Conseils d'experts pour votre rénovation de salle de bain : douche italienne, carrelage, plomberie. Le guide complet.",
  },
  "/faq": {
    title: "Questions fréquentes",
    description: "Réponses à vos questions sur la rénovation de salle de bain : durée, budget, matériaux, garanties.",
  },
  "/a-propos": {
    title: "À propos – Notre équipe",
    description: "Découvrez l'équipe Qualirenovation derrière renovermasalledebain.com. 20 ans d'expérience dans la rénovation de salle de bain à Paris.",
  },
  "/presse": {
    title: "Presse & Médias",
    description: "RMSB dans les médias : articles, interviews et publications sur la rénovation de salle de bain.",
  },
  "/avis": {
    title: "Avis clients",
    description: "Plus de 40 avis 5 étoiles vérifiés sur Houzz. Découvrez les témoignages de nos clients satisfaits.",
  },
  "/qualirenovation": {
    title: "QualiRénovation – Notre label qualité",
    description: "Découvrez le label QualiRénovation : notre engagement qualité pour votre rénovation de salle de bain.",
  },
  "/guides": {
    title: "Guides gratuits — Rénover sa salle de bain",
    description: "Un guide interactif gratuit conçu par des maîtres d'œuvre parisiens. Comprendre, décider, budgéter et piloter votre rénovation — sans jargon.",
  },
  "/partenaires": {
    title: "Nos partenaires",
    description: "Les marques et artisans de confiance avec lesquels nous travaillons pour vos rénovations de salle de bain.",
  },
  "/photographe": {
    title: "Notre photographe",
    description: "Stéphane Vasco, photographe partenaire pour immortaliser vos réalisations de salle de bain.",
  },
  "/videos-conseils": {
    title: "Vidéos conseils",
    description: "Nos vidéos conseils pour votre rénovation de salle de bain : astuces, techniques et inspirations.",
  },
  "/mentions-legales": {
    title: "Mentions légales",
    description: "Mentions légales du site renovermasalledebain.com – Qualirenovation.",
  },
  "/politique-confidentialite": {
    title: "Politique de confidentialité",
    description: "Notre politique de confidentialité et de protection des données personnelles.",
  },
};

// --- Static routes to prerender ---
const SEO_ROUTES = Object.keys(PAGE_SEO);

// --- Fetch dynamic album routes + SEO data from Supabase ---
async function getDynamicRoutes() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data, error } = await supabase
      .from("albums")
      .select("slug, title, description, location, cover_image, album_seo(meta_title, meta_description)")
      .eq("is_in_progress", false)
      .order("display_order");

    if (error) {
      console.warn("⚠️  Erreur Supabase:", error.message);
      return [];
    }

    const routes = (data || []).map((a) => {
      const seo = a.album_seo?.[0] || a.album_seo;
      const title = seo?.meta_title || a.title;
      const desc = seo?.meta_description || a.description;
      return {
        path: `/realisations/${a.slug}`,
        title,
        description: desc,
        coverImage: a.cover_image,
      };
    });
    console.log(`📦 ${routes.length} réalisations trouvées`);
    return routes;
  } catch (err) {
    console.warn("⚠️  Impossible de se connecter à Supabase:", err.message);
    return [];
  }
}

// --- Build SEO head tags for a given route ---
function buildSeoHeadTags(url, seoData) {
  const title = `${seoData.title} | ${SITE_NAME}`;
  const desc = (seoData.description || "").substring(0, 155);
  const canonical = `${BASE_URL}${url === "/" ? "" : url}`;
  const ogImage = seoData.coverImage?.startsWith("http")
    ? seoData.coverImage
    : `${BASE_URL}/og/default-og.jpg`;

  return [
    `<meta name="description" content="${escapeAttr(desc)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(desc)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${escapeAttr(ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="fr_FR" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(desc)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(ogImage)}" />`,
  ].join("\n    ");
}

function escapeAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// --- Extract JSON-LD scripts from rendered body HTML (deduplicated) ---
function extractJsonLdScripts(html) {
  const seen = new Set();
  const jsonLdScripts = [];
  const regex = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    // Deduplicate by content
    const content = match[1].trim();
    if (!seen.has(content)) {
      seen.add(content);
      jsonLdScripts.push(match[0]);
    }
  }
  const cleanedHtml = html.replace(regex, '');
  return { cleanedHtml, jsonLdScripts };
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
  const allRoutes = [
    ...SEO_ROUTES.map((p) => ({ path: p, ...PAGE_SEO[p] })),
    ...dynamicRoutes,
  ];

  console.log(`\n🚀 Pré-rendu de ${allRoutes.length} pages SEO critiques...\n`);

  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  for (const route of allRoutes) {
    try {
      const { html: appHtml } = render(route.path);

      // Extract JSON-LD from body HTML (rendered via dangerouslySetInnerHTML)
      const { cleanedHtml, jsonLdScripts } = extractJsonLdScripts(appHtml);

      // Build the formatted title
      const formattedTitle = `${route.title} | ${SITE_NAME}`;

      // Build head tags from our static SEO config
      const headTags = buildSeoHeadTags(route.path, route);
      const jsonLdTags = jsonLdScripts.join("\n    ");

      let finalHtml = template;

      // Replace template <title> with page-specific title
      finalHtml = finalHtml.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(formattedTitle)}</title>`);

      // Remove any template meta/OG/JSON-LD tags to avoid duplicates
      finalHtml = finalHtml.replace(/<meta\s+name="description"[^>]*\/?>/g, '');
      finalHtml = finalHtml.replace(/<meta\s+property="og:[^"]*"[^>]*\/?>/g, '');
      finalHtml = finalHtml.replace(/<meta\s+name="twitter:[^"]*"[^>]*\/?>/g, '');
      finalHtml = finalHtml.replace(/<link\s+rel="canonical"[^>]*\/?>/g, '');
      finalHtml = finalHtml.replace(/<meta\s+name="robots"[^>]*\/?>/g, '');
      // Remove any JSON-LD already in template (from Vite build)
      finalHtml = finalHtml.replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '');

      // Inject head tags (meta, OG, canonical) + JSON-LD before </head>
      const allHeadContent = [headTags, jsonLdTags].filter(Boolean).join("\n    ");
      finalHtml = finalHtml.replace("</head>", `    ${allHeadContent}\n  </head>`);

      // Inject body content
      finalHtml = finalHtml.replace(
        '<div id="root"></div>',
        `<div id="root" data-server-rendered>${cleanedHtml}</div>`
      );

      const filePath = route.path === "/"
        ? path.resolve(clientDir, "index.html")
        : path.resolve(clientDir, `${route.path.slice(1)}/index.html`);

      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, finalHtml);

      console.log(`  ✅ ${route.path}`);
      successCount++;
    } catch (err) {
      console.error(`  ⚠️  ${route.path}: ${err.message}`);
      errors.push(route.path);
      errorCount++;
    }
  }

  console.log(`\n📊 Résultat: ${successCount} succès, ${errorCount} erreurs sur ${allRoutes.length} pages`);
  if (errors.length > 0) {
    console.log(`\n⚠️  Pages en erreur (seront servies en mode SPA):`);
    errors.forEach((e) => console.log(`   - ${e}`));
  }
  console.log("");

  if (successCount === 0) {
    process.exit(1);
  }
}

prerender();
