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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

  try {
    const { token } = await req.json();

    if (!token || typeof token !== 'string' || token.length < 10) {
      return new Response(JSON.stringify({ error: "Token invalide" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Find the lead by token
    const { data: lead, error: findError } = await supabase
      .from('quote_requests')
      .select('*')
      .eq('access_token', token)
      .maybeSingle();

    if (findError || !lead) {
      return new Response(JSON.stringify({ error: "Demande non trouvée" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Update lead with callback request
    const { error: updateError } = await supabase
      .from('quote_requests')
      .update({
        callback_requested: true,
        callback_requested_at: new Date().toISOString(),
      })
      .eq('id', lead.id);

    if (updateError) {
      console.error("Update error:", updateError);
      throw updateError;
    }

    // Send notification to admin
    const safeName = escapeHtml(`${lead.client_first_name} ${lead.client_last_name}`);
    const safeEmail = escapeHtml(lead.client_email);
    const safePhone = escapeHtml(lead.client_phone || "Non communiqué");

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: "Site Web RMSDB <gestion@renovermasalledebain.com>",
        to: ["gestion@renovermasalledebain.com"],
        subject: `📞 Demande de rappel – ${safeName}`,
        html: `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
  .header { background: #e67e22; color: white; padding: 20px; }
  .content { padding: 20px; }
  .info-box { background: #f5f5f5; padding: 15px; border-radius: 6px; margin: 15px 0; }
</style></head>
<body>
  <div class="header"><h2>📞 Demande de rappel</h2></div>
  <div class="content">
    <p><strong>${safeName}</strong> souhaite être rappelé(e) pour discuter de son projet.</p>
    <div class="info-box">
      <p><strong>📧 Email :</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
      <p><strong>📱 Téléphone :</strong> ${safePhone}</p>
      <p><strong>📮 Code postal :</strong> ${escapeHtml(lead.property_postal_code || "Non communiqué")}</p>
    </div>
    <p><em>Demande reçue le ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</em></p>
  </div>
</body></html>`,
      }),
    });

    // Send WhatsApp notification via wa.me link (logged for admin reference)
    const whatsappMessage = `📞 Rappel demandé par ${lead.client_first_name} ${lead.client_last_name} - Tel: ${lead.client_phone || 'N/A'} - Email: ${lead.client_email}`;
    console.log("WhatsApp notification:", `https://wa.me/33659764685?text=${encodeURIComponent(whatsappMessage)}`);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Une erreur est survenue." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

Deno.serve(handler);
