import { motion } from "framer-motion";
import { Search, Droplets, Wind, CheckCircle, Eye, Hammer, Building, AlertTriangle } from "lucide-react";
import { GuideSectionHeader } from "./GuideSectionHeader";

export function GuideInspectionSections() {
  return (
    <>
      {/* Section 1 - Visite initiale */}
      <section id="section-1" className="py-16 bg-accent/20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={1} icon={Search} title="La visite chantier : la technique avant l'esthétique" />
            <div className="bg-background rounded-2xl p-8 shadow-sm">
              <p className="text-lg text-muted-foreground mb-6">
                Lors de la visite, deux points sont prioritaires :
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-accent/30 rounded-xl p-6">
                  <Droplets className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-3">Les évacuations</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Type de colonne (fonte, PVC)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Hauteur disponible</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Emplacement des colonnes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Accessibilité pour maintenance</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-accent/30 rounded-xl p-6">
                  <Wind className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-3">La VMC</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Présence ou absence</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Fonctionnement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Emplacement de la bouche</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Possibilité d'optimisation</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-primary/10 border border-primary/20 rounded-xl">
                <Eye className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground font-medium">
                  Ces deux points conditionnent tout le projet. L'esthétique vient après, jamais avant.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2 - Démolition */}
      <section id="section-2" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={2} icon={Hammer} title="Démolition et inspection des réseaux existants" />
            <div className="bg-accent/30 rounded-2xl p-8">
              <p className="text-lg text-muted-foreground mb-4">
                Après la démolition, nous inspectons systématiquement :
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Les colonnes d'évacuation en fonte</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>L'état des raccords</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Les arrivées d'eau existantes (souvent en plomb dans l'ancien)</span>
                </li>
              </ul>
              <div className="bg-background rounded-xl p-4 border border-primary/20">
                <p className="text-primary font-medium italic">
                  💬 C'est le seul moment où l'on peut vraiment voir ce qui se cache derrière les murs.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3 - Colonnes en fonte & syndic */}
      <section id="section-3" className="py-16 bg-accent/20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={3} icon={Building} title="Colonnes en fonte et syndic : anticiper pour éviter les blocages" />
            <div className="bg-background rounded-2xl p-8 shadow-sm">
              <p className="text-lg text-muted-foreground mb-6">
                Les colonnes en fonte font partie des <strong>parties communes</strong>.
              </p>
              <p className="text-muted-foreground mb-4">Si les fontes sont abîmées :</p>
              <ul className="space-y-3 mb-6">
                {["Nous prévenons le syndic", "Un plombier établit un devis", "Le syndic valide l'intervention", "La colonne est réparée ou remplacée"].map((step, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-800 font-medium">⏱️ Délai à prévoir : environ 15 jours</p>
                  <p className="text-amber-700 mt-2">
                    Ce point est identifié dès le départ, car dans certains cas il est possible d'anticiper l'intervention avant le démarrage du chantier.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
