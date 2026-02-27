import { motion } from "framer-motion";
import { GuideSectionHeader } from "./GuideSectionHeader";

export function GuideComfortSections() {
  return (
    <>
      {/* Sections Peinture, VMC & Éclairage */}
      <section id="section-13" className="py-8 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader title="Peinture, VMC & Éclairage" />

            <div className="border-l-2 p-3 mb-4" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-0.5 text-sm" style={{ color: '#011115' }}>
                <li>Peinture spéciale pièces humides obligatoire</li>
                <li>Sans VMC : humidité, moisissures, dégradation</li>
                <li>Éclairage et chauffage doivent respecter la norme NF C 15-100</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Peinture & VMC</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p><strong className="text-foreground">Peinture</strong> — Pièces humides, lessivable (Unikalo Aqualine Satin)</p>
                  <p><strong className="text-foreground">VMC</strong> — Protège contre l'humidité stagnante et les moisissures</p>
                </div>
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Électricité</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>Volumes de sécurité respectés</p>
                  <p>Disjoncteur différentiel 30mA</p>
                  <p>Norme <strong className="text-foreground">NF C 15-100</strong></p>
                  <p className="italic">Sécurité = obligation légale non négociable.</p>
                </div>
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Éclairage & chauffage</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p><strong>Spots</strong> — 500 lm, 4000K, trimless, IP44/65</p>
                  <p><strong>Sèche-serviette</strong> — 500-1000W, électrique ou mixte</p>
                  <p>Ligne électrique dédiée requise</p>
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
