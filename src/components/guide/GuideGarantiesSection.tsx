import { motion } from "framer-motion";
import { Shield, Clock, Wrench, Award, BadgeCheck, Handshake } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const garanties = [
  {
    icon: Shield,
    title: "Garantie décennale",
    description: "Tous nos travaux sont couverts par une assurance décennale, pour une tranquillité absolue.",
    badge: "10 ans",
  },
  {
    icon: BadgeCheck,
    title: "Étanchéité certifiée",
    description: "Systèmes d'étanchéité conformes aux normes DTU 52.2, avec procès-verbal de réception.",
    badge: "DTU 52.2",
  },
  {
    icon: Clock,
    title: "Délais garantis",
    description: "Planning contractuel avec dates de début et de fin engagées par écrit.",
    badge: "Contractuel",
  },
  {
    icon: Wrench,
    title: "SAV réactif",
    description: "Un interlocuteur unique pour toute intervention après réception des travaux.",
    badge: "Inclus",
  },
  {
    icon: Award,
    title: "Artisans qualifiés",
    description: "Équipes internes formées et supervisées, aucune sous-traitance non maîtrisée.",
    badge: "Certifié",
  },
  {
    icon: Handshake,
    title: "Budget encadré, évolutif et transparent",
    description: "Nos devis sont exhaustifs et conçus pour anticiper chaque étape du chantier. Toute évolution liée aux choix de matériaux ou d'équipements est formalisée et validée avant exécution. Le budget est piloté avec précision : chaque plus-value ou moins-value est détaillée, expliquée et intégrée dans un suivi financier clair. Vous gardez la maîtrise. Nous assurons le cadre.",
    badge: "Suivi financier",
  },
];

export function GuideGarantiesSection() {
  return (
    <section id="section-garanties" className="py-16 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-xs uppercase tracking-widest border-accent/40 text-accent">
              Engagement qualité
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-3">
              Nos garanties
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chaque chantier est encadré par des engagements concrets, vérifiables et contractuels.
            </p>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {garanties.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group relative bg-background rounded-2xl border-2 border-border/60 p-6 hover:border-accent/40 hover:shadow-[0_4px_20px_-4px_hsl(0_0%_0%/0.08)] transition-all duration-300"
              >
                {/* Badge */}
                <Badge className="absolute top-4 right-4 bg-accent/10 text-accent border-accent/20 text-[10px] uppercase tracking-wider font-semibold hover:bg-accent/15">
                  {g.badge}
                </Badge>

                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center mb-4 shadow-sm">
                  <g.icon className="w-5 h-5 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-base font-semibold text-foreground mb-2">{g.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{g.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
