import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Shield, Award, Users, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import aboutHistoire from "@/assets/about-histoire.jpg";
import teamPhoto from "@/assets/team-photo.jpg";

const values = [
  { icon: Award, title: "Excellence", description: "Nous visons la perfection dans chaque détail de nos réalisations" },
  { icon: Shield, title: "Fiabilité", description: "Des engagements tenus et une qualité garantie" },
  { icon: Users, title: "Écoute", description: "Votre projet est unique, nous le traitons comme tel" },
  { icon: Clock, title: "Réactivité", description: "Une équipe disponible et des délais respectés" },
];

const guarantees = [
  "Garantie décennale MIC Assurances",
  "Garantie étanchéité 10 ans",
  "Responsabilité civile professionnelle MIC Assurances",
  "Devis détaillé avec photos via Graneet – zéro mauvaise surprise",
  "Prix ferme et définitif, transparent ligne par ligne",
  "Suivi visuel quotidien par WhatsApp et vidéo",
  "Suivi personnalisé de votre chantier",
];

const certifications = [
  "Certifié Schlüter-Systems",
  "Certifié Wedi",
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
              20 ans d'expertise chantier au service de vos projets
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Qualirenovation by Qualiconcept, société créée en 2019, met à votre disposition 
              une maître d'œuvre expérimentée pour transformer votre salle de bain.
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
                  <strong>renovermasalledebain.com</strong> est une marque de la société 
                  <strong> Qualirenovation by Qualiconcept</strong>, fondée en 2019. Notre positionnement 
                  est clair : <strong>nous sommes concepteurs, pas simples exécutants</strong>. 
                  C'est toute la différence.
                </p>
                <p>
                  Chez nous, pas de plans sur la comète ni de maîtrise approximative. Notre maître d'œuvre, 
                  forte de <strong>plus de 20 ans d'expérience</strong> sur les chantiers parisiens, 
                  conçoit et pilote votre projet de A à Z : étude de faisabilité, conception sur-mesure, 
                  coordination des corps de métier et respect des normes DTU.
                </p>
                <p>
                  <strong>Vous suivez chaque étape en toute sérénité.</strong> Grâce à notre suivi 
                  WhatsApp quotidien, vous savez exactement où en est votre chantier, qui intervient 
                  et quand. On ne fait pas de chez vous un hall de gare : chaque intervenant est annoncé 
                  à l'avance, surtout si vous habitez sur place. Vous êtes informé du planning quotidien, 
                  des horaires de passage et de l'avancement technique.
                </p>
                <p>
                  <strong>Transparence totale sur les commandes.</strong> Chaque commande passée ou 
                  livraison prévue vous est communiquée. Nous vous transmettons les factures des 
                  matériaux commandés pour assurer une traçabilité complète – un atout précieux pour 
                  l'avenir (garanties, SAV, revente). Fini le stress et les mauvaises surprises.
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
                src={aboutHistoire} 
                alt="Rénovation salle de bain haut de gamme - Notre savoir-faire" 
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
                Étanchéité et finitions garanties
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="aspect-[4/3] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src={teamPhoto} 
                alt="L'équipe QualiRénovation sur chantier" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-3 gap-6 text-center mb-8">
                <div>
                  <div className="text-4xl font-display font-bold text-accent mb-2">20+</div>
                  <p className="text-primary-foreground/80 text-sm">Années d'expérience</p>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-accent mb-2">2019</div>
                  <p className="text-primary-foreground/80 text-sm">Création</p>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-accent mb-2">100%</div>
                  <p className="text-primary-foreground/80 text-sm">Clé en main</p>
                </div>
              </div>
              <p className="text-primary-foreground/90 leading-relaxed">
                Notre équipe réunit des artisans passionnés et qualifiés, formés aux dernières techniques 
                et certifiés par les plus grandes marques (Schlüter, Wedi, Geberit). Ensemble, nous 
                transformons vos espaces avec rigueur et créativité.
              </p>
            </motion.div>
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