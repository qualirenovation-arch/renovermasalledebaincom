import { Link } from "react-router-dom";
import { Phone, Mail, Clock, MessageCircle, Instagram, Linkedin } from "lucide-react";
import houzzLogo from "@/assets/logos/houzz-logo.png";
import logoNeg from "@/assets/logos/logo-renover-neg.svg";

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
    label: "QualiRénovation",
    path: "/qualirenovation"
  }, {
    label: "Devenir partenaire",
    path: "/partenaires/contact"
  }],
  services: [
    { label: "Création de douche à l'italienne", path: "/guide-travaux#questions-frequentes" },
    { label: "Rénovation salle de bain", path: "/renovation-salle-de-bain-paris" },
    { label: "Étanchéité garantie", path: "/guide-travaux#section-6" },
    { label: "Pose de carrelage", path: "/faq#pose-carrelage" },
    { label: "Installation receveur", path: "/guide-travaux#section-7" },
    { label: "Parois sur mesure", path: "/guide-travaux#section-paroi" }
  ]
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pb-24 md:pb-0">
      <div className="container-custom py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[25%_20%_30%_25%] gap-6">
          {/* Brand - hidden on mobile, shown on lg */}
          <div className="hidden lg:flex flex-col items-start justify-center">
            <Link to="/" className="inline-block mb-4">
              <img src={logoNeg} alt="RénoverMaSalleDeBain.com" className="w-[260px] h-auto" />
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

          {/* Mobile: Navigation + Services in 2 columns */}
          <div className="grid grid-cols-2 gap-4 lg:hidden">
            <div>
              <h4 className="font-display text-[15px] font-light mb-2">Navigation</h4>
              <ul className="space-y-1">
                {footerLinks.navigation.map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-[13px] text-primary-foreground/80 hover:text-primary-foreground transition-colors font-sans">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-[15px] font-light mb-2">Nos services</h4>
              <ul className="space-y-1">
                {footerLinks.services.map((service, index) => (
                  <li key={index}>
                    <Link to={service.path} className="text-[13px] text-primary-foreground/80 hover:text-primary-foreground transition-colors font-sans">
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Desktop: Navigation */}
          <div className="hidden lg:block">
            <h4 className="font-display text-[16px] font-light mb-3">Navigation</h4>
            <ul className="space-y-1.5">
              {footerLinks.navigation.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-[14px] text-primary-foreground/80 hover:text-primary-foreground transition-colors font-sans">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop: Services */}
          <div className="hidden lg:block">
            <h4 className="font-display text-[16px] font-light mb-3">Nos services</h4>
            <ul className="space-y-1.5">
              {footerLinks.services.map((service, index) => (
                <li key={index}>
                  <Link to={service.path} className="text-[14px] text-primary-foreground/80 hover:text-primary-foreground transition-colors font-sans">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-[15px] lg:text-[16px] font-light mb-2 lg:mb-3">Contact</h4>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <a href="tel:+33659764685" className="flex items-center gap-3 text-[13px] lg:text-[14px] text-primary-foreground/80 hover:text-primary-foreground transition-colors font-sans">
                  <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg bg-white border border-white/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary" strokeWidth={1.5} />
                  </div>
                  06 59 76 46 85
                </a>
              </li>
              <li>
                <a href="mailto:gestion@qualiconcept.fr" className="flex items-center gap-3 text-[13px] lg:text-[14px] text-primary-foreground/80 hover:text-primary-foreground transition-colors font-sans">
                  <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg bg-white border border-white/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary" strokeWidth={1.5} />
                  </div>
                  gestion@qualiconcept.fr
                </a>
              </li>
              <li className="flex items-center gap-3 text-[13px] lg:text-[14px] text-primary-foreground/80 font-sans">
                <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg bg-white border border-white/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary" strokeWidth={1.5} />
                </div>
                <span>Lun - Ven : 8h - 18h<br />Sam : 9h - 12h</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile social icons */}
        <div className="flex justify-center gap-3 mt-6 lg:hidden">
          <a href="https://wa.me/33659764685" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center" aria-label="WhatsApp">
            <MessageCircle className="w-4 h-4 text-white" />
          </a>
          <a href="https://www.instagram.com/qualirenovation__travaux/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center" aria-label="Instagram">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/carina-nahmani-b30619167/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center" aria-label="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="https://www.houzz.fr/pro/qualirenovation/qualirenovation-by-qualiconcept" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center" aria-label="Houzz">
            <img src={houzzLogo} alt="Houzz" className="w-4 h-4 object-contain" />
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-4 md:py-5">
          {/* Mobile bottom bar */}
          <div className="flex flex-col items-center gap-2 text-center md:hidden pb-16">
            <img src={logoNeg} alt="RénoverMaSalleDeBain.com" className="w-[160px] h-auto" />
            <p className="text-[11px] text-primary-foreground/60 leading-tight">
              6 rue d'Armaillé, 75017 Paris<br />© 2024 Tous droits réservés.
            </p>
            <div className="flex gap-3 text-[11px] text-primary-foreground/60">
              <Link to="/mentions-legales" className="hover:text-primary-foreground transition-colors">
                Mentions légales
              </Link>
              <Link to="/politique-confidentialite" className="hover:text-primary-foreground transition-colors">
                Confidentialité
              </Link>
            </div>
          </div>

          {/* Desktop bottom bar */}
          <div className="hidden md:flex flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <div className="flex items-center gap-4">
              <img src={logoNeg} alt="RénoverMaSalleDeBain.com" className="w-[240px] h-auto" />
              <div className="text-left">
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
      </div>
    </footer>
  );
}
