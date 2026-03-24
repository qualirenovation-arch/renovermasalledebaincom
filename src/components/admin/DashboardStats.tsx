import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Handshake, Users, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Stats {
  quotes: { total: number; nouveau: number; non_verifie: number; en_cours: number; termine: number };
  partners: { total: number; nouveau: number; en_cours: number; partenaire_ok: number };
  subcontractors: { total: number; pending: number; reviewing: number; validated: number };
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [quotesRes, partnersRes, subsRes] = await Promise.all([
        supabase.from("quote_requests").select("status"),
        supabase.from("partner_contacts").select("status"),
        supabase.from("subcontractors").select("status"),
      ]);

      const quotes = quotesRes.data || [];
      const partners = partnersRes.data || [];
      const subs = subsRes.data || [];

      setStats({
        quotes: {
          total: quotes.length,
          nouveau: quotes.filter(q => q.status === "nouveau").length,
          en_cours: quotes.filter(q => q.status === "en_cours").length,
          termine: quotes.filter(q => q.status === "termine").length,
        },
        partners: {
          total: partners.length,
          nouveau: partners.filter(p => p.status === "nouveau").length,
          en_cours: partners.filter(p => p.status === "en_cours").length,
          partenaire_ok: partners.filter(p => p.status === "partenaire_ok").length,
        },
        subcontractors: {
          total: subs.length,
          pending: subs.filter(s => s.status === "pending").length,
          reviewing: subs.filter(s => s.status === "reviewing").length,
          validated: subs.filter(s => s.status === "validated").length,
        },
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-36 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const cards = [
    {
      title: "Demandes de devis",
      icon: FileText,
      total: stats.quotes.total,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      items: [
        { label: "Nouveaux", value: stats.quotes.nouveau, icon: AlertTriangle, color: "text-amber-600" },
        { label: "En cours", value: stats.quotes.en_cours, icon: Clock, color: "text-blue-600" },
        { label: "Terminés", value: stats.quotes.termine, icon: CheckCircle2, color: "text-emerald-600" },
      ],
    },
    {
      title: "Partenaires",
      icon: Handshake,
      total: stats.partners.total,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      items: [
        { label: "Nouveaux", value: stats.partners.nouveau, icon: AlertTriangle, color: "text-amber-600" },
        { label: "En cours", value: stats.partners.en_cours, icon: Clock, color: "text-blue-600" },
        { label: "Validés", value: stats.partners.partenaire_ok, icon: CheckCircle2, color: "text-emerald-600" },
      ],
    },
    {
      title: "Sous-traitants",
      icon: Users,
      total: stats.subcontractors.total,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      items: [
        { label: "En attente", value: stats.subcontractors.pending, icon: AlertTriangle, color: "text-amber-600" },
        { label: "En revue", value: stats.subcontractors.reviewing, icon: Clock, color: "text-blue-600" },
        { label: "Validés", value: stats.subcontractors.validated, icon: CheckCircle2, color: "text-emerald-600" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${card.bgColor} flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <p className="text-2xl font-bold">{card.total}</p>
              </div>
            </div>
            <div className="space-y-2">
              {card.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                    <span className="text-muted-foreground">{item.label}</span>
                  </div>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
