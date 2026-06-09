import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const GUIDE_URL = "https://wacqnrxbszvznfqiiuxm.supabase.co/storage/v1/object/public/email-assets/guide-travaux-renover-ma-salle-de-bain.pdf";

function escapeHtml(s: string): string {
  if (!s) return "";
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const endpoint = "send-guide-download";

  try {
    const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const { count } = await supabase.from("rate_limits").select("*", { count: "exact", head: true })
      .eq("ip_address", ip).eq("endpoint", endpoint).gte("created_at", oneHourAgo);
    if ((count || 0) >= RATE_LIMIT_MAX) {
      return new Response(JSON.stringify({ error: "Trop de demandes. Veuillez réessayer dans une heure." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const body = await req.json();
    const firstName = (body.firstName || "").toString().trim().slice(0, 100);
    const lastName = (body.lastName || "").toString().trim().slice(0, 100);
    const email = (body.email || "").toString().trim().slice(0, 255);
    const phone = (body.phone || "").toString().trim().slice(0, 30);
    const city = (body.city || "").toString().trim().slice(0, 120);

    if (!firstName || !lastName || !email || !phone || !city) {
      return new Response(JSON.stringify({ error: "Tous les champs sont obligatoires." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Format d'email invalide." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    await supabase.from("rate_limits").insert({ ip_address: ip, endpoint });

    // DB FIRST
    const { data: lead, error: insertError } = await supabase.from("quote_requests").insert({
      type_devis: "guide_download",
      client_first_name: firstName,
      client_last_name: lastName,
      client_email: email,
      client_phone: phone,
      property_city: city,
      status: "nouveau",
      priority: "basse",
      source: "guide_download",
      lead_status: "guide_download",
      email_confirmation_sent: false,
    }).select().single();

    if (insertError) {
      console.error("DB insert error:", insertError);
      throw new Error("Failed to save lead");
    }

    // EMAIL (non-blocking)
    let emailSent = false;
    if (RESEND_API_KEY) {
      try {
        const safeFirst = escapeHtml(firstName);
        const safeName = escapeHtml(`${firstName} ${lastName}`);
        const safeEmail = escapeHtml(email);
        const safeCity = escapeHtml(city);
        const safePhone = escapeHtml(phone);

        // Fetch the PDF and encode it as base64 for attachment
        let pdfBase64: string | null = null;
        try {
          const pdfResp = await fetch(GUIDE_URL);
          if (pdfResp.ok) {
            const buf = new Uint8Array(await pdfResp.arrayBuffer());
            let binary = "";
            const chunk = 0x8000;
            for (let i = 0; i < buf.length; i += chunk) {
              binary += String.fromCharCode(...buf.subarray(i, i + chunk));
            }
            pdfBase64 = btoa(binary);
          } else {
            console.error("PDF fetch failed:", pdfResp.status);
          }
        } catch (e) {
          console.error("PDF fetch error (non-blocking):", e);
        }

        const clientResp = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
          body: JSON.stringify({
            from: "RenoverMaSalleDeBain.com <gestion@renovermasalledebain.com>",
            to: [email],
            subject: "Votre guide travaux salle de bain – à télécharger",
            attachments: pdfBase64 ? [{
              filename: "guide-travaux-renover-ma-salle-de-bain.pdf",
              content: pdfBase64,
              content_type: "application/pdf",
            }] : undefined,
            html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:'Nunito Sans',Arial,sans-serif;font-weight:300;line-height:1.6;color:#333;max-width:600px;margin:0 auto;">
  <div style="background:linear-gradient(135deg,#124A66 0%,#0d3a52 100%);color:#fff;padding:24px 16px;text-align:center;">
    <img src="https://wacqnrxbszvznfqiiuxm.supabase.co/storage/v1/object/public/email-assets/logo-renover-neg.svg" alt="RenoverMaSalleDeBain.com" width="180" style="width:180px;height:auto;" />
    <div style="font-size:9px;font-weight:400;color:rgba(255,255,255,0.85);letter-spacing:2.5px;padding-top:6px;">UNE EXPERTISE QUALIRÉNOVATION</div>
  </div>
  <div style="padding:30px;background:#f9f9f9;">
    <p>Bonjour <strong>${safeFirst}</strong>,</p>
    <p>Merci pour votre intérêt. Vous trouverez ci-joint votre <strong>Guide travaux complet – Rénover ma salle de bain</strong> au format PDF.</p>
    <p style="text-align:center;margin:28px 0;">
      <a href="${GUIDE_URL}" target="_blank" style="display:inline-block;background:#124A66;color:#fff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:bold;">Télécharger le guide (PDF)</a>
    </p>
    <p>Ce guide rassemble nos retours d'expérience sur 20 ans de chantiers parisiens : planning, plomberie, étanchéité DTU 52.2, finitions, garanties.</p>
    <div style="background:#fff;border-left:4px solid #c2a016;padding:20px;margin:24px 0;border-radius:0 8px 8px 0;">
      <p style="margin:0 0 12px 0;font-size:16px;color:#124A66;"><strong>Vous aimez notre philosophie ?</strong></p>
      <p style="margin:0 0 16px 0;">Vous souhaitez un accompagnement personnalisé et obtenir votre devis gratuit ?</p>
      <p style="text-align:center;margin:0;">
        <a href="https://cal.com/votre-conseiller-travaux-siw706/30min" target="_blank" style="display:inline-block;background:#c2a016;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;">Réserver mon call de 30 min</a>
      </p>
    </div>
    <p>À très bientôt,<br><strong>L'équipe RenoverMaSalleDeBain.com</strong><br>Paris &amp; Île-de-France</p>
  </div>
  <div style="padding:20px;text-align:center;font-size:12px;color:#666;background:#f0f0f0;">
    <p><strong>RenoverMaSalleDeBain.com</strong></p>
    <p>📞 06 59 76 46 85 | ✉️ gestion@renovermasalledebain.com</p>
  </div>
</body></html>`,
          }),
        });
        emailSent = clientResp.ok;
        if (!clientResp.ok) console.error("Client email failed:", await clientResp.text());

        // Internal notification
        try {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
            body: JSON.stringify({
              from: "Site Web RMSDB <gestion@renovermasalledebain.com>",
              to: ["gestion@renovermasalledebain.com"],
              subject: `📘 Téléchargement guide – ${safeName}`,
              html: `<div style="font-family:Arial,sans-serif;">
  <h2>📘 Nouveau téléchargement du guide</h2>
  <table style="border-collapse:collapse;">
    <tr><td style="padding:6px 12px;font-weight:bold;">Nom</td><td style="padding:6px 12px;">${safeName}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">Téléphone</td><td style="padding:6px 12px;">${safePhone}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:bold;">Ville</td><td style="padding:6px 12px;">${safeCity}</td></tr>
  </table>
  <p><em>${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</em></p>
</div>`,
            }),
          });
        } catch (e) {
          console.error("Internal email failed (non-blocking):", e);
        }
      } catch (e) {
        console.error("Email error (non-blocking):", e);
      }
    }

    if (emailSent) {
      await supabase.from("quote_requests").update({ email_confirmation_sent: true }).eq("id", lead.id);
    }

    return new Response(JSON.stringify({ success: true, leadId: lead.id, emailSent, downloadUrl: GUIDE_URL }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Une erreur est survenue. Veuillez réessayer." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});