import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "À propos", path: "/a-propos" },
  { label: "Pourquoi nous", path: "/pourquoi-nous" },
  { label: "Réalisations", path: "/realisations" },
  { label: "Demande de devis", path: "/devis" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container-custom flex justify-center md:justify-between items-center text-sm">
          <span className="hidden md:block">Artisan spécialiste de la douche à l'italienne</span>
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
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="font-display text-xl md:text-2xl font-semibold text-primary">
                renovermasalledebain.com
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
            <div className="hidden lg:block">
              <Button variant="cta" size="lg" asChild>
                <Link to="/devis">Devis gratuit</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background border-t border-border overflow-hidden"
            >
              <nav className="container-custom py-4 flex flex-col gap-2">
                {navItems.map((item) => (
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
                <Button variant="cta" size="lg" className="mt-2" asChild>
                  <Link to="/devis" onClick={() => setIsMenuOpen(false)}>
                    Devis gratuit
                  </Link>
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
