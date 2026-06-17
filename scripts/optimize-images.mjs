/**
 * Optimisation d'images : redimensionne + convertit en AVIF/WebP.
 * Pour chaque source .jpg/.png : génère N variantes par format.
 * Idempotent : skip si la variante existe déjà.
 *
 * Usage :
 *   node scripts/optimize-images.mjs <glob>
 *   node scripts/optimize-images.mjs "src/assets/boulogne-*.jpg"
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { glob } from "glob";

const SIZES = [400, 800, 1200, 1600]; // widths à générer
const AVIF_QUALITY = 60;
const WEBP_QUALITY = 75;

const pattern = process.argv[2];
if (!pattern) {
  console.error("Usage: node scripts/optimize-images.mjs <glob>");
  process.exit(1);
}

const files = await glob(pattern, { nodir: true });
if (files.length === 0) {
  console.error(`Aucun fichier trouvé pour ${pattern}`);
  process.exit(1);
}

console.log(`🔍 ${files.length} images à optimiser\n`);

let totalOriginal = 0;
let totalGenerated = 0;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

  const stat = await fs.stat(file);
  totalOriginal += stat.size;

  const dir = path.dirname(file);
  const base = path.basename(file, ext);
  const meta = await sharp(file).metadata();
  const srcWidth = meta.width || 1600;

  for (const width of SIZES) {
    // Ne génère pas une variante plus large que l'original
    if (width > srcWidth) continue;

    for (const fmt of ["avif", "webp"]) {
      const out = path.join(dir, `${base}-${width}.${fmt}`);
      try {
        await fs.access(out);
        continue; // déjà généré
      } catch {}

      const pipeline = sharp(file).resize({ width, withoutEnlargement: true });
      const buf = fmt === "avif"
        ? await pipeline.avif({ quality: AVIF_QUALITY, effort: 2 }).toBuffer()
        : await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
      await fs.writeFile(out, buf);
      totalGenerated += buf.length;
      console.log(`  ✓ ${path.basename(out)} (${(buf.length / 1024).toFixed(1)} KB)`);
    }
  }
}

console.log(`\n📊 Source: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
console.log(`📊 Variantes générées: ${(totalGenerated / 1024 / 1024).toFixed(2)} MB`);
console.log(`📊 Ratio: ${((totalGenerated / totalOriginal) * 100).toFixed(1)}% du source`);