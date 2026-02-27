import { motion } from "framer-motion";
import { GuideSectionHeader } from "./GuideSectionHeader";
import guideJointNoir from "@/assets/guide-joint-noir.webp";
import guideJointAssorti from "@/assets/guide-joint-assorti.webp";
import guideProfilFinition from "@/assets/guide-profil-finition.webp";
import cielDePluiePlafond from "@/assets/chatelet-ciel-pluie-plafond.jpg";
import nicolasRoretDouche from "@/assets/nicolas-roret-douche.jpg";
import boulogne3 from "@/assets/boulogne-3.jpg";

export function GuideDetailsSections() {
  return (
    <>
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
                    loading="lazy"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Boulogne — Baignoire</p>
                </div>
                <div className="overflow-hidden">
                  <img
                    src={nicolasRoretDouche}
                    alt="Niche encastrée dans une douche - Projet Nicolas Roret"
                    className="w-full h-40 md:h-48 object-cover"
                    loading="lazy"
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

      {/* Section 11 - Joints & finitions */}
      <section id="section-11" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={12} title="Joints, profils et finitions : le diable se cache dans le détail" />

            <div className="border-l-2 p-5 mb-8" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
                <li>Le joint mortier définit le style : assorti ou contrasté</li>
                <li>Le joint silicone garantit l'étanchéité aux angles</li>
                <li>Les profils de finition doivent s'intégrer, pas attirer l'oeil</li>
              </ul>
            </div>

            <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
              <div>
                <h3 className="text-lg font-light mb-4">Joint mortier</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img src={guideJointAssorti} alt="Joint assorti au carrelage" className="w-full h-48 object-cover mb-2" loading="lazy" />
                    <p className="text-sm"><strong>Joint assorti</strong> — Rendu uniforme et élégant</p>
                  </div>
                  <div>
                    <img src={guideJointNoir} alt="Joint contrasté foncé" className="w-full h-48 object-cover mb-2" loading="lazy" />
                    <p className="text-sm"><strong>Joint foncé</strong> — Souligne la pose et le calepinage</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-light mb-3">Joint silicone (angles & zones d'eau)</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Souple, absorbe les mouvements, garantit l'étanchéité. À refaire dès la moindre fissure.
                </p>
                <p className="text-sm italic">
                  Conseil : silicone assorti au carrelage pour une finition discrète.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-lg font-light mb-3">Profils de finition</h3>
                  <p className="text-sm text-muted-foreground mb-2">Choisis assortis à la robinetterie et paroi de douche.</p>
                  <p className="text-sm italic">Le profil doit s'intégrer, pas attirer l'oeil.</p>
                </div>
                <div>
                  <img src={guideProfilFinition} alt="Profil Schlüter assorti robinetterie" className="w-full h-48 object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 mt-16"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
      </section>

      {/* Section 12 - Robinetterie encastrée */}
      <section id="section-12" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={13} title="Robinetterie encastrée : anticiper dès la conception" />

            <div className="border-l-2 p-5 mb-8" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
                <li>Impose un doublage mural et une anticipation dès la conception</li>
                <li>Ce choix se fait avant les cloisons et le carrelage</li>
                <li>Mitigeur thermostatique + ciel de pluie + douchette</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>Impose : doublage mural, anticipation dès conception, pose irréprochable.</p>
                <ul className="space-y-2">
                  <li>Mitigeur encastré thermostatique</li>
                  <li>Ciel de pluie encastré plafond</li>
                  <li>Douchette à main complémentaire</li>
                </ul>
                <p className="font-medium text-foreground mt-4">Ce choix se fait avant les cloisons et le carrelage.</p>
              </div>
              <div>
                <img
                  src={cielDePluiePlafond}
                  alt="Ciel de pluie encastré au plafond avec robinetterie noire"
                  className="w-full h-72 object-cover"
                  loading="lazy"
                />
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Ciel de pluie encastré plafond — finition noire mate
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
