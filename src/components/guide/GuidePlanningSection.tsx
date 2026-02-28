import { motion } from "framer-motion";
import { GuideSectionHeader } from "./GuideSectionHeader";
import carinaSig from "@/assets/carina-signature.svg";

export function GuidePlanningSection() {
  return (
    <section id="duree-renovation-salle-de-bain" className="py-8 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* ============ BLOC 1 : Durée & orchestration ============ */}
          <GuideSectionHeader number={1} title="Durée d'une rénovation de salle de bain à Paris" tag="h3" />
          <p className="text-lg font-light text-muted-foreground -mt-4 mb-2">3 semaines à 1 mois</p>

          {/* À retenir */}
          <div className="border-l-2 p-3 mb-3" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#124A66' }}>À retenir</p>
            <ul className="space-y-0.5 text-sm" style={{ color: '#011115' }}>
              <li>Une rénovation de salle de bain à Paris prend 3 semaines à 1 mois</li>
              <li>Chaque corps de métier intervient dans un ordre précis</li>
              <li>Le maître d'œuvre coordonne l'ensemble</li>
            </ul>
          </div>

          {/* ============ 3 COLONNES : Orchestre / Déroulé / Coordination ============ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">

            {/* COL 1 : Orchestre */}
            <div className="border border-border/30 rounded p-3">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>L'orchestre</p>
              <p className="text-xs text-muted-foreground mb-2">
                <strong className="text-foreground">Un chantier fonctionne comme un orchestre.</strong> Chaque étape prépare la suivante.
              </p>
              <div className="space-y-0.5 text-xs">
                {[
                  { role: "Plombier", desc: "le tempo" },
                  { role: "Électricien", desc: "les connexions" },
                  { role: "Plâtrier", desc: "la structure" },
                  { role: "Carreleur", desc: "le rythme" },
                  { role: "Menuisier", desc: "la fonction" },
                  { role: "Peintre", desc: "la finesse" },
                ].map(({ role, desc }) => (
                  <div key={role} className="flex items-baseline gap-1">
                    <span className="font-semibold text-foreground">{role}</span>
                    <span className="text-muted-foreground">– {desc}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-foreground font-medium mt-2">Le maître d'œuvre est le chef d'orchestre.</p>
            </div>

            {/* COL 2 : Déroulé chronologique */}
            <div className="border border-border/30 rounded p-3">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Déroulé type</p>
              {[
                { week: "S1", items: ["Protection & dépose", "Démolition", "Réseaux (plomberie / élec.)", "Plâtrerie"] },
                { week: "S2", items: ["Étanchéité & séchage", "Pose carrelage"] },
                { week: "S3", items: ["Menuiserie", "Peinture & finitions", "Sanitaires & accessoires"] },
              ].map(({ week, items }) => (
                <div key={week} className="mb-1.5">
                  <p className="text-xs font-semibold text-foreground">{week}</p>
                  <ul className="space-y-0 text-xs text-muted-foreground">
                    {items.map(item => (
                      <li key={item} className="flex items-start gap-1">
                        <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#c2a016' }} />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="flex gap-3 text-xs text-muted-foreground mt-1 pt-1 border-t border-border/20">
                <span><strong className="text-foreground">Nettoyage</strong> complet</span>
                <span><strong className="text-foreground">Gravats</strong> évacués</span>
              </div>
            </div>

            {/* COL 3 : Coordination & anticipation */}
            <div className="border border-border/30 rounded p-3">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Coordination</p>
              <div className="text-xs leading-relaxed text-muted-foreground space-y-2">
                <p>Sans coordination globale, vous êtes mis face au résultat… <strong className="text-foreground">trop tard.</strong></p>
                <p><strong className="text-foreground">Un chantier ne s'improvise pas.</strong> Il s'anticipe.</p>
                <p>Profondeurs, hauteurs, alignements, volumes… tout doit être pensé en amont.</p>
                <p>C'est notre rôle : <strong className="text-foreground">coordonner pour que chaque intervention s'emboîte parfaitement.</strong></p>
                <p className="font-medium text-foreground">Rien n'est laissé au hasard.</p>
              </div>
            </div>
          </div>

          {/* Confort client */}
          <div className="border-l-2 p-2 mb-3" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#124A66' }}>Vous vivez sur place ?</p>
            <p className="text-xs" style={{ color: '#011115' }}>Eau maintenue en cuisine · WC fonctionnel pendant les travaux</p>
          </div>

          {/* ============ BLOC SIGNATURE ============ */}
          <div className="py-12 px-6 text-center" style={{ backgroundColor: '#124A66' }}>
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
                className="w-[100px] md:w-[150px] opacity-90"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
          </div>

        </motion.div>
      </div>

      {/* Section separator */}
      <div className="container mx-auto px-4 mt-8">
        <div className="max-w-4xl mx-auto border-b border-border/30" />
      </div>
    </section>
  );
}
