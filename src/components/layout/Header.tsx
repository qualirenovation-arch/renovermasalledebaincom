import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import qualirenovationLogo from "@/assets/logos/qualirenovation-logo-new.png";

// Navigation simplifiée pour mobile (max 5 entrées)
const mobileNavItems = [
  { label: "Accueil", path: "/" },
  { label: "Réalisations", path: "/realisations" },
  { label: "Guide travaux", path: "/guide-travaux" },
  { label: "À propos", path: "/a-propos" },
  { label: "Avis", path: "/presse#parutions" },
];

// Navigation desktop complète
const desktopNavItems = [
  { label: "Accueil", path: "/" },
  { label: "À propos", path: "/a-propos" },
  { label: "Pourquoi nous", path: "/pourquoi-nous" },
  { label: "Réalisations", path: "/realisations" },
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
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-[0_4px_20px_-4px_hsl(0_0%_0%/0.1)]" : ""}`}>
      {/* Top Banner - Hidden on mobile and when scrolled */}
      <div 
        className={`hidden md:block bg-primary text-primary-foreground px-4 transition-all duration-300 ${
          isScrolled ? "h-0 py-0 overflow-hidden opacity-0" : "py-2.5 opacity-100"
        }`}
      >
        <div className="container-custom flex justify-center md:justify-between items-center text-sm">
          <span className="hidden md:block font-medium tracking-wide">Spécialiste de la rénovation de votre salle de bain</span>
          <a 
            href="tel:+33659764685" 
            className="flex items-center gap-2 font-bold hover:text-gold transition-colors"
          >
            <Phone className="w-4 h-4" />
            06 59 76 46 85
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-background/98 backdrop-blur-xl border-b border-border/50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - Compact on mobile */}
            <Link to="/" className="flex items-center gap-3 md:gap-4 group">
              <img 
                src={qualirenovationLogo} 
                alt="QualiRénovation Logo" 
                className="h-11 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-base md:text-xl font-bold text-navy tracking-tight">
                  RenoverMaSalleDeBain<span className="hidden sm:inline">.com</span>
                </span>
                <span className="text-xs md:text-sm font-semibold text-gold-dark hidden sm:block">
                  by Qualiconcept
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1 ml-auto">
              {desktopNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
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
            <div className="hidden xl:flex items-center ml-4">
              <Button variant="cta" size="lg" asChild>
                <Link to="/devis#devis-form">Devis gratuit</Link>
              </Button>
            </div>

            {/* Mobile: CTA + Menu burger */}
            <div className="xl:hidden flex items-center gap-2">
              {/* CTA visible hors burger sur mobile */}
              <Button variant="cta" size="sm" asChild className="text-xs px-3 py-2">
                <Link to="/devis#devis-form">Devis</Link>
              </Button>
              
              <button
                className="p-2 text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Simplified */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden bg-background border-t border-border overflow-hidden"
            >
              <nav className="container-custom py-3 flex flex-col gap-1">
                {mobileNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${
                      location.pathname === item.path
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                {/* Quick access phone on mobile menu */}
                <a 
                  href="tel:+33659764685"
                  className="flex items-center justify-center gap-3 px-4 py-4 text-lg font-semibold text-primary hover:bg-secondary rounded-lg mt-2 border-t border-border pt-5"
                >
                  <Phone className="w-6 h-6" />
                  06 59 76 46 85
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
