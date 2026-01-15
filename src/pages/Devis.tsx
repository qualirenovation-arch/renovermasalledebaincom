import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Upload, 
  Phone, 
  Mail, 
  MapPin, 
  CalendarCheck,
  Pencil,
  Gem,
  Wrench
} from "lucide-react";
import finitionsImage from "@/assets/finitions-robinetterie-clean.png";
import stylesCarrelageImage from "@/assets/styles-carrelage-fr.jpg";
import paroisDoucheImage from "@/assets/parois-douche.jpg";
import meublesVasqueImage from "@/assets/meubles-vasque.jpg";
import wcTypesImage from "@/assets/wc-types.jpg";

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  codePostal: string;
  typeInstallation: string;
  typeDouche: string;
  typeReceveur: string[];
  typeBaignoire: string[];
  wcType: string[];
  meubleVasque: string[];
  porteDouche: string[];
  machineLaver: string;
  emplacementMachine: string[];
  typeMachine: string[];
  finitionsRobinetterie: string[];
  styleCarrelage: string[];
  poseEnvisagee: string[];
  message: string;
}

const initialFormData: FormData = {
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  codePostal: "",
  typeInstallation: "",
  typeDouche: "",
  typeReceveur: [],
  typeBaignoire: [],
  wcType: [],
  meubleVasque: [],
  porteDouche: [],
  machineLaver: "",
  emplacementMachine: [],
  typeMachine: [],
  finitionsRobinetterie: [],
  styleCarrelage: [],
  poseEnvisagee: [],
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

const CarrelageIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="9" height="9" />
    <rect x="13" y="2" width="9" height="9" />
    <rect x="2" y="13" width="9" height="9" />
    <rect x="13" y="13" width="9" height="9" />
  </svg>
);

const FinitionsIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

// Options avec pictogrammes
const wcOptions = [
  { label: "WC suspendu", value: "wc-suspendu" },
  { label: "WC classique (au sol)", value: "wc-classique" },
  { label: "Ne pas remplacer les WC", value: "wc-non" },
];

const meubleVasqueOptions = [
  { label: "Meuble vasque suspendu", value: "meuble-suspendu" },
  { label: "Meuble vasque au sol", value: "meuble-sol" },
  { label: "Vasque à poser avec plage", value: "vasque-plage" },
  { label: "Vasque à poser sans plage", value: "vasque-sans-plage" },
  { label: "Vasque encastrée", value: "vasque-encastree" },
  { label: "Plan vasque moulé", value: "plan-moule" },
];

const porteOptions = [
  { label: "Paroi fixe", value: "fixe" },
  { label: "Porte de douche battante", value: "battante" },
  { label: "Porte de douche coulissante", value: "coulissante" },
  { label: "Porte de douche pliable", value: "pliable" },
];

const typeDoucheOptions = [
  { value: "applique", label: "En applique" },
  { value: "encastre", label: "Encastré" },
];

const typeReceveurOptions = [
  { label: "Receveur à poser", value: "a-poser" },
  { label: "Receveur à carreler", value: "a-carreler" },
  { label: "Receveur à encastrer", value: "a-encastrer" },
  { label: "Receveur en résine", value: "resine" },
  { label: "Receveur en acrylique", value: "acrylique" },
];

const typeBaignoireOptions = [
  { label: "Baignoire en fonte", value: "fonte" },
  { label: "Baignoire en acier", value: "acier" },
  { label: "Baignoire en résine", value: "resine" },
];

const emplacementMachineOptions = [
  { label: "Sous un plan vasque", value: "sous-vasque" },
  { label: "Dans un placard fermé", value: "placard" },
  { label: "Autre emplacement (à préciser)", value: "autre" },
];

const typeMachineOptions = [
  { label: "Machine à laver uniquement", value: "lave-linge" },
  { label: "Lave-linge + sèche-linge", value: "lave-seche" },
  { label: "Lavante-séchante (2 en 1)", value: "lavante-sechante" },
  { label: "Aucun, mais je souhaite en intégrer", value: "souhaite-integrer" },
  { label: "Aucun, et je ne souhaite pas en intégrer", value: "pas-integrer" },
];

const finitionsOptions = [
  { label: "Laiton brossé", value: "laiton", color: "bg-[#C9A962]", description: "Chaleureux et raffiné" },
  { label: "Nickel brossé", value: "nickel", color: "bg-[#A0A0A0]", description: "Discret et chic" },
  { label: "Noir mat", value: "noir", color: "bg-[#2D2D2D]", description: "Graphique et moderne" },
  { label: "Chromé", value: "chrome", color: "bg-[#D4D4D4]", description: "Lumineux et classique" },
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

const poseOptions = [
  { label: "Zellige", value: "zellige" },
  { label: "Effet marbre", value: "marbre" },
  { label: "Béton ciré", value: "beton" },
  { label: "Métro / biseauté", value: "metro" },
];

export default function Devis() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Demande envoyée !",
      description: "Nous vous recontacterons sous 24h pour planifier votre visite.",
    });
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
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-stone">
        <div className="container-custom">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="tag-mint inline-flex items-center gap-2 mb-6">
              <CalendarCheck className="w-4 h-4" />
              Visite technique gratuite
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Planifiez votre RDV sur site
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Remplissez ce formulaire pour obtenir un <strong>rendez-vous gratuit</strong> avec notre équipe. 
              Nous viendrons étudier votre projet directement chez vous.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Avantages rapides */}
      <section className="py-8 border-b border-border bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Pencil, title: "Conception sur mesure", desc: "Des solutions personnalisées" },
              { icon: Gem, title: "Matériaux de qualité", desc: "Durables et esthétiques" },
              { icon: Wrench, title: "Installation professionnelle", desc: "Experts qualifiés" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <item.icon className="w-8 h-8 text-foreground flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-muted-foreground text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Informations personnelles */}
                <div className="card-elevated p-8">
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
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="codePostal">Code postal du chantier *</Label>
                      <Input
                        id="codePostal"
                        value={formData.codePostal}
                        onChange={(e) => handleChange("codePostal", e.target.value)}
                        placeholder="75017"
                        required
                        className="max-w-xs rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Type d'installation */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--tag-blue))] flex items-center justify-center">
                      <RobinetterieIcon />
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

                  {/* Type de douche - visible si douche sélectionnée */}
                  {formData.typeInstallation === "douche" && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <Label className="text-sm font-medium text-muted-foreground mb-3 block">Type de robinetterie douche</Label>
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

                      <Label className="text-sm font-medium text-muted-foreground mb-3 block mt-6">Type de receveur</Label>
                      <CheckboxGroup options={typeReceveurOptions} field="typeReceveur" columns={3} />
                    </div>
                  )}

                  {/* Type de baignoire - visible si baignoire sélectionnée */}
                  {formData.typeInstallation === "baignoire" && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <Label className="text-sm font-medium text-muted-foreground mb-3 block">Style de baignoire</Label>
                      <CheckboxGroup options={typeBaignoireOptions} field="typeBaignoire" />
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
                  
                  {/* Image de référence */}
                  <div className="mb-6 rounded-2xl overflow-hidden">
                    <img 
                      src={meublesVasqueImage} 
                      alt="Types de meubles vasques - Suspendu, Au sol" 
                      className="w-full h-auto"
                    />
                  </div>

                  <CheckboxGroup options={meubleVasqueOptions} field="meubleVasque" />
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
                  
                  {/* Image de référence */}
                  <div className="mb-6 rounded-2xl overflow-hidden">
                    <img 
                      src={paroisDoucheImage} 
                      alt="Types de parois de douche - Paroi fixe, Porte battante, Porte coulissante, Porte pliable" 
                      className="w-full h-auto"
                    />
                  </div>

                  <CheckboxGroup options={porteOptions} field="porteDouche" />
                </div>

                {/* Machine à laver */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--tag-blue))] flex items-center justify-center">
                      <RobinetterieIcon />
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

                {/* Finitions robinetterie */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--tag-beige))] flex items-center justify-center">
                      <RobinetterieIcon />
                    </div>
                    Finitions robinetterie
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6">Personnalisez votre robinetterie avec des finitions élégantes et durables.</p>
                  
                  {/* Image de référence */}
                  <div className="mb-6 rounded-2xl overflow-hidden">
                    <img 
                      src={finitionsImage} 
                      alt="Finitions robinetterie - Laiton brossé, Nickel brossé, Noir mat, Chromé" 
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {finitionsOptions.map((option) => (
                      <div 
                        key={option.value} 
                        className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all cursor-pointer ${
                          (formData.finitionsRobinetterie).includes(option.value) 
                            ? 'border-foreground bg-foreground/5' 
                            : 'border-border bg-card hover:border-foreground/30'
                        }`}
                        onClick={() => handleCheckboxChange("finitionsRobinetterie", option.value, !formData.finitionsRobinetterie.includes(option.value))}
                      >
                        <div className={`w-16 h-16 rounded-full ${option.color}`} />
                        <span className="font-semibold text-center">{option.label}</span>
                        <span className="text-xs text-muted-foreground text-center">{option.description}</span>
                      </div>
                    ))}
                  </div>
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

                {/* Pose envisagée */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--tag-mint))] flex items-center justify-center">
                      <CarrelageIcon />
                    </div>
                    Pose envisagée
                  </h2>
                  <CheckboxGroup options={poseOptions} field="poseEnvisagee" />
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

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-[hsl(38,50%,50%)] hover:bg-[hsl(38,50%,45%)] text-white rounded-xl py-6 text-lg"
                  disabled={isSubmitting}
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
