import { motion } from "framer-motion";
import { GuideSectionHeader } from "./GuideSectionHeader";

const garanties = [
  {
    title: "Garantie décennale",
    description: "Tous nos travaux sont couverts par une assurance décennale, pour une tranquillité absolue.",
    badge: "10 ans",
  },
  {
    title: "Étanchéité certifiée",
    description: "Systèmes d'étanchéité conformes aux normes DTU 52.2, avec procès-verbal de réception.",
    badge: "DTU 52.2",
  },
  {
    title: "Délais garantis",
    description: "Planning contractuel avec dates de début et de fin engagées par écrit.",
    badge: "Contractuel",
  },
  {
    title: "SAV réactif",
    description: "Un interlocuteur unique pour toute intervention après réception des travaux.",
    badge: "Inclus",
  },
  {
    title: "Artisans qualifiés",
    description: "Équipes internes formées et supervisées, aucune sous-traitance non maîtrisée.",
    badge: "Certifié",
  },
  {
    title: "Budget encadré, évolutif et transparent",
    description: "Nos devis sont exhaustifs et conçus pour anticiper chaque étape du chantier. Toute évolution liée aux choix de matériaux ou d'équipements est formalisée et validée avant exécution. Le budget est piloté avec précision : chaque plus-value ou moins-value est détaillée, expliquée et intégrée dans un suivi financier clair. Vous gardez la maîtrise. Nous assurons le cadre.",
    badge: "Suivi financier",
  },
];

export function GuideGarantiesSection() {
  return (
    <section id="section-garanties" className="py-16 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <GuideSectionHeader title="Nos garanties" />

          <div className="border-l-2 p-5 mb-8" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>À retenir</p>
            <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
              <li>Chaque chantier est encadré par des engagements concrets et contractuels</li>
              <li>Garantie décennale + étanchéité certifiée</li>
              <li>Budget piloté avec précision et transparence</li>
            </ul>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            {garanties.map((g, i) => (
              <div key={g.title} className="border-b border-border/20 pb-5">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-base font-medium text-foreground">{g.title}</h3>
                  <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: '#c2a016' }}>{g.badge}</span>
                </div>
                <p className="text-sm text-muted-foreground">{g.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="container mx-auto px-4 mt-16"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
    </section>
  );
}
