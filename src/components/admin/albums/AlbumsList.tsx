import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, GripVertical, ArrowUp, ArrowDown, Image, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAlbums, useDeleteAlbum, useUpdateAlbumOrder, type Album } from "@/hooks/useAlbums";
import { useToast } from "@/hooks/use-toast";
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

interface AlbumsListProps {
  onEdit: (album: Album) => void;
  onCreate: () => void;
}

export function AlbumsList({ onEdit, onCreate }: AlbumsListProps) {
  const { data: albums = [], isLoading } = useAlbums();
  const deleteAlbum = useDeleteAlbum();
  const updateOrder = useUpdateAlbumOrder();
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = albums.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.location.toLowerCase().includes(search.toLowerCase()) ||
    a.slug.toLowerCase().includes(search.toLowerCase())
  );

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

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
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

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {search ? "Aucun résultat" : "Aucun album. Créez-en un !"}
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
                <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden shrink-0">
                  {album.cover_image ? (
                    <img src={album.cover_image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold truncate">{album.title}</p>
                    {album.is_in_progress && <Badge variant="secondary" className="text-xs">En cours</Badge>}
                    {album.is_featured && <Badge className="text-xs bg-gold/20 text-gold-dark">Mis en avant</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{album.location}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{album.album_photos.length} photo(s)</span>
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
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0">
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
