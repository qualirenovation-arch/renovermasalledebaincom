import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export function GuideSummary() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-serif mb-8">
            🎯 En résumé
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              "La technique avant l'esthétique",
              "Inspection, anticipation, accès",
              "Réseaux sécurisés",
              "Étanchéité maîtrisée",
              "Détails soignés",
              "Accompagnement de A à Z",
            ].map((item) => (
              <div key={item} className="bg-primary-foreground/10 rounded-xl p-5 flex items-center gap-4">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span className="font-medium text-left">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-xl italic opacity-90">
            "Réussir sa salle de bain, ce n'est pas faire des choix au hasard.<br />
            C'est faire les bons choix, au bon moment, avec les bonnes personnes."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
