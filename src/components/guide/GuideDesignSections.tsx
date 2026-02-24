import { motion } from "framer-motion";
import { Droplets, Sparkles, CheckCircle, Home, Building, AlertTriangle, HelpCircle } from "lucide-react";
import { GuideSectionHeader } from "./GuideSectionHeader";
import nicolasRoretDouche from "@/assets/nicolas-roret-douche.jpg";
import receveursDouche from "@/assets/receveurs-douche.jpg";
import boulogne3 from "@/assets/boulogne-3.jpg";

export function GuideDesignSections() {
  return (
    <>
      {/* Section 7 - Receveur & baignoire */}
      <section id="section-7" className="py-16 bg-accent/20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={7} icon={Droplets} title="Receveur de douche & baignoire : le bon choix" />

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={receveursDouche} alt="Différents types de receveurs de douche" className="w-full h-48 object-cover" />
              </div>
              <div className="bg-background rounded-xl p-4 shadow-sm text-sm">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">🔧 Types</h4>
                    <div className="space-y-1 text-xs">
                      <p><strong>Extra-plat</strong> : encastré au sol, accès plain-pied</p>
                      <p><strong>Sur pieds</strong> : surélevé, accès siphon facile</p>
                      <p><strong>À carreler</strong> : douche italienne, pentes intégrées</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">📦 Matériaux</h4>
                    <div className="space-y-1 text-xs">
                      <p><strong>Résine</strong> : extra-plat, durable, le plus courant</p>
                      <p><strong>Acrylique</strong> : léger, antidérapant, sensible rayures</p>
                      <p><strong>Grès émaillé</strong> : résistant, lourd, glissant</p>
                      <p><strong>Acier émaillé</strong> : dimensions exactes sur commande</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                  <span className="bg-accent/50 px-3 py-1 rounded-full">◻️ Carré : 70×70 à 120×120</span>
                  <span className="bg-accent/50 px-3 py-1 rounded-full">▭ Rectangulaire : 70×90 à 180×90</span>
                  <span className="bg-accent/50 px-3 py-1 rounded-full">◔ Quart de cercle : 80 à 110</span>
                </div>

                <div className="bg-accent/30 rounded-lg p-3 text-xs">
                  <strong>💧 Évacuation :</strong> Siphon vertical ou horizontal selon espace • Bonde extra-plate (Ø90mm min.) • Pieds réglables 90-125mm
                </div>
              </div>
            </div>

            {/* Contrainte copropriété */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="mb-2">
                    <strong className="text-foreground">🏢 Copropriété :</strong> la <strong>hauteur de la culotte</strong> (raccord colonne immeuble) détermine si plain-pied ou sur pied possible. Contrainte incompressible.
                  </p>
                  <p>
                    <strong className="text-foreground">🏠 Maison :</strong> liberté totale, évacuation adaptable.
                  </p>
                </div>
              </div>
            </div>

            {/* Maintenance */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-accent/30 rounded-xl p-4">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-primary" /> Sous le receveur
                </h3>
                <p className="text-xs text-muted-foreground">Carrelage dessous • Étanchéité continue • Bonde accessible • Trappe carrelée</p>
              </div>
              <div className="bg-accent/30 rounded-xl p-4">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4 text-primary" /> Sous la baignoire
                </h3>
                <p className="text-xs text-muted-foreground">Trappe d'accès carrelée • Alignée avec la bonde • Attention meubles bloquants</p>
              </div>
            </div>

            <div className="mt-4 bg-primary/10 rounded-lg p-3 text-center">
              <p className="text-primary font-medium text-sm">
                👉 Tout ce qui peut fuir doit rester accessible.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Niches */}
      <section id="section-niches" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader icon={Sparkles} title="Une niche, c'est quoi ?" />

            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative rounded-xl overflow-hidden shadow-lg group">
                  <img
                    src={boulogne3}
                    alt="Niche au-dessus de la baignoire - Projet Boulogne"
                    className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-white text-xs font-medium">Boulogne — Baignoire</p>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden shadow-lg group">
                  <img
                    src={nicolasRoretDouche}
                    alt="Niche encastrée dans une douche - Projet Nicolas Roret"
                    className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-white text-xs font-medium">Nicolas Roret — Douche</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-background rounded-xl p-6 shadow-sm border border-primary/10">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Définition
                  </h3>
                  <p className="text-muted-foreground">
                    Une <strong>niche</strong> est un renfoncement créé dans le mur de la douche ou de la baignoire.
                    Elle permet de ranger shampoings, savons et produits sans encombrer l'espace.
                  </p>
                </div>

                <div className="bg-background rounded-xl p-6 shadow-sm border border-primary/10">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    À quoi ça sert ?
                  </h3>
                  <ul className="text-muted-foreground space-y-2">
                    {[
                      { label: "Gain de place", desc: "pas de panier suspendu ni d'étagère au sol" },
                      { label: "Design épuré", desc: "rangement invisible intégré au carrelage" },
                      { label: "Entretien facile", desc: "pas d'accessoire à nettoyer autour" },
                      { label: "Durabilité", desc: "intégrée au mur, elle ne bouge pas et ne rouille pas" },
                    ].map(({ label, desc }) => (
                      <li key={label} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span><strong>{label}</strong> : {desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="text-primary font-medium text-sm">
                    💡 Une niche bien positionnée (à hauteur d'épaule) change le confort au quotidien.
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
