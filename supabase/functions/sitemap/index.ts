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
  "salle-de-bain-paris-3-style-masculin-bois-noir",
  // Paris 5ème
  "salle-de-bain-paris-5-neo-art-deco",
  // Suresnes 92
  "salle-de-bain-suresnes-92-vie-en-bleu",
  // Paris 10ème
  "salle-de-bain-paris-10-canal-saint-martin-style-masculin",
  "salle-de-bain-paris-10-faubourg-saint-martin-noir-marbre",
  "salle-de-bain-paris-10-jemmapes-lumiere-naturelle",
  // Paris 11ème
  "salle-de-bain-paris-11-charonne-bastille-terrazzo",
  "salle-de-bain-paris-11-leon-frot-zen-japonais",
  "salle-de-bain-paris-11-popincourt-naturelle",
  "salle-de-bain-paris-11-charonne-douche-italienne",
  // Paris 12ème
  "salle-de-bain-paris-12-nation-luminosite",
  "salle-de-bain-paris-12-nation-elegance",
  "salle-de-bain-paris-12-sergent-beauchart-degat-eaux",
  "salle-de-bain-paris-12-place-daumesnil-bleu-mineral-beton",
  "salle-de-bain-paris-12-vincennes-garcon-subway",
  "salle-de-bain-paris-12-vincennes-madame-marbre",
  // Paris 14ème
  "salle-de-bain-paris-14-alesia-elegance-parisienne",
  // Paris 15ème
  "salle-de-bain-paris-15-convention-naturelle",
  "salle-de-bain-paris-15-vaugirard-espace-optimise",
  // Paris 16ème
  "salle-de-bain-paris-16-jasmin-suite-parentale",
  // Paris 17ème
  "salle-de-bain-paris-17-pereire-terrazzo-contemporain",
  "salle-de-bain-paris-17-pereire-suite-parentale",
  "salle-de-bain-paris-17-wagram-chic-parisien",
  "salle-de-bain-paris-17-etoile-luminosite",
  // Paris 18ème
  "salle-de-bain-paris-18-clignancourt-moderne",
  "salle-de-bain-paris-18-montmartre-naturelle",
  // Paris 20ème
  "salle-de-bain-paris-20-gambetta-douche-italienne",
  // Banlieue 92
  "salle-de-bain-bois-colombes-92-naturelle",
  "salle-de-bain-courbevoie-92-contemporaine",
  "salle-de-bain-asnieres-92-elegante",
  "salle-de-bain-levallois-92-epuree",
  "salle-de-bain-neuilly-92-luxe-parisien",
  // Banlieue 93
  "salle-de-bain-pantin-93-style-industriel",
  "salle-de-bain-montreuil-93-naturelle",
  // Banlieue 94
  "salle-de-bain-saint-maur-94-suite-parentale",
  "salle-de-bain-saint-maur-94-enfants-ludique",
  "salle-de-bain-charenton-94-duo-douche-baignoire",
  "salle-de-bain-charenton-94-liberte-moderne",
  "salle-de-bain-vincennes-94-renovation-complete",
  "salle-de-bain-saint-maurice-94-avenue-verdun-pullman",
  // Banlieue 95
  "salle-de-bain-argenteuil-95-familiale",
  "salle-de-bain-enghien-95-esprit-spa",
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
