import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Shield, Award, Users, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import gallery2 from "@/assets/gallery-2.jpg";

const values = [
  { icon: Award, title: "Excellence", description: "Nous visons la perfection dans chaque détail de nos réalisations" },
  { icon: Shield, title: "Fiabilité", description: "Des engagements tenus et une qualité garantie" },
  { icon: Users, title: "Écoute", description: "Votre projet est unique, nous le traitons comme tel" },
  { icon: Clock, title: "Réactivité", description: "Une équipe disponible et des délais respectés" },
];

const guarantees = [
  "Garantie décennale sur tous nos travaux",
  "Garantie étanchéité 10 ans",
  "Assurance responsabilité civile professionnelle",
  "Devis détaillé gratuit et sans engagement",
  "Prix ferme et définitif",
  "Suivi personnalisé de votre chantier",
];

const certifications = [
  "Qualibat RGE",
  "Artisan certifié",
  "Partenaire agréé des grandes marques",
  "Formation continue de nos équipes",
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-stone" />
        <div className="relative container-custom">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/30 text-wood text-sm font-medium mb-6">
              À propos de nous
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Plus de 15 ans d'expertise au service de votre confort
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Atelier Douche Design est né de la passion pour le travail bien fait et 
              l'art de créer des espaces de vie exceptionnels.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
                Notre histoire
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Fondé par des artisans passionnés, Atelier Douche Design s'est spécialisé 
                  dès ses débuts dans la création de douches à l'italienne haut de gamme.
                </p>
                <p>
                  Fort de plus de 15 années d'expérience et de centaines de réalisations, 
                  nous avons développé un savoir-faire unique qui allie techniques traditionnelles 
                  et innovations modernes.
                </p>
                <p>
                  Notre équipe de professionnels qualifiés met tout son talent à votre service 
                  pour transformer votre salle de bain en un véritable espace de bien-être.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="aspect-[4/3] rounded-3xl overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src={gallery2} 
                alt="Notre savoir-faire" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-stone">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Nos valeurs
            </h2>
            <p className="text-muted-foreground text-lg">
              Des principes qui guident chacune de nos interventions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="card-elevated card-hover p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/30 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-wood" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees & Certifications */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Guarantees */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-semibold mb-8">
                Nos garanties
              </h2>
              <ul className="space-y-4">
                {guarantees.map((guarantee, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-wood" />
                    </div>
                    <span className="text-foreground">{guarantee}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-semibold mb-8">
                Certifications
              </h2>
              <ul className="space-y-4">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-wood" />
                    </div>
                    <span className="text-foreground">{cert}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Une équipe de passionnés
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Des artisans qualifiés et formés aux dernières techniques
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-display font-bold text-accent mb-2">15+</div>
              <p className="text-primary-foreground/80">Années d'expérience</p>
            </div>
            <div>
              <div className="text-5xl font-display font-bold text-accent mb-2">500+</div>
              <p className="text-primary-foreground/80">Projets réalisés</p>
            </div>
            <div>
              <div className="text-5xl font-display font-bold text-accent mb-2">98%</div>
              <p className="text-primary-foreground/80">Clients satisfaits</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
              Discutons de votre projet
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Rencontrez notre équipe et découvrez comment nous pouvons transformer 
              votre salle de bain.
            </p>
            <Button variant="cta" size="xl" asChild>
              <Link to="/devis">
                Demander un devis gratuit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}