import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Home } from "lucide-react";
import { useSearchParams, Link } from "react-router-dom";
import { OGTags } from "@/components/seo/OGTags";

export default function DevisConfirmation() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "classique";
  const isWaterDamage = type === "degat_eaux";

  return (
    <Layout>
      <OGTags
        title="Demande de devis enregistrée"
        description="Votre demande de devis a bien été enregistrée. Consultez votre boîte email pour la suite."
        path="/devis/confirmation"
      />
      <section className="section-padding min-h-[70vh] flex items-center">
        <div className="container-custom">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-24 h-24 rounded-full bg-[hsl(var(--tag-mint))] flex items-center justify-center mx-auto mb-8">
              <Mail className="w-12 h-12 text-foreground" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-light mb-6">
              Votre demande est enregistrée !
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              {email ? (
                <>
                  Un email vient de vous être envoyé à <strong>{email}</strong> avec{" "}
                  <strong>3 options</strong> pour poursuivre votre {isWaterDamage ? "dossier dégât des eaux" : "projet"}.
                </>
              ) : (
                <>
                  Un email vient de vous être envoyé avec <strong>3 options</strong> pour poursuivre
                  votre {isWaterDamage ? "dossier dégât des eaux" : "projet"}.
                </>
              )}
            </p>
            <div className="bg-accent/30 rounded-xl p-6 mb-8 text-left">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-foreground mb-1">
                    Vérifiez votre boîte email
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {isWaterDamage
                      ? "Vous y trouverez un lien pour compléter votre dossier en ligne (travaux souhaités, documents, photos), demander un rappel, ou planifier un échange téléphonique directement."
                      : "Vous y trouverez un lien pour compléter votre demande en ligne, demander un rappel, ou planifier un échange téléphonique directement."}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" asChild>
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Retourner sur le site
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/devis">Nouvelle demande</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
