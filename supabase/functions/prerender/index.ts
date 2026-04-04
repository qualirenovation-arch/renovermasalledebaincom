import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BASE_URL = "https://renovermasalledebain.com";
const SITE_NAME = "RenoverMaSalleDeBain.com";

// ──────────────────────────────────────────────
// Bot detection
// ──────────────────────────────────────────────
const BOT_UA_PATTERNS = [
  "facebookexternalhit", "twitterbot", "linkedinbot", "whatsapp",
  "slackbot", "telegrambot", "discordbot", "googlebot", "bingbot",
  "applebot", "pinterest", "vkShare", "embedly", "outbrain",
  "yandex", "baiduspider", "duckduckbot", "ia_archiver",
  "gptbot", "perplexitybot", "claude-web", "chatgpt-user",
];

const SEARCH_ENGINE_PATTERNS = [
  "googlebot", "bingbot", "applebot", "yandex", "baiduspider",
  "duckduckbot", "ia_archiver", "gptbot", "perplexitybot", "claude-web", "chatgpt-user",
];

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOT_UA_PATTERNS.some((p) => ua.includes(p));
}

function isSearchEngine(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return SEARCH_ENGINE_PATTERNS.some((p) => ua.includes(p));
}

// ──────────────────────────────────────────────
// Static page metadata + content
// ──────────────────────────────────────────────
interface PageMeta {
  title: string;
  description: string;
  image: string;
  h1: string;
  content: string; // HTML body content for crawlers
  jsonLd?: object;
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "RenoverMaSalleDeBain.com",
  "description": "Conception et rénovation de salle de bain haut de gamme à Paris et en Île-de-France",
  "url": BASE_URL,
  "priceRange": "€€€",
  "serviceType": "Rénovation de salle de bain",
  "areaServed": [
    { "@type": "City", "name": "Paris" },
    { "@type": "AdministrativeArea", "name": "Île-de-France" },
  ],
  "address": { "@type": "PostalAddress", "addressLocality": "Paris", "addressRegion": "Île-de-France", "addressCountry": "FR" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "reviewCount": "40", "bestRating": "5" },
};

const STATIC_PAGES: Record<string, PageMeta> = {
  "/": {
    title: "Rénovation salle de bain haut de gamme Paris & Île-de-France | RMSB",
    description: "Conception et rénovation de salle de bain premium à Paris et en Île-de-France. Plans précis, finitions irréprochables, chantier heureux. Devis gratuit.",
    image: `${BASE_URL}/og/default-og.jpg`,
    h1: "Un chantier heureux pour votre salle de bain",
    content: `
      <p>Rénover votre salle de bain sans stress, sans mauvaises surprises, grâce à une conception maîtrisée et un accompagnement de A à Z.</p>
      <h2>Conception sur mesure</h2>
      <p>Des solutions personnalisées pour votre salle de bains, avec des matériaux durables et esthétiques sélectionnés par nos experts.</p>
      <h2>Installation professionnelle</h2>
      <p>Des experts qualifiés pour des résultats fiables. Plus de 20 professionnels sur le terrain et une équipe de conception engagée.</p>
      <h2>Douche ou baignoire ?</h2>
      <p>La vraie question : comment vivez-vous votre salle de bain ? Nous vous accompagnons dans ce choix pour créer l'espace qui vous ressemble.</p>
      <h2>Lauréat Best of Houzz 2026</h2>
      <p>Cette distinction récompense notre équipe de plus de 20 professionnels et notre exigence de qualité, projet après projet.</p>
      <h2>Nos témoignages clients</h2>
      <p>Plus de 40 avis 5 étoiles vérifiés sur Houzz. Nos clients témoignent de leur expérience de rénovation.</p>
      <nav>
        <h2>Découvrir nos services</h2>
        <ul>
          <li><a href="${BASE_URL}/realisations">Nos réalisations</a></li>
          <li><a href="${BASE_URL}/pourquoi-nous">Pourquoi nous choisir</a></li>
          <li><a href="${BASE_URL}/devis">Demander un devis gratuit</a></li>
          <li><a href="${BASE_URL}/guide-travaux">Guide rénovation salle de bain</a></li>
          <li><a href="${BASE_URL}/faq">Questions fréquentes</a></li>
          <li><a href="${BASE_URL}/renovation-salle-de-bain-paris">Rénovation salle de bain Paris</a></li>
        </ul>
      </nav>
    `,
    jsonLd: localBusinessJsonLd,
  },
  "/realisations": {
    title: "Nos réalisations de salles de bain | RMSB",
    description: "Découvrez nos projets de rénovation de salle de bain à Paris, Vitry, Charenton, Saint-Denis et en Île-de-France. Avant/après, photos et détails de chaque chantier.",
    image: `${BASE_URL}/og/realisations.jpg`,
    h1: "Nos réalisations de salles de bain",
    content: `
      <p>Découvrez nos rénovations de salles de bain à Paris et Île-de-France : zellige, marbre, terrazzo. Avant/Après de nos chantiers.</p>
      <p>Chaque projet est unique. Nous concevons et réalisons des salles de bain sur mesure, adaptées à votre espace et à vos envies.</p>
    `,
  },
  "/renovation-salle-de-bain-paris": {
    title: "Rénovation salle de bain Paris – Entreprise haut de gamme | RMSB",
    description: "Spécialiste de la rénovation de salle de bain à Paris. Conception sur mesure, matériaux premium, délais respectés. Demandez votre devis gratuit.",
    image: `${BASE_URL}/og/default-og.jpg`,
    h1: "Rénovation salle de bain à Paris",
    content: `
      <p>Spécialiste de la rénovation de salle de bain à Paris depuis plus de 20 ans. Conception sur mesure, matériaux premium, délais respectés.</p>
      <h2>Notre expertise parisienne</h2>
      <p>Plus de 60 projets réalisés dans Paris intra-muros. Nous maîtrisons les contraintes des appartements parisiens : copropriétés, étages élevés, petites surfaces.</p>
      <h2>Nos zones d'intervention</h2>
      <p>Paris (tous arrondissements), Boulogne-Billancourt, Neuilly-sur-Seine, Vincennes, Saint-Mandé, Charenton, Montreuil, et toute l'Île-de-France.</p>
    `,
    jsonLd: localBusinessJsonLd,
  },
  "/pourquoi-nous": {
    title: "Pourquoi nous choisir pour votre rénovation salle de bain | RMSB",
    description: "Notre équipe de rénovation salle de bain à Paris : expertise, transparence et finitions haut de gamme. Découvrez notre approche et nos engagements.",
    image: `${BASE_URL}/og/pourquoi-nous.jpg`,
    h1: "Pourquoi nous choisir",
    content: `
      <p>Notre approche de la rénovation de salle de bain repose sur trois piliers : expertise technique, transparence totale et finitions irréprochables.</p>
      <h2>Une équipe d'experts</h2>
      <p>Carina Nahmani, maître d'œuvre avec 20 ans d'expérience, et Thierry Pelmard, architecte partenaire. Plus de 60 chantiers réalisés ensemble.</p>
      <h2>Un processus maîtrisé</h2>
      <p>De la conception 3D à la livraison clé en main, chaque étape est anticipée et coordonnée pour un chantier sans surprises.</p>
    `,
  },
  "/guide-travaux": {
    title: "Guide rénovation salle de bain Paris – Étapes, normes & délais | RMSB",
    description: "Tout savoir sur la rénovation de salle de bain à Paris : étapes clés, normes, délais et budget. Le guide complet par nos experts.",
    image: `${BASE_URL}/og/guide-travaux.jpg`,
    h1: "Guide complet de rénovation salle de bain",
    content: `
      <p>Le guide complet pour votre rénovation de salle de bain à Paris : étapes clés, normes DTU, délais et budget détaillé.</p>
      <h2>Les étapes clés de la rénovation</h2>
      <p>Planification, démolition, plomberie, étanchéité DTU 52.2, carrelage, équipements sanitaires et finitions.</p>
      <h2>Budget et délais</h2>
      <p>Estimez votre budget selon la surface et le niveau de finition souhaité. Nos chantiers durent en moyenne 3 à 6 semaines.</p>
      <h2>Normes et réglementations</h2>
      <p>Étanchéité aux normes DTU, installation électrique conforme NF C 15-100, accessibilité PMR.</p>
    `,
  },
  "/devis": {
    title: "Demander un devis gratuit | RenoverMaSalleDeBain.com",
    description: "Devis gratuit pour votre rénovation de salle de bain à Paris. Réponse sous 48h. Un chantier maîtrisé de A à Z.",
    image: `${BASE_URL}/og/devis.jpg`,
    h1: "Demander un devis gratuit",
    content: `
      <p>Recevez votre devis personnalisé pour la rénovation de votre salle de bain. Réponse sous 48 heures.</p>
      <p>Notre étude personnalisée comprend : analyse de votre espace, proposition d'aménagement, sélection de matériaux et estimation détaillée.</p>
    `,
  },
  "/faq": {
    title: "Questions fréquentes rénovation salle de bain | RMSB",
    description: "Réponses à vos questions sur la rénovation de salle de bain : durée, budget, matériaux, garanties.",
    image: `${BASE_URL}/og/default-og.jpg`,
    h1: "Questions fréquentes",
    content: `
      <p>Retrouvez les réponses aux questions les plus fréquentes sur la rénovation de salle de bain à Paris.</p>
      <h2>Combien coûte une rénovation de salle de bain ?</h2>
      <p>Le budget dépend de la surface, du niveau de finition et des équipements choisis. Comptez entre 15 000 € et 40 000 € pour une rénovation complète à Paris.</p>
      <h2>Combien de temps durent les travaux ?</h2>
      <p>En moyenne 3 à 6 semaines pour une rénovation complète, selon la complexité du projet.</p>
      <h2>Intervenez-vous en appartement occupé ?</h2>
      <p>Oui, nous avons l'habitude d'intervenir dans des appartements occupés. Nous organisons le chantier pour minimiser les nuisances.</p>
    `,
  },
  "/avis": {
    title: "Avis clients rénovation salle de bain | RMSB",
    description: "Plus de 40 avis 5 étoiles vérifiés sur Houzz. Découvrez les témoignages de nos clients satisfaits.",
    image: `${BASE_URL}/og/avis.jpg`,
    h1: "Avis de nos clients",
    content: `<p>Plus de 40 avis 5 étoiles vérifiés sur Houzz. Nos clients témoignent de leur expérience de rénovation de salle de bain à Paris et en Île-de-France.</p>`,
  },
  "/partenaires": {
    title: "Nos partenaires | RenoverMaSalleDeBain.com",
    description: "Les marques et artisans de confiance avec lesquels nous travaillons pour vos rénovations de salle de bain.",
    image: `${BASE_URL}/og/default-og.jpg`,
    h1: "Nos partenaires",
    content: `<p>Nous travaillons avec les meilleures marques et artisans pour garantir la qualité de chaque rénovation : Grohe, Geberit, Schlüter, Wedi, et bien d'autres.</p>`,
  },
  "/degats-eaux": {
    title: "Dégâts des eaux – Rénovation salle de bain sinistre | RMSB",
    description: "Rénovation après sinistre : conseils, assurance, travaux. Expertise pour réparer les dégâts des eaux dans votre salle de bain.",
    image: `${BASE_URL}/og/default-og.jpg`,
    h1: "Rénovation après dégât des eaux",
    content: `
      <p>Spécialistes de la rénovation de salle de bain après sinistre. Nous vous accompagnons dans toutes les étapes : constat, déclaration d'assurance, travaux de remise en état.</p>
      <h2>Notre expertise sinistre</h2>
      <p>Diagnostic précis, devis détaillé pour l'assurance, travaux de qualité avec les mêmes standards que nos rénovations classiques.</p>
    `,
  },
  "/a-propos": {
    title: "À propos | RenoverMaSalleDeBain.com",
    description: "Découvrez l'histoire de RenoverMaSalleDeBain.com, notre équipe et notre passion pour la rénovation de salle de bain à Paris.",
    image: `${BASE_URL}/og/default-og.jpg`,
    h1: "À propos de RenoverMaSalleDeBain.com",
    content: `<p>Fondée par Carina Nahmani, notre entreprise est spécialisée dans la conception et la rénovation de salles de bain haut de gamme à Paris et en Île-de-France depuis plus de 20 ans.</p>`,
  },
  "/qualirenovation": {
    title: "QualiRénovation | RenoverMaSalleDeBain.com",
    description: "QualiRénovation, notre démarche qualité pour des rénovations de salle de bain d'exception.",
    image: `${BASE_URL}/og/default-og.jpg`,
    h1: "QualiRénovation",
    content: `<p>Notre démarche qualité QualiRénovation garantit des standards élevés à chaque étape de votre projet de rénovation de salle de bain.</p>`,
  },
  "/presse": {
    title: "Presse | RenoverMaSalleDeBain.com",
    description: "RenoverMaSalleDeBain.com dans les médias. Retrouvez nos apparitions presse et nos articles.",
    image: `${BASE_URL}/og/default-og.jpg`,
    h1: "Presse",
    content: `<p>Retrouvez nos apparitions dans les médias et les articles de presse consacrés à nos rénovations de salle de bain à Paris.</p>`,
  },
  "/videos-conseils": {
    title: "Vidéos conseils rénovation salle de bain | RMSB",
    description: "Nos vidéos conseils pour votre rénovation de salle de bain : astuces, tendances et tutoriels par nos experts.",
    image: `${BASE_URL}/og/default-og.jpg`,
    h1: "Vidéos conseils",
    content: `<p>Découvrez nos vidéos conseils pour votre projet de rénovation de salle de bain : astuces d'experts, tendances déco et tutoriels techniques.</p>`,
  },
  "/devenir-partenaire": {
    title: "Devenir partenaire | RenoverMaSalleDeBain.com",
    description: "Rejoignez notre réseau de partenaires : artisans, marques et distributeurs pour la rénovation de salle de bain.",
    image: `${BASE_URL}/og/default-og.jpg`,
    h1: "Devenir partenaire",
    content: `<p>Rejoignez notre réseau de partenaires de confiance. Artisans qualifiés, marques premium et distributeurs spécialisés.</p>`,
  },
  "/photographe": {
    title: "Notre photographe | RenoverMaSalleDeBain.com",
    description: "Stéphane Vasco, photographe attitré de nos réalisations de salle de bain.",
    image: `${BASE_URL}/og/default-og.jpg`,
    h1: "Notre photographe",
    content: `<p>Stéphane Vasco capture et sublime notre savoir-faire photographique pour partager avec vous l'envers du décor de nos rénovations.</p>`,
  },
};

// ──────────────────────────────────────────────
// Album metadata (hardcoded fallback)
// ──────────────────────────────────────────────
interface AlbumMeta {
  title: string;
  location: string;
  description: string;
  coverPath: string;
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
// Escape HTML helper
// ──────────────────────────────────────────────
function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ──────────────────────────────────────────────
// Build full HTML page for search engine crawlers
// ──────────────────────────────────────────────
function buildFullHtml(
  title: string,
  description: string,
  ogImageUrl: string,
  canonicalUrl: string,
  h1: string,
  bodyContent: string,
  jsonLd?: object,
  breadcrumbs?: { name: string; url?: string }[],
): string {
  const jsonLdBlocks: string[] = [];

  if (jsonLd) {
    jsonLdBlocks.push(`<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`);
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": b.name,
        ...(b.url ? { "item": b.url } : {}),
      })),
    };
    jsonLdBlocks.push(`<script type="application/ld+json">${JSON.stringify(breadcrumbLd)}</script>`);
  }

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta name="robots" content="index, follow" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:image" content="${ogImageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:locale" content="fr_FR" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${ogImageUrl}" />

  ${jsonLdBlocks.join("\n  ")}
</head>
<body>
  <header>
    <a href="${BASE_URL}"><strong>${SITE_NAME}</strong></a>
    <nav>
      <a href="${BASE_URL}/realisations">Réalisations</a>
      <a href="${BASE_URL}/pourquoi-nous">Pourquoi nous</a>
      <a href="${BASE_URL}/guide-travaux">Guide travaux</a>
      <a href="${BASE_URL}/devis">Devis gratuit</a>
      <a href="${BASE_URL}/faq">FAQ</a>
      <a href="${BASE_URL}/avis">Avis</a>
    </nav>
  </header>
  <main>
    <h1>${esc(h1)}</h1>
    ${bodyContent}
  </main>
  <footer>
    <p>© ${new Date().getFullYear()} ${SITE_NAME} — Rénovation de salle de bain haut de gamme à Paris et Île-de-France</p>
    <nav>
      <a href="${BASE_URL}/mentions-legales">Mentions légales</a>
      <a href="${BASE_URL}/politique-confidentialite">Politique de confidentialité</a>
    </nav>
  </footer>
</body>
</html>`;
}

// ──────────────────────────────────────────────
// Build minimal redirect HTML for social bots
// ──────────────────────────────────────────────
function buildRedirectHtml(
  title: string,
  description: string,
  ogImageUrl: string,
  canonicalUrl: string,
): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:image" content="${ogImageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:locale" content="fr_FR" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${ogImageUrl}" />
</head>
<body><p>${esc(title)}</p></body>
</html>`;
}

// ──────────────────────────────────────────────
// Fetch album list from DB for /realisations page
// ──────────────────────────────────────────────
async function fetchAlbumsList(): Promise<{ slug: string; title: string; location: string; description: string }[]> {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseKey) return [];
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("albums")
      .select("slug, title, location, description")
      .eq("is_in_progress", false)
      .order("display_order", { ascending: true });
    
    if (error) { console.error("DB fetch error:", error); return []; }
    return data ?? [];
  } catch (e) {
    console.error("Failed to fetch albums from DB:", e);
    return [];
  }
}

// ──────────────────────────────────────────────
// Fetch single album by slug (or static_slug) from DB
// ──────────────────────────────────────────────
async function fetchAlbumBySlug(slug: string): Promise<AlbumMeta | null> {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseKey) return null;

    const supabase = createClient(supabaseUrl, supabaseKey);
    // Try slug first, then static_slug
    let { data, error } = await supabase
      .from("albums")
      .select("title, location, description, cover_image, slug")
      .eq("slug", slug)
      .maybeSingle();

    if (!data && !error) {
      ({ data, error } = await supabase
        .from("albums")
        .select("title, location, description, cover_image, slug")
        .eq("static_slug", slug)
        .maybeSingle());
    }

    if (error || !data) return null;
    return {
      title: data.title,
      location: data.location,
      description: data.description,
      coverPath: data.cover_image,
    };
  } catch (e) {
    console.error("Failed to fetch album by slug:", e);
    return null;
  }
}

// ──────────────────────────────────────────────
// Handler
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

    const hasExplicitPath = url.searchParams.has("path");
    if (!isBot(userAgent) && !hasExplicitPath) {
      return new Response(null, {
        status: 302,
        headers: { ...corsHeaders, Location: `${BASE_URL}/` },
      });
    }

    const searchEngine = isSearchEngine(userAgent) || hasExplicitPath;
    const responseHeaders = {
      ...corsHeaders,
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    };

    // ── Static pages ──
    if (STATIC_PAGES[path]) {
      const meta = STATIC_PAGES[path];

      // For /realisations, enrich with album list from DB
      let bodyContent = meta.content;
      if (path === "/realisations") {
        const albums = await fetchAlbumsList();
        if (albums.length > 0) {
          bodyContent += `\n<h2>Tous nos projets</h2>\n<ul>\n`;
          for (const a of albums) {
            bodyContent += `  <li><a href="${BASE_URL}/realisations/${a.slug}">${esc(a.title)}</a> — ${esc(a.location)}</li>\n`;
          }
          bodyContent += `</ul>`;
        }
      }

      if (searchEngine) {
        const html = buildFullHtml(meta.title, meta.description, meta.image, canonicalUrl, meta.h1, bodyContent, meta.jsonLd);
        return new Response(html, { headers: responseHeaders });
      } else {
        const html = buildRedirectHtml(meta.title, meta.description, meta.image, canonicalUrl);
        return new Response(html, { headers: responseHeaders });
      }
    }

    // ── Album pages: /realisations/[slug] ──
    const albumMatch = path.match(/^\/realisations\/([^/]+)$/);
    if (albumMatch) {
      const slug = albumMatch[1];
      let album = ALBUMS[slug] || null;

      // If not in hardcoded list, try to find by slug in DB
      if (!album) {
        album = await fetchAlbumBySlug(slug);
      }

      if (album) {
        const ogImageUrl = `${BASE_URL}/og/${slug}.jpg`;
        const fullTitle = `${album.title} – Avant / Après | ${SITE_NAME}`;
        const breadcrumbs = [
          { name: "Accueil", url: BASE_URL },
          { name: "Réalisations", url: `${BASE_URL}/realisations` },
          { name: album.title },
        ];

        if (searchEngine) {
          const bodyContent = `
            <p><strong>${esc(album.location)}</strong></p>
            <p>${esc(album.description)}</p>
            <h2>Détails du projet</h2>
            <p>Rénovation complète de salle de bain réalisée par ${SITE_NAME}. Conception sur mesure, matériaux premium et finitions irréprochables.</p>
            <p><a href="${BASE_URL}/devis">Demander un devis gratuit pour un projet similaire</a></p>
            <nav>
              <a href="${BASE_URL}/realisations">← Voir toutes nos réalisations</a>
            </nav>
          `;
          const html = buildFullHtml(fullTitle, album.description, ogImageUrl, canonicalUrl, album.title, bodyContent, undefined, breadcrumbs);
          return new Response(html, { headers: responseHeaders });
        } else {
          const html = buildRedirectHtml(fullTitle, album.description, ogImageUrl, canonicalUrl);
          return new Response(html, { headers: responseHeaders });
        }
      }

      // Unknown slug fallback
      const fallback = STATIC_PAGES["/realisations"];
      const html = searchEngine
        ? buildFullHtml(fallback.title, fallback.description, fallback.image, canonicalUrl, fallback.h1, fallback.content)
        : buildRedirectHtml(fallback.title, fallback.description, fallback.image, canonicalUrl);
      return new Response(html, { headers: responseHeaders });
    }

    // ── Fallback ──
    const def = STATIC_PAGES["/"];
    const html = searchEngine
      ? buildFullHtml(def.title, def.description, def.image, canonicalUrl, def.h1, def.content, def.jsonLd)
      : buildRedirectHtml(def.title, def.description, def.image, canonicalUrl);
    return new Response(html, { headers: responseHeaders });

  } catch (error) {
    console.error("Prerender error:", error);
    return new Response(JSON.stringify({ error: "Prerender failed", details: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
