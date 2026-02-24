import { motion } from "framer-motion";
import { Layers, Settings, CheckCircle } from "lucide-react";
import { GuideSectionHeader } from "./GuideSectionHeader";
import guideJointNoir from "@/assets/guide-joint-noir.webp";
import guideJointAssorti from "@/assets/guide-joint-assorti.webp";
import guideProfilFinition from "@/assets/guide-profil-finition.webp";
import cielDePluiePlafond from "@/assets/chatelet-ciel-pluie-plafond.jpg";

export function GuideDetailsSections() {
  return (
    <>
      {/* Section 8 - Joints & finitions */}
      <section id="section-8" className="py-16 bg-accent/20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={8} icon={Layers} title="Joints, profils et finitions : le diable se cache dans le détail" />

            {/* Joint mortier */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4">🧱 Joint mortier</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <div className="rounded-2xl overflow-hidden shadow-lg mb-3">
                    <img src={guideJointAssorti} alt="Joint assorti au carrelage" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="text-muted-foreground text-sm"><strong>Joint assorti</strong> → Rendu uniforme et élégant</p>
                </div>
                <div className="group">
                  <div className="rounded-2xl overflow-hidden shadow-lg mb-3">
                    <img src={guideJointNoir} alt="Joint contrasté foncé" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="text-muted-foreground text-sm"><strong>Joint foncé</strong> → Souligne la pose et le calepinage</p>
                </div>
              </div>
            </div>

            {/* Joint silicone */}
            <div className="mb-10 bg-background rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">🧼 Joint silicone (angles & zones d'eau)</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Souple, absorbe les mouvements, garantit l'étanchéité. À refaire dès la moindre fissure.
              </p>
              <p className="text-primary font-medium text-sm">
                ✨ Conseil : silicone assorti au carrelage pour une finition discrète.
              </p>
            </div>

            {/* Profils de finition */}
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-lg font-semibold mb-3">🔲 Profils de finition</h3>
                <p className="text-muted-foreground text-sm mb-3">Choisis assortis à la robinetterie et paroi de douche.</p>
                <p className="text-primary font-medium text-sm">→ Le profil doit s'intégrer, pas attirer l'œil.</p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img src={guideProfilFinition} alt="Profil Schlüter assorti robinetterie" className="w-full h-48 object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
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
            <GuideSectionHeader number={9} icon={Settings} title="Robinetterie encastrée : anticiper dès la conception" />
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-accent/30 rounded-xl p-6">
                <p className="text-muted-foreground mb-3">Impose : doublage mural, anticipation dès conception, pose irréprochable.</p>
                <ul className="space-y-2 text-muted-foreground text-sm mt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Mitigeur encastré thermostatique</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Ciel de pluie encastré plafond</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Douchette à main complémentaire</span>
                  </li>
                </ul>
                <p className="text-primary font-medium text-sm mt-4">👉 Ce choix se fait avant les cloisons et le carrelage.</p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={cielDePluiePlafond}
                  alt="Ciel de pluie encastré au plafond avec robinetterie noire"
                  className="w-full h-72 object-cover"
                />
                <p className="bg-foreground text-background text-sm p-3 text-center">
                  Ciel de pluie encastré plafond — finition noire mate
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
