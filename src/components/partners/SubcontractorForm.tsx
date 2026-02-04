import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, CheckCircle2, Upload, FileText, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const REQUIRED_DOCUMENTS = [
  { id: "kbis", label: "Extrait KBIS (moins de 3 mois)", required: true },
  { id: "rc_pro", label: "Attestation RC Professionnelle en cours de validité", required: true },
  { id: "decennale", label: "Attestation Décennale en cours de validité", required: true },
  { id: "qualibat", label: "Certification Qualibat ou équivalent", required: false },
];

const formSchema = z.object({
  company_name: z.string().min(2, "Nom de société requis"),
  contact_first_name: z.string().min(2, "Prénom requis"),
  contact_last_name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone requis"),
  zone: z.enum(["paris", "petite_couronne", "idf", "autre"]),
  trade: z.enum(["carrelage", "plomberie", "electricite", "menuiserie", "peinture", "autre"]).optional(),
  collaboration_type: z.enum(["ponctuelle", "recurrente"]).optional(),
  availability: z.enum(["immediat", "moins_1_mois", "a_definir"]).optional(),
  message: z.string().min(10, "Message requis (min. 10 caractères)"),
  has_kbis: z.boolean().refine(val => val === true, "Vous devez disposer d'un extrait KBIS"),
  has_rc_pro: z.boolean().refine(val => val === true, "Vous devez disposer d'une attestation RC Pro"),
  has_decennale: z.boolean().refine(val => val === true, "Vous devez disposer d'une attestation Décennale"),
});

type FormValues = z.infer<typeof formSchema>;

interface SubcontractorFormProps {
  onBack: () => void;
}

const HCAPTCHA_SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001";

export function SubcontractorForm({ onBack }: SubcontractorFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({
    kbis: null,
    rc_pro: null,
    decennale: null,
    qualibat: null,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      contact_first_name: "",
      contact_last_name: "",
      email: "",
      phone: "",
      zone: undefined,
      trade: undefined,
      collaboration_type: undefined,
      availability: undefined,
      message: "",
      has_kbis: false,
      has_rc_pro: false,
      has_decennale: false,
    },
  });

  const handleFileChange = (docId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Format non supporté. Utilisez PDF, JPEG ou PNG.");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Fichier trop volumineux (max 5 Mo)");
        return;
      }
    }
    setUploadedFiles(prev => ({ ...prev, [docId]: file }));
  };

  const onSubmit = async (values: FormValues) => {
    if (!captchaToken) {
      toast.error("Veuillez valider le captcha");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("submit-partner-contact", {
        body: {
          partner_family: "sub_traitant",
          ...values,
          captchaToken,
        },
      });

      if (error) throw error;
      
      setIsSuccess(true);
      toast.success("Votre demande a été envoyée avec succès !");
    } catch (error: any) {
      console.error("Submit error:", error);
      toast.error(error.message || "Erreur lors de l'envoi");
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
        <h3 className="font-display text-2xl font-semibold mb-4">Merci pour votre demande !</h3>
        <p className="text-muted-foreground mb-8">
          Nous avons bien reçu votre candidature et reviendrons vers vous rapidement.
        </p>
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au choix du profil
      </button>

      <h2 className="font-display text-2xl font-semibold mb-2">Devenir sous-traitant</h2>
      <p className="text-muted-foreground mb-8">
        Rejoignez notre réseau d'artisans qualifiés pour des chantiers de qualité.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Société *</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom de votre entreprise" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zone d'intervention *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="paris">Paris</SelectItem>
                      <SelectItem value="petite_couronne">Petite couronne (92, 93, 94)</SelectItem>
                      <SelectItem value="idf">Île-de-France</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="contact_first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom *</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre prénom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom *</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@exemple.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone *</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="06 00 00 00 00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="trade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Métier</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="carrelage">Carrelage</SelectItem>
                      <SelectItem value="plomberie">Plomberie</SelectItem>
                      <SelectItem value="electricite">Électricité</SelectItem>
                      <SelectItem value="menuiserie">Menuiserie</SelectItem>
                      <SelectItem value="peinture">Peinture</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="collaboration_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de collaboration</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ponctuelle">Ponctuelle</SelectItem>
                      <SelectItem value="recurrente">Récurrente</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disponibilité</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="immediat">Immédiat</SelectItem>
                      <SelectItem value="moins_1_mois">Moins d'1 mois</SelectItem>
                      <SelectItem value="a_definir">À définir</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Présentez brièvement votre entreprise et vos compétences..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Documents requis section */}
          <div className="bg-muted/50 rounded-xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground">Documents requis</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Pour travailler avec nous, vous devrez fournir les documents suivants. Vous pouvez les joindre maintenant ou les envoyer ultérieurement.
                </p>
              </div>
            </div>

            <ul className="space-y-2 ml-8">
              {REQUIRED_DOCUMENTS.map((doc) => (
                <li key={doc.id} className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span>{doc.label}</span>
                  {doc.required && <span className="text-destructive">*</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* File uploads */}
          <div className="space-y-4">
            <h3 className="font-semibold">Joindre vos documents (optionnel)</h3>
            <p className="text-sm text-muted-foreground">
              Formats acceptés : PDF, JPEG, PNG (max 5 Mo par fichier)
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REQUIRED_DOCUMENTS.map((doc) => (
                <div key={doc.id} className="border border-border rounded-lg p-4">
                  <label className="block text-sm font-medium mb-2">
                    {doc.label}
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(doc.id, e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-md border border-dashed transition-colors ${
                      uploadedFiles[doc.id] ? 'bg-accent border-primary/50' : 'bg-background border-border hover:border-primary/50'
                    }`}>
                      {uploadedFiles[doc.id] ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span className="text-sm truncate">{uploadedFiles[doc.id]?.name}</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Choisir un fichier</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Confirmation checkboxes */}
          <div className="space-y-4 border-t border-border pt-6">
            <h3 className="font-semibold">Confirmations obligatoires *</h3>
            
            <FormField
              control={form.control}
              name="has_kbis"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal">
                      Je dispose d'un extrait KBIS de moins de 3 mois
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="has_rc_pro"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal">
                      Je dispose d'une attestation RC Professionnelle en cours de validité
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="has_decennale"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal">
                      Je dispose d'une attestation Décennale en cours de validité
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center">
            <HCaptcha
              ref={captchaRef}
              sitekey={HCAPTCHA_SITE_KEY}
              onVerify={setCaptchaToken}
              onExpire={() => setCaptchaToken(null)}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting || !captchaToken}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "Envoyer ma candidature"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
