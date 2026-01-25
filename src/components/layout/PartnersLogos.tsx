import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Import SVG logos
import schluterLogo from "@/assets/logos/schluter.svg";
import geberitLogo from "@/assets/logos/geberit.svg";
import weberLogo from "@/assets/logos/weber.svg";
import legrandLogo from "@/assets/logos/legrand.svg";
import schneiderLogo from "@/assets/logos/schneider.svg";
import atlanticLogo from "@/assets/logos/atlantic.svg";

// Partner data with real SVG logos and text fallbacks
const partners = [
  { 
    name: "Schlüter-Systems", 
    url: "https://www.schluter.fr",
    logo: schluterLogo,
  },
  { 
    name: "Geberit", 
    url: "https://www.geberit.fr",
    logo: geberitLogo,
  },
  { 
    name: "Weber", 
    url: "https://www.weber.fr",
    logo: weberLogo,
  },
  { 
    name: "Legrand", 
    url: "https://www.legrand.fr",
    logo: legrandLogo,
  },
  { 
    name: "Schneider Electric", 
    url: "https://www.se.com/fr",
    logo: schneiderLogo,
  },
  { 
    name: "Atlantic", 
    url: "https://www.atlantic.fr",
    logo: atlanticLogo,
  },
  { 
    name: "Wedi", 
    url: "https://www.wedi.de/fr",
    textLogo: "wedi",
    style: "font-bold text-lg lowercase"
  },
  { 
    name: "Mapei", 
    url: "https://www.mapei.com/fr",
    textLogo: "MAPEI",
    style: "font-bold text-base tracking-wide"
  },
  { 
    name: "Kerakoll", 
    url: "https://www.kerakoll.com/fr",
    textLogo: "KERAKOLL",
    style: "font-semibold text-sm tracking-wide"
  },
  { 
    name: "Cedeo", 
    url: "https://www.cedeo.fr",
    textLogo: "CEDEO",
    style: "font-bold text-base"
  },
  { 
    name: "Espace Aubade", 
    url: "https://www.frenchaubade.fr",
    textLogo: "ESPACE AUBADE",
    style: "font-medium text-xs tracking-wide"
  },
  { 
    name: "Hudson Reed", 
    url: "https://www.hudsonreed.fr",
    textLogo: "HUDSON REED",
    style: "font-medium text-xs tracking-wider"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function PartnersLogos() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">
            Nos partenaires
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Nous travaillons avec les meilleures marques du secteur pour garantir qualité et fiabilité
          </p>
        </motion.div>

        {/* Logos Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {partners.map((partner, index) => (
            <motion.a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center h-16 md:h-20 px-4 bg-white border border-border/50 rounded-lg hover:border-primary/30 hover:shadow-md transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              aria-label={`Visiter le site de ${partner.name}`}
              title={partner.name}
            >
              {partner.logo ? (
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="w-full h-8 md:h-10 object-contain grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                />
              ) : (
                <span className={`text-muted-foreground/70 group-hover:text-primary transition-colors duration-300 ${partner.style || ''}`}>
                  {partner.textLogo}
                </span>
              )}
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Link */}
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            to="/partenaires" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium group"
          >
            Voir tous nos partenaires
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
