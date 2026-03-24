import { Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2, ShieldX, ShieldCheck, Handshake, FileText, Users, Wrench, Image } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { RecentLeads } from "@/components/admin/RecentLeads";
import { Card, CardContent } from "@/components/ui/card";

export default function Admin() {
  const { user, isAdmin, loading, signOut } = useAdminAuth();
  const { toast } = useToast();
  const [setupLoading, setSetupLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de se déconnecter.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <ShieldX className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Accès refusé</h1>
          <p className="text-muted-foreground mb-6">
            Votre compte n'a pas les droits d'administration nécessaires.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Se déconnecter
            </Button>
            <Button asChild>
              <a href="/">Retour au site</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const quickLinks = [
    { to: "/admin/devis", icon: FileText, label: "Devis", description: "Gérer les demandes de devis", color: "text-blue-600", bg: "bg-blue-50" },
    { to: "/admin/partenaires", icon: Handshake, label: "Partenaires", description: "Gérer les contacts partenaires", color: "text-violet-600", bg: "bg-violet-50" },
    { to: "/admin/finitions", icon: Wrench, label: "Finitions", description: "Catalogue des finitions", color: "text-amber-600", bg: "bg-amber-50" },
    { to: "/admin/albums", icon: Image, label: "Réalisations", description: "Gérer le portfolio", color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-2xl font-light">
              Tableau de bord
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              <Card className="hover:border-primary/30 cursor-pointer">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl ${link.bg} flex items-center justify-center shrink-0`}>
                    <link.icon className={`w-5 h-5 ${link.color}`} />
                  </div>
                  <div>
                    <p className="font-semibold">{link.label}</p>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <DashboardStats />

        {/* Recent Leads */}
        <RecentLeads />
      </main>
    </div>
  );
}
