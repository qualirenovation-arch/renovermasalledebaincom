import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Phone, Mail, RefreshCw, Filter } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

function decodeHtmlEntities(text: string): string {
  if (!text) return text;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

interface PartnerContact {
  id: string;
  created_at: string;
  partner_family: string;
  company_name: string;
  contact_first_name: string;
  contact_last_name: string;
  email: string;
  phone: string;
  zone: string;
  status: string;
  priority: string;
  next_followup_at: string | null;
  trade: string | null;
  activity_type: string | null;
}

interface PartnerContactsListProps {
  onSelectContact: (id: string) => void;
}

const FAMILY_LABELS: Record<string, string> = {
  sub_traitant: "Sous-traitant",
  installateur: "Installateur",
  marque_site: "Marque / Site",
};

const STATUS_LABELS: Record<string, string> = {
  nouveau: "Nouveau",
  a_qualifier: "À qualifier",
  en_cours: "En cours",
  partenaire_ok: "Partenaire OK",
  refuse: "Refusé",
  archive: "Archivé",
};

const STATUS_COLORS: Record<string, string> = {
  nouveau: "bg-blue-100 text-blue-800",
  a_qualifier: "bg-yellow-100 text-yellow-800",
  en_cours: "bg-purple-100 text-purple-800",
  partenaire_ok: "bg-green-100 text-green-800",
  refuse: "bg-red-100 text-red-800",
  archive: "bg-gray-100 text-gray-800",
};

const PRIORITY_LABELS: Record<string, string> = {
  basse: "Basse",
  normale: "Normale",
  haute: "Haute",
};

const ZONE_LABELS: Record<string, string> = {
  paris: "Paris",
  petite_couronne: "Petite couronne",
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

const ACTIVITY_LABELS: Record<string, string> = {
  marque: "Marque",
  fabricant: "Fabricant",
  distributeur: "Distributeur",
  showroom: "Showroom",
  site_ecommerce: "E-commerce",
  site_decoration_media: "Déco / Média",
};

export function PartnerContactsList({ onSelectContact }: PartnerContactsListProps) {
  const [contacts, setContacts] = useState<PartnerContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFamily, setFilterFamily] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("partner_contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setContacts((data as unknown as PartnerContact[]) || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      searchQuery === "" ||
      contact.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.contact_first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.contact_last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFamily = filterFamily === "all" || contact.partner_family === filterFamily;
    const matchesStatus = filterStatus === "all" || contact.status === filterStatus;
    const matchesPriority = filterPriority === "all" || contact.priority === filterPriority;

    return matchesSearch && matchesFamily && matchesStatus && matchesPriority;
  });

  const getTypeLabel = (contact: PartnerContact) => {
    if (contact.partner_family === "sub_traitant" && contact.trade) {
      return TRADE_LABELS[contact.trade] || contact.trade;
    }
    if (contact.partner_family === "marque_site" && contact.activity_type) {
      return ACTIVITY_LABELS[contact.activity_type] || contact.activity_type;
    }
    return "-";
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
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par société, nom, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="w-4 h-4 mr-2" />
          Filtres
        </Button>
        <Button variant="outline" onClick={fetchContacts}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualiser
        </Button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
          <Select value={filterFamily} onValueChange={setFilterFamily}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type partenaire" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="sub_traitant">Sous-traitant</SelectItem>
              <SelectItem value="installateur">Installateur</SelectItem>
              <SelectItem value="marque_site">Marque / Site</SelectItem>
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
        {filteredContacts.length} demande{filteredContacts.length > 1 ? "s" : ""}
      </p>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Activité</TableHead>
              <TableHead>Société</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Zone</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  Aucune demande trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredContacts.map((contact) => (
                <TableRow
                  key={contact.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onSelectContact(contact.id)}
                >
                  <TableCell className="whitespace-nowrap">
                    {format(new Date(contact.created_at), "dd/MM/yy", { locale: fr })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {FAMILY_LABELS[contact.partner_family] || contact.partner_family}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {getTypeLabel(contact)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {contact.company_name}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {contact.contact_first_name} {contact.contact_last_name}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {ZONE_LABELS[contact.zone] || contact.zone}
                  </TableCell>
                  <TableCell>
                    <Badge className={STATUS_COLORS[contact.status] || ""}>
                      {STATUS_LABELS[contact.status] || contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {PRIORITY_LABELS[contact.priority] || contact.priority}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-2">
                      <a
                        href={`tel:${contact.phone}`}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                        title="Appeler"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <a
                        href={`mailto:${contact.email}`}
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
