import { Layout } from "@/components/layout/Layout";
import { OGTags } from "@/components/seo/OGTags";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoQualiRenovation } from "@/components/shared/LogoQualiRenovation";
import { Link } from "react-router-dom";

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "QualiRénovation",
  "url": "https://qualirenovation.fr",
  "sameAs": ["https://renovermasalledebain.com"],
  "founder": {
    "@type": "Person",
    "name": "Carina Nahmani",
    "jobTitle": "Maître d'œuvre"
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
        title="QualiRénovation – Rénovation globale à Paris | Maître d'œuvre"
        description="QualiRénovation pilote des rénovations globales d'appartements et de maisons à Paris et en Île-de-France, sous la coordination d'un maître d'œuvre dédié."
        path="/qualirenovation"
        coverImage="https://renovermasalledebain.com/og/default-og.jpg"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />

      {/* 1 — Hero */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-10">
              <LogoQualiRenovation width={240} height={58} />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light mb-5" style={{ color: '#124A66' }}>
              QualiRénovation — Rénovation globale à Paris
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
              L'exigence d'une maîtrise d'œuvre intégrée
            </p>
          </div>
        </div>
      </section>

      {/* 3 — Texte principal */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              <strong className="text-foreground">QualiRénovation</strong> conçoit et pilote des rénovations globales d'appartements et de maisons à Paris et en Île-de-France.
            </p>
            <p>
              Chaque projet est envisagé comme un ensemble cohérent&nbsp;: structure, volumes, circulation, lumière, matériaux et précision d'exécution.
            </p>
            <div className="space-y-1 pt-2">
              <p>La maîtrise d'œuvre est intégrée.</p>
              <p>La coordination est rigoureuse.</p>
              <p>Les décisions techniques sont anticipées.</p>
            </div>
            <p className="font-medium text-foreground pt-2">
              Rien n'est improvisé.
            </p>
          </div>
        </div>
      </section>

      {/* 4 — Signature manifeste */}
      <section className="py-14 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <blockquote className="border-l-4 border-primary pl-6 md:pl-8 text-left">
              <p className="font-display text-xl md:text-2xl lg:text-3xl font-light leading-snug" style={{ color: '#124A66' }}>
                L'exigence n'est pas une option.
              </p>
              <p className="font-display text-xl md:text-2xl lg:text-3xl font-light leading-snug mt-1" style={{ color: '#124A66' }}>
                C'est une méthode.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* 5 — Autorité & Presse */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Reconnaissance & Parutions
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
              <p>
                Une expertise relayée par des médias de référence tels que{" "}
                <Link to="/presse" className="text-foreground underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors">
                  Houzz, Marie&nbsp;Claire&nbsp;Maison et Castorama
                </Link>.
              </p>
              <p>
                Ces parutions mettent en lumière une approche structurée de la rénovation à Paris, notamment en appartement ancien et en copropriété.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Carina Nahmani */}
      <section className="py-14 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              Les projets sont pilotés par <strong className="text-foreground">Carina Nahmani</strong>, maître d'œuvre, référente sur les chantiers parisiens et spécialiste des environnements en copropriété.
            </p>
            <p>
              Son rôle&nbsp;: coordonner, anticiper, structurer et garantir une exécution maîtrisée, du premier relevé jusqu'à la réception.
            </p>
          </div>
        </div>
      </section>

      {/* 7 — Lien d'entité */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              <Link to="/" className="text-foreground font-medium underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors">
                renovermasalledebain.com
              </Link>{" "}
              est l'expression spécialisée de cette expertise, dédiée exclusivement à la rénovation de salle de bain à Paris.
            </p>
            <div className="space-y-1 text-muted-foreground">
              <p>Deux expertises complémentaires.</p>
              <p className="font-medium text-foreground">Une même exigence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — Différenciation */}
      <section className="py-14 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border/40 bg-card p-7 md:p-9 shadow-[0_4px_24px_-4px_hsl(0_0%_0%/0.06)]">
                <h2 className="font-display text-lg font-light mb-2" style={{ color: '#124A66' }}>
                  renovermasalledebain.com
                </h2>
                <p className="text-sm font-medium text-foreground mb-3">Rénovation de salle de bain</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Contraintes d'immeubles anciens · Coordination en copropriété · Expertise technique dédiée
                </p>
              </div>
              <div className="rounded-2xl border border-border/40 bg-card p-7 md:p-9 shadow-[0_4px_24px_-4px_hsl(0_0%_0%/0.06)]">
                <h2 className="font-display text-lg font-light mb-2" style={{ color: '#124A66' }}>
                  qualirenovation.fr
                </h2>
                <p className="text-sm font-medium text-foreground mb-3">Rénovation globale</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Reconfiguration d'appartements · Chantiers d'ampleur · Pilotage maître d'œuvre complet
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9 — CTA final */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-light mb-4" style={{ color: '#124A66' }}>
              Votre projet dépasse la salle de bain ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Confiez-le à la structure dédiée aux rénovations globales.
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
