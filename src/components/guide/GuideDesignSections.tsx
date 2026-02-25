import { motion } from "framer-motion";
import { GuideSectionHeader } from "./GuideSectionHeader";
import nicolasRoretDouche from "@/assets/nicolas-roret-douche.jpg";
import receveursDouche from "@/assets/receveurs-douche.jpg";
import boulogne3 from "@/assets/boulogne-3.jpg";

export function GuideDesignSections() {
  return (
    <>
      {/* Section 7 - Receveur & baignoire */}
      <section id="section-7" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={7} title="Receveur de douche & baignoire : le bon choix" />

            <div className="border-l-2 p-5 mb-8" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
                <li>Extra-plat, sur pieds ou à carreler selon la configuration</li>
                <li>La hauteur de la culotte détermine les possibilités en copropriété</li>
                <li>Tout ce qui peut fuir doit rester accessible</li>
              </ul>
            </div>

            <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="overflow-hidden">
                  <img src={receveursDouche} alt="Différents types de receveurs de douche" className="w-full h-48 object-cover" />
                </div>
                <div className="text-sm space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Types</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p><strong>Extra-plat</strong> : encastré au sol, accès plain-pied</p>
                      <p><strong>Sur pieds</strong> : surélevé, accès siphon facile</p>
                      <p><strong>À carreler</strong> : douche italienne, pentes intégrées</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Matériaux</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p><strong>Résine</strong> : extra-plat, durable, le plus courant</p>
                      <p><strong>Acrylique</strong> : léger, antidérapant, sensible rayures</p>
                      <p><strong>Grès émaillé</strong> : résistant, lourd, glissant</p>
                      <p><strong>Acier émaillé</strong> : dimensions exactes sur commande</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Copropriété :</strong> la hauteur de la culotte (raccord colonne immeuble) détermine si plain-pied ou sur pied possible. Contrainte incompressible.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Maison :</strong> liberté totale, évacuation adaptable.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Sous le receveur</h4>
                  <p className="text-sm text-muted-foreground">Carrelage dessous — Étanchéité continue — Bonde accessible — Trappe carrelée</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Sous la baignoire</h4>
                  <p className="text-sm text-muted-foreground">Trappe d'accès carrelée — Alignée avec la bonde — Attention meubles bloquants</p>
                </div>
              </div>

              <p className="font-medium text-foreground mt-4">
                Tout ce qui peut fuir doit rester accessible.
              </p>
            </div>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 mt-16"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
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
            <GuideSectionHeader title="Une niche, c'est quoi ?" />

            <div className="border-l-2 p-5 mb-8" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
                <li>Renfoncement dans le mur pour ranger shampoings et savons</li>
                <li>Design épuré et entretien facile</li>
                <li>Une niche bien positionnée change le confort au quotidien</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="grid grid-cols-2 gap-3">
                <div className="overflow-hidden">
                  <img
                    src={boulogne3}
                    alt="Niche au-dessus de la baignoire - Projet Boulogne"
                    className="w-full h-40 md:h-48 object-cover"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Boulogne — Baignoire</p>
                </div>
                <div className="overflow-hidden">
                  <img
                    src={nicolasRoretDouche}
                    alt="Niche encastrée dans une douche - Projet Nicolas Roret"
                    className="w-full h-40 md:h-48 object-cover"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Nicolas Roret — Douche</p>
                </div>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Une <strong className="text-foreground">niche</strong> est un renfoncement créé dans le mur de la douche ou de la baignoire.
                  Elle permet de ranger shampoings, savons et produits sans encombrer l'espace.
                </p>
                <ul className="space-y-2">
                  <li><strong className="text-foreground">Gain de place</strong> : pas de panier suspendu ni d'étagère au sol</li>
                  <li><strong className="text-foreground">Design épuré</strong> : rangement invisible intégré au carrelage</li>
                  <li><strong className="text-foreground">Entretien facile</strong> : pas d'accessoire à nettoyer autour</li>
                  <li><strong className="text-foreground">Durabilité</strong> : intégrée au mur, elle ne bouge pas et ne rouille pas</li>
                </ul>
                <p className="italic">
                  Une niche bien positionnée (à hauteur d'épaule) change le confort au quotidien.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 mt-16"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
      </section>
    </>
  );
}
