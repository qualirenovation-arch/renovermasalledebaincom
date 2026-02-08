import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { PartnerCTA } from "@/components/home/PartnerCTA";

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
import asDecarreauxLogo from "@/assets/logos/as-decarreaux.svg";
import mosaicFactoryLogo from "@/assets/logos/mosaic-factory.svg";
import mosaicDelSurLogo from "@/assets/logos/mosaic-del-sur.svg";
import houzzLogo from "@/assets/logos/houzz.png";
import leroyMerlinLogo from "@/assets/logos/leroy-merlin.svg";
import ikeaLogo from "@/assets/logos/ikea.svg";
import manomanoLogo from "@/assets/logos/manomano.svg";
import mapeiLogo from "@/assets/logos/mapei.svg";
import farrowBallLogo from "@/assets/logos/farrow-ball.svg";
import wediLogo from "@/assets/logos/wedi.svg";
import kerakollLogo from "@/assets/logos/kerakoll.svg";
import cedeoLogo from "@/assets/logos/cedeo.svg";
import littleGreeneLogo from "@/assets/logos/little-greene.svg";
import benjaminMooreLogo from "@/assets/logos/benjamin-moore.svg";
import wirquinLogo from "@/assets/logos/wirquin.svg";
import unikaloLogo from "@/assets/logos/unikalo.svg";
import ressourceLogo from "@/assets/logos/ressource.svg";
import argileLogo from "@/assets/logos/argile.svg";
import hudsonReedLogo from "@/assets/logos/hudson-reed.svg";
import horusLogo from "@/assets/logos/horus.svg";
import sklumLogo from "@/assets/logos/sklum.svg";
import legallaisLogo from "@/assets/logos/legallais.svg";
import foussierLogo from "@/assets/logos/foussier.svg";
import espaceAubadeLogo from "@/assets/logos/espace-aubade.svg";
import laPlateformeLogo from "@/assets/logos/la-plateforme.svg";
import modelecLogo from "@/assets/logos/modelec.svg";
import poalgiLogo from "@/assets/logos/poalgi.svg";
import sweeekLogo from "@/assets/logos/sweeek.svg";
import groheLogo from "@/assets/logos/grohe.svg";
import alliaLogo from "@/assets/logos/allia.svg";
import vitraLogo from "@/assets/logos/vitra.svg";
import planiziaLogo from "@/assets/logos/planizia.svg";
import florimLogo from "@/assets/logos/florim.svg";
import zucchettiLogo from "@/assets/logos/zucchetti.svg";
import dornbrachtLogo from "@/assets/logos/dornbracht.svg";
import mutinaLogo from "@/assets/logos/mutina.svg";
import appianiLogo from "@/assets/logos/appiani.svg";
import marazziLogo from "@/assets/logos/marazzi.svg";
import ragnoLogo from "@/assets/logos/ragno.svg";
import irisCeramicaLogo from "@/assets/logos/iris-ceramica.svg";
import bocklipLogo from "@/assets/logos/bocklip.svg";
import plumLogo from "@/assets/logos/plum.svg";
import superfrontLogo from "@/assets/logos/superfront.svg";
import noremaxLogo from "@/assets/logos/noremax.svg";
import koakDesignLogo from "@/assets/logos/koak-design.svg";
import etsyLogo from "@/assets/logos/etsy.svg";
import thermorLogo from "@/assets/logos/thermor.svg";
import distribainLogo from "@/assets/logos/distribain.svg";

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
