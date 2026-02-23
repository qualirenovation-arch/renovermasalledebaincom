import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PartnerCTA() {
  return (
    <section className="py-12 md:py-16 bg-background border-t border-border/50">
      <div className="container-custom">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Left: Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <div className="w-14 h-14 rounded-xl bg-white border border-border flex items-center justify-center">
                <Handshake className="w-7 h-7 text-primary" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Réseau de confiance</span>
            </div>
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-semibold mb-3">
              Rejoignez notre réseau de partenaires
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg">
              Artisan, sous-traitant, marque ou installateur — développez votre activité avec des projets de qualité en Île-de-France.
            </p>
          </div>

          {/* Right: CTA Button */}
          <div className="flex-shrink-0">
            <Button 
              variant="gold" 
              size="lg" 
              asChild 
              className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
            >
              <Link to="/partenaires/contact">
                Devenir partenaire
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
