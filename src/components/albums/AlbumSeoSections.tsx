import { AlbumSeoSection, AlbumFaqItem } from "@/data/albumsData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface AlbumSeoSectionsProps {
  sections?: AlbumSeoSection[];
  faqItems?: AlbumFaqItem[];
  faqTitle?: string;
  externalAlbumLink?: { label: string; url: string };
}

export function AlbumSeoSections({ sections, faqItems, externalAlbumLink }: AlbumSeoSectionsProps) {
  if (!sections?.length && !faqItems?.length && !externalAlbumLink) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-12 space-y-10 max-w-3xl"
    >
      {/* Structured H2 sections */}
      {sections?.map((section, index) => (
        <div key={index}>
          <h2 className="font-display text-xl md:text-2xl font-light mb-4 text-primary">
            {section.title}
          </h2>
          {section.content && (
            <div className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line">
              {section.content}
            </div>
          )}
          {section.listItems && section.listItems.length > 0 && (
            section.type === "ordered-list" ? (
              <ol className="space-y-2 list-decimal list-inside text-muted-foreground text-sm md:text-base mt-3">
                {section.listItems.map((item, i) => (
                  <li key={i} className="leading-relaxed">{item}</li>
                ))}
              </ol>
            ) : (
              <ul className="space-y-2 text-muted-foreground text-sm md:text-base mt-3">
                {section.listItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      ))}

      {/* FAQ Accordion */}
      {faqItems && faqItems.length > 0 && (
        <div>
          <h2 className="font-display text-xl md:text-2xl font-light mb-4 text-primary">
            Questions fréquentes sur la rénovation d'une salle de bain
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-sm md:text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {/* External album link */}
      {externalAlbumLink && (
        <div className="pt-4">
          <a
            href={externalAlbumLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-secondary text-foreground rounded-xl hover:bg-secondary/80 transition-colors font-medium text-sm border border-border/50"
          >
            <ExternalLink className="w-4 h-4" />
            {externalAlbumLink.label}
          </a>
        </div>
      )}
    </motion.div>
  );
}
