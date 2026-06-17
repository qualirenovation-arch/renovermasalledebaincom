import { Layout } from "@/components/layout/Layout";
import { OGTags } from "@/components/seo/OGTags";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Compass, Ruler, Wallet, ShowerHead, Droplets, Bath, ShieldCheck, Wrench, Calculator, type LucideIcon } from "lucide-react";
import qrLogo from "@/assets/logos/qualirenovation-logo-hor-pos.svg";
import carinaSig from "@/assets/carina-signature.svg";
import heroImg from "@/assets/hero-shower.jpg";

// Plateforme guides — sera bascul\u00e9e vers https://guide.renovermasalledebain.com
// d\u00e8s que le CNAME sera en place. Le visiteur voit toujours l'URL /guides ici.
const PLATFORM_BASE = "https://qualirenovation.les-freres-salamon.com";
const UTM = "utm_source=renovermasalledebain&utm_medium=lp&utm_campaign=guides_gratuits";
const platformUrl = (path = "") => `${PLATFORM_BASE}${path}${path.includes("?") ? "&" : "?"}${UTM}`;

type GuideCard = {
  slug: string;
  title: string;
  summary: string;
  icon: LucideIcon;
};

const GUIDES: GuideCard[] = [
  { slug: "cadrer-son-projet", title: "Cadrer son projet de r\u00e9novation", summary: "Poser les bonnes questions avant tout devis : usage, contraintes, ambitions.", icon: Compass },
  { slug: "estimer-surface", title: "Estimer sa surface et son p\u00e9rim\u00e8tre", summary: "Mesurer juste pour comparer les devis sans mauvaise surprise.", icon: Ruler },
  { slug: "maitriser-budget", title: "Ma\u00eetriser son budget", summary: "Comprendre o\u00f9 part chaque euro : main-d'\u0153uvre, fournitures, al\u00e9as.", icon: Wallet },
  { slug: "douche-italienne", title: "Concevoir une douche \u00e0 l'italienne", summary: "Pente, \u00e9vacuation, parois : les r\u00e8gles d'une douche durable.", icon: ShowerHead },
  { slug: "receveur-douche", title: "Choisir son receveur de douche", summary: "Extra-plat, \u00e0 carreler, r\u00e9sine : trancher selon votre configuration.", icon: Bath },
  { slug: "meuble-vasque", title: "Choisir son meuble vasque", summary: "Suspendu, sur pieds, double vasque : ergonomie et rangement.", icon: Droplets },
  { slug: "etancheite", title: "R\u00e9ussir l'\u00e9tanch\u00e9it\u00e9", summary: "SEL, SPEC, DTU 52.2 : les piliers techniques d'une salle de bain saine.", icon: ShieldCheck },
  { slug: "plomberie", title: "Comprendre la plomberie", summary: "Alimentation, \u00e9vacuation, ventilation : les bases pour dialoguer avec votre artisan.", icon: Wrench },
  { slug: "budget-renovation", title: "Construire son budget", summary: "M\u00e9thode pas \u00e0 pas pour b\u00e2tir un budget r\u00e9aliste et tenu.", icon: Calculator },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Guides gratuits \u2014 R\u00e9nover sa salle de bain",
  "description": "Guides interactifs gratuits con\u00e7us par des ma\u00eetres d'\u0153uvre parisiens pour comprendre, d\u00e9cider, budg\u00e9ter et piloter votre r\u00e9novation de salle de bain.",
  "url": "https://renovermasalledebain.com/guides",
  "publisher": {
    "@type": "Organization",
    "name": "QualiR\u00e9novation \u2014 Les Fr\u00e8res Salamon",
    "url": "https://renovermasalledebain.com"
  }
};

const Guides = () => {
  return (
    <Layout>
      <OGTags
        title="Guides gratuits \u2014 R\u00e9nover sa salle de bain"
        description="Un guide interactif gratuit con\u00e7u par des ma\u00eetres d'\u0153uvre parisiens. Comprendre, d\u00e9cider, budg\u00e9ter et piloter votre r\u00e9novation \u2014 sans jargon."
        path="/guides"
        coverImage="https://renovermasalledebain.com/og/default-og.jpg"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone to-background pt-16 md:pt-24 lg:pt-28 pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src={qrLogo} alt="QualiR\u00e9novation" className="h-8 w-auto" style={{ mixBlendMode: "multiply" }} />
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-light">Le Guide</span>
              </div>
              <h1 className="font-light text-4xl md:text-5xl lg:text-6xl leading-tight text-primary mb-6">
                R\u00e9nover sa salle de bain<br />
                <span className="italic text-gold-dark">sans mauvaises surprises.</span>
              </h1>
              <p className="text-lg md:text-xl font-light text-foreground/80 mb-10 max-w-xl">
                Un guide interactif con\u00e7u par des ma\u00eetres d'\u0153uvre parisiens.
                Comprendre, d\u00e9cider, budg\u00e9ter et piloter votre projet \u2014 sans jargon.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground min-h-[44px] text-base font-light tracking-wide">
                  <a href={platformUrl("/guide")} target="_blank" rel="noopener noreferrer">
                    D\u00e9couvrir les guides
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground min-h-[44px] text-base font-light tracking-wide">
                  <a href={platformUrl("/diagnostic")} target="_blank" rel="noopener noreferrer">
                    Faire mon diagnostic
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground font-light mt-6">
                Acc\u00e8s libre \u00b7 sans inscription \u00b7 con\u00e7u par Carina Nahmani &amp; Les Fr\u00e8res Salamon
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-[var(--shadow-lg)]">
                <img src={heroImg} alt="Salle de bain r\u00e9nov\u00e9e par Les Fr\u00e8res Salamon" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background border-2 border-gold/30 px-6 py-4 hidden md:block">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-light">200+ chantiers</p>
                <p className="text-lg text-primary font-light">livr\u00e9s \u00e0 Paris</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GUIDES LIST */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12 md:mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-gold-dark font-light mb-4">Les guides disponibles</p>
            <h2 className="text-3xl md:text-4xl font-light text-primary leading-tight">
              Neuf guides pour piloter chaque \u00e9tape de votre projet.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GUIDES.map(({ slug, title, summary, icon: Icon }) => (
              <a
                key={slug}
                href={platformUrl(`/guide/${slug}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-7 bg-card border-2 border-border hover:border-gold/60 transition-colors min-h-[44px]"
              >
                <Icon className="h-7 w-7 text-gold-dark mb-5" strokeWidth={1.25} />
                <h3 className="text-lg text-primary font-light mb-3 leading-snug">{title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-5">{summary}</p>
                <span className="inline-flex items-center text-sm text-primary font-light tracking-wide group-hover:text-gold-dark transition-colors">
                  Lire le guide <ExternalLink className="ml-2 h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WHY FREE */}
      <section className="py-16 md:py-24 bg-stone">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-gold-dark font-light mb-6">Pourquoi c'est gratuit</p>
            <p className="text-2xl md:text-3xl font-light text-primary leading-relaxed">
              Parce qu'un client inform\u00e9 fait un meilleur projet.
            </p>
            <p className="text-base md:text-lg font-light text-foreground/75 mt-6 leading-relaxed">
              Nous partageons notre m\u00e9thode, nos chiffres et nos pi\u00e8ges terrain \u2014 librement.
              Vous repartez avec les bons r\u00e9flexes, m\u00eame si vous ne travaillez jamais avec nous.
            </p>
          </div>
        </div>
      </section>

      {/* AUTHORS */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_auto] gap-10 items-center border-y-2 border-border py-12 md:py-16">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-gold-dark font-light mb-4">Les auteurs</p>
              <h2 className="text-2xl md:text-3xl font-light text-primary mb-4 leading-snug">
                Carina Nahmani &amp; Les Fr\u00e8res Salamon
              </h2>
              <p className="text-base font-light text-foreground/75 leading-relaxed">
                Ma\u00eetres d'\u0153uvre parisiens, plus de 200 chantiers livr\u00e9s.
                Sp\u00e9cialistes de la r\u00e9novation de salle de bain en appartement haussmannien et copropri\u00e9t\u00e9.
              </p>
            </div>
            <img src={carinaSig} alt="Signature Carina Nahmani" className="h-20 md:h-24 w-auto justify-self-center md:justify-self-end" style={{ mixBlendMode: "multiply" }} />
          </div>
        </div>
      </section>

      {/* AFTER / DIAGNOSTIC CTA */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-xs tracking-[0.2em] uppercase text-gold-light font-light mb-6">Et apr\u00e8s ?</p>
          <h2 className="text-3xl md:text-5xl font-light leading-tight mb-6">
            Votre projet m\u00e9rite un <span className="italic text-gold-light">diagnostic personnalis\u00e9</span>.
          </h2>
          <p className="text-base md:text-lg font-light text-primary-foreground/80 mb-10 leading-relaxed">
            Un questionnaire de 5 minutes pour qualifier votre projet, identifier les points d'attention
            et recevoir une premi\u00e8re estimation r\u00e9aliste.
          </p>
          <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-gold-foreground min-h-[44px] text-base font-light tracking-wide">
            <a href={platformUrl("/diagnostic")} target="_blank" rel="noopener noreferrer">
              Lancer mon diagnostic
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Guides;