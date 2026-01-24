const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DevisRequest {
  clientEmail: string;
  clientName: string;
  clientPhone: string;
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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: DevisRequest = await req.json();
    const { clientEmail, clientName, clientPhone, projectDetails } = requestData;

    console.log("Sending confirmation email to:", clientEmail);

    // Validate required fields
    if (!clientEmail || !clientName) {
      throw new Error("Email et nom du client requis");
    }

    // Format project details for email
    const formatArray = (arr: string[]) => arr.length > 0 ? arr.join(", ") : "Non spécifié";

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
              <p>Bonjour <strong>${clientName}</strong>,</p>
              <p>Nous avons bien reçu votre demande de devis et nous vous en remercions !</p>
              
              <div class="info-box">
                <h3>📋 Récapitulatif de votre demande</h3>
                <p><strong>Type de logement :</strong> ${projectDetails.logement || "Non spécifié"}</p>
                <p><strong>Surface :</strong> ${projectDetails.surface || "Non spécifiée"}</p>
                <p><strong>Receveur/Baignoire :</strong> ${formatArray(projectDetails.typeReceveur)}</p>
                <p><strong>Type de WC :</strong> ${formatArray(projectDetails.wcType)}</p>
                <p><strong>Robinetterie :</strong> ${formatArray(projectDetails.robinetterie)}</p>
                <p><strong>Style carrelage :</strong> ${formatArray(projectDetails.carrelage)}</p>
                ${projectDetails.message ? `<p><strong>Message :</strong> ${projectDetails.message}</p>` : ""}
              </div>

              <div class="info-box">
                <h3>📞 Prochaines étapes</h3>
                <p>Un membre de notre équipe vous contactera dans les <strong>24 à 48 heures</strong> pour planifier une visite gratuite sur site et établir un devis personnalisé.</p>
                <p><strong>Vos coordonnées :</strong></p>
                <p>📧 ${clientEmail}<br>📱 ${clientPhone || "Non communiqué"}</p>
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
        subject: `Nouvelle demande de devis - ${clientName}`,
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
                  <tr><td>Nom</td><td>${clientName}</td></tr>
                  <tr><td>Email</td><td><a href="mailto:${clientEmail}">${clientEmail}</a></td></tr>
                  <tr><td>Téléphone</td><td>${clientPhone || "Non communiqué"}</td></tr>
                </table>
              </div>

              <div class="info-box">
                <h3>🛁 Détails du projet</h3>
                <table>
                  <tr><td>Logement</td><td>${projectDetails.logement || "Non spécifié"}</td></tr>
                  <tr><td>Surface</td><td>${projectDetails.surface || "Non spécifiée"}</td></tr>
                  <tr><td>Receveur/Baignoire</td><td>${formatArray(projectDetails.typeReceveur)}</td></tr>
                  <tr><td>Type de WC</td><td>${formatArray(projectDetails.wcType)}</td></tr>
                  <tr><td>Robinetterie</td><td>${formatArray(projectDetails.robinetterie)}</td></tr>
                  <tr><td>Style carrelage</td><td>${formatArray(projectDetails.carrelage)}</td></tr>
                </table>
                ${projectDetails.message ? `<p><strong>Message du client :</strong><br>${projectDetails.message}</p>` : ""}
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
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-devis-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

Deno.serve(handler);
