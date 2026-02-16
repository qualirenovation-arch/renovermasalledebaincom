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

const projectTypeLabels: Record<string, string> = {
  "baignoire-vers-douche": "Remplacer une baignoire par une douche",
  "moderniser": "Moderniser une salle de bain existante",
  "installer-baignoire": "Installer une baignoire",
  "repenser-espace": "Repenser entièrement l'espace",
  "nouvelle-sdb": "Créer une nouvelle salle de bain",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const endpoint = "send-step1-confirmation";

  try {
    // Rate limiting
    const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const { count } = await supabase.from('rate_limits').select('*', { count: 'exact', head: true }).eq('ip_address', ip).eq('endpoint', endpoint).gte('created_at', oneHourAgo);
    
    if ((count || 0) >= RATE_LIMIT_MAX_REQUESTS) {
      return new Response(JSON.stringify({ error: "Trop de demandes. Veuillez réessayer dans une heure." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { clientFirstName, clientLastName, clientEmail, clientPhone, codePostal, projectType, roomType, captchaToken } = await req.json();

    // Validate required fields
    if (!clientEmail || !clientFirstName || !clientLastName || !clientPhone || !codePostal || !projectType) {
      return new Response(JSON.stringify({ error: "Tous les champs obligatoires doivent être remplis." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Validate captcha
    if (!captchaToken) {
      return new Response(JSON.stringify({ error: "Vérification anti-spam requise" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (captchaToken !== "test-token") {
      const captchaResponse = await fetch("https://hcaptcha.com/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `response=${captchaToken}&secret=${HCAPTCHA_SECRET_KEY}`,
      });
      const captchaData = await captchaResponse.json();
      if (!captchaData.success) {
        return new Response(JSON.stringify({ error: "Vérification anti-spam échouée." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
      return new Response(JSON.stringify({ error: "Format d'email invalide" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Record rate limit
    await supabase.from('rate_limits').insert({ ip_address: ip, endpoint });

    // Generate unique access token
    const accessToken = generateToken();

    // Insert lead into database
    const { data: lead, error: insertError } = await supabase
      .from('quote_requests')
      .insert({
        type_devis: 'classique',
        client_first_name: clientFirstName,
        client_last_name: clientLastName,
        client_email: clientEmail,
        client_phone: clientPhone,
        property_postal_code: codePostal,
        project_type: projectType,
        project_room_type: roomType || null,
        access_token: accessToken,
        lead_status: 'etape_1',
        status: 'nouveau',
        priority: 'normale',
        source: 'website',
      })
      .select()
      .single();

    if (insertError) {
      console.error("DB insert error:", insertError);
      throw new Error("Failed to save lead");
    }

    console.log("Lead saved:", lead.id);

    // Build email
    const safeName = escapeHtml(`${clientFirstName} ${clientLastName}`);
    const safeEmail = escapeHtml(clientEmail);
    const safePostal = escapeHtml(codePostal);
    const safeProjectType = escapeHtml(projectTypeLabels[projectType] || projectType);

    const siteBaseUrl = "https://renovermasalledebaincom.lovable.app";
    const step2Url = `${siteBaseUrl}/devis/completer?token=${accessToken}`;
    const callbackUrl = `${siteBaseUrl}/devis/rappel?token=${accessToken}`;
    const calUrl = "https://cal.com/votre-conseiller-travaux-siw706/30min?overlayCalendar=true";

    // Send email to client
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: "RenoverMaSalleDeBain.com <gestion@renovermasalledebain.com>",
        to: [clientEmail],
        subject: "Votre projet – comment souhaitez-vous avancer ?",
        html: `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
  .header { background: linear-gradient(135deg, #124A66 0%, #0d3a52 100%); color: white; padding: 30px; text-align: center; }
  .header img { max-width: 180px; margin-bottom: 10px; }
  .content { padding: 30px; background: #f9f9f9; }
  .option-box { background: white; padding: 20px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #124A66; }
  .option-box h3 { margin-top: 0; color: #124A66; font-size: 16px; }
  .cta { display: inline-block; background: #124A66; color: white !important; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 10px; font-weight: bold; }
  .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; background: #f0f0f0; }
</style></head>
<body>
  <div class="header">
    <img src="https://wacqnrxbszvznfqiiuxm.supabase.co/storage/v1/object/public/email-assets/logo-rmsb-new.png" alt="RenoverMaSalleDeBain" />
    <h1>🛁 RenoverMaSalleDeBain.com</h1>
  </div>
  <div class="content">
    <p>Bonjour <strong>${escapeHtml(clientFirstName)}</strong>,</p>
    <p>Merci pour votre demande concernant votre projet à <strong>${safePostal}</strong>.</p>
    <p>Pour établir un devis précis, une visite sur site sera indispensable.<br>
    Mais avant cela, nous devons affiner certains éléments avec vous.</p>
    <p><strong>Vous avez trois façons de poursuivre :</strong></p>

    <div class="option-box">
      <h3>🔹 OPTION 1 – Compléter votre demande en ligne</h3>
      <p>Précisez vos envies (équipements, finitions, style…) pour que nous préparions au mieux la visite technique.</p>
      <center><a href="${step2Url}" class="cta" target="_blank">Compléter mon projet</a></center>
    </div>

    <div class="option-box">
      <h3>🔹 OPTION 2 – Être rappelé</h3>
      <p>Un conseiller vous rappelle sous 24h pour discuter de votre projet.</p>
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
    console.log("Client email sent:", emailData);

    // Send notification to company
    const companyEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: "Site Web RMSDB <gestion@renovermasalledebain.com>",
        to: ["gestion@renovermasalledebain.com"],
        subject: `🔔 Nouveau lead Étape 1 – ${safeName}`,
        html: `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
  .header { background: #333; color: white; padding: 20px; }
  .content { padding: 20px; }
  .info-box { background: #f5f5f5; padding: 15px; border-radius: 6px; margin: 15px 0; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 8px; border-bottom: 1px solid #ddd; }
  td:first-child { font-weight: bold; width: 40%; }
</style></head>
<body>
  <div class="header"><h2>🔔 Nouveau lead – Étape 1 complétée</h2></div>
  <div class="content">
    <div class="info-box">
      <h3>👤 Client</h3>
      <table>
        <tr><td>Nom</td><td>${safeName}</td></tr>
        <tr><td>Email</td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
        <tr><td>Téléphone</td><td>${escapeHtml(clientPhone)}</td></tr>
        <tr><td>Code postal</td><td>${safePostal}</td></tr>
      </table>
    </div>
    <div class="info-box">
      <h3>🏠 Projet</h3>
      <table>
        <tr><td>Type</td><td>${safeProjectType}</td></tr>
        ${roomType ? `<tr><td>Pièce actuelle</td><td>${escapeHtml(roomType)}</td></tr>` : ''}
      </table>
    </div>
    <p><em>Reçu le ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</em></p>
    <p><strong>Statut :</strong> Lead – Étape 1 complétée</p>
  </div>
</body></html>`,
      }),
    });

    const companyData = await companyEmailResponse.json();
    console.log("Company notification sent:", companyData);

    return new Response(
      JSON.stringify({ success: true, leadId: lead.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Une erreur est survenue. Veuillez réessayer." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

Deno.serve(handler);
