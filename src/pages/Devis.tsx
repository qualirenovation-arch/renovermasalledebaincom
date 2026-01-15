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
  CheckCircle2, 
  Upload, 
  Phone, 
  Mail, 
  MapPin, 
  ShowerHead, 
  Droplets,
  DoorOpen,
  Grid3X3,
  Palette,
  Layers,
  FileText,
  User,
  Sparkles,
  Square,
  CalendarCheck
} from "lucide-react";

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  codePostal: string;
  typeInstallation: string;
  receveur: string[];
  porteDouche: string[];
  robinetterie: string[];
  finitionsRobinetterie: string[];
  zonesCarrelage: string[];
  formatCarrelage: string[];
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
  receveur: [],
  porteDouche: [],
  robinetterie: [],
  finitionsRobinetterie: [],
  zonesCarrelage: [],
  formatCarrelage: [],
  styleCarrelage: [],
  poseEnvisagee: [],
  message: "",
};

// 🚿 Receveur de douche
const receveurOptions = [
  { label: "Receveur extra-plat", icon: "⬜" },
  { label: "Receveur à carreler (SPEC)", icon: "🔲" },
  { label: "Receveur en pierre naturelle", icon: "🪨" },
  { label: "Receveur en résine", icon: "✨" },
  { label: "Je ne sais pas encore", icon: "❓" },
];

// 🚪 Porte de douche / Paroi
const porteOptions = [
  { label: "Paroi fixe", icon: "▯" },
  { label: "Paroi battante", icon: "🚪" },
  { label: "Paroi coulissante", icon: "↔️" },
  { label: "Paroi pivotante", icon: "🔄" },
  { label: "Paroi walk-in (sans porte)", icon: "🚶" },
  { label: "Je ne sais pas encore", icon: "❓" },
];

// 🔧 Robinetterie
const robinetterieOptions = [
  { label: "Colonne de douche apparente", icon: "🚿" },
  { label: "Colonne de douche encastrée", icon: "💧" },
  { label: "Mitigeur thermostatique", icon: "🌡️" },
  { label: "Mitigeur mécanique", icon: "🔧" },
  { label: "Douchette à main", icon: "🤚" },
  { label: "Pomme de tête fixe (pluie)", icon: "🌧️" },
];

// 🪞 Finitions robinetterie
const finitionsOptions = [
  { label: "Laiton brossé", icon: "🥇" },
  { label: "Nickel brossé", icon: "🔘" },
  { label: "Noir mat", icon: "⚫" },
  { label: "Chromé", icon: "💎" },
  { label: "Or brossé", icon: "✨" },
];

// 🧱 Zones à carreler
const zonesCarrelageOptions = [
  { label: "Mur de la douche", icon: "🧱" },
  { label: "Sol de la douche", icon: "⬛" },
  { label: "Murs hors douche", icon: "🏠" },
  { label: "Sol hors douche (pièce entière)", icon: "🏢" },
];

// 📏 Format de carrelage
const formatCarrelageOptions = [
  { label: "Petit format (5x5, 10x10…)", icon: "▪️" },
  { label: "Moyen format (20x20, 30x60…)", icon: "◻️" },
  { label: "Grand format (60x60, 120x60…)", icon: "⬜" },
  { label: "Mosaïque", icon: "🔷" },
  { label: "Je ne sais pas encore", icon: "❓" },
];

// 🎨 Style de carrelage
const styleCarrelageOptions = [
  { label: "Zellige", icon: "🔶" },
  { label: "Effet marbre", icon: "🤍" },
  { label: "Béton ciré", icon: "🔘" },
  { label: "Terrazzo", icon: "🎨" },
  { label: "Métro / biseauté", icon: "🚇" },
  { label: "Graphique / géométrique", icon: "📐" },
  { label: "Naturel (ton pierre, sable…)", icon: "🏜️" },
  { label: "Couleur unie mate", icon: "🟫" },
  { label: "Autre", icon: "➕" },
];

// 🧩 Pose envisagée
const poseOptions = [
  { label: "Pose droite", icon: "➡️" },
  { label: "Pose en chevron", icon: "↗️" },
  { label: "Pose décalée", icon: "↔️" },
  { label: "Pose mosaïque", icon: "🔷" },
  { label: "Je ne sais pas encore", icon: "❓" },
];

// 🔧 Équipements supplémentaires
const equipementsOptions = [
  { label: "Niche murale", icon: "🕳️" },
  { label: "Éclairage intégré (LED)", icon: "💡" },
  { label: "Étanchéité complète (SPEC)", icon: "💧" },
  { label: "Sèche-serviettes", icon: "🔥" },
  { label: "Banc de douche", icon: "🪑" },
];

export default function Devis() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [equipements, setEquipements] = useState<string[]>([]);
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

  const handleEquipementChange = (value: string, checked: boolean) => {
    if (checked) {
      setEquipements(prev => [...prev, value]);
    } else {
      setEquipements(prev => prev.filter(item => item !== value));
    }
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
              <div className="w-24 h-24 rounded-full bg-cta/20 flex items-center justify-center mx-auto mb-8">
                <CalendarCheck className="w-12 h-12 text-cta" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold mb-6">
                Demande de RDV envoyée !
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Merci pour votre demande. Notre équipe vous recontactera sous 24h 
                pour planifier une <strong>visite technique gratuite sur site</strong>.
              </p>
              <Button variant="default" size="lg" onClick={() => {
                setIsSubmitted(false);
                setFormData(initialFormData);
                setUploadedFiles([]);
                setEquipements([]);
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
    options: { label: string; icon: string }[]; 
    field: keyof FormData; 
    columns?: number;
  }) => (
    <div className={`grid grid-cols-1 ${columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-2`}>
      {options.map((option) => (
        <div 
          key={option.label} 
          className={`flex items-center space-x-3 p-3 rounded-xl border-2 transition-all cursor-pointer ${
            (formData[field] as string[]).includes(option.label) 
              ? 'border-primary bg-primary/5' 
              : 'border-transparent bg-secondary/50 hover:bg-secondary'
          }`}
          onClick={() => handleCheckboxChange(field, option.label, !(formData[field] as string[]).includes(option.label))}
        >
          <span className="text-xl">{option.icon}</span>
          <Checkbox 
            id={`${field}-${option.label}`}
            checked={(formData[field] as string[]).includes(option.label)}
            onCheckedChange={(checked) => handleCheckboxChange(field, option.label, checked as boolean)}
            className="pointer-events-none"
          />
          <Label htmlFor={`${field}-${option.label}`} className="cursor-pointer flex-1 text-sm">{option.label}</Label>
        </div>
      ))}
    </div>
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-stone" />
        <div className="relative container-custom">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/30 text-wood text-sm font-medium mb-6">
              <CalendarCheck className="w-4 h-4 inline mr-2" />
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

      {/* Form Section */}
      <section className="section-padding">
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
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <User className="w-5 h-5 text-wood" />
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
                        className="max-w-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Type d'installation */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <ShowerHead className="w-5 h-5 text-wood" />
                    </div>
                    🚿 Type d'installation souhaitée
                  </h2>
                  <RadioGroup 
                    value={formData.typeInstallation} 
                    onValueChange={(value) => handleChange("typeInstallation", value)}
                    className="grid grid-cols-1 md:grid-cols-3 gap-3"
                  >
                    {[
                      { value: "douche", label: "Une douche", icon: "🚿" },
                      { value: "baignoire", label: "Une baignoire", icon: "🛁" },
                      { value: "indecis", label: "Je ne sais pas", icon: "❓" }
                    ].map((option) => (
                      <div 
                        key={option.value} 
                        className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          formData.typeInstallation === option.value 
                            ? 'border-primary bg-primary/5' 
                            : 'border-transparent bg-secondary/50 hover:bg-secondary'
                        }`}
                        onClick={() => handleChange("typeInstallation", option.value)}
                      >
                        <span className="text-2xl">{option.icon}</span>
                        <RadioGroupItem value={option.value} id={option.value} className="pointer-events-none" />
                        <Label htmlFor={option.value} className="cursor-pointer flex-1 font-medium">{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Receveur */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <Square className="w-5 h-5 text-wood" />
                    </div>
                    🔲 Receveur de douche
                  </h2>
                  <CheckboxGroup options={receveurOptions} field="receveur" />
                </div>

                {/* Porte de douche */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <DoorOpen className="w-5 h-5 text-wood" />
                    </div>
                    🚪 Porte de douche / Paroi
                  </h2>
                  <CheckboxGroup options={porteOptions} field="porteDouche" />
                </div>

                {/* Robinetterie */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-wood" />
                    </div>
                    🔧 Robinetterie
                  </h2>
                  <CheckboxGroup options={robinetterieOptions} field="robinetterie" />
                </div>

                {/* Finitions robinetterie */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-wood" />
                    </div>
                    🪞 Finitions robinetterie
                  </h2>
                  <CheckboxGroup options={finitionsOptions} field="finitionsRobinetterie" />
                </div>

                {/* Zones à carreler */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <Grid3X3 className="w-5 h-5 text-wood" />
                    </div>
                    🧱 Zones à carreler
                  </h2>
                  <CheckboxGroup options={zonesCarrelageOptions} field="zonesCarrelage" />
                </div>

                {/* Format de carrelage */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-wood" />
                    </div>
                    📏 Format de carrelage
                  </h2>
                  <CheckboxGroup options={formatCarrelageOptions} field="formatCarrelage" />
                </div>

                {/* Style de carrelage */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <Palette className="w-5 h-5 text-wood" />
                    </div>
                    🎨 Style de carrelage
                  </h2>
                  <CheckboxGroup options={styleCarrelageOptions} field="styleCarrelage" columns={3} />
                </div>

                {/* Pose envisagée */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-wood" />
                    </div>
                    🧩 Type de pose
                  </h2>
                  <CheckboxGroup options={poseOptions} field="poseEnvisagee" />
                </div>

                {/* Équipements supplémentaires */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-wood" />
                    </div>
                    ✨ Équipements supplémentaires
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {equipementsOptions.map((option) => (
                      <div 
                        key={option.label} 
                        className={`flex items-center space-x-3 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                          equipements.includes(option.label) 
                            ? 'border-primary bg-primary/5' 
                            : 'border-transparent bg-secondary/50 hover:bg-secondary'
                        }`}
                        onClick={() => handleEquipementChange(option.label, !equipements.includes(option.label))}
                      >
                        <span className="text-xl">{option.icon}</span>
                        <Checkbox 
                          id={`equip-${option.label}`}
                          checked={equipements.includes(option.label)}
                          onCheckedChange={(checked) => handleEquipementChange(option.label, checked as boolean)}
                          className="pointer-events-none"
                        />
                        <Label htmlFor={`equip-${option.label}`} className="cursor-pointer flex-1 text-sm">{option.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upload fichiers */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-wood" />
                    </div>
                    📎 Photos ou plans de votre salle de bain
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
                    className="border-2 border-dashed border-border rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-secondary/30 transition-colors"
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
                        <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
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
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-wood" />
                    </div>
                    ✍️ Précisions sur votre projet
                  </h2>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Décrivez votre projet, vos envies, les contraintes de votre espace..."
                    rows={5}
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="cta" 
                  size="xl" 
                  className="w-full"
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
                  🗓️ Visite technique gratuite
                </h2>
                <p className="text-muted-foreground mb-8">
                  Nous venons chez vous pour étudier votre projet et vous proposer un devis personnalisé.
                </p>

                <div className="space-y-6">
                  <a 
                    href="tel:+33659764685"
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-wood" />
                    </div>
                    <div>
                      <p className="font-semibold">Téléphone</p>
                      <p className="text-muted-foreground">06 59 76 46 85</p>
                    </div>
                  </a>

                  <a 
                    href="mailto:contact@qualiconcept.fr"
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-wood" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">contact@qualiconcept.fr</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary">
                    <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-wood" />
                    </div>
                    <div>
                      <p className="font-semibold">Zone d'intervention</p>
                      <p className="text-muted-foreground">
                        Paris & Île-de-France
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-xl bg-cta/10 border border-cta/20">
                  <p className="text-sm text-foreground">
                    <strong>✅ Réponse sous 24h</strong><br />
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
