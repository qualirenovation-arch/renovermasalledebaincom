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
import { GuideFAQ } from "@/components/guide/GuideFAQ";

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
            <GuideFAQ />
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
