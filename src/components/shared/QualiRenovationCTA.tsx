import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoQualiRenovation } from "./LogoQualiRenovation";

interface QualiRenovationCTAProps {
  /** "full" = premium card with logo + title + text + button (Guide). "compact" = smaller inline block (FAQ, About). */
  variant?: "full" | "compact";
}

export function QualiRenovationCTA({ variant = "full" }: QualiRenovationCTAProps) {
  if (variant === "compact") {
    return (
      <div className="border border-border/40 rounded-2xl p-6 md:p-8 bg-card">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <LogoQualiRenovation width={140} height={34} className="flex-shrink-0" />
          <div className="text-center sm:text-left flex-1">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pour une rénovation globale (appartement/maison) à Paris &amp; Île-de-France, découvrez QualiRénovation.
            </p>
          </div>
          <a
            href="https://qualirenovation.fr"
            target="_blank"
            rel="noopener"
            aria-label="Découvrir QualiRénovation – rénovation globale à Paris"
            className="flex-shrink-0"
          >
            <Button variant="outline" size="sm" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <ExternalLink className="w-3.5 h-3.5" />
              Découvrir QualiRénovation
            </Button>
          </a>
        </div>
      </div>
    );
  }

  // Full variant — premium card for Guide page
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-border/40 bg-card p-8 md:p-10 shadow-[0_4px_24px_-4px_hsl(0_0%_0%/0.06)]">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              {/* Logo */}
              <div className="flex-shrink-0">
                <LogoQualiRenovation width={200} height={48} />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-display text-lg md:text-xl font-light mb-3" style={{ color: '#124A66' }}>
                  Travaux d'ampleur : rénovation globale
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
                  Vous avez un projet de rénovation globale de maison ou d'appartement à Paris ou en Île-de-France ?
                  Faites votre demande sur notre site dédié : <strong className="text-foreground">QualiRénovation</strong>.
                </p>
                <a
                  href="https://qualirenovation.fr"
                  target="_blank"
                  rel="noopener"
                  aria-label="Découvrir QualiRénovation – rénovation globale à Paris et Île-de-France"
                >
                  <Button variant="gold" size="default" className="gap-2 w-full sm:w-auto">
                    <ExternalLink className="w-4 h-4" />
                    Découvrir QualiRénovation
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
