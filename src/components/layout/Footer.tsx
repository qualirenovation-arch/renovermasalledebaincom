import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import RMSBLogo from "@/components/brand/RMSBLogo";

const footerLinks = {
  navigation: [{
    label: "Accueil",
    path: "/"
  }, {
    label: "À propos",
    path: "/a-propos"
  }, {
    label: "Pourquoi nous",
    path: "/pourquoi-nous"
  }, {
    label: "Réalisations",
    path: "/realisations"
  }, {
    label: "Demande de devis",
    path: "/devis#devis-form"
  }, {
    label: "Partenaires",
    path: "/partenaires"
  }, {
    label: "FAQ",
    path: "/faq"
  }, {
    label: "Presse",
    path: "/presse#parutions"
  }, {
    label: "Devenir partenaire",
    path: "/partenaires/contact"
  }],
  services: ["Création de douche à l'italienne", "Rénovation salle de bain", "Étanchéité garantie", "Pose de carrelage", "Installation receveur", "Parois sur mesure"]
};
export function Footer() {
  return <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-3">
              <img 
                src="/images/logos/qualirenovation-logo-new.png" 
                alt="QualiRénovation by QualiConcept" 
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-primary-foreground/80 mb-2 leading-relaxed">
              <strong>6 rue d'Armaillé, 75017 Paris</strong>
            </p>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Spécialiste de la rénovation de salle de bain et douche à l'italienne à Paris et en Île-de-France.
            </p>
            <div className="flex gap-3">
              <a href="https://wa.me/33659764685" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#20BD5A] transition-colors" aria-label="WhatsApp">
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.instagram.com/qualirenovation__travaux/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/carina-nahmani-b30619167/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.houzz.fr/pro/qualirenovation/qualirenovation-by-qualiconcept" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="Houzz">
                <img src="/images/logos/houzz-best-of-2026-photo-award.png" alt="Houzz" className="w-5 h-5 object-contain" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-base font-semibold mb-3">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map(link => <li key={link.path}>
                  <Link to={link.path} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-base font-semibold mb-3">Nos services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((service, index) => <li key={index} className="text-primary-foreground/80">
                  {service}
                </li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base font-semibold mb-3">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+33659764685" className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Phone className="w-5 h-5 text-accent" />
                  06 59 76 46 85
                </a>
              </li>
              <li>
                <a href="mailto:gestion@qualiconcept.fr" className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
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
          <div className="flex items-center gap-4">
            <RMSBLogo size="sm" variant="light" />
            <div className="text-center md:text-left">
              <p className="font-semibold text-base">renovermasalledebain.com — Un chantier heureux</p>
              <p className="mt-1">6 rue d'Armaillé, 75017 Paris — © 2024 Tous droits réservés.</p>
              <p className="mt-1 text-xs">Site édité par la société Qualirenovation by Qualiconcept</p>
            </div>
          </div>
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
    </footer>;
}