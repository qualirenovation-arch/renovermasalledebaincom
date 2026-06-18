import { motion } from "framer-motion";
import { GuideSectionHeader } from "./GuideSectionHeader";
import { Picture } from "@/components/Picture";
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
      <section id="section-niches" className="py-8 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader title="Une niche, c'est quoi ?" tag="h3" />

            <div className="border-l-2 p-3 mb-4" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-0.5 text-sm" style={{ color: '#011115' }}>
                <li>Renfoncement dans le mur pour ranger shampoings et savons</li>
                <li>Design épuré et entretien facile</li>
                <li>Une niche bien positionnée change le confort au quotidien</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="border border-border/30 rounded p-3 overflow-hidden">
                <Picture src={boulogne3} alt="Niche baignoire Boulogne" className="w-full h-28 object-cover mb-2" sizes="(max-width: 768px) 100vw, 33vw" />
                <Picture src={nicolasRoretDouche} alt="Niche douche Nicolas Roret" className="w-full h-28 object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Avantages</p>
                <div className="space-y-0.5 text-xs text-muted-foreground">
                  <p><strong className="text-foreground">Gain de place</strong> — pas de panier ni étagère</p>
                  <p><strong className="text-foreground">Design épuré</strong> — intégré au carrelage</p>
                  <p><strong className="text-foreground">Entretien facile</strong> — rien à nettoyer autour</p>
                  <p><strong className="text-foreground">Durabilité</strong> — ne bouge pas, ne rouille pas</p>
                </div>
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Conseil</p>
                <p className="text-xs text-muted-foreground">Un renfoncement créé dans le mur de la douche ou baignoire pour ranger shampoings et produits.</p>
                <p className="text-xs text-muted-foreground italic mt-2">Positionnée à hauteur d'épaule, elle change le confort au quotidien.</p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 mt-8"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
      </section>

      {/* Section 11 - Joints & finitions */}
      <section id="section-11" className="py-8 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={12} title="Joints, profils et finitions" tag="h3" />

            <div className="border-l-2 p-3 mb-4" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-0.5 text-sm" style={{ color: '#011115' }}>
                <li>Le joint mortier définit le style : assorti ou contrasté</li>
                <li>Le joint silicone garantit l'étanchéité aux angles</li>
                <li>Les profils de finition doivent s'intégrer, pas attirer l'oeil</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Joint mortier</p>
                <div className="grid grid-cols-2 gap-1 mb-2">
                  <Picture src={guideJointAssorti} alt="Joint assorti" className="w-full h-20 object-cover" loading="lazy" />
                  <Picture src={guideJointNoir} alt="Joint contrasté" className="w-full h-20 object-cover" loading="lazy" />
                </div>
                <div className="space-y-0.5 text-xs text-muted-foreground">
                  <p><strong>Assorti</strong> — uniforme, élégant</p>
                  <p><strong>Foncé</strong> — souligne le calepinage</p>
                </div>
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Joint silicone</p>
                <p className="text-xs text-muted-foreground">Souple, absorbe les mouvements, garantit l'étanchéité aux angles et zones d'eau.</p>
                <p className="text-xs text-muted-foreground italic mt-1">Assorti au carrelage pour finition discrète. À refaire dès la moindre fissure.</p>
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Profils de finition</p>
                <Picture src={guideProfilFinition} alt="Profil Schlüter" className="w-full h-20 object-cover mb-2" loading="lazy" />
                <p className="text-xs text-muted-foreground">Assortis à la robinetterie et paroi.</p>
                <p className="text-xs text-muted-foreground italic">Le profil doit s'intégrer, pas attirer l'oeil.</p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 mt-8"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
      </section>

      {/* Section 12 - Robinetterie encastrée */}
      <section id="section-12" className="py-8 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={13} title="Robinetterie encastrée" tag="h3" />

            <div className="border-l-2 p-3 mb-4" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-0.5 text-sm" style={{ color: '#011115' }}>
                <li>Impose un doublage mural et une anticipation dès la conception</li>
                <li>Ce choix se fait avant les cloisons et le carrelage</li>
                <li>Mitigeur thermostatique + ciel de pluie + douchette</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Exigences</p>
                <div className="space-y-0.5 text-xs text-muted-foreground">
                  <p>Doublage mural obligatoire</p>
                  <p>Anticipation dès la conception</p>
                  <p>Pose irréprochable</p>
                  <p className="font-medium text-foreground mt-1">Choix avant cloisons et carrelage.</p>
                </div>
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Composants</p>
                <div className="space-y-0.5 text-xs text-muted-foreground">
                  <p>Mitigeur encastré thermostatique</p>
                  <p>Ciel de pluie encastré plafond</p>
                  <p>Douchette à main complémentaire</p>
                </div>
              </div>
              <div className="border border-border/30 rounded p-3 overflow-hidden">
                <Picture src={cielDePluiePlafond} alt="Ciel de pluie encastré plafond" className="w-full h-32 object-cover mb-1" sizes="(max-width: 768px) 100vw, 33vw" />
                <p className="text-xs text-muted-foreground text-center">Ciel de pluie — finition noire mate</p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 mt-8"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
      </section>
    </>
  );
}
