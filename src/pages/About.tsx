import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Shield, Award, Users, Clock, CheckCircle2, ArrowRight, Camera, PenTool, HardHat } from "lucide-react";
import aboutHistoire from "@/assets/about-histoire.jpg";
import teamPhoto from "@/assets/team-photo.jpg";
import teamChantier1 from "@/assets/team-chantier-1.jpg";
import teamChantier3 from "@/assets/team-chantier-3.jpg";
import stephaneVasco2 from "@/assets/stephane-vasco-2.jpg";
import thierryPelmard1 from "@/assets/thierry-pelmard-1.jpg";
import thierryPelmard2 from "@/assets/thierry-pelmard-2.jpg";
import carinaNahmani1 from "@/assets/carina-nahmani-1.jpg";

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
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

          {/* Carina Nahmani - Maître d'œuvre */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto text-center lg:text-left">
              <div className="grid gap-8 lg:grid-cols-[220px_1fr] items-start">
                <div className="mx-auto lg:mx-0 w-full max-w-[260px]">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-accent/10">
                    <img
                      src={carinaNahmani1}
                      alt="Portrait de Carina Nahmani, maître d'œuvre"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div>
                  <div className="w-16 h-16 rounded-2xl bg-accent/30 flex items-center justify-center mx-auto lg:mx-0 mb-6">
                    <HardHat className="w-8 h-8 text-wood" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-4">
                    Carina Nahmani – Maître d'œuvre
                  </h3>
                  <div className="space-y-4 text-primary-foreground/80 leading-relaxed">
                    <p>
                      Véritable <strong className="text-primary-foreground">chef d'orchestre de votre chantier</strong>, 
                      Carina Nahmani pilote chaque projet avec exigence, sang-froid et engagement.
                    </p>
                    <p className="text-lg italic text-accent">
                      Sa devise : seul on n'avance pas, en équipe oui.
                    </p>
                    <p>
                      <strong className="text-accent">Femme du BTP</strong>, féminine et déterminée, elle possède la poigne 
                      nécessaire pour orchestrer l'ensemble des intervenants, gérer la pression des équipes comme celle des 
                      clients et maintenir un climat de travail fondé sur le respect, la confiance et la bonne humeur. 
                      Toujours à l'écoute, disponible à la moindre question ou au moindre doute, elle ne laisse jamais ses 
                      clients dans le flou.
                    </p>
                    <p>
                      Forte de <strong className="text-primary-foreground">plus de 20 ans d'expérience</strong>, Carina a 
                      construit un réseau solide de partenaires et d'artisans avec lesquels elle collabore depuis de nombreuses 
                      années. Experte reconnue, elle maîtrise les produits, les normes, les DTU et leur mise en œuvre. 
                      Consciente que le métier évolue sans cesse, elle se forme en continu auprès des fabricants et fournisseurs 
                      afin de garantir des solutions techniques toujours à jour et parfaitement exécutées.
                    </p>
                    <p>
                      Pour sécuriser chaque projet, elle s'entoure également d'un <strong className="text-accent">expert construction</strong>, 
                      d'un <strong className="text-accent">expert d'assurance</strong> et d'un <strong className="text-accent">avocat</strong>, 
                      assurant à ses clients un accompagnement complet et une parfaite maîtrise des enjeux techniques, réglementaires et juridiques.
                    </p>
                    <p>
                      👉 Grâce à son savoir-faire, ses projets sont régulièrement repris dans la presse, pour la plus grande fierté de ses clients.
                    </p>
                    <p>
                      Au final, vous ne retenez pas seulement un beau chantier, mais un <strong className="text-primary-foreground">projet durable, 
                      bien construit, dans les règles de l'art</strong>, porté par une équipe soudée et engagée.
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                    <span className="px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium">
                      Chef d'orchestre
                    </span>
                    <span className="px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium">
                      20+ ans d'expérience
                    </span>
                    <span className="px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium">
                      Expertise DTU
                    </span>
                    <span className="px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium">
                      Toujours disponible
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Architecte d'intérieur partenaire */}
          <motion.div
            className="mt-16 pt-12 border-t border-primary-foreground/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div className="text-center lg:text-left">
                <div className="w-16 h-16 rounded-2xl bg-accent/30 flex items-center justify-center mx-auto lg:mx-0 mb-6">
                  <PenTool className="w-8 h-8 text-wood" />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-4">
                  Thierry Pelmard, notre architecte d'intérieur partenaire
                </h3>
                <p className="text-primary-foreground/80 leading-relaxed mb-6">
                  Fondateur de P3D Concept, Thierry collabore avec nous depuis plusieurs années sur 
                  <strong className="text-accent"> plus de 60 projets</strong>. Il réalise les plans techniques 
                  et les visualisations 3D de votre future salle de bain, garantissant une conception 
                  sur-mesure parfaitement adaptée à vos besoins et à votre espace.
                </p>
                <Button variant="outline" size="lg" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <a href="https://www.p3dconcept.fr" target="_blank" rel="noopener noreferrer">
                    Découvrir Thierry Pelmard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  className="overflow-hidden rounded-2xl shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <img 
                    src={thierryPelmard1} 
                    alt="Thierry Pelmard - P3D Concept" 
                    className="w-full h-56 object-cover"
                  />
                </motion.div>
                <motion.div 
                  className="overflow-hidden rounded-2xl shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <img 
                    src={thierryPelmard2} 
                    alt="Thierry Pelmard avec l'équipe" 
                    className="w-full h-56 object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Gallery photos équipe sur chantier */}
          <motion.div
            className="mt-16 pt-12 border-t border-primary-foreground/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl font-semibold text-center mb-8">
              Nos artisans en action
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <motion.div 
                className="aspect-[4/3] rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={teamChantier1} 
                  alt="L'équipe au complet sur un chantier parisien" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="aspect-[4/3] rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={teamChantier3} 
                  alt="Artisan réalisant des travaux de perçage" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Photographe partenaire */}
          <motion.div
            className="mt-16 pt-12 border-t border-primary-foreground/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div className="text-center lg:text-left">
                <div className="w-16 h-16 rounded-2xl bg-accent/30 flex items-center justify-center mx-auto lg:mx-0 mb-6">
                  <Camera className="w-8 h-8 text-wood" />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-4">
                  Stéphane Vasco, notre photographe partenaire
                </h3>
                <p className="text-primary-foreground/80 leading-relaxed mb-6">
                  Avant les travaux, nous immortalisons votre salle de bain. À la fin du chantier, 
                  Stéphane réalise un shooting professionnel pour capturer la transformation et vous 
                  offrir un album souvenir unique de cette aventure. Les réalisations que vous découvrez 
                  sur notre site sont le fruit de son travail assidu à nos côtés.
                </p>
                <Button variant="outline" size="lg" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/photographe">
                    Découvrir Stéphane Vasco
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
              <motion.div 
                className="overflow-hidden rounded-2xl shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <img 
                  src={stephaneVasco2} 
                  alt="Stéphane Vasco en action sur un de nos chantiers" 
                  className="w-full h-72 object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
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
              <Link to="/devis#devis-form">
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