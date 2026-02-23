// Configuration OG centralisée pour renovermasalledebain.com

export const OG_BASE_URL = "https://renovermasalledebain.com";

/**
 * Convertit une URL relative d'image en URL absolue pour les validateurs OG externes
 */
export function getAbsoluteImageUrl(imageUrl: string): string {
  if (!imageUrl) return "";
  
  // Si c'est déjà une URL absolue, la retourner telle quelle
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  
  // Sinon, construire l'URL absolue avec le domaine de la preview Lovable
  const origin = typeof window !== "undefined" ? window.location.origin : OG_BASE_URL;
  return `${origin}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
}
export const OG_SITE_NAME = "RenoverMaSalleDeBain.com";
export const OG_DEFAULT_TITLE = "RenoverMaSalleDeBain.com – Rénovation de salle de bain haut de gamme";
export const OG_DEFAULT_DESCRIPTION = "Conception + rénovation premium à Paris et Île-de-France. Optimisation d'espace, plans précis, finitions irréprochables.";

// URLs des edge functions pour les images OG dynamiques
const SUPABASE_FUNCTIONS_URL = "https://wacqnrxbszvznfqiiuxm.supabase.co/functions/v1";

export function getOgImageUrl(
  type: "default" | "page" | "album",
  params?: {
    title?: string;
    subtitle?: string;
    location?: string;
    style?: string;
    tag1?: string;
    tag2?: string;
    cover?: string;
  }
): string {
  const searchParams = new URLSearchParams();
  searchParams.set("type", type);
  
  if (params) {
    if (params.title) searchParams.set("title", params.title);
    if (params.subtitle) searchParams.set("subtitle", params.subtitle);
    if (params.location) searchParams.set("location", params.location);
    if (params.style) searchParams.set("style", params.style);
    if (params.tag1) searchParams.set("tag1", params.tag1);
    if (params.tag2) searchParams.set("tag2", params.tag2);
    if (params.cover) searchParams.set("cover", params.cover);
  }
  
  return `${SUPABASE_FUNCTIONS_URL}/og?${searchParams.toString()}`;
}

// Configurations par page statique
export const PAGE_OG_CONFIG: Record<string, { 
  title: string; 
  description: string; 
  subtitle?: string;
}> = {
  "/": {
    title: "Rénovation salle de bain Paris",
    description: "Rénovation de salle de bain haut de gamme à Paris et Île-de-France. Conception + réalisation clé en main. Un chantier heureux.",
    subtitle: "Un chantier heureux"
  },
  "/realisations": {
    title: "Nos réalisations",
    description: "Découvrez nos rénovations de salles de bain à Paris et Île-de-France : zellige, marbre, terrazzo. Avant/Après de nos chantiers.",
    subtitle: "Paris & Île-de-France"
  },
  "/guide-travaux": {
    title: "Guide Travaux",
    description: "Conseils d'experts pour votre rénovation de salle de bain : douche italienne, carrelage, plomberie. Le guide complet.",
    subtitle: "Conseils d'experts"
  },
  "/devis": {
    title: "Demander un devis",
    description: "Devis gratuit pour votre rénovation de salle de bain à Paris. Réponse sous 48h. Un chantier maîtrisé de A à Z.",
    subtitle: "Gratuit & sans engagement"
  },
  "/pourquoi-nous": {
    title: "Notre méthode",
    description: "Découvrez l'approche RMSB : conception, anticipation, coordination. Pour un chantier heureux sans stress.",
    subtitle: "Un chantier heureux"
  },
  "/devenir-partenaire": {
    title: "Devenir partenaire",
    description: "Rejoignez le réseau RMSB : artisans, architectes, fournisseurs. Collaborez avec nous sur des projets premium.",
    subtitle: "Artisans & fournisseurs"
  },
  "/partenaires": {
    title: "Nos partenaires",
    description: "Les marques et artisans de confiance avec lesquels nous travaillons pour vos rénovations de salle de bain.",
    subtitle: "Marques de confiance"
  },
  "/avis": {
    title: "Avis clients",
    description: "Plus de 40 avis 5 étoiles vérifiés sur Houzz. Découvrez les témoignages de nos clients satisfaits.",
    subtitle: "Témoignages vérifiés"
  },
  "/presse": {
    title: "Presse & Médias",
    description: "RMSB dans les médias : articles, interviews et publications sur la rénovation de salle de bain.",
    subtitle: "Actualités & médias"
  },
  "/degats-des-eaux": {
    title: "Dégâts des eaux",
    description: "Rénovation après sinistre : conseils, assurance, travaux. Expertise pour réparer les dégâts des eaux.",
    subtitle: "Conseils & prévention"
  },
  "/faq": {
    title: "Questions fréquentes",
    description: "Réponses à vos questions sur la rénovation de salle de bain : durée, budget, matériaux, garanties.",
    subtitle: "FAQ"
  },
  "/contact": {
    title: "Nous contacter",
    description: "Contactez RMSB pour votre projet de rénovation de salle de bain à Paris et Île-de-France.",
    subtitle: "Paris & Île-de-France"
  },
  "/videos-conseils": {
    title: "Vidéos conseils",
    description: "Nos vidéos conseils pour votre rénovation de salle de bain : astuces, techniques et inspirations.",
    subtitle: "Conseils vidéo"
  },
  "/photographe": {
    title: "Notre photographe",
    description: "Stéphane Vasco, photographe partenaire pour immortaliser vos réalisations de salle de bain.",
    subtitle: "Stéphane Vasco"
  }
};

// Helper pour obtenir le titre OG formaté
export function getOgTitle(pageTitle: string): string {
  return `${pageTitle} | ${OG_SITE_NAME}`;
}

// Helper pour les albums
export function getAlbumOgData(album: {
  title: string;
  location: string;
  description: string;
  finitionSol?: string;
  finitionMur?: string;
  category?: string;
}) {
  const tags: string[] = [];
  
  // Ajouter les finitions comme tags
  if (album.finitionSol) {
    const finitionLabels: Record<string, string> = {
      "zellige": "Zellige",
      "marbre": "Marbre",
      "terrazzo": "Terrazzo",
      "beton": "Béton ciré",
      "effet-pierre": "Effet pierre",
      "gres-cerame-uni": "Grès cérame",
      "gres-cerame-motif": "Grès motif",
      "hexagonal": "Hexagonal",
      "metro-allonge": "Métro",
      "mosaique": "Mosaïque"
    };
    tags.push(finitionLabels[album.finitionSol] || album.finitionSol);
  }
  
  if (album.finitionMur && album.finitionMur !== album.finitionSol) {
    const finitionLabels: Record<string, string> = {
      "zellige": "Zellige",
      "marbre": "Marbre",
      "terrazzo": "Terrazzo",
      "beton": "Béton ciré",
      "effet-pierre": "Effet pierre",
      "gres-cerame-uni": "Grès cérame",
      "gres-cerame-motif": "Grès motif",
      "hexagonal": "Hexagonal",
      "metro-allonge": "Métro",
      "mosaique": "Mosaïque"
    };
    tags.push(finitionLabels[album.finitionMur] || album.finitionMur);
  }
  
  // Extraire un style de la description (premiers mots-clés pertinents)
  const style = album.category ? getCategoryLabel(album.category) : "Rénovation premium";
  
  return {
    title: album.title,
    location: album.location,
    style,
    tag1: tags[0] || undefined,
    tag2: tags[1] || undefined
  };
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    "noir-blanc": "Noir & Blanc",
    "bois-nature": "Bois & Nature",
    "marbre-luxe": "Marbre & Luxe",
    "dore-laiton": "Doré & Laiton",
    "colore": "Coloré",
    "optimisation": "Optimisation",
    "maison-banlieue": "Maison",
    "degat-eaux": "Sinistre"
  };
  return labels[category] || "Premium";
}
