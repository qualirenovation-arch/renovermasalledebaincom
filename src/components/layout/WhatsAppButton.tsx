import { MessageCircle, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppButton() {
  return (
    <>
      {/* Desktop version - Réserver un créneau (Cal.com) */}
      <motion.a
        href="https://cal.com/votre-conseiller-travaux-siw706/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-16 right-6 z-40 bg-primary text-white rounded-full items-center justify-center gap-3 px-5 py-3 shadow-lg hover:shadow-xl transition-shadow"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Réserver un créneau téléphonique"
      >
        <Calendar className="w-6 h-6" />
        <span className="font-medium text-sm">Réserver votre créneau</span>
      </motion.a>

    </>
  );
}
