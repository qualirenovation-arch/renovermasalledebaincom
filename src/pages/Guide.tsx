import { Layout } from "@/components/layout/Layout";
import { OGTags } from "@/components/seo/OGTags";
import { PageCTA } from "@/components/layout/PageCTA";
import { GuideStickyTOC } from "@/components/guide/GuideStickyTOC";
import { GuideHero } from "@/components/guide/GuideHero";
import { GuideVideos } from "@/components/guide/GuideVideos";
import { GuideMobileTOC } from "@/components/guide/GuideMobileTOC";
import { GuidePlanningSection } from "@/components/guide/GuidePlanningSection";
import { GuideInspectionSections } from "@/components/guide/GuideInspectionSections";
import { GuideMaitreOeuvreSection } from "@/components/guide/GuideMaitreOeuvreSection";
import { GuideInfrastructureSections } from "@/components/guide/GuideInfrastructureSections";
import { GuideDesignSections } from "@/components/guide/GuideDesignSections";
import { GuideDetailsSections } from "@/components/guide/GuideDetailsSections";
import { GuideComfortSections } from "@/components/guide/GuideComfortSections";
import { GuideParoiSection } from "@/components/guide/GuideParoiSection";
import { GuideSummary } from "@/components/guide/GuideSummary";
import { GuideFAQ } from "@/components/guide/GuideFAQ";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Combien de temps durent les travaux de rénovation d'une salle de bain ?", "acceptedAnswer": { "@type": "Answer", "text": "Une rénovation de salle de bain complète dure entre 3 semaines et 1 mois en moyenne." } },
    { "@type": "Question", "name": "Faut-il refaire toute la plomberie lors d'une rénovation de salle de bain ?", "acceptedAnswer": { "@type": "Answer", "text": "Oui, pour éviter les fuites et sécuriser l'installation." } },
    { "@type": "Question", "name": "La bonde doit-elle rester accessible ?", "acceptedAnswer": { "@type": "Answer", "text": "Toujours. Une trappe d'accès est indispensable." } },
    { "@type": "Question", "name": "Maître d'œuvre intégré : chacun son métier", "acceptedAnswer": { "@type": "Answer", "text": "Avec un maître d'œuvre intégré, tout est pensé avec vous et pour vous." } },
    { "@type": "Question", "name": "Qu'est-ce qu'une douche à l'italienne ?", "acceptedAnswer": { "@type": "Answer", "text": "Une douche de plain-pied, sans marche ni receveur surélevé." } },
    { "@type": "Question", "name": "Peut-on installer une douche à l'italienne dans un appartement ancien ?", "acceptedAnswer": { "@type": "Answer", "text": "Oui, dans la plupart des appartements, même anciens." } },
    { "@type": "Question", "name": "Comment garantissez-vous l'étanchéité d'une douche à l'italienne ?", "acceptedAnswer": { "@type": "Answer", "text": "Obligation DTU 52.2 : systèmes certifiés avec SEL/SPEC et bandes d'étanchéité." } },
    { "@type": "Question", "name": "Comment choisir sa paroi de douche ?", "acceptedAnswer": { "@type": "Answer", "text": "Le choix repose sur 3 critères : type d'ouverture, couleur du profilé, et type de verre." } },
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

      <GuideHero />
      <GuideVideos />
      <GuideMobileTOC />

      {/* Main content with sticky TOC sidebar */}
      <div className="lg:flex lg:gap-0 relative">
        <div className="flex-1 min-w-0 overflow-hidden">
          <GuidePlanningSection />
          <GuideInspectionSections />
          <GuideMaitreOeuvreSection />
          <GuideInfrastructureSections />
          <GuideDesignSections />
          <GuideDetailsSections />
          <GuideComfortSections />
          <GuideParoiSection />
          <GuideSummary />
          <GuideFAQ />
        </div>

        {/* Sticky TOC sidebar - desktop only */}
        <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0 relative z-10">
          <div className="sticky top-24 py-8 px-4">
            <GuideStickyTOC />
          </div>
        </aside>
      </div>

      <PageCTA
        title="Besoin d'un avis professionnel ?"
        description="Avant de vous lancer, faisons le point ensemble."
        buttonText="Je fais analyser mon projet"
      />
    </Layout>
  );
};

export default Guide;
