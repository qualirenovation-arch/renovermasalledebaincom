import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const HCAPTCHA_SECRET_KEY = Deno.env.get("HCAPTCHA_SECRET_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PartnerConfirmationRequest {
  partnerEmail: string;
  partnerName: string;
  companyName: string;
  trades: string[];
  zones: string[];
  captchaToken: string;
}

const tradeLabels: Record<string, string> = {
  carreleur: "Carreleur",
  peintre: "Peintre",
  chapiste: "Chapiste",
  menuisier: "Menuisier",
  platrier: "Plâtrerie / cloisons",
  tce: "Entreprise tous corps d'état",
  autre: "Autre",
};

const zoneLabels: Record<string, string> = {
  paris: "Paris",
  "petite-couronne": "Petite couronne (92, 93, 94)",
  "grande-couronne": "Grande couronne (77, 78, 91, 95)",
  autre: "Autre",
};

async function verifyCaptcha(token: string): Promise<boolean> {
  if (!HCAPTCHA_SECRET_KEY) {
    console.log("hCaptcha secret key not configured, skipping verification");
    return true;
  }

  try {
    const response = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `response=${token}&secret=${HCAPTCHA_SECRET_KEY}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("hCaptcha verification error:", error);
    return false;
  }
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { partnerEmail, partnerName, companyName, trades, zones, captchaToken }: PartnerConfirmationRequest = await req.json();

    // Verify captcha
    if (captchaToken) {
      const isValidCaptcha = await verifyCaptcha(captchaToken);
      if (!isValidCaptcha) {
        return new Response(
          JSON.stringify({ error: "Vérification anti-spam échouée" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Configuration email manquante" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const tradesFormatted = trades.map(t => tradeLabels[t] || t).join(", ");
    const zonesFormatted = zones.map(z => zoneLabels[z] || z).join(", ");

    // Email 1: Confirmation to partner
    const partnerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #d4a574; }
            .content { padding: 30px 0; }
            .footer { padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
            .highlight { background-color: #f8f5f0; padding: 15px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="color: #1a1a1a; margin: 0;">QualiRénovation</h1>
              <p style="color: #666; margin: 5px 0 0;">by QualiConcept</p>
            </div>
            <div class="content">
              <p>Bonjour,</p>
              <p>Nous vous remercions pour votre candidature en tant que partenaire sous-traitant auprès de <strong>QualiRénovation by QualiConcept</strong>.</p>
              <p>Votre dossier a bien été reçu et sera étudié par notre équipe.<br>
              Si votre profil correspond à nos besoins, nous vous recontacterons pour un premier échange.</p>
              <div class="highlight">
                <p style="margin: 0;"><strong>📌 Important :</strong> Aucune intervention ne pourra être programmée sans validation complète du dossier.</p>
              </div>
              <p>À très bientôt,</p>
            </div>
            <div class="footer">
              <p><strong>Carina Nahmani</strong><br>
              Maître d'œuvre<br>
              QualiRénovation by QualiConcept</p>
              <p>📧 gestion@qualiconcept.fr<br>
              📞 06 59 76 46 85</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email 2: Internal notification
    const internalEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1a1a1a; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f8f8f8; }
            .info-box { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .label { font-weight: bold; color: #666; }
            .check { color: #22c55e; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">🔔 Nouvelle candidature partenaire</h2>
              <p style="margin: 5px 0 0; opacity: 0.8;">Sous-traitance</p>
            </div>
            <div class="content">
              <p>Une nouvelle candidature partenaire vient d'être déposée.</p>
              
              <div class="info-box">
                <p><span class="label">Entreprise :</span> ${companyName}</p>
                <p><span class="label">Contact :</span> ${partnerName}</p>
                <p><span class="label">Email :</span> ${partnerEmail}</p>
                <p><span class="label">Métier(s) :</span> ${tradesFormatted}</p>
                <p><span class="label">Zone(s) :</span> ${zonesFormatted}</p>
              </div>
              
              <div class="info-box">
                <p style="margin: 0 0 10px; font-weight: bold;">Documents reçus :</p>
                <p class="check">✔ Kbis</p>
                <p class="check">✔ URSSAF</p>
                <p class="check">✔ RC Pro</p>
                <p class="check">✔ Décennale</p>
                <p class="check">✔ RIB</p>
                <p class="check">✔ Photos réalisations</p>
              </div>
              
              <p style="text-align: center; margin-top: 20px;">
                <strong>👉 Consulter le dossier complet dans l'interface admin.</strong>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send partner confirmation email
    const partnerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "QualiRénovation <gestion@qualiconcept.fr>",
        to: [partnerEmail],
        subject: "Candidature partenaire – Dossier bien reçu",
        html: partnerEmailHtml,
      }),
    });

    if (!partnerResponse.ok) {
      const errorText = await partnerResponse.text();
      console.error("Failed to send partner email:", errorText);
    }

    // Send internal notification email
    const internalResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "QualiRénovation <gestion@qualiconcept.fr>",
        to: ["gestion@qualiconcept.fr"],
        subject: `Nouvelle candidature partenaire – ${companyName}`,
        html: internalEmailHtml,
      }),
    });

    if (!internalResponse.ok) {
      const errorText = await internalResponse.text();
      console.error("Failed to send internal email:", errorText);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails envoyés avec succès" 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error in send-partner-confirmation:", error);
    return new Response(
      JSON.stringify({ error: "Erreur lors de l'envoi des emails" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
