import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Droplets, ArrowRight } from "lucide-react";

interface Props {
  onSelectClassic: () => void;
  onSelectWaterDamage: () => void;
}

export function DevisTypeSelector({ onSelectClassic, onSelectWaterDamage }: Props) {
  return (
    <div className="max-w-3xl mx-auto mb-10">
      <h2 className="font-display text-xl md:text-2xl font-semibold text-center mb-6">
        Quel type de projet souhaitez-vous réaliser ?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Card 1 - Rénovation classique */}
        <motion.div
          className="card-elevated p-6 cursor-pointer hover:shadow-lg transition-all group"
          whileHover={{ y: -4 }}
          onClick={onSelectClassic}
        >
          <div className="flex flex-col h-full">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-4">
              <Home className="w-7 h-7 text-gold" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">
              Rénovation classique
            </h3>
            <p className="text-muted-foreground text-sm mb-4 flex-grow">
              Projet de rénovation de salle de bain, cuisine, WC ou appartement, 
              <strong className="text-foreground"> hors sinistre</strong>.
            </p>
            <Button 
              variant="default" 
              className="w-full group-hover:bg-foreground group-hover:text-background transition-colors"
            >
              Faire une demande de devis
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        {/* Card 2 - Dégât des eaux */}
        <motion.div
          className="card-elevated p-6 cursor-pointer hover:shadow-lg transition-all group border-2 border-blue-200 bg-gradient-to-br from-blue-50/50 to-background"
          whileHover={{ y: -4 }}
          onClick={onSelectWaterDamage}
        >
          <div className="flex flex-col h-full">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
              <Droplets className="w-7 h-7 text-blue-600" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-display text-lg font-semibold">
                Dégât des eaux
              </h3>
              <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                Sinistre
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-4 flex-grow">
              Votre projet fait suite à un <strong className="text-foreground">dégât des eaux</strong> 
              {" "}(fuite, infiltration, sinistre assurance).
            </p>
            <Button 
              variant="default"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Devis suite à un dégât des eaux
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
