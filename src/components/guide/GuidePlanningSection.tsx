import { motion } from "framer-motion";
import { Clock, CheckCircle, AlertTriangle, Paintbrush, Wrench, Ruler, Sparkles, Home, HardHat } from "lucide-react";
import { GuideSectionHeader } from "./GuideSectionHeader";

export function GuidePlanningSection() {
  return (
    <section id="section-planning" className="py-16 bg-gradient-to-r from-mint/10 via-mint/20 to-mint/10 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <GuideSectionHeader icon={Clock} title="Planning & Durée : 3 semaines à 1 mois" />

          <div className="bg-background rounded-2xl p-8 shadow-sm">
            <div className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-4 mb-6">
              <p className="text-lg md:text-xl font-serif text-foreground italic">
                🎻 Un chantier, c'est comme un orchestre : les artisans ne peuvent pas tous jouer en même temps.
              </p>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              <strong className="text-foreground">Une rénovation de salle de bain prend entre 3 semaines et 1 mois.</strong> Pourquoi ? Parce que chaque corps de métier doit intervenir dans un ordre précis, sans jamais se chevaucher.
            </p>

            {/* Métaphore musicale */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/20 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                🎼 Chaque artisan joue sa partition
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { emoji: "🎸", role: "Le plombier = la basse", desc: "Il pose les fondations. Sans lui, rien ne tient. Il intervient tôt et donne le tempo au chantier." },
                  { emoji: "⚡", role: "L'électricien = le clavier", desc: "Il tisse les connexions invisibles. Discret mais essentiel, il travaille en parallèle de la basse." },
                  { emoji: "🧱", role: "Le plâtrier = les cuivres", desc: "Il structure l'espace. Faux plafonds et cloisons dessinent la forme finale de la pièce." },
                  { emoji: "🥁", role: "Le carreleur = les percussions", desc: "Précision millimétrée, rythme soutenu. Il crée le tempo visuel de votre salle de bain." },
                  { emoji: "🪵", role: "Le menuisier = le piano", desc: "Il apporte la mélodie. Meubles et rangements donnent l'âme et le caractère à la pièce." },
                  { emoji: "🎻", role: "Le peintre = les violons", desc: "Il intervient en dernier, en finesse. Ses finitions subliment l'ensemble et signent l'œuvre." },
                ].map(({ emoji, role, desc }) => (
                  <div key={role} className="bg-background/70 rounded-lg p-4 border border-primary/10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{emoji}</span>
                      <strong className="text-foreground">{role}</strong>
                    </div>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4 italic">
                👉 Et le maître d'œuvre ? C'est le chef d'orchestre qui coordonne tout le monde.
              </p>
            </div>

            {/* Pourquoi pas ensemble */}
            <div className="bg-accent/30 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Pourquoi les artisans ne peuvent pas jouer ensemble ?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Paintbrush className="w-4 h-4 text-primary" />
                  </span>
                  <div>
                    <strong className="text-foreground">Les violons ne supportent pas la poussière des percussions</strong>
                    <p className="text-sm text-muted-foreground mt-1">La poussière de coupe de carrelage contaminerait les peintures fraîches et créerait des défauts irréversibles.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Wrench className="w-4 h-4 text-primary" />
                  </span>
                  <div>
                    <strong className="text-foreground">La basse et les violons ne partagent pas la scène</strong>
                    <p className="text-sm text-muted-foreground mt-1">Les échelles, les outils et les zones de travail se chevauchent. Un seul artisan peut occuper l'espace efficacement.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Ruler className="w-4 h-4 text-primary" />
                  </span>
                  <div>
                    <strong className="text-foreground">Chaque mouvement prépare le suivant</strong>
                    <p className="text-sm text-muted-foreground mt-1">Impossible de carreler avant que la plomberie soit faite. Impossible de peindre avant que le carrelage soit sec.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Timeline */}
            <div className="bg-mint/10 border border-mint/30 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4 text-mint flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Un timing chronométré pour réussir
              </h3>
              <p className="text-muted-foreground mb-4">
                Pour une salle de bain réussie, chaque étape doit respecter un timing précis :
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                {[
                  { day: "J1", task: "Protection + dépose sanitaires & plomberie" },
                  { day: "J2-J3", task: "Démolition & évacuation" },
                  { day: "J3", task: "📋 Réunion de chantier (plan & choix)", highlight: true },
                  { day: "J4-J5", task: "Plâtrerie (faux plafond, cloisons)" },
                  { day: "J6-J9", task: "Électricité & plomberie" },
                  { day: "J10-J11", task: "Étanchéité & séchage" },
                  { day: "J12-J17", task: "Carrelage sol & murs" },
                  { day: "J18-J19", task: "Menuiserie (meubles, rangements)" },
                  { day: "J20-J24", task: "Peinture & finitions" },
                  { day: "J25+", task: "Pose sanitaires & accessoires" },
                ].map(({ day, task, highlight }) => (
                  <div key={day} className={`flex items-center gap-2 bg-background/50 rounded-lg p-3 ${highlight ? "border-2 border-primary/30" : ""}`}>
                    <span className={`font-bold ${highlight ? "text-primary" : "text-mint"}`}>{day}</span>
                    <span className={highlight ? "font-medium" : ""}>{task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nettoyage et confort */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-accent/30 rounded-xl p-5">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Nettoyage de fin de chantier
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  La poussière se propage malgré nos protections. C'est pourquoi nous prévoyons :
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-mint flex-shrink-0 mt-0.5" />
                    <span><strong>2 personnes pendant 1 journée</strong> pour astiquer la salle de bain et votre appartement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-mint flex-shrink-0 mt-0.5" />
                    <span><strong>Évacuation des gravats</strong> par camion en cours de chantier</span>
                  </li>
                </ul>
              </div>

              <div className="bg-accent/30 rounded-xl p-5">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Home className="w-5 h-5 text-primary" />
                  Vous vivez sur place ?
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Nous organisons le chantier pour préserver votre confort au quotidien :
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-mint flex-shrink-0 mt-0.5" />
                    <span><strong>L'eau reste active</strong> dans la cuisine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-mint flex-shrink-0 mt-0.5" />
                    <span><strong>WC fonctionnel</strong> pendant toute la durée des travaux</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-primary/10 border border-primary/20 rounded-xl">
              <HardHat className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-foreground font-medium">
                👉 Respecter ce timing, c'est la garantie d'un chantier sans accroc et d'une salle de bain qui dure dans le temps.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
