import { Phone, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export function MobileStickyNav() {
  const location = useLocation();
  
  // Ne pas afficher sur la page devis (déjà un CTA)
  if (location.pathname === "/devis") {
    return null;
  }

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border shadow-lg"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
    >
      <div className="flex items-center justify-center gap-3 px-4 py-3">
        <a
          href="tel:+33659764685"
          className="flex-1 flex items-center justify-center gap-2 bg-foreground text-background py-3 px-4 rounded-xl font-medium text-sm transition-all hover:opacity-90 active:scale-95"
        >
          <Phone className="w-4 h-4" />
          Appeler
        </a>
        <Link
          to="/devis"
          className="flex-1 flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white py-3 px-4 rounded-xl font-medium text-sm transition-all active:scale-95"
        >
          <Mail className="w-4 h-4" />
          Devis gratuit
        </Link>
      </div>
    </motion.div>
  );
}
