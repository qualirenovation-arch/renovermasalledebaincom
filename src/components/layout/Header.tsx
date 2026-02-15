import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

import logoCircle from "@/assets/logo-rmsb-circle.png";
import RMSBTextLogo from "@/components/brand/RMSBTextLogo";

// Navigation simplifiée pour mobile (max 5 entrées)
const mobileNavItems = [
  { label: "Accueil", path: "/" },
  { label: "Réalisations", path: "/realisations" },
  { label: "Guide travaux", path: "/guide-travaux" },
  { label: "À propos", path: "/a-propos" },
  { label: "Avis", path: "/avis" },
];

// Navigation desktop complète
const desktopNavItems = [
  { label: "Accueil", path: "/" },
  { label: "À propos", path: "/a-propos" },
  { label: "Pourquoi nous", path: "/pourquoi-nous" },
  { label: "Réalisations", path: "/realisations" },
  { label: "Avis", path: "/avis" },
  { label: "Presse", path: "/presse#parutions" },
  { label: "Guide travaux", path: "/guide-travaux" },
  { label: "Dégâts des eaux", path: "/degats-eaux" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 bg-background/98 backdrop-blur-xl border-b ${
        isScrolled 
          ? "shadow-[0_4px_20px_-4px_hsl(0_0%_0%/0.1)] border-border/50" 
          : "border-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <RMSBTextLogo size="lg" variant="dark" className="h-[6.5rem] w-auto -ml-4 md:-ml-8" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 ml-8">
            {desktopNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden xl:flex items-center ml-6">
            <Button variant="cta" size="lg" asChild>
              <Link to="/devis#devis-form">Devis gratuit</Link>
            </Button>
          </div>

          {/* Mobile: CTA + Menu burger */}
          <div className="xl:hidden flex items-center gap-3">
            <Button variant="cta" size="sm" asChild className="text-xs px-4 py-2">
              <Link to="/devis#devis-form">Devis</Link>
            </Button>
            
            <button
              className="p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="xl:hidden bg-background border-t border-border overflow-hidden"
          >
            <nav className="container-custom py-4 flex flex-col gap-1">
              {mobileNavItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                      location.pathname === item.path
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              {/* Phone CTA in mobile menu */}
              <motion.a 
                href="tel:+33659764685"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-3 px-4 py-4 text-lg font-semibold text-primary hover:bg-secondary rounded-lg mt-3 border-t border-border pt-5"
              >
                <Phone className="w-5 h-5" />
                06 59 76 46 85
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
