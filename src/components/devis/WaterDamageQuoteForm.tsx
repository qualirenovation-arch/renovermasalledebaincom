import { useState, useRef, useCallback } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";
import { 
  Upload, 
  AlertTriangle, 
  Droplets, 
  Home, 
  Wrench, 
  FileText, 
  MessageSquare,
  Building2,
  X,
  CheckCircle2,
  ArrowLeft,
  Loader2
} from "lucide-react";

// hCaptcha site key
const HCAPTCHA_SITE_KEY = "00684ab0-a304-443e-bce6-2abe6892f1fa";

interface WaterDamageFormData {
  // Client info
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  // Property info
  typeLogement: string;
  adresse: string;
  ville: string;
  codePostal: string;
  logementOccupe: string;
  // Step 1 - Insurance
  insuranceDeclared: string;
  claimNumber: string;
  // Step 2 - Origin
  damageOrigin: string;
  damageNature: string;
  // Step 3 - Rooms
  affectedRooms: string[];
  affectedRoomsOther: string;
  // Step 4 - Works
  requiredWorks: string[];
  requiredWorksOther: string;
  // Step 5 - Scope
  renovationScope: string;
  // Step 7 - Message
  message: string;
}

const initialFormData: WaterDamageFormData = {
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
  requiredWorks: [],
  requiredWorksOther: "",
  renovationScope: "",
  message: "",
};

// Options
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

const worksOptions = [
  { value: "peinture", label: "Remise en état peinture" },
  { value: "parquet_sol", label: "Remise en état parquet / sol" },
  { value: "carrelage", label: "Carrelage" },
  { value: "salle_de_bain", label: "Salle de bain" },
  { value: "cuisine", label: "Cuisine" },
  { value: "wc", label: "WC" },
  { value: "mobilier_rangements", label: "Mobilier / rangements" },
  { value: "autre", label: "Autre" },
];

const scopeOptions = [
  { value: "remise_en_etat", label: "Remise en état uniquement", description: "Réparation des dégâts" },
  { value: "renovation_partielle", label: "Rénovation partielle", description: "Amélioration ciblée" },
  { value: "renovation_complete", label: "Rénovation complète", description: "Transformation totale" },
];

interface Props {
  onBack: () => void;
}

export function WaterDamageQuoteForm({ onBack }: Props) {
  const [formData, setFormData] = useState<WaterDamageFormData>(initialFormData);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const { toast } = useToast();

  const onCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
  }, []);

  const onCaptchaExpire = useCallback(() => {
    setCaptchaToken(null);
  }, []);

  const onCaptchaError = useCallback(() => {
    setCaptchaToken(null);
    toast({
      title: "Erreur de vérification",
      description: "Le captcha a échoué. Veuillez réessayer.",
      variant: "destructive",
    });
  }, [toast]);

  const handleChange = (field: keyof WaterDamageFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: keyof WaterDamageFormData, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      if (checked) {
        return { ...prev, [field]: [...currentArray, value] };
      } else {
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file => {
        const isValid = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(file.type);
        const isUnderLimit = file.size <= 10 * 1024 * 1024;
        return isValid && isUnderLimit;
      });
      setUploadedFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.prenom || !formData.nom || !formData.email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires (prénom, nom, email).",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return;
    }

    if (!captchaToken) {
      toast({
        title: "Vérification requise",
        description: "Veuillez compléter la vérification anti-spam.",
        variant: "destructive",
      });
      return;
    }

    // Documents are recommended but not strictly required
    if (uploadedFiles.length === 0) {
      const proceed = window.confirm(
        "Aucun document n'a été ajouté. Les photos des dégâts facilitent grandement le traitement de votre demande. Voulez-vous continuer sans documents ?"
      );
      if (!proceed) return;
    }

    setIsSubmitting(true);

    try {
      // Upload files first
      const documentPaths: string[] = [];
      
      for (const file of uploadedFiles) {
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filePath = `${timestamp}_${safeName}`;
        
        const { data, error } = await supabase.storage
          .from('water-damage-documents')
          .upload(filePath, file);
        
        if (error) {
          console.error('Upload error:', error);
        } else if (data) {
          documentPaths.push(data.path);
        }
      }

      // Send to edge function
      const { data, error } = await supabase.functions.invoke('send-water-damage-quote', {
        body: {
          captchaToken,
          formData: {
            ...formData,
            documentPaths,
          },
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Demande envoyée !",
        description: "Nous vous recontacterons sous 24h.",
      });
    } catch (err) {
      console.error("Submission error:", err);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        className="max-w-2xl mx-auto text-center py-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
          Demande envoyée avec succès !
        </h2>
        <p className="text-muted-foreground mb-6">
          Nous avons bien reçu votre demande concernant votre dégât des eaux. 
          Un membre de notre équipe vous contactera sous <strong>24h</strong> pour étudier votre dossier.
        </p>
        <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
          <p className="text-sm text-blue-800">
            <strong>💡 Conseil :</strong> Conservez tous les documents liés à votre sinistre 
            (photos, constat amiable, rapports d'expertise) pour faciliter le traitement de votre dossier.
          </p>
        </div>
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
      </motion.div>
    );
  }

  const SectionCard = ({ icon: Icon, title, children, iconBg = "bg-blue-100", iconColor = "text-blue-600" }: {
    icon: any;
    title: string;
    children: React.ReactNode;
    iconBg?: string;
    iconColor?: string;
  }) => (
    <div className="card-elevated p-5 md:p-6">
      <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back button */}
      <Button type="button" variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Choisir un autre type de devis
      </Button>

      {/* Client Info */}
      <SectionCard icon={FileText} title="Vos coordonnées" iconBg="bg-stone-100" iconColor="text-stone-600">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="prenom">Prénom *</Label>
            <Input
              id="prenom"
              value={formData.prenom}
              onChange={(e) => handleChange("prenom", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nom">Nom *</Label>
            <Input
              id="nom"
              value={formData.nom}
              onChange={(e) => handleChange("nom", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telephone">Téléphone</Label>
            <Input
              id="telephone"
              type="tel"
              value={formData.telephone}
              onChange={(e) => handleChange("telephone", e.target.value)}
            />
          </div>
        </div>
      </SectionCard>

      {/* Property Info */}
      <SectionCard icon={Home} title="Le logement" iconBg="bg-amber-100" iconColor="text-amber-600">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Type de logement</Label>
            <RadioGroup
              value={formData.typeLogement}
              onValueChange={(value) => handleChange("typeLogement", value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="appartement" id="appartement" />
                <Label htmlFor="appartement" className="flex items-center gap-2 cursor-pointer">
                  <Building2 className="w-4 h-4" /> Appartement
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="maison" id="maison" />
                <Label htmlFor="maison" className="flex items-center gap-2 cursor-pointer">
                  <Home className="w-4 h-4" /> Maison
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adresse">Adresse du chantier</Label>
            <AddressAutocomplete
              id="adresse"
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
              <Label htmlFor="ville">Ville</Label>
              <Input
                id="ville"
                value={formData.ville}
                onChange={(e) => handleChange("ville", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codePostal">Code postal</Label>
              <Input
                id="codePostal"
                value={formData.codePostal}
                onChange={(e) => handleChange("codePostal", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Logement occupé pendant les travaux ?</Label>
            <RadioGroup
              value={formData.logementOccupe}
              onValueChange={(value) => handleChange("logementOccupe", value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oui" id="occupe-oui" />
                <Label htmlFor="occupe-oui" className="cursor-pointer">Oui</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="non" id="occupe-non" />
                <Label htmlFor="occupe-non" className="cursor-pointer">Non</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </SectionCard>

      {/* Step 1 - Insurance */}
      <SectionCard icon={AlertTriangle} title="💧 Étape 1 — Le sinistre" iconBg="bg-red-100" iconColor="text-red-600">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Le dégât des eaux est-il déclaré à l'assurance ?</Label>
            <RadioGroup
              value={formData.insuranceDeclared}
              onValueChange={(value) => handleChange("insuranceDeclared", value)}
              className="space-y-2"
            >
              {insuranceOptions.map(opt => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.value} id={`insurance-${opt.value}`} />
                  <Label htmlFor={`insurance-${opt.value}`} className="cursor-pointer">{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="claimNumber">Numéro de sinistre (si existant)</Label>
            <Input
              id="claimNumber"
              value={formData.claimNumber}
              onChange={(e) => handleChange("claimNumber", e.target.value)}
              placeholder="Ex: SIN-2025-XXXXX"
            />
          </div>
        </div>
      </SectionCard>

      {/* Step 2 - Origin */}
      <SectionCard icon={Droplets} title="💧 Étape 2 — Origine du dégât" iconBg="bg-blue-100" iconColor="text-blue-600">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Origine présumée</Label>
            <RadioGroup
              value={formData.damageOrigin}
              onValueChange={(value) => handleChange("damageOrigin", value)}
              className="space-y-2"
            >
              {originOptions.map(opt => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.value} id={`origin-${opt.value}`} />
                  <Label htmlFor={`origin-${opt.value}`} className="cursor-pointer">{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Nature de la fuite</Label>
            <RadioGroup
              value={formData.damageNature}
              onValueChange={(value) => handleChange("damageNature", value)}
              className="space-y-2"
            >
              {natureOptions.map(opt => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.value} id={`nature-${opt.value}`} />
                  <Label htmlFor={`nature-${opt.value}`} className="cursor-pointer">{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </SectionCard>

      {/* Step 3 - Rooms */}
      <SectionCard icon={Home} title="🏠 Étape 3 — Pièces concernées" iconBg="bg-purple-100" iconColor="text-purple-600">
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
                <Checkbox
                  checked={formData.affectedRooms.includes(opt.value)}
                  className="pointer-events-none"
                />
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

      {/* Step 4 - Works */}
      <SectionCard icon={Wrench} title="🛠️ Étape 4 — Travaux à réaliser" iconBg="bg-orange-100" iconColor="text-orange-600">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {worksOptions.map(opt => (
              <div
                key={opt.value}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  formData.requiredWorks.includes(opt.value)
                    ? 'border-foreground bg-foreground/5'
                    : 'border-border hover:border-foreground/30'
                }`}
                onClick={() => handleCheckboxChange("requiredWorks", opt.value, !formData.requiredWorks.includes(opt.value))}
              >
                <Checkbox
                  checked={formData.requiredWorks.includes(opt.value)}
                  className="pointer-events-none"
                />
                <span className="text-sm font-medium">{opt.label}</span>
              </div>
            ))}
          </div>
          
          {formData.requiredWorks.includes("autre") && (
            <Input
              value={formData.requiredWorksOther}
              onChange={(e) => handleChange("requiredWorksOther", e.target.value)}
              placeholder="Précisez les autres travaux..."
            />
          )}
        </div>
      </SectionCard>

      {/* Step 5 - Scope */}
      <SectionCard icon={Wrench} title="➕ Étape 5 — Souhaitez-vous aller plus loin ?" iconBg="bg-green-100" iconColor="text-green-600">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Nous pouvons intervenir uniquement pour la remise en état après sinistre 
            ou vous accompagner dans une rénovation plus globale, en lien avec votre assurance.
          </p>
          
          <RadioGroup
            value={formData.renovationScope}
            onValueChange={(value) => handleChange("renovationScope", value)}
            className="space-y-3"
          >
            {scopeOptions.map(opt => (
              <div
                key={opt.value}
                className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  formData.renovationScope === opt.value
                    ? 'border-foreground bg-foreground/5'
                    : 'border-border hover:border-foreground/30'
                }`}
                onClick={() => handleChange("renovationScope", opt.value)}
              >
                <RadioGroupItem value={opt.value} id={`scope-${opt.value}`} className="mt-1" />
                <div>
                  <Label htmlFor={`scope-${opt.value}`} className="font-medium cursor-pointer">
                    {opt.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">{opt.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      </SectionCard>

      {/* Step 6 - Documents */}
      <SectionCard icon={Upload} title="📎 Étape 6 — Documents" iconBg="bg-indigo-100" iconColor="text-indigo-600">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Ajoutez des photos des dégâts, rapport d'expertise, constat amiable ou documents d'assurance.
            <br />
            <span className="text-amber-600 font-medium">Formats acceptés : JPG, PNG, PDF (max 10 Mo par fichier)</span>
          </p>
          
          <div
            className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-foreground/30 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Cliquez ou glissez vos fichiers ici
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(file.size / 1024 / 1024).toFixed(2)} Mo)
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </SectionCard>

      {/* Step 7 - Message */}
      <SectionCard icon={MessageSquare} title="📝 Étape 7 — Commentaires" iconBg="bg-teal-100" iconColor="text-teal-600">
        <Textarea
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="Décrivez votre situation, les circonstances du sinistre, vos attentes..."
          className="min-h-[120px]"
        />
      </SectionCard>

      {/* hCaptcha */}
      <div className="flex justify-center">
        <HCaptcha
          ref={captchaRef}
          sitekey={HCAPTCHA_SITE_KEY}
          onVerify={onCaptchaVerify}
          onExpire={onCaptchaExpire}
          onError={onCaptchaError}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="cta"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            Envoyer ma demande dégât des eaux
          </>
        )}
      </Button>
    </form>
  );
}
