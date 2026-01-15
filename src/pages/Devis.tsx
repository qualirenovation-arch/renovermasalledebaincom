import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Upload, Phone, Mail, MapPin } from "lucide-react";

interface FormData {
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  typeProjet: string;
  largeur: string;
  longueur: string;
  materiaux: string;
  finition: string;
  budget: string;
  delai: string;
  message: string;
}

const initialFormData: FormData = {
  nom: "",
  email: "",
  telephone: "",
  ville: "",
  typeProjet: "",
  largeur: "",
  longueur: "",
  materiaux: "",
  finition: "",
  budget: "",
  delai: "",
  message: "",
};

export default function Devis() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.nom || !formData.email || !formData.telephone) {
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
              <Button variant="default" size="lg" onClick={() => setIsSubmitted(false)}>
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
                {/* Coordonnées */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6">Vos coordonnées</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom complet *</Label>
                      <Input
                        id="nom"
                        value={formData.nom}
                        onChange={(e) => handleChange("nom", e.target.value)}
                        placeholder="Jean Dupont"
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
                      <Label htmlFor="telephone">Téléphone *</Label>
                      <Input
                        id="telephone"
                        type="tel"
                        value={formData.telephone}
                        onChange={(e) => handleChange("telephone", e.target.value)}
                        placeholder="06 12 34 56 78"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ville">Ville</Label>
                      <Input
                        id="ville"
                        value={formData.ville}
                        onChange={(e) => handleChange("ville", e.target.value)}
                        placeholder="Paris"
                      />
                    </div>
                  </div>
                </div>

                {/* Projet */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6">Votre projet</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Type de projet</Label>
                      <Select onValueChange={(v) => handleChange("typeProjet", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="creation">Création complète</SelectItem>
                          <SelectItem value="renovation">Rénovation</SelectItem>
                          <SelectItem value="remplacement">Remplacement douche existante</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Matériaux souhaités</Label>
                      <Select onValueChange={(v) => handleChange("materiaux", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="carrelage">Carrelage classique</SelectItem>
                          <SelectItem value="grand-format">Carrelage grand format</SelectItem>
                          <SelectItem value="mosaique">Mosaïque</SelectItem>
                          <SelectItem value="pierre">Pierre naturelle</SelectItem>
                          <SelectItem value="autre">Autre / Je ne sais pas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Finition robinetterie</Label>
                      <Select onValueChange={(v) => handleChange("finition", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="noir">Noir</SelectItem>
                          <SelectItem value="laiton">Laiton / Or</SelectItem>
                          <SelectItem value="chrome">Chrome</SelectItem>
                          <SelectItem value="nickel-mat">Nickel mat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="largeur">Largeur (cm)</Label>
                      <Input
                        id="largeur"
                        type="number"
                        value={formData.largeur}
                        onChange={(e) => handleChange("largeur", e.target.value)}
                        placeholder="120"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longueur">Longueur (cm)</Label>
                      <Input
                        id="longueur"
                        type="number"
                        value={formData.longueur}
                        onChange={(e) => handleChange("longueur", e.target.value)}
                        placeholder="180"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Budget estimé</Label>
                      <Select onValueChange={(v) => handleChange("budget", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3000-5000">3 000€ - 5 000€</SelectItem>
                          <SelectItem value="5000-8000">5 000€ - 8 000€</SelectItem>
                          <SelectItem value="8000-12000">8 000€ - 12 000€</SelectItem>
                          <SelectItem value="12000+">Plus de 12 000€</SelectItem>
                          <SelectItem value="ne-sait-pas">Je ne sais pas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Délai souhaité</Label>
                      <Select onValueChange={(v) => handleChange("delai", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">Urgent (1 mois)</SelectItem>
                          <SelectItem value="normal">Normal (2-3 mois)</SelectItem>
                          <SelectItem value="flexible">Flexible (3-6 mois)</SelectItem>
                          <SelectItem value="projet">Projet futur (6+ mois)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="card-elevated p-8">
                  <h2 className="font-display text-xl font-semibold mb-6">Message</h2>
                  <div className="space-y-2">
                    <Label htmlFor="message">Décrivez votre projet</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Décrivez votre projet, vos envies, les contraintes de votre espace..."
                      rows={5}
                    />
                  </div>

                  {/* Upload placeholder */}
                  <div className="mt-6">
                    <Label>Photos de votre salle de bain (optionnel)</Label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-2xl p-8 text-center">
                      <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Glissez vos photos ici ou cliquez pour parcourir
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        PNG, JPG jusqu'à 10MB
                      </p>
                    </div>
                  </div>
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