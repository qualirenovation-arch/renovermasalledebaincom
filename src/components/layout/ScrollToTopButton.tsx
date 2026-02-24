import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed right-4 z-50 w-11 h-11 rounded-xl bg-background/90 backdrop-blur-md text-foreground shadow-[0_4px_20px_-4px_hsl(0_0%_0%/0.15)] flex items-center justify-center hover:shadow-[0_6px_24px_-4px_hsl(0_0%_0%/0.2)] active:scale-95 transition-all border-2 border-accent/30 hover:border-accent/60 md:bottom-8 md:right-8"
          style={{ bottom: 'calc(7rem + env(safe-area-inset-bottom, 0px))' }}
          aria-label="Retour en haut"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
