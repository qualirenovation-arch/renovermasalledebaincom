// Utilitaires SEO centralisés pour renovermasalledebain.com

const BASE_URL = "https://renovermasalledebain.com";

/**
 * Normalise une URL canonique :
 * - HTTPS uniquement
 * - Supprime les query params (?utm, etc.)
 * - Supprime le hash (#section)
 * - Supprime le trailing slash (sauf racine "/")
 * - Lowercase le path
 */
export function normalizeCanonicalUrl(path: string): string {
  // Nettoyer le path
  let cleanPath = path.split("?")[0].split("#")[0];
  
  // Supprimer le trailing slash (sauf racine)
  if (cleanPath.length > 1 && cleanPath.endsWith("/")) {
    cleanPath = cleanPath.slice(0, -1);
  }
  
  // Lowercase
  cleanPath = cleanPath.toLowerCase();
  
  return `${BASE_URL}${cleanPath}`;
}

/**
 * Liste des préfixes de routes qui ne doivent PAS être indexées.
 * Toute page dont le path commence par un de ces préfixes
 * recevra automatiquement noindex, nofollow.
 */
const NOINDEX_PREFIXES = [
  "/admin",
  "/og-preview",
  "/visuels-houzz",
  "/404",
];

/**
 * Mots-clés dans le path qui déclenchent un noindex automatique.
 */
const NOINDEX_KEYWORDS = [
  "draft",
  "preview",
  "test",
  "brouillon",
];

/**
 * Détermine si une page doit être indexée ou non.
 * Retourne true si la page doit être en noindex.
 */
export function shouldNoIndex(path: string): boolean {
  const lowerPath = path.toLowerCase();
  
  // Vérifier les préfixes interdits
  if (NOINDEX_PREFIXES.some(prefix => lowerPath.startsWith(prefix))) {
    return true;
  }
  
  // Vérifier les mots-clés dans le path
  const segments = lowerPath.split("/").filter(Boolean);
  if (segments.some(seg => NOINDEX_KEYWORDS.some(kw => seg.includes(kw)))) {
    return true;
  }
  
  return false;
}
