import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GOLD = "#C9A227";
const GOLD_LIGHT = "#E3C87A";
const BLUE = "#124A66";
const BLUE_DARK = "#0B2F3F";
const WHITE = "#FFFFFF";
const CREAM = "#F7F6F2";
const GRAY = "#44515A";

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function truncate(text: string, max: number): string {
  return text.length <= max ? text : text.substring(0, max - 3) + "...";
}

function generateDefault(title?: string, subtitle?: string): string {
  const t = title ? truncate(title, 45) : "Rénovation de salle de bain";
  const s = subtitle ? truncate(subtitle, 70) : "Conception + rénovation premium à Paris et Île-de-France";
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${GOLD};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${GOLD_LIGHT};stop-opacity:1"/>
    </linearGradient>
    <pattern id="dots" patternUnits="userSpaceOnUse" width="60" height="60">
      <circle cx="30" cy="30" r="1.5" fill="${BLUE}" opacity="0.15"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="${CREAM}"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect x="0" y="0" width="1200" height="8" fill="${BLUE}"/>
  <rect x="0" y="622" width="1200" height="8" fill="url(#g)"/>
  <text x="600" y="185" font-family="'Nunito Sans',Arial,sans-serif" font-size="58" font-weight="300" fill="${BLUE}" text-anchor="middle" letter-spacing="-2">RMSB</text>
  <text x="600" y="228" font-family="'Nunito Sans',Arial,sans-serif" font-size="22" font-weight="300" font-style="italic" fill="${GOLD}" text-anchor="middle">Un chantier heureux</text>
  <rect x="450" y="258" width="300" height="2" fill="url(#g)"/>
  <text x="600" y="340" font-family="Arial,sans-serif" font-size="44" font-weight="bold" fill="${BLUE_DARK}" text-anchor="middle">${esc(t)}</text>
  <text x="600" y="405" font-family="Arial,sans-serif" font-size="21" fill="${GRAY}" text-anchor="middle">${esc(s)}</text>
  <text x="600" y="580" font-family="Arial,sans-serif" font-size="17" fill="${BLUE}" text-anchor="middle">renovermasalledebain.com</text>
</svg>`;
}

function generateAlbum(title: string, location: string, cover?: string): string {
  const t = truncate(title, 55);
  const l = truncate(location, 42);

  if (!cover) return generateDefault(title, location);

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${BLUE_DARK};stop-opacity:0.15"/>
      <stop offset="52%" style="stop-color:${BLUE_DARK};stop-opacity:0.38"/>
      <stop offset="100%" style="stop-color:${BLUE_DARK};stop-opacity:0.92"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${GOLD};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${GOLD_LIGHT};stop-opacity:1"/>
    </linearGradient>
    <clipPath id="clip"><rect width="1200" height="630"/></clipPath>
  </defs>
  <!-- Photo fond -->
  <image xlink:href="${esc(cover)}" x="0" y="0" width="1200" height="630" preserveAspectRatio="xMidYMid slice" clip-path="url(#clip)"/>
  <!-- Overlay gradient -->
  <rect width="1200" height="630" fill="url(#overlay)"/>
  <!-- Filet doré haut -->
  <rect x="0" y="0" width="1200" height="7" fill="url(#gold)"/>
  <!-- Logo RMSB haut gauche -->
  <text x="60" y="76" font-family="'Nunito Sans',Arial,sans-serif" font-size="40" font-weight="300" fill="${WHITE}" letter-spacing="-1">RMSB</text>
  <text x="60" y="102" font-family="'Nunito Sans',Arial,sans-serif" font-size="14" font-weight="300" font-style="italic" fill="${GOLD_LIGHT}">Un chantier heureux</text>
  <!-- Badge Avant/Après haut droit -->
  <rect x="980" y="38" width="162" height="40" rx="20" fill="${GOLD}"/>
  <text x="1061" y="64" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="${WHITE}" text-anchor="middle">AVANT / APRÈS</text>
  <!-- Localisation -->
  <text x="60" y="490" font-family="Arial,sans-serif" font-size="18" font-weight="bold" fill="${GOLD_LIGHT}">${esc(l)}</text>
  <!-- Titre -->
  <text x="60" y="538" font-family="'Nunito Sans',Arial,sans-serif" font-size="34" font-weight="300" fill="${WHITE}">${esc(t)}</text>
  <!-- CTA -->
  <rect x="60" y="564" width="320" height="48" rx="24" fill="${GOLD}"/>
  <text x="220" y="595" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="${WHITE}" text-anchor="middle">Demandez votre devis gratuit →</text>
  <!-- URL -->
  <text x="1140" y="608" font-family="Arial,sans-serif" font-size="14" fill="rgba(255,255,255,0.7)" text-anchor="end">renovermasalledebain.com</text>
</svg>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const url = new URL(req.url);
    const type = url.searchParams.get("type") || "default";
    const title = url.searchParams.get("title") || "";
    const subtitle = url.searchParams.get("subtitle") || "";
    const location = url.searchParams.get("location") || "";
    const cover = url.searchParams.get("cover") || "";

    let svg: string;
    if (type === "album") {
      svg = generateAlbum(title, location, cover || undefined);
    } else {
      svg = generateDefault(title || undefined, subtitle || undefined);
    }

    return new Response(svg, {
      headers: {
        ...corsHeaders,
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("OG error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate OG image", details: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
