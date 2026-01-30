import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Newspaper, BookOpen, Video, Sparkles, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface TickerItem {
  type: "presse" | "guide" | "video" | "realisation" | "conseil";
  label: string;
  link: string;
}

const tickerItems: TickerItem[] = [
  // Presse
  { type: "presse", label: "Elle Décoration — Salle de bains pour deux : astuces d'architectes", link: "/presse#parutions" },
  { type: "presse", label: "Houzz — Maison de maître 1900 rénovée de A à Z", link: "/presse#parutions" },
  { type: "presse", label: "Marie Claire Maison — Rénovation avec transparence et expertise", link: "/presse#parutions" },
  { type: "presse", label: "Houzz — Objectif zéro déchet sur les chantiers", link: "/presse#parutions" },
  { type: "presse", label: "Houzz — 9 aménagements pour économiser l'eau", link: "/presse#parutions" },
  { type: "presse", label: "Houzz — 50 coins buanderie optimisés", link: "/presse#parutions" },
  // Guide travaux
  { type: "guide", label: "Étanchéité obligatoire DTU — SEL et SPEC sous carrelage", link: "/guide-travaux#etancheite" },
  { type: "guide", label: "Douche ou baignoire : laquelle choisir ?", link: "/guide-travaux#douche-italienne" },
  { type: "guide", label: "Faut-il refaire toute la plomberie ?", link: "/guide-travaux#plomberie" },
  { type: "guide", label: "Normes électriques NF C 15-100 salle de bain", link: "/guide-travaux#electricite" },
  { type: "guide", label: "Bâti-support Geberit : tout savoir", link: "/guide-travaux#questions-techniques" },
  // Conseils
  { type: "conseil", label: "Choisir sa robinetterie — finitions et compatibilité", link: "/guide-travaux#robinetterie" },
  { type: "conseil", label: "Faut-il carreler toute hauteur ?", link: "/guide-travaux#astuces-budget" },
  { type: "conseil", label: "Cuvette sans bride : notre recommandation", link: "/guide-travaux#questions-techniques" },
  { type: "conseil", label: "Pourquoi faire appel à un maître d'œuvre ?", link: "/guide-travaux#moe" },
  // Réalisations
  { type: "realisation", label: "Paris 8ᵉ — Rénovation dégât des eaux, marbre et noir mat", link: "/realisations/salle-de-bain-paris-8-renovation-degat-des-eaux-marbre-noir-mat" },
  { type: "realisation", label: "Paris 13ᵉ — Zellige bejmat vert Saint-Laurent et laiton", link: "/realisations/salle-de-bain-paris-13-renovation-zellige-turquoise-or" },
  { type: "realisation", label: "Saint-Mandé — Économies d'énergie après rénovation", link: "/realisations/salle-de-bain-saint-mande-renovation-contemporaine-bois-marbre" },
  { type: "realisation", label: "Paris 19ᵉ — Mosaïque géométrique & Noir mat", link: "/realisations/salle-de-bain-paris-19-renovation-mosaique-geometrique-noir-mat" },
  { type: "realisation", label: "Bois-Colombes — Terrazzo minéral, vert d'eau et laiton", link: "/realisations/salle-de-bain-bois-colombes-92-terrazzo-mineral-vert-eau-laiton" },
  { type: "realisation", label: "Paris 5ᵉ — Zellige blanc et sol Patrimony bleu", link: "/realisations/salle-de-bain-paris-5-renovation-baignoire-saint-germain" },
  // Vidéos
  { type: "video", label: "Comment choisir votre vasque à poser", link: "/guide-travaux#videos-conseils" },
  { type: "video", label: "Accès plomberie : à ne pas oublier !", link: "/guide-travaux#plomberie" },
  { type: "video", label: "VMC et ventilation salle de bain", link: "/guide-travaux#videos-conseils" },
  { type: "video", label: "Installation ciel de pluie encastré", link: "/guide-travaux#videos-conseils" },
];

const getIcon = (type: TickerItem["type"]) => {
  switch (type) {
    case "presse":
      return <Newspaper className="w-3 h-3" />;
    case "guide":
      return <BookOpen className="w-3 h-3" />;
    case "video":
      return <Video className="w-3 h-3" />;
    case "realisation":
      return <Sparkles className="w-3 h-3" />;
    case "conseil":
      return <Lightbulb className="w-3 h-3" />;
  }
};

const getTypeLabel = (type: TickerItem["type"]) => {
  switch (type) {
    case "presse":
      return "Presse";
    case "guide":
      return "Guide";
    case "video":
      return "Vidéo";
    case "realisation":
      return "Réalisation";
    case "conseil":
      return "Conseil";
  }
};

const getBadgeClass = (type: TickerItem["type"]) => {
  switch (type) {
    case "presse":
      return "bg-tag-blue text-foreground";
    case "guide":
      return "bg-tag-mint text-foreground";
    case "video":
      return "bg-tag-peach text-foreground";
    case "realisation":
      return "bg-tag-gold text-foreground";
    case "conseil":
      return "bg-tag-beige text-foreground";
  }
};

export function ScrollingTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate items for seamless loop
  const duplicatedItems = [...tickerItems, ...tickerItems, ...tickerItems];

  const animationDuration = isMobile ? 120 : 80; // Ralenti pour meilleure lisibilité

  return (
    <div 
      className="bg-secondary/40 border-b border-border/30 overflow-hidden h-10 md:h-11"
      role="marquee"
      aria-label="Actualités et liens utiles"
    >
      <div 
        ref={containerRef}
        className="relative h-full flex items-center overflow-x-auto scrollbar-hide md:overflow-hidden"
        onMouseEnter={() => !isMobile && setIsPaused(true)}
        onMouseLeave={() => !isMobile && setIsPaused(false)}
      >
        <motion.div
          className="flex items-center gap-6 md:gap-8 whitespace-nowrap px-4"
          animate={{
            x: isPaused ? undefined : [0, "-33.33%"],
          }}
          transition={{
            x: {
              duration: animationDuration,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            },
          }}
          style={{ willChange: "transform" }}
        >
          {duplicatedItems.map((item, index) => (
            <div key={`${item.label}-${index}`} className="flex items-center gap-6 md:gap-8">
              <Link
                to={item.link}
                className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              >
                <Badge 
                  variant="secondary" 
                  className={`${getBadgeClass(item.type)} px-2 py-0.5 text-xs font-medium gap-1 shrink-0`}
                >
                  {getIcon(item.type)}
                  {getTypeLabel(item.type)}
                </Badge>
                <span className="group-hover:underline underline-offset-2">{item.label}</span>
              </Link>
              {index < duplicatedItems.length - 1 && (
                <span className="text-muted-foreground/40 text-xs">•</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}