import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, RefreshCw, Eye } from "lucide-react";
import { SubcontractorDetail } from "./SubcontractorDetail";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type Subcontractor = Tables<"subcontractors">;
type SubcontractorStatus = "pending" | "reviewing" | "validated" | "refused" | "archived";

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

export function SubcontractorsList() {
  const [subcontractors, setSubcontractors] = useState<Subcontractor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSubcontractor, setSelectedSubcontractor] = useState<Subcontractor | null>(null);

  const fetchSubcontractors = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("subcontractors")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter as SubcontractorStatus);
      }

      const { data, error } = await query;

      if (error) throw error;
      setSubcontractors(data || []);
    } catch (error) {
      console.error("Error fetching subcontractors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubcontractors();
  }, [statusFilter]);

  const filteredSubcontractors = subcontractors.filter((sub) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      sub.company_name.toLowerCase().includes(searchLower) ||
      sub.contact_name.toLowerCase().includes(searchLower) ||
      sub.email.toLowerCase().includes(searchLower) ||
      sub.trades.some((t) => t.toLowerCase().includes(searchLower))
    );
  });

  const handleSubcontractorUpdate = (updated: Subcontractor) => {
    setSubcontractors((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
    setSelectedSubcontractor(updated);
  };

  if (selectedSubcontractor) {
    return (
      <SubcontractorDetail
        subcontractor={selectedSubcontractor}
        onBack={() => setSelectedSubcontractor(null)}
        onUpdate={handleSubcontractorUpdate}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle>Candidatures sous-traitants</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="reviewing">En examen</SelectItem>
                <SelectItem value="validated">Validé</SelectItem>
                <SelectItem value="refused">Refusé</SelectItem>
                <SelectItem value="archived">Archivé</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={fetchSubcontractors}>
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : filteredSubcontractors.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Aucune candidature trouvée
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Métiers</TableHead>
                  <TableHead>Zones</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubcontractors.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">
                      {sub.company_name}
                    </TableCell>
                    <TableCell>
                      <div>{sub.contact_name}</div>
                      <div className="text-sm text-muted-foreground">
                        {sub.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {sub.trades.slice(0, 2).map((trade) => (
                          <Badge key={trade} variant="secondary" className="text-xs">
                            {trade}
                          </Badge>
                        ))}
                        {sub.trades.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{sub.trades.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {sub.zones.slice(0, 2).map((zone) => (
                          <Badge key={zone} variant="outline" className="text-xs">
                            {zone}
                          </Badge>
                        ))}
                        {sub.zones.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{sub.zones.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${statusColors[sub.status]} border`}
                        variant="outline"
                      >
                        {statusLabels[sub.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(sub.created_at), "dd MMM yyyy", {
                        locale: fr,
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedSubcontractor(sub)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
