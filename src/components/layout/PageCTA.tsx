import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Droplets } from "lucide-react";

interface PageCTAProps {
  title: string;
  description: string;
  buttonText: string;
  variant?: "light" | "dark";
  /** If true, invert hierarchy: water damage is primary, classic is secondary */
  invertCTA?: boolean;
}

export function PageCTA({ title, description, buttonText, variant = "light", invertCTA = false }: PageCTAProps) {
  const isDark = variant === "dark";

  return (
    <section className={`py-16 md:py-24 ${isDark ? "bg-primary text-primary-foreground" : "bg-stone"}`}>
      <div className="container-custom text-center">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-1 rounded-full bg-gold mx-auto mb-8" />
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 md:mb-6">
            {title}
          </h2>
          <p className={`text-base md:text-lg mb-10 md:mb-12 leading-relaxed ${isDark ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
            {description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {invertCTA ? (
              <>
                {/* Water damage = primary on /degats-eaux */}
                <Button variant="default" size="xl" asChild className="rounded-full w-full sm:w-auto">
                  <Link to="/degats-eaux">
                    <Droplets className="w-5 h-5 mr-2" />
                    Urgence dégât des eaux
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="gold" size="xl" asChild className="rounded-full w-full sm:w-auto">
                  <Link to="/devis#devis-form">
                    {buttonText}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                {/* Classic = primary everywhere else */}
                <Button variant="gold" size="xl" asChild className="rounded-full w-full sm:w-auto">
                  <Link to="/devis#devis-form">
                    {buttonText}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="xl" 
                  asChild 
                  className="rounded-full w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Link to="/degats-eaux">
                    <Droplets className="w-5 h-5 mr-2" />
                    Urgence dégât des eaux
                  </Link>
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
