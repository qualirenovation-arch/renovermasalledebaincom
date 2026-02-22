import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Wrench, Search, Sparkles } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  wrench: Wrench,
  search: Search,
  sparkles: Sparkles,
};

interface PartnerTypeCardProps {
  icon: string;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

export function PartnerTypeCard({ icon, title, description, isSelected, onClick }: PartnerTypeCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full p-6 rounded-2xl border-2 text-left transition-all duration-300",
        "hover:shadow-lg hover:scale-[1.02]",
        isSelected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border/50 bg-card hover:border-primary/30"
      )}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
          {IconComponent ? (
            <IconComponent className="w-6 h-6 text-gold" strokeWidth={1.5} />
          ) : (
            <span className="text-2xl">{icon}</span>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
        <div className={cn(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
          isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
        )}>
          {isSelected && (
            <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </motion.button>
  );
}
