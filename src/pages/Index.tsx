import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, Phone, Pencil, Gem, Wrench } from "lucide-react";
import jemmapes1 from "@/assets/jemmapes-1.jpg";
import vincennesMr1 from "@/assets/vincennes-mr-1.jpg";
import vincennesMr5 from "@/assets/vincennes-mr-5.jpg";

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
  return (
    <Layout>
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

      {/* Section "Pourquoi choisir une douche à l'italienne ?" */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.h2 
            className="font-display text-2xl md:text-3xl lg:text-4xl text-center mb-16"
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            Pourquoi choisir une <span className="italic font-normal">douche</span> à l'italienne ?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-5xl mx-auto">
            {whyChoose.map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="text-foreground mb-6">
                  {item.icon}
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Button variant="outline" size="lg" asChild className="rounded-md border-foreground text-foreground hover:bg-foreground hover:text-background">
              <Link to="/realisations">Voir nos inspirations</Link>
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
              { img: vincennesMr5, style: "Ambiance spa", location: "Cours de Vincennes", tag: "Design moderne, tons naturels", borderClass: "photo-card-mint" }
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
            className="text-center mt-12"
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
