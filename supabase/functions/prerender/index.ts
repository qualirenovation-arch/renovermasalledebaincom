import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BASE_URL = "https://renovermasalledebain.com";
const OG_FN_URL = "https://wacqnrxbszvznfqiiuxm.supabase.co/functions/v1/og";
const SITE_NAME = "RenoverMaSalleDeBain.com";

// ──────────────────────────────────────────────
// Détection des bots sociaux / crawlers
// ──────────────────────────────────────────────
const BOT_UA_PATTERNS = [
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "whatsapp",
  "slackbot",
  "telegrambot",
  "discordbot",
  "googlebot",
  "bingbot",
  "applebot",
  "pinterest",
  "vkShare",
  "embedly",
  "outbrain",
  "nuzzel",
  "flipboard",
];

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOT_UA_PATTERNS.some((pattern) => ua.includes(pattern.toLowerCase()));
}

// ──────────────────────────────────────────────
// Métadonnées statiques des pages principales
// ──────────────────────────────────────────────
interface PageMeta {
  title: string;
  description: string;
  image: string; // URL absolue
}

const STATIC_PAGES: Record<string, PageMeta> = {
  "/": {
    title: "Rénovation salle de bain Paris | RMSB",
    description: "Conception + rénovation premium à Paris et Île-de-France. Optimisation d'espace, plans précis, finitions irréprochables. Un chantier heureux.",
    image: `${BASE_URL}/og/default-og.jpg`,
  },
  "/realisations": {
    title: "Nos réalisations | RenoverMaSalleDeBain.com",
    description: "Découvrez nos rénovations de salles de bain à Paris et IDF : zellige, marbre, terrazzo. Avant/Après de nos chantiers.",
    image: `${BASE_URL}/og/realisations.jpg`,
  },
  "/guide-travaux": {
    title: "Guide Travaux rénovation salle de bain | RMSB",
    description: "Conseils d'experts pour votre rénovation de salle de bain : douche italienne, carrelage, plomberie. Le guide complet.",
    image: `${BASE_URL}/og/guide-travaux.jpg`,
  },
  "/devis": {
    title: "Demander un devis gratuit | RenoverMaSalleDeBain.com",
    description: "Devis gratuit pour votre rénovation de salle de bain à Paris. Réponse sous 48h. Un chantier maîtrisé de A à Z.",
    image: `${BASE_URL}/og/devis.jpg`,
  },
  "/pourquoi-nous": {
    title: "Notre méthode | RenoverMaSalleDeBain.com",
    description: "Découvrez l'approche RMSB : conception, anticipation, coordination. Pour un chantier heureux sans stress.",
    image: `${BASE_URL}/og/pourquoi-nous.jpg`,
  },
  "/avis": {
    title: "Avis clients | RenoverMaSalleDeBain.com",
    description: "Plus de 40 avis 5 étoiles vérifiés sur Houzz. Découvrez les témoignages de nos clients satisfaits.",
    image: `${BASE_URL}/og/avis.jpg`,
  },
  "/contact": {
    title: "Nous contacter | RenoverMaSalleDeBain.com",
    description: "Contactez RMSB pour votre projet de rénovation de salle de bain à Paris et Île-de-France.",
    image: `${BASE_URL}/og/default-og.jpg`,
  },
  "/faq": {
    title: "Questions fréquentes | RenoverMaSalleDeBain.com",
    description: "Réponses à vos questions sur la rénovation de salle de bain : durée, budget, matériaux, garanties.",
    image: `${BASE_URL}/og/default-og.jpg`,
  },
  "/degats-des-eaux": {
    title: "Dégâts des eaux | RenoverMaSalleDeBain.com",
    description: "Rénovation après sinistre : conseils, assurance, travaux. Expertise pour réparer les dégâts des eaux.",
    image: `${BASE_URL}/og/default-og.jpg`,
  },
  "/partenaires": {
    title: "Nos partenaires | RenoverMaSalleDeBain.com",
    description: "Les marques et artisans de confiance avec lesquels nous travaillons pour vos rénovations de salle de bain.",
    image: `${BASE_URL}/og/default-og.jpg`,
  },
};

// ──────────────────────────────────────────────
// Métadonnées des albums (slug → infos OG)
// On utilise l'edge function /og pour générer
// l'image dynamique avec photo de couverture.
// ──────────────────────────────────────────────
interface AlbumMeta {
  title: string;
  location: string;
  description: string;
  coverPath: string; // chemin public absolu de la photo de couverture
}

const ALBUMS: Record<string, AlbumMeta> = {
  "salle-de-bain-paris-3-renovation-style-masculin-bois-noir": {
    title: "Rénovation salle de bain Paris 3ème — Style masculin en bois et noir",
    location: "Paris 3ème - Rue du Temple",
    description: "Douche à l'italienne, meuble vasque sur mesure, robinetterie noire mate. Lave-linge intégré dissimulé.",
    coverPath: "/assets/temple-1.jpg",
  },
  "salle-de-bain-paris-15-renovation-marbre-bois-noir-baignoire": {
    title: "Rénovation salle de bain Paris 15ème — Marbre blanc, chêne et robinetterie noire",
    location: "Paris 15ème - Rue Alexandre Cabanel",
    description: "Carrelage effet marbre, double vasque chêne, baignoire avec paroi verrière. WC en marbre gris écaille.",
    coverPath: "/assets/alexandre-cabanel-1.jpg",
  },
  "suite-parentale-montreuil-93-renovation-verriere-zellige-turquoise": {
    title: "Rénovation salle de douche à Montreuil — matières, contrastes et précision",
    location: "Montreuil (93) - Rue Ernest Savart",
    description: "Verrière noire sur mesure, zellige turquoise, chêne naturel. Un chantier heureux de A à Z.",
    coverPath: "/assets/montreuil-suite-1.jpg",
  },
  "salle-de-bain-paris-5-renovation-optimisation-petit-espace": {
    title: "Rénovation salle de bain Paris 5ème — Optimisation maximale d'un petit espace",
    location: "Paris 5ème - Rue Buffon",
    description: "Douche XXL, WC, rangement et long meuble vasque dans un espace étroit. Conception sur mesure.",
    coverPath: "/assets/buffon-1.jpg",
  },
  "salle-de-bain-suresnes-92-renovation-onyx-blue-marbre": {
    title: "Rénovation salle de bain Suresnes — La vie en bleu Onyx Blue et marbre",
    location: "Suresnes (92) - Rue des Puits",
    description: "Zellige bleu Onyx Blue, marbre blanc, douche italienne. Esthétique méditerranéenne contemporaine.",
    coverPath: "/assets/rue-des-puits-1.jpg",
  },
  "salle-de-bain-paris-6-renovation-etroite-longueur-cherche-midi": {
    title: "Rénovation salle de bain Paris 6ème — L'art d'optimiser une pièce en longueur",
    location: "Paris 6ème - Rue du Cherche-Midi",
    description: "Douche XXL, WC, rangement et long meuble vasque dans un espace étroit. Un chantier heureux.",
    coverPath: "/assets/cherche-midi-1.jpg",
  },
  "salle-de-bain-paris-4-ile-cite-quai-aux-fleurs-fenetre-interieure": {
    title: "Rénovation salle de bain Paris 4ème — Île de la Cité, Quai aux Fleurs",
    location: "Paris 4ème - Quai aux Fleurs",
    description: "Création d'une douche sur estrade avec raccordement technique à la chambre. Vue sur la Seine.",
    coverPath: "/assets/quai-aux-fleurs-apres-1.jpg",
  },
  "salle-de-bain-paris-5-renovation-baignoire-saint-germain": {
    title: "Rénovation salle de bain baignoire Paris 5 – Projet Saint-Germain",
    location: "Paris 5ème - Quartier Saint-Germain",
    description: "Rénovation élégante avec baignoire centrale, carrelage effet marbre et robinetterie chromée.",
    coverPath: "/assets/stgermain-1.jpg",
  },
  "salle-de-bain-paris-8-renovation-locative-douche-italienne": {
    title: "Rénovation salle de bain Paris 8ème — Rafraîchissement locatif",
    location: "Paris 8ème - Avenue Matignon",
    description: "Douche à l'italienne, carrelage grès cérame et meuble vasque design. Investissement locatif optimisé.",
    coverPath: "/assets/matignon-1.jpg",
  },
  "salle-de-bain-paris-8-renovation-degat-des-eaux-marbre-noir-mat": {
    title: "Rénovation Paris 8ème — Du dégât des eaux à l'écrin de marbre noir mat",
    location: "Paris 8ème - Rue du Faubourg Saint-Honoré",
    description: "Après un sinistre, transformation complète en marbre noir mat et vasque noire. Résultat luxueux.",
    coverPath: "/assets/st-honore-1.jpg",
  },
  "salle-de-bain-paris-12-renovation-degat-des-eaux-transformation": {
    title: "Rénovation salle de bain Paris 12ème — Du dégât des eaux à la transformation",
    location: "Paris 12ème - Rue Sergent Beauchart",
    description: "Transformation complète après sinistre. Douche italienne, zellige et finitions soignées.",
    coverPath: "/assets/courbevoie-1.jpg",
  },
  "salle-de-bain-paris-9-renovation-douche-italienne-carrelage-pierre": {
    title: "Rénovation salle de bain Paris 9ème — Douche à l'italienne et carrelage effet pierre",
    location: "Paris 9ème - Rue Taitbout",
    description: "Douche italienne XL, carrelage effet pierre mate antidérapante, meuble vasque bois et laiton.",
    coverPath: "/assets/taitbout-1.jpg",
  },
  "salle-de-bain-paris-10-renovation-style-masculin-jemmapes": {
    title: "Rénovation salle de bain Paris 10ème — Style masculin au Canal Saint-Martin",
    location: "Paris 10ème - Canal Saint-Martin",
    description: "Style masculin et contemporain au bord du Canal Saint-Martin. Carrelage noir mat et laiton.",
    coverPath: "/assets/jemmapes-1.jpg",
  },
  "salle-de-bain-paris-10-renovation-elegance-doree-faubourg-saint-denis": {
    title: "Rénovation salle de bain Paris 10ème — Élégance dorée au Faubourg Saint-Denis",
    location: "Paris 10ème - Faubourg Saint-Denis",
    description: "Robinetterie dorée, carrelage hexagonal et meuble vasque bois. Ambiance chaleureuse et raffinée.",
    coverPath: "/assets/gallery-7.jpg",
  },
  "salle-de-bain-paris-10-renovation-noir-marbre-faubourg-saint-martin": {
    title: "Rénovation salle de bain Paris 10ème — Noir et marbre au Faubourg Saint-Martin",
    location: "Paris 10ème - Faubourg Saint-Martin",
    description: "Élégance parisienne intemporelle : noir et marbre, douche italienne, meuble vasque design.",
    coverPath: "/assets/faubourg-stmartin-1.jpg",
  },
  "salle-de-bain-paris-11-renovation-retro-noir-blanc-charonne": {
    title: "Rénovation salle de bain Paris 11ème — Style rétro noir et blanc à Charonne",
    location: "Paris 11ème - Rue de Charonne (Bastille)",
    description: "Carrelage métro blanc, joints noirs et robinetterie vintage. Un style rétro parisien authentique.",
    coverPath: "/assets/charonne-1.jpg",
  },
  "salle-de-bain-paris-11-renovation-petite-surface-3m2": {
    title: "Rénovation salle de bain Paris 11ème — Optimisation d'une petite surface 3m²",
    location: "Paris 11ème - Citeaux",
    description: "Optimisation d'un espace de 3m² : douche à l'italienne, WC suspendu et meuble compact.",
    coverPath: "/assets/citeaux-1.jpg",
  },
  "salle-de-bain-paris-16-renovation-lauriston-marbre": {
    title: "Rénovation salle de bain Paris 16ème — Marbre et élégance avenue Lauriston",
    location: "Paris 16ème - Rue Lauriston",
    description: "Marbre blanc, robinetterie chromée et baignoire îlot. Rénovation haut de gamme dans le 16ème.",
    coverPath: "/assets/lauriston-1.jpg",
  },
  "salle-de-bain-boulogne-billancourt-92-renovation-zellige-blanc": {
    title: "Rénovation salle de bain Boulogne-Billancourt — Zellige blanc et bois naturel",
    location: "Boulogne-Billancourt (92)",
    description: "Zellige blanc artisanal, meuble vasque bois et douche italienne. Finitions premium à Boulogne.",
    coverPath: "/assets/boulogne-1.jpg",
  },
  "salle-de-bain-saint-ouen-93-esprit-mondrian": {
    title: "Salle de bain Saint-Ouen — Esprit Mondrian",
    location: "Saint-Ouen (93)",
    description: "Inspiration Mondrian : couleurs vives et géométrie. Une salle de bain artistique et unique.",
    coverPath: "/assets/st-ouen-1.jpg",
  },
  "salle-de-bain-charenton-94-renovation-complete": {
    title: "Rénovation salle de bain Charenton-le-Pont — Rénovation complète",
    location: "Charenton-le-Pont (94)",
    description: "Rénovation complète à Charenton : douche italienne, carrelage grès cérame et meuble vasque sur mesure.",
    coverPath: "/assets/charenton-1.jpg",
  },
  "salle-de-bain-vincennes-94-renovation-masculine": {
    title: "Rénovation salle de bain Vincennes — Style masculin et graphique",
    location: "Vincennes (94)",
    description: "Style masculin et graphique : carrelage noir grand format, robinetterie noire mate, meuble bois.",
    coverPath: "/assets/vincennes-mr-1.jpg",
  },
  "salle-de-bain-saint-maur-94-renovation-complete": {
    title: "Rénovation salle de bain Saint-Maur — Rénovation maison complète",
    location: "Saint-Maur-des-Fossés (94)",
    description: "Rénovation complète d'une maison à Saint-Maur : salle de bain, douche et WC. Un chantier heureux.",
    coverPath: "/assets/gallery-17.jpg",
  },
  "salle-de-bain-saint-maur-enfant-94-renovation": {
    title: "Salle de bain enfant bleu et beige – ancienne guinguette à Saint-Maur",
    location: "Saint-Maur-des-Fossés (94)",
    description: "Salle de bain enfant avec carrelage métro bleu et meuble vasque beige. Ambiance douce et fonctionnelle.",
    coverPath: "/assets/st-maur-enfants-1.jpg",
  },
  "salle-de-bain-bois-colombes-92-renovation-nordique": {
    title: "Rénovation salle de bain Bois-Colombes — Style nordique épuré",
    location: "Bois-Colombes (92)",
    description: "Style nordique : blanc, bois clair et carrelage grès. Douche italienne et meuble vasque scandinave.",
    coverPath: "/assets/bois-colombes-1.jpg",
  },
  "salle-de-bain-paris-15-saint-charles-renovation-baignoire-balneo": {
    title: "Rénovation salle de bain Paris 15ème — Baignoire balnéo Saint-Charles",
    location: "Paris 15ème - Rue Saint-Charles",
    description: "Baignoire balnéo chromothérapie, carrelage vintage et meuble vasque design. Espace bien-être à domicile.",
    coverPath: "/assets/projects/saint-charles/apres-vue-ensemble.jpg",
  },
  "salle-de-bain-paris-16-auteuil-renovation-zellige-vert": {
    title: "Rénovation salle de bain Paris 16ème — Zellige vert et bois à Auteuil",
    location: "Paris 16ème - Auteuil",
    description: "Zellige vert sauge, meuble vasque bois chêne et robinetterie noire. Ambiance naturelle et apaisante.",
    coverPath: "/assets/auteuil-1.jpg",
  },
  "salle-de-bain-paris-17-suite-parentale-renovation-complete": {
    title: "Suite parentale Paris 17ème — Rénovation complète de salle de bain",
    location: "Paris 17ème - Boulevard Pereire",
    description: "Suite parentale entièrement rénovée : baignoire îlot, douche à l'italienne et double vasque.",
    coverPath: "/assets/suite-parentale-cover.png",
  },
};

// ──────────────────────────────────────────────
// Génération du HTML minimal pour les crawlers
// ──────────────────────────────────────────────
function buildOgImageUrl(slug: string, title: string, location: string, coverPath: string): string {
  // Priorité 1 : image OG statique par slug dans /public/og/ (JPEG, compatible Facebook/WhatsApp)
  const staticOgUrl = `${BASE_URL}/og/${slug}.jpg`;
  // On retourne l'URL statique — elle existe pour la plupart des albums
  // L'edge function /og SVG reste disponible en fallback via coverPath
  return staticOgUrl;
}

function buildHtml(
  title: string,
  description: string,
  ogImageUrl: string,
  canonicalUrl: string,
  redirectUrl: string
): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description.replace(/"/g, "&quot;")}" />
  <link rel="canonical" href="${canonicalUrl}" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title.replace(/"/g, "&quot;")}" />
  <meta property="og:description" content="${description.replace(/"/g, "&quot;")}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:image" content="${ogImageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:locale" content="fr_FR" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title.replace(/"/g, "&quot;")}" />
  <meta name="twitter:description" content="${description.replace(/"/g, "&quot;")}" />
  <meta name="twitter:image" content="${ogImageUrl}" />

  <!-- Redirection vers le vrai SPA -->
  <meta http-equiv="refresh" content="0;url=${redirectUrl}" />
  <script>window.location.replace("${redirectUrl}");</script>
</head>
<body>
  <p>Redirection en cours…</p>
</body>
</html>`;
}

// ──────────────────────────────────────────────
// Handler principal
// ──────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const userAgent = req.headers.get("user-agent") || "";
    const path = url.searchParams.get("path") || "/";

    const canonicalUrl = `${BASE_URL}${path}`;

    // Si ce n'est pas un bot ET pas un appel direct à l'edge function (pas de ?path=),
    // rediriger vers le SPA. On laisse passer si path est explicitement fourni.
    const hasExplicitPath = url.searchParams.has("path");
    if (!isBot(userAgent) && !hasExplicitPath) {
      return new Response(null, {
        status: 302,
        headers: { ...corsHeaders, Location: `${BASE_URL}/` },
      });
    }

    // ── Pages statiques ──
    if (STATIC_PAGES[path]) {
      const meta = STATIC_PAGES[path];
      const html = buildHtml(meta.title, meta.description, meta.image, canonicalUrl, canonicalUrl);
      return new Response(html, {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    // ── Pages album : /realisations/[slug] ──
    const albumMatch = path.match(/^\/realisations\/([^/]+)$/);
    if (albumMatch) {
      const slug = albumMatch[1];
      const album = ALBUMS[slug];

      if (album) {
        const ogImageUrl = buildOgImageUrl(slug, album.title, album.location, album.coverPath);
        const fullTitle = `${album.title} – Avant / Après | ${SITE_NAME}`;
        const html = buildHtml(fullTitle, album.description, ogImageUrl, canonicalUrl, canonicalUrl);
        return new Response(html, {
          headers: {
            ...corsHeaders,
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      }

      // Slug album inconnu → fallback avec image statique générique /realisations
      const fallbackAlbumMeta = STATIC_PAGES["/realisations"] ?? STATIC_PAGES["/"];
      const html = buildHtml(fallbackAlbumMeta.title, fallbackAlbumMeta.description, fallbackAlbumMeta.image, canonicalUrl, canonicalUrl);
      return new Response(html, {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    // ── Fallback : page par défaut ──
    const defaultMeta = STATIC_PAGES["/"];
    const html = buildHtml(defaultMeta.title, defaultMeta.description, defaultMeta.image, canonicalUrl, canonicalUrl);
    return new Response(html, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Prerender error:", error);
    return new Response(JSON.stringify({ error: "Prerender failed", details: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
