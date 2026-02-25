import { motion } from "framer-motion";
import { GuideSectionHeader } from "./GuideSectionHeader";
import guideJointNoir from "@/assets/guide-joint-noir.webp";
import guideJointAssorti from "@/assets/guide-joint-assorti.webp";
import guideProfilFinition from "@/assets/guide-profil-finition.webp";
import cielDePluiePlafond from "@/assets/chatelet-ciel-pluie-plafond.jpg";

export function GuideDetailsSections() {
  return (
    <>
      {/* Section 8 - Joints & finitions */}
      <section id="section-8" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={8} title="Joints, profils et finitions : le diable se cache dans le détail" />

            <div className="border-l-2 p-5 mb-8" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
                <li>Le joint mortier définit le style : assorti ou contrasté</li>
                <li>Le joint silicone garantit l'étanchéité aux angles</li>
                <li>Les profils de finition doivent s'intégrer, pas attirer l'oeil</li>
              </ul>
            </div>

            <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
              {/* Joint mortier */}
              <div>
                <h3 className="text-lg font-light mb-4" style={{ color: '#124A66' }}>Joint mortier</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img src={guideJointAssorti} alt="Joint assorti au carrelage" className="w-full h-48 object-cover mb-2" />
                    <p className="text-sm"><strong>Joint assorti</strong> — Rendu uniforme et élégant</p>
                  </div>
                  <div>
                    <img src={guideJointNoir} alt="Joint contrasté foncé" className="w-full h-48 object-cover mb-2" />
                    <p className="text-sm"><strong>Joint foncé</strong> — Souligne la pose et le calepinage</p>
                  </div>
                </div>
              </div>

              {/* Joint silicone */}
              <div>
                <h3 className="text-lg font-light mb-3" style={{ color: '#124A66' }}>Joint silicone (angles & zones d'eau)</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Souple, absorbe les mouvements, garantit l'étanchéité. À refaire dès la moindre fissure.
                </p>
                <p className="text-sm italic">
                  Conseil : silicone assorti au carrelage pour une finition discrète.
                </p>
              </div>

              {/* Profils de finition */}
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-lg font-light mb-3" style={{ color: '#124A66' }}>Profils de finition</h3>
                  <p className="text-sm text-muted-foreground mb-2">Choisis assortis à la robinetterie et paroi de douche.</p>
                  <p className="text-sm italic">Le profil doit s'intégrer, pas attirer l'oeil.</p>
                </div>
                <div>
                  <img src={guideProfilFinition} alt="Profil Schlüter assorti robinetterie" className="w-full h-48 object-cover" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 mt-16"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
      </section>

      {/* Section 9 - Robinetterie encastrée */}
      <section id="section-9" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={9} title="Robinetterie encastrée : anticiper dès la conception" />

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
