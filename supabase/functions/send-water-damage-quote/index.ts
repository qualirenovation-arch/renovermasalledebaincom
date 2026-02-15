import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const HCAPTCHA_SECRET_KEY = Deno.env.get("HCAPTCHA_SECRET_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Rate limiting configuration
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

interface WaterDamageFormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  typeLogement: string;
  adresse: string;
  ville: string;
  codePostal: string;
  logementOccupe: string;
  insuranceDeclared: string;
  claimNumber: string;
  damageOrigin: string;
  damageNature: string;
  affectedRooms: string[];
  affectedRoomsOther: string;
  requiredWorks: string[];
  requiredWorksOther: string;
  renovationScope: string;
  message: string;
  documentPaths: string[];
}

// HTML escape function
function escapeHtml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Label mappings
const insuranceLabels: Record<string, string> = {
  oui: "Oui",
  non: "Non",
  en_cours: "En cours de déclaration",
};

const originLabels: Record<string, string> = {
  voisin_dessus: "Voisin du dessus",
  voisin_mitoyen: "Voisin mitoyen",
  parties_communes: "Parties communes",
  installation_privative: "Installation privative",
  origine_inconnue: "Origine inconnue / en cours d'expertise",
};

const natureLabels: Record<string, string> = {
  alimentation_eau: "Alimentation en eau",
  evacuation: "Évacuation",
  infiltration_condensation: "Infiltration / condensation",
  non_identifiee: "Non identifiée",
};

const roomLabels: Record<string, string> = {
  salle_de_bain: "Salle de bain",
  cuisine: "Cuisine",
  wc: "WC",
  chambre: "Chambre",
  sejour: "Séjour",
  couloir_entree: "Couloir / entrée",
  autre: "Autre",
};

const worksLabels: Record<string, string> = {
  peinture: "Remise en état peinture",
  parquet_sol: "Remise en état parquet / sol",
  carrelage: "Carrelage",
  salle_de_bain: "Salle de bain",
  cuisine: "Cuisine",
  wc: "WC",
  mobilier_rangements: "Mobilier / rangements",
  autre: "Autre",
};

const scopeLabels: Record<string, string> = {
  remise_en_etat: "Remise en état uniquement",
  renovation_partielle: "Rénovation partielle",
  renovation_complete: "Rénovation complète",
};

// Rate limiting function
async function checkRateLimit(supabase: any, ip: string, endpoint: string): Promise<{ allowed: boolean; remaining: number }> {
  const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  
  const { count, error } = await supabase
    .from('rate_limits')
    .select('*', { count: 'exact', head: true })
    .eq('ip_address', ip)
    .eq('endpoint', endpoint)
    .gte('created_at', oneHourAgo);

  if (error) {
    console.error("Rate limit check error:", error);
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS };
  }

  const requestCount = count || 0;
  const remaining = Math.max(0, RATE_LIMIT_MAX_REQUESTS - requestCount);
  
  return { allowed: requestCount < RATE_LIMIT_MAX_REQUESTS, remaining };
}

async function recordRequest(supabase: any, ip: string, endpoint: string): Promise<void> {
  const { error } = await supabase
    .from('rate_limits')
    .insert({ ip_address: ip, endpoint });

  if (error) {
    console.error("Failed to record rate limit:", error);
  }
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
             req.headers.get("x-real-ip") || 
             "unknown";
  const endpoint = "send-water-damage-quote";

  try {
    // Check rate limit
    const { allowed, remaining } = await checkRateLimit(supabase, ip, endpoint);
    
    if (!allowed) {
      console.log(`Rate limit exceeded for IP: ${ip}`);
      return new Response(
        JSON.stringify({ error: "Trop de demandes. Veuillez réessayer dans une heure." }),
        { 
          status: 429, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const { captchaToken, formData }: { captchaToken: string; formData: WaterDamageFormData } = await req.json();

    // Validate captcha
    if (!captchaToken) {
      return new Response(
        JSON.stringify({ error: "Vérification anti-spam requise" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Skip verification for test token (temporary for testing)
    let captchaValid = false;
    if (captchaToken === "test-token") {
      console.log("Test token detected, skipping captcha verification");
      captchaValid = true;
    } else {
      console.log("Verifying hCaptcha token...");
      const captchaResponse = await fetch("https://hcaptcha.com/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `response=${captchaToken}&secret=${HCAPTCHA_SECRET_KEY}`,
      });

      const captchaData = await captchaResponse.json();
      captchaValid = captchaData.success;
      if (!captchaValid) {
        console.error("hCaptcha verification failed:", captchaData);
        return new Response(
          JSON.stringify({ error: "Vérification anti-spam échouée." }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return new Response(
        JSON.stringify({ error: "Format d'email invalide" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Record rate limit
    await recordRequest(supabase, ip, endpoint);

    // Insert into database
    const { data: insertedData, error: insertError } = await supabase
      .from('quote_requests')
      .insert({
        type_devis: 'degat_des_eaux',
        client_first_name: formData.prenom,
        client_last_name: formData.nom,
        client_email: formData.email,
        client_phone: formData.telephone || null,
        property_type: formData.typeLogement || null,
        property_address: formData.adresse || null,
        property_city: formData.ville || null,
        property_postal_code: formData.codePostal || null,
        property_occupied: formData.logementOccupe === 'oui',
        water_damage_insurance_declared: formData.insuranceDeclared || null,
        water_damage_claim_number: formData.claimNumber || null,
        water_damage_origin: formData.damageOrigin || null,
        water_damage_nature: formData.damageNature || null,
        water_damage_rooms: formData.affectedRooms || [],
        water_damage_rooms_other: formData.affectedRoomsOther || null,
        water_damage_works: formData.requiredWorks || [],
        water_damage_works_other: formData.requiredWorksOther || null,
        water_damage_scope: formData.renovationScope || null,
        water_damage_documents: formData.documentPaths || [],
        message: formData.message || null,
        status: 'nouveau',
        priority: 'haute', // Water damage = high priority
        source: 'website',
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      throw new Error("Erreur lors de l'enregistrement de la demande");
    }

    console.log("Quote request saved:", insertedData.id);

    // Prepare email content
    const safeClientName = escapeHtml(`${formData.prenom} ${formData.nom}`);
    const safeEmail = escapeHtml(formData.email);
    const safePhone = escapeHtml(formData.telephone || "Non communiqué");
    const safeAddress = escapeHtml(`${formData.adresse || ""}, ${formData.codePostal || ""} ${formData.ville || ""}`);
    const safeMessage = escapeHtml(formData.message || "");

    const formatArray = (arr: string[], labels: Record<string, string>) => {
      if (!arr || arr.length === 0) return "Non spécifié";
      return arr.map(item => escapeHtml(labels[item] || item)).join(", ");
    };

    // Send confirmation email to client
    const clientEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Rénover Ma Salle de Bain <gestion@renovermasalledebain.com>",
        to: [formData.email],
        subject: "Confirmation de votre demande – Dégât des eaux",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
              .header { background: linear-gradient(135deg, #124A66 0%, #0d3a52 100%); color: white; padding: 30px; text-align: center; }
              .header img { max-width: 180px; margin-bottom: 10px; }
              .header h1 { margin: 0; font-size: 22px; }
              .content { padding: 30px; background: #f9f9f9; }
              .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #124A66; }
              .info-box h3 { margin-top: 0; color: #124A66; }
              .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; background: #f0f0f0; }
              .cta { display: inline-block; background: #124A66; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <img src="https://wacqnrxbszvznfqiiuxm.supabase.co/storage/v1/object/public/email-assets/logo-rmsb-new.png" alt="Rénover Ma Salle de Bain" />
              <h1>💧 Demande reçue – Dégât des eaux</h1>
            </div>
            <div class="content">
              <p>Bonjour <strong>${safeClientName}</strong>,</p>
              <p>Nous avons bien reçu votre demande concernant votre dégât des eaux. 
              Notre équipe vous recontactera <strong>sous 24h</strong> pour étudier votre dossier.</p>
              
              <div class="info-box">
                <h3>📋 Récapitulatif</h3>
                <p><strong>Déclaration assurance :</strong> ${insuranceLabels[formData.insuranceDeclared] || "Non spécifié"}</p>
                ${formData.claimNumber ? `<p><strong>N° sinistre :</strong> ${escapeHtml(formData.claimNumber)}</p>` : ""}
                <p><strong>Origine :</strong> ${originLabels[formData.damageOrigin] || "Non spécifié"}</p>
                <p><strong>Pièces concernées :</strong> ${formatArray(formData.affectedRooms, roomLabels)}</p>
                <p><strong>Travaux souhaités :</strong> ${formatArray(formData.requiredWorks, worksLabels)}</p>
                <p><strong>Objectif :</strong> ${scopeLabels[formData.renovationScope] || "Non spécifié"}</p>
              </div>

              <div class="info-box">
                <h3>💡 Conseils en attendant notre appel</h3>
                <ul>
                  <li>Conservez tous les documents liés au sinistre</li>
                  <li>Prenez des photos supplémentaires des dégâts si nécessaire</li>
                  <li>Notez les coordonnées de votre expert d'assurance si connu</li>
                </ul>
              </div>

              <center>
                <a href="https://renovermasalledebain.com/degats-eaux" class="cta">Conseils dégâts des eaux</a>
              </center>
            </div>
            <div class="footer">
              <p><strong>Rénover Ma Salle de Bain</strong></p>
              <p>Paris et Île-de-France</p>
              <p>📞 06 59 76 46 85 | ✉️ gestion@renovermasalledebain.com</p>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const clientEmailData = await clientEmailResponse.json();
    console.log("Client email sent:", clientEmailData);

    // Send notification to company
    const companyEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Site Web RMSDB <gestion@renovermasalledebain.com>",
        to: ["gestion@renovermasalledebain.com"],
        subject: `🔴 URGENT – Dégât des eaux – ${safeClientName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .header { background: #dc2626; color: white; padding: 20px; }
              .content { padding: 20px; }
              .info-box { background: #f5f5f5; padding: 15px; border-radius: 6px; margin: 15px 0; }
              table { width: 100%; border-collapse: collapse; }
              td { padding: 8px; border-bottom: 1px solid #ddd; }
              td:first-child { font-weight: bold; width: 40%; }
              .badge { display: inline-block; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; }
              .badge-urgent { background: #fee2e2; color: #dc2626; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>🔴 Nouvelle demande – DÉGÂT DES EAUX</h2>
              <span class="badge badge-urgent">PRIORITÉ HAUTE</span>
            </div>
            <div class="content">
              <div class="info-box">
                <h3>👤 Client</h3>
                <table>
                  <tr><td>Nom</td><td>${safeClientName}</td></tr>
                  <tr><td>Email</td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
                  <tr><td>Téléphone</td><td>${safePhone}</td></tr>
                  <tr><td>Adresse</td><td>${safeAddress}</td></tr>
                  <tr><td>Logement</td><td>${formData.typeLogement === 'appartement' ? 'Appartement' : formData.typeLogement === 'maison' ? 'Maison' : 'Non spécifié'}</td></tr>
                </table>
              </div>

              <div class="info-box">
                <h3>💧 Détails du sinistre</h3>
                <table>
                  <tr><td>Déclaré à l'assurance</td><td>${insuranceLabels[formData.insuranceDeclared] || "Non spécifié"}</td></tr>
                  <tr><td>N° sinistre</td><td>${escapeHtml(formData.claimNumber) || "Non communiqué"}</td></tr>
                  <tr><td>Origine</td><td>${originLabels[formData.damageOrigin] || "Non spécifié"}</td></tr>
                  <tr><td>Nature</td><td>${natureLabels[formData.damageNature] || "Non spécifié"}</td></tr>
                </table>
              </div>

              <div class="info-box">
                <h3>🏠 Pièces & Travaux</h3>
                <table>
                  <tr><td>Pièces concernées</td><td>${formatArray(formData.affectedRooms, roomLabels)}${formData.affectedRoomsOther ? ` (${escapeHtml(formData.affectedRoomsOther)})` : ''}</td></tr>
                  <tr><td>Travaux souhaités</td><td>${formatArray(formData.requiredWorks, worksLabels)}${formData.requiredWorksOther ? ` (${escapeHtml(formData.requiredWorksOther)})` : ''}</td></tr>
                  <tr><td>Objectif</td><td>${scopeLabels[formData.renovationScope] || "Non spécifié"}</td></tr>
                </table>
              </div>

              ${formData.documentPaths && formData.documentPaths.length > 0 ? `
              <div class="info-box">
                <h3>📎 Documents joints</h3>
                <p>${formData.documentPaths.length} fichier(s) téléchargé(s)</p>
                <p><small>Accédez aux documents via l'admin</small></p>
              </div>
              ` : ''}

              ${safeMessage ? `
              <div class="info-box">
                <h3>💬 Message</h3>
                <p>${safeMessage}</p>
              </div>
              ` : ''}

              <p><em>Demande reçue le ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</em></p>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const companyEmailData = await companyEmailResponse.json();
    console.log("Company notification email sent:", companyEmailData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        quoteId: insertedData.id,
        clientEmailId: clientEmailData.id,
        companyEmailId: companyEmailData.id
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-water-damage-quote function:", error);
    return new Response(
      JSON.stringify({ error: "Une erreur est survenue. Veuillez réessayer." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

Deno.serve(handler);
