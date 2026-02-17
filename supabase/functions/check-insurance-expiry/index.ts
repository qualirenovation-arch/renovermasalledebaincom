import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DocumentWithSubcontractor {
  id: string;
  document_type: string;
  file_name: string;
  expiry_date: string;
  subcontractor_id: string;
  subcontractor: {
    company_name: string;
    email: string;
    contact_name: string;
    phone: string;
  };
}

const documentLabels: Record<string, string> = {
  rc_pro: "Responsabilité Civile Professionnelle",
  decennale: "Garantie Décennale",
};

async function sendExpiryNotification(
  doc: DocumentWithSubcontractor,
  daysUntilExpiry: number,
  isExpired: boolean
): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return false;
  }

  const docLabel = documentLabels[doc.document_type] || doc.document_type;
  const expiryDate = new Date(doc.expiry_date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const urgencyColor = isExpired ? "#dc2626" : daysUntilExpiry <= 7 ? "#f59e0b" : "#3b82f6";
  const urgencyText = isExpired
    ? "EXPIRÉ"
    : daysUntilExpiry <= 7
    ? "URGENT"
    : "ATTENTION";

  // Email to partner
  const partnerEmailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #124A66; }
            .header img { max-width: 180px; margin-bottom: 10px; }
            .alert-box { background-color: ${urgencyColor}15; border: 2px solid ${urgencyColor}; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .content { padding: 30px 0; }
            .footer { padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://wacqnrxbszvznfqiiuxm.supabase.co/storage/v1/object/public/email-assets/logo-rmsb-new.png" alt="Rénover Ma Salle de Bain" />
              <h1 style="color: #124A66; margin: 0;">QualiRénovation</h1>
              <p style="color: #666; margin: 5px 0 0;">by QualiConcept</p>
            </div>
          <div class="content">
            <div class="alert-box">
              <p style="font-size: 14px; color: ${urgencyColor}; font-weight: bold; margin: 0 0 5px;">${urgencyText}</p>
              <h2 style="color: ${urgencyColor}; margin: 0;">
                ${isExpired ? "Document d'assurance expiré" : "Votre document d'assurance expire bientôt"}
              </h2>
            </div>
            
            <p>Bonjour ${doc.subcontractor.contact_name},</p>
            
            <p>
              ${isExpired 
                ? `Votre <strong>${docLabel}</strong> a expiré le <strong>${expiryDate}</strong>.`
                : `Votre <strong>${docLabel}</strong> expire le <strong>${expiryDate}</strong> (dans ${daysUntilExpiry} jour${daysUntilExpiry > 1 ? 's' : ''}).`
              }
            </p>
            
            <p>
              ${isExpired
                ? "⚠️ <strong>Important :</strong> Sans document valide, nous ne pourrons pas vous confier de nouveaux chantiers."
                : "Merci de nous transmettre votre nouvelle attestation dès que possible afin de maintenir votre éligibilité."
              }
            </p>
            
            <div style="background-color: #f8f5f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>📩 Comment mettre à jour ?</strong></p>
              <p style="margin: 10px 0 0;">Envoyez votre nouvelle attestation par email à <a href="mailto:gestion@qualiconcept.fr">gestion@qualiconcept.fr</a></p>
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

  // Email to admin
  const adminEmailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: ${urgencyColor}; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f8f8f8; }
          .info-box { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
          .label { font-weight: bold; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">
              ${isExpired ? "🚨 Document expiré" : "⚠️ Document expire bientôt"}
            </h2>
          </div>
          <div class="content">
            <div class="info-box">
              <p><span class="label">Entreprise :</span> ${doc.subcontractor.company_name}</p>
              <p><span class="label">Contact :</span> ${doc.subcontractor.contact_name}</p>
              <p><span class="label">Email :</span> ${doc.subcontractor.email}</p>
              <p><span class="label">Téléphone :</span> ${doc.subcontractor.phone}</p>
            </div>
            
            <div class="info-box">
              <p><span class="label">Document :</span> ${docLabel}</p>
              <p><span class="label">Date d'expiration :</span> ${expiryDate}</p>
              <p><span class="label">Statut :</span> 
                <span style="color: ${urgencyColor}; font-weight: bold;">
                  ${isExpired ? "EXPIRÉ" : `Expire dans ${daysUntilExpiry} jour${daysUntilExpiry > 1 ? 's' : ''}`}
                </span>
              </p>
            </div>
            
            <p style="text-align: center; margin-top: 20px;">
              <strong>👉 Le partenaire a été notifié par email.</strong>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    // Send to partner
    const partnerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "QualiRénovation <gestion@qualiconcept.fr>",
        to: [doc.subcontractor.email],
        subject: isExpired
          ? `⚠️ Document expiré – ${docLabel}`
          : `Rappel – ${docLabel} expire le ${expiryDate}`,
        html: partnerEmailHtml,
      }),
    });

    if (!partnerResponse.ok) {
      const errorText = await partnerResponse.text();
      console.error(`Failed to send partner email to ${doc.subcontractor.email}:`, errorText);
    } else {
      console.log(`Partner notification sent to ${doc.subcontractor.email}`);
    }

    // Send to admin
    const adminResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "QualiRénovation <gestion@qualiconcept.fr>",
        to: ["gestion@qualiconcept.fr"],
        subject: `${isExpired ? "🚨" : "⚠️"} ${doc.subcontractor.company_name} – ${docLabel} ${isExpired ? "expiré" : "expire bientôt"}`,
        html: adminEmailHtml,
      }),
    });

    if (!adminResponse.ok) {
      const errorText = await adminResponse.text();
      console.error("Failed to send admin email:", errorText);
    } else {
      console.log("Admin notification sent");
    }

    return true;
  } catch (error) {
    console.error("Error sending notification:", error);
    return false;
  }
}

const CRON_SECRET = Deno.env.get("CRON_SECRET");

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Validate cron secret to prevent unauthorized invocations
  const authHeader = req.headers.get("Authorization");
  if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get current date
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    
    // Calculate date 30 days from now
    const futureDate = new Date(now);
    futureDate.setDate(futureDate.getDate() + 30);
    const thirtyDaysFromNow = futureDate.toISOString().split("T")[0];

    console.log(`Checking documents expiring between ${today} and ${thirtyDaysFromNow}`);

    // Get documents expiring within 30 days or already expired (within last 7 days)
    const pastDate = new Date(now);
    pastDate.setDate(pastDate.getDate() - 7);
    const sevenDaysAgo = pastDate.toISOString().split("T")[0];

    // Fetch insurance documents with subcontractor info
    const { data: documents, error } = await supabase
      .from("subcontractor_documents")
      .select(`
        id,
        document_type,
        file_name,
        expiry_date,
        subcontractor_id,
        subcontractors!inner (
          company_name,
          email,
          contact_name,
          phone,
          status
        )
      `)
      .in("document_type", ["rc_pro", "decennale"])
      .not("expiry_date", "is", null)
      .gte("expiry_date", sevenDaysAgo)
      .lte("expiry_date", thirtyDaysFromNow)
      .eq("subcontractors.status", "validated");

    if (error) {
      console.error("Error fetching documents:", error);
      throw error;
    }

    console.log(`Found ${documents?.length || 0} documents to check`);

    const results = {
      checked: 0,
      notified: 0,
      expired: 0,
      expiringSoon: 0,
      errors: 0,
    };

    if (documents && documents.length > 0) {
      for (const doc of documents) {
        results.checked++;
        
        const expiryDate = new Date(doc.expiry_date);
        const diffTime = expiryDate.getTime() - now.getTime();
        const daysUntilExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const isExpired = daysUntilExpiry < 0;

        // Only notify for specific intervals: expired, 7 days, 14 days, 30 days
        const shouldNotify = 
          isExpired ||
          daysUntilExpiry === 7 ||
          daysUntilExpiry === 14 ||
          daysUntilExpiry === 30;

        if (shouldNotify) {
          // Transform the data to match our interface
          const docWithSub: DocumentWithSubcontractor = {
            id: doc.id,
            document_type: doc.document_type,
            file_name: doc.file_name,
            expiry_date: doc.expiry_date,
            subcontractor_id: doc.subcontractor_id,
            subcontractor: {
              company_name: (doc.subcontractors as any).company_name,
              email: (doc.subcontractors as any).email,
              contact_name: (doc.subcontractors as any).contact_name,
              phone: (doc.subcontractors as any).phone,
            },
          };

          console.log(`Notifying ${docWithSub.subcontractor.company_name} for ${doc.document_type} (${isExpired ? "expired" : `${daysUntilExpiry} days left`})`);
          
          const success = await sendExpiryNotification(docWithSub, daysUntilExpiry, isExpired);
          
          if (success) {
            results.notified++;
            if (isExpired) {
              results.expired++;
            } else {
              results.expiringSoon++;
            }
          } else {
            results.errors++;
          }
        }
      }
    }

    console.log("Check completed:", results);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Insurance expiry check completed",
        results,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in check-insurance-expiry:", error);
    return new Response(
      JSON.stringify({ error: "Error checking insurance expiry" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
