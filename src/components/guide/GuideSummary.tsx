import { motion } from "framer-motion";
import carinaSig from "@/assets/carina-signature.svg";
import { GuideSectionHeader } from "./GuideSectionHeader";

export function GuideSummary() {
  return (
    <section className="py-8" style={{ backgroundColor: '#124A66' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="text-center">
            <GuideSectionHeader title="En résumé" variant="light" />
          </div>

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

          {/* Citation — NunitoSans Light Italic, 120%, blanc cassé, line-height augmenté */}
          <p
            className="italic font-light leading-[1.9]"
            style={{
              fontSize: '1.2em',
              color: '#E6EEF2',
              fontFamily: "'Nunito Sans', sans-serif",
            }}
          >
            "Réussir sa salle de bain, ce n'est pas faire des choix au hasard.<br />
            C'est faire les bons choix, au bon moment, avec les bonnes personnes."
          </p>

          {/* Signature Carina N. — SVG, alignée à droite, premium */}
          <div className="flex justify-end mt-6">
            <img
              src={carinaSig}
              alt="Carina N."
              className="w-[100px] md:w-[150px] opacity-90"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
