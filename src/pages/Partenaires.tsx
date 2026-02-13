import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { OGTags } from "@/components/seo/OGTags";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { PartnerCTA } from "@/components/home/PartnerCTA";

// SVG logos from public directory
const schluterLogo = "/images/logos/schluter.svg";
const geberitLogo = "/images/logos/geberit.svg";
const weberLogo = "/images/logos/weber.svg";
const legrandLogo = "/images/logos/legrand.svg";
const schneiderLogo = "/images/logos/schneider.svg";
const atlanticLogo = "/images/logos/atlantic.svg";
const pointpLogo = "/images/logos/pointp.svg";
const castoramaLogo = "/images/logos/castorama.svg";
const rexelLogo = "/images/logos/rexel.svg";
const asDecarreauxLogo = "/images/logos/as-decarreaux.svg";
const mosaicFactoryLogo = "/images/logos/mosaic-factory.svg";
const mosaicDelSurLogo = "/images/logos/mosaic-del-sur.svg";
const houzzLogo = "/images/logos/houzz.png";
const leroyMerlinLogo = "/images/logos/leroy-merlin.svg";
const ikeaLogo = "/images/logos/ikea.svg";
const manomanoLogo = "/images/logos/manomano.svg";
const mapeiLogo = "/images/logos/mapei.svg";
const farrowBallLogo = "/images/logos/farrow-ball.svg";
const wediLogo = "/images/logos/wedi.svg";
const kerakollLogo = "/images/logos/kerakoll.svg";
const cedeoLogo = "/images/logos/cedeo.svg";
const littleGreeneLogo = "/images/logos/little-greene.svg";
const benjaminMooreLogo = "/images/logos/benjamin-moore.svg";
const wirquinLogo = "/images/logos/wirquin.svg";
const unikaloLogo = "/images/logos/unikalo.svg";
const ressourceLogo = "/images/logos/ressource.svg";
const argileLogo = "/images/logos/argile.svg";
const hudsonReedLogo = "/images/logos/hudson-reed.svg";
const horusLogo = "/images/logos/horus.svg";
const sklumLogo = "/images/logos/sklum.svg";
const legallaisLogo = "/images/logos/legallais.svg";
const foussierLogo = "/images/logos/foussier.svg";
const espaceAubadeLogo = "/images/logos/espace-aubade.svg";
const laPlateformeLogo = "/images/logos/la-plateforme.svg";
const modelecLogo = "/images/logos/modelec.svg";
const poalgiLogo = "/images/logos/poalgi.svg";
const sweeekLogo = "/images/logos/sweeek.svg";
const groheLogo = "/images/logos/grohe.svg";
const alliaLogo = "/images/logos/allia.svg";
const vitraLogo = "/images/logos/vitra.svg";
const planiziaLogo = "/images/logos/planizia.svg";
const florimLogo = "/images/logos/florim.svg";
const zucchettiLogo = "/images/logos/zucchetti.svg";
const dornbrachtLogo = "/images/logos/dornbracht.svg";
const mutinaLogo = "/images/logos/mutina.svg";
const appianiLogo = "/images/logos/appiani.svg";
const marazziLogo = "/images/logos/marazzi.svg";
const ragnoLogo = "/images/logos/ragno.svg";
const irisCeramicaLogo = "/images/logos/iris-ceramica.svg";
const bocklipLogo = "/images/logos/bocklip.svg";
const plumLogo = "/images/logos/plum.svg";
const superfrontLogo = "/images/logos/superfront.svg";
const noremaxLogo = "/images/logos/noremax.svg";
const koakDesignLogo = "/images/logos/koak-design.svg";
const etsyLogo = "/images/logos/etsy.svg";
const thermorLogo = "/images/logos/thermor.svg";
const distribainLogo = "/images/logos/distribain.svg";

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
  iconComponent?: React.ReactNode;
}

interface PartnerCategory {
  title: string;
  icon: string;
  partners: Partner[];
}

// MARQUES - Fabricants de produits
const brandCategories: PartnerCategory[] = [
  {
    title: "Étanchéité & Carrelage",
    icon: "🛁",
    partners: [
      { name: "Schlüter-Systems", url: "https://www.schluter.fr", description: "Systèmes d'étanchéité et profilés", logo: schluterLogo },
      { name: "Florim", url: "https://www.florim.com/fr", description: "Carrelages grands formats italiens", logo: florimLogo },
      { name: "Mutina", url: "https://www.mutina.it", description: "Carrelages design italien", logo: mutinaLogo },
      { name: "Appiani", url: "https://www.appiani.it", description: "Mosaïques céramiques italiennes", logo: appianiLogo },
       { name: "Marazzi", url: "https://www.marazzi.it", description: "Carrelages italiens premium", logo: marazziLogo },
       { name: "Ragno", url: "https://www.ragno.it", description: "Carrelages italiens design", logo: ragnoLogo },
       { name: "Iris Ceramica", url: "https://www.irisceramica.it", description: "Céramiques italiennes haut de gamme", logo: irisCeramicaLogo },
       { name: "Mosaic Factory", url: "https://mosaicfactory.com/fr/", description: "Zellige, terrazzo & carreaux ciment", logo: mosaicFactoryLogo },
      { name: "Maison Bahya", url: "https://www.maisonbahya.com", description: "Carreaux de ciment artisanaux" },
      { name: "Ceramica Fussaro", url: "https://www.ceramicafussaro.it", description: "Céramiques italiennes artisanales" },
      { name: "Secis Mosaic", url: "https://www.secis.fr", description: "Mosaïques et carreaux artisanaux" },
      { name: "Porcelanosa", url: "https://www.porcelanosa.com/fr", description: "Carrelages et revêtements premium" },
      { name: "Winckelmans", url: "https://www.winckelmans.com", description: "Carreaux céramiques belges" },
      { name: "Mosaic del Sur", url: "https://www.carreauxmosaic.com", description: "Carreaux de ciment sur mesure", logo: mosaicDelSurLogo },
      { name: "Weber", url: "https://www.weber.fr", description: "Mortiers et enduits professionnels", logo: weberLogo },
      { name: "Wedi", url: "https://www.wedi.de/fr", description: "Panneaux de construction étanches", logo: wediLogo },
      { name: "Mapei", url: "https://www.mapei.com/fr", description: "Colles et produits chimiques", logo: mapeiLogo },
      { name: "Kerakoll", url: "https://www.kerakoll.com/fr", description: "Colles et joints écologiques", logo: kerakollLogo },
    ],
  },
  {
    title: "Sanitaires & Plomberie",
    icon: "🚿",
    partners: [
      { name: "Geberit", url: "https://www.geberit.fr", description: "Systèmes sanitaires", logo: geberitLogo },
      { name: "Grohe", url: "https://www.grohe.fr", description: "Robinetterie et systèmes sanitaires", logo: groheLogo },
      { name: "Allia", url: "https://www.allia.fr", description: "Céramiques et sanitaires français", logo: alliaLogo },
      { name: "Vitra", url: "https://www.vitra-tr.com", description: "Sanitaires et céramiques turcs", logo: vitraLogo },
      { name: "Wirquin", url: "https://www.wirquin.fr", description: "Plomberie et évacuation", logo: wirquinLogo },
    ],
  },
  {
    title: "Robinetterie & Équipements",
    icon: "🔧",
    partners: [
      { name: "Dornbracht", url: "https://www.dornbracht.com/fr", description: "Robinetterie allemande ultra-premium", logo: dornbrachtLogo },
      { name: "Zucchetti", url: "https://www.zucchettidesign.it", description: "Robinetterie design italienne", logo: zucchettiLogo },
      { name: "Horus", url: "https://www.hfrob.fr", description: "Robinetterie française haut de gamme", logo: horusLogo },
      { name: "Hudson Reed", url: "https://www.hudsonreed.fr", description: "Robinetterie et douches design", logo: hudsonReedLogo },
      { name: "Poalgi", url: "https://www.poalgi.com", description: "Éviers et vasques design", logo: poalgiLogo },
    ],
  },
  {
    title: "Électricité",
    icon: "⚡",
    partners: [
      { name: "Legrand", url: "https://www.legrand.fr", description: "Électricité et domotique", logo: legrandLogo },
      { name: "Schneider Electric", url: "https://www.se.com/fr", description: "Solutions électriques", logo: schneiderLogo },
      { name: "Modelec", url: "https://www.modelec.com/fr", description: "Appareillages électriques haut de gamme", logo: modelecLogo },
      { name: "Corston", url: "#", description: "Appareillages électriques design" },
      { name: "Arnould", url: "#", description: "Appareillages électriques" },
    ],
  },
  {
    title: "Chauffe-eau & Eau Chaude",
    icon: "🔥",
    partners: [
      { name: "Atlantic", url: "https://www.atlantic.fr", description: "Chauffe-eau et pompes à chaleur", logo: atlanticLogo },
      { name: "Thermor", url: "https://www.thermor.fr", description: "Chauffe-eau et radiateurs", logo: thermorLogo },
    ],
  },
  {
    title: "Mobilier & Design",
    icon: "✨",
    partners: [
      { name: "Sklum", url: "https://www.sklum.com/fr", description: "Mobilier design et décoration", logo: sklumLogo },
      { name: "Sweeek", url: "https://www.sweeek.fr", description: "Mobilier et équipements maison", logo: sweeekLogo },
      { name: "Tots", url: "#", description: "Parois de douche sur mesure" },
      { name: "Planizia", url: "https://www.planizia.com", description: "Plans de travail en pierre", logo: planiziaLogo },
      { name: "Bocklip", url: "https://www.bocklip.com", description: "Façades compatibles IKEA", logo: bocklipLogo },
      { name: "Plum", url: "https://www.plfrn.com", description: "Façades sur mesure compatibles IKEA", logo: plumLogo },
      { name: "Superfront", url: "https://www.superfront.com", description: "Façades design compatibles IKEA", logo: superfrontLogo },
      { name: "Noremax", url: "https://www.noremax.no", description: "Façades scandinaves compatibles IKEA", logo: noremaxLogo },
      { name: "Koak Design", url: "https://www.koakdesign.com", description: "Façades bois massif compatibles IKEA", logo: koakDesignLogo },
      { name: "Cosyneo", url: "https://www.cosyneo.com", description: "Mobilier et équipements design" },
    ],
  },
  {
    title: "Peinture",
    icon: "🎨",
    partners: [
      { name: "Farrow & Ball", url: "https://www.farrow-ball.com/fr", description: "Peintures et papiers peints haut de gamme", logo: farrowBallLogo },
      { name: "Little Greene", url: "https://www.littlegreene.fr", description: "Peintures et couleurs britanniques", logo: littleGreeneLogo },
      { name: "Ressource", url: "https://www.ressource-peintures.com", description: "Peintures écologiques françaises", logo: ressourceLogo },
      { name: "Argile", url: "https://www.argile-peinture.fr", description: "Peintures naturelles à l'argile", logo: argileLogo },
      { name: "Unikalo", url: "https://www.unikalo.com", description: "Peintures professionnelles", logo: unikaloLogo },
      { name: "Benjamin Moore", url: "https://www.benjaminmoore.com/fr-fr", description: "Peintures américaines premium", logo: benjaminMooreLogo },
    ],
  },
];

// FOURNISSEURS - Distributeurs et points de vente
const supplierCategories: PartnerCategory[] = [
   {
     title: "Négoce & Matériaux",
     icon: "🏗️",
     partners: [
       { name: "Point.P", url: "https://www.pointp.fr", description: "Matériaux de construction", logo: pointpLogo },
       { name: "La Plateforme du Bâtiment", url: "https://www.laplateforme.com", description: "Matériaux de construction", logo: laPlateformeLogo },
       { name: "Distribain", url: "https://www.distribain.fr", description: "Sanitaire et matériaux", logo: distribainLogo },
       { name: "Guimier", url: "https://www.guimier.fr", description: "Négoce en matériaux" },
       { name: "Tible et Dumont", url: "#", description: "Fournisseur professionnel" },
       { name: "Foussier", url: "https://www.foussier.fr", description: "Quincaillerie professionnelle", logo: foussierLogo },
       { name: "Legallais", url: "https://www.legallais.com", description: "Fournitures du bâtiment", logo: legallaisLogo },
     ],
   },
  {
    title: "Distribution Sanitaire & Électrique",
    icon: "📦",
    partners: [
      { name: "Cedeo", url: "https://www.cedeo.fr", description: "Distribution sanitaire chauffage", logo: cedeoLogo },
      { name: "Espace Aubade", url: "https://www.frenchaubade.fr", description: "Sanitaires et salles de bain", logo: espaceAubadeLogo },
      { name: "Schmitt Ney", url: "https://www.schmitt-ney.fr", description: "Négoce sanitaire" },
      { name: "Rexel", url: "https://www.rexel.fr", description: "Distribution matériel électrique", logo: rexelLogo },
    ],
  },
  {
    title: "Showrooms & Spécialistes",
    icon: "🏠",
    partners: [
      { name: "David B", url: "https://www.davidb.fr", description: "Salles de bain design" },
      { name: "Envie de Bain", url: "https://www.enviedebain.fr", description: "Showroom salle de bain" },
      { name: "CMR", url: "https://www.cmr-bain.fr", description: "Robinetterie et équipements sanitaires" },
      { name: "MaSalleDeBain.com", url: "https://www.masalledebain.com", description: "Équipements sanitaires" },
      { name: "Rue du Bain", url: "https://www.ruedubain.com", description: "Équipements de salle de bain" },
      { name: "Sawiday", url: "https://www.sawiday.fr", description: "Équipements salle de bain" },
      { name: "Reuter", url: "https://www.reuter.com", description: "Équipements sanitaires premium" },
      { name: "Democratik Design", url: "#", description: "Design et décoration" },
    ],
  },
  {
    title: "Carrelage & Revêtements",
    icon: "🔲",
    partners: [
      { name: "Ceramica.fr", url: "https://www.ceramica.fr", description: "Carrelages et céramiques" },
      { name: "Parquet-Carrelage.com", url: "https://www.parquet-carrelage.com", description: "Revêtements de sol" },
      { name: "Eiffel Art Construction", url: "https://www.eiffel-art-construction.fr", description: "E-commerce carrelages design" },
      { name: "AS Decarreaux", url: "#", description: "Spécialiste carrelage", logo: asDecarreauxLogo },
    ],
  },
  {
    title: "Grandes Surfaces & E-commerce",
    icon: "🛒",
    partners: [
      { name: "Leroy Merlin", url: "https://www.leroymerlin.fr", description: "Grande surface de bricolage", logo: leroyMerlinLogo },
      { name: "IKEA", url: "https://www.ikea.com/fr", description: "Mobilier et accessoires", logo: ikeaLogo },
      { name: "ManoMano", url: "https://www.manomano.fr", description: "Bricolage et jardinage", logo: manomanoLogo },
      { name: "Castorama", url: "https://www.castorama.fr", description: "Grande surface de bricolage", logo: castoramaLogo },
      { name: "Etsy", url: "https://www.etsy.com/fr", description: "Artisanat et décoration unique", logo: etsyLogo },
    ],
  },
];

// Partenaires Métier
const professionalPartners: PartnerCategory = {
  title: "Partenaires Métier",
  icon: "🤝",
  partners: [
    { name: "Houzz", url: "https://www.houzz.fr/pro/qualirenovation/qualirenovation-by-qualiconcept", description: "Notre profil professionnel", logo: houzzLogo },
    { name: "Instagram", url: "https://www.instagram.com/qualirenovation__travaux/", description: "Suivez nos réalisations", iconComponent: <Instagram className="w-8 h-8 md:w-10 md:h-10" /> },
  ],
};

export default function Partenaires() {
  return (
    <Layout>
      <OGTags
        title="Nos partenaires – Marques et fournisseurs"
        description="Découvrez les marques et fournisseurs de confiance avec lesquels nous travaillons pour vos rénovations de salle de bain : Grohe, Geberit, Schlüter, Wedi..."
        path="/partenaires"
        image={{ type: "page", title: "Nos partenaires", subtitle: "Marques de confiance" }}
      />
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

      {/* SECTION MARQUES */}
      <section className="section-padding pb-8" id="marques">
        <div className="container-custom">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl">🏷️</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary">
                Marques
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Les fabricants de produits avec lesquels nous travaillons pour vous garantir qualité et durabilité.
            </p>
          </motion.div>

          <div className="space-y-12">
            {brandCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xl">{category.icon}</span>
                  <h3 className="font-display text-xl md:text-2xl font-semibold">
                    {category.title}
                  </h3>
                  <div className="flex-1 h-px bg-border ml-4" />
                </div>

                <motion.div
                  className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3"
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
                      className="group bg-white border border-border/50 rounded-lg p-2.5 flex flex-col items-center justify-center text-center hover:border-primary/30 hover:shadow-md transition-all duration-300 min-h-[80px]"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      {partner.logo ? (
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className="h-6 md:h-7 w-auto object-contain grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300 mb-1"
                        />
                      ) : partner.iconComponent ? (
                        <div className="text-muted-foreground/70 group-hover:text-primary transition-colors duration-300 mb-1">
                          {partner.iconComponent}
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mb-1 group-hover:bg-primary/20 transition-colors">
                          <span className="font-display text-sm font-bold text-primary">
                            {partner.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <h4 className="font-display text-xs font-semibold text-foreground leading-tight">
                        {partner.name}
                      </h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
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

      {/* Séparateur */}
      <div className="container-custom">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* SECTION FOURNISSEURS */}
      <section className="section-padding pt-8" id="fournisseurs">
        <div className="container-custom">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl">🏪</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary">
                Fournisseurs & Distributeurs
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Les points de vente, négoces et showrooms où nous nous approvisionnons pour vos projets.
            </p>
          </motion.div>

          <div className="space-y-12">
            {supplierCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xl">{category.icon}</span>
                  <h3 className="font-display text-xl md:text-2xl font-semibold">
                    {category.title}
                  </h3>
                  <div className="flex-1 h-px bg-border ml-4" />
                </div>

                <motion.div
                  className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3"
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
                      className="group bg-white border border-border/50 rounded-lg p-2.5 flex flex-col items-center justify-center text-center hover:border-primary/30 hover:shadow-md transition-all duration-300 min-h-[80px]"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      {partner.logo ? (
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className="h-6 md:h-7 w-auto object-contain grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300 mb-1"
                        />
                      ) : partner.iconComponent ? (
                        <div className="text-muted-foreground/70 group-hover:text-primary transition-colors duration-300 mb-1">
                          {partner.iconComponent}
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mb-1 group-hover:bg-primary/20 transition-colors">
                          <span className="font-display text-sm font-bold text-primary">
                            {partner.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <h4 className="font-display text-xs font-semibold text-foreground leading-tight">
                        {partner.name}
                      </h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
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

      {/* Séparateur */}
      <div className="container-custom">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* PARTENAIRES MÉTIER */}
      <section className="section-padding pt-8 pb-8" id="partenaires-metier">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{professionalPartners.icon}</span>
              <h2 className="font-display text-2xl md:text-3xl font-semibold">
                {professionalPartners.title}
              </h2>
              <div className="flex-1 h-px bg-border ml-4" />
            </div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {professionalPartners.partners.map((partner, index) => (
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
                  ) : partner.iconComponent ? (
                    <div className="text-muted-foreground/70 group-hover:text-primary transition-colors duration-300 mb-2">
                      {partner.iconComponent}
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                      <span className="font-display text-lg font-bold text-primary">
                        {partner.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <h4 className="font-display text-sm font-semibold text-foreground leading-tight">
                    {partner.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {partner.description}
                  </p>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner - Same as À propos page */}
      <PartnerCTA />
    </Layout>
  );
}
