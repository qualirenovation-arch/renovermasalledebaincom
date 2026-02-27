import { useState, useRef, useCallback } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { OGTags } from "@/components/seo/OGTags";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload, 
  Phone, 
  Mail, 
  Building2,
  Users,
  FileText,
  Camera,
  Globe,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
  Send
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Types
interface FormData {
  // Bloc 1: Informations générales
  companyName: string;
  contactName: string;
  contactFunction: string;
  phone: string;
  email: string;
  zones: string[];
  zoneOther: string;
  
  // Bloc 1b: Informations légales
  siret: string;
  vatNumber: string;
  managerFirstName: string;
  managerLastName: string;
  managerPhone: string;
  
  // Bloc 2: Corps de métier
  trades: string[];
  tradeOther: string;
  experience: string;
  
  // Bloc 3: Organisation chantier
  employeeCount: string;
  annualRevenue: string;
  managedPeopleCount: string;
  worksAsSubcontractor: string;
  autonomousIntervention: string;
  occupiedSitesExperience: string;
  
  // Bloc 4: Assurance
  insuranceCompany: string;
  insuranceContractNumber: string;
  
  // Bloc 6: Présence en ligne
  websiteUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  houzzUrl: string;
  
  // Bloc 7: Message libre
  presentation: string;
  
  // Bloc 8: Validation
  certifyAccuracy: boolean;
  acceptContact: boolean;
}

interface UploadedDocument {
  file: File;
  type: 'kbis' | 'urssaf' | 'rc_pro' | 'decennale' | 'rib';
}

const initialFormData: FormData = {
  companyName: "",
  contactName: "",
  contactFunction: "",
  phone: "",
  email: "",
  zones: [],
  zoneOther: "",
  siret: "",
  vatNumber: "",
  managerFirstName: "",
  managerLastName: "",
  managerPhone: "",
  trades: [],
  tradeOther: "",
  experience: "",
  employeeCount: "",
  annualRevenue: "",
  managedPeopleCount: "",
  worksAsSubcontractor: "",
  autonomousIntervention: "",
  occupiedSitesExperience: "",
  insuranceCompany: "",
  insuranceContractNumber: "",
  websiteUrl: "",
  instagramUrl: "",
  facebookUrl: "",
  linkedinUrl: "",
  houzzUrl: "",
  presentation: "",
  certifyAccuracy: false,
  acceptContact: false,
};

// Options
const zoneOptions = [
  { value: "paris", label: "Paris" },
  { value: "petite-couronne", label: "Petite couronne (92, 93, 94)" },
  { value: "grande-couronne", label: "Grande couronne (77, 78, 91, 95)" },
  { value: "autre", label: "Autre" },
];

const tradeOptions = [
  { value: "carreleur", label: "Carreleur" },
  { value: "peintre", label: "Peintre" },
  { value: "chapiste", label: "Chapiste" },
  { value: "menuisier", label: "Menuisier" },
  { value: "platrier", label: "Plâtrerie / cloisons" },
  { value: "tce", label: "Entreprise tous corps d'état" },
  { value: "autre", label: "Autre" },
];

const experienceOptions = [
  { value: "moins-5", label: "Moins de 5 ans" },
  { value: "5-10", label: "5 à 10 ans" },
  { value: "plus-10", label: "Plus de 10 ans" },
];

const documentTypes = [
  { type: 'kbis' as const, label: "Extrait Kbis", help: "Kbis de moins de 3 mois", formats: "PDF" },
  { type: 'urssaf' as const, label: "Attestation de vigilance URSSAF", help: "Attestation de moins de 6 mois", formats: "PDF" },
  { type: 'rc_pro' as const, label: "Attestation RC Professionnelle", help: "Assurance responsabilité civile", formats: "PDF" },
  { type: 'decennale' as const, label: "Attestation d'assurance décennale", help: "Les activités assurées doivent correspondre aux travaux réalisés", formats: "PDF" },
  { type: 'rib' as const, label: "RIB de l'entreprise", help: "Relevé d'identité bancaire", formats: "PDF / JPG" },
];

const HCAPTCHA_SITE_KEY = "00684ab0-a304-443e-bce6-2abe6892f1fa";

export default function DevenirPartenaire() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [documents, setDocuments] = useState<Record<string, File | null>>({
    kbis: null,
    urssaf: null,
    rc_pro: null,
    decennale: null,
    rib: null,
  });
  const [portfolioFiles, setPortfolioFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const [siretError, setSiretError] = useState<string | null>(null);
  const { toast } = useToast();

  // SIRET validation helper (must be exactly 14 digits)
  const validateSiret = (siret: string): boolean => {
    const cleanedSiret = siret.replace(/\s/g, '');
    return /^\d{14}$/.test(cleanedSiret);
  };

  const handleSiretChange = (value: string) => {
    // Allow digits and spaces only
    const filtered = value.replace(/[^\d\s]/g, '');
    handleChange('siret', filtered);
    
    // Clear error when empty
    if (!filtered.trim()) {
      setSiretError(null);
      return;
    }
    
    // Validate
    const cleanedSiret = filtered.replace(/\s/g, '');
    if (cleanedSiret.length > 0 && cleanedSiret.length !== 14) {
      setSiretError(`${cleanedSiret.length}/14 chiffres`);
    } else if (cleanedSiret.length === 14) {
      setSiretError(null);
    }
  };

  // Check if candidacy should be rejected based on key questions
  const isCandidacyIneligible = 
    formData.worksAsSubcontractor === 'non' || 
    formData.autonomousIntervention === 'non' || 
    formData.occupiedSitesExperience === 'non';

  // hCaptcha handlers
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

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: 'zones' | 'trades', value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      if (checked) {
        return { ...prev, [field]: [...currentArray, value] };
      } else {
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const handleDocumentUpload = (type: string, file: File | null) => {
    setDocuments(prev => ({ ...prev, [type]: file }));
  };

  const handlePortfolioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file => {
        const isValid = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type);
        const isUnderLimit = file.size <= 10 * 1024 * 1024;
        return isValid && isUnderLimit;
      });
      
      // Limit to 10 files
      const newFiles = [...portfolioFiles, ...validFiles].slice(0, 10);
      setPortfolioFiles(newFiles);
    }
  };

  const removePortfolioFile = (index: number) => {
    setPortfolioFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Check which documents are missing
  const getMissingDocuments = () => {
    const missing: string[] = [];
    const docLabels: Record<string, string> = {
      kbis: "Extrait Kbis",
      urssaf: "Attestation URSSAF",
      rc_pro: "RC Professionnelle",
      decennale: "Assurance décennale",
      rib: "RIB",
    };
    for (const [type, file] of Object.entries(documents)) {
      if (!file) {
        missing.push(docLabels[type] || type);
      }
    }
    return missing;
  };
  
  const missingDocuments = getMissingDocuments();
  const hasAllDocuments = missingDocuments.length === 0;

  // URL validation helper - only allow http and https protocols
  const validateUrl = (url: string): boolean => {
    if (!url.trim()) return true; // Optional field
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  };

  // Convert file to base64
  const fileToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix (e.g., "data:application/pdf;base64,")
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.companyName || !formData.contactName || !formData.phone || !formData.email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires du bloc 1.",
        variant: "destructive",
      });
      return;
    }

    if (formData.trades.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins un corps de métier.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.experience) {
      toast({
        title: "Erreur",
        description: "Veuillez indiquer vos années d'expérience.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.employeeCount) {
      toast({
        title: "Erreur",
        description: "Veuillez indiquer l'effectif de votre entreprise.",
        variant: "destructive",
      });
      return;
    }

    // Validate SIRET format if provided
    if (formData.siret.trim()) {
      const cleanedSiret = formData.siret.replace(/\s/g, '');
      if (!validateSiret(formData.siret)) {
        setSiretError(`Format invalide (${cleanedSiret.length}/14 chiffres)`);
        toast({
          title: "Erreur de format",
          description: "Le numéro SIRET doit comporter exactement 14 chiffres.",
          variant: "destructive",
        });
        return;
      }
    }

    // Validate URLs - prevent javascript:, data:, file: protocols
    const urls = [
      { field: 'Site web', value: formData.websiteUrl },
      { field: 'Instagram', value: formData.instagramUrl },
      { field: 'Facebook', value: formData.facebookUrl },
      { field: 'LinkedIn', value: formData.linkedinUrl },
      { field: 'Houzz', value: formData.houzzUrl },
    ];

    for (const { field, value } of urls) {
      if (value && !validateUrl(value)) {
        toast({
          title: "URL invalide",
          description: `L'URL ${field} doit commencer par http:// ou https://`,
          variant: "destructive",
        });
        return;
      }
    }

    // Check eligibility criteria - if not met, reject candidacy
    if (isCandidacyIneligible) {
      setIsRejected(true);
      return;
    }

    // Documents are no longer blocking - we just track which are missing

    if (!formData.certifyAccuracy || !formData.acceptContact) {
      toast({
        title: "Validation requise",
        description: "Veuillez accepter les conditions pour envoyer votre candidature.",
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Convert documents to base64 for edge function upload
      const documentsData = await Promise.all(
        Object.entries(documents)
          .filter(([_, file]) => file !== null)
          .map(async ([type, file]) => {
            const base64 = await fileToBase64(file!);
            return { 
              type, 
              name: file!.name, 
              data: base64,
              mimeType: file!.type 
            };
          })
      );

      // Convert portfolio files to base64
      const portfolioData = await Promise.all(
        portfolioFiles.map(async (file) => {
          const base64 = await fileToBase64(file);
          return { 
            name: file.name, 
            data: base64,
            mimeType: file.type 
          };
        })
      );

      // Call edge function with ALL data (captcha verified FIRST on server)
      const { error } = await supabase.functions.invoke('send-partner-confirmation', {
        body: {
          formData: {
            company_name: formData.companyName,
            contact_name: formData.contactName,
            contact_function: formData.contactFunction,
            phone: formData.phone,
            email: formData.email,
            zones: formData.zones,
            zone_other: formData.zoneOther || null,
            siret: formData.siret || null,
            vat_number: formData.vatNumber || null,
            manager_first_name: formData.managerFirstName || null,
            manager_last_name: formData.managerLastName || null,
            manager_phone: formData.managerPhone || null,
            trades: formData.trades,
            trade_other: formData.tradeOther || null,
            experience: formData.experience,
            employee_count: parseInt(formData.employeeCount) || 0,
            annual_revenue: formData.annualRevenue || null,
            managed_people_count: formData.managedPeopleCount ? parseInt(formData.managedPeopleCount) : null,
            works_as_subcontractor: formData.worksAsSubcontractor === 'oui',
            autonomous_intervention: formData.autonomousIntervention === 'oui',
            occupied_sites_experience: formData.occupiedSitesExperience === 'oui',
            insurance_company: formData.insuranceCompany || null,
            insurance_contract_number: formData.insuranceContractNumber || null,
            website_url: formData.websiteUrl || null,
            instagram_url: formData.instagramUrl || null,
            facebook_url: formData.facebookUrl || null,
            linkedin_url: formData.linkedinUrl || null,
            houzz_url: formData.houzzUrl || null,
            presentation: formData.presentation || null,
            certify_accuracy: formData.certifyAccuracy,
            accept_contact: formData.acceptContact,
          },
          documents: documentsData,
          portfolioFiles: portfolioData,
          captchaToken,
          missingDocuments,
        },
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Erreur lors de l'enregistrement");
      }

      setIsSubmitted(true);
      
      toast({
        title: "Candidature envoyée !",
        description: "Un email de confirmation vous a été envoyé.",
      });
    } catch (err) {
      console.error("Submission error:", err);
      toast({
        title: "Erreur",
        description: err instanceof Error ? err.message : "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
    }
  };

  // Rejection screen when candidacy doesn't meet criteria
  if (isRejected) {
    return (
      <Layout>
        <section className="section-padding min-h-[70vh] flex items-center">
          <div className="container-custom">
            <motion.div 
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-8">
                <AlertCircle className="w-12 h-12 text-destructive" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-light mb-6">
                Candidature non éligible
              </h1>
              <p className="text-muted-foreground text-lg mb-4">
                Nous vous remercions de l'intérêt que vous portez à notre réseau de partenaires.
              </p>
              <p className="text-muted-foreground mb-8">
                Malheureusement, votre profil ne correspond pas à nos critères de sélection actuels.<br />
                Nous recherchons des entreprises capables de travailler en sous-traitance, en autonomie sur chantier et habituées aux chantiers occupés.
              </p>
              <div className="bg-muted/50 rounded-xl p-6 mb-8 text-left">
                <p className="text-sm text-muted-foreground">
                  <strong>Note :</strong> Si votre situation évolue, n'hésitez pas à recandidater ultérieurement.
                </p>
              </div>
              <Button 
                onClick={() => window.location.href = '/'}
                variant="cta"
                size="lg"
              >
                Retour à l'accueil
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  if (isSubmitted) {
    return (
      <Layout>
        <section className="section-padding min-h-[70vh] flex items-center">
          <div className="container-custom">
            <motion.div 
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-24 h-24 rounded-full bg-[hsl(var(--tag-mint))] flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-foreground" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-light mb-6">
                Candidature envoyée !
              </h1>
              <p className="text-muted-foreground text-lg mb-4">
                Merci pour votre candidature en tant que partenaire sous-traitant.
              </p>
              <p className="text-muted-foreground mb-8">
                Votre dossier a bien été reçu et sera étudié par notre équipe.<br />
                Si votre profil correspond à nos besoins, nous vous recontacterons pour un premier échange.
              </p>
              <div className="bg-muted/50 rounded-xl p-6 mb-8 text-left">
                <p className="text-sm text-muted-foreground">
                  <strong>Important :</strong> Aucune intervention ne pourra être programmée sans validation complète du dossier.
                </p>
              </div>
              <Button 
                onClick={() => window.location.href = '/'}
                variant="cta"
                size="lg"
              >
                Retour à l'accueil
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <OGTags
        title="Devenir partenaire sous-traitant"
        description="Rejoignez le réseau QualiRénovation by QualiConcept. Candidature pour artisans et entreprises du bâtiment souhaitant collaborer sur nos chantiers."
        path="/devenir-partenaire"
      />
      <section className="section-padding bg-gradient-to-b from-background to-muted/20">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light mb-4 text-primary">
              Devenir partenaire sous-traitant
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Rejoignez le réseau QualiRénovation by QualiConcept. 
              Remplissez ce formulaire avec vos documents légaux pour candidater.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
            
            {/* BLOC 1 - Informations générales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  1. Informations générales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nom de l'entreprise *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleChange('companyName', e.target.value)}
                      placeholder="Votre entreprise"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Nom et prénom du contact *</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => handleChange('contactName', e.target.value)}
                      placeholder="Prénom Nom"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactFunction">Fonction *</Label>
                    <Input
                      id="contactFunction"
                      value={formData.contactFunction}
                      onChange={(e) => handleChange('contactFunction', e.target.value)}
                      placeholder="Gérant, Chef d'équipe..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="06 XX XX XX XX"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email professionnel *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="contact@entreprise.fr"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Zone géographique d'intervention *</Label>
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {zoneOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`zone-${option.value}`}
                          checked={formData.zones.includes(option.value)}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange('zones', option.value, checked as boolean)
                          }
                        />
                        <Label htmlFor={`zone-${option.value}`} className="text-sm cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {formData.zones.includes('autre') && (
                    <Input
                      value={formData.zoneOther}
                      onChange={(e) => handleChange('zoneOther', e.target.value)}
                      placeholder="Précisez la zone..."
                      className="mt-2"
                    />
                  )}
                </div>

                {/* Informations légales */}
                <div className="border-t pt-6 mt-6">
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Informations légales
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="siret">Numéro SIRET</Label>
                      <Input
                        id="siret"
                        value={formData.siret}
                        onChange={(e) => handleSiretChange(e.target.value)}
                        placeholder="123 456 789 01234"
                        maxLength={17}
                        className={siretError ? "border-destructive" : ""}
                      />
                      {siretError ? (
                        <p className="text-xs text-destructive">{siretError}</p>
                      ) : (
                        <p className="text-xs text-muted-foreground">14 chiffres (vérifiable sur Infogreffe/Pappers)</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vatNumber">Numéro de TVA intracommunautaire</Label>
                      <Input
                        id="vatNumber"
                        value={formData.vatNumber}
                        onChange={(e) => handleChange('vatNumber', e.target.value)}
                        placeholder="FR XX XXX XXX XXX"
                      />
                    </div>
                  </div>
                </div>

                {/* Gérant / Responsable chantier */}
                <div className="border-t pt-6 mt-6">
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Gérant / Responsable des chantiers
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="managerLastName">Nom du gérant</Label>
                      <Input
                        id="managerLastName"
                        value={formData.managerLastName}
                        onChange={(e) => handleChange('managerLastName', e.target.value)}
                        placeholder="Nom"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="managerFirstName">Prénom du gérant</Label>
                      <Input
                        id="managerFirstName"
                        value={formData.managerFirstName}
                        onChange={(e) => handleChange('managerFirstName', e.target.value)}
                        placeholder="Prénom"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="managerPhone">Téléphone du gérant</Label>
                      <Input
                        id="managerPhone"
                        type="tel"
                        value={formData.managerPhone}
                        onChange={(e) => handleChange('managerPhone', e.target.value)}
                        placeholder="06 XX XX XX XX"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* BLOC 2 - Corps de métier */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  2. Corps de métier
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Activité principale *</Label>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {tradeOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`trade-${option.value}`}
                          checked={formData.trades.includes(option.value)}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange('trades', option.value, checked as boolean)
                          }
                        />
                        <Label htmlFor={`trade-${option.value}`} className="text-sm cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {formData.trades.includes('autre') && (
                    <Input
                      value={formData.tradeOther}
                      onChange={(e) => handleChange('tradeOther', e.target.value)}
                      placeholder="Précisez votre métier..."
                      className="mt-2"
                    />
                  )}
                </div>

                <div className="space-y-3">
                  <Label>Années d'expérience *</Label>
                  <RadioGroup
                    value={formData.experience}
                    onValueChange={(value) => handleChange('experience', value)}
                    className="flex flex-wrap gap-4"
                  >
                    {experienceOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`exp-${option.value}`} />
                        <Label htmlFor={`exp-${option.value}`} className="cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* BLOC 3 - Organisation chantier */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  3. Organisation chantier
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="employeeCount">Effectif de l'entreprise *</Label>
                    <Input
                      id="employeeCount"
                      type="number"
                      min="1"
                      value={formData.employeeCount}
                      onChange={(e) => handleChange('employeeCount', e.target.value)}
                      placeholder="Nombre de salariés"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annualRevenue">Chiffre d'affaires actuel</Label>
                    <Select
                      value={formData.annualRevenue}
                      onValueChange={(value) => handleChange('annualRevenue', value)}
                    >
                      <SelectTrigger id="annualRevenue">
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="moins-100k">Moins de 100 000 €</SelectItem>
                        <SelectItem value="100k-250k">100 000 € - 250 000 €</SelectItem>
                        <SelectItem value="250k-500k">250 000 € - 500 000 €</SelectItem>
                        <SelectItem value="500k-1m">500 000 € - 1 M€</SelectItem>
                        <SelectItem value="plus-1m">Plus de 1 M€</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="managedPeopleCount">Personnes gérées</Label>
                    <Input
                      id="managedPeopleCount"
                      type="number"
                      min="0"
                      value={formData.managedPeopleCount}
                      onChange={(e) => handleChange('managedPeopleCount', e.target.value)}
                      placeholder="Équipes / sous-traitants"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label>Travaillez-vous en sous-traitance ?</Label>
                    <RadioGroup
                      value={formData.worksAsSubcontractor}
                      onValueChange={(value) => handleChange('worksAsSubcontractor', value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="oui" id="sub-oui" />
                        <Label htmlFor="sub-oui" className="cursor-pointer">Oui</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="non" id="sub-non" />
                        <Label htmlFor="sub-non" className="cursor-pointer">Non</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>Intervention en autonomie sur chantier ?</Label>
                    <RadioGroup
                      value={formData.autonomousIntervention}
                      onValueChange={(value) => handleChange('autonomousIntervention', value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="oui" id="auto-oui" />
                        <Label htmlFor="auto-oui" className="cursor-pointer">Oui</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="non" id="auto-non" />
                        <Label htmlFor="auto-non" className="cursor-pointer">Non</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>Habitué aux chantiers occupés ?</Label>
                    <RadioGroup
                      value={formData.occupiedSitesExperience}
                      onValueChange={(value) => handleChange('occupiedSitesExperience', value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="oui" id="occ-oui" />
                        <Label htmlFor="occ-oui" className="cursor-pointer">Oui</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="non" id="occ-non" />
                        <Label htmlFor="occ-non" className="cursor-pointer">Non</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Warning message when criteria not met */}
                {isCandidacyIneligible && (
                  <div className="border-2 border-destructive/30 bg-destructive/5 rounded-xl p-4 mt-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-destructive mb-1">
                          Candidature non éligible
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Nous recherchons des entreprises capables de travailler en sous-traitance, en autonomie sur chantier et habituées aux chantiers occupés. 
                          Si vous répondez "Non" à l'une de ces questions, votre candidature ne pourra pas être acceptée.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* BLOC 4 - Documents */}
            <Card className={missingDocuments.length > 0 ? "border-2 border-amber-500/30" : "border-2 border-green-500/30"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${missingDocuments.length > 0 ? 'bg-amber-500/10' : 'bg-green-500/10'}`}>
                    <FileText className={`w-5 h-5 ${missingDocuments.length > 0 ? 'text-amber-600' : 'text-green-600'}`} />
                  </div>
                  4. Documents
                  <span className={`ml-2 text-sm font-normal ${missingDocuments.length > 0 ? 'text-amber-600' : 'text-green-600'}`}>
                    {missingDocuments.length > 0 ? `(${missingDocuments.length} manquant${missingDocuments.length > 1 ? 's' : ''})` : '(Complet)'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className={`border rounded-lg p-4 mb-6 ${missingDocuments.length > 0 ? 'bg-amber-500/5 border-amber-500/20' : 'bg-green-500/5 border-green-500/20'}`}>
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`w-5 h-5 mt-0.5 ${missingDocuments.length > 0 ? 'text-amber-600' : 'text-green-600'}`} />
                    <p className={`text-sm ${missingDocuments.length > 0 ? 'text-amber-700' : 'text-green-700'}`}>
                      {missingDocuments.length > 0 
                        ? <><strong>Note :</strong> Vous pouvez soumettre votre candidature même si des documents sont manquants. Nous vous contacterons pour compléter votre dossier.</>
                        : <><strong>Parfait !</strong> Tous vos documents sont téléchargés.</>
                      }
                    </p>
                  </div>
                </div>

                {/* Insurance info section */}
                <div className="border rounded-xl p-4 bg-muted/30 mb-6">
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Informations Assurance
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="insuranceCompany">Chez qui êtes-vous assuré ?</Label>
                      <Input
                        id="insuranceCompany"
                        value={formData.insuranceCompany}
                        onChange={(e) => handleChange('insuranceCompany', e.target.value)}
                        placeholder="Nom de votre assureur"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insuranceContractNumber">Numéro de contrat</Label>
                      <Input
                        id="insuranceContractNumber"
                        value={formData.insuranceContractNumber}
                        onChange={(e) => handleChange('insuranceContractNumber', e.target.value)}
                        placeholder="N° de contrat"
                      />
                    </div>
                  </div>
                  
                  {/* RC Pro and Décennale uploads inline */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <DocumentUpload
                      type="rc_pro"
                      label="RC Professionnelle"
                      help="Assurance responsabilité civile"
                      formats="PDF"
                      file={documents.rc_pro}
                      onFileChange={(file) => handleDocumentUpload('rc_pro', file)}
                    />
                    <DocumentUpload
                      type="decennale"
                      label="Assurance décennale"
                      help="Activités correspondantes aux travaux"
                      formats="PDF"
                      file={documents.decennale}
                      onFileChange={(file) => handleDocumentUpload('decennale', file)}
                    />
                  </div>
                </div>

                {/* Other documents */}
                <div className="grid gap-4">
                  <DocumentUpload
                    type="kbis"
                    label="Extrait Kbis"
                    help="Kbis de moins de 3 mois"
                    formats="PDF"
                    file={documents.kbis}
                    onFileChange={(file) => handleDocumentUpload('kbis', file)}
                  />
                  <DocumentUpload
                    type="urssaf"
                    label="Attestation de vigilance URSSAF"
                    help="Attestation de moins de 6 mois"
                    formats="PDF"
                    file={documents.urssaf}
                    onFileChange={(file) => handleDocumentUpload('urssaf', file)}
                  />
                  <DocumentUpload
                    type="rib"
                    label="RIB de l'entreprise"
                    help="Relevé d'identité bancaire"
                    formats="PDF / JPG"
                    file={documents.rib}
                    onFileChange={(file) => handleDocumentUpload('rib', file)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* BLOC 5 - Réalisations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-primary" />
                  </div>
                  5. Réalisations
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    (Recommandé)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Chantiers récents – finitions visibles – avant/après appréciés (3 à 10 photos)
                </p>
                
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                  <input
                    type="file"
                    id="portfolio"
                    multiple
                    accept="image/jpeg,image/png,application/pdf"
                    onChange={handlePortfolioChange}
                    className="hidden"
                  />
                  <label 
                    htmlFor="portfolio"
                    className="cursor-pointer flex flex-col items-center gap-3"
                  >
                    <Upload className="w-10 h-10 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Cliquez pour ajouter des photos (JPG, PNG, PDF)
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {portfolioFiles.length}/10 fichiers
                    </span>
                  </label>
                </div>

                {portfolioFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {portfolioFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                          {file.type.startsWith('image/') ? (
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FileText className="w-8 h-8 text-muted-foreground" />
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removePortfolioFile(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          {file.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* BLOC 6 - Présence en ligne */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  6. Présence en ligne
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="websiteUrl">Site internet</Label>
                    <Input
                      id="websiteUrl"
                      type="url"
                      value={formData.websiteUrl}
                      onChange={(e) => handleChange('websiteUrl', e.target.value)}
                      placeholder="https://www.votre-site.fr"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagramUrl">Instagram</Label>
                    <Input
                      id="instagramUrl"
                      type="url"
                      value={formData.instagramUrl}
                      onChange={(e) => handleChange('instagramUrl', e.target.value)}
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebookUrl">Facebook</Label>
                    <Input
                      id="facebookUrl"
                      type="url"
                      value={formData.facebookUrl}
                      onChange={(e) => handleChange('facebookUrl', e.target.value)}
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedinUrl">LinkedIn</Label>
                    <Input
                      id="linkedinUrl"
                      type="url"
                      value={formData.linkedinUrl}
                      onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                      placeholder="https://linkedin.com/..."
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="houzzUrl">Houzz / autre plateforme</Label>
                    <Input
                      id="houzzUrl"
                      type="url"
                      value={formData.houzzUrl}
                      onChange={(e) => handleChange('houzzUrl', e.target.value)}
                      placeholder="https://houzz.fr/..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* BLOC 7 - Message libre */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  7. Présentation de l'entreprise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.presentation}
                  onChange={(e) => handleChange('presentation', e.target.value)}
                  placeholder="Présentez votre entreprise, vos chantiers types et votre manière de travailler..."
                  rows={5}
                />
              </CardContent>
            </Card>

            {/* BLOC 8 - Validation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  8. Validation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="certifyAccuracy"
                      checked={formData.certifyAccuracy}
                      onCheckedChange={(checked) => handleChange('certifyAccuracy', checked as boolean)}
                    />
                    <Label htmlFor="certifyAccuracy" className="text-sm cursor-pointer leading-relaxed">
                      Je certifie l'exactitude des informations et documents transmis *
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="acceptContact"
                      checked={formData.acceptContact}
                      onCheckedChange={(checked) => handleChange('acceptContact', checked as boolean)}
                    />
                    <Label htmlFor="acceptContact" className="text-sm cursor-pointer leading-relaxed">
                      J'accepte d'être recontacté dans le cadre d'une collaboration professionnelle *
                    </Label>
                  </div>
                </div>

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

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="cta"
                  size="xl"
                  className="w-full"
                  disabled={isSubmitting || !formData.certifyAccuracy || !formData.acceptContact}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer ma candidature
                    </>
                  )}
                </Button>

                {missingDocuments.length > 0 && (
                  <p className="text-center text-sm text-amber-600">
                    Vous pourrez compléter votre dossier après l'envoi.
                  </p>
                )}
              </CardContent>
            </Card>

          </form>
        </div>
      </section>
    </Layout>
  );
}

// Document Upload Component
interface DocumentUploadProps {
  type: string;
  label: string;
  help: string;
  formats: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

function DocumentUpload({ type, label, help, formats, file, onFileChange }: DocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const isValid = ['application/pdf', 'image/jpeg', 'image/png'].includes(selectedFile.type);
      const isUnderLimit = selectedFile.size <= 10 * 1024 * 1024;
      
      if (isValid && isUnderLimit) {
        onFileChange(selectedFile);
      }
    }
  };

  return (
    <div className={`border rounded-lg p-4 ${file ? 'border-primary bg-primary/5' : 'border-border'}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Label className="font-medium">{label} *</Label>
            {file && <CheckCircle className="w-4 h-4 text-primary" />}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {help} • Formats acceptés : {formats}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {file ? (
            <>
              <span className="text-xs text-muted-foreground max-w-32 truncate">
                {file.name}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onFileChange(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Choisir
            </Button>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={formats.includes('JPG') ? 'application/pdf,image/jpeg,image/png' : 'application/pdf'}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
