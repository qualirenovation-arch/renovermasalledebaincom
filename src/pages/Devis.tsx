import { useState, useRef, useCallback, useEffect } from "react";
import { useVirtualKeyboard } from "@/hooks/useVirtualKeyboard";
import { useSearchParams } from "react-router-dom";
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
import { OGTags } from "@/components/seo/OGTags";
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
  Home,
  Loader2
} from "lucide-react";
import { FormProgressBar } from "@/components/devis/FormProgressBar";
import { DevisTypeSelector } from "@/components/devis/DevisTypeSelector";
import { WaterDamageQuoteForm } from "@/components/devis/WaterDamageQuoteForm";
import { WaterDamageStep2Form } from "@/components/devis/WaterDamageStep2Form";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";
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
import carrelageZelligeImage from "@/assets/carrelage-zellige.jpg";
import carrelageMarbeImage from "@/assets/carrelage-marbre.jpg";
import carrelageBetonImage from "@/assets/carrelage-beton.jpg";
import carrelageTerazzoImage from "@/assets/carrelage-terrazzo.jpg";
import carrelageMetroImage from "@/assets/carrelage-metro.jpg";
import carrelageGraphiqueImage from "@/assets/carrelage-graphique.jpg";
import carrelageNaturelImage from "@/assets/carrelage-naturel.jpg";

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
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
  adresse: "",
  ville: "",
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
  { label: "Zellige", value: "zellige", image: carrelageZelligeImage },
  { label: "Effet marbre", value: "marbre", image: carrelageMarbeImage },
  { label: "Béton ciré", value: "beton", image: carrelageBetonImage },
  { label: "Terrazzo", value: "terrazzo", image: carrelageTerazzoImage },
  { label: "Métro / biseauté", value: "metro", image: carrelageMetroImage },
  { label: "Graphique / géométrique", value: "graphique", image: carrelageGraphiqueImage },
  { label: "Naturel (pierre, sable…)", value: "naturel", image: carrelageNaturelImage },
];

// hCaptcha site key - use test key in preview/dev environments
const isPreviewOrDev = typeof window !== 'undefined' && (
  window.location.hostname.includes('lovable.app') || 
  window.location.hostname.includes('lovableproject.com') || 
  window.location.hostname === 'localhost'
);
const HCAPTCHA_SITE_KEY = isPreviewOrDev 
  ? "10000000-ffff-ffff-ffff-000000000001" 
  : "00684ab0-a304-443e-bce6-2abe6892f1fa";

// In preview/dev, override the captcha token to use the server-side bypass token
const getEffectiveCaptchaToken = (token: string | null) => {
  if (isPreviewOrDev && token) return "test-token";
  return token;
};

export default function Devis() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [devisType, setDevisType] = useState<'selector' | 'classique' | 'degat_eaux'>('selector');
  const [leadToken, setLeadToken] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [leadTypeDevis, setLeadTypeDevis] = useState<string | null>(null);
  const [leadFirstName, setLeadFirstName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [isLoadingLead, setIsLoadingLead] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const { toast } = useToast();
  useVirtualKeyboard();

  // Check URL params for direct form access or token
  useEffect(() => {
    const typeParam = searchParams.get('type');
    const tokenParam = searchParams.get('token');
    
    if (tokenParam) {
      // Token-based access from Step 1 email
      setLeadToken(tokenParam);
      setIsLoadingLead(true);
      
      // Load lead data
      const loadLead = async () => {
        try {
          const { data: fnData, error: fnError } = await supabase.functions.invoke('lookup-lead-by-token', {
            body: { token: tokenParam },
          });
          
          if (fnError || !fnData || fnData.error) {
            const msg = fnData?.error || "Ce lien n'est plus valide.";
            toast({ title: "Lien invalide", description: msg, variant: "destructive" });
            setIsLoadingLead(false);
            return;
          }
          
          setLeadId(fnData.id);
          setLeadTypeDevis(fnData.typeDevis);
          setLeadFirstName(fnData.clientFirstName || "");
          setLeadEmail(fnData.clientEmail || "");
          
          // Route to correct form type
          if (fnData.typeDevis === 'degat_des_eaux') {
            setDevisType('degat_eaux');
          } else {
            setDevisType('classique');
          }
          
          // Pre-fill form with existing data (for classic)
          setFormData(prev => ({
            ...prev,
            prenom: fnData.clientFirstName || "",
            nom: fnData.clientLastName || "",
            email: fnData.clientEmail || "",
            telephone: fnData.clientPhone || "",
            adresse: fnData.propertyAddress || "",
            ville: fnData.propertyCity || "",
            codePostal: fnData.propertyPostalCode || "",
          }));
          
          // Scroll to technical questions after a short delay
          setTimeout(() => {
            const technicalSection = document.getElementById('section-logement');
            if (technicalSection) {
              technicalSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 500);
        } catch (err) {
          console.error("Error loading lead:", err);
        } finally {
          setIsLoadingLead(false);
        }
      };
      
      loadLead();
    } else if (typeParam === 'degat_eaux') {
      setDevisType('degat_eaux');
    } else if (typeParam === 'classique') {
      setDevisType('classique');
    }
  }, [searchParams, toast]);

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

    // Validate hCaptcha — skip for token-based step 2 (already verified at step 1)
    if (!leadToken && !captchaToken) {
      toast({
        title: "Vérification requise",
        description: "Veuillez compléter la vérification anti-spam.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Upload photos if any
      let photoUrls: string[] = [];
      if (uploadedFiles.length > 0 && leadId) {
        for (const file of uploadedFiles) {
          const filePath = `${leadId}/${Date.now()}-${file.name}`;
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('project-photos')
            .upload(filePath, file);
          
          if (!uploadError && uploadData) {
            photoUrls.push(uploadData.path);
          }
        }
      }

      if (leadToken && leadId) {
        // Step 2: Update existing lead
        const { data: updateData, error: updateError } = await supabase.functions.invoke('send-devis-confirmation', {
          body: {
            clientEmail: formData.email,
            clientFirstName: formData.prenom,
            clientLastName: formData.nom,
            clientPhone: formData.telephone,
            captchaToken: getEffectiveCaptchaToken(captchaToken),
            leadId: leadId,
            photoUrls: photoUrls,
            projectDetails: {
              logement: formData.typeLogement,
              adresse: formData.adresse,
              ville: formData.ville,
              codePostal: formData.codePostal,
              etage: formData.etage,
              ascenseur: formData.ascenseur,
              surface: formData.dimensionPiece,
              typeInstallation: formData.typeInstallation,
              typeDouche: formData.typeDouche,
              typePommeau: formData.typePommeau,
              typeReceveur: formData.typeReceveur,
              typeBaignoire: formData.typeBaignoire,
              robinetterieBaignoire: formData.robinetterieBaignoire,
              wcType: formData.wcType,
              meubleVasque: formData.meubleVasque,
              porteDouche: formData.porteDouche,
              machineLaver: formData.machineLaver,
              emplacementMachine: formData.emplacementMachine,
              typeMachine: formData.typeMachine,
              robinetterieMLaver: formData.robinetterieMLaver,
              robinetterie: formData.finitionsRobinetterie,
              carrelage: formData.styleCarrelage,
              message: formData.message,
            },
          },
        });

        if (updateError || !updateData?.success) {
          const backendMessage = (updateData as { error?: string } | null)?.error;
          throw new Error(backendMessage || "Le dossier n'a pas pu être envoyé. Veuillez réessayer.");
        }
      } else {
        // Direct access (no token): standard flow
        const { data, error } = await supabase.functions.invoke('send-devis-confirmation', {
          body: {
            clientEmail: formData.email,
            clientFirstName: formData.prenom,
            clientLastName: formData.nom,
            clientPhone: formData.telephone,
            captchaToken: getEffectiveCaptchaToken(captchaToken),
            projectDetails: {
              logement: formData.typeLogement,
              adresse: formData.adresse,
              ville: formData.ville,
              codePostal: formData.codePostal,
              etage: formData.etage,
              ascenseur: formData.ascenseur,
              surface: formData.dimensionPiece,
              typeInstallation: formData.typeInstallation,
              typeDouche: formData.typeDouche,
              typePommeau: formData.typePommeau,
              typeReceveur: formData.typeReceveur,
              typeBaignoire: formData.typeBaignoire,
              robinetterieBaignoire: formData.robinetterieBaignoire,
              wcType: formData.wcType,
              meubleVasque: formData.meubleVasque,
              porteDouche: formData.porteDouche,
              machineLaver: formData.machineLaver,
              emplacementMachine: formData.emplacementMachine,
              typeMachine: formData.typeMachine,
              robinetterieMLaver: formData.robinetterieMLaver,
              robinetterie: formData.finitionsRobinetterie,
              carrelage: formData.styleCarrelage,
              message: formData.message,
            },
          },
        });

        if (error) {
          console.error("Edge function invocation error:", error);
          throw new Error(`Erreur de connexion au serveur : ${error.message || "Erreur réseau"}. Vérifiez votre connexion internet et réessayez.`);
        }

        if (!data?.success) {
          const backendMessage = (data as { error?: string } | null)?.error;
          console.error("Backend error:", backendMessage);
          throw new Error(backendMessage || "La demande n'a pas pu être traitée. Veuillez réessayer.");
        }
      }

      setIsSubmitted(true);
      
      toast({
        title: "Demande envoyée !",
        description: "Un email de confirmation vous a été envoyé. Nous vous recontacterons sous 24h.",
      });
    } catch (err) {
      console.error("Submission error:", err);
      toast({
        title: "Échec de l'envoi",
        description: err instanceof Error ? err.message : "Impossible d'envoyer votre demande pour le moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
    }
  };

  if (isLoadingLead) {
    return (
      <Layout>
        <section className="section-padding min-h-[70vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Chargement de votre projet...</p>
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
                <CalendarCheck className="w-12 h-12 text-foreground" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold mb-6">
                Demande complète envoyée !
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Merci pour votre demande détaillée. Notre équipe vous recontactera sous 24h 
                pour planifier une <strong>visite technique gratuite sur site</strong>.
              </p>
              
              <div className="bg-accent/30 rounded-xl p-6 mb-8 text-left">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground mb-1">Email de confirmation envoyé</p>
                    <p className="text-muted-foreground text-sm">
                      Vous allez recevoir un récapitulatif de votre demande à l'adresse email indiquée, 
                      avec les détails de votre projet et les prochaines étapes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg" asChild>
                  <a href="/">Retourner sur le site</a>
                </Button>
              </div>
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
      <OGTags
        title="Devis rénovation salle de bain"
        description="Demandez votre devis gratuit pour la rénovation de votre salle de bain à Paris. Un chantier heureux, sans stress et sans imprévus. Réponse sous 48h."
        path="/devis/completer"
      />
      {/* Hero - Step 2 intro when accessed via token */}
      <section className="relative py-12 md:py-20 bg-gradient-to-b from-stone to-background overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative">
          <motion.div 
            className="max-w-3xl text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="tag-mint inline-flex items-center gap-2 mb-5">
              <CalendarCheck className="w-4 h-4" />
              Visite gratuite
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 md:mb-6 tracking-tight text-primary">
              {leadToken ? "Affinons votre projet" : "Demandez votre devis gratuit"}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
              {leadToken 
                ? "Merci pour ces premières informations. Ces précisions nous permettront de préparer efficacement la visite technique."
                : "Un chantier heureux commence par une bonne préparation. RDV gratuit chez vous pour étudier votre projet."
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Avantages rapides - Premium pills */}
      <section className="py-6 md:py-8 bg-background border-b border-border/50">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            {[
              { icon: Pencil, title: "Sur mesure" },
              { icon: Gem, title: "Qualité premium" },
              { icon: Wrench, title: "Experts certifiés" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2.5 px-4 py-2.5 bg-card rounded-full border border-border/50 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-white border border-border flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <span className="font-medium text-sm">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section - Premium layout */}
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
              {leadToken && leadId && leadTypeDevis === 'degat_des_eaux' ? (
                <WaterDamageStep2Form
                  leadId={leadId}
                  clientFirstName={leadFirstName}
                  clientEmail={leadEmail}
                />
              ) : (
                <WaterDamageQuoteForm onBack={() => setDevisType('selector')} />
              )}
            </div>
          )}

          {/* Classic Form */}
          {devisType === 'classique' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Back button */}
              <Button type="button" variant="ghost" onClick={() => setDevisType('selector')} className="mb-4">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Choisir un autre type de devis
              </Button>

              {/* Barre de progression */}
              <FormProgressBar formData={formData} />

              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8" autoComplete="off">
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
                        autoComplete="off"
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
                        autoComplete="off"
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
                        autoComplete="off"
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
                        autoComplete="off"
                      />
                    </div>
                    
                    {/* Adresse avec autocomplétion */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="adresse">Adresse du chantier *</Label>
                      <AddressAutocomplete
                        id="adresse"
                        value={formData.adresse}
                        onChange={(value) => handleChange("adresse", value)}
                        onAddressSelect={(address) => {
                          if (address.city) handleChange("ville", address.city);
                          if (address.postcode) handleChange("codePostal", address.postcode);
                        }}
                        placeholder="Commencez à taper votre adresse..."
                        required
                        className="rounded-xl"
                      />
                    </div>
                    
                    {/* Ville et Code Postal sur la même ligne */}
                    <div className="space-y-2">
                      <Label htmlFor="ville">Ville *</Label>
                      <Input
                        id="ville"
                        value={formData.ville}
                        onChange={(e) => handleChange("ville", e.target.value)}
                        placeholder="Paris"
                        required
                        className="rounded-xl"
                        autoComplete="off"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="codePostal">Code postal *</Label>
                      <Input
                        id="codePostal"
                        value={formData.codePostal}
                        onChange={(e) => handleChange("codePostal", e.target.value)}
                        placeholder="75017"
                        required
                        className="rounded-xl"
                        autoComplete="off"
                      />
                    </div>
                    
                    <div id="section-logement" className="space-y-2 md:col-span-2 scroll-mt-28">
                      <Label htmlFor="dimensionPiece">Quelle est la dimension de votre pièce ? (en m²)</Label>
                      <Input
                        id="dimensionPiece"
                        value={formData.dimensionPiece}
                        onChange={(e) => handleChange("dimensionPiece", e.target.value)}
                        placeholder="Ex: 5 m² ou 2m x 3m"
                        className="rounded-xl"
                        autoComplete="off"
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
                      
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
                          <div className="flex items-center gap-4 ml-auto">
                            <span className="text-sm font-medium text-foreground hidden md:block">
                              {typeBaignoireOptions.find(opt => opt.value === formData.typeBaignoire[0])?.label}
                            </span>
                            <div className="w-40 h-40 rounded-xl overflow-hidden border-2 border-foreground/20 shadow-lg shrink-0">
                              <img src={baignoiresImage} alt="Styles de baignoires" className="w-full h-full object-cover" />
                            </div>
                          </div>
                        )}
                      </div>
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
                  <p className="text-muted-foreground text-sm mb-4">Découvrez les options de meubles vasques disponibles.</p>
                  
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
                      (() => {
                        const selectedOption = meubleVasqueOptions.find(opt => opt.value === formData.meubleVasque[0]);
                        if (!selectedOption) return null;
                        return (
                          <div className="flex items-center gap-4 ml-auto">
                            <span className="text-sm font-medium text-foreground hidden md:block">{selectedOption.label}</span>
                            <div className="w-40 h-52 rounded-xl overflow-hidden border-2 border-foreground/20 shadow-lg shrink-0">
                              <img src={selectedOption.image} alt={selectedOption.label} className="w-full h-full object-cover" />
                            </div>
                          </div>
                        );
                      })()
                    )}
                  </div>
                </div>

                {/* Paroi de douche - visible seulement si douche ou indécis */}
                {(formData.typeInstallation === "douche" || formData.typeInstallation === "indecis" || !formData.typeInstallation) && (
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--tag-mint))] flex items-center justify-center">
                      <ParoiIcon />
                    </div>
                    Paroi de douche souhaitée
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4">Choisissez le type de paroi adapté à votre espace.</p>
                  
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
                      (() => {
                        const selectedOption = porteOptions.find(opt => opt.value === formData.porteDouche[0]);
                        if (!selectedOption) return null;
                        return (
                          <div className="flex items-center gap-4 ml-auto">
                            <span className="text-sm font-medium text-foreground hidden md:block">{selectedOption.label}</span>
                            <div className="w-40 h-52 rounded-xl overflow-hidden border-2 border-foreground/20 shadow-lg shrink-0">
                              <img src={selectedOption.image} alt={selectedOption.label} className="w-full h-full object-cover" />
                            </div>
                          </div>
                        );
                      })()
                    )}
                  </div>
                </div>
                )}

                {/* Pare-bain - visible seulement si baignoire */}
                {formData.typeInstallation === "baignoire" && (
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--tag-mint))] flex items-center justify-center">
                      <ParoiIcon />
                    </div>
                    Pare-bain souhaité
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4">Choisissez le type de pare-bain adapté à votre baignoire.</p>
                  
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <Select 
                      value={formData.porteDouche[0] || ""} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, porteDouche: [value] }))}
                    >
                      <SelectTrigger className="w-full md:w-80">
                        <SelectValue placeholder="Choisir un type de pare-bain..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixe">Pare-bain fixe (1 panneau)</SelectItem>
                        <SelectItem value="battant">Pare-bain battant (rabattable)</SelectItem>
                        <SelectItem value="coulissant">Pare-bain coulissant (2+ panneaux)</SelectItem>
                      </SelectContent>
                    </Select>

                    {formData.porteDouche.length > 0 && formData.porteDouche[0] && (
                      <div className="flex items-center gap-4 ml-auto">
                        <span className="text-sm font-medium text-foreground hidden md:block">
                          {formData.porteDouche[0] === "fixe" ? "Pare-bain fixe" : 
                           formData.porteDouche[0] === "battant" ? "Pare-bain battant" : 
                           formData.porteDouche[0] === "coulissant" ? "Pare-bain coulissant" : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                )}

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
                    {/* Robinetterie douche - visible si douche ou indécis */}
                    {(formData.typeInstallation === "douche" || formData.typeInstallation === "indecis" || !formData.typeInstallation) && (
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
                            
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
                                (() => {
                                  const selectedOption = typePommeauOptions.find(opt => opt.value === formData.typePommeau);
                                  if (!selectedOption) return null;
                                  return (
                                    <div className="flex items-center gap-4 ml-auto">
                                      <span className="text-sm font-medium text-foreground hidden md:block">{selectedOption.label}</span>
                                      <div className="w-40 h-52 rounded-xl overflow-hidden border-2 border-foreground/20 shadow-lg shrink-0">
                                        <img src={selectedOption.image} alt={selectedOption.label} className="w-full h-full object-cover" />
                                      </div>
                                    </div>
                                  );
                                })()
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    )}

                    {/* Robinetterie baignoire - visible si baignoire ou indécis */}
                    {(formData.typeInstallation === "baignoire" || formData.typeInstallation === "indecis" || !formData.typeInstallation) && (
                    <div className="p-4 rounded-xl bg-muted/30">
                      <Label className="text-sm font-semibold text-foreground mb-3 block">🛁 Robinetterie baignoire</Label>
                      
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
                      (() => {
                        const selectedOption = robinetterieBaignoireOptions.find(opt => opt.value === formData.robinetterieBaignoire);
                        if (!selectedOption) return null;
                        return (
                              <div className="flex items-center gap-4 ml-auto">
                                <span className="text-sm font-medium text-foreground hidden md:block">{selectedOption.label}</span>
                                <div className="w-40 h-40 rounded-xl overflow-hidden border-2 border-foreground/20 shadow-lg shrink-0">
                                  <img src={selectedOption.image} alt={selectedOption.label} className="w-full h-full object-cover" />
                                </div>
                              </div>
                            );
                          })()
                        )}
                      </div>
                    </div>
                    )}

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
                      
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

                        {formData.finitionsRobinetterie.length > 0 && formData.finitionsRobinetterie[0] && (
                          (() => {
                            const selectedFinition = finitionsOptions.find(opt => opt.value === formData.finitionsRobinetterie[0]);
                            if (!selectedFinition) return null;
                            return (
                              <div className="flex items-center gap-4 ml-auto">
                                <span className="text-sm font-medium text-foreground hidden md:block">{selectedFinition.label}</span>
                                <div className="w-40 h-40 rounded-xl overflow-hidden border-2 border-foreground/20 shadow-lg shrink-0">
                                  <img 
                                    src={selectedFinition.image} 
                                    alt={`Finition ${selectedFinition.label}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                            );
                          })()
                        )}
                      </div>
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
                  <p className="text-muted-foreground text-sm mb-6">Sélectionnez un ou plusieurs styles qui vous inspirent.</p>
                  
                  {/* Grille de boutons image cliquables */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {styleCarrelageOptions.map((option) => {
                      const isSelected = formData.styleCarrelage.includes(option.value);
                      return (
                        <div
                          key={option.value}
                          onClick={() => handleCheckboxChange("styleCarrelage", option.value, !isSelected)}
                          className={`relative cursor-pointer rounded-xl overflow-hidden border-3 transition-all duration-200 hover:scale-[1.02] ${
                            isSelected 
                              ? 'border-foreground ring-2 ring-foreground/20 shadow-lg' 
                              : 'border-border hover:border-foreground/40'
                          }`}
                        >
                          <div className="aspect-square">
                            <img 
                              src={option.image} 
                              alt={option.label} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className={`absolute inset-0 flex items-end justify-center p-3 bg-gradient-to-t from-black/70 via-black/20 to-transparent`}>
                            <span className="text-white text-sm font-medium text-center drop-shadow-md">
                              {option.label}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
                              <svg className="w-4 h-4 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {formData.styleCarrelage.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="text-sm text-muted-foreground">Sélection :</span>
                      {formData.styleCarrelage.map((value) => {
                        const option = styleCarrelageOptions.find(o => o.value === value);
                        return (
                          <span key={value} className="text-sm font-medium bg-foreground/10 px-3 py-1 rounded-full">
                            {option?.label}
                          </span>
                        );
                      })}
                    </div>
                  )}
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
                  disabled={isSubmitting || (!leadToken && !captchaToken)}
                >
                  <CalendarCheck className="w-5 h-5 mr-2" />
                  {isSubmitting ? "Envoi en cours..." : leadToken ? "👉 Envoyer ma demande complète" : "Demander mon RDV gratuit sur site"}
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
                    <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" strokeWidth={1.5} />
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
                    <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">contact@qualiconcept.fr</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-[hsl(var(--tag-blue))]">
                    <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" strokeWidth={1.5} />
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
          )}
        </div>
      </section>
    </Layout>
  );
}
