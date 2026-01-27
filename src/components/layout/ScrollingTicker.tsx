import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tickerItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentItem = tickerItems[currentIndex];

  return (
    <div className="bg-secondary/30 border-b border-border/20 overflow-hidden">
      <div className="container-custom py-2.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex justify-center"
          >
            <Link
              to={currentItem.link}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <span className="inline-flex items-center gap-1.5 text-wood font-medium">
                {getIcon(currentItem.type)}
                <span>{getTypeLabel(currentItem.type)}</span>
                <span className="text-muted-foreground/50">:</span>
              </span>
              <span className="group-hover:underline">{currentItem.label}</span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}