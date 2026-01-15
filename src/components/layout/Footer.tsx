import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  navigation: [
    { label: "Accueil", path: "/" },
    { label: "À propos", path: "/a-propos" },
    { label: "Pourquoi nous", path: "/pourquoi-nous" },
    { label: "Réalisations", path: "/realisations" },
    { label: "Demande de devis", path: "/devis" },
  ],
  services: [
    "Création de douche à l'italienne",
    "Rénovation salle de bain",
    "Étanchéité garantie",
    "Pose de carrelage",
    "Installation receveur",
    "Parois sur mesure",
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-semibold mb-4">
              Atelier Douche Design
            </h3>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Artisan spécialisé dans la création et rénovation de douches à l'italienne haut de gamme. 
              Qualité, élégance et savoir-faire depuis plus de 15 ans.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Nos services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((service, index) => (
                <li key={index} className="text-primary-foreground/80">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:+33123456789" 
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="w-5 h-5 text-accent" />
                  01 23 45 67 89
                </a>
              </li>
              <li>
                <a 
                  href="mailto:gestion@qualiconcept.fr" 
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="w-5 h-5 text-accent" />
                  gestion@qualiconcept.fr
                </a>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span>6 rue d'Armaillé<br />75017 Paris</span>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/80">
                <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span>Lun - Ven : 8h - 18h<br />Sam : 9h - 12h</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© 2024 Atelier Douche Design. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link to="/mentions-legales" className="hover:text-primary-foreground transition-colors">
              Mentions légales
            </Link>
            <Link to="/politique-confidentialite" className="hover:text-primary-foreground transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
