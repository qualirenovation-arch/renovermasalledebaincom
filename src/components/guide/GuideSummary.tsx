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

          {/* Signature Carina N. — L'Oreal Heritage Regular, alignée à droite */}
          <div className="flex justify-end mt-6">
            <span
              className="opacity-90"
              style={{
                fontFamily: "'LOreal Heritage', 'Brush Script MT', 'Segoe Script', cursive",
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                color: '#E6EEF2',
                fontWeight: 400,
              }}
            >
              Carina N.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
