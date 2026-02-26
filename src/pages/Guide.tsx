import { lazy, Suspense } from "react";
import { Layout } from "@/components/layout/Layout";
import { OGTags } from "@/components/seo/OGTags";
import { PageCTA } from "@/components/layout/PageCTA";
import { GuideStickyTOC } from "@/components/guide/GuideStickyTOC";
import { GuideHero } from "@/components/guide/GuideHero";
import { GuideVideos } from "@/components/guide/GuideVideos";
import { GuideMobileTOC } from "@/components/guide/GuideMobileTOC";
import { GuideReadingProgress } from "@/components/guide/GuideReadingProgress";

// Lazy-loaded below-fold sections for code splitting
const GuidePlanningSection = lazy(() => import("@/components/guide/GuidePlanningSection").then(m => ({ default: m.GuidePlanningSection })));
const GuideInspectionSections = lazy(() => import("@/components/guide/GuideInspectionSections").then(m => ({ default: m.GuideInspectionSections })));
const GuideMaitreOeuvreSection = lazy(() => import("@/components/guide/GuideMaitreOeuvreSection").then(m => ({ default: m.GuideMaitreOeuvreSection })));
const GuideInfrastructureSections = lazy(() => import("@/components/guide/GuideInfrastructureSections").then(m => ({ default: m.GuideInfrastructureSections })));
const GuideDetailsSections = lazy(() => import("@/components/guide/GuideDetailsSections").then(m => ({ default: m.GuideDetailsSections })));
const GuideComfortSections = lazy(() => import("@/components/guide/GuideComfortSections").then(m => ({ default: m.GuideComfortSections })));
const GuideSummary = lazy(() => import("@/components/guide/GuideSummary").then(m => ({ default: m.GuideSummary })));
const GuideGarantiesSection = lazy(() => import("@/components/guide/GuideGarantiesSection").then(m => ({ default: m.GuideGarantiesSection })));
const GuideFAQ = lazy(() => import("@/components/guide/GuideFAQ").then(m => ({ default: m.GuideFAQ })));

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Qu'est-ce qu'une douche à l'italienne ?", "acceptedAnswer": { "@type": "Answer", "text": "Une douche de plain-pied, sans marche ni receveur surélevé." } },
    { "@type": "Question", "name": "Peut-on installer une douche à l'italienne dans un appartement ancien ?", "acceptedAnswer": { "@type": "Answer", "text": "Oui, dans la plupart des appartements, même anciens." } },
    { "@type": "Question", "name": "Comment garantissez-vous l'étanchéité d'une douche à l'italienne ?", "acceptedAnswer": { "@type": "Answer", "text": "Obligation DTU 52.2 : systèmes certifiés avec SEL/SPEC et bandes d'étanchéité." } },
    { "@type": "Question", "name": "Qu'est-ce qu'un bâti-support ?", "acceptedAnswer": { "@type": "Answer", "text": "Structure métallique encastrée dans le mur pour installer un WC suspendu." } },
    { "@type": "Question", "name": "Qu'est-ce qu'une plaque de déclenchement ?", "acceptedAnswer": { "@type": "Answer", "text": "Le bouton de chasse d'eau visible sur un WC suspendu, livré en blanc par défaut." } },
    { "@type": "Question", "name": "Qu'est-ce qu'une cuvette sans bride ?", "acceptedAnswer": { "@type": "Answer", "text": "Une cuvette sans rebord intérieur, plus hygiénique et facile à nettoyer." } },
    { "@type": "Question", "name": "Le WC doit-il rester fonctionnel s'il est séparé dans une autre pièce ?", "acceptedAnswer": { "@type": "Answer", "text": "Oui, impérativement. Un WC situé dans une pièce indépendante doit rester accessible et utilisable pendant toute la durée des travaux." } },
  ]
};

const Guide = () => {
  return (
    <Layout>
      <OGTags
        title="Guide Travaux – Réussir sa salle de bain"
        description="Guide complet pour réussir la rénovation de votre salle de bain : étanchéité, plomberie, VMC, choix techniques et accompagnement maître d'œuvre à Paris."
        path="/guide-travaux"
        coverImage="https://renovermasalledebain.com/og/guide-travaux.jpg"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="guide-page">
        <GuideReadingProgress />
        <GuideHero />
        <GuideVideos />
        <GuideMobileTOC />

        {/* Main content with sticky TOC sidebar */}
        <div className="lg:flex lg:gap-0 relative">
          {/* Sticky TOC sidebar - desktop only - LEFT side */}
          <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0 relative z-10">
            <div className="sticky top-24 py-8 px-4">
              <GuideStickyTOC />
            </div>
          </aside>

          <div className="flex-1 min-w-0 overflow-x-hidden">
            <Suspense fallback={null}>
              <GuidePlanningSection />
              <GuideInspectionSections />
              <GuideMaitreOeuvreSection />
              <GuideInfrastructureSections />
              <GuideDetailsSections />
              <GuideComfortSections />
              <GuideSummary />
              <GuideGarantiesSection />
              <GuideFAQ />
            </Suspense>
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
