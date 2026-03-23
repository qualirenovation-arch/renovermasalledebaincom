import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function escapeHtml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
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

  try {
    // Verify admin auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Check admin role
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Accès refusé" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { leadId } = await req.json();
    if (!leadId) {
      return new Response(JSON.stringify({ error: "ID du lead requis" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Fetch lead
    const { data: lead, error: fetchError } = await supabase
      .from("quote_requests")
      .select("*")
      .eq("id", leadId)
      .single();

    if (fetchError || !lead) {
      return new Response(JSON.stringify({ error: "Lead non trouvé" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const safeProjectType = escapeHtml(projectTypeLabels[lead.project_type || ""] || lead.project_type || "Non spécifié");
    const safeAddress = [lead.property_address, lead.property_postal_code, lead.property_city].filter(Boolean).map(s => escapeHtml(s!)).join(", ");

    const siteBaseUrl = "https://renovermasalledebain.com";
    const step2Url = `${siteBaseUrl}/devis/completer?token=${lead.access_token}`;
    const callbackUrl = `${siteBaseUrl}/devis/rappel?token=${lead.access_token}`;
    const calUrl = "https://cal.com/votre-conseiller-travaux-siw706/30min?overlayCalendar=true";

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: "RenoverMaSalleDeBain.com <gestion@renovermasalledebain.com>",
        to: [lead.client_email],
        subject: "Votre projet – comment souhaitez-vous avancer ?",
        html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { font-family: 'Nunito Sans', Arial, sans-serif; font-weight: 300; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
  .header { background: linear-gradient(135deg, #124A66 0%, #0d3a52 100%); color: white; padding: 24px 16px; text-align: center; }
  .logo-sub { font-family: 'Nunito Sans', Arial, sans-serif; font-size: 9px; font-weight: 400; color: rgba(255,255,255,0.85); letter-spacing: 2.5px; padding-top: 2px; }
  .content { padding: 30px; background: #f9f9f9; }
  .option-box { background: white; padding: 20px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #124A66; }
  .option-box h3 { margin-top: 0; color: #124A66; font-size: 16px; }
  .cta { display: inline-block; background: #124A66; color: white !important; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 10px; font-weight: bold; }
  .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; background: #f0f0f0; }
</style></head>
<body>
  <div class="header">
    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
      <tr><td align="center" style="padding-bottom:6px;"><img src="https://wacqnrxbszvznfqiiuxm.supabase.co/storage/v1/object/public/email-assets/logo-renover-neg.svg" alt="RenoverMaSalleDeBain.com" width="180" style="width:180px;height:auto;" /></td></tr>
      <tr><td align="center" class="logo-sub">Une expertise QUALIRÉNOVATION</td></tr>
    </table>
  </div>
  <div class="content">
    <p>Bonjour <strong>${escapeHtml(lead.client_first_name)}</strong>,</p>
    <p>Merci pour votre demande concernant votre projet <strong>« ${safeProjectType} »</strong>${safeAddress ? ` à <strong>${safeAddress}</strong>` : ''}.</p>
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

    if (!emailResponse.ok) {
      const emailData = await emailResponse.json();
      console.error("Resend email failed:", emailData);
      return new Response(JSON.stringify({ error: "Échec de l'envoi de l'email" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Mark as sent
    await supabase.from("quote_requests").update({ email_confirmation_sent: true }).eq("id", leadId);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in resend-confirmation:", error);
    return new Response(
      JSON.stringify({ error: "Une erreur est survenue." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

Deno.serve(handler);
