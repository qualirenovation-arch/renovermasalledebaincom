import { motion } from "framer-motion";
import { GuideSectionHeader } from "./GuideSectionHeader";

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
          <GuideSectionHeader title="Planning & Durée : 3 semaines à 1 mois" />

          {/* À retenir */}
          <div className="border-l-2 p-5 mb-8" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>À retenir</p>
            <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
              <li>Une rénovation complète prend 3 semaines à 1 mois</li>
              <li>Chaque corps de métier intervient dans un ordre précis</li>
              <li>Le maître d'oeuvre coordonne l'ensemble comme un chef d'orchestre</li>
            </ul>
          </div>

          {/* Content */}
          <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">Une rénovation de salle de bain prend entre 3 semaines et 1 mois.</strong> Pourquoi ? Parce que chaque corps de métier doit intervenir dans un ordre précis, sans jamais se chevaucher.
            </p>
            <p>
              Un chantier, c'est comme un orchestre : les artisans ne peuvent pas tous jouer en même temps.
            </p>

            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-light" style={{ color: '#124A66' }}>Chaque artisan joue sa partition</h3>
              <div className="space-y-3">
                {[
                  { role: "Le plombier = la basse", desc: "Il pose les fondations. Sans lui, rien ne tient. Il intervient tôt et donne le tempo au chantier." },
                  { role: "L'électricien = le clavier", desc: "Il tisse les connexions invisibles. Discret mais essentiel, il travaille en parallèle de la basse." },
                  { role: "Le plâtrier = les cuivres", desc: "Il structure l'espace. Faux plafonds et cloisons dessinent la forme finale de la pièce." },
                  { role: "Le carreleur = les percussions", desc: "Précision millimétrée, rythme soutenu. Il crée le tempo visuel de votre salle de bain." },
                  { role: "Le menuisier = le piano", desc: "Il apporte la mélodie. Meubles et rangements donnent l'âme et le caractère à la pièce." },
                  { role: "Le peintre = les violons", desc: "Il intervient en dernier, en finesse. Ses finitions subliment l'ensemble et signent l'oeuvre." },
                ].map(({ role, desc }) => (
                  <div key={role} className="border-b border-border/30 pb-3">
                    <strong className="text-foreground text-sm">{role}</strong>
                    <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic">
                Et le maître d'oeuvre ? C'est le chef d'orchestre qui coordonne tout le monde.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-light mb-4" style={{ color: '#124A66' }}>Pourquoi les artisans ne peuvent pas jouer ensemble ?</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">Les violons ne supportent pas la poussière des percussions</strong> — La poussière de coupe de carrelage contaminerait les peintures fraîches et créerait des défauts irréversibles.
                </li>
                <li>
                  <strong className="text-foreground">La basse et les violons ne partagent pas la scène</strong> — Les échelles, les outils et les zones de travail se chevauchent. Un seul artisan peut occuper l'espace efficacement.
                </li>
                <li>
                  <strong className="text-foreground">Chaque mouvement prépare le suivant</strong> — Impossible de carreler avant que la plomberie soit faite. Impossible de peindre avant que le carrelage soit sec.
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-light mb-4" style={{ color: '#124A66' }}>Un timing chronométré pour réussir</h3>
              <p className="text-muted-foreground mb-4">
                Pour une salle de bain réussie, chaque étape doit respecter un timing précis :
              </p>
              <div className="space-y-2 text-sm">
                {[
                  { day: "J1", task: "Protection + dépose sanitaires & plomberie" },
                  { day: "J2-J3", task: "Démolition & évacuation" },
                  { day: "J3", task: "Réunion de chantier (plan & choix)" },
                  { day: "J4-J5", task: "Plâtrerie (faux plafond, cloisons)" },
                  { day: "J6-J9", task: "Électricité & plomberie" },
                  { day: "J10-J11", task: "Étanchéité & séchage" },
                  { day: "J12-J17", task: "Carrelage sol & murs" },
                  { day: "J18-J19", task: "Menuiserie (meubles, rangements)" },
                  { day: "J20-J24", task: "Peinture & finitions" },
                  { day: "J25+", task: "Pose sanitaires & accessoires" },
                ].map(({ day, task }) => (
                  <div key={day} className="flex items-baseline gap-4 py-1.5 border-b border-border/20">
                    <span className="font-semibold text-sm w-16 flex-shrink-0" style={{ color: '#124A66' }}>{day}</span>
                    <span className="text-muted-foreground">{task}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-medium mb-3 text-foreground">Nettoyage de fin de chantier</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  La poussière se propage malgré nos protections. C'est pourquoi nous prévoyons :
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><strong>2 personnes pendant 1 journée</strong> pour astiquer la salle de bain et votre appartement</li>
                  <li><strong>Évacuation des gravats</strong> par camion en cours de chantier</li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-medium mb-3 text-foreground">Vous vivez sur place ?</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Nous organisons le chantier pour préserver votre confort au quotidien :
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><strong>L'eau reste active</strong> dans la cuisine</li>
                  <li><strong>WC fonctionnel</strong> pendant toute la durée des travaux</li>
                </ul>
              </div>
            </div>

            <p className="mt-6 text-foreground font-medium text-sm">
              Respecter ce timing, c'est la garantie d'un chantier sans accroc et d'une salle de bain qui dure dans le temps.
            </p>
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
