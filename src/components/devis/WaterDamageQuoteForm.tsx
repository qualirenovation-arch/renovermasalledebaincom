import { useState, useRef, useCallback } from "react";
import { useVirtualKeyboard } from "@/hooks/useVirtualKeyboard";
import { usePostalCodeValidation } from "@/hooks/usePostalCodeValidation";
import { useNavigate } from "react-router-dom";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";
import { 
  AlertTriangle, 
  Droplets, 
  Home, 
  FileText, 
  Building2,
  CheckCircle2,
  ArrowLeft,
  Loader2,
  Mail,
  CalendarCheck
} from "lucide-react";

// hCaptcha site key - use test key in preview/dev environments
const isPreviewOrDev = typeof window !== 'undefined' && (
  window.location.hostname.includes('lovable.app') || 
  window.location.hostname.includes('lovableproject.com') || 
  window.location.hostname === 'localhost'
);
const HCAPTCHA_SITE_KEY = isPreviewOrDev 
  ? "10000000-ffff-ffff-ffff-000000000001" 
  : "00684ab0-a304-443e-bce6-2abe6892f1fa";
const getEffectiveCaptchaToken = (token: string | null) => {
  if (isPreviewOrDev && token) return "test-token";
  return token;
};

const extractEdgeErrorMessage = async (err: unknown, fallback: string): Promise<string> => {
  if (err && typeof err === "object") {
    const maybeError = err as { message?: string; context?: Response };

    if (maybeError.context instanceof Response) {
      try {
        const json = await maybeError.context.clone().json() as { error?: string; message?: string };
        const backendMessage = json?.error || json?.message;
        if (backendMessage) return backendMessage;
      } catch {
        try {
          const text = await maybeError.context.clone().text();
          if (text) return text;
        } catch {
          // noop
        }
      }
    }

    if (maybeError.message && maybeError.message !== "Edge Function returned a non-2xx status code") {
      return maybeError.message;
    }
  }

  return fallback;
};

interface WaterDamageStep1Data {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  typeLogement: string;
  adresse: string;
  ville: string;
  codePostal: string;
  logementOccupe: string;
  insuranceDeclared: string;
  claimNumber: string;
  damageOrigin: string;
  damageNature: string;
  affectedRooms: string[];
  affectedRoomsOther: string;
}

const initialFormData: WaterDamageStep1Data = {
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  typeLogement: "",
  adresse: "",
  ville: "",
  codePostal: "",
  logementOccupe: "",
  insuranceDeclared: "",
  claimNumber: "",
  damageOrigin: "",
  damageNature: "",
  affectedRooms: [],
  affectedRoomsOther: "",
};

const insuranceOptions = [
  { value: "oui", label: "Oui" },
  { value: "non", label: "Non" },
  { value: "en_cours", label: "En cours de déclaration" },
];

const originOptions = [
  { value: "voisin_dessus", label: "Voisin du dessus" },
  { value: "voisin_mitoyen", label: "Voisin mitoyen" },
  { value: "parties_communes", label: "Parties communes" },
  { value: "installation_privative", label: "Installation privative (chez moi)" },
  { value: "origine_inconnue", label: "Origine inconnue / en cours d'expertise" },
];

const natureOptions = [
  { value: "alimentation_eau", label: "Alimentation en eau" },
  { value: "evacuation", label: "Évacuation" },
  { value: "infiltration_condensation", label: "Infiltration / condensation" },
  { value: "non_identifiee", label: "Non identifiée" },
];

const roomOptions = [
  { value: "salle_de_bain", label: "Salle de bain" },
  { value: "cuisine", label: "Cuisine" },
  { value: "wc", label: "WC" },
  { value: "chambre", label: "Chambre" },
  { value: "sejour", label: "Séjour" },
  { value: "couloir_entree", label: "Couloir / entrée" },
  { value: "autre", label: "Autre" },
];

interface Props {
  onBack: () => void;
}

export function WaterDamageQuoteForm({ onBack }: Props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<WaterDamageStep1Data>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const { toast } = useToast();
  useVirtualKeyboard();
  const { validation: postalValidation, validateDebounced: validatePostal } = usePostalCodeValidation();
  const onCaptchaVerify = useCallback((token: string) => setCaptchaToken(token), []);
  const onCaptchaExpire = useCallback(() => setCaptchaToken(null), []);
  const onCaptchaError = useCallback(() => {
    setCaptchaToken(null);
    toast({ title: "Erreur de vérification", description: "Le captcha a échoué. Veuillez réessayer.", variant: "destructive" });
  }, [toast]);

  const handleChange = (field: keyof WaterDamageStep1Data, value: string) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'codePostal' || field === 'ville') {
        validatePostal(next.codePostal, next.ville);
      }
      return next;
    });
  };

  const handleCheckboxChange = (field: keyof WaterDamageStep1Data, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      if (checked) {
        return { ...prev, [field]: [...currentArray, value] };
      }
      return { ...prev, [field]: currentArray.filter(item => item !== value) };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.prenom || !formData.nom || !formData.email || !formData.telephone || !formData.codePostal) {
      toast({ title: "Champs manquants", description: "Veuillez remplir tous les champs obligatoires.", variant: "destructive" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ title: "Email invalide", description: "Veuillez entrer une adresse email valide.", variant: "destructive" });
      return;
    }

    if (!postalValidation.isValid) {
      toast({ title: "Adresse incohérente", description: postalValidation.message || "Le code postal ne correspond pas à la ville.", variant: "destructive" });
      return;
    }

    if (!captchaToken) {
      toast({ title: "Vérification requise", description: "Veuillez compléter la vérification anti-spam.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { data, error } = await supabase.functions.invoke('send-water-damage-quote', {
        body: {
          captchaToken: getEffectiveCaptchaToken(captchaToken),
          formData,
        },
      });

      console.log("Edge function response:", { data, error: error?.message });

      if (error) {
        console.error("Edge function invocation error:", error);
        throw error;
      }

      if (!data?.success) {
        const backendMessage = (data as { error?: string } | null)?.error;
        console.error("Backend error:", backendMessage);
        throw new Error(backendMessage || "La demande n'a pas pu être traitée. Veuillez réessayer.");
      }

      toast({ title: "Demande enregistrée !", description: "Consultez votre boîte email pour la suite." });
      navigate(`/devis/confirmation?email=${encodeURIComponent(formData.email)}&type=degat_eaux`);
    } catch (err) {
      console.error("Submission error:", err);
      const errorMessage = await extractEdgeErrorMessage(err, "Impossible d'envoyer votre demande pour le moment.");
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
    }
  };

  // SectionCard moved outside component — see below

  return (
    <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
      {/* Back button */}
      <Button type="button" variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Choisir un autre type de devis
      </Button>

      {/* Client Info */}
      <SectionCard icon={FileText} title="Vos coordonnées" iconBg="bg-stone-100" iconColor="text-stone-600">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="wd-prenom">Prénom *</Label>
            <Input id="wd-prenom" value={formData.prenom} onChange={(e) => handleChange("prenom", e.target.value)} required autoComplete="off" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wd-nom">Nom *</Label>
            <Input id="wd-nom" value={formData.nom} onChange={(e) => handleChange("nom", e.target.value)} required autoComplete="off" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wd-email">Email *</Label>
            <Input id="wd-email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} required autoComplete="off" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wd-telephone">Téléphone *</Label>
            <Input id="wd-telephone" type="tel" value={formData.telephone} onChange={(e) => handleChange("telephone", e.target.value)} required autoComplete="off" />
          </div>
        </div>
      </SectionCard>

      {/* Property Info */}
      <SectionCard icon={Home} title="Le logement" iconBg="bg-amber-100" iconColor="text-amber-600">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Type de logement</Label>
            <RadioGroup value={formData.typeLogement} onValueChange={(value) => handleChange("typeLogement", value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="appartement" id="wd-appartement" />
                <Label htmlFor="wd-appartement" className="flex items-center gap-2 cursor-pointer"><Building2 className="w-4 h-4" /> Appartement</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="maison" id="wd-maison" />
                <Label htmlFor="wd-maison" className="flex items-center gap-2 cursor-pointer"><Home className="w-4 h-4" /> Maison</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wd-adresse">Adresse du chantier</Label>
            <AddressAutocomplete
              id="wd-adresse"
              value={formData.adresse}
              onChange={(value) => handleChange("adresse", value)}
              onAddressSelect={(address) => {
                if (address.city) handleChange("ville", address.city);
                if (address.postcode) handleChange("codePostal", address.postcode);
              }}
              placeholder="Commencez à taper votre adresse..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wd-ville">Ville</Label>
              <Input id="wd-ville" value={formData.ville} onChange={(e) => handleChange("ville", e.target.value)} autoComplete="off" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wd-codePostal">Code postal *</Label>
              <Input id="wd-codePostal" value={formData.codePostal} onChange={(e) => handleChange("codePostal", e.target.value)} required autoComplete="off" />
            </div>
          </div>
          {!postalValidation.isValid && postalValidation.message && (
            <div className="mt-3 p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-2">
              <svg className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm text-destructive">{postalValidation.message}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label>Logement occupé pendant les travaux ?</Label>
            <RadioGroup value={formData.logementOccupe} onValueChange={(value) => handleChange("logementOccupe", value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oui" id="wd-occupe-oui" />
                <Label htmlFor="wd-occupe-oui" className="cursor-pointer">Oui</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="non" id="wd-occupe-non" />
                <Label htmlFor="wd-occupe-non" className="cursor-pointer">Non</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </SectionCard>

      {/* Step 1 - Insurance */}
      <SectionCard icon={AlertTriangle} title="Étape 1 — Le sinistre" iconBg="bg-red-100" iconColor="text-red-600">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Le dégât des eaux est-il déclaré à l'assurance ?</Label>
            <RadioGroup value={formData.insuranceDeclared} onValueChange={(value) => handleChange("insuranceDeclared", value)} className="space-y-2">
              {insuranceOptions.map(opt => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.value} id={`wd-insurance-${opt.value}`} />
                  <Label htmlFor={`wd-insurance-${opt.value}`} className="cursor-pointer">{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="wd-claimNumber">Numéro de sinistre (si existant)</Label>
            <Input id="wd-claimNumber" value={formData.claimNumber} onChange={(e) => handleChange("claimNumber", e.target.value)} placeholder="Ex: SIN-2025-XXXXX" autoComplete="off" />
          </div>
        </div>
      </SectionCard>

      {/* Step 2 - Origin */}
      <SectionCard icon={Droplets} title="Étape 2 — Origine du dégât" iconBg="bg-blue-100" iconColor="text-blue-600">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Origine présumée</Label>
            <RadioGroup value={formData.damageOrigin} onValueChange={(value) => handleChange("damageOrigin", value)} className="space-y-2">
              {originOptions.map(opt => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.value} id={`wd-origin-${opt.value}`} />
                  <Label htmlFor={`wd-origin-${opt.value}`} className="cursor-pointer">{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>Nature de la fuite</Label>
            <RadioGroup value={formData.damageNature} onValueChange={(value) => handleChange("damageNature", value)} className="space-y-2">
              {natureOptions.map(opt => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.value} id={`wd-nature-${opt.value}`} />
                  <Label htmlFor={`wd-nature-${opt.value}`} className="cursor-pointer">{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </SectionCard>

      {/* Step 3 - Rooms */}
      <SectionCard icon={Home} title="Étape 3 — Pièces concernées" iconBg="bg-purple-100" iconColor="text-purple-600">
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {roomOptions.map(opt => (
              <div
                key={opt.value}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  formData.affectedRooms.includes(opt.value)
                    ? 'border-foreground bg-foreground/5'
                    : 'border-border hover:border-foreground/30'
                }`}
                onClick={() => handleCheckboxChange("affectedRooms", opt.value, !formData.affectedRooms.includes(opt.value))}
              >
                <Checkbox checked={formData.affectedRooms.includes(opt.value)} className="pointer-events-none" />
                <span className="text-sm font-medium">{opt.label}</span>
              </div>
            ))}
          </div>
          {formData.affectedRooms.includes("autre") && (
            <Input
              value={formData.affectedRoomsOther}
              onChange={(e) => handleChange("affectedRoomsOther", e.target.value)}
              placeholder="Précisez les autres pièces..."
            />
          )}
        </div>
      </SectionCard>

      {/* Important notice */}
      <div className="bg-accent/30 rounded-xl p-5 border border-border/50">
        <div className="flex items-start gap-3">
          <CalendarCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Après envoi, vous recevrez un email avec un lien pour compléter votre dossier 
            (travaux souhaités, documents, photos). Vous pourrez aussi demander un rappel ou 
            planifier un échange téléphonique.
          </p>
        </div>
      </div>

      {/* hCaptcha */}
      <div className="card-elevated p-6 flex flex-col items-center">
        <p className="text-sm text-muted-foreground mb-4 text-center">Vérification anti-spam requise</p>
        <HCaptcha
          ref={captchaRef}
          sitekey={HCAPTCHA_SITE_KEY}
          onVerify={onCaptchaVerify}
          onExpire={onCaptchaExpire}
          onError={onCaptchaError}
        />
        {captchaToken && (
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
            Vérification réussie
          </p>
        )}
      </div>

      {/* Persistent error message */}
      {submitError && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <p className="font-semibold text-destructive text-sm">Échec de l'envoi</p>
            <p className="text-sm text-destructive/80 mt-1">{submitError}</p>
          </div>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full bg-[hsl(38,50%,50%)] hover:bg-[hsl(38,50%,45%)] text-white rounded-xl py-6 text-lg"
        disabled={isSubmitting || !captchaToken}
      >
        <CalendarCheck className="w-5 h-5 mr-2" />
        {isSubmitting ? "Envoi en cours..." : "Recevoir la suite de mon estimation"}
      </Button>
    </form>
  );
}
