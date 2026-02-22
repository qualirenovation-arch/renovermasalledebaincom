import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OGTags } from "@/components/seo/OGTags";
import { supabase } from "@/integrations/supabase/client";
import { CalendarCheck, Mail, Phone, MapPin, Info } from "lucide-react";
import { DevisTypeSelector } from "@/components/devis/DevisTypeSelector";
import { WaterDamageQuoteForm } from "@/components/devis/WaterDamageQuoteForm";

const projectTypeOptions = [
  { value: "baignoire-vers-douche", label: "Remplacer une baignoire par une douche" },
  { value: "moderniser", label: "Moderniser une salle de bain existante" },
  { value: "installer-baignoire", label: "Installer une baignoire" },
  { value: "repenser-espace", label: "Repenser entièrement l'espace" },
  { value: "nouvelle-sdb", label: "Créer une nouvelle salle de bain dans une autre pièce" },
];

const roomTypeOptions = [
  { value: "chambre", label: "Chambre" },
  { value: "dressing", label: "Dressing" },
  { value: "combles", label: "Combles" },
  { value: "extension", label: "Extension" },
  { value: "autre", label: "Autre" },
];

// hCaptcha site key
const isPreviewOrDev = typeof window !== 'undefined' && (
  window.location.hostname.includes('lovable.app') || 
  window.location.hostname === 'localhost'
);
const HCAPTCHA_SITE_KEY = isPreviewOrDev 
  ? "10000000-ffff-ffff-ffff-000000000001" 
  : "00684ab0-a304-443e-bce6-2abe6892f1fa";

const getEffectiveCaptchaToken = (token: string | null) => {
  if (isPreviewOrDev && token) return "test-token";
  return token;
};

export default function DevisStep1() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const [devisType, setDevisType] = useState<'selector' | 'classique' | 'degat_eaux'>('selector');

  // Check URL params for direct type access
  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam === 'degat_eaux') {
      setDevisType('degat_eaux');
    } else if (typeParam === 'classique') {
      setDevisType('classique');
    }
  }, [searchParams]);

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    ville: "",
    codePostal: "",
    projectType: "",
    roomType: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const onCaptchaVerify = useCallback((token: string) => setCaptchaToken(token), []);
  const onCaptchaExpire = useCallback(() => setCaptchaToken(null), []);
  const onCaptchaError = useCallback(() => {
    setCaptchaToken(null);
    toast({ title: "Erreur de vérification", description: "Le captcha a échoué. Veuillez réessayer.", variant: "destructive" });
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.prenom || !formData.nom || !formData.email || !formData.telephone || !formData.adresse || !formData.codePostal || !formData.ville || !formData.projectType) {
      toast({ title: "Champs manquants", description: "Veuillez remplir tous les champs obligatoires.", variant: "destructive" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ title: "Email invalide", description: "Veuillez entrer une adresse email valide.", variant: "destructive" });
      return;
    }

    if (!captchaToken) {
      toast({ title: "Vérification requise", description: "Veuillez compléter la vérification anti-spam.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-step1-confirmation', {
        body: {
          clientFirstName: formData.prenom,
          clientLastName: formData.nom,
          clientEmail: formData.email,
          clientPhone: formData.telephone,
          clientAddress: formData.adresse,
          clientCity: formData.ville,
          codePostal: formData.codePostal,
          projectType: formData.projectType,
          roomType: formData.projectType === "nouvelle-sdb" ? formData.roomType : null,
          captchaToken: getEffectiveCaptchaToken(captchaToken),
        },
      });

      if (error) {
        console.error("Step 1 submission error:", error);
      }

      setIsSubmitted(true);
      toast({ title: "Demande enregistrée !", description: "Consultez votre boîte email pour la suite." });
    } catch (err) {
      console.error("Submission error:", err);
      setIsSubmitted(true);
      toast({ title: "Demande enregistrée !", description: "Nous vous recontacterons rapidement." });
    } finally {
      setIsSubmitting(false);
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="section-padding min-h-[70vh] flex items-center">
          <div className="container-custom">
            <motion.div className="max-w-2xl mx-auto text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="w-24 h-24 rounded-full bg-[hsl(var(--tag-mint))] flex items-center justify-center mx-auto mb-8">
                <Mail className="w-12 h-12 text-foreground" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold mb-6">Votre demande est enregistrée !</h1>
              <p className="text-muted-foreground text-lg mb-8">
                Un email vient de vous être envoyé à <strong>{formData.email}</strong> avec 
                <strong> 3 options</strong> pour poursuivre votre projet.
              </p>
              <div className="bg-accent/30 rounded-xl p-6 mb-8 text-left">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground mb-1">Vérifiez votre boîte email</p>
                    <p className="text-muted-foreground text-sm">
                      Vous y trouverez un lien pour compléter votre demande en ligne, demander un rappel, 
                      ou planifier un échange téléphonique directement.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg" asChild>
                  <a href="/">Retourner sur le site</a>
                </Button>
                <Button variant="outline" size="lg" onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ prenom: "", nom: "", email: "", telephone: "", adresse: "", ville: "", codePostal: "", projectType: "", roomType: "" });
                }}>
                  Nouvelle demande
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <OGTags
        title="Devis rénovation salle de bain"
        description="Demandez votre devis gratuit pour la rénovation de votre salle de bain à Paris. Réponse sous 48h."
        path="/devis"
        coverImage="https://renovermasalledebain.com/og/devis.jpg"
      />

      {/* Hero */}
      <section className="relative py-12 md:py-20 bg-gradient-to-b from-stone to-background overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative">
          <motion.div className="max-w-3xl text-center md:text-left" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="tag-mint inline-flex items-center gap-2 mb-5">
              <CalendarCheck className="w-4 h-4" />
              Visite gratuite
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 md:mb-6 tracking-tight">
              Parlez-nous de votre projet
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
              Commencez simplement, nous vous guidons pour la suite.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section id="devis-form" className="py-10 md:py-16 bg-background scroll-mt-24 md:scroll-mt-28">
        <div className="container-custom">
          {/* Type Selector */}
          {devisType === 'selector' && (
            <DevisTypeSelector
              onSelectClassic={() => setDevisType('classique')}
              onSelectWaterDamage={() => setDevisType('degat_eaux')}
            />
          )}

          {/* Water Damage Form */}
          {devisType === 'degat_eaux' && (
            <div className="max-w-3xl mx-auto">
              <WaterDamageQuoteForm onBack={() => setDevisType('selector')} />
            </div>
          )}

          {/* Classic Form */}
          {devisType === 'classique' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              {/* Back button */}
              <Button type="button" variant="ghost" onClick={() => setDevisType('selector')} className="mb-4">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Choisir un autre type de devis
              </Button>
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                {/* Coordonnées */}
                <div className="card-elevated p-5 md:p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--tag-beige))] flex items-center justify-center">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                      </svg>
                    </div>
                    Vos coordonnées
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom *</Label>
                      <Input id="nom" value={formData.nom} onChange={(e) => handleChange("nom", e.target.value)} placeholder="Dupont" required className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom *</Label>
                      <Input id="prenom" value={formData.prenom} onChange={(e) => handleChange("prenom", e.target.value)} placeholder="Jean" required className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="jean@exemple.fr" required className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone *</Label>
                      <Input id="telephone" type="tel" value={formData.telephone} onChange={(e) => handleChange("telephone", e.target.value)} placeholder="06 12 34 56 78" required className="rounded-xl" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="adresse">Adresse du projet *</Label>
                      <Input id="adresse" value={formData.adresse} onChange={(e) => handleChange("adresse", e.target.value)} placeholder="4 villa Georges Sand" required className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="codePostal">Code postal *</Label>
                      <Input id="codePostal" value={formData.codePostal} onChange={(e) => handleChange("codePostal", e.target.value)} placeholder="75017" required className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ville">Ville *</Label>
                      <Input id="ville" value={formData.ville} onChange={(e) => handleChange("ville", e.target.value)} placeholder="Paris" required className="rounded-xl" />
                    </div>
                  </div>
                </div>

                {/* Type de projet */}
                <div className="card-elevated p-5 md:p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--tag-blue))] flex items-center justify-center">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                      </svg>
                    </div>
                    Que souhaitez-vous réaliser ? *
                  </h2>
                  <RadioGroup
                    value={formData.projectType}
                    onValueChange={(value) => handleChange("projectType", value)}
                    className="space-y-3"
                  >
                    {projectTypeOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          formData.projectType === option.value
                            ? 'border-foreground bg-foreground/5'
                            : 'border-border bg-card hover:border-foreground/30'
                        }`}
                        onClick={() => handleChange("projectType", option.value)}
                      >
                        <RadioGroupItem value={option.value} id={`project-${option.value}`} className="pointer-events-none" />
                        <Label htmlFor={`project-${option.value}`} className="cursor-pointer flex-1 font-medium">{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {/* Conditional: room type for new bathroom */}
                  {formData.projectType === "nouvelle-sdb" && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <Label className="text-sm font-semibold text-foreground mb-3 block">La pièce concernée est actuellement :</Label>
                      <RadioGroup
                        value={formData.roomType}
                        onValueChange={(value) => handleChange("roomType", value)}
                        className="grid grid-cols-2 md:grid-cols-3 gap-3"
                      >
                        {roomTypeOptions.map((option) => (
                          <div
                            key={option.value}
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                              formData.roomType === option.value
                                ? 'border-foreground bg-foreground/5'
                                : 'border-border bg-card hover:border-foreground/30'
                            }`}
                            onClick={() => handleChange("roomType", option.value)}
                          >
                            <RadioGroupItem value={option.value} id={`room-${option.value}`} className="pointer-events-none" />
                            <Label htmlFor={`room-${option.value}`} className="cursor-pointer flex-1 font-medium text-sm">{option.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}
                </div>

                {/* Important notice */}
                <div className="bg-accent/30 rounded-xl p-5 border border-border/50">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Une visite sur site est indispensable pour établir un devis précis et définitif.
                      Afin de bien comprendre vos besoins et les contraintes techniques, nous vous proposerons de compléter votre demande ou de planifier un échange personnalisé.
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
            </motion.div>

            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
              <div className="card-elevated p-8 sticky top-24">
                <h2 className="font-display text-xl font-semibold mb-6">Visite technique gratuite</h2>
                <p className="text-muted-foreground mb-8">
                  Nous venons chez vous pour étudier votre projet et vous proposer un devis personnalisé.
                </p>
                <div className="space-y-4">
                  <a href="tel:+33659764685" className="flex items-center gap-4 p-4 rounded-xl bg-[hsl(var(--tag-beige))] hover:opacity-90 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
                      <Phone className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">Téléphone</p>
                      <p className="text-muted-foreground">06 59 76 46 85</p>
                    </div>
                  </a>
                  <a href="mailto:contact@qualiconcept.fr" className="flex items-center gap-4 p-4 rounded-xl bg-[hsl(var(--tag-mint))] hover:opacity-90 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
                      <Mail className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">contact@qualiconcept.fr</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-[hsl(var(--tag-blue))]">
                    <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">Zone d'intervention</p>
                      <p className="text-muted-foreground">Paris & Île-de-France</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 p-4 rounded-xl bg-[hsl(var(--tag-peach))]">
                  <p className="text-sm text-foreground">
                    <strong>Réponse sous 24h</strong><br />
                    Nous vous rappelons rapidement pour fixer la date de visite.
                  </p>
                </div>
              </div>
            </motion.div>
           </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
