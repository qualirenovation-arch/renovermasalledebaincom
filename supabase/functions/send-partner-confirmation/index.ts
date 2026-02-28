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
const RATE_LIMIT_MAX_REQUESTS = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

interface DocumentUpload {
  type: string;
  name: string;
  data: string; // base64
  mimeType: string;
}

interface PortfolioUpload {
  name: string;
  data: string; // base64
  mimeType: string;
}

interface PartnerSubmissionRequest {
  formData: {
    company_name: string;
    contact_name: string;
    contact_function: string;
    phone: string;
    email: string;
    zones: string[];
    zone_other?: string;
    siret?: string;
    vat_number?: string;
    manager_first_name?: string;
    manager_last_name?: string;
    manager_phone?: string;
    trades: string[];
    trade_other?: string;
    experience: string;
    employee_count: number;
    annual_revenue?: string;
    managed_people_count?: number;
    works_as_subcontractor: boolean;
    autonomous_intervention: boolean;
    occupied_sites_experience: boolean;
    insurance_company?: string;
    insurance_contract_number?: string;
    website_url?: string;
    instagram_url?: string;
    facebook_url?: string;
    linkedin_url?: string;
    houzz_url?: string;
    presentation?: string;
    certify_accuracy: boolean;
    accept_contact: boolean;
  };
  documents: DocumentUpload[];
  portfolioFiles: PortfolioUpload[];
  captchaToken: string;
  missingDocuments: string[];
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

// Allowed MIME types for uploads
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// URL validation - only allow http and https protocols
function validateUrl(url: string | null | undefined): boolean {
  if (!url || url.trim() === '') return true; // Optional field
  
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
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

// Base64 to Uint8Array conversion
function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Initialize Supabase client with service role for all operations
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

  // Get client IP for rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
             req.headers.get("x-real-ip") || 
             "unknown";
  const endpoint = "send-partner-confirmation";

  try {
    // Check rate limit FIRST
    const { allowed, remaining } = await checkRateLimit(supabase, ip, endpoint);
    
    if (!allowed) {
      console.log("Rate limit exceeded for send-partner-confirmation endpoint");
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

    const requestData: PartnerSubmissionRequest = await req.json();
    const { formData, documents, portfolioFiles, captchaToken, missingDocuments } = requestData;

    // 1. VERIFY CAPTCHA FIRST (before any database operations)
    if (!captchaToken) {
      return new Response(
        JSON.stringify({ error: "Vérification anti-spam requise" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isValidCaptcha = await verifyCaptcha(captchaToken);
    if (!isValidCaptcha) {
      return new Response(
        JSON.stringify({ error: "Vérification anti-spam échouée" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. VALIDATE ALL REQUIRED INPUTS server-side
    if (!formData.company_name?.trim() || !formData.contact_name?.trim() || 
        !formData.phone?.trim() || !formData.email?.trim()) {
      return new Response(
        JSON.stringify({ error: "Champs obligatoires manquants" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!formData.trades || formData.trades.length === 0) {
      return new Response(
        JSON.stringify({ error: "Au moins un corps de métier requis" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!formData.experience?.trim()) {
      return new Response(
        JSON.stringify({ error: "Expérience requise" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return new Response(
        JSON.stringify({ error: "Adresse email invalide" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. VALIDATE ALL URLs (prevent javascript:, data:, file: protocols)
    const urlFields = [
      { name: 'Site web', value: formData.website_url },
      { name: 'Instagram', value: formData.instagram_url },
      { name: 'Facebook', value: formData.facebook_url },
      { name: 'LinkedIn', value: formData.linkedin_url },
      { name: 'Houzz', value: formData.houzz_url },
    ];

    for (const { name, value } of urlFields) {
      if (!validateUrl(value)) {
        return new Response(
          JSON.stringify({ error: `URL ${name} invalide. Utilisez http:// ou https://` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // 4. VALIDATE SIRET format if provided
    if (formData.siret) {
      const cleanedSiret = formData.siret.replace(/\s/g, '');
      if (cleanedSiret && !/^\d{14}$/.test(cleanedSiret)) {
        return new Response(
          JSON.stringify({ error: "Le numéro SIRET doit comporter 14 chiffres" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // 5. VALIDATE file uploads
    for (const doc of documents) {
      if (!ALLOWED_MIME_TYPES.includes(doc.mimeType)) {
        return new Response(
          JSON.stringify({ error: `Type de fichier non autorisé: ${doc.mimeType}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Check approximate size (base64 is ~33% larger than binary)
      const approximateSize = (doc.data.length * 3) / 4;
      if (approximateSize > MAX_FILE_SIZE) {
        return new Response(
          JSON.stringify({ error: `Fichier trop volumineux: ${doc.name}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    for (const file of portfolioFiles) {
      if (!ALLOWED_MIME_TYPES.includes(file.mimeType)) {
        return new Response(
          JSON.stringify({ error: `Type de fichier portfolio non autorisé: ${file.mimeType}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const approximateSize = (file.data.length * 3) / 4;
      if (approximateSize > MAX_FILE_SIZE) {
        return new Response(
          JSON.stringify({ error: `Fichier portfolio trop volumineux: ${file.name}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Record this request for rate limiting (after all validation passes)
    await recordRequest(supabase, ip, endpoint);

    // 6. INSERT SUBCONTRACTOR RECORD (using service role - bypasses RLS)
    const { data: subcontractor, error: subError } = await supabase
      .from('subcontractors')
      .insert({
        company_name: escapeHtml(formData.company_name.trim()),
        contact_name: escapeHtml(formData.contact_name.trim()),
        contact_function: escapeHtml(formData.contact_function?.trim() || ''),
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        zones: formData.zones || [],
        zone_other: formData.zone_other ? escapeHtml(formData.zone_other.trim()) : null,
        siret: formData.siret?.replace(/\s/g, '') || null,
        vat_number: formData.vat_number?.trim() || null,
        manager_first_name: formData.manager_first_name ? escapeHtml(formData.manager_first_name.trim()) : null,
        manager_last_name: formData.manager_last_name ? escapeHtml(formData.manager_last_name.trim()) : null,
        manager_phone: formData.manager_phone?.trim() || null,
        trades: formData.trades || [],
        trade_other: formData.trade_other ? escapeHtml(formData.trade_other.trim()) : null,
        experience: formData.experience,
        employee_count: formData.employee_count || 0,
        annual_revenue: formData.annual_revenue || null,
        managed_people_count: formData.managed_people_count || null,
        works_as_subcontractor: formData.works_as_subcontractor,
        autonomous_intervention: formData.autonomous_intervention,
        occupied_sites_experience: formData.occupied_sites_experience,
        insurance_company: formData.insurance_company ? escapeHtml(formData.insurance_company.trim()) : null,
        insurance_contract_number: formData.insurance_contract_number?.trim() || null,
        website_url: formData.website_url?.trim() || null,
        instagram_url: formData.instagram_url?.trim() || null,
        facebook_url: formData.facebook_url?.trim() || null,
        linkedin_url: formData.linkedin_url?.trim() || null,
        houzz_url: formData.houzz_url?.trim() || null,
        presentation: formData.presentation ? escapeHtml(formData.presentation.trim()) : null,
        certify_accuracy: formData.certify_accuracy,
        accept_contact: formData.accept_contact,
      })
      .select('id')
      .single();

    if (subError) {
      console.error("Subcontractor insert error:", subError);
      return new Response(
        JSON.stringify({ error: "Erreur lors de l'enregistrement" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const subcontractorId = subcontractor.id;
    console.log(`Created subcontractor: ${subcontractorId}`);

    // 7. UPLOAD DOCUMENTS TO STORAGE (using service role)
    for (const doc of documents) {
      try {
        const fileBytes = base64ToUint8Array(doc.data);
        const filePath = `${subcontractorId}/${doc.type}/${doc.name}`;
        
        const { error: uploadError } = await supabase.storage
          .from('subcontractor-files')
          .upload(filePath, fileBytes, {
            contentType: doc.mimeType,
          });

        if (uploadError) {
          console.error(`Upload error for ${doc.type}:`, uploadError);
          continue;
        }

        // Record document in database
        await supabase
          .from('subcontractor_documents')
          .insert({
            subcontractor_id: subcontractorId,
            document_type: doc.type,
            file_path: filePath,
            file_name: doc.name,
          });
          
        console.log(`Uploaded document: ${filePath}`);
      } catch (err) {
        console.error(`Error processing document ${doc.type}:`, err);
      }
    }

    // 8. UPLOAD PORTFOLIO FILES (using service role)
    for (const file of portfolioFiles) {
      try {
        const fileBytes = base64ToUint8Array(file.data);
        const filePath = `${subcontractorId}/portfolio/${file.name}`;
        
        const { error: uploadError } = await supabase.storage
          .from('subcontractor-files')
          .upload(filePath, fileBytes, {
            contentType: file.mimeType,
          });

        if (uploadError) {
          console.error(`Portfolio upload error:`, uploadError);
          continue;
        }

        await supabase
          .from('subcontractor_portfolio')
          .insert({
            subcontractor_id: subcontractorId,
            file_path: filePath,
            file_name: file.name,
          });
          
        console.log(`Uploaded portfolio file: ${filePath}`);
      } catch (err) {
        console.error(`Error processing portfolio file:`, err);
      }
    }

    // 9. SEND CONFIRMATION EMAILS
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      // Don't fail the submission, just log the error
    } else {
      const tradesFormatted = formData.trades.map(t => tradeLabels[t] || t).join(", ");
      const zonesFormatted = (formData.zones || []).map(z => zoneLabels[z] || z).join(", ");
      const hasMissingDocs = missingDocuments && missingDocuments.length > 0;

      // Build missing documents section for emails
      const missingDocsSection = hasMissingDocs ? `
        <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0 0 10px; font-weight: bold; color: #92400e;">📋 Documents en attente :</p>
          <ul style="margin: 0; padding-left: 20px; color: #92400e;">
            ${missingDocuments.map(doc => `<li>${escapeHtml(doc)}</li>`).join('')}
          </ul>
          <p style="margin: 10px 0 0; font-size: 14px; color: #92400e;">
            Merci de nous transmettre ces documents dès que possible pour que nous puissions étudier votre dossier.
          </p>
        </div>
      ` : '';

      // Email 1: Confirmation to partner
      const partnerEmailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Montserrat', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; padding: 24px 16px; background: linear-gradient(135deg, #124A66 0%, #0d3a52 100%); border-radius: 8px 8px 0 0; }
              .logo-text { font-family: 'Nunito Sans', Arial, sans-serif; font-weight: 300; color: #ffffff; letter-spacing: 0.5px; white-space: nowrap; font-size: 18px; }
              .logo-text .accent { color: #A0845C; }
              .logo-sub { font-family: 'Nunito Sans', Arial, sans-serif; font-size: 9px; font-weight: 400; color: rgba(255,255,255,0.85); letter-spacing: 2.5px; padding-top: 2px; }
              .content { padding: 30px 0; }
              .footer { padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
              .highlight { background-color: #f8f5f0; padding: 15px; border-radius: 8px; margin: 20px 0; }
              @media only screen and (max-width: 480px) {
                .logo-text { font-size: 14px !important; }
                .logo-sub { font-size: 8px !important; letter-spacing: 1.5px !important; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
                  <tr><td align="center" class="logo-text">Ren<span class="accent">🚿</span>verMaSalleDeBain.com</td></tr>
                  <tr><td align="center" class="logo-sub">Une expertise QUALIRÉNOVATION</td></tr>
                </table>
                <h1 style="color: #ffffff; margin: 10px 0 0;">QualiRénovation</h1>
                <p style="color: rgba(255,255,255,0.85); margin: 5px 0 0;">by QualiConcept</p>
              </div>
              </div>
              <div class="content">
                <p>Bonjour,</p>
                <p>Nous vous remercions pour votre candidature en tant que partenaire sous-traitant auprès de <strong>QualiRénovation by QualiConcept</strong>.</p>
                <p>Votre dossier a bien été reçu et sera étudié par notre équipe.<br>
                Si votre profil correspond à nos besoins, nous vous recontacterons pour un premier échange.</p>
                ${missingDocsSection}
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

      // Build documents status for internal email
      const allDocs = ['Kbis', 'URSSAF', 'RC Pro', 'Décennale', 'RIB'];
      const docsStatusHtml = allDocs.map(doc => {
        const isMissing = hasMissingDocs && missingDocuments.some(m => 
          m.toLowerCase().includes(doc.toLowerCase()) || 
          doc.toLowerCase().includes(m.toLowerCase().split(' ')[0])
        );
        if (isMissing) {
          return `<p style="color: #dc2626;">❌ ${doc} (manquant)</p>`;
        }
        return `<p style="color: #22c55e;">✔ ${doc}</p>`;
      }).join('');

      // Email 2: Internal notification
      const internalEmailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Montserrat', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: ${hasMissingDocs ? '#f59e0b' : '#1a1a1a'}; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f8f8f8; }
              .info-box { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
              .label { font-weight: bold; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">🔔 Nouvelle candidature partenaire ${hasMissingDocs ? '⚠️ DOSSIER INCOMPLET' : ''}</h2>
                <p style="margin: 5px 0 0; opacity: 0.8;">Sous-traitance</p>
              </div>
              <div class="content">
                <p>Une nouvelle candidature partenaire vient d'être déposée.</p>
                
                <div class="info-box">
                  <p><span class="label">Entreprise :</span> ${escapeHtml(formData.company_name)}</p>
                  <p><span class="label">Contact :</span> ${escapeHtml(formData.contact_name)}</p>
                  <p><span class="label">Email :</span> ${escapeHtml(formData.email)}</p>
                  <p><span class="label">Métier(s) :</span> ${escapeHtml(tradesFormatted)}</p>
                  <p><span class="label">Zone(s) :</span> ${escapeHtml(zonesFormatted)}</p>
                </div>
                
                <div class="info-box">
                  <p style="margin: 0 0 10px; font-weight: bold;">Statut des documents :</p>
                  ${docsStatusHtml}
                </div>
                
                ${hasMissingDocs ? `
                <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 15px 0;">
                  <p style="margin: 0; font-weight: bold; color: #92400e;">⚠️ Action requise : Contacter le partenaire pour obtenir les documents manquants</p>
                </div>
                ` : ''}
                
                <p style="text-align: center; margin-top: 20px;">
                  <strong>👉 Consulter le dossier complet dans l'interface admin.</strong>
                </p>
              </div>
            </div>
          </body>
        </html>
      `;

      // Send partner confirmation email
      try {
        const partnerResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "QualiRénovation <gestion@qualiconcept.fr>",
            to: [formData.email],
            subject: "Candidature partenaire – Dossier bien reçu",
            html: partnerEmailHtml,
          }),
        });

        if (!partnerResponse.ok) {
          const errorText = await partnerResponse.text();
          console.error("Failed to send partner email:", errorText);
        }
      } catch (emailErr) {
        console.error("Error sending partner email:", emailErr);
      }

      // Send internal notification email
      try {
        const internalResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "QualiRénovation <gestion@qualiconcept.fr>",
            to: ["gestion@qualiconcept.fr"],
            subject: `Nouvelle candidature partenaire – ${formData.company_name}`,
            html: internalEmailHtml,
          }),
        });

        if (!internalResponse.ok) {
          const errorText = await internalResponse.text();
          console.error("Failed to send internal email:", errorText);
        }
      } catch (emailErr) {
        console.error("Error sending internal email:", emailErr);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Candidature enregistrée avec succès" 
      }),
      { 
        status: 200, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": String(remaining - 1)
        } 
      }
    );
  } catch (error) {
    console.error("Error in send-partner-confirmation:", error);
    return new Response(
      JSON.stringify({ error: "Erreur lors du traitement de la candidature" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

Deno.serve(handler);
