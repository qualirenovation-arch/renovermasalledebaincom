import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Partner data with SVG paths where available
const partners = [
  { 
    name: "Schlüter", 
    url: "https://www.schluter.fr",
    svg: (
      <svg viewBox="0 0 120 40" className="w-full h-full" role="img" aria-label="Schlüter-Systems">
        <title>Schlüter-Systems</title>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" 
          className="fill-current font-bold text-[14px] tracking-tight" 
          style={{ fontFamily: 'system-ui, sans-serif' }}>
          SCHLÜTER
        </text>
      </svg>
    )
  },
  { 
    name: "Weber", 
    url: "https://www.weber.fr",
    svg: (
      <svg viewBox="0 0 100 40" className="w-full h-full" role="img" aria-label="Weber">
        <title>Weber</title>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" 
          className="fill-current font-bold text-[16px] tracking-wide" 
          style={{ fontFamily: 'system-ui, sans-serif' }}>
          WEBER
        </text>
      </svg>
    )
  },
  { 
    name: "Geberit", 
    url: "https://www.geberit.fr",
    svg: (
      <svg viewBox="0 0 100 40" className="w-full h-full" role="img" aria-label="Geberit">
        <title>Geberit</title>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" 
          className="fill-current font-semibold text-[14px]" 
          style={{ fontFamily: 'system-ui, sans-serif' }}>
          GEBERIT
        </text>
      </svg>
    )
  },
  { 
    name: "Wedi", 
    url: "https://www.wedi.de/fr",
    svg: (
      <svg viewBox="0 0 80 40" className="w-full h-full" role="img" aria-label="Wedi">
        <title>Wedi</title>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" 
          className="fill-current font-bold text-[18px]" 
          style={{ fontFamily: 'system-ui, sans-serif' }}>
          wedi
        </text>
      </svg>
    )
  },
  { 
    name: "Mapei", 
    url: "https://www.mapei.com/fr",
    svg: (
      <svg viewBox="0 0 100 40" className="w-full h-full" role="img" aria-label="Mapei">
        <title>Mapei</title>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" 
          className="fill-current font-bold text-[16px] tracking-wide" 
          style={{ fontFamily: 'system-ui, sans-serif' }}>
          MAPEI
        </text>
      </svg>
    )
  },
  { 
    name: "Kerakoll", 
    url: "https://www.kerakoll.com/fr",
    svg: (
      <svg viewBox="0 0 100 40" className="w-full h-full" role="img" aria-label="Kerakoll">
        <title>Kerakoll</title>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" 
          className="fill-current font-semibold text-[13px]" 
          style={{ fontFamily: 'system-ui, sans-serif' }}>
          KERAKOLL
        </text>
      </svg>
    )
  },
  { 
    name: "Cedeo", 
    url: "https://www.cedeo.fr",
    svg: (
      <svg viewBox="0 0 100 40" className="w-full h-full" role="img" aria-label="Cedeo">
        <title>Cedeo</title>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" 
          className="fill-current font-bold text-[16px]" 
          style={{ fontFamily: 'system-ui, sans-serif' }}>
          CEDEO
        </text>
      </svg>
    )
  },
  { 
    name: "Aubade", 
    url: "https://www.frenchaubade.fr",
    svg: (
      <svg viewBox="0 0 100 40" className="w-full h-full" role="img" aria-label="Espace Aubade">
        <title>Espace Aubade</title>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" 
          className="fill-current font-medium text-[12px] tracking-wide" 
          style={{ fontFamily: 'system-ui, sans-serif' }}>
          ESPACE AUBADE
        </text>
      </svg>
    )
  },
  { 
    name: "Legrand", 
    url: "https://www.legrand.fr",
    svg: (
      <svg viewBox="0 0 100 40" className="w-full h-full" role="img" aria-label="Legrand">
        <title>Legrand</title>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" 
          className="fill-current font-semibold text-[14px]" 
          style={{ fontFamily: 'system-ui, sans-serif' }}>
          LEGRAND
        </text>
      </svg>
    )
  },
  { 
    name: "Schneider Electric", 
    url: "https://www.se.com/fr",
    svg: (
      <svg viewBox="0 0 100 40" className="w-full h-full" role="img" aria-label="Schneider Electric">
        <title>Schneider Electric</title>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" 
          className="fill-current font-semibold text-[10px]" 
          style={{ fontFamily: 'system-ui, sans-serif' }}>
          SCHNEIDER
        </text>
      </svg>
    )
  },
  { 
    name: "Atlantic", 
    url: "https://www.atlantic.fr",
    svg: (
      <svg viewBox="0 0 100 40" className="w-full h-full" role="img" aria-label="Atlantic">
        <title>Atlantic</title>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" 
          className="fill-current font-bold text-[14px]" 
          style={{ fontFamily: 'system-ui, sans-serif' }}>
          ATLANTIC
        </text>
      </svg>
    )
  },
  { 
    name: "Hudson Reed", 
    url: "https://www.hudsonreed.fr",
    svg: (
      <svg viewBox="0 0 120 40" className="w-full h-full" role="img" aria-label="Hudson Reed">
        <title>Hudson Reed</title>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" 
          className="fill-current font-medium text-[12px] tracking-wide" 
          style={{ fontFamily: 'system-ui, sans-serif' }}>
          HUDSON REED
        </text>
      </svg>
    )
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
            >
              <div className="w-full h-8 md:h-10 text-muted-foreground/70 group-hover:text-primary transition-colors duration-300">
                {partner.svg}
              </div>
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
