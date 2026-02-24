import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tocCategories = [
  {
    label: "Préparation",
    items: [
      { id: "section-planning", label: "Planning & Durée" },
      { id: "section-1", label: "Visite chantier" },
      { id: "section-2", label: "Démolition" },
      { id: "section-3", label: "Fonte & syndic" },
    ],
  },
  {
    label: "Accompagnement",
    items: [
      { id: "section-4", label: "Maître d'œuvre" },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { id: "section-5", label: "Plomberie" },
      { id: "section-6", label: "Étanchéité" },
      { id: "section-7", label: "Receveur & baignoire" },
    ],
  },
  {
    label: "Design & Finitions",
    items: [
      { id: "section-niches", label: "Les niches" },
      { id: "section-8", label: "Joints & finitions" },
      { id: "section-9", label: "Robinetterie" },
      { id: "section-10", label: "Choisir sa baignoire" },
    ],
  },
  {
    label: "Confort & Équipement",
    items: [
      { id: "section-11", label: "Peinture" },
      { id: "section-12", label: "VMC" },
      { id: "section-13", label: "Éclairage & chauffage" },
      { id: "section-paroi", label: "Paroi de douche" },
    ],
  },
  {
    label: "FAQ",
    items: [
      { id: "questions-frequentes", label: "Questions fréquentes" },
    ],
  },
];

const allItems = tocCategories.flatMap((c) => c.items);

export function GuideStickyTOC() {
  const [activeId, setActiveId] = useState<string>("");
  const [openCategory, setOpenCategory] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 150;
      let currentId = "";
      for (const { id } of allItems) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop) {
          currentId = id;
        }
      }
      if (currentId && currentId !== activeId) {
        setActiveId(currentId);
        // Auto-open the category containing the active item
        const cat = tocCategories.find((c) => c.items.some((i) => i.id === currentId));
        if (cat) setOpenCategory(cat.label);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeId]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav aria-label="Sommaire du guide">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1">
        Sommaire
      </p>
      <Accordion
        type="single"
        collapsible
        value={openCategory}
        onValueChange={setOpenCategory}
        className="space-y-0.5"
      >
        {tocCategories.map((category) => {
          const isCatActive = category.items.some((i) => i.id === activeId);
          return (
            <AccordionItem
              key={category.label}
              value={category.label}
              className="border-none"
            >
              <AccordionTrigger
                className={cn(
                  "py-2 px-2.5 rounded-md text-xs font-medium hover:no-underline hover:bg-accent/50 transition-colors [&>svg]:h-3 [&>svg]:w-3",
                  isCatActive
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {category.label}
              </AccordionTrigger>
              <AccordionContent className="pb-1 pt-0.5">
                <ul className="space-y-0.5 pl-2 border-l border-border/50 ml-2.5">
                  {category.items.map(({ id, label }) => (
                    <li key={id}>
                      <button
                        data-toc-id={id}
                        onClick={() => handleClick(id)}
                        className={cn(
                          "w-full flex items-center gap-1.5 text-xs py-1.5 px-2 rounded-md transition-colors text-left",
                          activeId === id
                            ? "text-primary font-medium bg-primary/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                        )}
                      >
                        <ChevronRight className={cn(
                          "w-3 h-3 flex-shrink-0 transition-colors",
                          activeId === id ? "text-primary" : "text-muted-foreground/50"
                        )} />
                        <span className="truncate">{label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </nav>
  );
}
