import { Layout } from "@/components/layout/Layout";
import { OGTags } from "@/components/seo/OGTags";
import { PageCTA } from "@/components/layout/PageCTA";
import { GuideStickyTOC } from "@/components/guide/GuideStickyTOC";
import { GuideHero } from "@/components/guide/GuideHero";
import { GuideVideos } from "@/components/guide/GuideVideos";
import { GuideMobileTOC } from "@/components/guide/GuideMobileTOC";
import { GuideReadingProgress } from "@/components/guide/GuideReadingProgress";
import { GuidePlanningSection } from "@/components/guide/GuidePlanningSection";
import { GuideInspectionSections } from "@/components/guide/GuideInspectionSections";
import { GuideMaitreOeuvreSection } from "@/components/guide/GuideMaitreOeuvreSection";
import { GuideInfrastructureSections } from "@/components/guide/GuideInfrastructureSections";
import { GuideDetailsSections } from "@/components/guide/GuideDetailsSections";
import { GuideComfortSections } from "@/components/guide/GuideComfortSections";
import { GuideSummary } from "@/components/guide/GuideSummary";
import { GuideGarantiesSection } from "@/components/guide/GuideGarantiesSection";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Guide = () => {
  return (
    <Layout>
      <OGTags
        title="Guide Travaux – Réussir sa salle de bain"
        description="Guide complet pour réussir la rénovation de votre salle de bain : étanchéité, plomberie, VMC, choix techniques et accompagnement maître d'œuvre à Paris."
        path="/guide-travaux"
        coverImage="https://renovermasalledebain.com/og/guide-travaux.jpg"
      />
      

      <div className="guide-page">
        <GuideReadingProgress />
        <GuideHero />
        <GuideVideos />
        <GuideMobileTOC />

        {/* Main content with sticky TOC sidebar */}
        <div className="relative">
          {/* Sticky TOC sidebar - desktop only - LEFT side */}
          <aside className="hidden lg:block fixed top-24 left-0 w-56 xl:w-64 z-10 py-8 px-4">
            <GuideStickyTOC />
          </aside>

          <div className="lg:ml-56 xl:ml-64">
            <GuidePlanningSection />
            <GuideInspectionSections />
            <GuideMaitreOeuvreSection />
            <GuideInfrastructureSections />
            <GuideDetailsSections />
            <GuideComfortSections />
            <GuideSummary />
            <GuideGarantiesSection />
            {/* Lien croisé vers la FAQ */}
            <section className="py-8">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center border-t border-border/30 pt-8">
                  <p className="text-muted-foreground text-sm mb-4">
                    Pour les questions pratiques, consultez notre{" "}
                    <Link
                      to="/faq"
                      className="inline-flex items-center gap-1.5 font-medium hover:underline"
                      style={{ color: '#124A66' }}
                    >
                      FAQ
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <PageCTA
          title="Besoin d'un avis professionnel ?"
          description="Avant de vous lancer, faisons le point ensemble."
          buttonText="Je fais analyser mon projet"
        />
      </div>
    </Layout>
  );
};

export default Guide;
