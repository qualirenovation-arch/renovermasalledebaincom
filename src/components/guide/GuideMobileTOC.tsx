import { useState, useEffect } from "react";
import { ChevronRight, List, X } from "lucide-react";
import { motion } from "framer-motion";
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
  const [progress, setProgress] = useState(0);

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
      const idx = allItems.findIndex((i) => i.id === currentId);
      setProgress(currentId ? Math.round(((idx + 1) / allItems.length) * 100) : 0);
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
          <DrawerTrigger className="w-full flex items-center justify-between py-3.5 text-sm font-medium text-foreground">
            <span className="flex items-center gap-2.5">
              <List className="w-4 h-4 text-primary/60" />
              <span className="font-display text-[13px] uppercase tracking-[0.1em] text-primary">Sommaire</span>
            </span>
            <span className="text-[11px] font-medium text-muted-foreground tabular-nums">{progress}%</span>
          </DrawerTrigger>
          <div className="h-0.5 w-full bg-muted/30">
            <motion.div
              className="h-full bg-primary/50 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
          <DrawerContent className="max-h-[75vh]">
            <DrawerHeader className="flex items-center justify-between pb-3 border-b border-border/30">
              <DrawerTitle className="font-display text-base font-semibold text-primary tracking-wide">Sommaire</DrawerTitle>
              <DrawerClose className="rounded-full p-1 opacity-60 hover:opacity-100 hover:bg-muted/50 transition-all">
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
                          "py-3 px-3.5 rounded-lg text-[14px] font-medium hover:no-underline transition-all duration-200 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-muted-foreground/60",
                          isCatActive
                            ? "text-primary bg-primary/[0.04]"
                            : "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                        )}
                      >
                        {category.label}
                      </AccordionTrigger>
                      <AccordionContent className="pb-1.5 pt-1">
                        <ul className="space-y-0.5 pl-3.5 border-l-2 border-primary/15 ml-3.5">
                          {category.items.map(({ id, label }) => (
                            <li key={id}>
                              <button
                                onClick={() => handleClick(id)}
                                className={cn(
                                  "w-full flex items-center gap-2.5 text-[13px] py-2 px-3 rounded-md transition-all duration-200 text-left",
                                  activeId === id
                                    ? "text-primary font-semibold bg-primary/[0.06]"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                )}
                              >
                                <ChevronRight className={cn(
                                  "w-2.5 h-2.5 flex-shrink-0 transition-colors duration-200",
                                  activeId === id ? "text-primary" : "text-muted-foreground/30"
                                )} />
                                <span>{label}</span>
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
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
