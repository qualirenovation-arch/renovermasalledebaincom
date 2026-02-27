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

interface FAQTOCCategory {
  label: string;
  id: string;
}

interface FAQMobileTOCProps {
  categories: FAQTOCCategory[];
}

export function FAQMobileTOC({ categories }: FAQMobileTOCProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      let currentId = "";
      for (const { id } of categories) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          currentId = id;
        }
      }
      if (currentId !== activeId) {
        setActiveId(currentId);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeId, categories]);

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
              <ul className="space-y-0.5">
                {categories.map(({ id, label }) => (
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
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
