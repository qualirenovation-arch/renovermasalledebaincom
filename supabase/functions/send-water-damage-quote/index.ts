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

const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

function escapeHtml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

const maskEmail = (e: string) => { const [l, d] = e.split('@'); return d ? `${l[0]}***@${d}` : '***'; };

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

interface WaterDamageStep1Data {
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
    // Rate limiting
    const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const { count } = await supabase.from('rate_limits').select('*', { count: 'exact', head: true }).eq('ip_address', ip).eq('endpoint', endpoint).gte('created_at', oneHourAgo);
    
    if ((count || 0) >= RATE_LIMIT_MAX_REQUESTS) {
      console.log("Rate limit exceeded for send-water-damage-quote endpoint");
      return new Response(JSON.stringify({ error: "Trop de demandes. Veuillez réessayer dans une heure." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { captchaToken, formData }: { captchaToken: string; formData: WaterDamageStep1Data } = await req.json();

    // Validate captcha
    if (!captchaToken) {
      return new Response(JSON.stringify({ error: "Vérification anti-spam requise" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    if (captchaToken !== "test-token") {
      const captchaResponse = await fetch("https://hcaptcha.com/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `response=${captchaToken}&secret=${HCAPTCHA_SECRET_KEY}`,
      });
      const captchaData = await captchaResponse.json();
      if (!captchaData.success) {
        return new Response(JSON.stringify({ error: "Vérification anti-spam échouée." }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
      }
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return new Response(JSON.stringify({ error: "Format d'email invalide" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    // Record rate limit
    await supabase.from('rate_limits').insert({ ip_address: ip, endpoint });

    // Generate unique access token
    const accessToken = generateToken();

    // Insert Step 1 data into database
    const { data: lead, error: insertError } = await supabase
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
        access_token: accessToken,
        lead_status: 'etape_1',
        status: 'nouveau',
        priority: 'haute',
        source: 'website',
      })
      .select()
      .single();

    if (insertError) {
      console.error("DB insert error:", insertError);
      throw new Error("Failed to save lead");
    }

    console.log("Water damage lead saved:", lead.id);

    const formatArray = (arr: string[], labels: Record<string, string>) => {
      if (!arr || arr.length === 0) return "Non spécifié";
      return arr.map(item => escapeHtml(labels[item] || item)).join(", ");
    };

    // Build email
    const safeName = escapeHtml(`${formData.prenom} ${formData.nom}`);
    const safeEmail = escapeHtml(formData.email);
    const safePostal = escapeHtml(formData.codePostal);

    const siteBaseUrl = "https://renovermasalledebain.com";
    const step2Url = `${siteBaseUrl}/devis/completer?token=${accessToken}`;
    const callbackUrl = `${siteBaseUrl}/devis/rappel?token=${accessToken}`;
    const calUrl = "https://cal.com/votre-conseiller-travaux-siw706/30min?overlayCalendar=true";

    // Send 3-option email to client (same pattern as classic)
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: "Rénover Ma Salle de Bain <gestion@renovermasalledebain.com>",
        to: [formData.email],
        subject: "Votre dossier dégât des eaux – comment souhaitez-vous avancer ?",
        html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { font-family: 'Nunito Sans', Arial, sans-serif; font-weight: 300; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
  .header { background: linear-gradient(135deg, #124A66 0%, #0d3a52 100%); color: white; padding: 24px 16px; text-align: center; }
  .logo-text { font-family: 'Nunito Sans', Arial, sans-serif; font-weight: 300; color: #ffffff; letter-spacing: 0.5px; white-space: nowrap; font-size: 18px; }
  .logo-text .accent { color: #A0845C; }
  .logo-sub { font-family: 'Nunito Sans', Arial, sans-serif; font-size: 9px; font-weight: 400; color: rgba(255,255,255,0.85); letter-spacing: 2.5px; padding-top: 2px; }
  .content { padding: 30px; background: #f9f9f9; }
  .option-box { background: white; padding: 20px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #124A66; }
  .option-box h3 { margin-top: 0; color: #124A66; font-size: 16px; }
  .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626; }
  .info-box h3 { margin-top: 0; color: #dc2626; }
  .cta { display: inline-block; background: #124A66; color: white !important; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 10px; font-weight: bold; }
  .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; background: #f0f0f0; }
  @media only screen and (max-width: 480px) {
    .logo-text { font-size: 14px !important; }
    .logo-sub { font-size: 8px !important; letter-spacing: 1.5px !important; }
    .header h1 { font-size: 18px !important; }
    .content { padding: 20px 16px !important; }
    .option-box { padding: 14px !important; }
  }
</style></head>
<body>
  <div class="header">
    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
      <tr><td align="center" style="padding-bottom:6px;"><img src="https://wacqnrxbszvznfqiiuxm.supabase.co/storage/v1/object/public/email-assets/logo-renover-neg.svg" alt="RenoverMaSalleDeBain.com" width="180" style="width:180px;height:auto;" /></td></tr>
      <tr><td align="center" class="logo-sub">Une expertise QUALIRÉNOVATION</td></tr>
    </table>
    <h1>💧 Dégât des eaux – Dossier enregistré</h1>
  </div>
  <div class="content">
    <p>Bonjour <strong>${escapeHtml(formData.prenom)}</strong>,</p>
    <p>Merci pour votre demande concernant votre dégât des eaux à <strong>${safePostal}</strong>.</p>
    
    <div class="info-box">
      <h3>📋 Récapitulatif de votre sinistre</h3>
      <p><strong>Déclaration assurance :</strong> ${insuranceLabels[formData.insuranceDeclared] || "Non spécifié"}</p>
      ${formData.claimNumber ? `<p><strong>N° sinistre :</strong> ${escapeHtml(formData.claimNumber)}</p>` : ""}
      <p><strong>Origine :</strong> ${originLabels[formData.damageOrigin] || "Non spécifié"}</p>
      <p><strong>Nature :</strong> ${natureLabels[formData.damageNature] || "Non spécifié"}</p>
      <p><strong>Pièces concernées :</strong> ${formatArray(formData.affectedRooms, roomLabels)}</p>
    </div>

    <p><strong>Pour affiner votre dossier, vous avez trois façons de poursuivre :</strong></p>

    <div class="option-box">
      <h3>🔹 OPTION 1 – Compléter votre dossier en ligne</h3>
      <p>Précisez les travaux souhaités, ajoutez des photos et documents (constat amiable, rapport d'expertise…).</p>
      <center><a href="${step2Url}" class="cta" target="_blank">Compléter mon dossier</a></center>
    </div>

    <div class="option-box">
      <h3>🔹 OPTION 2 – Être rappelé</h3>
      <p>Un conseiller vous rappelle sous 24h pour discuter de votre sinistre.</p>
      <center><a href="${callbackUrl}" class="cta" target="_blank">Me faire rappeler</a></center>
    </div>

    <div class="option-box">
      <h3>🔹 OPTION 3 – Planifier un échange téléphonique</h3>
      <p>Choisissez directement un créneau qui vous convient.</p>
      <center><a href="${calUrl}" class="cta" target="_blank">Choisir un créneau</a></center>
    </div>

    <p style="margin-top: 24px;">Selon votre préférence, nous avancerons ensemble vers la visite technique.</p>
    <p>À très bientôt,<br><strong>L'équipe RenoverMaSalleDeBain.com</strong><br>Paris & Île-de-France</p>
  </div>
  <div class="footer">
    <p><strong>RenoverMaSalleDeBain.com</strong></p>
    <p>📞 06 59 76 46 85 | ✉️ gestion@renovermasalledebain.com</p>
  </div>
</body></html>`,
      }),
    });

    const emailData = await emailResponse.json();
    console.log("Client email sent to:", maskEmail(formData.email));

    // Send notification to company
    const companyEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: "Site Web RMSDB <gestion@renovermasalledebain.com>",
        to: ["gestion@renovermasalledebain.com"],
        subject: `🔴 URGENT – Dégât des eaux Étape 1 – ${safeName}`,
        html: `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
  body { font-family: 'Nunito Sans', Arial, sans-serif; font-weight: 300; line-height: 1.6; color: #333; }
  .header { background: #dc2626; color: white; padding: 20px; }
  .content { padding: 20px; }
  .info-box { background: #f5f5f5; padding: 15px; border-radius: 6px; margin: 15px 0; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 8px; border-bottom: 1px solid #ddd; }
  td:first-child { font-weight: bold; width: 40%; }
  .badge { display: inline-block; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; }
  .badge-urgent { background: #fee2e2; color: #dc2626; }
</style></head>
<body>
  <div class="header">
    <h2>🔴 Dégât des eaux – ÉTAPE 1 complétée</h2>
    <span class="badge badge-urgent">PRIORITÉ HAUTE</span>
  </div>
  <div class="content">
    <div class="info-box">
      <h3>👤 Client</h3>
      <table>
        <tr><td>Nom</td><td>${safeName}</td></tr>
        <tr><td>Email</td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
        <tr><td>Téléphone</td><td>${escapeHtml(formData.telephone || "Non communiqué")}</td></tr>
        <tr><td>Adresse</td><td>${escapeHtml(`${formData.adresse || ""}, ${formData.codePostal || ""} ${formData.ville || ""}`)}</td></tr>
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
        <tr><td>Pièces</td><td>${formatArray(formData.affectedRooms, roomLabels)}${formData.affectedRoomsOther ? ` (${escapeHtml(formData.affectedRoomsOther)})` : ''}</td></tr>
      </table>
    </div>
    <p><em>Reçu le ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</em></p>
    <p><strong>Statut :</strong> Lead dégât des eaux – Étape 1 complétée (en attente étape 2)</p>
  </div>
</body></html>`,
      }),
    });

    const companyData = await companyEmailResponse.json();
    console.log("Company notification sent for water damage lead:", lead.id);

    return new Response(
      JSON.stringify({ success: true, leadId: lead.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in send-water-damage-quote function:", error);
    return new Response(
      JSON.stringify({ error: "Une erreur est survenue. Veuillez réessayer." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

Deno.serve(handler);
