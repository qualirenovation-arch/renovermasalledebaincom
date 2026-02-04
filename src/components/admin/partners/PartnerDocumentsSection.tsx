import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Trash2, Download, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface PartnerDocument {
  id: string;
  document_type: string;
  file_name: string;
  file_path: string;
  uploaded_by: string | null;
  created_at: string;
}

interface PartnerDocumentsSectionProps {
  partnerId: string;
  partnerFamily: string;
}

const DOCUMENT_TYPES = [
  { value: "kbis", label: "Extrait KBIS" },
  { value: "rc_pro", label: "Attestation RC Professionnelle" },
  { value: "decennale", label: "Attestation Décennale" },
  { value: "qualibat", label: "Certification Qualibat" },
  { value: "autre", label: "Autre document" },
];

export function PartnerDocumentsSection({ partnerId, partnerFamily }: PartnerDocumentsSectionProps) {
  const [documents, setDocuments] = useState<PartnerDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, [partnerId]);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from("partner_documents")
        .select("*")
        .eq("partner_contact_id", partnerId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Format non supporté. Utilisez PDF, JPEG ou PNG.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Fichier trop volumineux (max 5 Mo)");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedType) {
      toast.error("Veuillez sélectionner un type et un fichier");
      return;
    }

    setIsUploading(true);
    try {
      // Generate unique file path
      const fileExt = selectedFile.name.split('.').pop();
      const filePath = `partners/${partnerId}/${selectedType}_${Date.now()}.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("subcontractor-files")
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Save metadata to database
      const { error: dbError } = await supabase
        .from("partner_documents")
        .insert({
          partner_contact_id: partnerId,
          document_type: selectedType,
          file_name: selectedFile.name,
          file_path: filePath,
          uploaded_by: "admin",
        });

      if (dbError) throw dbError;

      toast.success("Document uploadé avec succès");
      setSelectedFile(null);
      setSelectedType("");
      fetchDocuments();
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Erreur lors de l'upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (doc: PartnerDocument) => {
    try {
      const { data, error } = await supabase.storage
        .from("subcontractor-files")
        .createSignedUrl(doc.file_path, 60);

      if (error) throw error;
      
      window.open(data.signedUrl, "_blank");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Erreur lors du téléchargement");
    }
  };

  const handleDelete = async (doc: PartnerDocument) => {
    if (!confirm("Supprimer ce document ?")) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("subcontractor-files")
        .remove([doc.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from("partner_documents")
        .delete()
        .eq("id", doc.id);

      if (dbError) throw dbError;

      toast.success("Document supprimé");
      fetchDocuments();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    return DOCUMENT_TYPES.find(t => t.value === type)?.label || type;
  };

  const getDocumentStatus = (type: string) => {
    const exists = documents.some(d => d.document_type === type);
    return exists;
  };

  // Only show for subcontractors
  if (partnerFamily !== "sub_traitant") {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Documents administratifs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Document status overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DOCUMENT_TYPES.slice(0, 4).map((docType) => {
            const hasDoc = getDocumentStatus(docType.value);
            return (
              <div
                key={docType.value}
                className={`flex items-center gap-2 p-3 rounded-lg border ${
                  hasDoc 
                    ? 'bg-primary/10 border-primary/30' 
                    : 'bg-muted/50 border-border'
                }`}
              >
                {hasDoc ? (
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
                <span className="text-sm font-medium truncate">{docType.label}</span>
              </div>
            );
          })}
        </div>

        {/* Upload form */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-4">
          <h4 className="font-medium">Ajouter un document</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type de document" />
              </SelectTrigger>
              <SelectContent>
                {DOCUMENT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className={`flex items-center gap-2 px-4 py-2 h-12 rounded-xl border-2 border-dashed transition-colors ${
                selectedFile ? 'bg-accent border-primary/50' : 'bg-background border-border hover:border-primary/50'
              }`}>
                {selectedFile ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm truncate">{selectedFile.name}</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Choisir un fichier</span>
                  </>
                )}
              </div>
            </div>

            <Button 
              onClick={handleUpload} 
              disabled={!selectedFile || !selectedType || isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Upload...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Ajouter
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Documents list */}
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : documents.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Aucun document uploadé
          </p>
        ) : (
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 bg-background rounded-lg border"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{doc.file_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {getDocumentTypeLabel(doc.document_type)} • {format(new Date(doc.created_at), "d MMM yyyy", { locale: fr })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(doc)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(doc)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
