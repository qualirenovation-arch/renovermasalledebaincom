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
import { CheckCircle2, Upload, Phone, Mail, MapPin, ShowerHead, Wrench, Sparkles, Grid3X3, Palette, Layers, FileText } from "lucide-react";

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  codePostal: string;
  typeInstallation: string;
  equipements: string[];
  finitions: string[];
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
  equipements: [],
  finitions: [],
  zonesCarrelage: [],
  formatCarrelage: [],
  styleCarrelage: [],
  poseEnvisagee: [],
  message: "",
};

const equipementsOptions = [
  "Paroi fixe",
  "Paroi battante",
  "Colonne de douche apparente",
  "Colonne de douche encastrée",
  "Mitigeur thermostatique",
  "Niche murale",
  "Carrelage mural",
  "Carrelage au sol",
  "Éclairage intégré (LED)",
  "Étanchéité complète (SPEC)",
];

const finitionsOptions = [
  "Laiton brossé",
  "Nickel brossé",
  "Noir mat",
  "Chromé",
];

const zonesCarrelageOptions = [
  "Mur de la douche",
  "Sol de la douche",
  "Murs hors douche",
  "Sol hors douche (pièce entière)",
];

const formatCarrelageOptions = [
  "Petit format (5x5, 10x10…)",
  "Moyen format (20x20, 30x60…)",
  "Grand format (60x60, 120x60…)",
  "Mosaïque",
  "Je ne sais pas encore",
];

const styleCarrelageOptions = [
  "Zellige",
  "Effet marbre",
  "Béton ciré",
  "Terrazzo",
  "Métro / biseauté",
  "Graphique / géométrique",
  "Naturel (ton pierre, sable…)",
  "Couleur unie mate",
  "Autre",
];

const poseOptions = [
  "Pose droite",
  "Pose en chevron",
  "Pose décalée",
  "Pose mosaïque",
  "Je ne sais pas encore",
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
        const isUnderLimit = file.size <= 10 * 1024 * 1024; // 10MB
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
    if (!formData.prenom || !formData.nom || !formData.email || !formData.codePostal) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
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
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Demande envoyée !",
      description: "Nous vous recontacterons sous 24h.",
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
                <CheckCircle2 className="w-12 h-12 text-cta" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold mb-6">
                Demande envoyée avec succès !
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Merci pour votre demande. Notre équipe va étudier votre projet 
                et vous recontacter sous 24h pour planifier une visite technique gratuite.
              </p>
              <Button variant="default" size="lg" onClick={() => {
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
              Demande de devis
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Obtenez votre devis gratuit
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Remplissez le formulaire ci-dessous et recevez une estimation 
              personnalisée pour votre projet de douche à l'italienne.
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
                      <FileText className="w-5 h-5 text-wood" />
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
                    className="space-y-3"
                  >
                    {["Une douche avec receveur", "Une baignoire", "Je ne sais pas encore"].map((option) => (
                      <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer flex-1">{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Équipements souhaités */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-wood" />
                    </div>
                    🔧 Équipements souhaités
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {equipementsOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                        <Checkbox 
                          id={`equip-${option}`}
                          checked={formData.equipements.includes(option)}
                          onCheckedChange={(checked) => handleCheckboxChange("equipements", option, checked as boolean)}
                        />
                        <Label htmlFor={`equip-${option}`} className="cursor-pointer flex-1">{option}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Finitions souhaitées */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-wood" />
                    </div>
                    🪞 Finitions souhaitées
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {finitionsOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                        <Checkbox 
                          id={`finition-${option}`}
                          checked={formData.finitions.includes(option)}
                          onCheckedChange={(checked) => handleCheckboxChange("finitions", option, checked as boolean)}
                        />
                        <Label htmlFor={`finition-${option}`} className="cursor-pointer flex-1">{option}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Zones à carreler */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <Grid3X3 className="w-5 h-5 text-wood" />
                    </div>
                    🧱 Zones à carreler
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {zonesCarrelageOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                        <Checkbox 
                          id={`zone-${option}`}
                          checked={formData.zonesCarrelage.includes(option)}
                          onCheckedChange={(checked) => handleCheckboxChange("zonesCarrelage", option, checked as boolean)}
                        />
                        <Label htmlFor={`zone-${option}`} className="cursor-pointer flex-1">{option}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Format de carrelage */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-wood" />
                    </div>
                    📏 Format de carrelage
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {formatCarrelageOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                        <Checkbox 
                          id={`format-${option}`}
                          checked={formData.formatCarrelage.includes(option)}
                          onCheckedChange={(checked) => handleCheckboxChange("formatCarrelage", option, checked as boolean)}
                        />
                        <Label htmlFor={`format-${option}`} className="cursor-pointer flex-1">{option}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Style de carrelage */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <Palette className="w-5 h-5 text-wood" />
                    </div>
                    🎨 Style de carrelage
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {styleCarrelageOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                        <Checkbox 
                          id={`style-${option}`}
                          checked={formData.styleCarrelage.includes(option)}
                          onCheckedChange={(checked) => handleCheckboxChange("styleCarrelage", option, checked as boolean)}
                        />
                        <Label htmlFor={`style-${option}`} className="cursor-pointer flex-1">{option}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pose envisagée */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-wood" />
                    </div>
                    🧩 Pose envisagée
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {poseOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                        <Checkbox 
                          id={`pose-${option}`}
                          checked={formData.poseEnvisagee.includes(option)}
                          onCheckedChange={(checked) => handleCheckboxChange("poseEnvisagee", option, checked as boolean)}
                        />
                        <Label htmlFor={`pose-${option}`} className="cursor-pointer flex-1">{option}</Label>
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
                    📎 Ajouter un plan ou une photo
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
                      Cliquez pour parcourir ou glissez vos fichiers ici
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
                    ✍️ Détails ou précisions sur votre projet
                  </h2>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Décrivez votre projet, vos envies, les contraintes de votre espace, votre budget estimé..."
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
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande de devis"}
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
                  Besoin d'aide ?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Notre équipe est disponible pour répondre à toutes vos questions.
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
                      <p className="font-semibold">Adresse</p>
                      <p className="text-muted-foreground">
                        6 rue d'Armaillé<br />75017 Paris
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-xl bg-cta/10 border border-cta/20">
                  <p className="text-sm text-foreground">
                    <strong>Réponse sous 24h</strong><br />
                    Nous nous engageons à vous recontacter dans les plus brefs délais.
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
