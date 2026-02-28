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
import { QualiRenovationCTA } from "@/components/shared/QualiRenovationCTA";

const jsonLdArticle = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Guide travaux rénovation salle de bain à Paris & Île-de-France",
  "description": "Découvrez toutes les étapes pour rénover une salle de bain à Paris : planning, étanchéité DTU 52.2, plomberie, pose carrelage et garanties décennales.",
  "author": {
    "@type": "Person",
    "name": "Carina Nahmani",
    "jobTitle": "Maître d'œuvre – Fondatrice",
    "url": "https://renovermasalledebain.com/a-propos"
  },
  "publisher": {
    "@type": "Organization",
    "name": "renovermasalledebain.com",
    "url": "https://renovermasalledebain.com",
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "AdministrativeArea", "name": "Île-de-France" }
    ]
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://renovermasalledebain.com/guide-travaux"
  },
  "datePublished": "2024-06-01",
  "dateModified": "2025-02-28",
  "image": "https://renovermasalledebain.com/og/guide-travaux.jpg",
  "inLanguage": "fr"
};

const Guide = () => {
  return (
    <Layout>
      <OGTags
        title="Guide travaux rénovation salle de bain à Paris – Étapes, normes & délais"
        description="Découvrez toutes les étapes pour rénover une salle de bain à Paris : planning, étanchéité DTU 52.2, plomberie, pose carrelage et garanties décennales."
        path="/guide-travaux"
        coverImage="https://renovermasalledebain.com/og/guide-travaux.jpg"
      />
      
      {/* JSON-LD Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
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
            {/* H2 catégorie : Préparation */}
            <div className="container mx-auto px-4 pt-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl md:text-2xl font-light mb-1" style={{ color: '#124A66' }}>Préparation</h2>
                <div className="w-8 h-[2px] mb-6" style={{ backgroundColor: '#c2a016' }} />
              </div>
            </div>
            <GuidePlanningSection />
            <GuideInspectionSections />

            {/* H2 catégorie : Accompagnement */}
            <div className="container mx-auto px-4 pt-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl md:text-2xl font-light mb-1" style={{ color: '#124A66' }}>Accompagnement</h2>
                <div className="w-8 h-[2px] mb-6" style={{ backgroundColor: '#c2a016' }} />
              </div>
            </div>
            <GuideMaitreOeuvreSection />

            {/* H2 catégorie : Infrastructure */}
            <div className="container mx-auto px-4 pt-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl md:text-2xl font-light mb-1" style={{ color: '#124A66' }}>Infrastructure</h2>
                <div className="w-8 h-[2px] mb-6" style={{ backgroundColor: '#c2a016' }} />
              </div>
            </div>
            <GuideInfrastructureSections />

            {/* H2 catégorie : Design & Finitions */}
            <div className="container mx-auto px-4 pt-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl md:text-2xl font-light mb-1" style={{ color: '#124A66' }}>Design &amp; Finitions</h2>
                <div className="w-8 h-[2px] mb-6" style={{ backgroundColor: '#c2a016' }} />
              </div>
            </div>
            <GuideDetailsSections />

            {/* H2 catégorie : Confort & Équipement */}
            <div className="container mx-auto px-4 pt-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl md:text-2xl font-light mb-1" style={{ color: '#124A66' }}>Confort &amp; Équipement</h2>
                <div className="w-8 h-[2px] mb-6" style={{ backgroundColor: '#c2a016' }} />
              </div>
            </div>
            <GuideComfortSections />
            <GuideSummary />

            {/* H2 catégorie : Garanties */}
            <div className="container mx-auto px-4 pt-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl md:text-2xl font-light mb-1" style={{ color: '#124A66' }}>Garanties</h2>
                <div className="w-8 h-[2px] mb-6" style={{ backgroundColor: '#c2a016' }} />
              </div>
            </div>
            <GuideGarantiesSection />

            {/* Maillage interne : liens vers FAQ, Réalisations, QualiRénovation */}
            <section className="py-8">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto border-t border-border/30 pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-8">
                    <Link
                      to="/faq"
                      className="inline-flex items-center justify-center gap-1.5 text-sm font-medium hover:underline"
                      style={{ color: '#124A66' }}
                    >
                      Questions fréquentes (FAQ)
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to="/realisations"
                      className="inline-flex items-center justify-center gap-1.5 text-sm font-medium hover:underline"
                      style={{ color: '#124A66' }}
                    >
                      Nos réalisations à Paris
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to="/qualirenovation"
                      className="inline-flex items-center justify-center gap-1.5 text-sm font-medium hover:underline"
                      style={{ color: '#124A66' }}
                    >
                      QualiRénovation
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              </div>
            </section>

            {/* Bloc QualiRénovation premium */}
            <QualiRenovationCTA variant="full" />
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
