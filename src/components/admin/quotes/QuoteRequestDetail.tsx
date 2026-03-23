import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Droplets, Home, FileText, Save, ExternalLink, Loader2, Bell, CheckCircle, MailX, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

interface QuoteRequestDetailProps {
  quoteId: string;
  onBack: () => void;
}

const STATUS_OPTIONS = [
  { value: "nouveau", label: "Nouveau" },
  { value: "en_cours", label: "En cours" },
  { value: "devis_envoye", label: "Devis envoyé" },
  { value: "accepte", label: "Accepté" },
  { value: "refuse", label: "Refusé" },
  { value: "archive", label: "Archivé" },
];

const PRIORITY_OPTIONS = [
  { value: "basse", label: "Basse" },
  { value: "normale", label: "Normale" },
  { value: "haute", label: "Haute" },
  { value: "urgente", label: "Urgente" },
];

const ROOMS_LABELS: Record<string, string> = {
  salle_de_bain: "Salle de bain",
  cuisine: "Cuisine",
  wc: "WC",
  chambre: "Chambre",
  sejour: "Séjour",
  couloir: "Couloir / Entrée",
};

const WORKS_LABELS: Record<string, string> = {
  peinture: "Remise en état peinture",
  parquet: "Remise en état parquet / sol",
  carrelage: "Carrelage",
  salle_de_bain: "Salle de bain",
  cuisine: "Cuisine",
  wc: "WC",
  mobilier: "Mobilier / rangements",
};

export function QuoteRequestDetail({ quoteId, onBack }: QuoteRequestDetailProps) {
  const [quote, setQuote] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [nextFollowupAt, setNextFollowupAt] = useState("");
  const [documentUrls, setDocumentUrls] = useState<Record<string, string>>({});
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchQuote();
  }, [quoteId]);

  // Load signed URLs for water damage documents (private bucket)
  useEffect(() => {
    const loadDocumentUrls = async () => {
      if (!quote?.water_damage_documents || quote.water_damage_documents.length === 0) {
        return;
      }

      setLoadingDocs(true);
      try {
        const urlPromises = quote.water_damage_documents.map(async (docPath: string) => {
          const { data, error } = await supabase.storage
            .from('water-damage-documents')
            .createSignedUrl(docPath, 3600); // 1 hour expiry
          
          if (error) {
            console.error('Error generating signed URL for', docPath, error);
            return { docPath, url: null };
          }
          return { docPath, url: data.signedUrl };
        });

        const results = await Promise.all(urlPromises);
        const urls = results.reduce((acc, { docPath, url }) => {
          if (url) acc[docPath] = url;
          return acc;
        }, {} as Record<string, string>);
        
        setDocumentUrls(urls);
      } catch (error) {
        console.error('Error loading document URLs:', error);
      } finally {
        setLoadingDocs(false);
      }
    };

    loadDocumentUrls();
  }, [quote?.water_damage_documents]);

  const fetchQuote = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .eq("id", quoteId)
        .single();

      if (error) throw error;
      setQuote(data);
      setStatus(data.status);
      setPriority(data.priority);
      setInternalNotes(data.internal_notes || "");
      setNextFollowupAt(data.next_followup_at ? data.next_followup_at.split("T")[0] : "");
    } catch (error) {
      console.error("Error fetching quote:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la demande.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("quote_requests")
        .update({
          status,
          priority,
          internal_notes: internalNotes,
          next_followup_at: nextFollowupAt || null,
        })
        .eq("id", quoteId);

      if (error) throw error;
      
      toast({
        title: "Enregistré",
        description: "Les modifications ont été sauvegardées.",
      });
    } catch (error) {
      console.error("Error saving:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      const { data, error } = await supabase.functions.invoke('resend-confirmation', {
        body: { leadId: quoteId },
      });

      if (error) throw error;
      if (!data?.success) throw new Error("Échec");

      toast({ title: "Email renvoyé", description: "L'email de confirmation a été renvoyé au client." });
      fetchQuote(); // Refresh to update email_confirmation_sent
    } catch (error) {
      console.error("Error resending email:", error);
      toast({ title: "Échec de l'envoi", description: "Impossible de renvoyer l'email.", variant: "destructive" });
    } finally {
      setIsResending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Demande non trouvée</p>
        <Button variant="outline" onClick={onBack} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
      </div>
    );
  }

  const isWaterDamage = quote.type_devis === "degat_des_eaux";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          {isWaterDamage ? (
            <Badge className="bg-blue-100 text-blue-800 text-base px-3 py-1">
              <Droplets className="w-4 h-4 mr-2" />
              Dégât des eaux
            </Badge>
          ) : (
            <Badge className="bg-amber-100 text-amber-800 text-base px-3 py-1">
              <Home className="w-4 h-4 mr-2" />
              Rénovation classique
            </Badge>
          )}
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client info */}
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">👤</span>
              Informations client
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nom complet</p>
                <p className="font-medium">{quote.client_first_name} {quote.client_last_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <a href={`mailto:${quote.client_email}`} className="font-medium text-primary hover:underline flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {quote.client_email}
                </a>
              </div>
              {quote.client_phone && (
                <div>
                  <p className="text-sm text-muted-foreground">Téléphone</p>
                  <a href={`tel:${quote.client_phone}`} className="font-medium text-primary hover:underline flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {quote.client_phone}
                  </a>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Date de demande</p>
                <p className="font-medium flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(quote.created_at), "dd MMMM yyyy à HH:mm", { locale: fr })}
                </p>
              </div>
            </div>
          </div>

          {/* Property info */}
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">🏠</span>
              Logement
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quote.property_type && (
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{quote.property_type}</p>
                </div>
              )}
              {quote.property_address && (
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Adresse</p>
                  <p className="font-medium flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {quote.property_address}
                    {quote.property_postal_code && `, ${quote.property_postal_code}`}
                    {quote.property_city && ` ${quote.property_city}`}
                  </p>
                </div>
              )}
              {quote.property_surface && (
                <div>
                  <p className="text-sm text-muted-foreground">Surface</p>
                  <p className="font-medium">{quote.property_surface} m²</p>
                </div>
              )}
              {quote.property_floor && (
                <div>
                  <p className="text-sm text-muted-foreground">Étage</p>
                  <p className="font-medium">{quote.property_floor}</p>
                </div>
              )}
              {quote.property_elevator && (
                <div>
                  <p className="text-sm text-muted-foreground">Ascenseur</p>
                  <p className="font-medium">{quote.property_elevator === "oui" ? "Oui" : "Non"}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Logement occupé</p>
                <p className="font-medium">{quote.property_occupied ? "Oui" : "Non"}</p>
              </div>
            </div>
          </div>

          {/* Water damage specific info */}
          {isWaterDamage && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-blue-900">
                <Droplets className="w-5 h-5 text-blue-600" />
                Détails du sinistre
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-blue-700">Assurance déclarée</p>
                  <p className="font-medium">
                    {quote.water_damage_insurance_declared === "oui" ? "✅ Oui" : 
                     quote.water_damage_insurance_declared === "non" ? "❌ Non" : "⏳ En cours"}
                  </p>
                </div>
                {quote.water_damage_claim_number && (
                  <div>
                    <p className="text-sm text-blue-700">N° de sinistre</p>
                    <p className="font-medium">{quote.water_damage_claim_number}</p>
                  </div>
                )}
                {quote.water_damage_origin && (
                  <div>
                    <p className="text-sm text-blue-700">Origine</p>
                    <p className="font-medium capitalize">{quote.water_damage_origin.replace(/_/g, " ")}</p>
                  </div>
                )}
                {quote.water_damage_nature && (
                  <div>
                    <p className="text-sm text-blue-700">Nature de la fuite</p>
                    <p className="font-medium capitalize">{quote.water_damage_nature.replace(/_/g, " ")}</p>
                  </div>
                )}
                {quote.water_damage_rooms && quote.water_damage_rooms.length > 0 && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-blue-700 mb-2">Pièces concernées</p>
                    <div className="flex flex-wrap gap-2">
                      {quote.water_damage_rooms.map((room: string) => (
                        <Badge key={room} variant="secondary" className="bg-blue-100 text-blue-800">
                          {ROOMS_LABELS[room] || room}
                        </Badge>
                      ))}
                      {quote.water_damage_rooms_other && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {quote.water_damage_rooms_other}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                {quote.water_damage_works && quote.water_damage_works.length > 0 && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-blue-700 mb-2">Travaux à réaliser</p>
                    <div className="flex flex-wrap gap-2">
                      {quote.water_damage_works.map((work: string) => (
                        <Badge key={work} variant="secondary" className="bg-blue-100 text-blue-800">
                          {WORKS_LABELS[work] || work}
                        </Badge>
                      ))}
                      {quote.water_damage_works_other && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {quote.water_damage_works_other}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                {quote.water_damage_scope && (
                  <div>
                    <p className="text-sm text-blue-700">Étendue souhaitée</p>
                    <p className="font-medium">
                      {quote.water_damage_scope === "remise_en_etat" ? "Remise en état uniquement" :
                       quote.water_damage_scope === "renovation_partielle" ? "Rénovation partielle" : "Rénovation complète"}
                    </p>
                  </div>
                )}
                {quote.water_damage_documents && quote.water_damage_documents.length > 0 && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-blue-700 mb-2">Documents joints</p>
                    {loadingDocs ? (
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Chargement des documents...
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {quote.water_damage_documents.map((doc: string, index: number) => {
                          const signedUrl = documentUrls[doc];
                          return signedUrl ? (
                            <a
                              key={index}
                              href={signedUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 hover:underline"
                            >
                              <FileText className="w-4 h-4" />
                              Document {index + 1}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <FileText className="w-4 h-4" />
                              Document {index + 1} (non disponible)
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Message */}
          {quote.message && (
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">💬</span>
                Message du client
              </h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{quote.message}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Priority */}
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Gestion</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Statut</label>
                <Select value={status} onValueChange={setStatus}>
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
                <label className="text-sm text-muted-foreground mb-2 block">Priorité</label>
                <Select value={priority} onValueChange={setPriority}>
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
          </div>

          {/* Email Status */}
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email de confirmation
            </h3>
            <div className="space-y-3">
              {quote.email_confirmation_sent ? (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Email envoyé</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-700 bg-amber-50 p-3 rounded-lg">
                  <MailX className="w-4 h-4" />
                  <span className="text-sm font-medium">Email non envoyé</span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={handleResendEmail}
                disabled={isResending}
              >
                {isResending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                {isResending ? "Envoi en cours..." : "Renvoyer l'email"}
              </Button>
            </div>
          </div>

          {/* Follow-up tracking */}
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Suivi & Relance
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Prochaine relance</label>
                <Input
                  type="date"
                  value={nextFollowupAt}
                  onChange={(e) => setNextFollowupAt(e.target.value)}
                />
              </div>
              {quote.last_contacted_at && (
                <div>
                  <p className="text-sm text-muted-foreground">Dernier contact</p>
                  <p className="text-sm font-medium">
                    {format(new Date(quote.last_contacted_at), "dd/MM/yyyy HH:mm", { locale: fr })}
                  </p>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={async () => {
                  try {
                    const { error } = await supabase
                      .from("quote_requests")
                      .update({ last_contacted_at: new Date().toISOString() })
                      .eq("id", quoteId);
                    if (error) throw error;
                    toast({ title: "Marqué comme contacté" });
                    fetchQuote();
                  } catch {
                    toast({ title: "Erreur", variant: "destructive" });
                  }
                }}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Marquer comme contacté
              </Button>
            </div>
          </div>
          </div>

          {/* Internal notes */}
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Notes internes</h3>
            <Textarea
              placeholder="Ajouter des notes..."
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              rows={6}
            />
          </div>

          {/* Meta */}
          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            <p>Source: {quote.source || "website"}</p>
            <p>Créé: {format(new Date(quote.created_at), "dd/MM/yyyy HH:mm", { locale: fr })}</p>
            <p>Modifié: {format(new Date(quote.updated_at), "dd/MM/yyyy HH:mm", { locale: fr })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
