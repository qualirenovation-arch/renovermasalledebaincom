import { useState, useEffect } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 150;
      let currentId = "";
      for (const { id } of tocItems) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop) {
          currentId = id;
        }
      }
      if (currentId !== activeId) setActiveId(currentId);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeId]);

  const activeLabel = tocItems.find((t) => t.id === activeId)?.label || "Sommaire";

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <div className="sticky top-20 z-40 lg:hidden bg-background/98 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between py-3 text-sm font-medium text-foreground">
            <span className="flex items-center gap-1.5 min-w-0">
              <span className="text-muted-foreground flex-shrink-0">Sommaire</span>
              <span className="text-muted-foreground/50 flex-shrink-0">›</span>
              <span className="truncate text-foreground">{activeLabel}</span>
            </span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-muted-foreground transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pb-3">
            <div className="grid grid-cols-2 gap-1 max-h-[50vh] overflow-y-auto">
              {tocItems.map(({ id, label, badge }) => (
                <button
                  key={id}
                  onClick={() => handleClick(id)}
                  className={cn(
                    "flex items-center gap-2 text-sm p-2 rounded-lg transition-colors text-left",
                    activeId === id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <span
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0",
                      activeId === id
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    {badge === "sparkle" ? <Sparkles className="w-3 h-3" /> : badge}
                  </span>
                  <span className="line-clamp-1">{label}</span>
                </button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
