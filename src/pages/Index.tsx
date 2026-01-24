import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, Phone, Pencil, Gem, Wrench, Play, Sparkles, ChevronRight, Newspaper, BookOpen, Video } from "lucide-react";
import jemmapes1 from "@/assets/jemmapes-1.jpg";
import vincennesMr1 from "@/assets/vincennes-mr-1.jpg";
import nicolasRoretDouche from "@/assets/nicolas-roret-douche.jpg";
import { presseNews, guideConseils, videoConseils } from "@/data/newsData";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";
import { Recompenses } from "@/components/layout/Recompenses";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

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
      {/* Bandeau Actualités */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/20 to-primary/10 border-b border-border">
        <div className="container-custom py-3">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm">
            {latestPresse && (
              <a 
                href={latestPresse.externalLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Newspaper className="w-4 h-4 text-primary" />
                <span className="hidden sm:inline font-medium text-foreground">Presse :</span>
                <span className="group-hover:underline line-clamp-1">{latestPresse.source} — {latestPresse.title}</span>
              </a>
            )}
            
            <span className="hidden md:block text-border">|</span>
            
            {latestGuide && (
              <Link 
                to={latestGuide.link}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="hidden sm:inline font-medium text-foreground">Guide :</span>
                <span className="group-hover:underline line-clamp-1">{latestGuide.title}</span>
              </Link>
            )}
            
            <span className="hidden lg:block text-border">|</span>
            
            {latestVideo && (
              latestVideo.link ? (
                <Link 
                  to={latestVideo.link}
                  className="hidden lg:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Video className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">Vidéo :</span>
                  <span className="group-hover:underline line-clamp-1">{latestVideo.title}</span>
                </Link>
              ) : (
                <a 
                  href={latestVideo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden lg:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Video className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">Vidéo :</span>
                  <span className="group-hover:underline line-clamp-1">{latestVideo.title}</span>
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Hero Section - Premium design */}
      <section className="bg-gradient-to-b from-stone to-background py-10 md:py-16 lg:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-foreground leading-[1.1] tracking-tight">
                RÉNOVEZ VOTRE<br />
                SALLE DE <span className="italic font-normal text-gold">BAIN</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg lg:text-xl mb-6 md:mb-8 leading-relaxed max-w-lg lg:max-w-none">
                Conception et réalisation sur mesure à Paris & Île-de-France
              </p>
              {/* CTA visible sans scroll sur mobile */}
              <Button 
                variant="gold" 
                size="lg" 
                asChild 
                className="rounded-full px-10 w-full sm:w-auto text-base"
              >
                <Link to="/devis#devis-form">
                  DEMANDER UN DEVIS GRATUIT
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              className="relative order-first lg:order-last"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_hsl(0_0%_0%/0.2)]">
                <img
                  src={jemmapes1}
                  alt="Douche à l'italienne moderne"
                  className="w-full h-full object-cover object-[25%_center] hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gold/10 -z-10 hidden lg:block" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section avantages - Premium cards */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {advantages.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 p-5 md:p-6 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base md:text-lg mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignages - Slider compact */}
      <TestimonialsSlider />

      {/* Section "Douche ou baignoire ?" - Condensée pour mobile */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-6 md:mb-12"
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <h2 className="font-display text-xl md:text-3xl lg:text-4xl mb-3 md:mb-6">
              <span className="italic font-normal">Douche</span> ou <span className="italic font-normal">baignoire</span> ?
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
              La vraie question : <strong>comment vivez-vous votre salle de bain ?</strong>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto mb-8 md:mb-12">
            {/* Baignoire */}
            <motion.div
              className="bg-stone rounded-xl p-5 md:p-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-wood/10 flex items-center justify-center">
                  <svg className="w-5 h-5 md:w-7 md:h-7 text-wood" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z"/>
                    <path d="M6 12V5a2 2 0 0 1 2-2h3"/>
                    <circle cx="12" cy="5" r="1"/>
                  </svg>
                </div>
                <h3 className="font-display text-lg md:text-xl font-semibold">Plutôt baignoire</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-center gap-2"><span className="text-wood">•</span>Vous aimez prendre le temps</li>
                <li className="flex items-center gap-2"><span className="text-wood">•</span>Vous avez des enfants</li>
                <li className="flex items-center gap-2"><span className="text-wood">•</span>Côté cocooning et intemporel</li>
              </ul>
            </motion.div>

            {/* Douche */}
            <motion.div
              className="bg-accent/30 rounded-xl p-5 md:p-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-foreground/10 flex items-center justify-center">
                  <svg className="w-5 h-5 md:w-7 md:h-7 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V4a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4z"/>
                    <path d="M6 8v2m3-2v4m3-4v2m3-2v4"/>
                    <path d="M10 8v12"/>
                  </svg>
                </div>
                <h3 className="font-display text-lg md:text-xl font-semibold">Plutôt douche</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-center gap-2"><span className="text-wood">•</span>Praticité au quotidien</li>
                <li className="flex items-center gap-2"><span className="text-wood">•</span>Gain d'espace</li>
                <li className="flex items-center gap-2"><span className="text-wood">•</span>Accessibilité et fluidité</li>
              </ul>
            </motion.div>
          </div>

          {/* Notre rôle - Compact */}
          <motion.div
            className="max-w-2xl mx-auto text-center bg-foreground/5 rounded-xl p-5 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-wood" strokeWidth={2} />
              <span className="font-display font-semibold text-base md:text-lg">Notre rôle</span>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Vous guider vers le bon choix pour vous. Chaque projet est unique.
            </p>
          </motion.div>

          <motion.div 
            className="text-center mt-6 md:mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Button variant="outline" size="default" asChild className="rounded-md border-foreground text-foreground hover:bg-foreground hover:text-background">
              <Link to="/guide-travaux">Consulter le guide</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section Réalisations - Premium gallery */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-stone to-background">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-8 md:mb-12"
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <div className="section-divider" />
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4">
              Nos plus belles réalisations
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
              Inspirez-vous de nos projets réalisés avec soin et élégance.
            </p>
          </motion.div>

          {/* Tags de style - scrollable sur mobile */}
          <div className="flex gap-2 mb-8 md:mb-12 overflow-x-auto pb-2 scrollbar-hide md:justify-center md:flex-wrap">
            {styleTags.map((tag, index) => (
              <span key={index} className={`${tag.className} whitespace-nowrap flex-shrink-0`}>
                {tag.label}
              </span>
            ))}
          </div>

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
                <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-1">{project.style}</h3>
                <p className="text-muted-foreground text-sm mb-2">{project.location}</p>
                <span className="tag-beige text-xs">{project.tag}</span>
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
      <section className="py-12 md:py-20 bg-background">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <div className="section-divider" />
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4">
              Un projet personnalisé
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Nous vous accompagnons de A à Z.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              { icon: "💬", title: "Conseils personnalisés", desc: "Écoute & expertise" },
              { icon: "📦", title: "Choix matériaux", desc: "Qualité premium" },
              { icon: "✓", title: "Garantie décennale", desc: "Sérénité totale" },
              { icon: "⏱", title: "Délais respectés", desc: "Planning maîtrisé" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-5 md:p-6 bg-card rounded-2xl border border-border/50 hover:border-gold/30 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-3 md:mb-4 text-2xl md:text-3xl">
                  {item.icon}
                </div>
                <h3 className="font-display text-sm md:text-base font-semibold mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm hidden md:block">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Distinctions Houzz */}
      <Recompenses />


      {/* CTA Final - Premium dark section */}
      <section className="py-14 md:py-20 bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-1 rounded-full bg-gold mx-auto mb-6" />
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 md:mb-5">
              Prêt à transformer votre salle de bain ?
            </h2>
            <p className="text-primary-foreground/70 text-base md:text-lg mb-8 md:mb-10">
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
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
