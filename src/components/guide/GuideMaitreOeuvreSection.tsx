import { motion } from "framer-motion";
import { HardHat, CheckCircle, Users, Ruler, ExternalLink } from "lucide-react";
import { GuideSectionHeader } from "./GuideSectionHeader";

export function GuideMaitreOeuvreSection() {
  return (
    <section id="section-4" className="py-16 bg-primary text-primary-foreground scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <GuideSectionHeader number={4} icon={HardHat} title="Maître d'œuvre : votre allié de A à Z" variant="light" />

          <div className="bg-primary-foreground/10 rounded-2xl p-6 mb-8">
            <p className="text-lg mb-4">
              👉 <strong>Votre présence n'est pas nécessaire sur le chantier.</strong> Je gère, je coordonne, je vous informe.
            </p>
            <p className="opacity-90">
              Ce n'est pas une obligation légale, mais c'est inclus dans notre prestation car nous ne sommes pas des exécutants :
              <span className="font-semibold"> nous sommes des experts en rénovation</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <Users className="w-8 h-8 mb-3" />
              <h3 className="text-lg font-semibold mb-3">Ce que je fais pour vous :</h3>
              <ul className="space-y-2 text-sm">
                {["Assistance démarches syndic", "Coordination artisans & intervenants", "Gestion des décisions techniques", "Sélection & commande des produits"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Ruler className="w-8 h-8 mb-3" />
              <h3 className="text-lg font-semibold mb-3">Ce que vous gagnez :</h3>
              <ul className="space-y-2 text-sm">
                {["Un interlocuteur unique", "Compatibilité technique vérifiée", "Délais et livraisons coordonnés", "Aucune décision laissée au hasard"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {["✔️ Gestion imprévus", "✔️ Représentation syndic", "✔️ Chantier fluide", "✔️ Sérénité garantie"].map((badge) => (
              <div key={badge} className="bg-primary-foreground/10 rounded-xl p-3 text-center">
                <p className="text-xs font-medium">{badge}</p>
              </div>
            ))}
          </div>

          <div className="bg-primary-foreground/20 rounded-xl p-4 text-center">
            <p className="font-medium italic">
              🧠 Chacun son métier. Le maître d'œuvre ne fait pas "à peu près" : c'est l'art de bien faire, avec méthode et anticipation.
            </p>
          </div>

          <div className="mt-6 text-center">
            <a
              href="https://www.houzz.fr/magazine/pourquoi-est-il-judicieux-de-faire-appel-a-un-maitre-d-oeuvre-stsetivw-vs~87724005"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground underline underline-offset-4 transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Lire l'interview Houzz : "Pourquoi faire appel à un maître d'œuvre ?"</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
