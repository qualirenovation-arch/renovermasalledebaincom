import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import houzzLogo from "@/assets/logos/houzz-logo.png";
import RMSBTextLogo from "@/components/brand/RMSBTextLogo";

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
  services: [
    { label: "Création de douche à l'italienne", path: "/guide-travaux#section-7" },
    { label: "Rénovation salle de bain", path: "/guide-travaux" },
    { label: "Étanchéité garantie", path: "/guide-travaux#section-6" },
    { label: "Pose de carrelage", path: "/guide-travaux#section-8" },
    { label: "Installation receveur", path: "/guide-travaux#section-7" },
    { label: "Parois sur mesure", path: "/guide-travaux#section-9" }
  ]
};
export function Footer() {
  return <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[25%_20%_30%_25%] gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center lg:items-start justify-center">
            <Link to="/" className="inline-block mb-4">
              <RMSBTextLogo size="md" variant="light" className="w-[280px] h-auto" />
            </Link>
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
                <img src={houzzLogo} alt="Houzz" className="w-5 h-5 object-contain" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-[16px] font-semibold mb-3">Navigation</h4>
            <ul className="space-y-1.5">
              {footerLinks.navigation.map(link => <li key={link.path}>
                  <Link to={link.path} className="text-[14px] text-primary-foreground/80 hover:text-primary-foreground transition-colors font-sans">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-[16px] font-semibold mb-3">Nos services</h4>
            <ul className="space-y-1.5">
              {footerLinks.services.map((service, index) => <li key={index}>
                  <Link to={service.path} className="text-[14px] text-primary-foreground/80 hover:text-primary-foreground transition-colors font-sans">
                    {service.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-[16px] font-semibold mb-3">Contact</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="tel:+33659764685" className="flex items-center gap-2 text-[14px] text-primary-foreground/80 hover:text-primary-foreground transition-colors font-sans">
                  <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                  06 59 76 46 85
                </a>
              </li>
              <li>
                <a href="mailto:gestion@qualiconcept.fr" className="flex items-center gap-2 text-[14px] text-primary-foreground/80 hover:text-primary-foreground transition-colors font-sans">
                  <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                  gestion@qualiconcept.fr
                </a>
              </li>
              <li className="flex items-start gap-2 text-[14px] text-primary-foreground/80 font-sans">
                <Clock className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>Lun - Ven : 8h - 18h<br />Sam : 9h - 12h</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <div className="flex items-center gap-4">
            <RMSBTextLogo size="md" variant="light" className="w-[260px] h-auto" />
            <div className="text-center md:text-left">
              <p>6 rue d'Armaillé, 75017 Paris — © 2024 Tous droits réservés.</p>
              <p className="mt-1 text-xs">Site édité par Qualirenovation by Qualiconcept</p>
            </div>
          </div>
          <div className="flex gap-5 text-sm">
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