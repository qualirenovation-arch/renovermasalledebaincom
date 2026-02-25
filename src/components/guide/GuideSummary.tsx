import { motion } from "framer-motion";

export function GuideSummary() {
  return (
    <section className="py-16" style={{ backgroundColor: '#124A66' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
            En résumé
          </h2>
          <div className="w-10 h-[2px] mx-auto mb-8" style={{ backgroundColor: '#c2a016' }} />

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {[
              "La technique avant l'esthétique",
              "Inspection, anticipation, accès",
              "Réseaux sécurisés",
              "Étanchéité maîtrisée",
              "Détails soignés",
              "Accompagnement de A à Z",
            ].map((item) => (
              <div key={item} className="border border-white/20 py-4 px-5 text-white text-sm font-light">
                {item}
              </div>
            ))}
          </div>
          <p className="text-lg italic text-white/80 font-light leading-relaxed">
            "Réussir sa salle de bain, ce n'est pas faire des choix au hasard.<br />
            C'est faire les bons choix, au bon moment, avec les bonnes personnes."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
