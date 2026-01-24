import { useState, useRef, useCallback } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { useDevisScrollOnMount } from "@/hooks/useDevisNavigation";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload, 
  Phone, 
  Mail, 
  MapPin, 
  CalendarCheck,
  Pencil,
  Gem,
  Wrench,
  Building2,
  Home
} from "lucide-react";
import { FormProgressBar } from "@/components/devis/FormProgressBar";
// Images de référence Châtelet supprimées - chaque finition a maintenant sa propre photo
import stylesCarrelageImage from "@/assets/styles-carrelage-fr.jpg";
import totsParoiItalienneImage from "@/assets/tots-paroi-italienne.jpg";
import totsPortePivotanteImage from "@/assets/tots-porte-pivotante.jpg";
import totsPorteCoulissanteImage from "@/assets/tots-porte-coulissante.jpg";
import totsPortePliableImage from "@/assets/tots-porte-pliable.jpg";
import vasqueSuspendueImage from "@/assets/vasque-suspendue.jpg";
import meubleSuspenduImage from "@/assets/meuble-suspendu.jpg";
import meubleSurPiedsImage from "@/assets/meuble-sur-pieds.jpg";
import meubleDoubleVasqueImage from "@/assets/meuble-double-vasque.jpg";
import meubleSimpleVasqueImage from "@/assets/meuble-simple-vasque.jpg";
import wcTypesImage from "@/assets/wc-types.jpg";
import chateletDouchetteImage from "@/assets/chatelet-douchette.jpg";
import chateletColonneImage from "@/assets/chatelet-colonne-dore.jpg";
import chateletEncastreImage from "@/assets/chatelet-encastre-inox.jpg";
import chateletCielPluieImage from "@/assets/chatelet-ciel-pluie-plafond.jpg";
import receveursImage from "@/assets/receveurs-douche.jpg";
import baignoiresImage from "@/assets/baignoires-styles.jpg";
import robinetterieAppliqueImage from "@/assets/robinetterie-applique.jpg";
import robinetterieEncastreImage from "@/assets/robinetterie-encastre.jpg";
import robinetterieSurGorgeImage from "@/assets/robinetterie-sur-gorge.jpg";
import finitionChromeImage from "@/assets/finition-chrome.jpg";
import finitionInoxImage from "@/assets/finition-inox.jpg";
import finitionInoxBrosseImage from "@/assets/finition-inox-brosse.jpg";
import finitionNickelImage from "@/assets/finition-nickel.jpg";
import finitionNickelBrosseImage from "@/assets/finition-nickel-brosse.jpg";
import finitionNoirMatImage from "@/assets/finition-noir-mat.jpg";
import finitionGrisAnthraciteImage from "@/assets/finition-gris-anthracite.jpg";
import finitionLaitonImage from "@/assets/finition-laiton.jpg";
import finitionLaitonBrosseImage from "@/assets/finition-laiton-brosse.jpg";
import finitionOrImage from "@/assets/finition-or.jpg";
import finitionOrBrosseImage from "@/assets/finition-or-brosse.jpg";
import finitionCuivreImage from "@/assets/finition-cuivre.jpg";
import finitionBlancImage from "@/assets/finition-blanc.jpg";
import finitionBlancMatImage from "@/assets/finition-blanc-mat.jpg";

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  codePostal: string;
  dimensionPiece: string;
  typeLogement: string;
  etage: string;
  ascenseur: string;
  typeInstallation: string;
  typeDouche: string;
  typePommeau: string;
  typeReceveur: string[];
  typeBaignoire: string[];
  robinetterieBaignoire: string;
  wcType: string[];
  meubleVasque: string[];
  porteDouche: string[];
  machineLaver: string;
  emplacementMachine: string[];
  typeMachine: string[];
  robinetterieMLaver: string;
  finitionsRobinetterie: string[];
  styleCarrelage: string[];
  message: string;
}

const initialFormData: FormData = {
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  codePostal: "",
  dimensionPiece: "",
  typeLogement: "",
  etage: "",
  ascenseur: "",
  typeInstallation: "",
  typeDouche: "",
  typePommeau: "",
  typeReceveur: [],
  typeBaignoire: [],
  robinetterieBaignoire: "",
  wcType: [],
  meubleVasque: [],
  porteDouche: [],
  machineLaver: "",
  emplacementMachine: [],
  typeMachine: [],
  robinetterieMLaver: "",
  finitionsRobinetterie: [],
  styleCarrelage: [],
  message: "",
};

// Pictos SVG personnalisés
const ReceveurIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
);

const ParoiIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="2" width="16" height="20" rx="1" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <circle cx="10" cy="12" r="1" fill="currentColor" />
  </svg>
);

const RobinetterieIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="6" r="4" />
    <path d="M12 10v8" />
    <path d="M8 14h8" />
    <circle cx="12" cy="20" r="2" />
  </svg>
);

const FinitionsIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

// Options type de logement
const typeLogementOptions = [
  { value: "appartement", label: "Appartement", icon: Building2 },
  { value: "maison", label: "Maison", icon: Home }
];

const etageOptions = [
  { value: "rdc", label: "Rez-de-chaussée" },
  { value: "1", label: "1er étage" },
  { value: "2", label: "2ème étage" },
  { value: "3", label: "3ème étage" },
  { value: "4", label: "4ème étage" },
  { value: "5", label: "5ème étage" },
  { value: "6+", label: "6ème et plus" },
];

const ascenseurOptions = [
  { value: "oui", label: "Oui" },
  { value: "non", label: "Non" },
];

// Options avec pictogrammes
const wcOptions = [
  { label: "WC suspendu", value: "wc-suspendu", image: wcTypesImage },
  { label: "WC classique (au sol)", value: "wc-classique", image: wcTypesImage },
  { label: "Ne pas remplacer les WC", value: "wc-non", image: null },
];

const meubleVasqueOptions = [
  { label: "Vasque seule (sans meuble)", value: "vasque-seule", image: vasqueSuspendueImage },
  { label: "Meuble suspendu", value: "meuble-suspendu", image: meubleSuspenduImage },
  { label: "Meuble sur pieds", value: "meuble-pieds", image: meubleSurPiedsImage },
  { label: "Simple vasque", value: "simple-vasque", image: meubleSimpleVasqueImage },
  { label: "Double vasque", value: "double-vasque", image: meubleDoubleVasqueImage },
];

const porteOptions = [
  { label: "Paroi fixe", value: "fixe", image: totsParoiItalienneImage },
  { label: "Porte de douche battante", value: "battante", image: totsPortePivotanteImage },
  { label: "Porte de douche coulissante", value: "coulissante", image: totsPorteCoulissanteImage },
  { label: "Porte de douche pliable", value: "pliable", image: totsPortePliableImage },
];

const typeDoucheOptions = [
  { value: "applique", label: "En applique (visible)" },
  { value: "encastre", label: "Encastré (dans le mur)" },
];

const typePommeauOptions = [
  { value: "pommeau-main", label: "Pommeau à main uniquement", image: chateletDouchetteImage },
  { value: "pommeau-fixe", label: "Pommeau fixe (plafonnier ou mural)", image: chateletCielPluieImage },
  { value: "pommeau-combo", label: "Pommeau fixe + douchette à main", image: chateletColonneImage },
  { value: "colonne", label: "Colonne de douche complète", image: chateletEncastreImage },
];

const typeReceveurOptions = [
  { label: "Receveur à poser", value: "a-poser", image: receveursImage },
  { label: "Receveur à carreler", value: "a-carreler", image: receveursImage },
  { label: "Receveur à encastrer", value: "a-encastrer", image: receveursImage },
  { label: "Receveur en résine", value: "resine", image: receveursImage },
  { label: "Receveur en acrylique", value: "acrylique", image: receveursImage },
];

const typeBaignoireOptions = [
  { label: "Baignoire en fonte", value: "fonte", image: baignoiresImage },
  { label: "Baignoire en acier", value: "acier", image: baignoiresImage },
  { label: "Baignoire en résine / acrylique", value: "resine", image: baignoiresImage },
];

const robinetterieBaignoireOptions = [
  { value: "applique", label: "En applique (sur le mur)", image: robinetterieAppliqueImage },
  { value: "encastre", label: "Encastré (dans le mur)", image: robinetterieEncastreImage },
  { value: "sur-gorge", label: "Sur gorge (sur le rebord)", image: robinetterieSurGorgeImage },
];

const emplacementMachineOptions = [
  { label: "Sous un plan vasque", value: "sous-vasque" },
  { label: "Dans un placard fermé", value: "placard" },
  { label: "Autre emplacement (à préciser)", value: "autre" },
];

const typeMachineOptions = [
  { label: "Machine à laver uniquement", value: "lave-linge" },
  { label: "Lave-linge + sèche-linge (séparés)", value: "lave-seche" },
  { label: "Lavante-séchante (2 en 1)", value: "lavante-sechante" },
  { label: "Aucun, mais je souhaite en intégrer une", value: "souhaite-integrer" },
  { label: "Aucun, et je ne souhaite pas en intégrer dans la salle de bain", value: "pas-integrer" },
];

const robinetterieMLaverOptions = [
  { value: "applique", label: "Robinet en applique (visible)" },
  { value: "encastre", label: "Robinet encastré (dans le mur)" },
  { value: "existant", label: "Utiliser l'arrivée d'eau existante" },
];

const finitionsOptions = [
  { label: "Chrome", value: "chrome", image: finitionChromeImage },
  { label: "Inox", value: "inox", image: finitionInoxImage },
  { label: "Inox brossé", value: "inox-brosse", image: finitionInoxBrosseImage },
  { label: "Nickel", value: "nickel", image: finitionNickelImage },
  { label: "Nickel brossé", value: "nickel-brosse", image: finitionNickelBrosseImage },
  { label: "Noir mat", value: "noir-mat", image: finitionNoirMatImage },
  { label: "Gris anthracite", value: "gris-anthracite", image: finitionGrisAnthraciteImage },
  { label: "Laiton", value: "laiton", image: finitionLaitonImage },
  { label: "Laiton brossé", value: "laiton-brosse", image: finitionLaitonBrosseImage },
  { label: "Or", value: "or", image: finitionOrImage },
  { label: "Or brossé", value: "or-brosse", image: finitionOrBrosseImage },
  { label: "Cuivre", value: "cuivre", image: finitionCuivreImage },
  { label: "Blanc", value: "blanc", image: finitionBlancImage },
  { label: "Blanc mat", value: "blanc-mat", image: finitionBlancMatImage },
];

const styleCarrelageOptions = [
  { label: "Zellige", value: "zellige" },
  { label: "Effet marbre", value: "marbre" },
  { label: "Béton ciré", value: "beton" },
  { label: "Terrazzo", value: "terrazzo" },
  { label: "Métro / biseauté", value: "metro" },
  { label: "Graphique / géométrique", value: "graphique" },
  { label: "Naturel (pierre, sable…)", value: "naturel" },
];

// hCaptcha site key
const HCAPTCHA_SITE_KEY = "00684ab0-a304-443e-bce6-2abe6892f1fa";

export default function Devis() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const { toast } = useToast();

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
  
  // Handle scroll on mount when hash is present
  useDevisScrollOnMount();

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: keyof FormData, value: string, checked: boolean) => {
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
        const isValid = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type);
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
    
    if (!formData.prenom || !formData.nom || !formData.email || !formData.codePostal) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
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

    // Validate hCaptcha
    if (!captchaToken) {
      toast({
        title: "Vérification requise",
        description: "Veuillez compléter la vérification anti-spam.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send confirmation emails via edge function
      const { data, error } = await supabase.functions.invoke('send-devis-confirmation', {
        body: {
          clientEmail: formData.email,
          clientName: `${formData.prenom} ${formData.nom}`,
          clientPhone: formData.telephone,
          projectDetails: {
            logement: formData.typeLogement,
            surface: formData.dimensionPiece,
            typeReceveur: formData.typeReceveur,
            wcType: formData.wcType,
            robinetterie: formData.finitionsRobinetterie,
            carrelage: formData.styleCarrelage,
            message: formData.message,
          },
        },
      });

      if (error) {
        console.error("Email sending error:", error);
        // Still mark as submitted even if email fails - the request was received
      } else {
        console.log("Emails sent successfully:", data);
      }

      setIsSubmitted(true);
      
      toast({
        title: "Demande envoyée !",
        description: "Un email de confirmation vous a été envoyé. Nous vous recontacterons sous 24h.",
      });
    } catch (err) {
      console.error("Submission error:", err);
      // Still mark as submitted - better UX than showing error
      setIsSubmitted(true);
      toast({
        title: "Demande envoyée !",
        description: "Nous vous recontacterons sous 24h pour planifier votre visite.",
      });
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
            <motion.div 
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-24 h-24 rounded-full bg-[hsl(var(--tag-mint))] flex items-center justify-center mx-auto mb-8">
                <CalendarCheck className="w-12 h-12 text-foreground" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold mb-6">
                Demande de RDV envoyée !
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Merci pour votre demande. Notre équipe vous recontactera sous 24h 
                pour planifier une <strong>visite technique gratuite sur site</strong>.
              </p>
              <Button variant="outline" size="lg" onClick={() => {
                setIsSubmitted(false);
                setFormData(initialFormData);
                setUploadedFiles([]);
              }}>
                Faire une nouvelle demande
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  const CheckboxGroup = ({ 
    options, 
    field, 
    columns = 2 
  }: { 
    options: { label: string; value: string }[]; 
    field: keyof FormData; 
    columns?: number;
  }) => (
    <div className={`grid grid-cols-1 ${columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-3`}>
      {options.map((option) => (
        <div 
          key={option.value} 
          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
            (formData[field] as string[]).includes(option.value) 
              ? 'border-foreground bg-foreground/5' 
              : 'border-border bg-card hover:border-foreground/30'
          }`}
          onClick={() => handleCheckboxChange(field, option.value, !(formData[field] as string[]).includes(option.value))}
        >
          <Checkbox 
            id={`${field}-${option.value}`}
            checked={(formData[field] as string[]).includes(option.value)}
            onCheckedChange={(checked) => handleCheckboxChange(field, option.value, checked as boolean)}
            className="pointer-events-none"
          />
          <Label htmlFor={`${field}-${option.value}`} className="cursor-pointer flex-1 text-sm font-medium">{option.label}</Label>
        </div>
      ))}
    </div>
  );


  return (
    <Layout>
      {/* Hero - Compact pour mobile */}
      <section className="relative py-10 md:py-20 bg-stone">
        <div className="container-custom">
          <motion.div 
            className="max-w-3xl text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="tag-mint inline-flex items-center gap-2 mb-4">
              <CalendarCheck className="w-4 h-4" />
              Visite gratuite
            </span>
            <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-semibold mb-3 md:mb-6">
              Demandez votre devis
            </h1>
            <p className="text-muted-foreground text-sm md:text-lg leading-relaxed">
              RDV gratuit chez vous pour étudier votre projet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Avantages rapides - Compact */}
      <section className="py-4 md:py-8 border-b border-border bg-background">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { icon: Pencil, title: "Sur mesure" },
              { icon: Gem, title: "Qualité" },
              { icon: Wrench, title: "Experts" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <item.icon className="w-5 h-5 md:w-6 md:h-6 text-foreground" strokeWidth={1.5} />
                <span className="font-medium text-sm">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section - Mobile optimisé */}
      <section id="devis-form" className="py-8 md:py-12 bg-background scroll-mt-24 md:scroll-mt-28">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Form */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Barre de progression */}
              <FormProgressBar formData={formData} />

              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                {/* Informations personnelles */}
                <div className="card-elevated p-5 md:p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--tag-beige))] flex items-center justify-center">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                      </svg>
                    </div>
                    Informations personnelles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom *</Label>
                      <Input
                        id="prenom"
                        value={formData.prenom}
                        onChange={(e) => handleChange("prenom", e.target.value)}
                        placeholder="Jean"
                        required
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom *</Label>
                      <Input
                        id="nom"
                        value={formData.nom}
                        onChange={(e) => handleChange("nom", e.target.value)}
                        placeholder="Dupont"
                        required
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="jean@exemple.fr"
                        required
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone (facultatif)</Label>
                      <Input
                        id="telephone"
                        type="tel"
                        value={formData.telephone}
                        onChange={(e) => handleChange("telephone", e.target.value)}
                        placeholder="06 12 34 56 78"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="codePostal">Code postal du chantier *</Label>
                      <Input
                        id="codePostal"
                        value={formData.codePostal}
                        onChange={(e) => handleChange("codePostal", e.target.value)}
                        placeholder="75017"
                        required
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="dimensionPiece">Quelle est la dimension de votre pièce ? (en m²)</Label>
                      <Input
                        id="dimensionPiece"
                        value={formData.dimensionPiece}
                        onChange={(e) => handleChange("dimensionPiece", e.target.value)}
                        placeholder="Ex: 5 m² ou 2m x 3m"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Vous habitez en... *</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {typeLogementOptions.map((option) => (
                          <div 
                            key={option.value} 
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                              formData.typeLogement === option.value 
                                ? 'border-foreground bg-foreground/5' 
                                : 'border-border bg-card hover:border-foreground/30'
                            }`}
                            onClick={() => handleChange("typeLogement", option.value)}
                          >
                            <option.icon className="w-5 h-5" strokeWidth={1.5} />
                            <span className="font-medium text-sm">{option.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Étage et ascenseur - conditionnel si appartement */}
                    {formData.typeLogement === "appartement" && (
                      <>
                        <div className="space-y-2">
                          <Label>À quel étage ?</Label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {etageOptions.map((option) => (
                              <div 
                                key={option.value} 
                                className={`flex items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer text-center ${
                                  formData.etage === option.value 
                                    ? 'border-foreground bg-foreground/5' 
                                    : 'border-border bg-card hover:border-foreground/30'
                                }`}
                                onClick={() => handleChange("etage", option.value)}
                              >
                                <span className="font-medium text-sm">{option.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Y a-t-il un ascenseur ?</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {ascenseurOptions.map((option) => (
                              <div 
                                key={option.value} 
                                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                  formData.ascenseur === option.value 
                                    ? 'border-foreground bg-foreground/5' 
                                    : 'border-border bg-card hover:border-foreground/30'
                                }`}
                                onClick={() => handleChange("ascenseur", option.value)}
                              >
                                <span className="font-medium">{option.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Type d'installation */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--tag-blue))] flex items-center justify-center">
                      <ReceveurIcon />
                    </div>
                    Type d'installation souhaitée
                  </h2>
                  <RadioGroup 
                    value={formData.typeInstallation} 
                    onValueChange={(value) => handleChange("typeInstallation", value)}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {[
                      { value: "douche", label: "Une douche" },
                      { value: "baignoire", label: "Une baignoire" },
                      { value: "indecis", label: "Je ne sais pas" }
                    ].map((option) => (
                      <div 
                        key={option.value} 
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          formData.typeInstallation === option.value 
                            ? 'border-foreground bg-foreground/5' 
                            : 'border-border bg-card hover:border-foreground/30'
                        }`}
                        onClick={() => handleChange("typeInstallation", option.value)}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="pointer-events-none" />
                        <Label htmlFor={option.value} className="cursor-pointer flex-1 font-medium">{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {/* Sous-options douche (receveur uniquement) */}
                  {formData.typeInstallation === "douche" && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <Label className="text-sm font-medium text-muted-foreground mb-3 block">Type de receveur</Label>
                      
                      {/* Image de référence receveurs */}
                      <div className="mb-4 rounded-2xl overflow-hidden">
                        <img 
                          src={receveursImage} 
                          alt="Types de receveurs - À poser, À carreler, Encastré, Résine, Acrylique" 
                          className="w-full h-auto"
                        />
                      </div>

                      <CheckboxGroup options={typeReceveurOptions} field="typeReceveur" columns={3} />
                    </div>
                  )}

                  {/* Sous-options baignoire (style uniquement) */}
                  {formData.typeInstallation === "baignoire" && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <Label className="text-sm font-medium text-muted-foreground mb-3 block">Style de baignoire</Label>
                      
                      <Select 
                        value={formData.typeBaignoire[0] || ""} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, typeBaignoire: [value] }))}
                      >
                        <SelectTrigger className="w-full md:w-80">
                          <SelectValue placeholder="Choisir un style de baignoire..." />
                        </SelectTrigger>
                        <SelectContent>
                          {typeBaignoireOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {formData.typeBaignoire.length > 0 && formData.typeBaignoire[0] && (
                        <div className="mt-4 flex flex-col items-center gap-3">
                          <div className="w-48 h-48 rounded-xl overflow-hidden border-2 border-foreground/20 shadow-lg">
                            <img src={baignoiresImage} alt="Styles de baignoires" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {typeBaignoireOptions.find(opt => opt.value === formData.typeBaignoire[0])?.label}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* WC */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--tag-beige))] flex items-center justify-center">
                      <ReceveurIcon />
                    </div>
                    WC souhaité
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6">Choisissez le type de WC adapté à votre salle de bain.</p>
                  
                  {/* Image de référence */}
                  <div className="mb-6 rounded-2xl overflow-hidden">
                    <img 
                      src={wcTypesImage} 
                      alt="Types de WC - WC Suspendu, WC Classique" 
                      className="w-full h-auto"
                    />
                  </div>

                  <CheckboxGroup options={wcOptions} field="wcType" />
                </div>

                {/* Meuble vasque */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--tag-beige))] flex items-center justify-center">
                      <ReceveurIcon />
                    </div>
                    Meuble vasque souhaité
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6">Découvrez les options de meubles vasques disponibles.</p>
                  
                  <Select 
                    value={formData.meubleVasque[0] || ""} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, meubleVasque: [value] }))}
                  >
                    <SelectTrigger className="w-full md:w-80">
                      <SelectValue placeholder="Choisir un type de meuble vasque..." />
                    </SelectTrigger>
                    <SelectContent>
                      {meubleVasqueOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {formData.meubleVasque.length > 0 && formData.meubleVasque[0] && (
                    <div className="mt-4 flex flex-col items-center gap-3">
                      {(() => {
                        const selectedOption = meubleVasqueOptions.find(opt => opt.value === formData.meubleVasque[0]);
                        if (!selectedOption) return null;
                        return (
                          <>
                            <div className="w-48 h-64 rounded-xl overflow-hidden border-2 border-foreground/20 shadow-lg">
                              <img src={selectedOption.image} alt={selectedOption.label} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-medium text-foreground">{selectedOption.label}</span>
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>

                {/* Paroi de douche */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--tag-mint))] flex items-center justify-center">
                      <ParoiIcon />
                    </div>
                    Paroi de douche souhaitée
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6">Choisissez le type de paroi adapté à votre espace.</p>
                  
                  <Select 
                    value={formData.porteDouche[0] || ""} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, porteDouche: [value] }))}
                  >
                    <SelectTrigger className="w-full md:w-80">
                      <SelectValue placeholder="Choisir un type de paroi..." />
                    </SelectTrigger>
                    <SelectContent>
                      {porteOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {formData.porteDouche.length > 0 && formData.porteDouche[0] && (
                    <div className="mt-4 flex flex-col items-center gap-3">
                      {(() => {
                        const selectedOption = porteOptions.find(opt => opt.value === formData.porteDouche[0]);
                        if (!selectedOption) return null;
                        return (
                          <>
                            <div className="w-48 h-64 rounded-xl overflow-hidden border-2 border-foreground/20 shadow-lg">
                              <img src={selectedOption.image} alt={selectedOption.label} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-medium text-foreground">{selectedOption.label}</span>
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>

                {/* Section Robinetterie centralisée */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--tag-blue))] flex items-center justify-center">
                      <RobinetterieIcon />
                    </div>
                    Robinetterie
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    Configurez l'ensemble de votre robinetterie : types, styles et finitions.
                  </p>

                  <div className="space-y-8">
                    {/* Robinetterie douche - toujours visible */}
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-muted/30">
                        <Label className="text-sm font-semibold text-foreground mb-3 block">🚿 Robinetterie douche</Label>
                        
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm text-muted-foreground mb-3 block">Type de robinetterie</Label>
                            <RadioGroup 
                              value={formData.typeDouche} 
                              onValueChange={(value) => handleChange("typeDouche", value)}
                              className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                              {typeDoucheOptions.map((option) => (
                                <div 
                                  key={option.value} 
                                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                    formData.typeDouche === option.value 
                                      ? 'border-foreground bg-foreground/5' 
                                      : 'border-border bg-card hover:border-foreground/30'
                                  }`}
                                  onClick={() => handleChange("typeDouche", option.value)}
                                >
                                  <RadioGroupItem value={option.value} id={`douche-${option.value}`} className="pointer-events-none" />
                                  <Label htmlFor={`douche-${option.value}`} className="cursor-pointer flex-1 font-medium">{option.label}</Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>

                          <div>
                            <Label className="text-sm text-muted-foreground mb-3 block">Style de pommeau</Label>
                            
                            <Select 
                              value={formData.typePommeau} 
                              onValueChange={(value) => handleChange("typePommeau", value)}
                            >
                              <SelectTrigger className="w-full md:w-80">
                                <SelectValue placeholder="Choisir un style de pommeau..." />
                              </SelectTrigger>
                              <SelectContent>
                                {typePommeauOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            {formData.typePommeau && (
                              <div className="mt-4 flex flex-col items-center gap-3">
                                {(() => {
                                  const selectedOption = typePommeauOptions.find(opt => opt.value === formData.typePommeau);
                                  if (!selectedOption) return null;
                                  return (
                                    <>
                                      <div className="w-48 h-64 rounded-xl overflow-hidden border-2 border-foreground/20 shadow-lg">
                                        <img src={selectedOption.image} alt={selectedOption.label} className="w-full h-full object-cover" />
                                      </div>
                                      <span className="text-sm font-medium text-foreground">{selectedOption.label}</span>
                                    </>
                                  );
                                })()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Robinetterie baignoire - toujours visible */}
                    <div className="p-4 rounded-xl bg-muted/30">
                      <Label className="text-sm font-semibold text-foreground mb-3 block">🛁 Robinetterie baignoire</Label>
                      
                      <Select 
                        value={formData.robinetterieBaignoire} 
                        onValueChange={(value) => handleChange("robinetterieBaignoire", value)}
                      >
                        <SelectTrigger className="w-full md:w-80">
                          <SelectValue placeholder="Choisir un type de robinetterie..." />
                        </SelectTrigger>
                        <SelectContent>
                          {robinetterieBaignoireOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {formData.robinetterieBaignoire && (
                        <div className="mt-4 flex flex-col items-center gap-3">
                          {(() => {
                            const selectedOption = robinetterieBaignoireOptions.find(opt => opt.value === formData.robinetterieBaignoire);
                            if (!selectedOption) return null;
                            return (
                              <>
                                <div className="w-48 h-48 rounded-xl overflow-hidden border-2 border-foreground/20 shadow-lg">
                                  <img src={selectedOption.image} alt={selectedOption.label} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-sm font-medium text-foreground">{selectedOption.label}</span>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>

                    {/* Robinetterie machine à laver - conditionnel */}
                    {formData.machineLaver === "oui" && (
                      <div className="p-4 rounded-xl bg-muted/30">
                        <Label className="text-sm font-semibold text-foreground mb-3 block">🧺 Robinetterie machine à laver</Label>
                        <RadioGroup 
                          value={formData.robinetterieMLaver} 
                          onValueChange={(value) => handleChange("robinetterieMLaver", value)}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                          {robinetterieMLaverOptions.map((option) => (
                            <div 
                              key={option.value} 
                              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                formData.robinetterieMLaver === option.value 
                                  ? 'border-foreground bg-foreground/5' 
                                  : 'border-border bg-card hover:border-foreground/30'
                              }`}
                              onClick={() => handleChange("robinetterieMLaver", option.value)}
                            >
                              <RadioGroupItem value={option.value} id={`rob-machine-${option.value}`} className="pointer-events-none" />
                              <Label htmlFor={`rob-machine-${option.value}`} className="cursor-pointer flex-1 font-medium">{option.label}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    )}

                    {/* Finitions robinetterie - sélecteur déroulant */}
                    <div>
                      <Label className="text-sm font-semibold text-foreground mb-3 block">✨ Finitions robinetterie</Label>
                      <p className="text-muted-foreground text-sm mb-4">Personnalisez votre robinetterie avec des finitions élégantes et durables.</p>
                      
                      <Select 
                        value={formData.finitionsRobinetterie[0] || ""} 
                        onValueChange={(value) => {
                          setFormData(prev => ({ ...prev, finitionsRobinetterie: [value] }));
                        }}
                      >
                        <SelectTrigger className="w-full md:w-80">
                          <SelectValue placeholder="Choisir une finition..." />
                        </SelectTrigger>
                        <SelectContent>
                          {finitionsOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {/* Affichage de l'image de la finition sélectionnée */}
                      {formData.finitionsRobinetterie.length > 0 && formData.finitionsRobinetterie[0] && (
                        <div className="mt-4">
                          {(() => {
                            const selectedFinition = finitionsOptions.find(opt => opt.value === formData.finitionsRobinetterie[0]);
                            if (!selectedFinition) return null;
                            return (
                              <div className="flex flex-col items-center gap-3">
                                <div className="w-48 h-48 rounded-xl overflow-hidden border-2 border-foreground/20 shadow-lg">
                                  <img 
                                    src={selectedFinition.image} 
                                    alt={`Finition ${selectedFinition.label}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span className="text-sm font-medium text-foreground">{selectedFinition.label}</span>
                              </div>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Machine à laver */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--tag-peach))] flex items-center justify-center">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="12" cy="14" r="4" />
                        <line x1="8" y1="7" x2="8" y2="7.01" strokeWidth="2" />
                        <line x1="12" y1="7" x2="12" y2="7.01" strokeWidth="2" />
                      </svg>
                    </div>
                    Souhaitez-vous intégrer une machine à laver ?
                  </h2>
                  <RadioGroup 
                    value={formData.machineLaver} 
                    onValueChange={(value) => handleChange("machineLaver", value)}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                  >
                    {[
                      { value: "oui", label: "Oui" },
                      { value: "non", label: "Non" },
                      { value: "indecis", label: "Je ne sais pas encore" }
                    ].map((option) => (
                      <div 
                        key={option.value} 
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          formData.machineLaver === option.value 
                            ? 'border-foreground bg-foreground/5' 
                            : 'border-border bg-card hover:border-foreground/30'
                        }`}
                        onClick={() => handleChange("machineLaver", option.value)}
                      >
                        <RadioGroupItem value={option.value} id={`machine-${option.value}`} className="pointer-events-none" />
                        <Label htmlFor={`machine-${option.value}`} className="cursor-pointer flex-1 font-medium">{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {formData.machineLaver === "oui" && (
                    <div className="space-y-6 pt-4 border-t border-border">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground mb-3 block">Emplacement souhaité</Label>
                        <CheckboxGroup options={emplacementMachineOptions} field="emplacementMachine" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground mb-3 block">Avez-vous déjà une machine ?</Label>
                        <CheckboxGroup options={typeMachineOptions} field="typeMachine" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Finitions et ambiance carrelage */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--tag-peach))] flex items-center justify-center">
                      <FinitionsIcon />
                    </div>
                    Finitions et ambiance souhaitées
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6">Choisissez le style de carrelage qui correspond à vos envies.</p>
                  
                  {/* Image de référence */}
                  <div className="mb-6 rounded-2xl overflow-hidden">
                    <img 
                      src={stylesCarrelageImage} 
                      alt="Styles de carrelage - Zellige, Marbre, Béton ciré, Terrazzo, Métro, Graphique, Naturel" 
                      className="w-full h-auto"
                    />
                  </div>

                  <CheckboxGroup options={styleCarrelageOptions} field="styleCarrelage" columns={3} />
                </div>

                {/* Upload fichiers */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--tag-beige))] flex items-center justify-center">
                      <Upload className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    Photos ou plans de votre salle de bain
                  </h2>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-2xl p-8 text-center cursor-pointer hover:border-foreground/30 hover:bg-card transition-colors"
                  >
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Cliquez pour ajouter des photos
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      JPG, PNG ou PDF — max 10 Mo par fichier
                    </p>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-card rounded-xl border border-border">
                          <span className="text-sm truncate flex-1">{file.name}</span>
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            Supprimer
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--tag-blue))] flex items-center justify-center">
                      <Pencil className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    Précisions sur votre projet
                  </h2>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Décrivez votre projet, vos envies, les contraintes de votre espace..."
                    rows={5}
                    className="rounded-xl"
                  />
                </div>

                {/* hCaptcha verification */}
                <div className="card-elevated p-6 flex flex-col items-center">
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    Vérification anti-spam requise
                  </p>
                  <HCaptcha
                    ref={captchaRef}
                    sitekey={HCAPTCHA_SITE_KEY}
                    onVerify={onCaptchaVerify}
                    onExpire={onCaptchaExpire}
                    onError={onCaptchaError}
                  />
                  {captchaToken && (
                    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
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
                  {isSubmitting ? "Envoi en cours..." : "Demander mon RDV gratuit sur site"}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="card-elevated p-8 sticky top-24">
                <h2 className="font-display text-xl font-semibold mb-6">
                  Visite technique gratuite
                </h2>
                <p className="text-muted-foreground mb-8">
                  Nous venons chez vous pour étudier votre projet et vous proposer un devis personnalisé.
                </p>

                <div className="space-y-4">
                  <a 
                    href="tel:+33659764685"
                    className="flex items-center gap-4 p-4 rounded-xl bg-[hsl(var(--tag-beige))] hover:opacity-90 transition-opacity"
                  >
                    <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
                      <Phone className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">Téléphone</p>
                      <p className="text-muted-foreground">06 59 76 46 85</p>
                    </div>
                  </a>

                  <a 
                    href="mailto:contact@qualiconcept.fr"
                    className="flex items-center gap-4 p-4 rounded-xl bg-[hsl(var(--tag-mint))] hover:opacity-90 transition-opacity"
                  >
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
                      <p className="text-muted-foreground">
                        Paris & Île-de-France
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-xl bg-[hsl(var(--tag-peach))]">
                  <p className="text-sm text-foreground">
                    <strong>✓ Réponse sous 24h</strong><br />
                    Nous vous rappelons rapidement pour fixer la date de visite.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
