import { Phone, Calendar } from "lucide-react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CAL_BOOKING_URL = "https://cal.com/votre-conseiller-travaux-siw706/30min";

export function MobileStickyNav() {
  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});
  
  // Ne pas afficher sur la page devis (déjà un CTA)
  if (location.pathname === "/devis") {
    return null;
  }

  const validateAndRedirect = () => {
    const newErrors: { email?: string; phone?: string } = {};
    
    if (!email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email invalide";
    }
    
    if (!phone.trim()) {
      newErrors.phone = "Le téléphone est requis";
    } else if (!/^[\d\s+.-]{10,}$/.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = "Numéro invalide";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Redirect to Cal.com with prefilled info
    const calUrl = `${CAL_BOOKING_URL}?email=${encodeURIComponent(email)}&name=${encodeURIComponent(phone)}`;
    window.open(calUrl, '_blank', 'noopener,noreferrer');
    setIsDialogOpen(false);
    setEmail("");
    setPhone("");
    setErrors({});
  };

  return (
    <>
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border shadow-lg"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <div className="flex items-center justify-center gap-3 px-4 pt-3 pb-2">
          <a
            href="tel:+33659764685"
            className="flex-1 flex items-center justify-center gap-2 bg-foreground text-background py-3 px-4 rounded-xl font-medium text-sm transition-all hover:opacity-90 active:scale-95"
          >
            <Phone className="w-4 h-4" />
            Appeler
          </a>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white py-3 px-4 rounded-xl font-medium text-sm transition-all active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            Parler de mon projet
          </button>
        </div>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Réserver un créneau</DialogTitle>
            <DialogDescription>
              Renseignez vos coordonnées pour prendre rendez-vous avec notre conseiller.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="booking-email">Email *</Label>
              <Input
                id="booking-email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-destructive text-sm">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-phone">Téléphone *</Label>
              <Input
                id="booking-phone"
                type="tel"
                placeholder="06 12 34 56 78"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-destructive text-sm">{errors.phone}</p>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
              Annuler
            </Button>
            <Button onClick={validateAndRedirect} className="flex-1 bg-cta hover:bg-cta-hover">
              <Calendar className="w-4 h-4 mr-2" />
              Continuer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
