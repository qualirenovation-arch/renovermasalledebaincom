import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuoteRequest {
  id: string;
  created_at: string;
  client_first_name: string;
  client_last_name: string;
  client_email: string;
  client_phone: string | null;
  type_devis: string;
  status: string;
  priority: string;
  property_type: string | null;
  property_surface: string | null;
  property_city: string | null;
  water_damage_nature: string | null;
}

function escapeHtml(unsafe: string): string {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris",
  });
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    nouveau: "🆕 Nouveau",
    contacte: "📞 Contacté",
    visite_planifiee: "📅 Visite planifiée",
    devis_envoye: "📄 Devis envoyé",
    signe: "✅ Signé",
    refuse: "❌ Refusé",
    archive: "📦 Archivé",
  };
  return labels[status] || status;
}

function getPriorityBadge(priority: string): string {
  const badges: Record<string, string> = {
    haute: '<span style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:4px;font-size:12px;">🔴 Haute</span>',
    normale: '<span style="background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:4px;font-size:12px;">🟡 Normale</span>',
    basse: '<span style="background:#d1fae5;color:#065f46;padding:2px 8px;border-radius:4px;font-size:12px;">🟢 Basse</span>',
  };
  return badges[priority] || priority;
}

function getTypeBadge(type: string): string {
  if (type === "degat_des_eaux") {
    return '<span style="background:#dbeafe;color:#1e40af;padding:2px 8px;border-radius:4px;font-size:12px;">💧 Dégât des eaux</span>';
  }
  return '<span style="background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:4px;font-size:12px;">🏠 Rénovation</span>';
}

function generateQuoteRow(quote: QuoteRequest): string {
  return `
    <tr style="border-bottom:1px solid #e5e7eb;">
      <td style="padding:12px 8px;font-size:14px;">
        ${escapeHtml(quote.client_first_name)} ${escapeHtml(quote.client_last_name)}<br>
        <span style="color:#6b7280;font-size:12px;">${escapeHtml(quote.client_email)}</span>
        ${quote.client_phone ? `<br><span style="color:#6b7280;font-size:12px;">📱 ${escapeHtml(quote.client_phone)}</span>` : ""}
      </td>
      <td style="padding:12px 8px;">${getTypeBadge(quote.type_devis)}</td>
      <td style="padding:12px 8px;font-size:13px;">${getStatusLabel(quote.status)}</td>
      <td style="padding:12px 8px;">${getPriorityBadge(quote.priority)}</td>
      <td style="padding:12px 8px;font-size:12px;color:#6b7280;">
        ${quote.property_city ? escapeHtml(quote.property_city) : "-"}<br>
        ${quote.property_surface ? `${escapeHtml(quote.property_surface)} m²` : ""}
      </td>
      <td style="padding:12px 8px;font-size:12px;color:#6b7280;">${formatDate(quote.created_at)}</td>
    </tr>
  `;
}

function generateEmailHtml(
  quotes: QuoteRequest[],
  period: "daily" | "weekly",
  stats: { total: number; renovation: number; waterDamage: number; highPriority: number }
): string {
  const periodLabel = period === "daily" ? "des dernières 24h" : "de la semaine";
  const periodTitle = period === "daily" ? "Récapitulatif quotidien" : "Récapitulatif hebdomadaire";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Montserrat', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 900px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #124A66 0%, #0d3a52 100%); color: white; padding: 30px; text-align: center; }
        .logo-text { font-family: 'Nunito Sans', Arial, sans-serif; font-weight: 300; color: #ffffff; letter-spacing: 0.5px; white-space: nowrap; font-size: 18px; }
        .logo-text .accent { color: #A0845C; }
        .logo-sub { font-family: 'Nunito Sans', Arial, sans-serif; font-size: 9px; font-weight: 400; color: rgba(255,255,255,0.85); letter-spacing: 2.5px; padding-top: 2px; }
        .header h1 { margin: 10px 0 0; font-size: 24px; font-family: 'Nunito Sans', Arial, sans-serif; font-weight: 300; }
        @media only screen and (max-width: 480px) {
          .logo-text { font-size: 14px !important; }
          .logo-sub { font-size: 8px !important; letter-spacing: 1.5px !important; }
        }
        .content { padding: 30px; background: #f9f9f9; }
        .stats-grid { display: flex; gap: 15px; margin-bottom: 30px; flex-wrap: wrap; }
        .stat-card { background: white; padding: 20px; border-radius: 8px; flex: 1; min-width: 150px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .stat-number { font-size: 32px; font-weight: bold; color: #124A66; }
        .stat-label { font-size: 14px; color: #666; }
        .quotes-table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .quotes-table th { background: #f3f4f6; padding: 12px 8px; text-align: left; font-size: 13px; color: #374151; border-bottom: 2px solid #e5e7eb; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; background: #f0f0f0; }
        .no-quotes { background: white; padding: 40px; text-align: center; border-radius: 8px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
          <tr><td align="center" style="padding-bottom:6px;"><img src="https://wacqnrxbszvznfqiiuxm.supabase.co/storage/v1/object/public/email-assets/logo-renover-neg.svg" alt="RenoverMaSalleDeBain.com" width="180" style="width:180px;height:auto;" /></td></tr>
          <tr><td align="center" class="logo-sub">Une expertise QUALIRÉNOVATION</td></tr>
        </table>
        <h1>🛁 ${periodTitle}</h1>
        <p style="margin:10px 0 0 0;opacity:0.9;">Demandes de devis ${periodLabel}</p>
      </div>
      <div class="content">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">${stats.total}</div>
            <div class="stat-label">Total demandes</div>
          </div>
          <div class="stat-card">
            <div class="stat-number" style="color:#d97706;">${stats.renovation}</div>
            <div class="stat-label">🏠 Rénovations</div>
          </div>
          <div class="stat-card">
            <div class="stat-number" style="color:#2563eb;">${stats.waterDamage}</div>
            <div class="stat-label">💧 Dégâts des eaux</div>
          </div>
          <div class="stat-card">
            <div class="stat-number" style="color:#dc2626;">${stats.highPriority}</div>
            <div class="stat-label">🔴 Priorité haute</div>
          </div>
        </div>

        ${quotes.length > 0 ? `
          <table class="quotes-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Type</th>
                <th>Statut</th>
                <th>Priorité</th>
                <th>Lieu</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${quotes.map(generateQuoteRow).join("")}
            </tbody>
          </table>
        ` : `
          <div class="no-quotes">
            <p style="font-size:18px;margin:0;">✨ Aucune nouvelle demande ${periodLabel}</p>
          </div>
        `}
      </div>
      <div class="footer">
        <p><strong>Rénover Ma Salle de Bain</strong></p>
        <p>Ce récapitulatif est généré automatiquement.</p>
        <p>📧 gestion@renovermasalledebain.com</p>
      </div>
    </body>
    </html>
  `;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { period = "daily" } = await req.json().catch(() => ({}));
    
    if (!["daily", "weekly"].includes(period)) {
      return new Response(
        JSON.stringify({ error: "Invalid period. Use 'daily' or 'weekly'" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Generating ${period} digest email...`);

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Calculate date range based on period
    const now = new Date();
    let startDate: Date;
    
    if (period === "daily") {
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    } else {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Fetch quote requests for the period
    const { data: quotes, error: quotesError } = await supabase
      .from("quote_requests")
      .select("id, created_at, client_first_name, client_last_name, client_email, client_phone, type_devis, status, priority, property_type, property_surface, property_city, water_damage_nature")
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: false });

    if (quotesError) {
      console.error("Error fetching quotes:", quotesError);
      throw new Error("Failed to fetch quote requests");
    }

    const quotesList = quotes || [];
    
    // Calculate statistics
    const stats = {
      total: quotesList.length,
      renovation: quotesList.filter(q => q.type_devis === "classique").length,
      waterDamage: quotesList.filter(q => q.type_devis === "degat_des_eaux").length,
      highPriority: quotesList.filter(q => q.priority === "haute").length,
    };

    console.log(`Found ${stats.total} quotes for ${period} digest`);

    // Generate and send email
    const subject = period === "daily"
      ? `📊 Récapitulatif quotidien – ${stats.total} demande${stats.total > 1 ? "s" : ""} de devis`
      : `📊 Récapitulatif hebdomadaire – ${stats.total} demande${stats.total > 1 ? "s" : ""} de devis`;

    const html = generateEmailHtml(quotesList, period, stats);

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Rénover Ma Salle de Bain <gestion@renovermasalledebain.com>",
        to: ["gestion@renovermasalledebain.com"],
        subject,
        html,
      }),
    });

    const emailData = await emailResponse.json();
    console.log(`${period} digest email sent:`, emailData);

    return new Response(
      JSON.stringify({
        success: true,
        period,
        quotesCount: stats.total,
        emailId: emailData.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in send-digest-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

Deno.serve(handler);
