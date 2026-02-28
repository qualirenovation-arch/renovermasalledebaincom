import { Layout } from "@/components/layout/Layout";
import { OGTags } from "@/components/seo/OGTags";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
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

      {/* Hero */}
      <section className="bg-gradient-to-b from-stone to-background pt-16 md:pt-24 lg:pt-32 pb-8 md:pb-12">
        <div className="container mx-auto px-4 text-center md:text-left">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary leading-[1.1] tracking-tight mb-5 md:mb-7">
            UN CHANTIER<br />
            HEUREUX<br />
            POUR VOTRE <span className="italic font-normal text-gold">RÉNOVATION GLOBALE</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl font-light">
            Rénover votre appartement ou votre maison sans stress, sans mauvaises surprises, grâce à une coordination maîtrisée et un accompagnement de A&nbsp;à&nbsp;Z.
          </p>
        </div>
      </section>

      {/* Section principale : texte + photos */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto items-start">

            {/* Colonne gauche — Texte narratif */}
            <div className="space-y-7 text-muted-foreground leading-relaxed text-base md:text-lg">
              <p>
                <Link to="/" className="text-foreground font-medium underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors">
                  renovermasalledebain.com
                </Link>{" "}
                est né de l'ampleur des rénovations que nous avons réalisées ces dernières années.
              </p>
              <p>
                Face aux nombreuses demandes ciblées sur la salle de bain — parfois la cuisine — nous avons souhaité mettre en avant ce savoir-faire spécifique pour les clients qui souhaitent rénover un espace précis, sans engager une rénovation complète.
              </p>
              <p className="font-medium text-foreground">
                Mais derrière cette spécialisation, il y a une structure plus large.
              </p>
              <p>
                <strong className="text-foreground">QualiRénovation</strong> conçoit et pilote des rénovations globales d'appartements et de maisons à Paris et en Île-de-France. Chaque projet est envisagé comme un ensemble cohérent&nbsp;: structure, volumes, circulation, lumière, matériaux et précision d'exécution.
              </p>
              <div className="space-y-1 pt-1">
                <p>La maîtrise d'œuvre est intégrée.</p>
                <p>La coordination est rigoureuse.</p>
                <p>Les décisions techniques sont anticipées.</p>
              </div>
              <p className="font-medium text-foreground">
                Rien n'est laissé au hasard.
              </p>
              <p>
                Les projets sont pilotés par <strong className="text-foreground">Carina Nahmani</strong>, maître d'œuvre, référente sur les chantiers parisiens et spécialiste des environnements en copropriété. Son rôle&nbsp;: coordonner, structurer et garantir une exécution maîtrisée, du premier devis jusqu'à la réception.
              </p>
              <p>
                Une expertise relayée par des médias de référence tels que{" "}
                <Link to="/presse" className="text-foreground underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors">
                  Houzz, Marie&nbsp;Claire&nbsp;Maison et Castorama
                </Link>, qui soulignent une approche exigeante de la rénovation en appartement ancien et en contexte parisien.
              </p>

              {/* Bloc signature expert */}
              <div className="mt-10 rounded-xl bg-primary px-6 py-8 md:px-8 md:py-10">
                <p
                  className="italic font-light leading-[1.9] text-white/90"
                  style={{
                    fontSize: '1.15em',
                    fontFamily: "'Nunito Sans', sans-serif",
                  }}
                >
                  "L'exigence n'est pas une option.<br />
                  C'est une méthode."
                </p>
                <div className="mt-4 flex justify-end">
                  <img
                    src={carinaSig}
                    alt="Carina N."
                    className="w-[100px] md:w-[150px] brightness-0 invert"
                  />
                </div>
              </div>
            </div>

            {/* Colonne droite — Photos */}
            <div className="order-first lg:order-last">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_hsl(0_0%_0%/0.2)] sticky top-8">
                <QRSlideshow />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
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
