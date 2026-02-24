import { useState, useEffect } from "react";
import { ChevronRight, List, X } from "lucide-react";
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

export function GuideMobileTOC() {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="sticky top-20 z-40 lg:hidden bg-background/98 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger className="w-full flex items-center justify-between py-3 text-sm font-medium text-foreground">
            <span className="flex items-center gap-2">
              <List className="w-4 h-4 text-muted-foreground" />
              Sommaire
            </span>
          </DrawerTrigger>
          <DrawerContent className="max-h-[75vh]">
            <DrawerHeader className="flex items-center justify-between pb-2">
              <DrawerTitle className="text-base font-semibold">Sommaire</DrawerTitle>
              <DrawerClose className="rounded-sm opacity-70 hover:opacity-100 transition-opacity">
                <X className="h-4 w-4" />
                <span className="sr-only">Fermer</span>
              </DrawerClose>
            </DrawerHeader>
            <div className="px-4 pb-6 overflow-y-auto">
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
                          "py-2.5 px-3 rounded-md text-sm font-medium hover:no-underline hover:bg-accent/50 transition-colors [&>svg]:h-3.5 [&>svg]:w-3.5",
                          isCatActive
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        {category.label}
                      </AccordionTrigger>
                      <AccordionContent className="pb-1 pt-0.5">
                        <ul className="space-y-0.5 pl-3 border-l border-border/50 ml-3">
                          {category.items.map(({ id, label }) => (
                            <li key={id}>
                              <button
                                onClick={() => handleClick(id)}
                                className={cn(
                                  "w-full flex items-center gap-2 text-sm py-2 px-3 rounded-md transition-colors text-left",
                                  activeId === id
                                    ? "text-primary font-medium bg-primary/5"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                                )}
                              >
                                <ChevronRight className={cn(
                                  "w-3 h-3 flex-shrink-0",
                                  activeId === id ? "text-primary" : "text-muted-foreground/50"
                                )} />
                                <span>{label}</span>
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
