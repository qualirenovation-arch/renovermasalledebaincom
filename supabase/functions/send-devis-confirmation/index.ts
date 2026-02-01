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
  clientName: string;
  clientPhone: string;
  captchaToken: string;
  projectDetails: {
    logement: string;
    surface: string;
    typeReceveur: string[];
    wcType: string[];
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
      console.log(`Rate limit exceeded for IP: ${ip}`);
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

    const requestData: DevisRequest = await req.json();
    const { clientEmail, clientName, clientPhone, captchaToken, projectDetails } = requestData;

    console.log("Processing devis request for:", clientEmail);

    // Validate required fields
    if (!clientEmail || !clientName) {
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

    // Verify hCaptcha token server-side
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

    // Escape all user inputs for HTML safety
    const safeClientName = escapeHtml(clientName);
    const safeClientEmail = escapeHtml(clientEmail);
    const safeClientPhone = escapeHtml(clientPhone || "");
    const safeLogement = escapeHtml(projectDetails.logement || "");
    const safeSurface = escapeHtml(projectDetails.surface || "");
    const safeMessage = escapeHtml(projectDetails.message || "");

    // Format project details for email
    const formatArray = (arr: string[]) => {
      if (!arr || arr.length === 0) return "Non spécifié";
      return arr.map(item => escapeHtml(item)).join(", ");
    };

    console.log("Sending confirmation email to:", clientEmail);

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
              .header { background: linear-gradient(135deg, #b8956c 0%, #8b7355 100%); color: white; padding: 30px; text-align: center; }
              .header h1 { margin: 0; font-size: 24px; }
              .content { padding: 30px; background: #f9f9f9; }
              .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #b8956c; }
              .info-box h3 { margin-top: 0; color: #b8956c; }
              .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; background: #f0f0f0; }
              .cta { display: inline-block; background: #b8956c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🛁 Rénover Ma Salle de Bain</h1>
            </div>
            <div class="content">
              <p>Bonjour <strong>${safeClientName}</strong>,</p>
              <p>Nous avons bien reçu votre demande de devis et nous vous en remercions !</p>
              
              <div class="info-box">
                <h3>📋 Récapitulatif de votre demande</h3>
                <p><strong>Type de logement :</strong> ${safeLogement || "Non spécifié"}</p>
                <p><strong>Surface :</strong> ${safeSurface || "Non spécifiée"}</p>
                <p><strong>Receveur/Baignoire :</strong> ${formatArray(projectDetails.typeReceveur)}</p>
                <p><strong>Type de WC :</strong> ${formatArray(projectDetails.wcType)}</p>
                <p><strong>Robinetterie :</strong> ${formatArray(projectDetails.robinetterie)}</p>
                <p><strong>Style carrelage :</strong> ${formatArray(projectDetails.carrelage)}</p>
                ${safeMessage ? `<p><strong>Message :</strong> ${safeMessage}</p>` : ""}
              </div>

              <div class="info-box">
                <h3>📞 Prochaines étapes</h3>
                <p>Un membre de notre équipe vous contactera dans les <strong>24 à 48 heures</strong> pour planifier une visite gratuite sur site et établir un devis personnalisé.</p>
                <p><strong>Vos coordonnées :</strong></p>
                <p>📧 ${safeClientEmail}<br>📱 ${safeClientPhone || "Non communiqué"}</p>
              </div>

              <p>En attendant, n'hésitez pas à consulter nos réalisations sur notre site !</p>
              
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
    console.log("Client email sent:", clientEmailData);

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
    console.log("Company notification email sent:", companyEmailData);

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
