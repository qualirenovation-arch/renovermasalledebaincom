import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Palette officielle OG
const COLORS = {
  bluePrimary: "#124A66",
  blueDark: "#0B2F3F",
  blueLight: "#D7E6EE",
  goldPrimary: "#C9A227",
  goldLight: "#E3D28B",
  white: "#FFFFFF",
  whiteCream: "#F7F6F2",
  grayText: "#44515A",
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

function generateDefaultOG(): string {
  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${COLORS.goldPrimary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${COLORS.goldLight};stop-opacity:1" />
    </linearGradient>
    <pattern id="pattern" patternUnits="userSpaceOnUse" width="60" height="60">
      <circle cx="30" cy="30" r="2" fill="${COLORS.blueLight}" opacity="0.3"/>
    </pattern>
  </defs>
  
  <!-- Fond blanc cassé -->
  <rect width="1200" height="630" fill="${COLORS.whiteCream}"/>
  
  <!-- Motif subtil -->
  <rect width="1200" height="630" fill="url(#pattern)"/>
  
  <!-- Bande bleue en haut -->
  <rect x="0" y="0" width="1200" height="8" fill="${COLORS.bluePrimary}"/>
  
  <!-- Bande dorée en bas -->
  <rect x="0" y="622" width="1200" height="8" fill="url(#goldGradient)"/>
  
  <!-- Cercle décoratif gauche -->
  <circle cx="-100" cy="315" r="300" fill="none" stroke="${COLORS.blueLight}" stroke-width="2" opacity="0.5"/>
  
  <!-- Cercle décoratif droit -->
  <circle cx="1300" cy="315" r="300" fill="none" stroke="${COLORS.blueLight}" stroke-width="2" opacity="0.5"/>
  
  <!-- Logo RMSB -->
  <text x="600" y="180" font-family="Georgia, serif" font-size="72" font-weight="bold" fill="${COLORS.bluePrimary}" text-anchor="middle" letter-spacing="-2">RMSB</text>
  
  <!-- Slogan -->
  <text x="600" y="230" font-family="Georgia, serif" font-size="24" font-style="italic" fill="${COLORS.goldPrimary}" text-anchor="middle">Un chantier heureux</text>
  
  <!-- Séparateur doré -->
  <rect x="450" y="270" width="300" height="2" fill="url(#goldGradient)"/>
  
  <!-- Titre principal -->
  <text x="600" y="350" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="bold" fill="${COLORS.blueDark}" text-anchor="middle">Rénovation de salle de bain</text>
  <text x="600" y="410" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="bold" fill="${COLORS.blueDark}" text-anchor="middle">haut de gamme</text>
  
  <!-- Sous-titre -->
  <text x="600" y="480" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="${COLORS.grayText}" text-anchor="middle">Conception + rénovation premium à Paris et Île-de-France</text>
  
  <!-- URL -->
  <text x="600" y="580" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="${COLORS.bluePrimary}" text-anchor="middle">renovermasalledebain.com</text>
</svg>`;
}

function generatePageOG(title: string, subtitle?: string): string {
  const displayTitle = truncateText(title, 50);
  const displaySubtitle = subtitle ? truncateText(subtitle, 80) : "";
  
  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${COLORS.goldPrimary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${COLORS.goldLight};stop-opacity:1" />
    </linearGradient>
    <pattern id="pattern" patternUnits="userSpaceOnUse" width="60" height="60">
      <circle cx="30" cy="30" r="2" fill="${COLORS.blueLight}" opacity="0.3"/>
    </pattern>
  </defs>
  
  <!-- Fond blanc cassé -->
  <rect width="1200" height="630" fill="${COLORS.whiteCream}"/>
  
  <!-- Motif subtil -->
  <rect width="1200" height="630" fill="url(#pattern)"/>
  
  <!-- Bande bleue en haut -->
  <rect x="0" y="0" width="1200" height="8" fill="${COLORS.bluePrimary}"/>
  
  <!-- Bande dorée en bas -->
  <rect x="0" y="622" width="1200" height="8" fill="url(#goldGradient)"/>
  
  <!-- Cercle décoratif -->
  <circle cx="1100" cy="100" r="200" fill="none" stroke="${COLORS.blueLight}" stroke-width="2" opacity="0.5"/>
  
  <!-- Logo RMSB en haut à gauche -->
  <text x="80" y="80" font-family="Georgia, serif" font-size="48" font-weight="bold" fill="${COLORS.bluePrimary}" letter-spacing="-1">RMSB</text>
  <text x="80" y="110" font-family="Georgia, serif" font-size="16" font-style="italic" fill="${COLORS.goldPrimary}">Un chantier heureux</text>
  
  <!-- Titre de la page -->
  <text x="600" y="300" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="bold" fill="${COLORS.blueDark}" text-anchor="middle">${escapeXml(displayTitle)}</text>
  
  ${displaySubtitle ? `<text x="600" y="370" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="${COLORS.grayText}" text-anchor="middle">${escapeXml(displaySubtitle)}</text>` : ""}
  
  <!-- Séparateur doré -->
  <rect x="400" y="420" width="400" height="3" fill="url(#goldGradient)"/>
  
  <!-- Badge Paris & IDF -->
  <rect x="480" y="470" width="240" height="40" rx="20" fill="${COLORS.bluePrimary}"/>
  <text x="600" y="497" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="${COLORS.white}" text-anchor="middle">Paris &amp; Île-de-France</text>
  
  <!-- URL -->
  <text x="600" y="580" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="${COLORS.bluePrimary}" text-anchor="middle">renovermasalledebain.com</text>
</svg>`;
}

function generateAlbumOG(title: string, location: string, style?: string, tag1?: string, tag2?: string, cover?: string): string {
  const displayTitle = truncateText(title, 40);
  const displayLocation = truncateText(location, 35);
  
  // Si une image de couverture est fournie, utiliser le nouveau design
  if (cover) {
    return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="overlayGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.blueDark};stop-opacity:0.3" />
      <stop offset="50%" style="stop-color:${COLORS.blueDark};stop-opacity:0.5" />
      <stop offset="100%" style="stop-color:${COLORS.blueDark};stop-opacity:0.85" />
    </linearGradient>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${COLORS.goldPrimary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${COLORS.goldLight};stop-opacity:1" />
    </linearGradient>
    <clipPath id="imageClip">
      <rect width="1200" height="630" rx="0"/>
    </clipPath>
  </defs>
  
  <!-- Image de fond -->
  <image 
    xlink:href="${escapeXml(cover)}" 
    x="0" y="0" 
    width="1200" height="630" 
    preserveAspectRatio="xMidYMid slice"
    clip-path="url(#imageClip)"
  />
  
  <!-- Overlay gradient -->
  <rect width="1200" height="630" fill="url(#overlayGradient)"/>
  
  <!-- Bande dorée en haut -->
  <rect x="0" y="0" width="1200" height="6" fill="url(#goldGradient)"/>
  
  <!-- Logo RMSB en haut à gauche -->
  <text x="60" y="70" font-family="Georgia, serif" font-size="42" font-weight="bold" fill="${COLORS.white}" letter-spacing="-1">RMSB</text>
  <text x="60" y="100" font-family="Georgia, serif" font-size="14" font-style="italic" fill="${COLORS.goldLight}">Un chantier heureux</text>
  
  <!-- Badge Avant/Après en haut à droite -->
  <rect x="980" y="40" width="170" height="40" rx="20" fill="${COLORS.goldPrimary}"/>
  <text x="1065" y="67" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="bold" fill="${COLORS.white}" text-anchor="middle">AVANT / APRÈS</text>
  
  <!-- Contenu en bas -->
  <!-- Location -->
  <text x="60" y="480" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="${COLORS.goldLight}" font-weight="bold">${escapeXml(displayLocation)}</text>
  
  <!-- Titre du projet -->
  <text x="60" y="530" font-family="Georgia, serif" font-size="38" font-weight="bold" fill="${COLORS.white}">${escapeXml(displayTitle)}</text>
  
  <!-- CTA Devis -->
  <rect x="60" y="560" width="320" height="50" rx="25" fill="${COLORS.goldPrimary}"/>
  <text x="220" y="593" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="bold" fill="${COLORS.white}" text-anchor="middle">Demandez votre devis gratuit →</text>
  
  <!-- URL du site -->
  <text x="1140" y="600" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="${COLORS.white}" text-anchor="end" opacity="0.8">renovermasalledebain.com</text>
</svg>`;
  }
  
  // Design original sans image de couverture
  const tags = [style, tag1, tag2].filter(Boolean).slice(0, 3);
  
  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${COLORS.goldPrimary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${COLORS.goldLight};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.bluePrimary};stop-opacity:0.95" />
      <stop offset="100%" style="stop-color:${COLORS.blueDark};stop-opacity:0.95" />
    </linearGradient>
    <pattern id="pattern" patternUnits="userSpaceOnUse" width="40" height="40">
      <circle cx="20" cy="20" r="1.5" fill="${COLORS.goldLight}" opacity="0.2"/>
    </pattern>
  </defs>
  
  <!-- Fond blanc cassé -->
  <rect width="1200" height="630" fill="${COLORS.whiteCream}"/>
  
  <!-- Zone gauche décorative -->
  <rect x="0" y="0" width="400" height="630" fill="url(#blueGradient)"/>
  <rect x="0" y="0" width="400" height="630" fill="url(#pattern)"/>
  
  <!-- Bordure dorée verticale -->
  <rect x="398" y="0" width="4" height="630" fill="url(#goldGradient)"/>
  
  <!-- Bande dorée en bas -->
  <rect x="0" y="622" width="1200" height="8" fill="url(#goldGradient)"/>
  
  <!-- Logo RMSB sur fond bleu -->
  <text x="200" y="120" font-family="Georgia, serif" font-size="64" font-weight="bold" fill="${COLORS.white}" text-anchor="middle" letter-spacing="-2">RMSB</text>
  <text x="200" y="160" font-family="Georgia, serif" font-size="20" font-style="italic" fill="${COLORS.goldLight}" text-anchor="middle">Un chantier heureux</text>
  
  <!-- Badge Avant/Après -->
  <rect x="90" y="250" width="220" height="50" rx="25" fill="${COLORS.goldPrimary}"/>
  <text x="200" y="283" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="bold" fill="${COLORS.white}" text-anchor="middle">AVANT / APRÈS</text>
  
  <!-- Icône maison -->
  <text x="200" y="420" font-size="80" text-anchor="middle">🏠</text>
  
  <!-- URL sur fond bleu -->
  <text x="200" y="580" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="${COLORS.goldLight}" text-anchor="middle">renovermasalledebain.com</text>
  
  <!-- Contenu principal à droite -->
  <!-- Location -->
  <text x="800" y="160" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="${COLORS.bluePrimary}" text-anchor="middle" font-weight="bold">${escapeXml(displayLocation)}</text>
  
  <!-- Séparateur -->
  <rect x="550" y="185" width="500" height="2" fill="${COLORS.blueLight}"/>
  
  <!-- Titre du projet -->
  <text x="800" y="280" font-family="Georgia, serif" font-size="36" font-weight="bold" fill="${COLORS.blueDark}" text-anchor="middle">${escapeXml(displayTitle)}</text>
  
  <!-- Tags -->
  ${tags.length > 0 ? `
  <g transform="translate(800, 360)">
    ${tags.map((tag, i) => `
      <g transform="translate(${(i - (tags.length - 1) / 2) * 160}, 0)">
        <rect x="-70" y="-20" width="140" height="40" rx="20" fill="${COLORS.bluePrimary}" opacity="0.1"/>
        <text x="0" y="7" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="${COLORS.bluePrimary}" text-anchor="middle">${escapeXml(tag || "")}</text>
      </g>
    `).join("")}
  </g>` : ""}
  
  <!-- CTA Devis -->
  <rect x="620" y="450" width="360" height="60" rx="30" fill="${COLORS.goldPrimary}"/>
  <text x="800" y="490" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="bold" fill="${COLORS.white}" text-anchor="middle">Demandez votre devis gratuit →</text>
  
  <!-- Mention premium -->
  <text x="800" y="570" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="${COLORS.grayText}" text-anchor="middle">Rénovation premium • Paris &amp; IDF</text>
</svg>`;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const type = url.searchParams.get("type") || "default";
    const title = url.searchParams.get("title") || "";
    const subtitle = url.searchParams.get("subtitle") || "";
    const location = url.searchParams.get("location") || "";
    const style = url.searchParams.get("style") || "";
    const tag1 = url.searchParams.get("tag1") || "";
    const tag2 = url.searchParams.get("tag2") || "";
    const cover = url.searchParams.get("cover") || "";

    let svg: string;

    switch (type) {
      case "page":
        svg = generatePageOG(title, subtitle);
        break;
      case "album":
        svg = generateAlbumOG(title, location, style, tag1, tag2, cover);
        break;
      default:
        svg = generateDefaultOG();
    }

    return new Response(svg, {
      headers: {
        ...corsHeaders,
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response(JSON.stringify({ error: "Failed to generate OG image" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
