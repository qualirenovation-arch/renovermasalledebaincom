import { Helmet } from "react-helmet-async";
import { 
  OG_BASE_URL, 
  OG_SITE_NAME, 
  OG_DEFAULT_TITLE, 
  OG_DEFAULT_DESCRIPTION,
  getOgTitle
} from "@/lib/og";
import { normalizeCanonicalUrl, shouldNoIndex } from "@/lib/seo-utils";

interface OGTagsProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  coverImage?: string;
  /** Forcer le noindex (sinon détection automatique par path) */
  noindex?: boolean;
}

export function OGTags({ 
  title, 
  description, 
  path, 
  type = "website",
  coverImage,
  noindex
}: OGTagsProps) {
  // Canonical normalisée (HTTPS, sans params, sans trailing slash)
  const canonicalUrl = normalizeCanonicalUrl(path);
  const formattedTitle = getOgTitle(title);
  
  // Noindex : soit forcé par prop, soit détecté automatiquement
  const isNoIndex = noindex ?? shouldNoIndex(path);
  
  // URL de l'image OG
  let ogImageUrl: string;
  if (coverImage) {
    ogImageUrl = coverImage.startsWith("http") 
      ? coverImage 
      : `${OG_BASE_URL}${coverImage}`;
  } else {
    ogImageUrl = `${OG_BASE_URL}/og/default-og.jpg`;
  }
  
  // Tronquer la description
  const truncatedDescription = description.length > 155 
    ? description.substring(0, 152) + "..." 
    : description;

  return (
    <Helmet>
      {/* Title & Description */}
      <title>{formattedTitle}</title>
      <meta name="description" content={truncatedDescription} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots directive */}
      <meta name="robots" content={isNoIndex ? "noindex, nofollow" : "index, follow"} />
      
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

export { OG_BASE_URL, OG_SITE_NAME, OG_DEFAULT_TITLE, OG_DEFAULT_DESCRIPTION };
