import { motion } from "framer-motion";
import { GuideSectionHeader } from "./GuideSectionHeader";

export function GuideComfortSections() {
  return (
    <>
      {/* Sections Peinture, VMC & Éclairage */}
      <section id="section-13" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader title="Peinture, VMC & Éclairage" />

            <div className="border-l-2 p-5 mb-8" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
                <li>Peinture spéciale pièces humides obligatoire</li>
                <li>Sans VMC : humidité, moisissures, dégradation</li>
                <li>Éclairage et chauffage doivent respecter la norme NF C 15-100</li>
              </ul>
            </div>

            <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
              {/* Peinture */}
              <div id="section-peinture" className="scroll-mt-20">
                <h3 className="text-lg font-light mb-3">13. Peinture</h3>
                <p>Peinture spéciale pièces humides, résistante à la condensation, lessivable.</p>
                <p className="italic mt-2">Unikalo – Aqualine Satin</p>
              </div>

              {/* VMC */}
              <div id="section-vmc" className="scroll-mt-20">
                <h3 className="text-lg font-light mb-3">14. VMC</h3>
                <p>Sans VMC : humidité stagnante, moisissures, dégradation prématurée.</p>
                <p className="italic mt-2">Une VMC bien pensée protège toute la salle de bain.</p>
              </div>

              {/* Électricité & conformité */}
              <div id="section-electricite" className="scroll-mt-20">
                <h3 className="text-lg font-light mb-3">Électricité & conformité</h3>
                <div className="space-y-3">
                  <p>
                    Lors d'une rénovation de salle de bain, l'installation électrique est systématiquement vérifiée et remise aux normes en vigueur. Cela inclut le respect des <strong className="text-foreground">volumes de sécurité</strong>, la mise à la terre, les protections au tableau électrique (disjoncteur différentiel 30mA) et la conformité selon la norme <strong className="text-foreground">NF C 15-100</strong>.
                  </p>
                  <p>
                    Certains équipements comme le sèche-serviette ou le plancher chauffant nécessitent un raccordement direct au tableau avec une ligne dédiée.
                  </p>
                  <p className="font-medium text-foreground">
                    Le beau est important, mais la conformité et la sécurité sont des obligations légales non négociables.
                  </p>
                </div>
              </div>

              {/* Éclairage & chauffage */}
              <div id="section-eclairage" className="scroll-mt-20">
                <h3 className="text-lg font-light mb-3">15. Éclairage & chauffage</h3>
                <div className="space-y-3">
                  <p>Spots trimless — 4000K — IP44/65</p>
                  <p>Sèche-serviette électrique ou mixte.</p>
                </div>
              </div>

              {/* Détails techniques */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-3">Détails techniques</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Spots</strong> — 500 lumens, blanc neutre 4000K, encastrés sans collerette</p>
                  <p><strong>Sèche-serviette</strong> — Électrique (500-1000W) ou mixte raccordé au chauffage</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 mt-16"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
      </section>
    </>
  );
}
