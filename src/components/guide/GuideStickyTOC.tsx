import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
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
      <p className="font-display text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-4 px-1">
        Sommaire
      </p>
      <Accordion
        type="single"
        collapsible
        value={openCategory}
        onValueChange={setOpenCategory}
        className="space-y-1"
      >
        {tocCategories.map((category) => {
          const isCatActive = category.items.some((i) => i.id === activeId);
          return (
            <motion.div
              key={category.label}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
            <AccordionItem
              value={category.label}
              className="border-none"
            >
              <AccordionTrigger
                className={cn(
                  "py-2.5 px-3 rounded-lg text-[13px] font-medium hover:no-underline transition-all duration-200 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground/60",
                  isCatActive
                    ? "text-primary bg-primary/[0.04] hover:bg-primary/[0.07]"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                )}
              >
                {category.label}
              </AccordionTrigger>
              <AccordionContent className="pb-1.5 pt-1">
                <ul className="space-y-0.5 pl-3 border-l-2 border-primary/15 ml-3">
                  {category.items.map(({ id, label }) => (
                    <li key={id}>
                      <button
                        data-toc-id={id}
                        onClick={() => handleClick(id)}
                        className={cn(
                          "w-full flex items-center gap-2 text-[12px] py-1.5 px-2.5 rounded-md transition-all duration-200 text-left",
                          activeId === id
                            ? "text-primary font-semibold bg-primary/[0.06]"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        )}
                      >
                        <ChevronRight className={cn(
                          "w-2.5 h-2.5 flex-shrink-0 transition-colors duration-200",
                          activeId === id ? "text-primary" : "text-muted-foreground/30"
                        )} />
                        <span className="truncate">{label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            </motion.div>
          );
        })}
      </Accordion>
    </nav>
  );
}
