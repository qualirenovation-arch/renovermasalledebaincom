import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Newspaper, BookOpen, Video } from "lucide-react";

interface TickerItem {
  type: "presse" | "guide" | "video";
  label: string;
  link: string;
}

const tickerItems: TickerItem[] = [
  { type: "presse", label: "Elle Décoration — Salle de bains pour deux : astuces d'architectes", link: "/presse#parutions" },
  { type: "guide", label: "Étanchéité obligatoire DTU", link: "/guide-travaux#etancheite" },
  { type: "video", label: "Comment choisir votre vasque à poser", link: "/guide-travaux#videos" },
  { type: "presse", label: "Houzz — Top 10 des WC les plus inspirants de 2024", link: "/presse#parutions" },
  { type: "guide", label: "Le bâti-support expliqué", link: "/guide-travaux#bati-support" },
  { type: "video", label: "Faut-il carreler toute hauteur ?", link: "/guide-travaux#videos" },
];

const getIcon = (type: TickerItem["type"]) => {
  switch (type) {
    case "presse":
      return <Newspaper className="w-3.5 h-3.5" />;
    case "guide":
      return <BookOpen className="w-3.5 h-3.5" />;
    case "video":
      return <Video className="w-3.5 h-3.5" />;
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
  }
};

export function ScrollingTicker() {
  // Duplicate items for seamless loop
  const duplicatedItems = [...tickerItems, ...tickerItems];

  return (
    <div className="bg-secondary/50 border-b border-border/30 overflow-hidden py-2">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -50 * tickerItems.length + "%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {duplicatedItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="inline-flex items-center gap-2 px-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="inline-flex items-center gap-1.5 text-wood font-medium">
              {getIcon(item.type)}
              {getTypeLabel(item.type)} :
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
