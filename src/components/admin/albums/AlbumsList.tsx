import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Image, Search, Monitor, Star, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAlbums, useDeleteAlbum, useUpdateAlbumOrder, useUpdateAlbum, type Album } from "@/hooks/useAlbums";
import { useToast } from "@/hooks/use-toast";
import {
  albums as staticAlbums,
  inProgressAlbums as staticInProgressAlbums,
} from "@/data/albumsData";

// Build static cover lookup once
const staticCoverBySlug = new Map(
  [...staticAlbums, ...staticInProgressAlbums].map((a) => [a.slug, a.coverImage])
);
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type FilterMode = "all" | "home" | "realisations" | "none";

function AlbumCover({ album }: { album: Album }) {
  const [imgError, setImgError] = useState(false);
  const staticSlug = album.static_slug || album.slug;
  const staticCover = staticCoverBySlug.get(staticSlug);
  const src = imgError && staticCover ? staticCover : album.cover_image;

  if (!src && !staticCover) {
    return (
      <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden shrink-0 flex items-center justify-center">
        <Image className="w-6 h-6 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden shrink-0">
      <img
        src={src || staticCover || ""}
        alt=""
        className="w-full h-full object-cover"
        onError={() => { if (!imgError) setImgError(true); }}
      />
    </div>
  );
}

interface AlbumsListProps {
  onEdit: (album: Album) => void;
  onCreate: () => void;
}

export function AlbumsList({ onEdit, onCreate }: AlbumsListProps) {
  const { data: albums = [], isLoading } = useAlbums();
  const deleteAlbum = useDeleteAlbum();
  const updateOrder = useUpdateAlbumOrder();
  const updateAlbum = useUpdateAlbum();
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState<FilterMode>("all");

  // Count featured realisations
  const featuredReaCount = useMemo(
    () => albums.filter(a => a.is_featured_realisations).length,
    [albums]
  );

  const filtered = useMemo(() => {
    let list = albums;

    // Apply filter mode
    if (filterMode === "home") {
      list = list.filter(a => a.show_in_hero);
    } else if (filterMode === "realisations") {
      list = list.filter(a => a.is_featured_realisations);
    } else if (filterMode === "none") {
      list = list.filter(a => !a.show_in_hero && !a.is_featured_realisations);
    }

    // Apply search
    if (search) {
      list = list.filter(a =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.location.toLowerCase().includes(search.toLowerCase()) ||
        a.slug.toLowerCase().includes(search.toLowerCase())
      );
    }

    return list;
  }, [albums, filterMode, search]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteAlbum.mutateAsync(deleteId);
      toast({ title: "Album supprimé" });
    } catch {
      toast({ title: "Erreur lors de la suppression", variant: "destructive" });
    }
    setDeleteId(null);
  };

  const moveAlbum = async (index: number, direction: "up" | "down") => {
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= albums.length) return;

    const updated = albums.map((a, i) => {
      if (i === index) return { id: a.id, display_order: albums[swapIndex].display_order };
      if (i === swapIndex) return { id: a.id, display_order: albums[index].display_order };
      return { id: a.id, display_order: a.display_order };
    });

    try {
      await updateOrder.mutateAsync(updated);
    } catch {
      toast({ title: "Erreur lors du réordonnancement", variant: "destructive" });
    }
  };

  if (isLoading) {
    return <div className="text-center py-12 text-muted-foreground">Chargement des albums...</div>;
  }

  const filterButtons: { mode: FilterMode; label: string }[] = [
    { mode: "all", label: "Tous" },
    { mode: "home", label: "Accueil" },
    { mode: "realisations", label: "Réalisations" },
    { mode: "none", label: "Non affichés" },
  ];

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold">Réalisations ({albums.length})</h2>
          <p className="text-sm text-muted-foreground">Gérer les projets du portfolio</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 sm:w-64"
            />
          </div>
          <Button onClick={onCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Nouveau
          </Button>
        </div>
      </div>

      {/* Filters & Counter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div className="flex gap-2 flex-wrap">
          {filterButtons.map(({ mode, label }) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                filterMode === mode
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-blue-600" />
          <span className={`text-sm font-medium ${featuredReaCount > 8 ? "text-destructive" : "text-muted-foreground"}`}>
            Albums Réalisations sélectionnés : {featuredReaCount} / 8
          </span>
          {featuredReaCount > 8 && (
            <span className="flex items-center gap-1 text-xs text-destructive">
              <AlertTriangle className="w-3.5 h-3.5" />
              Seuls les 8 premiers seront affichés
            </span>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {search || filterMode !== "all" ? "Aucun résultat" : "Aucun album. Créez-en un !"}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((album, index) => (
            <Card key={album.id} className="hover:border-primary/20 transition-colors">
              <CardContent className="p-4 flex items-center gap-4">
                {/* Order controls */}
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => moveAlbum(albums.indexOf(album), "up")}
                    disabled={albums.indexOf(album) === 0}
                    className="p-1 rounded hover:bg-muted disabled:opacity-30"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs text-muted-foreground text-center">{album.display_order}</span>
                  <button
                    onClick={() => moveAlbum(albums.indexOf(album), "down")}
                    disabled={albums.indexOf(album) === albums.length - 1}
                    className="p-1 rounded hover:bg-muted disabled:opacity-30"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Cover */}
                <AlbumCover album={album} />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="font-semibold truncate">{album.title}</p>
                    {album.is_in_progress && <Badge variant="secondary" className="text-xs">En cours</Badge>}
                    {album.is_featured && <Badge className="text-xs bg-gold/20 text-gold-dark">Mis en avant</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{album.location}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs text-muted-foreground">{album.album_photos.length} photo(s)</span>
                    {/* Badges Accueil / Réalisations */}
                    {album.show_in_hero && (
                      <Badge className="text-[10px] px-1.5 py-0 bg-emerald-100 text-emerald-700 border-emerald-200">
                        <Monitor className="w-2.5 h-2.5 mr-0.5" />HOME
                      </Badge>
                    )}
                    {album.is_featured_realisations && (
                      <Badge className="text-[10px] px-1.5 py-0 bg-blue-100 text-blue-700 border-blue-200">
                        <Star className="w-2.5 h-2.5 mr-0.5" />RÉA
                      </Badge>
                    )}
                    {album.album_tags.length > 0 && (
                      <div className="flex gap-1">
                        {album.album_tags.slice(0, 3).map(t => (
                          <Badge key={t.id} variant="outline" className="text-[10px] px-1.5 py-0">{t.tag}</Badge>
                        ))}
                        {album.album_tags.length > 3 && (
                          <span className="text-[10px] text-muted-foreground">+{album.album_tags.length - 3}</span>
                        )}
                      </div>
                    )}
                    {album.click_count > 0 && (
                      <span className="text-[10px] text-muted-foreground">👁 {album.click_count}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Hero toggle */}
                  <div className="flex flex-col items-center gap-0.5">
                    <Switch
                      checked={album.show_in_hero}
                      onCheckedChange={async (checked) => {
                        try {
                          await updateAlbum.mutateAsync({ id: album.id, show_in_hero: checked });
                          toast({ title: checked ? "Ajouté au slideshow hero" : "Retiré du slideshow hero" });
                        } catch {
                          toast({ title: "Erreur", variant: "destructive" });
                        }
                      }}
                      title="Afficher dans le slideshow hero"
                      className="data-[state=checked]:bg-emerald-600"
                    />
                    <span className="text-[9px] text-muted-foreground">Home</span>
                  </div>
                  {/* Réalisations toggle */}
                  <div className="flex flex-col items-center gap-0.5">
                    <Switch
                      checked={album.is_featured_realisations}
                      onCheckedChange={async (checked) => {
                        try {
                          await updateAlbum.mutateAsync({ id: album.id, is_featured_realisations: checked });
                          toast({ title: checked ? "Ajouté aux Réalisations" : "Retiré des Réalisations" });
                        } catch {
                          toast({ title: "Erreur", variant: "destructive" });
                        }
                      }}
                      title="Mettre en avant sur la page Réalisations"
                      className="data-[state=checked]:bg-blue-600"
                    />
                    <span className="text-[9px] text-muted-foreground">Réa</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(album)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteId(album.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cet album ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Toutes les photos, tags et métadonnées SEO associés seront supprimés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}