import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// URL canonique du site
const BASE_URL = "https://renovermasalledebain.com";

// Pages statiques indexables avec lastmod réel (date de dernière modification du contenu)
const staticPages = [
  { url: "/", priority: "1.0", changefreq: "weekly", lastmod: "2026-02-28" },
  { url: "/realisations", priority: "0.9", changefreq: "weekly", lastmod: "2026-02-28" },
  { url: "/devis", priority: "0.9", changefreq: "monthly", lastmod: "2026-02-15" },
  { url: "/guide-travaux", priority: "0.8", changefreq: "monthly", lastmod: "2026-02-25" },
  { url: "/degats-eaux", priority: "0.8", changefreq: "monthly", lastmod: "2026-01-20" },
  { url: "/pourquoi-nous", priority: "0.8", changefreq: "monthly", lastmod: "2026-02-10" },
  { url: "/a-propos", priority: "0.7", changefreq: "monthly", lastmod: "2026-01-15" },
  { url: "/faq", priority: "0.7", changefreq: "monthly", lastmod: "2026-02-27" },
  { url: "/avis", priority: "0.7", changefreq: "weekly", lastmod: "2026-02-28" },
  { url: "/videos-conseils", priority: "0.7", changefreq: "monthly", lastmod: "2026-01-10" },
  { url: "/presse", priority: "0.6", changefreq: "monthly", lastmod: "2026-01-05" },
  { url: "/partenaires", priority: "0.6", changefreq: "monthly", lastmod: "2026-02-10" },
  { url: "/devenir-partenaire", priority: "0.5", changefreq: "monthly", lastmod: "2026-02-10" },
  { url: "/partenaires/contact", priority: "0.5", changefreq: "monthly", lastmod: "2026-02-10" },
  { url: "/photographe", priority: "0.5", changefreq: "monthly", lastmod: "2025-12-15" },
  { url: "/mentions-legales", priority: "0.3", changefreq: "yearly", lastmod: "2025-06-01" },
  { url: "/politique-confidentialite", priority: "0.3", changefreq: "yearly", lastmod: "2025-06-01" },
];

// Préfixes/mots-clés exclus du sitemap (cohérent avec seo-utils.ts)
const EXCLUDED_PREFIXES = ["/admin", "/og-preview", "/visuels-houzz", "/404"];

const generateSitemap = async (): Promise<string> => {
  const today = new Date().toISOString().split("T")[0];

  // Récupérer les albums depuis la DB
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: albums, error } = await supabase
    .from("albums")
    .select("slug, is_in_progress, updated_at")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching albums:", error);
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Pages statiques (exclure les noindex)
  for (const page of staticPages) {
    if (EXCLUDED_PREFIXES.some(p => page.url.startsWith(p))) continue;
    xml += `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  // Pages albums dynamiques depuis la DB
  if (albums && albums.length > 0) {
    for (const album of albums) {
      const lastmod = album.updated_at
        ? album.updated_at.split("T")[0]
        : today;
      const isInProgress = album.is_in_progress;

      xml += `  <url>
    <loc>${BASE_URL}/realisations/${album.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${isInProgress ? "weekly" : "monthly"}</changefreq>
    <priority>${isInProgress ? "0.6" : "0.7"}</priority>
  </url>
`;
    }
  }

  xml += `</urlset>`;
  return xml;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    const sitemap = await generateSitemap();
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("Sitemap generation error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
});
