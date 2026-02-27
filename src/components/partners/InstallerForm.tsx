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
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const REQUESTED_SERVICES = [
  { value: "sdb_complete", label: "Salle de bain complète" },
  { value: "douche_receveur", label: "Douche / Receveur" },
  { value: "carrelage", label: "Carrelage" },
  { value: "cuisine", label: "Cuisine" },
  { value: "mobilier_sur_mesure", label: "Mobilier sur mesure" },
  { value: "robinetterie", label: "Robinetterie" },
  { value: "autre", label: "Autre" },
] as const;

const formSchema = z.object({
  company_name: z.string().min(2, "Nom de société requis"),
  contact_first_name: z.string().min(2, "Prénom requis"),
  contact_last_name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone requis"),
  zone: z.enum(["paris", "petite_couronne", "idf", "autre"]),
  requested_services: z.array(z.string()).optional(),
  context: z.enum(["client_signe", "chiffrage", "recherche_reguliere", "mission_ponctuelle"]).optional(),
  intervention_level: z.enum(["pose_seule", "pose_plus_mise_en_service", "avec_maitre_oeuvre", "cle_en_main"]).optional(),
  timeline: z.enum(["immediat", "moins_1_mois", "a_definir"]).optional(),
  message: z.string().min(10, "Message requis (min. 10 caractères)"),
});

type FormValues = z.infer<typeof formSchema>;

interface InstallerFormProps {
  onBack: () => void;
}

const HCAPTCHA_SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001";

export function InstallerForm({ onBack }: InstallerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      contact_first_name: "",
      contact_last_name: "",
      email: "",
      phone: "",
      zone: undefined,
      requested_services: [],
      context: undefined,
      intervention_level: undefined,
      timeline: undefined,
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!captchaToken) {
      toast.error("Veuillez valider le captcha");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("submit-partner-contact", {
        body: {
          partner_family: "installateur",
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
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h3 className="font-display text-2xl font-light mb-4">Merci pour votre demande !</h3>
        <p className="text-muted-foreground mb-8">
          Nous avons bien reçu votre demande et reviendrons vers vous rapidement.
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

      <h2 className="font-display text-2xl font-light mb-2">Rechercher une prestation</h2>
      <p className="text-muted-foreground mb-8">
        Vous êtes installateur et recherchez un prestataire qualifié ? Décrivez vos besoins.
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
                  <FormLabel>Zone *</FormLabel>
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

          <FormField
            control={form.control}
            name="requested_services"
            render={() => (
              <FormItem>
                <FormLabel>Prestations recherchées</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {REQUESTED_SERVICES.map((service) => (
                    <FormField
                      key={service.value}
                      control={form.control}
                      name="requested_services"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(service.value)}
                              onCheckedChange={(checked) => {
                                const current = field.value || [];
                                if (checked) {
                                  field.onChange([...current, service.value]);
                                } else {
                                  field.onChange(current.filter((v) => v !== service.value));
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {service.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="context"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cadre</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="client_signe">Client signé</SelectItem>
                      <SelectItem value="chiffrage">Chiffrage</SelectItem>
                      <SelectItem value="recherche_reguliere">Recherche régulière</SelectItem>
                      <SelectItem value="mission_ponctuelle">Mission ponctuelle</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="intervention_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Niveau d'intervention</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pose_seule">Pose seule</SelectItem>
                      <SelectItem value="pose_plus_mise_en_service">Pose + mise en service</SelectItem>
                      <SelectItem value="avec_maitre_oeuvre">Avec maître d'œuvre</SelectItem>
                      <SelectItem value="cle_en_main">Clé en main</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Délais</FormLabel>
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
                    placeholder="Décrivez vos besoins en détail..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
              "Envoyer ma demande"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
