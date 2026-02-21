import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft, Loader2, ShieldX } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/hooks/use-toast";
import { AlbumsList } from "@/components/admin/albums/AlbumsList";
import { AlbumForm } from "@/components/admin/albums/AlbumForm";
import type { Album } from "@/hooks/useAlbums";

type View = { type: "list" } | { type: "form"; album?: Album };

export default function AdminAlbums() {
  const { user, isAdmin, loading, signOut } = useAdminAuth();
  const { toast } = useToast();
  const [view, setView] = useState<View>({ type: "list" });

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) toast({ title: "Erreur", description: "Impossible de se déconnecter.", variant: "destructive" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <ShieldX className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Accès refusé</h1>
          <Button variant="outline" onClick={handleSignOut}>Se déconnecter</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>

      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin"><ArrowLeft className="w-4 h-4 mr-2" />Dashboard</Link>
            </Button>
            <h1 className="font-display text-xl font-semibold">Gestion des réalisations</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {view.type === "list" ? (
          <AlbumsList
            onEdit={(album) => setView({ type: "form", album })}
            onCreate={() => setView({ type: "form" })}
          />
        ) : (
          <AlbumForm
            album={view.album}
            onBack={() => setView({ type: "list" })}
          />
        )}
      </main>
    </div>
  );
}
