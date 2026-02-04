import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Wrench, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PartnerCTA() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-wood/10 via-gold/5 to-wood/10">
      <div className="container-custom">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Left: Icons + Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center border-2 border-background">
                  <Wrench className="w-5 h-5 text-gold" />
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border-2 border-background">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="w-10 h-10 rounded-full bg-wood/20 flex items-center justify-center border-2 border-background">
                  <Handshake className="w-5 h-5 text-wood" />
                </div>
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
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
