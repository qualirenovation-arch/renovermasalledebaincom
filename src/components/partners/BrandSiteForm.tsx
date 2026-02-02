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

const OFFER_CATEGORIES = [
  { value: "sdb", label: "Salle de bain" },
  { value: "cuisine", label: "Cuisine" },
  { value: "robinetterie", label: "Robinetterie" },
  { value: "revetements", label: "Revêtements" },
  { value: "mobilier", label: "Mobilier" },
  { value: "luminaires", label: "Luminaires" },
  { value: "accessoires_deco", label: "Accessoires déco" },
  { value: "selection_inspiration", label: "Sélection / Inspiration" },
  { value: "autre", label: "Autre" },
] as const;

const formSchema = z.object({
  company_name: z.string().min(2, "Nom de société requis"),
  activity_type: z.enum(["marque", "fabricant", "distributeur", "showroom", "site_ecommerce", "site_decoration_media"]),
  website_url: z.string().url("URL invalide").optional().or(z.literal("")),
  contact_first_name: z.string().min(2, "Prénom requis"),
  contact_last_name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone requis"),
  zone: z.enum(["paris", "petite_couronne", "idf", "autre"]),
  offer_categories: z.array(z.string()).optional(),
  collaboration_goal: z.enum(["etre_recommande", "projets_concrets", "partenariat_recurrent", "operation_presse_contenu"]).optional(),
  message: z.string().min(10, "Message requis (min. 10 caractères)"),
});

type FormValues = z.infer<typeof formSchema>;

interface BrandSiteFormProps {
  onBack: () => void;
}

const HCAPTCHA_SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001";

export function BrandSiteForm({ onBack }: BrandSiteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      activity_type: undefined,
      website_url: "",
      contact_first_name: "",
      contact_last_name: "",
      email: "",
      phone: "",
      zone: undefined,
      offer_categories: [],
      collaboration_goal: undefined,
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
          partner_family: "marque_site",
          ...values,
          website_url: values.website_url || undefined,
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
        <h3 className="font-display text-2xl font-semibold mb-4">Merci pour votre demande !</h3>
        <p className="text-muted-foreground mb-8">
          Nous avons bien reçu votre demande de partenariat et reviendrons vers vous rapidement.
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

      <h2 className="font-display text-2xl font-semibold mb-2">Devenir partenaire</h2>
      <p className="text-muted-foreground mb-8">
        Marque, fabricant, distributeur, showroom ou site déco — collaborons ensemble.
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
              name="activity_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type d'activité *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="marque">Marque</SelectItem>
                      <SelectItem value="fabricant">Fabricant</SelectItem>
                      <SelectItem value="distributeur">Distributeur</SelectItem>
                      <SelectItem value="showroom">Showroom</SelectItem>
                      <SelectItem value="site_ecommerce">Site e-commerce</SelectItem>
                      <SelectItem value="site_decoration_media">Site décoration / Média</SelectItem>
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
              name="website_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site internet</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://www.exemple.com" {...field} />
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
                      <SelectItem value="autre">Autre / National</SelectItem>
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
            name="offer_categories"
            render={() => (
              <FormItem>
                <FormLabel>Catégories proposées</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {OFFER_CATEGORIES.map((category) => (
                    <FormField
                      key={category.value}
                      control={form.control}
                      name="offer_categories"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(category.value)}
                              onCheckedChange={(checked) => {
                                const current = field.value || [];
                                if (checked) {
                                  field.onChange([...current, category.value]);
                                } else {
                                  field.onChange(current.filter((v) => v !== category.value));
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {category.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="collaboration_goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objectif de collaboration</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="etre_recommande">Être recommandé</SelectItem>
                    <SelectItem value="projets_concrets">Projets concrets</SelectItem>
                    <SelectItem value="partenariat_recurrent">Partenariat récurrent</SelectItem>
                    <SelectItem value="operation_presse_contenu">Opération presse / contenu</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Présentez votre marque et votre souhait de collaboration..."
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
