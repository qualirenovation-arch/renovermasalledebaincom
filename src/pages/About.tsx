import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { OGTags } from "@/components/seo/OGTags";
import { Shield, Award, Users, Clock, CheckCircle2, ArrowRight, Camera, Ruler } from "lucide-react";
import { PageCTA } from "@/components/layout/PageCTA";
import { QualiRenovationCTA } from "@/components/shared/QualiRenovationCTA";
import aboutHistoire from "@/assets/about-histoire.jpg";
import teamPhoto from "@/assets/team-photo.jpg";
import teamChantier1 from "@/assets/team-chantier-1.jpg";
import teamChantier3 from "@/assets/team-chantier-3.jpg";
import stephaneVasco from "@/assets/stephane-vasco.png";
import thierryPelmard1 from "@/assets/thierry-pelmard-1.jpg";
import thierryPelmard2 from "@/assets/thierry-pelmard-2.jpg";
import carinaNahmani1 from "@/assets/carina-nahmani-1.jpg";
import houzzBestOf2026Photo from "@/assets/logos/houzz-best-of-2026-photo-award.png";
import lartDeRenoverSignature from "@/assets/lart-de-renover-by-carina-n.svg";

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
      <OGTags
        title="À propos – Notre équipe"
        description="Découvrez l'équipe Qualirenovation derrière renovermasalledebain.com. 20 ans d'expérience dans la rénovation de salle de bain à Paris."
        path="/a-propos"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Qualirenovation – RenoverMaSalleDeBain.com",
        "url": "https://renovermasalledebain.com",
        "logo": "https://renovermasalledebain.com/og/default-og.jpg",
        "description": "Entreprise spécialisée dans la rénovation de salle de bain haut de gamme à Paris et Île-de-France. 20 ans d'expérience, conception et réalisation clé en main.",
        "foundingDate": "2005",
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 48.8566, "longitude": 2.3522 },
          "geoRadius": "50000"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Paris",
          "addressRegion": "Île-de-France",
          "addressCountry": "FR"
        },
        "sameAs": [
          "https://www.houzz.fr/pro/qualirenovation",
          "https://www.instagram.com/renovermasalledebain"
        ],
        "founder": {
          "@type": "Person",
          "name": "Carina Nahmani",
          "jobTitle": "Maître d'œuvre",
          "description": "20 ans d'expertise en rénovation de salle de bain à Paris"
        },
        "employee": [
          { "@type": "Person", "name": "Rubens Mimouni", "jobTitle": "Gérant" },
          { "@type": "Person", "name": "Thierry Pelmard", "jobTitle": "Architecte partenaire", "description": "Plus de 60 chantiers réalisés en collaboration" }
        ],
        "knowsAbout": [
          "Rénovation salle de bain", "Carrelage zellige", "Terrazzo",
          "Douche italienne", "Plomberie", "Étanchéité"
        ],
        "hasCredential": [
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "Certifié Schlüter-Systems" },
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "Certifié Wedi" }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "40",
          "bestRating": "5"
        }
      }) }} />
      {/* Hero */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-stone" />
        <div className="relative container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent/30 text-wood text-sm font-medium mb-6">
                À propos de nous
              </span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light mb-6">
                20 ans d'expertise chantier au service de vos projets
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                <strong>renovermasalledebain.com</strong> est une expertise de <strong>QualiRénovation</strong>. 
                Société créée en 2019, nous mettons à votre disposition une maître d'œuvre expérimentée 
                pour transformer votre salle de bain.
              </p>
            </motion.div>
            <motion.div
              className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src={teamPhoto} 
                alt="L'équipe QualiRénovation sur chantier" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
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
              <h2 className="font-display text-3xl md:text-4xl font-light mb-6">
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
            <h2 className="font-display text-3xl md:text-4xl font-light mb-4">
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
                <div className="w-16 h-16 rounded-2xl bg-white border border-border flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-light mb-3">{value.title}</h3>
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
              <h2 className="font-display text-3xl font-light mb-8">
                Étanchéité et finitions garanties
              </h2>
              <ul className="space-y-4">
                {guarantees.map((guarantee, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-xl bg-white border border-border flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-primary" strokeWidth={1.5} />
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
              <h2 className="font-display text-3xl font-light mb-8">
                Certifications
              </h2>
              <ul className="space-y-4">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-xl bg-white border border-border flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-primary" strokeWidth={1.5} />
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
            <h2 className="font-display text-3xl md:text-4xl font-light mb-4">
              Une équipe de passionnés
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Des artisans qualifiés et formés aux dernières techniques
            </p>
          </motion.div>

          <motion.div
              className="max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center items-baseline gap-12 text-center">
                <div>
                  <div className="text-4xl font-display font-bold text-white mb-2">20+</div>
                  <p className="text-primary-foreground/80 text-sm">Années d'expérience</p>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-white mb-2">2019</div>
                  <p className="text-primary-foreground/80 text-sm">Création</p>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-white mb-2">100%</div>
                  <p className="text-primary-foreground/80 text-sm">Clé en main</p>
                </div>
              </div>
            </motion.div>

          {/* Carina Nahmani - Maître d'œuvre */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-white border border-border flex items-center justify-center mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <path d="M2 20h20" />
                      <path d="M5 20V7l7-4 7 4v13" />
                      <path d="M9 20v-5h6v5" />
                      <path d="M9 11h.01" />
                      <path d="M15 11h.01" />
                      <path d="M12 11h.01" />
                      <path d="M12 7v1" />
                    </svg>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-light mb-4 text-white">
                    Carina Nahmani – Maître d'œuvre
                  </h3>
                  <div className="space-y-4 text-primary-foreground/80 leading-relaxed">
                    <p>
                      Véritable <strong className="text-primary-foreground">chef d'orchestre de votre chantier</strong>, 
                      Carina Nahmani pilote chaque projet avec exigence, sang-froid et engagement.
                    </p>
                    <p className="text-lg italic" style={{ color: '#C9B575' }}>
                      Sa devise : seul on n'avance pas, en équipe oui.
                    </p>
                    <p>
                      <strong style={{ color: '#C9B575' }}>Femme du BTP</strong>, féminine et déterminée, elle possède la poigne
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
                      Pour sécuriser chaque projet, elle s'entoure également d'un <strong style={{ color: '#C9B575' }}>expert construction</strong>, 
                      d'un <strong style={{ color: '#C9B575' }}>expert d'assurance</strong> et d'un <strong style={{ color: '#C9B575' }}>avocat</strong>,
                      assurant à ses clients un accompagnement complet et une parfaite maîtrise des enjeux techniques, réglementaires et juridiques.
                    </p>
                    <p>
                      → Grâce à son savoir-faire, ses projets sont régulièrement repris dans la presse, pour la plus grande fierté de ses clients.
                    </p>
                    <p>
                      Au final, vous ne retenez pas seulement un beau chantier, mais un <strong className="text-primary-foreground">projet durable, 
                      bien construit, dans les règles de l'art</strong>, porté par une équipe soudée et engagée.
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <span className="px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-bold">
                      Chef d'orchestre
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-bold">
                      20+ ans d'expérience
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-bold">
                      Expertise DTU
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-bold">
                      Toujours disponible
                    </span>
                   </div>
                  {/* Signature */}
                  <div className="mt-6">
                    <img
                      src={lartDeRenoverSignature}
                      alt="L'Art de Rénover by Carina N."
                      className="h-28 md:h-36 w-auto opacity-90"
                    />
                  </div>
                </div>

                <motion.div
                  className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <img
                    src={carinaNahmani1}
                    alt="Carina Nahmani, maître d'œuvre – renovermasalledebain.com"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
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
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-white border border-border flex items-center justify-center mb-6">
                    <Ruler className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-light mb-4 text-white">
                    Thierry Pelmard – Architecte d'intérieur
                  </h3>
                  <p className="text-primary-foreground/80 leading-relaxed mb-6">
                    Fondateur de P3D Concept, Thierry collabore avec nous depuis plusieurs années sur 
                    <strong style={{ color: '#C9B575' }}> plus de 60 projets</strong>. Il réalise les plans techniques 
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

                <motion.div
                  className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <img 
                    src={thierryPelmard1} 
                    alt="Thierry Pelmard – Architecte d'intérieur, P3D Concept" 
                    className="w-full h-full object-cover"
                    loading="lazy"
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
            <h3 className="font-display text-2xl font-light text-center mb-8">
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
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-white border border-border flex items-center justify-center mb-6">
                    <Camera className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-light mb-4 text-white">
                    Stéphane Vasco – Photographe
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
                  className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <img 
                    src={stephaneVasco} 
                    alt="Stéphane Vasco en action sur un de nos chantiers" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Best of Houzz 2026 */}
      <section className="section-padding bg-stone">
        <div className="container-custom">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4">
                Best of Houzz 2026
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-light mb-4">
                Lauréat Best of Houzz 2026 – Photo
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                En partenariat avec Houzz Pro, cette distinction récompense l'innovation et l'excellence des professionnels de la rénovation et de l'aménagement.
              </p>
            </div>

            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">QualiRénovation by QualiConcept</strong>, maître d'œuvre et spécialiste de la rénovation intérieure à Paris et en Île-de-France, a remporté le prix <strong className="text-foreground">Best of Houzz 2026 – Photo</strong>, attribué par la communauté Houzz parmi plus de 3 millions de professionnels à travers le monde. Cette récompense met à l'honneur les réalisations les plus inspirantes et les plus appréciées sur la plateforme.
                </p>
                
                <blockquote className="border-l-4 border-accent pl-6 py-2 italic text-foreground text-lg">
                  « Cette récompense est avant tout une victoire collective. »
                </blockquote>

                <p>
                  Nous remercions Houzz et toute la communauté pour cette reconnaissance. Une victoire n'est jamais individuelle : elle est le fruit d'un travail d'équipe. Merci à nos équipes, à nos fournisseurs et à nos partenaires qui partagent la même exigence et la même passion du métier.
                </p>
                <p>
                  Merci à nos clients pour leur confiance, leur bonne humeur et cette énergie positive qui nous pousse, projet après projet, à viser l'excellence.
                </p>
                <p>
                  Merci à <strong className="text-foreground">Thierry Pelmard</strong>, notre architecte partenaire, dont la rigueur et l'engagement contribuent pleinement à la qualité de nos réalisations.
                </p>
                <p>
                  Merci également à <strong className="text-foreground">Stéphane Vasco</strong> et <strong className="text-foreground">Noah</strong>, qui travaillent main dans la main pour révéler et valoriser notre savoir-faire : Stéphane capture l'âme de nos projets et met en lumière les nombreuses heures de travail nécessaires pour atteindre ce niveau d'exigence ; Noah sublime ces images et développe notre présence digitale en partageant nos réalisations et nos conseils techniques avec une vision cohérente et inspirante.
                </p>
                <p className="text-foreground font-medium italic">
                  Au final, ce trophée récompense bien plus qu'une photo.<br />
                  Il célèbre une exigence partagée, une équipe engagée et une aventure humaine.
                </p>
              </div>

              <div className="flex-shrink-0 mx-auto md:mx-0">
                <img 
                  src={houzzBestOf2026Photo} 
                  alt="Lauréat Best of Houzz 2026 – Photo" 
                  className="w-48 md:w-56 rounded-lg shadow-lg"
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" size="lg" asChild>
                <a href="https://www.houzz.fr/pro/qualirenovation/qualirenovation-by-qualiconcept" target="_blank" rel="noopener noreferrer">
                  Découvrir nos réalisations sur Houzz
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Association QualiRénovation */}
      <section className="py-10">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">renovermasalledebain.com</strong> est le site spécialisé en rénovation de salle de bain.
              Pour les projets de rénovation globale, notre structure{" "}
              <a href="https://qualirenovation.fr" target="_blank" rel="noopener" className="font-medium underline" style={{ color: '#124A66' }}>
                QualiRénovation
              </a>{" "}
              gère des chantiers d'ampleur à Paris et en Île-de-France.
            </p>
          </div>
          <QualiRenovationCTA variant="compact" />
        </div>
      </section>

      {/* CTA */}
      <PageCTA
        title="Discutons de votre projet."
        description="Notre rôle : concevoir, coordonner et sécuriser votre chantier."
        buttonText="Je démarre mon projet sereinement"
      />
    </Layout>
  );
}