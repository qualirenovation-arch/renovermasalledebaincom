import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  ClipboardList, Search, HardHat, Wrench, Paintbrush, Sofa, Shield,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tocCategories = [
  {
    label: "Préparation",
    icon: ClipboardList,
    items: [
      { id: "duree-renovation-salle-de-bain", label: "Durée rénovation" },
      { id: "visite-technique-appartement-parisien", label: "Visite chantier" },
      { id: "demolition-inspection-reseaux", label: "Démolition" },
      { id: "colonnes-fonte-copropriete", label: "Fonte & syndic" },
    ],
  },
  {
    label: "Accompagnement",
    icon: HardHat,
    items: [
      { id: "section-4", label: "Maître d'œuvre" },
    ],
  },
  {
    label: "Infrastructure",
    icon: Wrench,
    items: [
      { id: "plomberie-renovation", label: "Plomberie" },
      { id: "etancheite-salle-de-bain", label: "Étanchéité" },
      { id: "receveur-douche-appartement", label: "Receveur de douche" },
      { id: "section-8", label: "Baignoire" },
      { id: "section-9", label: "Paroi de douche" },
      { id: "section-10", label: "WC, vasque & chauffe-eau" },
    ],
  },
  {
    label: "Design & Finitions",
    icon: Paintbrush,
    items: [
      { id: "section-niches", label: "Les niches" },
      { id: "section-11", label: "Joints & finitions" },
      { id: "section-12", label: "Robinetterie" },
    ],
  },
  {
    label: "Confort & Équipement",
    icon: Sofa,
    items: [
      { id: "section-13", label: "Peinture, VMC & Éclairage" },
    ],
  },
  {
    label: "Garanties",
    icon: Shield,
    items: [
      { id: "garantie-decennale-salle-de-bain", label: "Garanties décennales" },
    ],
  },
];

const allItems = tocCategories.flatMap((c) => c.items);

export function GuideStickyTOC() {
  const [activeId, setActiveId] = useState<string>("");
  const [openCategory, setOpenCategory] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      let currentId = "";
      for (const { id } of allItems) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          currentId = id;
        }
      }
      if (currentId && currentId !== activeId) {
        setActiveId(currentId);
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
      <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-6" style={{ color: '#124A66' }}>
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
          const IconComp = category.icon;
          return (
            <AccordionItem
              key={category.label}
              value={category.label}
              className="border-none"
            >
              <AccordionTrigger
                className={cn(
                  "py-3 px-2 text-[13px] font-medium hover:no-underline transition-colors duration-200 [&>svg]:h-3 [&>svg]:w-3 gap-2",
                  isCatActive
                    ? "text-[#124A66]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="flex items-center gap-2">
                  <IconComp className="w-4 h-4" style={{ color: '#124A66' }} />
                  {category.label}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-2 pt-0.5">
                <ul className="space-y-0.5 ml-6">
                  {category.items.map(({ id, label }) => (
                    <li key={id} className="relative">
                      {activeId === id && (
                        <div className="absolute left-0 top-1 bottom-1 w-[2px]" style={{ backgroundColor: '#c2a016' }} />
                      )}
                      <button
                        data-toc-id={id}
                        onClick={() => handleClick(id)}
                        className={cn(
                          "w-full text-left text-[12px] py-1.5 pl-3 transition-colors duration-200",
                          activeId === id
                            ? "font-semibold"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                        style={activeId === id ? { color: '#124A66' } : undefined}
                      >
                        {label}
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
