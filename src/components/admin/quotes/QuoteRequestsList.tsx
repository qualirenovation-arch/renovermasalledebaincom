import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Phone, Mail, RefreshCw, Filter, Droplets, Home } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface QuoteRequest {
  id: string;
  created_at: string;
  type_devis: string;
  client_first_name: string;
  client_last_name: string;
  client_email: string;
  client_phone: string | null;
  property_city: string | null;
  property_postal_code: string | null;
  status: string;
  priority: string;
  water_damage_insurance_declared: string | null;
  water_damage_scope: string | null;
}

interface QuoteRequestsListProps {
  onSelectQuote: (id: string) => void;
}

const TYPE_LABELS: Record<string, string> = {
  classique: "Rénovation",
  degat_des_eaux: "Dégât des eaux",
};

const STATUS_LABELS: Record<string, string> = {
  nouveau: "Nouveau",
  en_cours: "En cours",
  devis_envoye: "Devis envoyé",
  accepte: "Accepté",
  refuse: "Refusé",
  archive: "Archivé",
};

const STATUS_COLORS: Record<string, string> = {
  nouveau: "bg-blue-100 text-blue-800",
  en_cours: "bg-purple-100 text-purple-800",
  devis_envoye: "bg-amber-100 text-amber-800",
  accepte: "bg-green-100 text-green-800",
  refuse: "bg-red-100 text-red-800",
  archive: "bg-gray-100 text-gray-800",
};

const PRIORITY_LABELS: Record<string, string> = {
  basse: "Basse",
  normale: "Normale",
  haute: "Haute",
  urgente: "Urgente",
};

const PRIORITY_COLORS: Record<string, string> = {
  basse: "text-muted-foreground",
  normale: "text-foreground",
  haute: "text-amber-600 font-medium",
  urgente: "text-red-600 font-bold",
};

export function QuoteRequestsList({ onSelectQuote }: QuoteRequestsListProps) {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setQuotes((data as unknown as QuoteRequest[]) || []);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      searchQuery === "" ||
      quote.client_first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.client_last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.client_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (quote.property_city?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    const matchesType = filterType === "all" || quote.type_devis === filterType;
    const matchesStatus = filterStatus === "all" || quote.status === filterStatus;
    const matchesPriority = filterPriority === "all" || quote.priority === filterPriority;

    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  // Count by type
  const countByType = {
    all: quotes.length,
    classique: quotes.filter((q) => q.type_devis === "classique").length,
    degat_des_eaux: quotes.filter((q) => q.type_devis === "degat_des_eaux").length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        <div 
          className={`p-4 rounded-lg border cursor-pointer transition-colors ${filterType === "all" ? "bg-primary/10 border-primary" : "bg-card hover:bg-muted/50"}`}
          onClick={() => setFilterType("all")}
        >
          <div className="text-2xl font-bold">{countByType.all}</div>
          <div className="text-sm text-muted-foreground">Total demandes</div>
        </div>
        <div 
          className={`p-4 rounded-lg border cursor-pointer transition-colors ${filterType === "classique" ? "bg-amber-50 border-amber-300" : "bg-card hover:bg-muted/50"}`}
          onClick={() => setFilterType("classique")}
        >
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-amber-600" />
            <span className="text-2xl font-bold">{countByType.classique}</span>
          </div>
          <div className="text-sm text-muted-foreground">Rénovation classique</div>
        </div>
        <div 
          className={`p-4 rounded-lg border cursor-pointer transition-colors ${filterType === "degat_des_eaux" ? "bg-blue-50 border-blue-300" : "bg-card hover:bg-muted/50"}`}
          onClick={() => setFilterType("degat_des_eaux")}
        >
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-600" />
            <span className="text-2xl font-bold">{countByType.degat_des_eaux}</span>
          </div>
          <div className="text-sm text-muted-foreground">Dégât des eaux</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, email, ville..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="w-4 h-4 mr-2" />
          Filtres
        </Button>
        <Button variant="outline" onClick={fetchQuotes}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualiser
        </Button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type de devis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="classique">Rénovation classique</SelectItem>
              <SelectItem value="degat_des_eaux">Dégât des eaux</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Priorité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes priorités</SelectItem>
              {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filteredQuotes.length} demande{filteredQuotes.length > 1 ? "s" : ""}
      </p>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>Détails</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuotes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Aucune demande trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredQuotes.map((quote) => (
                <TableRow
                  key={quote.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onSelectQuote(quote.id)}
                >
                  <TableCell className="whitespace-nowrap">
                    {format(new Date(quote.created_at), "dd/MM/yy", { locale: fr })}
                  </TableCell>
                  <TableCell>
                    {quote.type_devis === "degat_des_eaux" ? (
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        <Droplets className="w-3 h-3 mr-1" />
                        Dégât des eaux
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                        <Home className="w-3 h-3 mr-1" />
                        Rénovation
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {quote.client_first_name} {quote.client_last_name}
                    </div>
                    <div className="text-sm text-muted-foreground">{quote.client_email}</div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {quote.property_postal_code && quote.property_city
                      ? `${quote.property_postal_code} ${quote.property_city}`
                      : "-"}
                  </TableCell>
                  <TableCell className="text-sm">
                    {quote.type_devis === "degat_des_eaux" ? (
                      <div className="space-y-1">
                        {quote.water_damage_insurance_declared && (
                          <div className="text-xs">
                            Assurance: {quote.water_damage_insurance_declared === "oui" ? "✅ Déclaré" : quote.water_damage_insurance_declared === "non" ? "❌ Non déclaré" : "⏳ En cours"}
                          </div>
                        )}
                        {quote.water_damage_scope && (
                          <div className="text-xs text-muted-foreground">
                            Scope: {quote.water_damage_scope === "remise_en_etat" ? "Remise en état" : quote.water_damage_scope === "renovation_partielle" ? "Réno partielle" : "Réno complète"}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={STATUS_COLORS[quote.status] || "bg-gray-100"}>
                      {STATUS_LABELS[quote.status] || quote.status}
                    </Badge>
                  </TableCell>
                  <TableCell className={PRIORITY_COLORS[quote.priority] || ""}>
                    {PRIORITY_LABELS[quote.priority] || quote.priority}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-2">
                      {quote.client_phone && (
                        <a
                          href={`tel:${quote.client_phone}`}
                          className="p-2 hover:bg-muted rounded-full transition-colors"
                          title="Appeler"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      )}
                      <a
                        href={`mailto:${quote.client_email}`}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                        title="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
