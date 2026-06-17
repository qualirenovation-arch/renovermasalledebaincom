/**
 * Worker de pré-rendu (worker_threads)
 * Chaque worker initialise JSDOM + entry-server une fois,
 * puis rend les routes qu'on lui envoie via parentPort.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parentPort, workerData } from "node:worker_threads";
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
const BASE_URL = "https://renovermasalledebain.com";
const SITE_NAME = "RenoverMaSalleDeBain.com";

const { clientDir, serverDir } = workerData;
const template = fs.readFileSync(path.resolve(clientDir, "index.html"), "utf-8");
const { render } = await import(path.resolve(serverDir, "entry-server.js"));

function escapeAttr(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

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

function extractJsonLdScripts(html) {
  const seen = new Set();
  const jsonLdScripts = [];
  const regex = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const content = match[1].trim();
    if (!seen.has(content)) {
      seen.add(content);
      jsonLdScripts.push(match[0]);
    }
  }
  const cleanedHtml = html.replace(regex, '');
  return { cleanedHtml, jsonLdScripts };
}

function renderRoute(route) {
  const { html: appHtml } = render(route.path);
  const { cleanedHtml, jsonLdScripts } = extractJsonLdScripts(appHtml);
  const formattedTitle = `${route.title} | ${SITE_NAME}`;
  const headTags = buildSeoHeadTags(route.path, route);
  const jsonLdTags = jsonLdScripts.join("\n    ");

  let finalHtml = template;
  finalHtml = finalHtml.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(formattedTitle)}</title>`);
  finalHtml = finalHtml.replace(/<meta\s+name="description"[^>]*\/?>/g, '');
  finalHtml = finalHtml.replace(/<meta\s+property="og:[^"]*"[^>]*\/?>/g, '');
  finalHtml = finalHtml.replace(/<meta\s+name="twitter:[^"]*"[^>]*\/?>/g, '');
  finalHtml = finalHtml.replace(/<link\s+rel="canonical"[^>]*\/?>/g, '');
  finalHtml = finalHtml.replace(/<meta\s+name="robots"[^>]*\/?>/g, '');
  finalHtml = finalHtml.replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '');

  const allHeadContent = [headTags, jsonLdTags].filter(Boolean).join("\n    ");
  finalHtml = finalHtml.replace("</head>", `    ${allHeadContent}\n  </head>`);
  finalHtml = finalHtml.replace(
    '<div id="root"></div>',
    `<div id="root" data-server-rendered>${cleanedHtml}</div>`
  );

  const filePath = route.path === "/"
    ? path.resolve(clientDir, "index.html")
    : path.resolve(clientDir, `${route.path.slice(1)}/index.html`);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, finalHtml);
}

// Signal worker ready
parentPort.postMessage({ type: "ready" });

parentPort.on("message", (msg) => {
  if (msg.type === "exit") {
    process.exit(0);
  }
  if (msg.type === "render") {
    try {
      renderRoute(msg.route);
      parentPort.postMessage({ type: "done", path: msg.route.path, ok: true });
    } catch (err) {
      parentPort.postMessage({ type: "done", path: msg.route.path, ok: false, error: err.message });
    }
  }
});