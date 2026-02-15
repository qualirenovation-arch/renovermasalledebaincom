import { Link } from "react-router-dom";
import houzzBestOf2026Photo from "@/assets/logos/houzz-best-of-2026-photo-award.png";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { ArrowRight, Phone, Pencil, Gem, Wrench, Play, Sparkles, ChevronRight, Newspaper, BookOpen, Video } from "lucide-react";
import jemmapes1 from "@/assets/jemmapes-1.jpg";
import heroImage from "@/assets/houzz-base-photo.jpg";
import vincennesMr1 from "@/assets/vincennes-mr-1.jpg";
import nicolasRoretDouche from "@/assets/nicolas-roret-douche.jpg";
import { presseNews, guideConseils, videoConseils } from "@/data/newsData";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";
import { Recompenses } from "@/components/layout/Recompenses";
import { PartnerCTA } from "@/components/home/PartnerCTA";
import { OGTags } from "@/components/seo/OGTags";

// Section "Pourquoi choisir" - 3 colonnes avec pictos SVG
const whyChoose = [
  {
    icon: (
      <svg className="w-12 h-12 mx-auto" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="12" r="8" />
        <path d="M24 20v20" />
        <path d="M18 44h12" strokeLinecap="round" />
      </svg>
    ),
    title: "Imaginez",
    description: "Inspirez-vous de nos réalisations et choisissez votre style : minimaliste, naturel, contemporain..."
  },
  {
    icon: (
      <svg className="w-12 h-12 mx-auto" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="24" cy="24" rx="6" ry="14" />
        <path d="M24 10v28" />
        <path d="M18 16c2-2 4-3 6-3s4 1 6 3" />
        <path d="M18 32c2 2 4 3 6 3s4-1 6-3" />
      </svg>
    ),
    title: "Personnalisez",
    description: "Choisissez les matériaux, les textures, les équipements et les finitions qui correspondent à vos envies."
  },
  {
    icon: (
      <svg className="w-12 h-12 mx-auto" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 20c6-6 12-4 16 0s10 6 16 0" strokeLinecap="round" />
        <path d="M8 28c6-6 12-4 16 0s10 6 16 0" strokeLinecap="round" />
        <path d="M8 36c6-6 12-4 16 0s10 6 16 0" strokeLinecap="round" />
      </svg>
    ),
    title: "Réalisez",
    description: "Nos experts vous accompagnent de la conception à la réalisation, pour un résultat clé en main."
  }
];

// Section avantages avec pictos minimalistes
const advantages = [
  {
    icon: Pencil,
    title: "Conception sur mesure",
    description: "Des solutions personnalisées pour votre salle de bains"
  },
  {
    icon: Gem,
    title: "Matériaux de qualité",
    description: "Une sélection de matériaux durables et esthétiques"
  },
  {
    icon: Wrench,
    title: "Installation professionnelle",
    description: "Des experts qualifiés pour des résultats fiables"
  }
];

// Tags de style pour la galerie
const styleTags = [
  { label: "Style naturel", className: "tag-beige" },
  { label: "Minimaliste", className: "tag-mint" },
  { label: "Effet marbre", className: "tag-blue" },
  { label: "Graphique", className: "tag-peach" }
];

export default function Index() {
  // Récupérer les dernières actualités
  const latestPresse = presseNews.slice(0, 1)[0];
  const latestGuide = guideConseils.slice(0, 1)[0];
  const latestVideo = videoConseils.find(v => (v.instagramUrl && !v.instagramUrl.includes("VOTRE_LIEN_ICI")) || v.link);

  return (
    <Layout>
      <OGTags
        title="Rénovation salle de bain Paris"
        description="Rénovation de salle de bain haut de gamme à Paris et Île-de-France. Conception + réalisation clé en main. Un chantier heureux, maîtrisé de A à Z."
        path="/"
        image={{ type: "default" }}
      />
      {/* Hero Section - Premium design */}
      <section className="bg-gradient-to-b from-stone to-background py-12 md:py-20 lg:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <ScrollAnimation variant="fadeUp" className="text-center lg:text-left">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-5 md:mb-7 text-foreground leading-[1.1] tracking-tight">
                UN CHANTIER HEUREUX<br />
                POUR VOTRE <span className="italic font-normal text-gold">SALLE DE BAIN</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg lg:text-xl mb-8 md:mb-10 leading-relaxed max-w-lg lg:max-w-none">
                Rénover votre salle de bain sans stress, sans mauvaises surprises, grâce à une conception maîtrisée et un accompagnement de A à Z.
              </p>
              <Button 
                variant="gold" 
                size="lg" 
                asChild 
                className="rounded-full px-10 w-full sm:w-auto text-base shadow-lg hover:shadow-xl transition-shadow"
              >
                <Link to="/devis#devis-form">
                  LANCER MON PROJET
                </Link>
              </Button>
            </ScrollAnimation>
            
            <ScrollAnimation 
              variant="scale" 
              delay={0.2}
              className="relative order-first lg:order-last"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_hsl(0_0%_0%/0.2)]">
                <img
                  src={heroImage}
                  alt="Salle de bain moderne marbre blanc"
                  className="w-full h-full object-cover object-[25%_center] hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gold/10 -z-10 hidden lg:block" />
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Bandeau Best of Houzz */}
      <section className="py-8 md:py-12 bg-primary/5 border-y border-primary/10">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
          <div className="transition-all duration-300 hover:scale-110 cursor-pointer">
            <img 
              src={houzzBestOf2026Photo} 
              alt="Lauréat Best of Houzz 2026 – Photo" 
              className="h-24 md:h-32" 
            />
          </div>
          <div className="text-center sm:text-left max-w-2xl">
            <p className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">Lauréat Best of Houzz 2026 🏆</p>
            <div className="text-muted-foreground text-sm md:text-base leading-relaxed space-y-3">
              <p><strong className="text-foreground">Cette distinction récompense bien plus qu'une photo.</strong><br />Elle célèbre une équipe.</p>
              <p>Plus de 20 professionnels sur le terrain et une équipe de conception engagée pour viser l'excellence, projet après projet.</p>
              <p>Merci à nos clients pour leur confiance.<br />
              Merci à <strong>Thierry Pelmard</strong>, notre architecte partenaire, pour plus de 60 chantiers réalisés ensemble.<br />
              Merci à <strong>Stéphane Vasco</strong> et <strong>Noah</strong>, qui capturent et subliment notre savoir-faire pour partager avec vous l'envers du décor et nos conseils techniques.</p>
              <p className="italic font-medium text-foreground">Une aventure humaine. Une exigence partagée.<br />Vous ne regarderez plus la rénovation de la même façon.</p>
              <div className="flex flex-wrap gap-3 mt-4 justify-center sm:justify-start">
                <a href="https://www.houzz.fr/best-of-houzz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                  🏅 Best of Houzz
                </a>
                <a href="https://www.houzz.fr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                  🏠 Houzz France
                </a>
                <a href="https://www.houzz.fr/pro/qualirenovation/qualirenovation-by-qualiconcept" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                  ⭐ Notre profil Houzz Pro
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section avantages - Premium cards */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8" staggerDelay={0.12}>
            {advantages.map((item, index) => (
              <StaggerItem key={index}>
                <div className="flex items-start gap-4 p-6 md:p-8 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-lg hover:border-gold/30 transition-all duration-300 h-full">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg md:text-xl mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section Témoignages - Slider compact */}
      <TestimonialsSlider />

      {/* Section "Douche ou baignoire ?" */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container-custom">
          <ScrollAnimation className="text-center mb-8 md:mb-14">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6">
              <span className="italic font-normal">Douche</span> ou <span className="italic font-normal">baignoire</span> ?
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              La vraie question : <strong>comment vivez-vous votre salle de bain ?</strong>
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 max-w-4xl mx-auto mb-10 md:mb-14">
            {/* Baignoire */}
            <ScrollAnimation variant="fadeLeft" delay={0.1}>
              <div className="bg-stone rounded-2xl p-6 md:p-10 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-wood/10 flex items-center justify-center">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-wood" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z"/>
                      <path d="M6 12V5a2 2 0 0 1 2-2h3"/>
                      <circle cx="12" cy="5" r="1"/>
                    </svg>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold">Plutôt baignoire</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3"><span className="text-wood text-lg">•</span>Vous aimez prendre le temps</li>
                  <li className="flex items-center gap-3"><span className="text-wood text-lg">•</span>Vous avez des enfants</li>
                  <li className="flex items-center gap-3"><span className="text-wood text-lg">•</span>Côté cocooning et intemporel</li>
                </ul>
              </div>
            </ScrollAnimation>

            {/* Douche */}
            <ScrollAnimation variant="fadeRight" delay={0.2}>
              <div className="bg-accent/30 rounded-2xl p-6 md:p-10 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-foreground/10 flex items-center justify-center">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V4a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4z"/>
                      <path d="M6 8v2m3-2v4m3-4v2m3-2v4"/>
                      <path d="M10 8v12"/>
                    </svg>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold">Plutôt douche</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3"><span className="text-wood text-lg">•</span>Praticité au quotidien</li>
                  <li className="flex items-center gap-3"><span className="text-wood text-lg">•</span>Gain d'espace</li>
                  <li className="flex items-center gap-3"><span className="text-wood text-lg">•</span>Accessibilité et fluidité</li>
                </ul>
              </div>
            </ScrollAnimation>
          </div>

          {/* Notre rôle */}
          <ScrollAnimation delay={0.3}>
            <div className="max-w-2xl mx-auto text-center bg-foreground/5 rounded-2xl p-6 md:p-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-wood" strokeWidth={2} />
                <span className="font-display font-semibold text-lg md:text-xl">Notre rôle</span>
              </div>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Vous guider vers le bon choix pour vous. Chaque projet est unique.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.4} className="text-center mt-8 md:mt-12">
            <Button variant="outline" size="lg" asChild className="rounded-full border-foreground text-foreground hover:bg-foreground hover:text-background">
              <Link to="/guide-travaux">Consulter le guide</Link>
            </Button>
          </ScrollAnimation>
        </div>
      </section>

      {/* Section Réalisations - Premium gallery */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-stone to-background">
        <div className="container-custom">
          <ScrollAnimation className="text-center mb-10 md:mb-14">
            <div className="section-divider" />
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 md:mb-5">
              Nos plus belles réalisations
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Inspirez-vous de nos projets réalisés avec soin et élégance.
            </p>
          </ScrollAnimation>

          <ScrollAnimation delay={0.1}>
            <div className="flex gap-2 mb-10 md:mb-14 overflow-x-auto pb-2 scrollbar-hide md:justify-center md:flex-wrap">
              {styleTags.map((tag, index) => (
                <span key={index} className={`${tag.className} whitespace-nowrap flex-shrink-0`}>
                  {tag.label}
                </span>
              ))}
            </div>
          </ScrollAnimation>

          {/* Carrousel mobile / Grille desktop */}
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0">
            {[
              { img: jemmapes1, style: "Élégance parisienne", location: "Paris 10ème", tag: "Douche italienne", borderClass: "photo-card-beige" },
              { img: vincennesMr1, style: "Contemporain épuré", location: "Vincennes", tag: "Finitions soignées", borderClass: "photo-card-terracotta" },
              { img: nicolasRoretDouche, style: "Zellige & Laiton", location: "Paris 13ème", tag: "Robinetterie dorée", borderClass: "photo-card-mint" }
            ].map((project, index) => (
              <motion.div
                key={index}
                className="group min-w-[80vw] md:min-w-0 snap-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className={`aspect-[3/4] ${project.borderClass} mb-4 md:mb-5 overflow-hidden`}>
                  <img
                    src={project.img}
                    alt={`${project.style} ${project.location}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-1 text-center">{project.style}</h3>
                <p className="text-muted-foreground text-sm mb-2 text-center">{project.location}</p>
                <div className="text-center">
                  <span className="tag-beige text-xs">{project.tag}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 md:mt-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <Link to="/realisations">
                Voir tous nos projets
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button 
              variant="default" 
              size="lg" 
              asChild 
              className="w-full sm:w-auto"
            >
              <a 
                href="https://www.instagram.com/reel/DEc8OANsV-j/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Play className="w-4 h-4 mr-2" />
                Découvrir en vidéo
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section Projet personnalisé - Premium cards */}
      <section className="py-14 md:py-24 bg-background">
        <div className="container-custom">
          <ScrollAnimation className="text-center max-w-3xl mx-auto mb-12 md:mb-18">
            <div className="section-divider" />
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 md:mb-5">
              Un projet personnalisé
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Nous vous accompagnons de A à Z.
            </p>
          </ScrollAnimation>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 max-w-5xl mx-auto" staggerDelay={0.1}>
            {[
              { icon: "💬", title: "Conseils personnalisés", desc: "Écoute & expertise" },
              { icon: "📦", title: "Choix matériaux", desc: "Qualité premium" },
              { icon: "✓", title: "Garantie décennale", desc: "Sérénité totale" },
              { icon: "⏱", title: "Délais respectés", desc: "Planning maîtrisé" }
            ].map((item, index) => (
              <StaggerItem key={index}>
                <div className="text-center p-6 md:p-8 bg-card rounded-2xl border border-border/50 hover:border-gold/30 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4 md:mb-5 text-3xl md:text-4xl">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-sm md:text-base font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm hidden md:block">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Distinctions Houzz */}
      <Recompenses />

      {/* CTA Partenaires / Recrutement */}
      <PartnerCTA />


      {/* CTA Final - Premium dark section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <ScrollAnimation>
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-1 rounded-full bg-gold mx-auto mb-8" />
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 md:mb-6">
                Prêt à transformer votre salle de bain ?
              </h2>
              <p className="text-primary-foreground/70 text-base md:text-lg mb-10 md:mb-12">
                Visite technique gratuite • Accompagnement de A à Z
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="gold"
                  size="lg" 
                  asChild
                  className="w-full sm:w-auto"
                >
                  <Link to="/devis#devis-form">
                    Devis gratuit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  asChild
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto"
                >
                  <a href="tel:+33659764685">
                    <Phone className="w-5 h-5 mr-2" />
                    06 59 76 46 85
                  </a>
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </Layout>
  );
}
