import { motion } from "framer-motion";

export function GuideHero() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-accent/30 to-background overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Guide Expert
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
              Réussir sa salle de bain : le guide travaux
            </h1>
            <p className="text-xl md:text-2xl text-primary font-medium mb-4">
              Le guide complet pour une rénovation durable et sans mauvaises surprises
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une salle de bain réussie ne se résume pas à un beau carrelage ou à une jolie robinetterie.
              Elle repose avant tout sur des choix techniques solides, faits au bon moment, dans le bon ordre.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-lg text-muted-foreground italic border-l-4 border-primary pl-6 text-left">
              Ce guide reprend notre méthode, issue du terrain, pour concevoir et rénover une salle de bain qui fonctionne aujourd'hui… et encore dans 10 ans.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
