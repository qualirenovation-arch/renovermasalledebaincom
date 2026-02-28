import { motion } from "framer-motion";

export function GuideHero() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4">
              Guide travaux rénovation salle de bain à Paris &amp; Île-de-France – renovermasalledebain.com
            </h1>
            {/* Gold underline */}
            <div className="w-[60px] h-[2px] mx-auto mb-6" style={{ backgroundColor: '#c2a016' }} />
            <p className="text-lg md:text-xl font-normal mb-4">
              Le guide complet pour une rénovation durable et sans mauvaises surprises
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ce guide travaux détaille toutes les étapes pour rénover une salle de bain à Paris et en Île-de-France : planning, étude technique en appartement parisien, démolition, étanchéité conforme au DTU 52.2, plomberie, pose carrelage et garanties décennales.
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-3">
              Que vous souhaitiez refaire une salle de bain ancienne ou moderniser un espace existant, chaque étape est expliquée avec une approche maître d'œuvre rigoureuse.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-base text-muted-foreground italic border-l-2 pl-6 text-left" style={{ borderColor: '#c2a016' }}>
              Ce guide reprend notre méthode, issue du terrain, pour concevoir et rénover une salle de bain en appartement parisien ou en Île-de-France — une salle de bain qui fonctionne aujourd'hui… et encore dans 10 ans.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
