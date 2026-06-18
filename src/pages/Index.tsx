import { Link } from "react-router-dom";
import houzzBestOf2026PhotoData from "@/assets/houzz-award-2026.png.asset.json";
const houzzBestOf2026Photo = houzzBestOf2026PhotoData.url;
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { ArrowRight, Phone, Pencil, Gem, Wrench, Play, Sparkles, ChevronRight, Newspaper, BookOpen, Video, Droplets } from "lucide-react";
import jemmapes1Data from "@/assets/jemmapes-1.jpg.asset.json";
const jemmapes1 = jemmapes1Data.url;
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import vincennesMr1Data from "@/assets/vincennes-mr-1.jpg.asset.json";
const vincennesMr1 = vincennesMr1Data.url;
import nicolasRoretDoucheData from "@/assets/nicolas-roret-douche.jpg.asset.json";
const nicolasRoretDouche = nicolasRoretDoucheData.url;
import { presseNews, guideConseils, videoConseils } from "@/data/newsData";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";
import { Recompenses } from "@/components/layout/Recompenses";
import { PartnerCTA } from "@/components/home/PartnerCTA";
import { OGTags } from "@/components/seo/OGTags";

import { PageCTA } from "@/components/layout/PageCTA";
import { Picture } from "@/components/Picture";

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
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Qualirenovation – RenoverMaSalleDeBain.com",
        "url": "https://renovermasalledebain.com",
        "logo": "https://renovermasalledebain.com/og/default-og.jpg",
        "description": "Entreprise spécialisée dans la rénovation de salle de bain haut de gamme à Paris et Île-de-France. 20 ans d'expérience, conception et réalisation clé en main.",
        "foundingDate": "2005",
        "areaServed": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 48.8566, "longitude": 2.3522 }, "geoRadius": "50000" },
        "address": { "@type": "PostalAddress", "addressLocality": "Paris", "addressRegion": "Île-de-France", "addressCountry": "FR" },
        "sameAs": ["https://www.houzz.fr/pro/qualirenovation", "https://www.instagram.com/renovermasalledebain"],
        "founder": { "@type": "Person", "name": "Carina Nahmani", "jobTitle": "Maître d'œuvre", "description": "20 ans d'expertise en rénovation de salle de bain à Paris" },
        "employee": [
          { "@type": "Person", "name": "Rubens Mimouni", "jobTitle": "Gérant" },
          { "@type": "Person", "name": "Thierry Pelmard", "jobTitle": "Architecte partenaire", "description": "Plus de 60 chantiers réalisés en collaboration" }
        ],
        "knowsAbout": ["Rénovation salle de bain", "Carrelage zellige", "Terrazzo", "Douche italienne", "Plomberie", "Étanchéité"],
        "hasCredential": [
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "Certifié Schlüter-Systems" },
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "Certifié Wedi" }
        ],
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "reviewCount": "40", "bestRating": "5" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "RenoverMaSalleDeBain.com",
        "description": "Conception et rénovation de salle de bain haut de gamme à Paris et en Île-de-France",
        "url": "https://renovermasalledebain.com",
        "priceRange": "€€€",
        "makesOffer": { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Rénovation de salle de bain", "description": "Conception et rénovation complète de salle de bain haut de gamme" } },
        "areaServed": [{ "@type": "City", "name": "Paris" }, { "@type": "AdministrativeArea", "name": "Île-de-France" }],
        "address": { "@type": "PostalAddress", "addressLocality": "Paris", "addressRegion": "Île-de-France", "addressCountry": "FR" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "reviewCount": "40", "bestRating": "5" }
      }) }} />
      {/* Hero Section - Premium design */}
      <section className="bg-gradient-to-b from-stone to-background py-6 md:py-20 lg:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <ScrollAnimation variant="fadeUp" className="text-center lg:text-left">
              <h1 className="mb-5 md:mb-7 leading-[1.1]">
                <span className="font-display text-primary text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight uppercase block">
                  Un chantier heureux
                </span>
                <span className="font-display text-primary text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight uppercase block">
                  pour votre
                </span>
                <span className="font-script text-gold text-5xl md:text-6xl lg:text-7xl xl:text-8xl block mt-1" style={{ fontWeight: 400 }}>
                  Salle de Bain
                </span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg lg:text-xl mb-8 md:mb-10 leading-relaxed max-w-lg lg:max-w-none">
                Rénover votre salle de bain sans stress, sans mauvaises surprises, grâce à une conception maîtrisée et un accompagnement de A à Z.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pb-36 sm:pb-0">
                <Button 
                  variant="gold" 
                  size="lg" 
                  asChild 
                  className="rounded-full px-10 w-full sm:w-auto text-base shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Link to="/devis#devis-form">
                    Mon étude personnalisée
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  asChild 
                  className="rounded-full px-8 w-full sm:w-auto text-base border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Link to="/devis?type=degat_eaux#devis-form">
                    <Droplets className="w-4 h-4 mr-2" />
                    Urgence dégât des eaux
                  </Link>
                </Button>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation 
              variant="scale" 
              delay={0.2}
              className="relative order-first lg:order-last"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_hsl(0_0%_0%/0.2)]">
                <HeroSlideshow />
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
            <Picture 
              src={houzzBestOf2026Photo} 
              alt="Lauréat Best of Houzz 2026 – Photo" 
              className="h-40 md:h-52 rounded-lg" 
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
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white border border-border flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display font-light text-lg md:text-xl mb-2">{item.title}</h3>
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
              <Link to="/devis#devis-form" className="block h-full">
                <div className="bg-stone rounded-2xl p-6 md:p-10 h-full hover:shadow-lg hover:border-gold/30 border border-transparent transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-white border border-border flex items-center justify-center">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z"/>
                        <path d="M6 12V5a2 2 0 0 1 2-2h3"/>
                        <circle cx="12" cy="5" r="1"/>
                      </svg>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-light">Plutôt baignoire</h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-3"><span className="text-primary text-lg">•</span>Vous aimez prendre le temps</li>
                    <li className="flex items-center gap-3"><span className="text-primary text-lg">•</span>Vous avez des enfants</li>
                    <li className="flex items-center gap-3"><span className="text-primary text-lg">•</span>Côté cocooning et intemporel</li>
                  </ul>
                  <div className="mt-4 flex items-center gap-2 text-gold font-medium text-sm">
                    Demander un devis <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </ScrollAnimation>

            {/* Douche */}
            <ScrollAnimation variant="fadeRight" delay={0.2}>
              <Link to="/devis#devis-form" className="block h-full">
                <div className="bg-accent/30 rounded-2xl p-6 md:p-10 h-full hover:shadow-lg hover:border-gold/30 border border-transparent transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-white border border-border flex items-center justify-center">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-primary" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {/* Tuyau courbé */}
                        <path d="M6 2v6a6 6 0 0 0 6 6h2"/>
                        {/* Tête arrondie */}
                        <path d="M14 10c0-2.2 1.8-4 4-4h4c2.2 0 4 1.8 4 4v2a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2v-2z"/>
                        {/* Jets diagonaux */}
                        <line x1="16" y1="16" x2="14" y2="20"/>
                        <line x1="19" y1="16" x2="17" y2="20"/>
                        <line x1="22" y1="16" x2="20" y2="20"/>
                        <line x1="25" y1="16" x2="23" y2="20"/>
                        <line x1="15" y1="21" x2="13.5" y2="24"/>
                        <line x1="18" y1="21" x2="16.5" y2="24"/>
                        <line x1="21" y1="21" x2="19.5" y2="24"/>
                        <line x1="24" y1="21" x2="22.5" y2="24"/>
                        <line x1="17" y1="25" x2="16" y2="28"/>
                        <line x1="20" y1="25" x2="19" y2="28"/>
                      </svg>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-light">Plutôt douche</h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-3"><span className="text-primary text-lg">•</span>Praticité au quotidien</li>
                    <li className="flex items-center gap-3"><span className="text-primary text-lg">•</span>Gain d'espace</li>
                    <li className="flex items-center gap-3"><span className="text-primary text-lg">•</span>Accessibilité et fluidité</li>
                  </ul>
                  <div className="mt-4 flex items-center gap-2 text-gold font-medium text-sm">
                    Demander un devis <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </ScrollAnimation>
          </div>

          {/* Notre rôle */}
          <ScrollAnimation delay={0.3}>
            <Link to="/pourquoi-nous" className="block max-w-2xl mx-auto">
              <div className="text-center bg-foreground/5 rounded-2xl p-6 md:p-10 hover:shadow-lg hover:bg-foreground/10 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Sparkles className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  <span className="font-display font-light text-lg md:text-xl">Notre rôle</span>
                </div>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Vous guider vers le bon choix pour vous. Chaque projet est unique.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-gold font-medium text-sm">
                  Découvrir notre approche <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
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
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light mb-4 md:mb-5">
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
              { img: jemmapes1, style: "Élégance parisienne", location: "Paris 10ème", tag: "Douche italienne", borderClass: "photo-card-beige", slug: "salle-de-bain-paris-10-renovation-style-masculin-jemmapes" },
              { img: vincennesMr1, style: "Contemporain épuré", location: "Vincennes", tag: "Finitions soignées", borderClass: "photo-card-terracotta", slug: "salle-de-bain-paris-12-renovation-madame-marbre-rangements" },
              { img: nicolasRoretDouche, style: "Zellige & Laiton", location: "Paris 13ème", tag: "Robinetterie dorée", borderClass: "photo-card-mint", slug: "salle-de-bain-paris-13-renovation-zellige-turquoise-or" }
            ].map((project, index) => (
              <motion.div
                key={index}
                className="group min-w-[80vw] md:min-w-0 snap-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Link to={`/realisations/${project.slug}`} className="block">
                  <div className={`aspect-[3/4] ${project.borderClass} mb-4 md:mb-5 overflow-hidden`}>
                    <Picture
                      src={project.img}
                      alt={`${project.style} ${project.location}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-display text-lg md:text-xl font-light text-foreground mb-1 text-center">{project.style}</h3>
                  <p className="text-muted-foreground text-sm mb-2 text-center">{project.location}</p>
                  <div className="text-center">
                    <span className="tag-beige text-xs">{project.tag}</span>
                  </div>
                </Link>
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
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light mb-4 md:mb-5">
              Un projet personnalisé
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Nous vous accompagnons de A à Z.
            </p>
            <p className="text-muted-foreground text-base md:text-lg mt-3">
              Commencez par un{" "}
              <Link to="/devis#devis-form" className="text-primary font-medium underline underline-offset-2 hover:text-primary/80">
                devis gratuit et personnalisé pour votre rénovation de salle de bain
              </Link>
              {" "}— étude gratuite sur site à Paris et en Île-de-France.
            </p>
          </ScrollAnimation>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 max-w-5xl mx-auto" staggerDelay={0.1}>
            {[
              { icon: (
                <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 36c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4V20H8v16z" />
                  <path d="M4 14h40v6H4z" />
                  <circle cx="24" cy="28" r="4" />
                  <path d="M24 32v4" />
                </svg>
              ), title: "Conseils personnalisés", desc: "Écoute & expertise" },
              { icon: (
                <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="14" width="36" height="28" rx="3" />
                  <path d="M6 22h36" />
                  <path d="M16 14V8h16v6" />
                  <circle cx="24" cy="32" r="5" />
                  <path d="M24 29v6M21 32h6" />
                </svg>
              ), title: "Choix matériaux", desc: "Qualité premium" },
              { icon: (
                <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 4h24c2.2 0 4 1.8 4 4v32c0 2.2-1.8 4-4 4H12c-2.2 0-4-1.8-4-4V8c0-2.2 1.8-4 4-4z" />
                  <path d="M16 20l5 5 11-11" />
                  <path d="M14 34h20" />
                  <path d="M14 38h12" />
                </svg>
              ), title: "Garantie décennale", desc: "Sérénité totale" },
              { icon: (
                <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="24" cy="26" r="16" />
                  <path d="M24 16v10l7 7" />
                  <path d="M20 6h8" />
                  <path d="M24 2v4" />
                </svg>
              ), title: "Délais respectés", desc: "Planning maîtrisé" }
            ].map((item, index) => (
              <StaggerItem key={index}>
                <div className="text-center p-6 md:p-8 bg-card rounded-2xl border border-border/50 hover:border-gold/30 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white border border-border flex items-center justify-center mx-auto mb-4 md:mb-5 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-sm md:text-base font-light mb-2">{item.title}</h3>
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


      {/* CTA Final */}
      <PageCTA
        title="Prête à transformer votre salle de bain ?"
        description="Chaque projet commence par une étude sérieuse et personnalisée."
        buttonText="Mon étude personnalisée"
        variant="dark"
      />
    </Layout>
  );
}
