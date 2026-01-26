import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";

// Import SVG logos
import schluterLogo from "@/assets/logos/schluter.svg";
import geberitLogo from "@/assets/logos/geberit.svg";
import weberLogo from "@/assets/logos/weber.svg";
import legrandLogo from "@/assets/logos/legrand.svg";
import schneiderLogo from "@/assets/logos/schneider.svg";
import atlanticLogo from "@/assets/logos/atlantic.svg";
import pointpLogo from "@/assets/logos/pointp.svg";
import castoramaLogo from "@/assets/logos/castorama.svg";
import rexelLogo from "@/assets/logos/rexel.svg";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

interface Partner {
  name: string;
  url: string;
  description: string;
  logo?: string;
}

interface PartnerCategory {
  title: string;
  icon: string;
  partners: Partner[];
}

const partnerCategories: PartnerCategory[] = [
  {
    title: "Étanchéité & Carrelage",
    icon: "🛁",
    partners: [
      { name: "Schlüter-Systems", url: "https://www.schluter.fr", description: "Systèmes d'étanchéité et profilés", logo: schluterLogo },
      { name: "Weber", url: "https://www.weber.fr", description: "Mortiers et enduits professionnels", logo: weberLogo },
      { name: "Wedi", url: "https://www.wedi.de/fr", description: "Panneaux de construction étanches" },
      { name: "Mapei", url: "https://www.mapei.com/fr", description: "Colles et produits chimiques" },
      { name: "Kerakoll", url: "https://www.kerakoll.com/fr", description: "Colles et joints écologiques" },
      { name: "Ceramica.fr", url: "https://www.ceramica.fr", description: "Carrelages et céramiques" },
      { name: "Parquet-Carrelage.com", url: "https://www.parquet-carrelage.com", description: "Revêtements de sol" },
      { name: "Eiffel Carrelage", url: "#", description: "Carrelages professionnels" },
      { name: "AS Decarreaux", url: "#", description: "Spécialiste carrelage" },
    ],
  },
  {
    title: "Sanitaires & Plomberie",
    icon: "🚿",
    partners: [
      { name: "Geberit", url: "https://www.geberit.fr", description: "Systèmes sanitaires", logo: geberitLogo },
      { name: "Cedeo", url: "https://www.cedeo.fr", description: "Distribution sanitaire chauffage" },
      { name: "Espace Aubade", url: "https://www.frenchaubade.fr", description: "Sanitaires et salles de bain" },
      { name: "Wirquin", url: "https://www.wirquin.fr", description: "Plomberie et évacuation" },
      { name: "Sawiday", url: "https://www.sawiday.fr", description: "Équipements salle de bain" },
      { name: "Cosyneo", url: "https://www.cosyneo.com", description: "Équipements de salle de bain" },
    ],
  },
  {
    title: "Robinetterie & Équipements",
    icon: "🔧",
    partners: [
      { name: "Horus", url: "https://www.hfrob.fr", description: "Robinetterie française haut de gamme" },
      { name: "Hudson Reed", url: "https://www.hudsonreed.fr", description: "Robinetterie et douches design" },
      { name: "CMR", url: "https://www.cmr-bain.fr", description: "Robinetterie et équipements sanitaires" },
      { name: "MaSalleDeBain.com", url: "https://www.masalledebain.com", description: "Équipements sanitaires" },
      { name: "Rue du Bain", url: "https://www.ruedubain.com", description: "Équipements de salle de bain" },
      { name: "Reuter", url: "https://www.reuter.com", description: "Équipements sanitaires premium" },
    ],
  },
  {
    title: "Électricité & Chauffage",
    icon: "⚡",
    partners: [
      { name: "Legrand", url: "https://www.legrand.fr", description: "Électricité et domotique", logo: legrandLogo },
      { name: "Schneider Electric", url: "https://www.se.com/fr", description: "Solutions électriques", logo: schneiderLogo },
      { name: "Atlantic", url: "https://www.atlantic.fr", description: "Chauffage et eau chaude", logo: atlanticLogo },
      { name: "Corston", url: "#", description: "Appareillages électriques design" },
      { name: "Mdelec", url: "#", description: "Distribution électrique" },
      { name: "Arnould", url: "#", description: "Appareillages électriques" },
      { name: "Rexel", url: "https://www.rexel.fr", description: "Distribution matériel électrique", logo: rexelLogo },
    ],
  },
  {
    title: "Négoce & Matériaux",
    icon: "🏗️",
    partners: [
      { name: "Point.P", url: "https://www.pointp.fr", description: "Matériaux de construction", logo: pointpLogo },
      { name: "La Plateforme du Bâtiment", url: "https://www.laplateforme.com", description: "Matériaux de construction" },
      { name: "Guimier", url: "https://www.guimier.fr", description: "Négoce en matériaux" },
      { name: "Tible et Dumont", url: "#", description: "Fournisseur professionnel" },
      { name: "Schmitt Ney", url: "https://www.schmitt-ney.fr", description: "Négoce sanitaire" },
      { name: "Foussier", url: "https://www.foussier.fr", description: "Quincaillerie professionnelle" },
      { name: "Legallais", url: "https://www.legallais.com", description: "Fournitures du bâtiment" },
    ],
  },
  {
    title: "Mobilier & Design",
    icon: "✨",
    partners: [
      { name: "David B", url: "https://www.davidb.fr", description: "Salles de bain design" },
      { name: "Envie de Bain", url: "https://www.enviedebain.fr", description: "Showroom salle de bain" },
      { name: "Tots", url: "#", description: "Parois de douche sur mesure" },
      { name: "Democratik Design", url: "#", description: "Design et décoration" },
      { name: "Poalgi", url: "https://www.poalgi.com", description: "Éviers et vasques design" },
      { name: "Planizia", url: "https://www.planizia.com", description: "Plans de travail en pierre" },
    ],
  },
  {
    title: "Grandes Surfaces & E-commerce",
    icon: "🛒",
    partners: [
      { name: "Leroy Merlin", url: "https://www.leroymerlin.fr", description: "Grande surface de bricolage" },
      { name: "IKEA", url: "https://www.ikea.com/fr", description: "Mobilier et accessoires" },
      { name: "ManoMano", url: "https://www.manomano.fr", description: "Bricolage et jardinage" },
      { name: "Castorama", url: "https://www.castorama.fr", description: "Grande surface de bricolage", logo: castoramaLogo },
    ],
  },
  {
    title: "Partenaires Métier",
    icon: "🤝",
    partners: [
      { name: "Houzz", url: "https://www.houzz.fr/pro/qualirenovation/qualirenovation-by-qualiconcept", description: "Notre profil professionnel" },
      { name: "Instagram", url: "https://www.instagram.com/qualirenovation__travaux/", description: "Suivez nos réalisations" },
      { name: "Unikalo Ivry", url: "https://www.unikalo.com", description: "Peintures professionnelles" },
    ],
  },
];

export default function Partenaires() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-stone to-background py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
              Nos Partenaires
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Nous travaillons avec les meilleures marques du secteur pour vous garantir 
              des matériaux de qualité et des finitions irréprochables.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners by Category */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-16">
            {partnerCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="font-display text-2xl md:text-3xl font-semibold">
                    {category.title}
                  </h2>
                  <div className="flex-1 h-px bg-border ml-4" />
                </div>

                {/* Partners Grid */}
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
                  variants={stagger}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {category.partners.map((partner, index) => (
                    <motion.a
                      key={index}
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300 min-h-[120px]"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.02, y: -3 }}
                    >
                      {partner.logo ? (
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className="h-8 md:h-10 w-auto object-contain grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300 mb-2"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                          <span className="font-display text-lg font-bold text-primary">
                            {partner.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <h3 className="font-display text-sm font-semibold text-foreground leading-tight">
                        {partner.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {partner.description}
                      </p>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Vous souhaitez devenir partenaire ?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Contactez-nous pour discuter d'un partenariat et rejoindre notre réseau de professionnels.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/devis#devis-form"
                className="inline-block bg-accent text-accent-foreground px-8 py-4 rounded-full font-semibold hover:bg-accent/90 transition-colors"
              >
                Nous contacter
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
