import { Link } from "react-router-dom";
import { Newspaper, BookOpen, ArrowRight } from "lucide-react";

const newsItems = [
  {
    type: "presse",
    title: "Maison de maître 1900 rénovée",
    source: "Houzz",
    date: "Janvier 2025",
    link: "/presse",
  },
  {
    type: "presse",
    title: "La rénovation avec transparence",
    source: "Marie Claire Maison",
    date: "Novembre 2024",
    link: "/presse",
  },
  {
    type: "conseil",
    title: "Choisir sa robinetterie",
    source: "Guide travaux",
    date: "Conseil du jour",
    link: "/guide-travaux#robinetterie",
  },
  {
    type: "conseil",
    title: "Parois de douche : les options",
    source: "Guide travaux",
    date: "À découvrir",
    link: "/guide-travaux#parois-douche",
  },
];

export function NewsColumn() {
  return (
    <div className="w-80 p-4">
      <h3 className="font-display text-lg font-semibold text-primary mb-4 flex items-center gap-2">
        <Newspaper className="w-5 h-5" />
        Actualités
      </h3>
      
      <div className="space-y-3">
        {newsItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="block p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${item.type === "presse" ? "bg-accent/20" : "bg-mint/20"}`}>
                {item.type === "presse" ? (
                  <Newspaper className="w-4 h-4 text-accent" />
                ) : (
                  <BookOpen className="w-4 h-4 text-mint" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.source} • {item.date}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border flex gap-2">
        <Link
          to="/presse"
          className="flex-1 text-center text-sm font-medium text-primary hover:text-primary/80 transition-colors py-2 px-3 rounded-lg bg-primary/5 hover:bg-primary/10"
        >
          Voir la presse
        </Link>
        <Link
          to="/guide-travaux"
          className="flex-1 text-center text-sm font-medium text-mint hover:text-mint/80 transition-colors py-2 px-3 rounded-lg bg-mint/5 hover:bg-mint/10"
        >
          Guide travaux
        </Link>
      </div>
    </div>
  );
}
