import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

import logoSvg from "@/assets/logos/logo-renover.svg";

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
  { label: "QualiRénovation", path: "/qualirenovation" },
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
      className={`sticky top-0 z-50 transition-all duration-300 bg-background backdrop-blur-none border-b ${
        isScrolled 
          ? "shadow-[0_4px_20px_-4px_hsl(0_0%_0%/0.1)] border-border/50" 
          : "border-transparent"
      }`}
    >
      <div className="container-custom">
        {/* Mobile layout */}
        <div className="flex lg:hidden items-center h-16 sm:h-20 px-1 gap-1">
          <button
            className="p-2 sm:p-3 text-foreground hover:bg-secondary rounded-lg transition-colors flex-shrink-0 z-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7" />}
          </button>
          
          <Link to="/" className="flex items-center flex-1 min-w-0 overflow-hidden">
            <img src={logoSvg} alt="RénoverMaSalleDeBain.com" className="h-12 sm:h-16 w-auto max-w-[50vw] sm:max-w-[55vw] object-contain object-left" />
          </Link>
          
          <Button variant="outline" size="icon" asChild className="flex-shrink-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full w-8 h-8 sm:w-9 sm:h-9">
            <Link to="/devis?type=degat_eaux#devis-form" aria-label="Urgence dégât des eaux">
              <Droplets className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </Button>
          <Button variant="cta" size="default" asChild className="text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 flex-shrink-0 font-semibold shadow-md whitespace-nowrap">
            <Link to="/devis?type=classique#devis-form">Mon étude</Link>
          </Button>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:flex items-center h-24">
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <img src={logoSvg} alt="RénoverMaSalleDeBain.com" className="h-16 xl:h-20 w-auto -ml-4" />
          </Link>

          <nav className="flex items-center gap-0 lg:gap-0.5 ml-2 lg:ml-4">
            {desktopNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2 lg:px-3 py-2 lg:py-2.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center ml-auto gap-2 flex-shrink-0">
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors hidden lg:inline-flex text-xs px-3 py-1.5"
            >
              <Link to="/devis?type=degat_eaux#devis-form">
                <Droplets className="w-3.5 h-3.5 mr-1" />
                Urgence dégât des eaux
              </Link>
            </Button>
            <Button variant="cta" size="sm" asChild className="whitespace-nowrap">
              <Link to="/devis#devis-form">Mon étude</Link>
            </Button>
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
            className="lg:hidden bg-background border-t border-border overflow-hidden"
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

              {/* CTA Urgence dégât des eaux in mobile menu */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: mobileNavItems.length * 0.05 }}
              >
                <Link
                  to="/devis?type=degat_eaux#devis-form"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors border border-primary mt-2"
                >
                  <Droplets className="w-4 h-4" />
                  Urgence dégât des eaux
                </Link>
              </motion.div>
              
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
