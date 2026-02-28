import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Rate limiting for token lookups - stricter than other endpoints
const RATE_LIMIT_MAX_REQUESTS = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function escapeHtml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function maskEmail(email: string): string {
  if (!email) return '';
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  return `${local[0]}***@${domain}`;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

  // Get client IP for rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const endpoint = "handle-callback-request";

  try {
    // Rate limiting for token lookups
    const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const { count } = await supabase
      .from('rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ip)
      .eq('endpoint', endpoint)
      .gte('created_at', oneHourAgo);

    if ((count || 0) >= RATE_LIMIT_MAX_REQUESTS) {
      console.log("Rate limit exceeded for token lookup endpoint");
      return new Response(
        JSON.stringify({ error: "Trop de demandes. Veuillez réessayer dans une heure." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Record rate limit hit
    await supabase.from('rate_limits').insert({ ip_address: ip, endpoint });

    const { token } = await req.json();

    if (!token || typeof token !== 'string' || token.length < 10) {
      return new Response(JSON.stringify({ error: "Token invalide" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Find the lead by token
    const { data: lead, error: findError } = await supabase
      .from('quote_requests')
      .select('id, client_first_name, client_last_name, client_email, client_phone, property_postal_code')
      .eq('access_token', token)
      .maybeSingle();

    if (findError || !lead) {
      console.log("Token lookup: not found");
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

    console.log("Callback requested for lead:", lead.id);

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
  body { font-family: 'Montserrat', Arial, sans-serif; line-height: 1.6; color: #333; }
  .header { background: linear-gradient(135deg, #124A66 0%, #0d3a52 100%); color: white; padding: 24px 16px; text-align: center; }
  .logo-text { font-family: 'Nunito Sans', Arial, sans-serif; font-weight: 300; color: #ffffff; letter-spacing: 0.5px; white-space: nowrap; font-size: 18px; }
  .logo-text .accent { color: #A0845C; }
  .logo-sub { font-family: 'Nunito Sans', Arial, sans-serif; font-size: 9px; font-weight: 400; color: rgba(255,255,255,0.85); letter-spacing: 2.5px; padding-top: 2px; }
  .content { padding: 20px; }
  .info-box { background: #f5f5f5; padding: 15px; border-radius: 6px; margin: 15px 0; }
</style></head>
<body>
  <div class="header">
    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
      <tr><td align="center" style="padding-bottom:6px;"><img src="https://wacqnrxbszvznfqiiuxm.supabase.co/storage/v1/object/public/email-assets/logo-renover.png" alt="RenoverMaSalleDeBain.com" width="180" style="width:180px;height:auto;" /></td></tr>
      <tr><td align="center" class="logo-sub">Une expertise QUALIRÉNOVATION</td></tr>
    </table>
    <h2 style="margin:10px 0 0;">📞 Demande de rappel</h2>
  </div>
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

    console.log("Callback notification sent for lead:", lead.id);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in handle-callback-request:", error.message || error);
    return new Response(
      JSON.stringify({ error: "Une erreur est survenue." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

Deno.serve(handler);