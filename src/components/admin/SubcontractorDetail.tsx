import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Wrench,
  Globe,
  Instagram,
  Facebook,
  Linkedin,
  ExternalLink,
  Star,
  MessageCircle,
  Save,
  CheckCircle,
  XCircle,
  Clock,
  Archive,
  Users,
  Briefcase,
  Euro,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type Subcontractor = Tables<"subcontractors">;
type SubcontractorStatus = "pending" | "reviewing" | "validated" | "refused" | "archived";

interface SubcontractorDetailProps {
  subcontractor: Subcontractor;
  onBack: () => void;
  onUpdate: (updated: Subcontractor) => void;
}

const statusLabels: Record<SubcontractorStatus, string> = {
  pending: "En attente",
  reviewing: "En cours d'examen",
  validated: "Validé",
  refused: "Refusé",
  archived: "Archivé",
};

const statusColors: Record<SubcontractorStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  reviewing: "bg-blue-100 text-blue-800 border-blue-200",
  validated: "bg-green-100 text-green-800 border-green-200",
  refused: "bg-red-100 text-red-800 border-red-200",
  archived: "bg-gray-100 text-gray-800 border-gray-200",
};

export function SubcontractorDetail({
  subcontractor,
  onBack,
  onUpdate,
}: SubcontractorDetailProps) {
  const [status, setStatus] = useState<SubcontractorStatus>(subcontractor.status);
  const [internalNotes, setInternalNotes] = useState(subcontractor.internal_notes || "");
  const [internalRating, setInternalRating] = useState(subcontractor.internal_rating || 0);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from("subcontractors")
        .update({
          status,
          internal_notes: internalNotes,
          internal_rating: internalRating,
        })
        .eq("id", subcontractor.id)
        .select()
        .single();

      if (error) throw error;

      onUpdate(data);
      toast({
        title: "Modifications enregistrées",
        description: "Les informations ont été mises à jour avec succès.",
      });
    } catch (error) {
      console.error("Error updating subcontractor:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les modifications.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Format phone number for WhatsApp (remove spaces, add country code)
  const formatPhoneForWhatsApp = (phone: string) => {
    const cleaned = phone.replace(/\s+/g, "").replace(/^0/, "33");
    return cleaned.startsWith("+") ? cleaned.slice(1) : cleaned;
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Retour à la liste
        </Button>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="w-4 h-4" />
          {saving ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Building2 className="w-5 h-5 text-primary" />
                    {subcontractor.company_name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Candidature reçue le{" "}
                    {format(new Date(subcontractor.created_at), "dd MMMM yyyy à HH:mm", {
                      locale: fr,
                    })}
                  </p>
                </div>
                <Badge className={`${statusColors[status]} border`}>
                  {statusLabels[status]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact info */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Contact
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="font-medium">{subcontractor.contact_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {subcontractor.contact_function}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {subcontractor.email}
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {subcontractor.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Communication buttons */}
              <div className="flex flex-wrap gap-3 p-4 bg-muted/50 rounded-xl">
                <a
                  href={`https://wa.me/${formatPhoneForWhatsApp(subcontractor.phone)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20BD5C] transition-colors font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${subcontractor.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <Phone className="w-4 h-4" />
                  Appeler
                </a>
                <a
                  href={`mailto:${subcontractor.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </div>

              <Separator />

              {/* Zones & Trades */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Zones d'intervention
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {subcontractor.zones.map((zone) => (
                      <Badge key={zone} variant="outline">
                        {zone}
                      </Badge>
                    ))}
                    {subcontractor.zone_other && (
                      <Badge variant="secondary">{subcontractor.zone_other}</Badge>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Wrench className="w-4 h-4" />
                    Métiers
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {subcontractor.trades.map((trade) => (
                      <Badge key={trade} variant="secondary">
                        {trade}
                      </Badge>
                    ))}
                    {subcontractor.trade_other && (
                      <Badge variant="outline">{subcontractor.trade_other}</Badge>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Company details */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Informations entreprise
                </h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Expérience</p>
                    <p className="font-medium">{subcontractor.experience}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      Effectif
                    </div>
                    <p className="font-medium">{subcontractor.employee_count} personne(s)</p>
                    {subcontractor.managed_people_count && (
                      <p className="text-sm text-muted-foreground">
                        + {subcontractor.managed_people_count} géré(s)
                      </p>
                    )}
                  </div>
                  {subcontractor.annual_revenue && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Euro className="w-4 h-4" />
                        CA annuel
                      </div>
                      <p className="font-medium">{subcontractor.annual_revenue}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Criteria */}
              <div>
                <h3 className="font-semibold mb-3">Critères</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    {subcontractor.works_as_subcontractor ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-sm">Travaille en sous-traitance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {subcontractor.autonomous_intervention ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-sm">Intervention autonome</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {subcontractor.occupied_sites_experience ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-sm">Chantiers occupés</span>
                  </div>
                </div>
              </div>

              {/* Presentation */}
              {subcontractor.presentation && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-3">Présentation</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {subcontractor.presentation}
                    </p>
                  </div>
                </>
              )}

              {/* URLs */}
              {(subcontractor.website_url ||
                subcontractor.instagram_url ||
                subcontractor.facebook_url ||
                subcontractor.linkedin_url ||
                subcontractor.houzz_url) && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-3">Liens</h3>
                    <div className="flex flex-wrap gap-3">
                      {subcontractor.website_url && (
                        <a
                          href={subcontractor.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                        >
                          <Globe className="w-4 h-4" />
                          Site web
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {subcontractor.instagram_url && (
                        <a
                          href={subcontractor.instagram_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                        >
                          <Instagram className="w-4 h-4" />
                          Instagram
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {subcontractor.facebook_url && (
                        <a
                          href={subcontractor.facebook_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                        >
                          <Facebook className="w-4 h-4" />
                          Facebook
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {subcontractor.linkedin_url && (
                        <a
                          href={subcontractor.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                          LinkedIn
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {subcontractor.houzz_url && (
                        <a
                          href={subcontractor.houzz_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Houzz
                        </a>
                      )}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Admin tools */}
        <div className="space-y-6">
          {/* Status management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Gestion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Statut</label>
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value as SubcontractorStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        En attente
                      </div>
                    </SelectItem>
                    <SelectItem value="reviewing">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        En cours d'examen
                      </div>
                    </SelectItem>
                    <SelectItem value="validated">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Validé
                      </div>
                    </SelectItem>
                    <SelectItem value="refused">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Refusé
                      </div>
                    </SelectItem>
                    <SelectItem value="archived">
                      <div className="flex items-center gap-2">
                        <Archive className="w-4 h-4" />
                        Archivé
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Note interne (1-5)
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setInternalRating(rating)}
                      className={`p-1.5 rounded transition-colors ${
                        rating <= internalRating
                          ? "text-yellow-500"
                          : "text-muted-foreground/30"
                      }`}
                    >
                      <Star
                        className="w-6 h-6"
                        fill={rating <= internalRating ? "currentColor" : "none"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Notes internes
                </label>
                <Textarea
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Notes privées sur ce sous-traitant..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => setStatus("validated")}
              >
                <CheckCircle className="w-4 h-4 text-green-600" />
                Valider la candidature
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => setStatus("refused")}
              >
                <XCircle className="w-4 h-4 text-red-600" />
                Refuser la candidature
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => setStatus("archived")}
              >
                <Archive className="w-4 h-4" />
                Archiver
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
