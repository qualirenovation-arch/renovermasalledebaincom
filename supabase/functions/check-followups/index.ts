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
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const CRON_SECRET = Deno.env.get("CRON_SECRET");

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Validate cron secret to prevent unauthorized invocations
  const authHeader = req.headers.get("Authorization");
  if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

  try {
    const now = new Date().toISOString();

    // Fetch due quote follow-ups
    const { data: dueQuotes, error: quotesError } = await supabase
      .from("quote_requests")
      .select("id, client_first_name, client_last_name, client_email, client_phone, type_devis, status, priority, next_followup_at, created_at")
      .lte("next_followup_at", now)
      .not("status", "in", '("accepte","refuse","archive")')
      .order("next_followup_at", { ascending: true });

    if (quotesError) {
      console.error("Error fetching due quotes:", quotesError);
    }

    // Fetch due partner follow-ups
    const { data: duePartners, error: partnersError } = await supabase
      .from("partner_contacts")
      .select("id, company_name, contact_first_name, contact_last_name, email, phone, partner_family, status, priority, next_followup_at, created_at")
      .lte("next_followup_at", now)
      .not("status", "in", '("partenaire_ok","refuse","archive")')
      .order("next_followup_at", { ascending: true });

    if (partnersError) {
      console.error("Error fetching due partners:", partnersError);
    }

    const totalDueQuotes = dueQuotes?.length || 0;
    const totalDuePartners = duePartners?.length || 0;
    const totalDue = totalDueQuotes + totalDuePartners;

    if (totalDue === 0) {
      console.log("No follow-ups due today.");
      return new Response(
        JSON.stringify({ success: true, message: "Aucune relance à effectuer", total: 0 }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Found ${totalDueQuotes} quote follow-ups and ${totalDuePartners} partner follow-ups due.`);

    // Build quote rows
    const quoteRows = (dueQuotes || []).map((q: any) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #e5e5e5;">
          <span style="background:#f59e0b20;color:#b45309;padding:2px 8px;border-radius:4px;font-size:12px;">
            ${q.type_devis === "degat_des_eaux" ? "💧 Dégât eaux" : "🏠 Rénovation"}
          </span>
        </td>
        <td style="padding:8px;border-bottom:1px solid #e5e5e5;">${escapeHtml(q.client_first_name)} ${escapeHtml(q.client_last_name)}</td>
        <td style="padding:8px;border-bottom:1px solid #e5e5e5;"><a href="mailto:${escapeHtml(q.client_email)}">${escapeHtml(q.client_email)}</a></td>
        <td style="padding:8px;border-bottom:1px solid #e5e5e5;">${escapeHtml(q.client_phone || "—")}</td>
        <td style="padding:8px;border-bottom:1px solid #e5e5e5;">
          <span style="background:${q.priority === "haute" || q.priority === "urgente" ? "#ef444420" : "#e5e5e5"};color:${q.priority === "haute" || q.priority === "urgente" ? "#dc2626" : "#666"};padding:2px 8px;border-radius:4px;font-size:12px;">
            ${escapeHtml(q.priority)}
          </span>
        </td>
      </tr>
    `).join("");

    // Build partner rows
    const familyLabels: Record<string, string> = {
      sub_traitant: "🔧 Sous-traitant",
      installateur: "⚙️ Installateur",
      marque_site: "🏷️ Marque/Site",
    };

    const partnerRows = (duePartners || []).map((p: any) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #e5e5e5;">
          <span style="background:#3b82f620;color:#2563eb;padding:2px 8px;border-radius:4px;font-size:12px;">
            ${familyLabels[p.partner_family] || p.partner_family}
          </span>
        </td>
        <td style="padding:8px;border-bottom:1px solid #e5e5e5;">${escapeHtml(p.company_name)}</td>
        <td style="padding:8px;border-bottom:1px solid #e5e5e5;"><a href="mailto:${escapeHtml(p.email)}">${escapeHtml(p.email)}</a></td>
        <td style="padding:8px;border-bottom:1px solid #e5e5e5;">${escapeHtml(p.phone || "—")}</td>
        <td style="padding:8px;border-bottom:1px solid #e5e5e5;">
          <span style="background:${p.priority === "haute" ? "#ef444420" : "#e5e5e5"};color:${p.priority === "haute" ? "#dc2626" : "#666"};padding:2px 8px;border-radius:4px;font-size:12px;">
            ${escapeHtml(p.priority)}
          </span>
        </td>
      </tr>
    `).join("");

    // Send notification email
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "RMSDB Relances <gestion@renovermasalledebain.com>",
        to: ["gestion@renovermasalledebain.com"],
        subject: `🔔 ${totalDue} relance${totalDue > 1 ? "s" : ""} à effectuer aujourd'hui`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"></head>
          <body style="font-family:'Montserrat',Arial,sans-serif;color:#333;max-width:700px;margin:0 auto;">
            <div style="background:linear-gradient(135deg, #124A66 0%, #0d3a52 100%);color:white;padding:24px 16px;text-align:center;">
              <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
                <tr><td align="center" style="padding-bottom:6px;"><img src="https://wacqnrxbszvznfqiiuxm.supabase.co/storage/v1/object/public/email-assets/logo-renover-neg.svg" alt="RenoverMaSalleDeBain.com" width="180" style="width:180px;height:auto;" /></td></tr>
                <tr><td align="center" style="font-family:'Nunito Sans',Arial,sans-serif;font-size:9px;font-weight:400;color:rgba(255,255,255,0.85);letter-spacing:2.5px;padding-top:2px;">Une expertise QUALIRÉNOVATION</td></tr>
              </table>
              <h2 style="margin:10px 0 0;">🔔 Relances du jour</h2>
              <p style="margin:5px 0 0;opacity:0.9;">${new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "Europe/Paris" })}</p>
            </div>
            
            <div style="padding:20px;">
              <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:15px;border-radius:4px;margin-bottom:20px;">
                <strong>${totalDue} lead${totalDue > 1 ? "s" : ""}</strong> à relancer aujourd'hui :
                ${totalDueQuotes > 0 ? `<br>• ${totalDueQuotes} demande${totalDueQuotes > 1 ? "s" : ""} de devis` : ""}
                ${totalDuePartners > 0 ? `<br>• ${totalDuePartners} contact${totalDuePartners > 1 ? "s" : ""} partenaire${totalDuePartners > 1 ? "s" : ""}` : ""}
              </div>

              ${totalDueQuotes > 0 ? `
              <h3 style="color:#124A66;">📋 Devis à relancer (${totalDueQuotes})</h3>
              <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
                <tr style="background:#f5f5f5;">
                  <th style="padding:8px;text-align:left;">Type</th>
                  <th style="padding:8px;text-align:left;">Client</th>
                  <th style="padding:8px;text-align:left;">Email</th>
                  <th style="padding:8px;text-align:left;">Tél</th>
                  <th style="padding:8px;text-align:left;">Priorité</th>
                </tr>
                ${quoteRows}
              </table>
              ` : ""}

              ${totalDuePartners > 0 ? `
              <h3 style="color:#124A66;">🤝 Partenaires à relancer (${totalDuePartners})</h3>
              <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
                <tr style="background:#f5f5f5;">
                  <th style="padding:8px;text-align:left;">Type</th>
                  <th style="padding:8px;text-align:left;">Entreprise</th>
                  <th style="padding:8px;text-align:left;">Email</th>
                  <th style="padding:8px;text-align:left;">Tél</th>
                  <th style="padding:8px;text-align:left;">Priorité</th>
                </tr>
                ${partnerRows}
              </table>
              ` : ""}

              <div style="text-align:center;margin-top:20px;">
                <a href="https://renovermasalledebaincom.lovable.app/admin" style="display:inline-block;background:#124A66;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;">
                  Ouvrir le tableau de bord
                </a>
              </div>
            </div>

            <div style="padding:15px;text-align:center;font-size:12px;color:#666;background:#f0f0f0;">
              <p>Rénover Ma Salle de Bain — Système de relance automatique</p>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const emailData = await emailResponse.json();
    console.log("Follow-up notification email sent:", emailData);

    return new Response(
      JSON.stringify({
        success: true,
        totalDue,
        dueQuotes: totalDueQuotes,
        duePartners: totalDuePartners,
        emailId: emailData.id,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in check-followups:", error);
    return new Response(
      JSON.stringify({ error: "Erreur lors de la vérification des relances" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

Deno.serve(handler);
