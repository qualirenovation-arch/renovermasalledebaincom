import { Layout } from "@/components/layout/Layout";
import { OGTags } from "@/components/seo/OGTags";
import { PageCTA } from "@/components/layout/PageCTA";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, ShieldCheck, Ruler, Building2, Droplets, Bath } from "lucide-react";
import { QualiRenovationCTA } from "@/components/shared/QualiRenovationCTA";

const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "renovermasalledebain.com",
  "url": "https://renovermasalledebain.com",
  "founder": {
    "@type": "Person",
    "name": "Carina Nahmani"
  },
  "areaServed": {
    "@type": "City",
    "name": "Paris"
  },
  "description": "Entreprise spécialisée en rénovation de salle de bain à Paris. Maître d'œuvre, coordination complète, garanties décennales.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services de rénovation",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Rénovation salle de bain",
          "areaServed": { "@type": "City", "name": "Paris" }
        }
      }
    ]
  }
};

const RenovationParis = () => {
  return (
    <Layout>
      <OGTags
        title="Rénovation salle de bain Paris – Prix & Guide complet"
        description="Entreprise spécialisée en rénovation de salle de bain à Paris. Prix au m², douche italienne, plomberie, étanchéité DTU 52.2 et garanties décennales."
        path="/renovation-salle-de-bain-paris"
        coverImage="https://renovermasalledebain.com/og/default-og.jpg"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light mb-4" style={{ color: '#124A66' }}>
              Rénovation salle de bain à Paris – Maître d'œuvre &amp; coordination complète
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light">
              Spécialiste en rénovation d'appartements parisiens &amp; copropriétés
            </p>
          </div>
        </div>
      </section>

      {/* Introduction SEO */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
              Spécialiste de la <strong className="text-foreground">rénovation de salle de bain à Paris</strong>, renovermasalledebain.com accompagne les projets en appartement parisien et en copropriété.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              De la conception à la réception des travaux, chaque rénovation est pilotée par un <strong className="text-foreground">maître d'œuvre</strong> afin de garantir conformité aux normes DTU, qualité d'exécution et respect du budget.
            </p>
          </div>
        </div>
      </section>

      {/* H2 sections */}
      <div className="space-y-0">

        {/* Section 1 — Expertise Paris */}
        <section className="py-12 md:py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start gap-3 mb-6">
                <Building2 className="w-6 h-6 mt-1 flex-shrink-0 text-primary" />
                <h2 className="font-display text-xl md:text-2xl font-light" style={{ color: '#124A66' }}>
                  Pourquoi rénover une salle de bain à Paris nécessite une expertise spécifique ?
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Rénover une salle de bain en appartement parisien présente des contraintes que l'on ne retrouve pas ailleurs. Les <strong className="text-foreground">immeubles haussmanniens</strong> et les constructions anciennes imposent de composer avec des colonnes d'évacuation en fonte, des sols irréguliers et des passages de canalisations complexes.
                </p>
                <p>
                  En copropriété, les travaux doivent respecter le règlement intérieur : horaires de chantier, autorisations pour les parties communes, gestion des nuisances sonores et coordination avec le syndic. L'accès par escalier étroit ou sans ascenseur ajoute une logistique spécifique pour le transport des matériaux.
                </p>
                <p>
                  Les espaces réduits, typiques des salles de bain parisiennes, exigent une conception sur mesure pour optimiser chaque centimètre carré tout en garantissant l'accessibilité et le confort d'usage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — Prix */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start gap-3 mb-6">
                <Ruler className="w-6 h-6 mt-1 flex-shrink-0 text-primary" />
                <h2 className="font-display text-xl md:text-2xl font-light" style={{ color: '#124A66' }}>
                  Quel est le prix d'une rénovation de salle de bain à Paris ?
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Le coût d'une rénovation complète de salle de bain à Paris se situe généralement entre <strong className="text-foreground">800 € et 1 500 € par m²</strong>, fournitures et main-d'œuvre comprises. Cette fourchette varie selon la complexité du chantier, le choix des matériaux et les contraintes techniques de l'immeuble.
                </p>
                <div className="rounded-2xl border border-border/40 bg-card p-6 my-6">
                  <h3 className="font-display text-base font-medium mb-4 text-foreground">Facteurs influençant le prix :</h3>
                  <ul className="space-y-2">
                    {[
                      "Surface de la salle de bain et nombre d'équipements",
                      "Type de revêtements (carrelage grand format, zellige, terrazzo)",
                      "Dépose et remplacement de la plomberie existante",
                      "Étanchéité selon la norme DTU 52.2",
                      "Spécificités liées à la copropriété parisienne",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p>
                  Retrouvez toutes les réponses à vos questions sur les budgets dans notre{" "}
                  <Link to="/faq" className="text-primary font-medium hover:underline">
                    FAQ dédiée aux prix de rénovation
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 — Étapes */}
        <section className="py-12 md:py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start gap-3 mb-6">
                <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0 text-primary" />
                <h2 className="font-display text-xl md:text-2xl font-light" style={{ color: '#124A66' }}>
                  Les étapes pour rénover une salle de bain en appartement parisien
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Une rénovation de salle de bain réussie repose sur un planning structuré. De l'état des lieux initial à la réception du chantier, chaque phase est coordonnée par un maître d'œuvre pour garantir la qualité et le respect des délais.
                </p>
                <ol className="space-y-3 list-decimal list-inside">
                  {[
                    "Visite technique & état des lieux de la salle de bain existante",
                    "Conception du projet et sélection des matériaux",
                    "Dépose et protection des espaces en copropriété",
                    "Plomberie, électricité et mise aux normes",
                    "Étanchéité DTU 52.2 sous carrelage",
                    "Pose du carrelage, faïence et équipements sanitaires",
                    "Finitions, nettoyage et procès-verbal de réception",
                  ].map((step) => (
                    <li key={step} className="text-sm leading-relaxed">
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="pt-2">
                  Consultez notre{" "}
                  <Link to="/guide-travaux" className="text-primary font-medium hover:underline">
                    guide complet des travaux de rénovation
                  </Link>{" "}
                  pour le détail de chaque étape.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 — Douche vs Baignoire */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start gap-3 mb-6">
                <Bath className="w-6 h-6 mt-1 flex-shrink-0 text-primary" />
                <h2 className="font-display text-xl md:text-2xl font-light" style={{ color: '#124A66' }}>
                  Douche italienne ou baignoire en appartement parisien ?
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Le choix entre une douche à l'italienne et une baignoire dépend de la configuration de votre salle de bain, de vos habitudes et des contraintes techniques de votre appartement parisien.
                </p>
                <p>
                  La <strong className="text-foreground">douche italienne</strong> est plébiscitée pour sa capacité à optimiser l'espace dans les petites surfaces tout en offrant un rendu design et une accessibilité optimale. Elle nécessite cependant une étanchéité irréprochable (norme DTU 52.2) et un receveur adapté.
                </p>
                <p>
                  La <strong className="text-foreground">baignoire</strong> reste un choix de confort apprécié dans les appartements familiaux. Les modèles compacts permettent de l'intégrer même dans des espaces réduits.
                </p>
                <p>
                  Notre équipe vous conseille sur la solution la plus adaptée à votre projet. Découvrez nos{" "}
                  <Link to="/realisations" className="text-primary font-medium hover:underline">
                    réalisations de salles de bain à Paris
                  </Link>{" "}
                  pour vous inspirer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 — Garanties */}
        <section className="py-12 md:py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start gap-3 mb-6">
                <ShieldCheck className="w-6 h-6 mt-1 flex-shrink-0 text-primary" />
                <h2 className="font-display text-xl md:text-2xl font-light" style={{ color: '#124A66' }}>
                  Garanties &amp; assurances en rénovation salle de bain
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Chaque chantier bénéficie d'un cadre contractuel rigoureux. La <strong className="text-foreground">garantie décennale</strong> couvre les désordres affectant la solidité de l'ouvrage ou le rendant impropre à sa destination pendant 10 ans après la réception des travaux.
                </p>
                <p>
                  Un <strong className="text-foreground">procès-verbal de réception</strong> est systématiquement établi en fin de chantier, listant les éventuelles réserves et engageant les délais de garantie. Cette étape formelle protège le client et formalise la conformité des travaux réalisés.
                </p>
                <p>
                  Pour en savoir plus, consultez la section dédiée dans notre{" "}
                  <Link to="/guide-travaux#garantie-decennale-salle-de-bain" className="text-primary font-medium hover:underline">
                    guide travaux
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 — Réalisations */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start gap-3 mb-6">
                <Droplets className="w-6 h-6 mt-1 flex-shrink-0 text-primary" />
                <h2 className="font-display text-xl md:text-2xl font-light" style={{ color: '#124A66' }}>
                  Nos réalisations de salles de bain à Paris
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Chaque projet est unique. Découvrez nos rénovations de salles de bain réalisées dans des appartements parisiens : douche à l'italienne, baignoire îlot, carrelage grand format, meuble vasque sur mesure et bien plus.
                </p>
                <Link
                  to="/realisations"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  Voir toutes nos réalisations
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Maillage interne */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto border-t border-border/30 pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { to: "/guide-travaux", label: "Guide travaux complet" },
                { to: "/faq", label: "Questions fréquentes" },
                { to: "/realisations", label: "Nos réalisations" },
                { to: "/devis", label: "Demander un devis" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="inline-flex items-center justify-center gap-1.5 text-sm font-medium hover:underline"
                  style={{ color: '#124A66' }}
                >
                  {link.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QualiRénovation */}
      <QualiRenovationCTA variant="full" />

      <PageCTA
        title="Votre projet de rénovation à Paris"
        description="Faisons le point ensemble sur votre salle de bain."
        buttonText="Demander un devis gratuit"
      />
    </Layout>
  );
};

export default RenovationParis;
