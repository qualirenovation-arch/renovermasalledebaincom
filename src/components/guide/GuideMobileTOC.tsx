import { useState, useEffect } from "react";
import { List, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
    items: [{ id: "section-4", label: "Maître d'œuvre" }],
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
    label: "Garanties",
    items: [{ id: "section-garanties", label: "Nos garanties" }],
  },
  {
    label: "FAQ",
    items: [{ id: "questions-frequentes", label: "Questions fréquentes" }],
  },
];

const allItems = tocCategories.flatMap((c) => c.items);

export function GuideMobileTOC() {
  const [isOpen, setIsOpen] = useState(false);
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
      if (currentId !== activeId) {
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
    setIsOpen(false);
  };

  return (
    <div className="sticky top-20 z-40 lg:hidden bg-background border-b border-border/50">
      <div className="container mx-auto px-4">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger className="w-full flex items-center justify-between py-3 text-sm">
            <span className="flex items-center gap-2">
              <List className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: '#124A66' }}>Sommaire</span>
            </span>
          </DrawerTrigger>
          <DrawerContent className="max-h-[75vh]">
            <DrawerHeader className="flex items-center justify-between pb-3 border-b border-border/30">
              <DrawerTitle className="text-base font-semibold" style={{ color: '#124A66' }}>Sommaire</DrawerTitle>
              <DrawerClose className="rounded-full p-1 opacity-60 hover:opacity-100 transition-all">
                <X className="h-4 w-4" />
                <span className="sr-only">Fermer</span>
              </DrawerClose>
            </DrawerHeader>
            <div className="px-4 pb-6 pt-2 overflow-y-auto">
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
                    <AccordionItem
                      key={category.label}
                      value={category.label}
                      className="border-none"
                    >
                      <AccordionTrigger
                        className={cn(
                          "py-3 px-3 text-[14px] font-medium hover:no-underline transition-colors [&>svg]:h-3.5 [&>svg]:w-3.5",
                          isCatActive
                            ? "text-[#124A66]"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {category.label}
                      </AccordionTrigger>
                      <AccordionContent className="pb-1.5 pt-1">
                        <ul className="space-y-0.5 ml-3">
                          {category.items.map(({ id, label }) => (
                            <li key={id} className="relative">
                              {activeId === id && (
                                <div className="absolute left-0 top-1 bottom-1 w-[2px]" style={{ backgroundColor: '#c2a016' }} />
                              )}
                              <button
                                onClick={() => handleClick(id)}
                                className={cn(
                                  "w-full text-left text-[13px] py-2 pl-4 transition-colors",
                                  activeId === id
                                    ? "font-semibold text-[#124A66]"
                                    : "text-muted-foreground hover:text-foreground"
                                )}
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
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
