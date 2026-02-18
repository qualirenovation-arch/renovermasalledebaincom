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

interface DevisRequest {
  clientEmail: string;
  clientFirstName: string;
  clientLastName: string;
  clientPhone: string;
  captchaToken: string;
  projectDetails: {
    logement: string;
    adresse: string;
    ville: string;
    codePostal: string;
    etage: string;
    ascenseur: string;
    surface: string;
    typeInstallation: string;
    typeDouche: string;
    typePommeau: string;
    typeReceveur: string[];
    typeBaignoire: string[];
    robinetterieBaignoire: string;
    wcType: string[];
    meubleVasque: string[];
    porteDouche: string[];
    machineLaver: string;
    emplacementMachine: string[];
    typeMachine: string[];
    robinetterieMLaver: string;
    robinetterie: string[];
    carrelage: string[];
    message: string;
  };
}

// HTML escape function to prevent injection
function escapeHtml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Rate limiting function
async function checkRateLimit(supabase: any, ip: string, endpoint: string): Promise<{ allowed: boolean; remaining: number }> {
  const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  
  // Count recent requests from this IP
  const { count, error } = await supabase
    .from('rate_limits')
    .select('*', { count: 'exact', head: true })
    .eq('ip_address', ip)
    .eq('endpoint', endpoint)
    .gte('created_at', oneHourAgo);

  if (error) {
    console.error("Rate limit check error:", error);
    // Allow request on error to avoid blocking legitimate users
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS };
  }

  const requestCount = count || 0;
  const remaining = Math.max(0, RATE_LIMIT_MAX_REQUESTS - requestCount);
  
  return { allowed: requestCount < RATE_LIMIT_MAX_REQUESTS, remaining };
}

// Record a request for rate limiting
async function recordRequest(supabase: any, ip: string, endpoint: string): Promise<void> {
  const { error } = await supabase
    .from('rate_limits')
    .insert({ ip_address: ip, endpoint });

  if (error) {
    console.error("Failed to record rate limit:", error);
  }
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Initialize Supabase client with service role for rate limiting
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

  // Get client IP for rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
             req.headers.get("x-real-ip") || 
             "unknown";
  const endpoint = "send-devis-confirmation";

  try {
    // Check rate limit
    const { allowed, remaining } = await checkRateLimit(supabase, ip, endpoint);
    
    if (!allowed) {
      console.log("Rate limit exceeded for send-devis-confirmation endpoint");
      return new Response(
        JSON.stringify({ error: "Trop de demandes. Veuillez réessayer dans une heure." }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "X-RateLimit-Remaining": "0",
            "Retry-After": "3600"
          } 
        }
      );
    }

    const requestData: DevisRequest & { leadId?: string; photoUrls?: string[]; isWaterDamageStep2?: boolean; waterDamageStep2?: { requiredWorks: string[]; requiredWorksOther: string; renovationScope: string; message: string; documentPaths: string[] } } = await req.json();
    const { clientEmail, clientFirstName, clientLastName, clientPhone, captchaToken, projectDetails, leadId, photoUrls, isWaterDamageStep2, waterDamageStep2 } = requestData;
    const clientName = `${clientFirstName} ${clientLastName}`.trim();

    const maskEmail = (e: string) => { const [l, d] = e.split('@'); return d ? `${l[0]}***@${d}` : '***'; };
    console.log("Processing devis request for:", maskEmail(clientEmail));

    // Validate required fields
    if (!clientEmail || !clientFirstName) {
      throw new Error("Email et nom du client requis");
    }

    // Validate captcha token
    if (!captchaToken) {
      console.error("Missing captcha token");
      return new Response(
        JSON.stringify({ error: "Vérification anti-spam requise" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Verify hCaptcha token server-side (bypass for test-token in dev)
    if (captchaToken !== "test-token") {
      console.log("Verifying hCaptcha token...");
      const captchaResponse = await fetch("https://hcaptcha.com/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `response=${captchaToken}&secret=${HCAPTCHA_SECRET_KEY}`,
      });

      const captchaData = await captchaResponse.json();
      console.log("hCaptcha verification result:", captchaData.success);

      if (!captchaData.success) {
        console.error("hCaptcha verification failed:", captchaData);
        return new Response(
          JSON.stringify({ error: "Vérification anti-spam échouée. Veuillez réessayer." }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
    } else {
      console.log("Test token detected, skipping hCaptcha verification");
    }

    // Server-side input validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
      throw new Error("Format d'email invalide");
    }

    if (clientName.length > 200) {
      throw new Error("Nom trop long");
    }

    if (projectDetails.message && projectDetails.message.length > 5000) {
      throw new Error("Message trop long");
    }

    // Record this request for rate limiting (after validation passes)
    await recordRequest(supabase, ip, endpoint);

    let insertedData: any;

    if (isWaterDamageStep2 && leadId && waterDamageStep2) {
      // Water damage Step 2: Update existing lead with steps 4-7
      const { data: updatedData, error: updateError } = await supabase
        .from('quote_requests')
        .update({
          water_damage_works: waterDamageStep2.requiredWorks || [],
          water_damage_works_other: waterDamageStep2.requiredWorksOther || null,
          water_damage_scope: waterDamageStep2.renovationScope || null,
          water_damage_documents: waterDamageStep2.documentPaths || [],
          message: waterDamageStep2.message || null,
          lead_status: 'qualifie',
          step2_completed_at: new Date().toISOString(),
        })
        .eq('id', leadId)
        .select()
        .single();
      
      if (updateError) {
        console.error("Database update error:", updateError);
      } else {
        insertedData = updatedData;
        console.log("Water damage step 2 completed:", insertedData.id);
      }
    } else if (leadId) {
      // Step 2: Update existing lead
      const { data: updatedData, error: updateError } = await supabase
        .from('quote_requests')
        .update({
          client_first_name: clientFirstName,
          client_last_name: clientLastName || '',
          client_email: clientEmail,
          client_phone: clientPhone || null,
          property_type: projectDetails.logement || null,
          property_address: projectDetails.adresse || null,
          property_city: projectDetails.ville || null,
          property_postal_code: projectDetails.codePostal || null,
          property_floor: projectDetails.etage || null,
          property_elevator: projectDetails.ascenseur || null,
          property_surface: projectDetails.surface || null,
          renovation_type_installation: projectDetails.typeInstallation || null,
          renovation_type_douche: projectDetails.typeDouche || null,
          renovation_type_pommeau: projectDetails.typePommeau || null,
          renovation_type_receveur: projectDetails.typeReceveur || null,
          renovation_type_baignoire: projectDetails.typeBaignoire || null,
          renovation_robinetterie_baignoire: projectDetails.robinetterieBaignoire || null,
          renovation_wc_type: projectDetails.wcType || null,
          renovation_meuble_vasque: projectDetails.meubleVasque || null,
          renovation_porte_douche: projectDetails.porteDouche || null,
          renovation_machine_laver: projectDetails.machineLaver || null,
          renovation_emplacement_machine: projectDetails.emplacementMachine || null,
          renovation_type_machine: projectDetails.typeMachine || null,
          renovation_robinetterie_mlaver: projectDetails.robinetterieMLaver || null,
          renovation_finitions_robinetterie: projectDetails.robinetterie || null,
          renovation_style_carrelage: projectDetails.carrelage || null,
          message: projectDetails.message || null,
          lead_status: 'qualifie',
          step2_completed_at: new Date().toISOString(),
          photo_urls: photoUrls || [],
        })
        .eq('id', leadId)
        .select()
        .single();
      
      if (updateError) {
        console.error("Database update error:", updateError);
      } else {
        insertedData = updatedData;
        console.log("Quote request updated:", insertedData.id);
      }
    } else {
      // New submission (direct access without Step 1)
      const { data: newData, error: insertError } = await supabase
        .from('quote_requests')
        .insert({
          type_devis: 'classique',
          client_first_name: clientFirstName,
          client_last_name: clientLastName || '',
          client_email: clientEmail,
          client_phone: clientPhone || null,
          property_type: projectDetails.logement || null,
          property_address: projectDetails.adresse || null,
          property_city: projectDetails.ville || null,
          property_postal_code: projectDetails.codePostal || null,
          property_floor: projectDetails.etage || null,
          property_elevator: projectDetails.ascenseur || null,
          property_surface: projectDetails.surface || null,
          renovation_type_installation: projectDetails.typeInstallation || null,
          renovation_type_douche: projectDetails.typeDouche || null,
          renovation_type_pommeau: projectDetails.typePommeau || null,
          renovation_type_receveur: projectDetails.typeReceveur || null,
          renovation_type_baignoire: projectDetails.typeBaignoire || null,
          renovation_robinetterie_baignoire: projectDetails.robinetterieBaignoire || null,
          renovation_wc_type: projectDetails.wcType || null,
          renovation_meuble_vasque: projectDetails.meubleVasque || null,
          renovation_porte_douche: projectDetails.porteDouche || null,
          renovation_machine_laver: projectDetails.machineLaver || null,
          renovation_emplacement_machine: projectDetails.emplacementMachine || null,
          renovation_type_machine: projectDetails.typeMachine || null,
          renovation_robinetterie_mlaver: projectDetails.robinetterieMLaver || null,
          renovation_finitions_robinetterie: projectDetails.robinetterie || null,
          renovation_style_carrelage: projectDetails.carrelage || null,
          message: projectDetails.message || null,
          status: 'nouveau',
          priority: 'normale',
          source: 'website',
          lead_status: 'qualifie',
        })
        .select()
        .single();

      if (insertError) {
        console.error("Database insert error:", insertError);
      } else {
        insertedData = newData;
        console.log("Quote request saved:", insertedData.id);
      }
    }

    // Escape all user inputs for HTML safety
    const safeClientName = escapeHtml(clientName);
    const safeClientEmail = escapeHtml(clientEmail);
    const safeClientPhone = escapeHtml(clientPhone || "");
    const safeLogement = escapeHtml(projectDetails.logement || "");
    const safeAdresse = escapeHtml(projectDetails.adresse || "");
    const safeVille = escapeHtml(projectDetails.ville || "");
    const safeCodePostal = escapeHtml(projectDetails.codePostal || "");
    const safeSurface = escapeHtml(projectDetails.surface || "");
    const safeMessage = escapeHtml(projectDetails.message || "");

    // Format project details for email
    const formatArray = (arr: string[]) => {
      if (!arr || arr.length === 0) return "Non spécifié";
      return arr.map(item => escapeHtml(item)).join(", ");
    };

    console.log("Sending confirmation email to:", maskEmail(clientEmail));

    // Send confirmation email to client using Resend API directly
    const clientEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Rénover Ma Salle de Bain <gestion@renovermasalledebain.com>",
        to: [clientEmail],
        subject: "Confirmation de votre demande de devis - Rénover Ma Salle de Bain",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
              .header { background: linear-gradient(135deg, #124A66 0%, #0d3a52 100%); color: white; padding: 30px; text-align: center; }
              .header img { max-width: 300px; margin-bottom: 0; }
              .header h1 { margin: 0; font-size: 24px; }
              .content { padding: 30px; background: #f9f9f9; }
              .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #124A66; }
              .info-box h3 { margin-top: 0; color: #124A66; }
              .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; background: #f0f0f0; }
              .cta { display: inline-block; background: #124A66; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
              .detail-row { padding: 6px 0; border-bottom: 1px solid #f0f0f0; }
              .detail-row:last-child { border-bottom: none; }
              .detail-label { color: #666; font-size: 13px; }
              .detail-value { font-weight: 600; color: #333; }
            </style>
          </head>
          <body>
            <div class="header">
              <img src="https://wacqnrxbszvznfqiiuxm.supabase.co/storage/v1/object/public/email-assets/logo-rmsb-horizontal.png?v=1" alt="RenoverMaSalleDeBain.com" style="max-width:300px;" />
              <h1>Demande de devis confirmée</h1>
            </div>
            <div class="content">
              <p>Bonjour <strong>${safeClientName}</strong>,</p>
              <p>Merci pour votre confiance ! Nous avons bien enregistré votre demande de devis pour la rénovation de votre salle de bain.</p>
              
              <div class="info-box">
                <h3>📍 Votre projet</h3>
                ${safeAdresse || safeVille || safeCodePostal ? `
                <div class="detail-row">
                  <span class="detail-label">Adresse du projet</span><br>
                  <span class="detail-value">${[safeAdresse, safeCodePostal, safeVille].filter(Boolean).join(", ")}</span>
                </div>` : ""}
                <div class="detail-row">
                  <span class="detail-label">Type de logement</span><br>
                  <span class="detail-value">${safeLogement || "Non spécifié"}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Surface estimée</span><br>
                  <span class="detail-value">${safeSurface || "Non spécifiée"}</span>
                </div>
              </div>

              <div class="info-box">
                <h3>🛁 Équipements sélectionnés</h3>
                <div class="detail-row">
                  <span class="detail-label">Receveur / Baignoire</span><br>
                  <span class="detail-value">${formatArray(projectDetails.typeReceveur)}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">WC</span><br>
                  <span class="detail-value">${formatArray(projectDetails.wcType)}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Robinetterie</span><br>
                  <span class="detail-value">${formatArray(projectDetails.robinetterie)}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Carrelage</span><br>
                  <span class="detail-value">${formatArray(projectDetails.carrelage)}</span>
                </div>
                ${safeMessage ? `<div class="detail-row"><span class="detail-label">Votre message</span><br><span class="detail-value">${safeMessage}</span></div>` : ""}
              </div>

              <div class="info-box">
                <h3>📞 Et maintenant ?</h3>
                <p>Notre équipe va étudier votre demande et vous recontacter sous <strong>24 à 48 heures</strong> afin de convenir d'une <strong>visite gratuite sur site</strong>.</p>
                <p style="font-size: 13px; color: #666;">Vos coordonnées : ${safeClientEmail} ${safeClientPhone ? `· ${safeClientPhone}` : ""}</p>
              </div>

              <p>En attendant, découvrez nos dernières réalisations !</p>
              
              <center>
                <a href="https://renovermasalledebain.com/realisations" class="cta">Voir nos réalisations</a>
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
    console.log("Client email sent successfully");

    // Send notification email to the company
    const companyEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Site Web RMSDB <gestion@renovermasalledebain.com>",
        to: ["gestion@renovermasalledebain.com"],
        subject: `Nouvelle demande de devis - ${safeClientName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .header { background: #333; color: white; padding: 20px; }
              .content { padding: 20px; }
              .info-box { background: #f5f5f5; padding: 15px; border-radius: 6px; margin: 15px 0; }
              table { width: 100%; border-collapse: collapse; }
              td { padding: 8px; border-bottom: 1px solid #ddd; }
              td:first-child { font-weight: bold; width: 40%; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>🔔 Nouvelle demande de devis</h2>
            </div>
            <div class="content">
              <div class="info-box">
                <h3>👤 Informations client</h3>
                <table>
                  <tr><td>Nom</td><td>${safeClientName}</td></tr>
                  <tr><td>Email</td><td><a href="mailto:${safeClientEmail}">${safeClientEmail}</a></td></tr>
                  <tr><td>Téléphone</td><td>${safeClientPhone || "Non communiqué"}</td></tr>
                  ${safeAdresse || safeVille || safeCodePostal ? `<tr><td>Adresse du projet</td><td>${[safeAdresse, safeCodePostal, safeVille].filter(Boolean).join(", ")}</td></tr>` : ""}
                </table>
              </div>

              <div class="info-box">
                <h3>🛁 Détails du projet</h3>
                <table>
                  <tr><td>Logement</td><td>${safeLogement || "Non spécifié"}</td></tr>
                  <tr><td>Surface</td><td>${safeSurface || "Non spécifiée"}</td></tr>
                  <tr><td>Receveur/Baignoire</td><td>${formatArray(projectDetails.typeReceveur)}</td></tr>
                  <tr><td>Type de WC</td><td>${formatArray(projectDetails.wcType)}</td></tr>
                  <tr><td>Robinetterie</td><td>${formatArray(projectDetails.robinetterie)}</td></tr>
                  <tr><td>Style carrelage</td><td>${formatArray(projectDetails.carrelage)}</td></tr>
                </table>
                ${safeMessage ? `<p><strong>Message du client :</strong><br>${safeMessage}</p>` : ""}
              </div>

              <p><em>Demande reçue le ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</em></p>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const companyEmailData = await companyEmailResponse.json();
    console.log("Company notification sent successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        clientEmailId: clientEmailData.id,
        companyEmailId: companyEmailData.id
      }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders,
          "X-RateLimit-Remaining": String(remaining - 1)
        },
      }
    );
  } catch (error: any) {
    // Log detailed error server-side only for debugging
    console.error("Error in send-devis-confirmation function:", error);
    console.error("Stack trace:", error.stack);
    
    // Return generic error message to client - never expose internal details
    return new Response(
      JSON.stringify({ 
        error: "Une erreur est survenue lors du traitement de votre demande. Veuillez réessayer." 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

Deno.serve(handler);
