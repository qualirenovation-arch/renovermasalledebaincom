import { useState } from "react";
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
  const location = useLocation();

  return (
    <>
      {/* Top Banner - Hidden on mobile for space */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2 px-4">
        <div className="container-custom flex justify-center md:justify-between items-center text-sm">
          <span className="hidden md:block">Spécialiste de la rénovation de votre salle de bain</span>
          <a 
            href="tel:+33659764685" 
            className="flex items-center gap-2 font-semibold hover:text-accent transition-colors"
          >
            <Phone className="w-4 h-4" />
            06 59 76 46 85
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 md:top-[40px] z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container-custom">
          <div className="flex items-center justify-between h-14 md:h-20">
            {/* Logo - Compact on mobile */}
            <Link to="/" className="flex items-center gap-2 md:gap-4">
              <img 
                src={qualirenovationLogo} 
                alt="QualiRénovation Logo" 
                className="h-10 md:h-16 w-auto"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-base md:text-2xl font-semibold text-navy">
                  renovermasalledebain<span className="hidden sm:inline">.com</span>
                </span>
                <span className="text-xs md:text-base font-medium text-gold-dark hidden sm:block">
                  by QualiRénovation
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1 ml-auto">
              {desktopNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
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
    </>
  );
}
