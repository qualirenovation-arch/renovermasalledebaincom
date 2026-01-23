import { Phone, Calendar } from "lucide-react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const CAL_BOOKING_URL = "https://cal.com/votre-conseiller-travaux-siw706/30min";

export function MobileStickyNav() {
  const location = useLocation();
  
  // Ne pas afficher sur la page devis (déjà un CTA)
  if (location.pathname === "/devis") {
    return null;
  }

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border shadow-lg"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
    >
      <div className="flex items-center justify-center gap-3 px-4 pt-3 pb-2">
        <a
          href="tel:+33659764685"
          className="flex-1 flex items-center justify-center gap-2 bg-foreground text-background py-3 px-4 rounded-xl font-medium text-sm transition-all hover:opacity-90 active:scale-95"
        >
          <Phone className="w-4 h-4" />
          Appeler
        </a>
        <a
          href={CAL_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white py-3 px-4 rounded-xl font-medium text-sm transition-all active:scale-95"
        >
          <Calendar className="w-4 h-4" />
          Réserver un créneau
        </a>
      </div>
    </motion.div>
  );
}
