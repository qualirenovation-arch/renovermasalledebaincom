import { motion } from "framer-motion";
import { GuideSectionHeader } from "./GuideSectionHeader";
import baignoireRangementNiches from "@/assets/baignoire-rangement-niches.jpg";
import baignoireRangementTiroirs from "@/assets/baignoire-rangement-tiroirs.jpg";

export function GuideComfortSections() {
  return (
    <>
      {/* Section 10 - Choisir sa baignoire */}
      <section id="section-10" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={10} title="Choisir sa baignoire" />

            <div className="border-l-2 p-5 mb-8" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
                <li>Choix selon l'espace, le confort et la structure du sol</li>
                <li>Attention au poids : 300 à 400 kg une fois remplie</li>
                <li>La baignoire peut devenir un vrai meuble de rangement</li>
              </ul>
            </div>

            <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
              <p>Un équipement de bain permettant l'immersion complète du corps. Choix selon l'espace, le confort souhaité et la structure du sol (poids à supporter).</p>

              {/* Types */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-3">Types de baignoires</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Droite</strong> — Standard, tous espaces</p>
                  <p><strong>Îlot</strong> — Design, espace dégagé</p>
                  <p><strong>D'angle</strong> — Optimise les coins</p>
                  <p><strong>Bain-douche</strong> — Combo 2-en-1</p>
                </div>
              </div>

              {/* Matériaux */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-3">Matériaux</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Acrylique</strong> — Léger, chaud, bon rapport qualité-prix (le plus courant)</p>
                  <p><strong>Acier émaillé</strong> — Résistant, durable, plus froid</p>
                  <p><strong>Fonte</strong> — Haut de gamme, très lourd (80-120kg)</p>
                  <p><strong>Solid Surface</strong> — Design, doux au toucher, sur mesure</p>
                </div>
              </div>

              {/* Photos rangement */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-3">Rangements intégrés</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <img src={baignoireRangementNiches} alt="Baignoire avec niches de rangement intégrées" className="w-full h-48 object-cover" loading="lazy" />
                    <p className="text-xs text-muted-foreground mt-1 text-center">Niches intégrées au tablier</p>
                  </div>
                  <div>
                    <img src={baignoireRangementTiroirs} alt="Baignoire avec tiroirs de rangement" className="w-full h-48 object-cover" loading="lazy" />
                    <p className="text-xs text-muted-foreground mt-1 text-center">Tiroirs sous baignoire</p>
                  </div>
                </div>
                <div className="mt-4 space-y-1 text-sm">
                  <p><strong>Tiroirs intégrés</strong> — Produits, serviettes, jouets enfants</p>
                  <p><strong>Niches latérales</strong> — Accès facile, esthétique épurée</p>
                  <p><strong>Trappe d'accès</strong> — Maintenance siphon + rangement</p>
                  <p><strong>Tablier amovible</strong> — Stockage linge, paniers</p>
                </div>
                <p className="italic mt-3">
                  Dans les petites salles de bain, chaque cm² compte. La baignoire devient un vrai meuble de rangement.
                </p>
              </div>

              {/* Poids */}
              <p className="font-medium text-foreground">
                Attention au poids : une baignoire remplie + utilisateur = 300 à 400 kg. Vérifier la structure du sol (plancher bois, dalle béton). La fonte est particulièrement lourde (80-120 kg à vide).
              </p>
            </div>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 mt-16"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
      </section>

      {/* Sections 11, 12, 13 - Finitions & Confort */}
      <section id="section-11" className="py-16 bg-background scroll-mt-20">
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
              <div id="section-11-content">
                <h3 className="text-lg font-light mb-3" style={{ color: '#124A66' }}>11. Peinture</h3>
                <p>Peinture spéciale pièces humides, résistante à la condensation, lessivable.</p>
                <p className="italic mt-2">Unikalo – Aqualine Satin</p>
              </div>

              {/* VMC */}
              <div id="section-12" className="scroll-mt-20">
                <h3 className="text-lg font-light mb-3" style={{ color: '#124A66' }}>12. VMC</h3>
                <p>Sans VMC : humidité stagnante, moisissures, dégradation prématurée.</p>
                <p className="italic mt-2">Une VMC bien pensée protège toute la salle de bain.</p>
              </div>

              {/* Éclairage & chauffage */}
              <div id="section-13" className="scroll-mt-20">
                <h3 className="text-lg font-light mb-3" style={{ color: '#124A66' }}>13. Éclairage & chauffage</h3>
                <div className="space-y-3">
                  <p>Spots trimless — 4000K — IP44/65</p>
                  <p>Sèche-serviette électrique ou mixte. Chauffe-eau accessible.</p>
                  <p className="italic">Norme NF C 15-100</p>
                </div>
              </div>

              {/* Détails techniques */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-3">Détails techniques</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Spots</strong> — 500 lumens, blanc neutre 4000K, encastrés sans collerette</p>
                  <p><strong>Sèche-serviette</strong> — Électrique (500-1000W) ou mixte raccordé au chauffage</p>
                  <p><strong>Chauffe-eau</strong> — Cumulus, thermodynamique (70% économie) ou instantané</p>
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
