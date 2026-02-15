import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { OGTags } from "@/components/seo/OGTags";
import { motion, AnimatePresence } from "framer-motion";
import { PartnerTypeCard } from "@/components/partners/PartnerTypeCard";
import { SubcontractorForm } from "@/components/partners/SubcontractorForm";
import { InstallerForm } from "@/components/partners/InstallerForm";
import { BrandSiteForm } from "@/components/partners/BrandSiteForm";

type PartnerType = "sub_traitant" | "installateur" | "marque_site" | null;

const PARTNER_TYPES = [
  {
    id: "sub_traitant" as const,
    icon: "🔧",
    title: "Sous-traitant",
    description: "Vous êtes artisan ou entreprise du bâtiment et souhaitez collaborer sur nos chantiers de rénovation.",
  },
  {
    id: "installateur" as const,
    icon: "🔍",
    title: "Installateur (recherche de prestation)",
    description: "Vous êtes installateur et recherchez un prestataire qualifié pour vos projets clients.",
  },
  {
    id: "marque_site" as const,
    icon: "✨",
    title: "Marque / Site / Point de vente / Site déco",
    description: "Vous êtes une marque, fabricant, distributeur, showroom ou site déco souhaitant collaborer.",
  },
];

export default function PartenairesContact() {
  const [selectedType, setSelectedType] = useState<PartnerType>(null);

  const handleBack = () => setSelectedType(null);

  return (
    <Layout>
      <OGTags
        title="Devenir partenaire – Formulaire de contact"
        description="Rejoignez le réseau RMSB : sous-traitants, installateurs, marques et fournisseurs. Développez votre activité avec des projets de rénovation de qualité."
        path="/partenaires/contact"
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-stone to-background py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
              Devenir partenaire
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Rejoignez notre réseau de partenaires et développez votre activité avec des projets de qualité.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <AnimatePresence mode="wait">
            {!selectedType ? (
              <motion.div
                key="selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-display text-2xl font-semibold mb-2 text-center">
                  Quel est votre profil ?
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  Sélectionnez la catégorie qui correspond le mieux à votre activité.
                </p>

                <div className="space-y-4">
                  {PARTNER_TYPES.map((type) => (
                    <PartnerTypeCard
                      key={type.id}
                      icon={type.icon}
                      title={type.title}
                      description={type.description}
                      isSelected={selectedType === type.id}
                      onClick={() => setSelectedType(type.id)}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={selectedType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl border border-border/50 p-6 md:p-10"
              >
                {selectedType === "sub_traitant" && <SubcontractorForm onBack={handleBack} />}
                {selectedType === "installateur" && <InstallerForm onBack={handleBack} />}
                {selectedType === "marque_site" && <BrandSiteForm onBack={handleBack} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
}
