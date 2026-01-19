import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, Phone, Pencil, Gem, Wrench, Play, Sparkles, ChevronRight, Newspaper, BookOpen, Video } from "lucide-react";
import jemmapes1 from "@/assets/jemmapes-1.jpg";
import vincennesMr1 from "@/assets/vincennes-mr-1.jpg";
import nicolasRoretDouche from "@/assets/nicolas-roret-douche.jpg";
import { presseNews, guideConseils, videoConseils } from "@/data/newsData";

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
  const latestVideo = videoConseils.find(v => v.instagramUrl && !v.instagramUrl.includes("VOTRE_LIEN_ICI"));

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
            )}
          </div>
        </div>
      </div>

      {/* Hero Section - Style épuré beige */}
      <section className="bg-stone py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
                RÉNOVEZ VOTRE<br />
                SALLE DE<br />
                <span className="italic font-normal">BAIN</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl mb-8">
                Conception et réalisation<br />
                de salles de bain sur mesure
              </p>
              <Button 
                variant="default" 
                size="lg" 
                asChild 
                className="bg-[hsl(38,50%,50%)] hover:bg-[hsl(38,50%,45%)] text-white rounded-md px-8"
              >
                <Link to="/devis">
                  DEMANDER UN DEVIS
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src={jemmapes1}
                  alt="Douche à l'italienne moderne"
                  className="w-full h-full object-cover object-[25%_center]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section avantages en ligne */}
      <section className="py-12 border-y border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex-shrink-0">
                  <item.icon className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section "Douche ou baignoire ?" */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-6">
              <span className="italic font-normal">Douche</span> ou <span className="italic font-normal">baignoire</span> : laquelle choisir ?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              La vraie question n'est pas italienne ou pas, mais : <strong>comment vivez-vous votre salle de bain ?</strong><br />
              Plutôt douche rapide et efficace ou bain détente pour décompresser ?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Baignoire */}
            <motion.div
              className="bg-stone rounded-2xl p-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-14 h-14 rounded-full bg-wood/10 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-wood" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z"/>
                  <path d="M6 12V5a2 2 0 0 1 2-2h3"/>
                  <circle cx="12" cy="5" r="1"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold mb-4">Vous êtes plutôt baignoire si :</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-wood">•</span>
                  <span>Vous aimez prendre le temps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-wood">•</span>
                  <span>Vous avez des enfants</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-wood">•</span>
                  <span>Vous cherchez un côté cocooning et intemporel</span>
                </li>
              </ul>
            </motion.div>

            {/* Douche */}
            <motion.div
              className="bg-accent/30 rounded-2xl p-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-14 h-14 rounded-full bg-foreground/10 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V4a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4z"/>
                  <path d="M6 8v2m3-2v4m3-4v2m3-2v4"/>
                  <path d="M10 8v12"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold mb-4">Vous êtes plutôt douche si :</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-wood">•</span>
                  <span>Vous voulez de la praticité au quotidien</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-wood">•</span>
                  <span>Vous manquez d'espace</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-wood">•</span>
                  <span>Vous privilégiez l'accessibilité et la fluidité</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Pourquoi c'est important */}
          <motion.div
            className="max-w-3xl mx-auto text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 text-wood" strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-xl font-semibold mb-4">Pourquoi c'est important ?</h3>
            <p className="text-muted-foreground leading-relaxed">
              La salle de bain, c'est la première pièce que l'on utilise le matin.<br />
              Une belle salle de bain bien pensée, c'est commencer la journée du bon pied,<br />
              dans un espace <strong>fonctionnel, harmonieux et agréable</strong>.
            </p>
          </motion.div>

          {/* Notre rôle */}
          <motion.div
            className="max-w-3xl mx-auto text-center bg-foreground/5 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <ChevronRight className="w-5 h-5 text-wood" strokeWidth={2} />
              <span className="font-display font-semibold text-lg">Notre rôle</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Vous guider vers le bon choix pour vous, pas une solution toute faite.<br />
              Chaque projet est unique… et chaque réveil mérite une salle de bain à la hauteur.
            </p>
          </motion.div>

          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Button variant="outline" size="lg" asChild className="rounded-md border-foreground text-foreground hover:bg-foreground hover:text-background">
              <Link to="/guide-travaux">Consulter le guide complet</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section Réalisations avec tags colorés */}
      <section className="section-padding bg-stone">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-8"
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-4">
              Nos plus belles réalisations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Inspirez-vous de nos projets de douches à l'italienne, réalisés avec soin, élégance et précision.
            </p>
          </motion.div>

          {/* Tags de style */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {styleTags.map((tag, index) => (
              <span key={index} className={tag.className}>
                {tag.label}
              </span>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: jemmapes1, style: "Élégance parisienne", location: "Paris 10ème — Jemmapes", tag: "Douche à l'italienne, carrelage graphique", borderClass: "photo-card-beige" },
              { img: vincennesMr1, style: "Contemporain épuré", location: "Cours de Vincennes", tag: "Matériaux nobles, finitions soignées", borderClass: "photo-card-terracotta" },
              { img: nicolasRoretDouche, style: "Zellige & Laiton", location: "Paris 13ème — Nicolas Roret", tag: "Zellige turquoise, robinetterie dorée", borderClass: "photo-card-mint" }
            ].map((project, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`aspect-[3/4] ${project.borderClass} mb-4`}>
                  <img
                    src={project.img}
                    alt={`${project.style} ${project.location}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-lg font-semibold text-wood">{project.style}</h3>
                <p className="text-foreground text-sm mb-2">{project.location}</p>
                <span className="tag-beige text-xs">{project.tag}</span>
                <Link 
                  to="/realisations" 
                  className="block mt-3 text-wood font-medium text-sm hover:underline"
                >
                  Voir le projet
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button variant="outline" size="lg" asChild className="rounded-md">
              <Link to="/realisations">
                Voir tous nos projets
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button 
              variant="default" 
              size="lg" 
              asChild 
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-md"
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

      {/* Section Projet personnalisé */}
      <section className="section-padding bg-accent/30">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-14"
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
              Un projet personnalisé,<br />accessible et élégant.
            </h2>
            <p className="text-muted-foreground text-lg">
              Parce que chaque salle de bain est unique, nous vous accompagnons à chaque étape, 
              en respectant vos goûts et vos envies.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              { icon: "💬", title: "Conseils personnalisés" },
              { icon: "📦", title: "Large choix de matériaux" },
              { icon: "✓", title: "Travaux garantis et assurés" },
              { icon: "⏱", title: "Respect des délais et budget" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full border-2 border-foreground/20 flex items-center justify-center mx-auto mb-4 text-2xl">
                  {item.icon}
                </div>
                <h3 className="font-display text-sm md:text-base font-semibold">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section zone d'intervention */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6">
              Intervention sur Paris & Île-de-France
            </h2>
            <p className="text-muted-foreground mb-8">
              Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), 
              Yvelines (78), Essonne (91), Val-d'Oise (95), Seine-et-Marne (77)
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {["Visite gratuite", "Devis détaillé", "Garantie décennale", "Maîtrise d'œuvre"].map((item, index) => (
                <span 
                  key={index}
                  className="tag-beige"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Témoignage client */}
      <section className="section-padding bg-accent/20">
        <div className="container-custom">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-wood font-medium mb-4">★★★★★ Avis client vérifié</p>
            <a 
              href="https://www.houzz.fr/viewReview/2076669/qualirenovation-by-qualiconcept-review" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition-opacity"
            >
              <blockquote className="font-display text-xl md:text-2xl italic mb-6 text-foreground">
                "Je recommande avec beaucoup d'enthousiasme les prestations de QualiConcept. Carina a géré mon chantier avec beaucoup de professionnalisme et de rigueur, elle est très à l'écoute de ses clients. Le chantier a été livré dans le délai imparti, avec des finitions soignées et beaucoup de créativité."
              </blockquote>
              <p className="text-wood font-semibold">— Marie C. <span className="underline ml-2">Voir sur Houzz →</span></p>
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-custom text-center">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
              Prêt à transformer votre salle de bain ?
            </h2>
            <p className="text-background/70 text-lg mb-8">
              Prenez rendez-vous pour une visite technique gratuite.<br />
              Nous vous accompagnons de A à Z.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                asChild
                className="bg-[hsl(38,50%,50%)] hover:bg-[hsl(38,50%,45%)] text-white rounded-md"
              >
                <Link to="/devis">
                  Demander un devis gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="border-background/30 text-background hover:bg-background/10 rounded-md"
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
