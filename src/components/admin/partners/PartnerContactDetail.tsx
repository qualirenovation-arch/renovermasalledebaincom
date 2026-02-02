import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Phone, Mail, MessageCircle, Globe, Save } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

interface PartnerContact {
  id: string;
  created_at: string;
  updated_at: string;
  partner_family: string;
  company_name: string;
  contact_first_name: string;
  contact_last_name: string;
  email: string;
  phone: string;
  zone: string;
  message: string;
  status: string;
  priority: string;
  assigned_to: string | null;
  last_contacted_at: string | null;
  next_followup_at: string | null;
  internal_notes: string | null;
  source: string;
  // Sous-traitant
  trade: string | null;
  collaboration_type: string | null;
  availability: string | null;
  // Installateur
  requested_services: string[] | null;
  context: string | null;
  intervention_level: string | null;
  timeline: string | null;
  // Marque/Site
  activity_type: string | null;
  website_url: string | null;
  offer_categories: string[] | null;
  collaboration_goal: string | null;
}

interface PartnerContactDetailProps {
  contactId: string;
  onBack: () => void;
}

const FAMILY_LABELS: Record<string, string> = {
  sub_traitant: "Sous-traitant",
  installateur: "Installateur",
  marque_site: "Marque / Site",
};

const STATUS_OPTIONS = [
  { value: "nouveau", label: "Nouveau" },
  { value: "a_qualifier", label: "À qualifier" },
  { value: "en_cours", label: "En cours" },
  { value: "partenaire_ok", label: "Partenaire OK" },
  { value: "refuse", label: "Refusé" },
  { value: "archive", label: "Archivé" },
];

const PRIORITY_OPTIONS = [
  { value: "basse", label: "Basse" },
  { value: "normale", label: "Normale" },
  { value: "haute", label: "Haute" },
];

const ZONE_LABELS: Record<string, string> = {
  paris: "Paris",
  petite_couronne: "Petite couronne (92, 93, 94)",
  idf: "Île-de-France",
  autre: "Autre",
};

const TRADE_LABELS: Record<string, string> = {
  carrelage: "Carrelage",
  plomberie: "Plomberie",
  electricite: "Électricité",
  menuiserie: "Menuiserie",
  peinture: "Peinture",
  autre: "Autre",
};

const COLLABORATION_TYPE_LABELS: Record<string, string> = {
  ponctuelle: "Ponctuelle",
  recurrente: "Récurrente",
};

const AVAILABILITY_LABELS: Record<string, string> = {
  immediat: "Immédiat",
  moins_1_mois: "Moins d'1 mois",
  a_definir: "À définir",
};

const CONTEXT_LABELS: Record<string, string> = {
  client_signe: "Client signé",
  chiffrage: "Chiffrage",
  recherche_reguliere: "Recherche régulière",
  mission_ponctuelle: "Mission ponctuelle",
};

const INTERVENTION_LABELS: Record<string, string> = {
  pose_seule: "Pose seule",
  pose_plus_mise_en_service: "Pose + mise en service",
  avec_maitre_oeuvre: "Avec maître d'œuvre",
  cle_en_main: "Clé en main",
};

const SERVICE_LABELS: Record<string, string> = {
  sdb_complete: "Salle de bain complète",
  douche_receveur: "Douche / Receveur",
  carrelage: "Carrelage",
  cuisine: "Cuisine",
  mobilier_sur_mesure: "Mobilier sur mesure",
  robinetterie: "Robinetterie",
  autre: "Autre",
};

const ACTIVITY_LABELS: Record<string, string> = {
  marque: "Marque",
  fabricant: "Fabricant",
  distributeur: "Distributeur",
  showroom: "Showroom",
  site_ecommerce: "Site e-commerce",
  site_decoration_media: "Site décoration / Média",
};

const GOAL_LABELS: Record<string, string> = {
  etre_recommande: "Être recommandé",
  projets_concrets: "Projets concrets",
  partenariat_recurrent: "Partenariat récurrent",
  operation_presse_contenu: "Opération presse / contenu",
};

const CATEGORY_LABELS: Record<string, string> = {
  sdb: "Salle de bain",
  cuisine: "Cuisine",
  robinetterie: "Robinetterie",
  revetements: "Revêtements",
  mobilier: "Mobilier",
  luminaires: "Luminaires",
  accessoires_deco: "Accessoires déco",
  selection_inspiration: "Sélection / Inspiration",
  autre: "Autre",
};

export function PartnerContactDetail({ contactId, onBack }: PartnerContactDetailProps) {
  const [contact, setContact] = useState<PartnerContact | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    status: "",
    priority: "",
    assigned_to: "",
    next_followup_at: "",
    internal_notes: "",
  });

  useEffect(() => {
    fetchContact();
  }, [contactId]);

  const fetchContact = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("partner_contacts")
        .select("*")
        .eq("id", contactId)
        .single();

      if (error) throw error;
      
      const typedData = data as unknown as PartnerContact;
      setContact(typedData);
      setFormData({
        status: typedData.status || "",
        priority: typedData.priority || "",
        assigned_to: typedData.assigned_to || "",
        next_followup_at: typedData.next_followup_at ? typedData.next_followup_at.split("T")[0] : "",
        internal_notes: typedData.internal_notes || "",
      });
    } catch (error) {
      console.error("Error fetching contact:", error);
      toast.error("Erreur lors du chargement");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updateData: Record<string, any> = {
        status: formData.status,
        priority: formData.priority,
        assigned_to: formData.assigned_to || null,
        next_followup_at: formData.next_followup_at || null,
        internal_notes: formData.internal_notes || null,
      };

      const { error } = await supabase
        .from("partner_contacts")
        .update(updateData)
        .eq("id", contactId);

      if (error) throw error;
      
      toast.success("Modifications enregistrées");
      fetchContact();
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setIsSaving(false);
    }
  };

  const markAsContacted = async () => {
    try {
      const { error } = await supabase
        .from("partner_contacts")
        .update({ last_contacted_at: new Date().toISOString() })
        .eq("id", contactId);

      if (error) throw error;
      toast.success("Marqué comme contacté");
      fetchContact();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Erreur");
    }
  };

  if (isLoading || !contact) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const whatsappUrl = `https://wa.me/${contact.phone.replace(/\D/g, "")}`;

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour à la liste
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="mb-2">{FAMILY_LABELS[contact.partner_family]}</Badge>
                  <CardTitle className="text-2xl">{contact.company_name}</CardTitle>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${contact.phone}`}
                    className="p-3 bg-primary text-primary-foreground rounded-full hover:opacity-90"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-green-500 text-white rounded-full hover:opacity-90"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="p-3 bg-muted text-foreground rounded-full hover:bg-muted/80"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium">{contact.contact_first_name} {contact.contact_last_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Zone</p>
                  <p className="font-medium">{ZONE_LABELS[contact.zone] || contact.zone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{contact.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Téléphone</p>
                  <p className="font-medium">{contact.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Family-specific info */}
          <Card>
            <CardHeader>
              <CardTitle>Informations spécifiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contact.partner_family === "sub_traitant" && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {contact.trade && (
                    <div>
                      <p className="text-sm text-muted-foreground">Métier</p>
                      <p className="font-medium">{TRADE_LABELS[contact.trade] || contact.trade}</p>
                    </div>
                  )}
                  {contact.collaboration_type && (
                    <div>
                      <p className="text-sm text-muted-foreground">Type de collaboration</p>
                      <p className="font-medium">{COLLABORATION_TYPE_LABELS[contact.collaboration_type]}</p>
                    </div>
                  )}
                  {contact.availability && (
                    <div>
                      <p className="text-sm text-muted-foreground">Disponibilité</p>
                      <p className="font-medium">{AVAILABILITY_LABELS[contact.availability]}</p>
                    </div>
                  )}
                </div>
              )}

              {contact.partner_family === "installateur" && (
                <div className="space-y-4">
                  {contact.requested_services && contact.requested_services.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Prestations recherchées</p>
                      <div className="flex flex-wrap gap-2">
                        {contact.requested_services.map((s) => (
                          <Badge key={s} variant="secondary">{SERVICE_LABELS[s] || s}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {contact.context && (
                      <div>
                        <p className="text-sm text-muted-foreground">Cadre</p>
                        <p className="font-medium">{CONTEXT_LABELS[contact.context]}</p>
                      </div>
                    )}
                    {contact.intervention_level && (
                      <div>
                        <p className="text-sm text-muted-foreground">Niveau d'intervention</p>
                        <p className="font-medium">{INTERVENTION_LABELS[contact.intervention_level]}</p>
                      </div>
                    )}
                    {contact.timeline && (
                      <div>
                        <p className="text-sm text-muted-foreground">Délais</p>
                        <p className="font-medium">{AVAILABILITY_LABELS[contact.timeline]}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {contact.partner_family === "marque_site" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {contact.activity_type && (
                      <div>
                        <p className="text-sm text-muted-foreground">Type d'activité</p>
                        <p className="font-medium">{ACTIVITY_LABELS[contact.activity_type]}</p>
                      </div>
                    )}
                    {contact.website_url && (
                      <div>
                        <p className="text-sm text-muted-foreground">Site web</p>
                        <a 
                          href={contact.website_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline flex items-center gap-1"
                        >
                          <Globe className="w-4 h-4" />
                          Voir le site
                        </a>
                      </div>
                    )}
                    {contact.collaboration_goal && (
                      <div>
                        <p className="text-sm text-muted-foreground">Objectif</p>
                        <p className="font-medium">{GOAL_LABELS[contact.collaboration_goal]}</p>
                      </div>
                    )}
                  </div>
                  {contact.offer_categories && contact.offer_categories.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Catégories proposées</p>
                      <div className="flex flex-wrap gap-2">
                        {contact.offer_categories.map((c) => (
                          <Badge key={c} variant="secondary">{CATEGORY_LABELS[c] || c}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Message */}
          <Card>
            <CardHeader>
              <CardTitle>Message</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{contact.message}</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Management */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Statut</label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Priorité</label>
                <Select value={formData.priority} onValueChange={(v) => setFormData({ ...formData, priority: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Assigné à</label>
                <Input
                  value={formData.assigned_to}
                  onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                  placeholder="Nom du responsable"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Prochain suivi</label>
                <Input
                  type="date"
                  value={formData.next_followup_at}
                  onChange={(e) => setFormData({ ...formData, next_followup_at: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Notes internes</label>
                <Textarea
                  value={formData.internal_notes}
                  onChange={(e) => setFormData({ ...formData, internal_notes: e.target.value })}
                  placeholder="Notes privées..."
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={isSaving} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "..." : "Enregistrer"}
                </Button>
                <Button variant="outline" onClick={markAsContacted}>
                  Contacté
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historique</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Créé le</span>
                <span>{format(new Date(contact.created_at), "dd/MM/yyyy HH:mm", { locale: fr })}</span>
              </div>
              {contact.last_contacted_at && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dernier contact</span>
                  <span>{format(new Date(contact.last_contacted_at), "dd/MM/yyyy HH:mm", { locale: fr })}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Source</span>
                <span>{contact.source}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Status Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {STATUS_OPTIONS.slice(0, 4).map((opt) => (
                <Button
                  key={opt.value}
                  variant={formData.status === opt.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setFormData({ ...formData, status: opt.value });
                  }}
                >
                  {opt.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
