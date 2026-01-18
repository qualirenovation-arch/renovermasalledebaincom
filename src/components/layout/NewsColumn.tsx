import { Link } from "react-router-dom";
import { Newspaper, BookOpen, ArrowRight, ExternalLink } from "lucide-react";
import { presseNews, guideConseils } from "@/data/newsData";

export function NewsColumn() {
  // Prendre les 2 articles presse les plus récents et 2 conseils
  const latestPresse = presseNews.slice(0, 2);
  const featuredConseils = guideConseils.slice(0, 2);

  return (
    <div className="w-80 p-4">
      {/* Section Presse */}
      <div className="mb-4">
        <h3 className="font-display text-sm font-semibold text-primary mb-3 flex items-center gap-2 uppercase tracking-wide">
          <Newspaper className="w-4 h-4" />
          Dans la presse
        </h3>
        
        <div className="space-y-2">
          {latestPresse.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="block p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <span className="font-medium text-primary/80">{item.source}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Séparateur */}
      <div className="border-t border-border my-4" />

      {/* Section Conseils */}
      <div className="mb-4">
        <h3 className="font-display text-sm font-semibold text-mint mb-3 flex items-center gap-2 uppercase tracking-wide">
          <BookOpen className="w-4 h-4" />
          Conseils du guide
        </h3>
        
        <div className="space-y-2">
          {featuredConseils.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="block p-3 rounded-lg bg-mint/10 hover:bg-mint/20 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground group-hover:text-mint transition-colors">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-mint transition-colors flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Boutons d'action */}
      <div className="pt-3 border-t border-border flex gap-2">
        <Link
          to="/presse"
          className="flex-1 text-center text-xs font-medium text-primary hover:text-primary/80 transition-colors py-2 px-3 rounded-lg bg-primary/5 hover:bg-primary/10"
        >
          Toute la presse
        </Link>
        <Link
          to="/guide-travaux"
          className="flex-1 text-center text-xs font-medium text-mint hover:text-mint/80 transition-colors py-2 px-3 rounded-lg bg-mint/5 hover:bg-mint/10"
        >
          Guide complet
        </Link>
      </div>
    </div>
  );
}
