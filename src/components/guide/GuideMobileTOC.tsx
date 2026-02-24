import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const tocItems = [
  { id: "section-planning", label: "Planning & Durée", badge: "⏱" },
  { id: "section-1", label: "Visite chantier", badge: "1" },
  { id: "section-2", label: "Démolition", badge: "2" },
  { id: "section-3", label: "Fonte & syndic", badge: "3" },
  { id: "section-4", label: "Maître d'œuvre", badge: "4" },
  { id: "section-5", label: "Plomberie", badge: "5" },
  { id: "section-6", label: "Étanchéité", badge: "6" },
  { id: "section-7", label: "Receveur & baignoire", badge: "7" },
  { id: "section-niches", label: "Les niches", badge: "sparkle" },
  { id: "section-8", label: "Joints & finitions", badge: "8" },
  { id: "section-9", label: "Robinetterie", badge: "9" },
  { id: "section-10", label: "Choisir sa baignoire", badge: "10" },
  { id: "section-11", label: "Peinture", badge: "11" },
  { id: "section-12", label: "VMC", badge: "12" },
  { id: "section-13", label: "Éclairage & chauffage", badge: "13" },
  { id: "section-paroi", label: "Paroi de douche", badge: "14" },
  { id: "questions-frequentes", label: "Questions fréquentes", badge: "❓" },
];

export function GuideMobileTOC() {
  return (
    <section className="py-8 bg-background border-b border-border lg:hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            📋 Sommaire
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {tocItems.map(({ id, label, badge }) => (
              <a
                key={id}
                href={`#${id}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent/50"
              >
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                  {badge === "sparkle" ? (
                    <Sparkles className="w-3 h-3" />
                  ) : (
                    badge
                  )}
                </span>
                <span className="line-clamp-1">{label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
