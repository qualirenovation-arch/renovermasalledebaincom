import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();

    if (!token || typeof token !== "string" || token.length < 32) {
      return new Response(
        JSON.stringify({ error: "Token invalide" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Only return the minimal fields needed for step 2 forms
    const { data, error } = await supabase
      .from("quote_requests")
      .select("id, client_first_name, client_last_name, client_email, client_phone, property_address, property_city, property_postal_code, type_devis, lead_status, step2_completed_at")
      .eq("access_token", token)
      .maybeSingle();

    if (error || !data) {
      return new Response(
        JSON.stringify({ error: "Lien invalide ou expiré" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (data.step2_completed_at) {
      return new Response(
        JSON.stringify({ error: "Ce dossier a déjà été complété." }),
        { status: 410, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        id: data.id,
        clientFirstName: data.client_first_name,
        clientLastName: data.client_last_name,
        clientEmail: data.client_email,
        clientPhone: data.client_phone,
        propertyAddress: data.property_address,
        propertyCity: data.property_city,
        propertyPostalCode: data.property_postal_code,
        typeDevis: data.type_devis,
        leadStatus: data.lead_status,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("lookup-lead-by-token error:", err);
    return new Response(
      JSON.stringify({ error: "Erreur serveur" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
