import { Helmet } from "react-helmet-async";
import { 
  OG_BASE_URL, 
  OG_SITE_NAME, 
  OG_DEFAULT_TITLE, 
  OG_DEFAULT_DESCRIPTION,
  getOgImageUrl,
  getOgTitle
} from "@/lib/og";

interface OGTagsProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: {
    type: "default" | "page" | "album";
    title?: string;
    subtitle?: string;
    location?: string;
    style?: string;
    tag1?: string;
    tag2?: string;
  };
  // Pour les albums, on peut aussi passer une image de couverture directe
  coverImage?: string;
}

export function OGTags({ 
  title, 
  description, 
  path, 
  type = "website",
  image,
  coverImage
}: OGTagsProps) {
  const canonicalUrl = `${OG_BASE_URL}${path}`;
  const formattedTitle = getOgTitle(title);
  
  // Déterminer l'URL de l'image OG
  let ogImageUrl: string;
  
  if (coverImage) {
    // Si une image de couverture est fournie directement
    ogImageUrl = coverImage.startsWith("http") 
      ? coverImage 
      : `${OG_BASE_URL}${coverImage}`;
  } else if (image) {
    // Utiliser le générateur d'images OG dynamique
    ogImageUrl = getOgImageUrl(image.type, {
      title: image.title,
      subtitle: image.subtitle,
      location: image.location,
      style: image.style,
      tag1: image.tag1,
      tag2: image.tag2
    });
  } else {
    // Image par défaut
    ogImageUrl = getOgImageUrl("default");
  }
  
  // Tronquer la description pour les meta tags
  const truncatedDescription = description.length > 155 
    ? description.substring(0, 152) + "..." 
    : description;

  return (
    <Helmet>
      {/* Title & Description */}
      <title>{formattedTitle}</title>
      <meta name="description" content={truncatedDescription} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={truncatedDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={OG_SITE_NAME} />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={truncatedDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Helmet>
  );
}

// Export des constantes pour un usage direct si nécessaire
export { OG_BASE_URL, OG_SITE_NAME, OG_DEFAULT_TITLE, OG_DEFAULT_DESCRIPTION };
