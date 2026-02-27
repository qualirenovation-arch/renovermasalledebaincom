import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQTOCCategory {
  label: string;
  id: string;
}

interface FAQStickyTOCProps {
  categories: FAQTOCCategory[];
}

export function FAQStickyTOC({ categories }: FAQStickyTOCProps) {
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
      if (currentId && currentId !== activeId) {
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
  };

  return (
    <nav aria-label="Sommaire de la FAQ">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-6" style={{ color: '#124A66' }}>
        Sommaire
      </p>
      <ul className="space-y-0.5">
        {categories.map(({ id, label }) => (
          <li key={id} className="relative">
            {activeId === id && (
              <div className="absolute left-0 top-1 bottom-1 w-[2px]" style={{ backgroundColor: '#c2a016' }} />
            )}
            <button
              onClick={() => handleClick(id)}
              className={cn(
                "w-full text-left text-[13px] py-2 pl-3 transition-colors duration-200",
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
    </nav>
  );
}
