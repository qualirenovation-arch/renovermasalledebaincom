import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, Phone, MessageCircle, ShieldCheck, Clock, Palette, CheckCircle } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Section "Pourquoi choisir" - 3 colonnes
const whyChoose = [
  {
    icon: (
      <svg className="w-12 h-12 mx-auto" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="16" r="10" />
        <path d="M24 26v14" />
        <path d="M18 44h12" strokeLinecap="round" />
      </svg>
    ),
    title: "Imaginez",
    description: "Inspirez-vous de nos réalisations et choisissez votre style : minimaliste, naturel, contemporain..."
  },
  {
    icon: (
      <svg className="w-12 h-12 mx-auto" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="24" cy="24" rx="8" ry="16" />
        <path d="M24 8v32" />
        <path d="M16 14c2-2 5-3 8-3s6 1 8 3" />
      </svg>
    ),
    title: "Personnalisez",
    description: "Choisissez les matériaux, les textures, les équipements et les finitions qui correspondent à vos envies."
  },
  {
    icon: (
      <svg className="w-12 h-12 mx-auto" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 24c4-4 8-4 12-4s8 4 12 4 8-4 12-4" strokeLinecap="round" />
        <path d="M8 32c4-4 8-4 12-4s8 4 12 4 8-4 12-4" strokeLinecap="round" />
        <path d="M8 40c4-4 8-4 12-4s8 4 12 4 8-4 12-4" strokeLinecap="round" />
      </svg>
    ),
    title: "Réalisez",
    description: "Nos experts vous accompagnent de la conception à la réalisation, pour un résultat clé en main."
  }
];

// Section avantages
const advantages = [
  {
    icon: MessageCircle,
    title: "Conseils personnalisés",
    description: "Un accompagnement sur mesure"
  },
  {
    icon: Palette,
    title: "Large choix de matériaux",
    description: "Des finitions haut de gamme"
  },
  {
    icon: ShieldCheck,
    title: "Travaux garantis et assurés",
    description: "Garantie décennale incluse"
  },
  {
    icon: Clock,
    title: "Respect des délais et budget",
    description: "Engagement de résultat"
  }
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section - Minimaliste */}
      <section className="bg-stone py-16 md:py-24">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-foreground">
              Rénovation de salle de bain<br />
              <span className="text-wood">&</span> douche à l'italienne
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Artisan concepteur à Paris · Visite technique gratuite
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" asChild>
                <Link to="/devis">
                  Prendre rendez-vous
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:+33659764685">
                  <Phone className="w-4 h-4 mr-2" />
                  06 59 76 46 85
                </a>
              </Button>
            </div>
          </motion.div>
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
            <Button variant="default" size="lg" asChild className="bg-foreground text-background hover:bg-foreground/90">
              <Link to="/realisations">Voir nos inspirations</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section Réalisations */}
      <section className="section-padding bg-stone">
        <div className="container-custom">
          <motion.h2 
            className="font-display text-2xl md:text-3xl lg:text-4xl text-center mb-12"
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            Nos plus belles réalisations
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[gallery1, gallery2, gallery3].map((img, index) => (
              <motion.div
                key={index}
                className="aspect-[3/4] rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={img}
                  alt={`Réalisation douche à l'italienne ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button variant="outline" size="lg" asChild>
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
            {advantages.map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full border-2 border-foreground/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-foreground" />
                </div>
                <h3 className="font-display text-sm md:text-base font-semibold mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm">{item.description}</p>
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
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone text-foreground text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-wood" />
                  {item}
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
              <Button variant="cta" size="xl" asChild>
                <Link to="/devis">
                  Demander un devis gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                asChild
                className="border-background/30 text-background hover:bg-background/10"
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
