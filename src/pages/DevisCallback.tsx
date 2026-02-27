import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { OGTags } from "@/components/seo/OGTags";
import { supabase } from "@/integrations/supabase/client";
import { Phone, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function DevisCallback() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const registerCallback = async () => {
      try {
        const { error } = await supabase.functions.invoke("handle-callback-request", {
          body: { token },
        });
        if (error) throw error;
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };

    registerCallback();
  }, [token]);

  return (
    <Layout>
      <OGTags
        title="Demande de rappel"
        description="Confirmation de votre demande de rappel pour votre projet de rénovation de salle de bain."
        path="/devis/rappel"
        noindex={true}
      />
      <section className="section-padding min-h-[70vh] flex items-center">
        <div className="container-custom">
          <motion.div className="max-w-2xl mx-auto text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            {status === "loading" && (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Enregistrement de votre demande...</p>
              </div>
            )}

            {status === "success" && (
              <>
                <div className="w-24 h-24 rounded-full bg-[hsl(var(--tag-mint))] flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-12 h-12 text-foreground" />
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-light mb-6">Demande de rappel enregistrée !</h1>
                <p className="text-muted-foreground text-lg mb-8">
                  Nous vous rappellerons dans les <strong>24 heures</strong> pour discuter de votre projet.
                </p>
                <div className="bg-accent/30 rounded-xl p-6 mb-8 text-left">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-foreground mb-1">Un conseiller vous rappellera</p>
                      <p className="text-muted-foreground text-sm">
                        Si vous souhaitez nous joindre directement, appelez le <strong>06 59 76 46 85</strong>.
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="default" size="lg" asChild>
                  <a href="/">Retourner sur le site</a>
                </Button>
              </>
            )}

            {status === "error" && (
              <>
                <h1 className="font-display text-3xl font-light mb-6">Lien invalide</h1>
                <p className="text-muted-foreground text-lg mb-8">
                  Ce lien de rappel n'est plus valide ou a déjà été utilisé.
                </p>
                <Button variant="default" size="lg" asChild>
                  <a href="/devis">Faire une nouvelle demande</a>
                </Button>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
