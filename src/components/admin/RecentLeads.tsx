import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Handshake } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface QuoteLead {
  id: string;
  client_first_name: string;
  client_last_name: string;
  client_email: string;
  type_devis: string;
  status: string;
  created_at: string;
  property_city: string | null;
}

interface PartnerLead {
  id: string;
  company_name: string;
  contact_first_name: string;
  contact_last_name: string;
  partner_family: string;
  status: string;
  created_at: string;
}

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  nouveau: { label: "Nouveau", variant: "destructive" },
  a_qualifier: { label: "À qualifier", variant: "outline" },
  en_cours: { label: "En cours", variant: "default" },
  partenaire_ok: { label: "Validé", variant: "secondary" },
  termine: { label: "Terminé", variant: "secondary" },
  refuse: { label: "Refusé", variant: "destructive" },
};

function decodeHtmlEntities(text: string): string {
  if (!text) return text;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

const familyLabels: Record<string, string> = {
  sub_traitant: "Sous-traitant",
  installateur: "Installateur",
  marque_site: "Marque / Site",
};

export function RecentLeads() {
  const [quotes, setQuotes] = useState<QuoteLead[]>([]);
  const [partners, setPartners] = useState<PartnerLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentLeads();
  }, []);

  const fetchRecentLeads = async () => {
    try {
      const [quotesRes, partnersRes] = await Promise.all([
        supabase
          .from("quote_requests")
          .select("id, client_first_name, client_last_name, client_email, type_devis, status, created_at, property_city")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("partner_contacts")
          .select("id, company_name, contact_first_name, contact_last_name, partner_family, status, created_at")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      setQuotes(quotesRes.data || []);
      setPartners(partnersRes.data || []);
    } catch (error) {
      console.error("Error fetching recent leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => format(new Date(date), "dd MMM yyyy", { locale: fr });

  const getStatus = (status: string) => {
    const s = statusLabels[status] || { label: status, variant: "outline" as const };
    return <Badge variant={s.variant}>{s.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Quotes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Derniers devis
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin/devis">
              Tout voir <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="pt-0">
          {quotes.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">Aucune demande de devis</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Ville</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell className="font-medium">
                      {q.client_first_name} {q.client_last_name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {q.property_city || "—"}
                    </TableCell>
                    <TableCell>{getStatus(q.status)}</TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm">
                      {formatDate(q.created_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Recent Partners */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Handshake className="w-5 h-5 text-violet-600" />
            Derniers partenaires
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin/partenaires">
              Tout voir <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="pt-0">
          {partners.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">Aucun partenaire</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Profil</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partners.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{decodeHtmlEntities(p.company_name)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {familyLabels[p.partner_family] || p.partner_family}
                    </TableCell>
                    <TableCell>{getStatus(p.status)}</TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm">
                      {formatDate(p.created_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
