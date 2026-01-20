import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const partners = [
  { name: "Weber", url: "https://www.weber.fr", description: "Mortiers et enduits professionnels" },
  { name: "Schlüter", url: "https://www.schluter.fr", description: "Systèmes d'étanchéité et profilés" },
  { name: "Wedi", url: "https://www.wedi.de/fr", description: "Panneaux de construction" },
  { name: "La Plateforme du Bâtiment", url: "https://www.laplateforme.com", description: "Matériaux de construction" },
  { name: "Leroy Merlin", url: "https://www.leroymerlin.fr", description: "Grande surface de bricolage" },
  { name: "MaSalleDeBain.com", url: "https://www.masalledebain.com", description: "Équipements sanitaires" },
  { name: "Rue du Bain", url: "https://www.ruedubain.com", description: "Équipements de salle de bain" },
  { name: "Tots", url: "#", description: "Aménagement intérieur" },
  { name: "Democratik Design", url: "#", description: "Design et décoration" },
  { name: "Houzz", url: "https://www.houzz.fr/pro/qualirenovation/qualirenovation-by-qualiconcept", description: "Notre profil professionnel" },
  { name: "Parquet-Carrelage.com", url: "https://www.parquet-carrelage.com", description: "Revêtements de sol" },
  { name: "Poalgi", url: "https://www.poalgi.com", description: "Éviers et vasques design" },
  { name: "IKEA", url: "https://www.ikea.com/fr", description: "Mobilier et accessoires" },
  { name: "Wirquin", url: "https://www.wirquin.fr", description: "Plomberie et évacuation" },
  { name: "Geberit", url: "https://www.geberit.fr", description: "Systèmes sanitaires" },
  { name: "Kerakoll", url: "https://www.kerakoll.com/fr", description: "Colles et joints" },
  { name: "Mapei", url: "https://www.mapei.com/fr", description: "Colles et produits chimiques" },
  { name: "Cosyneo", url: "https://www.cosyneo.com", description: "Équipements de salle de bain" },
  { name: "ManoMano", url: "https://www.manomano.fr", description: "Bricolage et jardinage" },
  { name: "Ceramic Plus", url: "#", description: "Carrelages et faïences" },
  { name: "Guimier", url: "https://www.guimier.fr", description: "Négoce en matériaux" },
  { name: "Tible et Dumont", url: "#", description: "Fournisseur professionnel" },
  { name: "Unikalo Ivry", url: "https://www.unikalo.com", description: "Peintures professionnelles" },
  { name: "Atlantic", url: "https://www.atlantic.fr", description: "Chauffage et eau chaude" },
  { name: "Aubade", url: "https://www.frenchaubade.fr", description: "Sanitaires et salles de bain" },
  { name: "Schmitt Ney", url: "https://www.schmitt-ney.fr", description: "Négoce sanitaire" },
  { name: "Cedeo", url: "https://www.cedeo.fr", description: "Distribution sanitaire chauffage" },
  { name: "Horus", url: "https://www.hfrob.fr", description: "Robinetterie française" },
  { name: "Ceramica.fr", url: "https://www.ceramica.fr", description: "Carrelages et céramiques" },
  { name: "Sawiday", url: "https://www.sawiday.fr", description: "Équipements salle de bain" },
  { name: "Planizia", url: "https://www.planizia.com", description: "Concepteur de plan de travail en pierre" },
  { name: "Reuter", url: "https://www.reuter.com", description: "Équipements sanitaires" },
  { name: "Hudson Reed", url: "https://www.hudsonreed.fr", description: "Robinetterie et douches" },
  { name: "Foussier", url: "https://www.foussier.fr", description: "Quincaillerie professionnelle" },
  { name: "Legallais", url: "https://www.legallais.com", description: "Fournitures du bâtiment" },
  { name: "Legrand", url: "https://www.legrand.fr", description: "Électricité et domotique" },
  { name: "Schneider", url: "https://www.se.com/fr", description: "Solutions électriques" },
  { name: "Corston", url: "#", description: "Appareillages électriques" },
  { name: "David B", url: "https://www.davidb.fr", description: "Salles de bain design" },
  { name: "CMR", url: "https://www.cmr-bain.fr", description: "Robinetterie et équipements sanitaires" },
  { name: "Envie de Bain", url: "https://www.enviedebain.fr", description: "Showroom salle de bain" },
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

      {/* Partners Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            {partners.map((partner, index) => (
              <motion.a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-elevated p-8 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 group"
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="font-display text-2xl font-bold text-primary">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {partner.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {partner.description}
                </p>
              </motion.a>
            ))}
          </motion.div>
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
            <motion.a
              href="/devis"
              className="inline-block bg-accent text-accent-foreground px-8 py-4 rounded-full font-semibold hover:bg-accent/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Nous contacter
            </motion.a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
