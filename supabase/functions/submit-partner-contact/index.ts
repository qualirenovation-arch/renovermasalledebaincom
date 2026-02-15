import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const HCAPTCHA_SECRET_KEY = Deno.env.get("HCAPTCHA_SECRET_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Rate limiting configuration
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

interface PartnerContactRequest {
  partner_family: 'sub_traitant' | 'installateur' | 'marque_site';
  company_name: string;
  contact_first_name: string;
  contact_last_name: string;
  email: string;
  phone: string;
  zone: 'paris' | 'petite_couronne' | 'idf' | 'autre';
  message: string;
  
  // Sous-traitant fields
  trade?: string;
  collaboration_type?: string;
  availability?: string;
  
  // Installateur fields
  requested_services?: string[];
  context?: string;
  intervention_level?: string;
  timeline?: string;
  
  // Marque/Site fields
  activity_type?: string;
  website_url?: string;
  offer_categories?: string[];
  collaboration_goal?: string;
  
  captchaToken: string;
}

// URL validation - only allow http and https protocols
function validateUrl(url: string | null | undefined): boolean {
  if (!url || url.trim() === '') return true;
  
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// Escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

// Rate limiting function
async function checkRateLimit(supabase: any, ip: string, endpoint: string): Promise<{ allowed: boolean; remaining: number }> {
  const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  
  const { count, error } = await supabase
    .from('rate_limits')
    .select('*', { count: 'exact', head: true })
    .eq('ip_address', ip)
    .eq('endpoint', endpoint)
    .gte('created_at', oneHourAgo);

  if (error) {
    console.error("Rate limit check error:", error);
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

async function verifyCaptcha(token: string): Promise<boolean> {
  // Skip verification for test token (temporary for testing)
  if (token === "test-token") {
    console.log("Test token detected, skipping captcha verification");
    return true;
  }

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

  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

  // Get client IP for rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
             req.headers.get("x-real-ip") || 
             "unknown";
  const endpoint = "submit-partner-contact";

  try {
    // Check rate limit FIRST
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

    const data: PartnerContactRequest = await req.json();

    // 1. VERIFY CAPTCHA FIRST
    if (!data.captchaToken) {
      return new Response(
        JSON.stringify({ error: "Vérification anti-spam requise" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isValidCaptcha = await verifyCaptcha(data.captchaToken);
    if (!isValidCaptcha) {
      return new Response(
        JSON.stringify({ error: "Vérification anti-spam échouée" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. VALIDATE REQUIRED FIELDS
    if (!data.partner_family || !data.company_name?.trim() || 
        !data.contact_first_name?.trim() || !data.contact_last_name?.trim() ||
        !data.email?.trim() || !data.phone?.trim() || !data.zone || !data.message?.trim()) {
      return new Response(
        JSON.stringify({ error: "Champs obligatoires manquants" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: "Adresse email invalide" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. VALIDATE URL if provided
    if (!validateUrl(data.website_url)) {
      return new Response(
        JSON.stringify({ error: "URL invalide. Utilisez http:// ou https://" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Record this request for rate limiting
    await recordRequest(supabase, ip, endpoint);

    // 4. INSERT PARTNER CONTACT
    const insertData: Record<string, any> = {
      partner_family: data.partner_family,
      company_name: escapeHtml(data.company_name.trim()),
      contact_first_name: escapeHtml(data.contact_first_name.trim()),
      contact_last_name: escapeHtml(data.contact_last_name.trim()),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      zone: data.zone,
      message: escapeHtml(data.message.trim()),
      status: 'nouveau',
      priority: 'normale',
      source: 'page_partenaires',
    };

    // Add family-specific fields
    if (data.partner_family === 'sub_traitant') {
      if (data.trade) insertData.trade = data.trade;
      if (data.collaboration_type) insertData.collaboration_type = data.collaboration_type;
      if (data.availability) insertData.availability = data.availability;
    } else if (data.partner_family === 'installateur') {
      if (data.requested_services) insertData.requested_services = data.requested_services;
      if (data.context) insertData.context = data.context;
      if (data.intervention_level) insertData.intervention_level = data.intervention_level;
      if (data.timeline) insertData.timeline = data.timeline;
    } else if (data.partner_family === 'marque_site') {
      if (data.activity_type) insertData.activity_type = data.activity_type;
      if (data.website_url) insertData.website_url = data.website_url.trim();
      if (data.offer_categories) insertData.offer_categories = data.offer_categories;
      if (data.collaboration_goal) insertData.collaboration_goal = data.collaboration_goal;
    }

    const { data: contact, error: insertError } = await supabase
      .from('partner_contacts')
      .insert(insertData)
      .select('id')
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Erreur lors de l'enregistrement" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Created partner contact: ${contact.id}`);

    // 5. SEND NOTIFICATION EMAILS
    if (RESEND_API_KEY) {
      const familyLabels: Record<string, string> = {
        sub_traitant: 'Sous-traitant',
        installateur: 'Installateur',
        marque_site: 'Marque / Site',
      };

      const zoneLabels: Record<string, string> = {
        paris: 'Paris',
        petite_couronne: 'Petite couronne (92, 93, 94)',
        idf: 'Île-de-France',
        autre: 'Autre',
      };

      // Admin notification email
      const adminEmailHtml = `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"></head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #1a1a1a; border-bottom: 2px solid #d4a574; padding-bottom: 10px;">
                🤝 Nouvelle demande partenaire
              </h2>
              
              <div style="background: #f8f7f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p style="margin: 5px 0;"><strong>Type :</strong> ${familyLabels[data.partner_family]}</p>
                <p style="margin: 5px 0;"><strong>Société :</strong> ${escapeHtml(data.company_name)}</p>
                <p style="margin: 5px 0;"><strong>Contact :</strong> ${escapeHtml(data.contact_first_name)} ${escapeHtml(data.contact_last_name)}</p>
                <p style="margin: 5px 0;"><strong>Email :</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                <p style="margin: 5px 0;"><strong>Téléphone :</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
                <p style="margin: 5px 0;"><strong>Zone :</strong> ${zoneLabels[data.zone]}</p>
              </div>
              
              <div style="background: #fff; border: 1px solid #e5e5e5; padding: 15px; border-radius: 8px;">
                <p style="font-weight: bold; margin-bottom: 10px;">Message :</p>
                <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
              </div>

              <p style="margin-top: 20px; font-size: 14px; color: #666;">
                Connectez-vous à l'administration pour gérer cette demande.
              </p>
            </div>
          </body>
        </html>
      `;

      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "QualiRénovation <gestion@renovermasalledebain.com>",
            to: ["gestion@renovermasalledebain.com"],
            subject: `[Partenaire ${familyLabels[data.partner_family]}] ${data.company_name}`,
            html: adminEmailHtml,
          }),
        });
        console.log("Admin notification email sent");
      } catch (emailError) {
        console.error("Failed to send admin email:", emailError);
      }

      // Confirmation email to partner
      const partnerEmailHtml = `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"></head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #124A66;">
                <img src="https://wacqnrxbszvznfqiiuxm.supabase.co/storage/v1/object/public/email-assets/logo-rmsb-new.png" alt="Rénover Ma Salle de Bain" style="max-width: 180px; margin-bottom: 10px;" />
                <h1 style="color: #124A66; margin: 0;">QualiRénovation</h1>
              </div>
              
              <div style="padding: 30px 0;">
                <p>Bonjour ${escapeHtml(data.contact_first_name)},</p>
                
                <p>Nous avons bien reçu votre demande de partenariat et vous en remercions.</p>
                
                <p>Notre équipe examinera votre demande dans les meilleurs délais et reviendra vers vous rapidement.</p>
                
                <p>À très bientôt,</p>
                <p><strong>L'équipe QualiRénovation</strong></p>
              </div>
              
              <div style="padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; text-align: center;">
                <p>renovermasalledebain.com by qualiconcept.fr</p>
                <p>Spécialiste de la rénovation de salles de bains</p>
              </div>
            </div>
          </body>
        </html>
      `;

      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "QualiRénovation <gestion@renovermasalledebain.com>",
            to: [data.email],
            subject: "Votre demande de partenariat - QualiRénovation",
            html: partnerEmailHtml,
          }),
        });
        console.log("Partner confirmation email sent");
      } catch (emailError) {
        console.error("Failed to send partner email:", emailError);
      }
    }

    return new Response(
      JSON.stringify({ success: true, id: contact.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Erreur serveur inattendue" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

Deno.serve(handler);
