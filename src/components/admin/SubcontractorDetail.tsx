import { useState, useEffect } from "react";
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
  FileText,
  AlertTriangle,
  Download,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, isPast, isWithinInterval, addDays } from "date-fns";
import { fr } from "date-fns/locale";

type SubcontractorDocument = Tables<"subcontractor_documents">;

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
  const [documents, setDocuments] = useState<SubcontractorDocument[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const { toast } = useToast();

  // Fetch insurance documents
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const { data, error } = await supabase
          .from("subcontractor_documents")
          .select("*")
          .eq("subcontractor_id", subcontractor.id)
          .in("document_type", ["rc_pro", "decennale"]);

        if (error) throw error;
        setDocuments(data || []);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoadingDocs(false);
      }
    };

    fetchDocuments();
  }, [subcontractor.id]);

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

  // Helper to get document expiry status
  const getExpiryStatus = (expiryDate: string | null) => {
    if (!expiryDate) return { status: "unknown", label: "Date inconnue", color: "bg-muted text-muted-foreground" };
    
    const date = new Date(expiryDate);
    const now = new Date();
    const in30Days = addDays(now, 30);
    
    if (isPast(date)) {
      return { status: "expired", label: "Expiré", color: "bg-destructive/10 text-destructive border-destructive/20" };
    }
    if (isWithinInterval(date, { start: now, end: in30Days })) {
      return { status: "expiring", label: "Expire bientôt", color: "bg-yellow-100 text-yellow-800 border-yellow-200" };
    }
    return { status: "valid", label: "Valide", color: "bg-green-100 text-green-800 border-green-200" };
  };

  // Helper to get document download URL
  const getDocumentUrl = async (filePath: string) => {
    const { data, error } = await supabase.storage
      .from("subcontractor-files")
      .createSignedUrl(filePath, 3600);
    
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de télécharger le document.",
        variant: "destructive",
      });
      return null;
    }
    return data.signedUrl;
  };

  const handleDownload = async (doc: SubcontractorDocument) => {
    const url = await getDocumentUrl(doc.file_path);
    if (url) {
      window.open(url, "_blank");
    }
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

              {/* Legal info */}
              {(subcontractor.siret || subcontractor.vat_number) && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Informations légales
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {subcontractor.siret && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">SIRET</p>
                        <p className="font-medium font-mono">{subcontractor.siret}</p>
                      </div>
                    )}
                    {subcontractor.vat_number && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">N° TVA</p>
                        <p className="font-medium font-mono">{subcontractor.vat_number}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Manager info */}
              {(subcontractor.manager_first_name || subcontractor.manager_last_name || subcontractor.manager_phone) && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Gérant / Responsable chantier
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {(subcontractor.manager_first_name || subcontractor.manager_last_name) && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Nom complet</p>
                        <p className="font-medium">
                          {subcontractor.manager_first_name} {subcontractor.manager_last_name}
                        </p>
                      </div>
                    )}
                    {subcontractor.manager_phone && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Téléphone</p>
                        <p className="font-medium">{subcontractor.manager_phone}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

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

              {/* Insurance info */}
              {(subcontractor.insurance_company || subcontractor.insurance_contract_number) && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Assurance
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {subcontractor.insurance_company && (
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Assureur</p>
                          <p className="font-medium">{subcontractor.insurance_company}</p>
                        </div>
                      )}
                      {subcontractor.insurance_contract_number && (
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">N° de contrat</p>
                          <p className="font-medium">{subcontractor.insurance_contract_number}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Insurance Documents */}
              <Separator />
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Documents d'assurance
                </h3>
                {loadingDocs ? (
                  <p className="text-sm text-muted-foreground">Chargement...</p>
                ) : documents.length === 0 ? (
                  <div className="p-4 bg-muted/50 rounded-lg flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <p className="text-sm text-muted-foreground">
                      Aucun document d'assurance téléchargé
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {documents.map((doc) => {
                      const expiryInfo = getExpiryStatus(doc.expiry_date);
                      const docLabel = doc.document_type === "rc_pro" 
                        ? "Responsabilité Civile Pro" 
                        : "Garantie Décennale";
                      
                      return (
                        <div
                          key={doc.id}
                          className="p-4 bg-muted/50 rounded-lg flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium truncate">{docLabel}</p>
                              <p className="text-sm text-muted-foreground truncate">
                                {doc.file_name}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <div className="text-right">
                              {doc.expiry_date && (
                                <p className="text-sm">
                                  Expire le{" "}
                                  <span className="font-medium">
                                    {format(new Date(doc.expiry_date), "dd MMM yyyy", { locale: fr })}
                                  </span>
                                </p>
                              )}
                              <Badge className={`${expiryInfo.color} border mt-1`}>
                                {expiryInfo.label}
                              </Badge>
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDownload(doc)}
                              title="Télécharger"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
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
                      {(() => {
                        // Sanitize URL - only allow http and https protocols
                        const sanitizeUrl = (url: string | null): string | null => {
                          if (!url) return null;
                          try {
                            const parsed = new URL(url);
                            if (['http:', 'https:'].includes(parsed.protocol)) {
                              return url;
                            }
                          } catch {}
                          return null;
                        };
                        
                        const safeWebsite = sanitizeUrl(subcontractor.website_url);
                        const safeInstagram = sanitizeUrl(subcontractor.instagram_url);
                        const safeFacebook = sanitizeUrl(subcontractor.facebook_url);
                        const safeLinkedin = sanitizeUrl(subcontractor.linkedin_url);
                        const safeHouzz = sanitizeUrl(subcontractor.houzz_url);
                        
                        return (
                          <>
                            {safeWebsite && (
                              <a
                                href={safeWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                              >
                                <Globe className="w-4 h-4" />
                                Site web
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {safeInstagram && (
                              <a
                                href={safeInstagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                              >
                                <Instagram className="w-4 h-4" />
                                Instagram
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {safeFacebook && (
                              <a
                                href={safeFacebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                              >
                                <Facebook className="w-4 h-4" />
                                Facebook
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {safeLinkedin && (
                              <a
                                href={safeLinkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                              >
                                <Linkedin className="w-4 h-4" />
                                LinkedIn
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {safeHouzz && (
                              <a
                                href={safeHouzz}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Houzz
                              </a>
                            )}
                          </>
                        );
                      })()}
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
