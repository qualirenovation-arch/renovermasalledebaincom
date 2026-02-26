import { motion } from "framer-motion";
import { GuideSectionHeader } from "./GuideSectionHeader";
import carinaSig from "@/assets/carina-signature.svg";

export function GuidePlanningSection() {
  return (
    <section id="section-planning" className="py-16 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* ============ BLOC 1 : Durée & orchestration ============ */}
          <GuideSectionHeader title="Planning & Durée" />
          <p className="text-lg font-light text-muted-foreground -mt-4 mb-8">3 semaines à 1 mois</p>

          {/* À retenir */}
          <div className="border-l-2 p-5 mb-8" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>À retenir</p>
            <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
              <li>Une rénovation complète prend 3 semaines à 1 mois</li>
              <li>Chaque corps de métier intervient dans un ordre précis</li>
              <li>Le maître d'œuvre coordonne l'ensemble</li>
            </ul>
          </div>

          {/* Texte court orchestre */}
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground mb-8">
            <p>
              <strong className="text-foreground">Un chantier fonctionne comme un orchestre.</strong><br />
              Les artisans ne peuvent pas tous intervenir en même temps.<br />
              Chaque étape prépare la suivante.
            </p>
          </div>

          {/* Rôles simplifiés */}
          <div className="space-y-2 mb-8">
            {[
              { role: "Plombier", desc: "donne le tempo" },
              { role: "Électricien", desc: "prépare les connexions" },
              { role: "Plâtrier", desc: "structure l'espace" },
              { role: "Carreleur", desc: "pose le rythme visuel" },
              { role: "Menuisier", desc: "apporte la fonctionnalité" },
              { role: "Peintre", desc: "finalise en finesse" },
            ].map(({ role, desc }) => (
              <div key={role} className="flex items-baseline gap-3 py-1.5 border-b border-border/20">
                <span className="font-semibold text-sm text-foreground w-28 flex-shrink-0">{role}</span>
                <span className="text-sm text-muted-foreground">– {desc}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-foreground font-medium mb-12">
            Le maître d'œuvre est le chef d'orchestre.<br />
            Il coordonne, anticipe et évite les chevauchements.
          </p>

          {/* ============ BLOC 2 : Déroulé chronologique ============ */}
          <div className="mt-4">
            <h3 className="text-xl md:text-2xl font-light text-foreground mb-6">Déroulé type d'un chantier</h3>
            <div className="w-10 h-[2px] mb-8" style={{ backgroundColor: '#c2a016' }} />

            <div className="space-y-8">
              {/* Semaine 1 */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>Semaine 1</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#c2a016' }} />
                    Protection &amp; dépose
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#c2a016' }} />
                    Démolition
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#c2a016' }} />
                    Réseaux (plomberie / électricité)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#c2a016' }} />
                    Plâtrerie
                  </li>
                </ul>
              </div>

              {/* Semaine 2 */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>Semaine 2</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#c2a016' }} />
                    Étanchéité &amp; séchage
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#c2a016' }} />
                    Pose carrelage
                  </li>
                </ul>
              </div>

              {/* Semaine 3 */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>Semaine 3</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#c2a016' }} />
                    Menuiserie
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#c2a016' }} />
                    Peinture &amp; finitions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#c2a016' }} />
                    Pose sanitaires &amp; accessoires
                  </li>
                </ul>
              </div>
            </div>

            {/* En bas */}
            <div className="mt-8 space-y-1.5 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Nettoyage complet</strong> du chantier</p>
              <p><strong className="text-foreground">Évacuation des gravats</strong> organisée</p>
            </div>
          </div>

          {/* ============ CONFORT CLIENT ============ */}
          <div className="border-l-2 p-5 mt-10 mb-10" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>Vous vivez sur place ?</p>
            <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
              <li>Eau maintenue en cuisine</li>
              <li>WC fonctionnel pendant les travaux</li>
            </ul>
          </div>

          {/* ============ BLOC SIGNATURE ============ */}
          <div className="py-8 px-6 text-center" style={{ backgroundColor: '#124A66' }}>
            <p
              className="italic font-light leading-[1.9]"
              style={{ fontSize: '1.2em', color: '#E6EEF2', fontFamily: "'Nunito Sans', sans-serif" }}
            >
              "Un planning maîtrisé,<br />
              c'est un chantier sans improvisation."
            </p>
            <div className="flex justify-end mt-5">
              <img
                src={carinaSig}
                alt="Carina N."
                className="w-[70px] md:w-[100px] opacity-90"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
          </div>

        </motion.div>
      </div>

      {/* Section separator */}
      <div className="container mx-auto px-4 mt-16">
        <div className="max-w-4xl mx-auto border-b border-border/30" />
      </div>
    </section>
  );
}
