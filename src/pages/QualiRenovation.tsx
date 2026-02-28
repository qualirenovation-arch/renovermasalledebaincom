import { Layout } from "@/components/layout/Layout";
import { OGTags } from "@/components/seo/OGTags";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import artRenoverLogo from "@/assets/logos/qualirenovation-art-renover.svg";
import { QRSlideshow } from "@/components/qualirenovation/QRSlideshow";
import { Link } from "react-router-dom";
import carinaSig from "@/assets/carina-signature.svg";

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
        title="QualiRénovation – Rénovation globale à Paris | Un chantier heureux"
        description="QualiRénovation pilote des rénovations globales d'appartements et de maisons à Paris et en Île-de-France sous la coordination d'un maître d'œuvre dédié."
        path="/qualirenovation"
        coverImage="https://renovermasalledebain.com/og/default-og.jpg"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />

      {/* 1 — Hero */}
      <section className="bg-gradient-to-b from-stone to-background py-10 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-8">
                <img src={artRenoverLogo} alt="L'art de rénover by QualiRénovation" className="h-14 md:h-16 w-auto" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-5 text-primary leading-[1.1] tracking-tight">
                UN CHANTIER HEUREUX<br />
                POUR VOTRE <span className="italic font-normal text-gold">RÉNOVATION GLOBALE</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg lg:text-xl mb-8 leading-relaxed max-w-lg lg:max-w-none">
                Rénover votre appartement ou maison sans stress, grâce à un pilotage maître d'œuvre de A à Z.
              </p>
              <a
                href="https://qualirenovation.fr"
                target="_blank"
                rel="noopener"
                aria-label="Découvrir QualiRénovation – rénovation globale à Paris"
              >
                <Button variant="gold" size="lg" className="rounded-full px-10 text-base shadow-lg hover:shadow-xl transition-shadow gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Découvrir QualiRénovation
                </Button>
              </a>
            </div>

            <div className="relative order-first lg:order-last">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_hsl(0_0%_0%/0.2)]">
                <QRSlideshow />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gold/10 -z-10 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Texte principal */}
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
              Rien n'est laissé au hasard.
            </p>
          </div>
        </div>
      </section>

      {/* 3 — Signature manifeste */}
      <section className="py-14 md:py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="italic font-light leading-[1.9]"
              style={{
                fontSize: '1.2em',
                color: '#E6EEF2',
                fontFamily: "'Nunito Sans', sans-serif",
              }}
            >
              "L'exigence n'est pas une option.<br />
              C'est une méthode."
            </p>

            <div className="flex justify-end mt-6">
              <img
                src={carinaSig}
                alt="Carina N."
                className="w-[100px] md:w-[150px] opacity-90"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Autorité & Presse */}
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

      {/* 5 — Carina Nahmani */}
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

      {/* 6 — Lien d'entité */}
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
              <p className="font-medium text-foreground">Une même signature.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — Différenciation */}
      <section className="py-14 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border/40 bg-card p-7 md:p-9 shadow-[0_4px_24px_-4px_hsl(0_0%_0%/0.06)]">
                <h2 className="font-display text-lg font-light mb-2 text-primary">
                  renovermasalledebain.com
                </h2>
                <p className="text-sm font-medium text-foreground mb-3">Rénovation de salle de bain</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Contraintes d'immeubles anciens · Coordination en copropriété · Expertise technique dédiée
                </p>
              </div>
              <div className="rounded-2xl border border-border/40 bg-card p-7 md:p-9 shadow-[0_4px_24px_-4px_hsl(0_0%_0%/0.06)]">
                <h2 className="font-display text-lg font-light mb-2 text-primary">
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

      {/* 8 — CTA final */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-light mb-4 text-primary">
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
