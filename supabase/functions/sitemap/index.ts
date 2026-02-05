import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const BASE_URL = "https://renovermasalledebain.com";

// Liste des pages statiques
const staticPages = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/a-propos", priority: "0.8", changefreq: "monthly" },
  { url: "/pourquoi-nous", priority: "0.8", changefreq: "monthly" },
  { url: "/realisations", priority: "0.9", changefreq: "weekly" },
  { url: "/presse", priority: "0.6", changefreq: "monthly" },
  { url: "/partenaires", priority: "0.6", changefreq: "monthly" },
  { url: "/devis", priority: "0.9", changefreq: "monthly" },
  { url: "/faq", priority: "0.7", changefreq: "monthly" },
  { url: "/guide-travaux", priority: "0.8", changefreq: "monthly" },
  { url: "/videos-conseils", priority: "0.7", changefreq: "monthly" },
  { url: "/degats-eaux", priority: "0.8", changefreq: "monthly" },
  { url: "/photographe", priority: "0.5", changefreq: "monthly" },
  { url: "/mentions-legales", priority: "0.3", changefreq: "yearly" },
  { url: "/politique-confidentialite", priority: "0.3", changefreq: "yearly" },
];

// Liste des slugs de projets (réalisations terminées)
const projectSlugs = [
  // Paris 3ème
  "salle-de-bain-paris-3-renovation-style-masculin-bois-noir",
  // Paris 5ème
  "salle-de-bain-paris-5-renovation-optimisation-petit-espace",
  "salle-de-bain-paris-5-renovation-baignoire-saint-germain",
  // Paris 8ème
  "salle-de-bain-paris-8-renovation-locative-douche-italienne",
  // Paris 9ème
  "salle-de-bain-paris-9-renovation-douche-italienne-carrelage-pierre",
  // Paris 10ème
  "salle-de-bain-paris-10-renovation-style-masculin-jemmapes",
  "salle-de-bain-paris-10-renovation-elegance-doree-faubourg-saint-denis",
  "salle-de-bain-paris-10-renovation-noir-marbre-faubourg-saint-martin",
  // Paris 11ème
  "salle-de-bain-paris-11-renovation-retro-noir-blanc-charonne",
  "salle-de-bain-paris-11-renovation-petite-surface-3m2",
  // Paris 12ème
  "salle-de-bain-paris-12-renovation-degat-des-eaux-transformation",
  "salle-de-bain-paris-12-renovation-wc-design-onyx-blue",
  "salle-de-bain-paris-12-renovation-garcon-noir-blanc-contemporain",
  "salle-de-bain-paris-12-renovation-madame-marbre-rangements",
  "salle-de-bain-paris-12-renovation-bleu-mineral-beton-reuilly",
  // Paris 13ème
  "salle-de-bain-paris-13-renovation-locative-zellige-beige",
  "salle-de-bain-paris-13-renovation-zellige-turquoise-or",
  "salle-de-bain-paris-13-renovation-wc-zellige-turquoise-laiton",
  // Paris 15ème
  "salle-de-bain-paris-15-renovation-scandinave-buanderie-integree",
  "salle-de-bain-paris-15-renovation-douche-wc-separes-hague-blue",
  // Paris 16ème
  "salle-de-bain-paris-16-renovation-masculine-pierre-inox",
  "salle-de-bain-paris-16-renovation-parisien-chic-auteuil",
  "salle-de-bain-paris-16-renovation-elegance-parisienne-lauriston",
  // Paris 17ème
  "salle-de-bain-paris-17-renovation-suite-parentale-claustra-bois",
  "salle-de-bain-paris-17-renovation-degat-des-eaux-terrazzo",
  // Paris 19ème
  "salle-de-bain-paris-19-renovation-tout-en-un-mosaique-noir-mat",
  // Banlieue 92
  "salle-de-bain-suresnes-92-renovation-onyx-blue-marbre",
  "salle-de-bain-bois-colombes-92-terrazzo-mineral-vert-eau-laiton",
  "salle-de-bain-boulogne-92-ambiance-marine",
  "salle-de-bain-courbevoie-92-becon-sinistre",
  // Banlieue 93
  "salle-de-bain-saint-ouen-93-renovation",
  "salle-de-bain-saint-denis-93-appartement-feminin-verriere-metro-blanc",
  // Banlieue 94
  "salle-de-bain-charenton-94-renovation-complete-douche-double-vasque",
  "salle-de-bain-charenton-94-duo-douche-baignoire",
  "salle-de-bain-charenton-94-renovation-wc-chauffe-eau-dissimule",
  "salle-de-bain-saint-mande-94-renovation-douche-italienne",
  "salle-de-bain-saint-maur-94-renovation-complete-avant-apres",
  "salle-de-bain-saint-maur-94-renovation-enfants-inspiration-coreenne",
  "salle-de-bain-vincennes-94-renovation-garcon-noir-blanc",
  "salle-de-bain-vitry-94-renovation-complete-avant-apres",
  "salle-de-bain-saint-maurice-94-renovation-avenue-verdun-pullman",
  // Banlieue 95
  "salle-de-bain-soisy-95-suite-parentale-maison-1900",
  "salle-de-bain-soisy-95-rose-terracotta",
  "salle-de-bain-soisy-95-enfants-terrazzo-menthe",
];

const generateSitemap = (): string => {
  const today = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Ajouter les pages statiques
  for (const page of staticPages) {
    xml += `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  // Ajouter les pages de projets
  for (const slug of projectSlugs) {
    xml += `  <url>
    <loc>${BASE_URL}/realisations/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  }

  xml += `</urlset>`;

  return xml;
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  const sitemap = generateSitemap();

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400", // Cache 24h
      "Access-Control-Allow-Origin": "*",
    },
  });
});
