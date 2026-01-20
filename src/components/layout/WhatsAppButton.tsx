import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/33659764685"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 bg-[#25D366] text-white rounded-full flex items-center justify-center md:gap-3 w-12 h-12 md:w-auto md:h-auto md:px-5 md:py-3 shadow-lg hover:shadow-xl transition-shadow"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Nous contacter sur WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden md:inline font-medium text-sm">Parlons de votre projet</span>
    </motion.a>
  );
}
