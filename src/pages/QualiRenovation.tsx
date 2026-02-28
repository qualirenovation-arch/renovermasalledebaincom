import { Layout } from "@/components/layout/Layout";
import { OGTags } from "@/components/seo/OGTags";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoQualiRenovation } from "@/components/shared/LogoQualiRenovation";

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "QualiRénovation",
  "url": "https://qualirenovation.fr",
  "sameAs": ["https://renovermasalledebain.com"],
  "founder": {
    "@type": "Person",
    "name": "Carina Nahmani"
  },
  "areaServed": [
    { "@type": "City", "name": "Paris" },
    { "@type": "AdministrativeArea", "name": "Île-de-France" }
  ]
};

const QualiRenovation = () => {
  return (
    <Layout>
      <OGTags
        title="QualiRénovation – Rénovation globale à Paris | renovermasalledebain.com"
        description="QualiRénovation est l'entreprise de rénovation globale basée à Paris à l'origine du site spécialisé renovermasalledebain.com."
        path="/qualirenovation"
        coverImage="https://renovermasalledebain.com/og/default-og.jpg"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <LogoQualiRenovation width={220} height={54} />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light mb-4" style={{ color: '#124A66' }}>
              QualiRénovation – Entreprise de rénovation globale à Paris
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light">
              La structure à l'origine de renovermasalledebain.com
            </p>
          </div>
        </div>
      </section>

      {/* Bloc 1 – Présentation */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">QualiRénovation</strong> est l'entreprise de rénovation basée à Paris à l'origine du site spécialisé renovermasalledebain.com.
            </p>
            <p>
              Elle intervient sur des projets de <strong className="text-foreground">rénovation globale d'appartements et de maisons en Île-de-France</strong>, avec une approche maître d'œuvre complète.
            </p>
          </div>
        </div>
      </section>

      {/* Bloc 2 – Différence des expertises */}
      <section className="py-12 md:py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border/40 bg-card p-6 md:p-8">
                <h2 className="font-display text-lg font-light mb-3" style={{ color: '#124A66' }}>
                  renovermasalledebain.com
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dédié exclusivement à la <strong className="text-foreground">rénovation de salle de bain</strong> à Paris et en Île-de-France.
                </p>
              </div>
              <div className="rounded-2xl border border-border/40 bg-card p-6 md:p-8">
                <h2 className="font-display text-lg font-light mb-3" style={{ color: '#124A66' }}>
                  qualirenovation.fr
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dédié aux projets de <strong className="text-foreground">rénovation globale</strong> et aux chantiers d'ampleur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloc 3 – CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Vous avez un projet de rénovation complète d'appartement ou de maison ?
            </p>
            <a
              href="https://qualirenovation.fr"
              target="_blank"
              rel="noopener"
              aria-label="Découvrir QualiRénovation – rénovation globale à Paris et Île-de-France"
            >
              <Button variant="gold" size="lg" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Découvrir QualiRénovation
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default QualiRenovation;
