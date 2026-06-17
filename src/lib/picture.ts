/**
 * Résolution des variantes d'image générées par scripts/optimize-images.mjs
 * Pour une URL source ".../boulogne-1.jpg", retourne les variantes existantes
 * .avif / .webp en plusieurs largeurs pour construire un <picture srcset>.
 */

// Scan eager de toutes les variantes (Vite inline les chemins hashés au build)
const variantModules = import.meta.glob(
  "/src/assets/**/*-{400,800,1200,1600}.{avif,webp}",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

// Index par "basename-width.ext" → URL hashée
const variantIndex: Record<string, string> = {};
for (const [absPath, url] of Object.entries(variantModules)) {
  const file = absPath.split("/").pop()!; // ex: "boulogne-1-800.avif"
  variantIndex[file] = url;
}

const SIZES = [400, 800, 1200, 1600] as const;

export interface PictureSources {
  avif?: string; // srcset
  webp?: string; // srcset
  fallback: string; // URL .jpg originale
  width?: number;
}

/**
 * À partir d'une URL JPG hashée par Vite (ex: "/assets/boulogne-1-Xy3.jpg"),
 * tente de retrouver les variantes optimisées. Si aucune trouvée → fallback JPG.
 */
export function resolvePicture(jpgUrl: string): PictureSources {
  // Extrait le basename "boulogne-1" (sans hash Vite ni extension)
  const fileName = jpgUrl.split("/").pop() || "";
  // Vite ajoute un hash : "boulogne-1-Xy3kLp9.jpg" → on enlève "-XXXX.jpg"
  const base = fileName.replace(/-[\w]{8,10}\.(jpg|jpeg|png)$/i, "")
                       .replace(/\.(jpg|jpeg|png)$/i, "");

  const avifParts: string[] = [];
  const webpParts: string[] = [];
  for (const w of SIZES) {
    const avifUrl = variantIndex[`${base}-${w}.avif`];
    const webpUrl = variantIndex[`${base}-${w}.webp`];
    if (avifUrl) avifParts.push(`${avifUrl} ${w}w`);
    if (webpUrl) webpParts.push(`${webpUrl} ${w}w`);
  }

  return {
    avif: avifParts.length ? avifParts.join(", ") : undefined,
    webp: webpParts.length ? webpParts.join(", ") : undefined,
    fallback: jpgUrl,
  };
}