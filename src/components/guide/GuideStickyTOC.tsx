import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

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
];

export function GuideStickyTOC() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible section
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );

    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-scroll TOC to keep active item visible
  useEffect(() => {
    if (!activeId) return;
    const btn = document.querySelector(`[data-toc-id="${activeId}"]`);
    if (btn) {
      btn.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeId]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        📋 Sommaire
      </h3>
      <ul className="space-y-0.5">
        {tocItems.map(({ id, label, badge }) => (
          <li key={id}>
            <button
              data-toc-id={id}
              onClick={() => handleClick(id)}
              className={cn(
                "w-full flex items-center gap-2 text-xs py-1.5 px-2 rounded-md transition-all text-left",
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
                {badge === "sparkle" ? (
                  <Sparkles className="w-2.5 h-2.5" />
                ) : (
                  badge
                )}
              </span>
              <span className="truncate">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
