import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GuideSectionHeader } from "./GuideSectionHeader";

export function GuideMaitreOeuvreSection() {
  return (
    <section id="section-4" className="py-16 bg-background scroll-mt-20" style={{ backgroundColor: '#124A66' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <GuideSectionHeader number={4} title="Maître d'oeuvre : votre allié de A à Z" variant="light" />

          <div className="space-y-6 text-sm leading-relaxed text-white/80">
            <p className="text-base">
              <strong className="text-white">Votre présence n'est pas nécessaire sur le chantier.</strong> Je gère, je coordonne, je vous informe.
            </p>
            <p>
              Ce n'est pas une obligation légale, mais c'est inclus dans notre prestation car nous ne sommes pas des exécutants :
              <span className="font-semibold text-white"> nous sommes des experts en rénovation</span>.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-base font-medium text-white mb-3">Ce que je fais pour vous :</h3>
                <ul className="space-y-1.5 text-sm text-white/80">
                  <li>Assistance démarches syndic</li>
                  <li>Coordination artisans & intervenants</li>
                  <li>Gestion des décisions techniques</li>
                  <li>Sélection & commande des produits</li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-medium text-white mb-3">Ce que vous gagnez :</h3>
                <ul className="space-y-1.5 text-sm text-white/80">
                  <li>Un interlocuteur unique</li>
                  <li>Compatibilité technique vérifiée</li>
                  <li>Délais et livraisons coordonnés</li>
                  <li>Aucune décision laissée au hasard</li>
                </ul>
              </div>
            </div>

            <p className="mt-6 text-white italic">
              Chacun son métier. Le maître d'oeuvre ne fait pas "à peu près" : c'est l'art de bien faire, avec méthode et anticipation.
            </p>

            <div className="mt-4">
              <a
                href="https://www.houzz.fr/magazine/pourquoi-est-il-judicieux-de-faire-appel-a-un-maitre-d-oeuvre-stsetivw-vs~87724005"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white underline underline-offset-4 transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Lire l'interview Houzz : "Pourquoi faire appel à un maître d'oeuvre ?"</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
