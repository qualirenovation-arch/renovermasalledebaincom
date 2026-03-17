import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { 
  Upload, 
  Wrench, 
  FileText, 
  MessageSquare,
  X,
  CheckCircle2,
  Loader2,
  Mail
} from "lucide-react";

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
  leadId: string;
  clientFirstName: string;
  clientEmail: string;
}

export function WaterDamageStep2Form({ leadId, clientFirstName, clientEmail }: Props) {
  const [requiredWorks, setRequiredWorks] = useState<string[]>([]);
  const [requiredWorksOther, setRequiredWorksOther] = useState("");
  const [renovationScope, setRenovationScope] = useState("");
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const { toast } = useToast();

  const onCaptchaVerify = useCallback((token: string) => setCaptchaToken(token), []);
  const onCaptchaExpire = useCallback(() => setCaptchaToken(null), []);
  const onCaptchaError = useCallback(() => {
    setCaptchaToken(null);
    toast({ title: "Erreur de vérification", description: "Le captcha a échoué.", variant: "destructive" });
  }, [toast]);

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setRequiredWorks(prev => [...prev, value]);
    } else {
      setRequiredWorks(prev => prev.filter(item => item !== value));
    }
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

    if (!captchaToken) {
      toast({ title: "Vérification requise", description: "Veuillez compléter la vérification anti-spam.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload files
      const documentPaths: string[] = [];
      for (const file of uploadedFiles) {
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filePath = `${leadId}/${timestamp}_${safeName}`;
        
        const { data, error } = await supabase.storage
          .from('water-damage-documents')
          .upload(filePath, file);
        
        if (!error && data) {
          documentPaths.push(data.path);
        }
      }

      // Update lead with Step 2 data via edge function
      const { data, error } = await supabase.functions.invoke('send-devis-confirmation', {
        body: {
          clientEmail,
          clientFirstName,
          clientLastName: "",
          clientPhone: "",
          captchaToken: getEffectiveCaptchaToken(captchaToken),
          leadId,
          isWaterDamageStep2: true,
          waterDamageStep2: {
            requiredWorks,
            requiredWorksOther,
            renovationScope,
            message,
            documentPaths,
          },
        },
      });

      if (error || !data?.success) {
        const backendMessage = (data as { error?: string } | null)?.error;
        throw new Error(backendMessage || "Le dossier n'a pas pu être envoyé. Veuillez réessayer.");
      }

      setIsSubmitted(true);
      toast({ title: "Dossier complété !", description: "Nous vous recontacterons sous 24h." });
    } catch (err) {
      console.error("Submission error:", err);
      toast({
        title: "Échec de l'envoi",
        description: err instanceof Error ? err.message : "Impossible d'envoyer votre dossier pour le moment.",
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
      <motion.div className="max-w-2xl mx-auto text-center py-12" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-light mb-4">Dossier complété avec succès !</h2>
        <p className="text-muted-foreground mb-6">
          Merci d'avoir complété votre dossier dégât des eaux. 
          Un membre de notre équipe vous contactera sous <strong>24h</strong> pour planifier la visite technique.
        </p>
        <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
          <p className="text-sm text-blue-800">
            <strong>Conseil :</strong> Conservez tous les documents liés à votre sinistre 
            (photos, constat amiable, rapports d'expertise) pour faciliter le traitement de votre dossier.
          </p>
        </div>
        <Button asChild variant="default" size="lg">
          <a href="/">Retourner sur le site</a>
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
      <h3 className="font-display text-lg font-light mb-4 flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-light mb-2">
          Bonjour {clientFirstName}
        </h2>
        <p className="text-muted-foreground">
          Complétez votre dossier dégât des eaux pour que nous puissions préparer au mieux votre visite technique.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 4 - Works */}
        <SectionCard icon={Wrench} title="Étape 4 — Travaux à réaliser" iconBg="bg-orange-100" iconColor="text-orange-600">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {worksOptions.map(opt => (
                <div
                  key={opt.value}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    requiredWorks.includes(opt.value)
                      ? 'border-foreground bg-foreground/5'
                      : 'border-border hover:border-foreground/30'
                  }`}
                  onClick={() => handleCheckboxChange(opt.value, !requiredWorks.includes(opt.value))}
                >
                  <Checkbox checked={requiredWorks.includes(opt.value)} className="pointer-events-none" />
                  <span className="text-sm font-medium">{opt.label}</span>
                </div>
              ))}
            </div>
            {requiredWorks.includes("autre") && (
              <Input
                value={requiredWorksOther}
                onChange={(e) => setRequiredWorksOther(e.target.value)}
                placeholder="Précisez les autres travaux..."
              />
            )}
          </div>
        </SectionCard>

        {/* Step 5 - Scope */}
        <SectionCard icon={Wrench} title="Étape 5 — Souhaitez-vous aller plus loin ?" iconBg="bg-green-100" iconColor="text-green-600">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Nous pouvons intervenir uniquement pour la remise en état après sinistre 
              ou vous accompagner dans une rénovation plus globale, en lien avec votre assurance.
            </p>
            <RadioGroup value={renovationScope} onValueChange={setRenovationScope} className="space-y-3">
              {scopeOptions.map(opt => (
                <div
                  key={opt.value}
                  className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    renovationScope === opt.value
                      ? 'border-foreground bg-foreground/5'
                      : 'border-border hover:border-foreground/30'
                  }`}
                  onClick={() => setRenovationScope(opt.value)}
                >
                  <RadioGroupItem value={opt.value} id={`wd2-scope-${opt.value}`} className="mt-1" />
                  <div>
                    <Label htmlFor={`wd2-scope-${opt.value}`} className="font-medium cursor-pointer">{opt.label}</Label>
                    <p className="text-sm text-muted-foreground">{opt.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </SectionCard>

        {/* Step 6 - Documents */}
        <SectionCard icon={Upload} title="Étape 6 — Documents" iconBg="bg-indigo-100" iconColor="text-indigo-600">
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
              <p className="text-sm text-muted-foreground">Cliquez ou glissez vos fichiers ici</p>
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
                      <span className="text-xs text-muted-foreground">({(file.size / 1024 / 1024).toFixed(2)} Mo)</span>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SectionCard>

        {/* Step 7 - Message */}
        <SectionCard icon={MessageSquare} title="Étape 7 — Commentaires" iconBg="bg-teal-100" iconColor="text-teal-600">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Décrivez votre situation, les circonstances du sinistre, vos attentes..."
            className="min-h-[120px]"
          />
        </SectionCard>

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

        <Button
          type="submit"
          size="lg"
          className="w-full bg-[hsl(38,50%,50%)] hover:bg-[hsl(38,50%,45%)] text-white rounded-xl py-6 text-lg"
          disabled={isSubmitting || !captchaToken}
        >
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Envoi en cours...</>
          ) : (
            "Envoyer mon dossier complété"
          )}
        </Button>
      </form>
    </div>
  );
}
