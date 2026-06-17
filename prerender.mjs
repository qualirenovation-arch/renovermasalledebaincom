/**
 * Script de pré-rendu SSG (dispatcher)
 * Main thread : récupère les routes (Supabase) puis distribue à un pool
 * de worker_threads (cf. prerender-worker.mjs) pour une parallélisation
 * CPU réelle de renderToString.
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://wacqnrxbszvznfqiiuxm.supabase.co";
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhY3Fucnhic3p2em5mcWlpdXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNDcxMzAsImV4cCI6MjA4NDgyMzEzMH0.SYmRw93UuWxXVaxzcvlbB1AAXdQTgY4eEPuqajUEuRA";

const PAGE_SEO = {
  "/": { title: "Rénovation salle de bain Paris", description: "Rénovation de salle de bain haut de gamme à Paris et Île-de-France. Conception + réalisation clé en main. Un chantier heureux." },
  "/renovation-salle-de-bain-paris": { title: "Rénovation salle de bain Paris – Devis gratuit", description: "Spécialiste rénovation salle de bain à Paris. Conception, coordination et réalisation clé en main. Devis gratuit sous 48h." },
  "/realisations": { title: "Nos réalisations", description: "Découvrez nos rénovations de salles de bain à Paris et Île-de-France : zellige, marbre, terrazzo. Avant/Après de nos chantiers." },
  "/devis": { title: "Demande de devis", description: "Demandez votre devis gratuit pour la rénovation de votre salle de bain à Paris et Île-de-France. Réponse sous 48h." },
  "/pourquoi-nous": { title: "Notre méthode", description: "Découvrez l'approche RMSB : conception, anticipation, coordination. Pour un chantier heureux sans stress." },
  "/guide-travaux": { title: "Guide Travaux", description: "Conseils d'experts pour votre rénovation de salle de bain : douche italienne, carrelage, plomberie. Le guide complet." },
  "/faq": { title: "Questions fréquentes", description: "Réponses à vos questions sur la rénovation de salle de bain : durée, budget, matériaux, garanties." },
  "/a-propos": { title: "À propos – Notre équipe", description: "Découvrez l'équipe Qualirenovation derrière renovermasalledebain.com. 20 ans d'expérience dans la rénovation de salle de bain à Paris." },
  "/presse": { title: "Presse & Médias", description: "RMSB dans les médias : articles, interviews et publications sur la rénovation de salle de bain." },
  "/avis": { title: "Avis clients", description: "Plus de 40 avis 5 étoiles vérifiés sur Houzz. Découvrez les témoignages de nos clients satisfaits." },
  "/qualirenovation": { title: "QualiRénovation – Notre label qualité", description: "Découvrez le label QualiRénovation : notre engagement qualité pour votre rénovation de salle de bain." },
  "/partenaires": { title: "Nos partenaires", description: "Les marques et artisans de confiance avec lesquels nous travaillons pour vos rénovations de salle de bain." },
  "/photographe": { title: "Notre photographe", description: "Stéphane Vasco, photographe partenaire pour immortaliser vos réalisations de salle de bain." },
  "/videos-conseils": { title: "Vidéos conseils", description: "Nos vidéos conseils pour votre rénovation de salle de bain : astuces, techniques et inspirations." },
  "/mentions-legales": { title: "Mentions légales", description: "Mentions légales du site renovermasalledebain.com – Qualirenovation." },
  "/politique-confidentialite": { title: "Politique de confidentialité", description: "Notre politique de confidentialité et de protection des données personnelles." },
};

const SEO_ROUTES = Object.keys(PAGE_SEO);

async function getDynamicRoutes() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data, error } = await supabase
      .from("albums")
      .select("slug, title, description, location, cover_image, album_seo(meta_title, meta_description)")
      .eq("is_in_progress", false)
      .order("display_order");
    if (error) {
      console.warn("⚠️  Erreur Supabase:", error.message);
      return [];
    }
    const routes = (data || []).map((a) => {
      const seo = a.album_seo?.[0] || a.album_seo;
      const title = seo?.meta_title || a.title;
      const desc = seo?.meta_description || a.description;
      return { path: `/realisations/${a.slug}`, title, description: desc, coverImage: a.cover_image };
    });
    console.log(`📦 ${routes.length} réalisations trouvées`);
    return routes;
  } catch (err) {
    console.warn("⚠️  Impossible de se connecter à Supabase:", err.message);
    return [];
  }
}

async function prerender() {
  const clientDir = path.resolve(__dirname, "dist/client");
  const serverDir = path.resolve(__dirname, "dist/server");

  if (!fs.existsSync(clientDir) || !fs.existsSync(serverDir)) {
    console.error("❌ dist/client ou dist/server introuvable.");
    process.exit(1);
  }

  const dynamicRoutes = await getDynamicRoutes();
  const allRoutes = [
    ...SEO_ROUTES.map((p) => ({ path: p, ...PAGE_SEO[p] })),
    ...dynamicRoutes,
  ];

  // Pool: 1 worker / cœur CPU, capé entre 2 et 8 pour limiter la RAM
  const NUM_WORKERS = Math.min(allRoutes.length, Math.max(2, Math.min(8, os.cpus().length)));
  console.log(`\n🚀 Pré-rendu de ${allRoutes.length} pages via ${NUM_WORKERS} workers...\n`);

  let successCount = 0;
  let errorCount = 0;
  const errors = [];
  const queue = [...allRoutes];
  const workerPath = path.resolve(__dirname, "prerender-worker.mjs");

  await new Promise((resolve) => {
    let liveWorkers = 0;

    const spawnWorker = () => {
      const w = new Worker(workerPath, { workerData: { clientDir, serverDir } });
      liveWorkers++;

      const sendNext = () => {
        const next = queue.shift();
        if (!next) {
          w.postMessage({ type: "exit" });
          return;
        }
        w.postMessage({ type: "render", route: next });
      };

      w.on("message", (msg) => {
        if (msg.type === "ready") {
          sendNext();
        } else if (msg.type === "done") {
          if (msg.ok) {
            console.log(`  ✅ ${msg.path}`);
            successCount++;
          } else {
            console.error(`  ⚠️  ${msg.path}: ${msg.error}`);
            errors.push(msg.path);
            errorCount++;
          }
          sendNext();
        }
      });

      w.on("error", (err) => console.error("Worker error:", err));
      w.on("exit", () => {
        liveWorkers--;
        if (liveWorkers === 0) resolve();
      });
    };

    for (let i = 0; i < NUM_WORKERS; i++) spawnWorker();
  });

  console.log(`\n📊 Résultat: ${successCount} succès, ${errorCount} erreurs sur ${allRoutes.length} pages`);
  if (errors.length > 0) {
    console.log(`\n⚠️  Pages en erreur (seront servies en mode SPA):`);
    errors.forEach((e) => console.log(`   - ${e}`));
  }
  console.log("");

  if (successCount === 0) process.exit(1);
  process.exit(0);
}

prerender();