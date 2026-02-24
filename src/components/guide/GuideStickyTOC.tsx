import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const tocItems = [
  { id: "section-planning", label: "Planning & Durée", badge: "🎵", isSpecial: true },
  { id: "section-1", label: "Visite chantier", badge: "1", isSpecial: false },
  { id: "section-2", label: "Démolition", badge: "2", isSpecial: false },
  { id: "section-3", label: "Fonte & syndic", badge: "3", isSpecial: false },
  { id: "section-4", label: "Maître d'œuvre", badge: "4", isSpecial: false },
  { id: "section-5", label: "Plomberie", badge: "5", isSpecial: false },
  { id: "section-6", label: "Étanchéité", badge: "6", isSpecial: false },
  { id: "section-7", label: "Receveur & baignoire", badge: "7", isSpecial: false },
  { id: "section-niches", label: "Les niches", badge: "✨", isSpecial: true },
  { id: "section-8", label: "Joints & finitions", badge: "8", isSpecial: false },
  { id: "section-9", label: "Robinetterie", badge: "9", isSpecial: false },
  { id: "section-10", label: "Choisir sa baignoire", badge: "10", isSpecial: false },
  { id: "section-11", label: "Peinture", badge: "11", isSpecial: false },
  { id: "section-12", label: "VMC", badge: "12", isSpecial: false },
  { id: "section-13", label: "Éclairage & chauffage", badge: "13", isSpecial: false },
  { id: "section-paroi", label: "Paroi de douche", badge: "14", isSpecial: false },
  { id: "questions-frequentes", label: "Questions fréquentes", badge: "❓", isSpecial: true },
];

export function GuideStickyTOC() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 150; // offset for sticky header
      let currentId = "";

      for (const { id } of tocItems) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollY >= top) {
            currentId = id;
          }
        }
      }

      if (currentId && currentId !== activeId) {
        setActiveId(currentId);
      }
    };

    handleScroll(); // initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeId]);

  // Auto-scroll TOC to keep active item visible
  useEffect(() => {
    if (!activeId) return;
    const btn = document.querySelector(`[data-toc-id="${activeId}"]`);
    if (btn) {
      btn.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeId]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        📋 Sommaire
      </h3>
      <ul className="space-y-0.5">
        {tocItems.map(({ id, label, badge, isSpecial }) => (
          <li key={id}>
            <button
              data-toc-id={id}
              onClick={() => handleClick(id)}
              className={cn(
                "w-full flex items-center gap-2 text-xs py-1.5 px-2 rounded-md transition-all text-left",
                isSpecial && "italic",
                activeId === id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <span
                className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0",
                  isSpecial
                    ? activeId === id
                      ? "bg-accent text-accent-foreground"
                      : "bg-accent/50 text-accent-foreground/70"
                    : activeId === id
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary"
                )}
              >
                {badge}
              </span>
              <span className="truncate">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
