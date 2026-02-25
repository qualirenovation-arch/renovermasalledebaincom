import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Plus, X, Image, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateAlbum,
  useUpdateAlbum,
  useSaveAlbumPhotos,
  useSaveAlbumSeo,
  useSaveAlbumTags,
  type Album,
} from "@/hooks/useAlbums";
import type { TablesInsert } from "@/integrations/supabase/types";

interface AlbumFormProps {
  album?: Album | null;
  onBack: () => void;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function AlbumForm({ album, onBack }: AlbumFormProps) {
  const isEditing = !!album;
  const { toast } = useToast();
  const createAlbum = useCreateAlbum();
  const updateAlbum = useUpdateAlbum();
  const savePhotos = useSaveAlbumPhotos();
  const saveSeo = useSaveAlbumSeo();
  const saveTags = useSaveAlbumTags();

  // Core fields
  const [title, setTitle] = useState(album?.title ?? "");
  const [slug, setSlug] = useState(album?.slug ?? "");
  const [location, setLocation] = useState(album?.location ?? "");
  const [description, setDescription] = useState(album?.description ?? "");
  const [coverImage, setCoverImage] = useState(album?.cover_image ?? "");
  const [category, setCategory] = useState(album?.category ?? "");
  const [subtitle, setSubtitle] = useState(album?.subtitle ?? "");
  const [isInProgress, setIsInProgress] = useState(album?.is_in_progress ?? false);
  const [isFeatured, setIsFeatured] = useState(album?.is_featured ?? false);
  const [displayOrder, setDisplayOrder] = useState(album?.display_order ?? 0);
  const [isFeaturedRealisations, setIsFeaturedRealisations] = useState(album?.is_featured_realisations ?? false);
  const [featuredRealisationsOrder, setFeaturedRealisationsOrder] = useState(album?.featured_realisations_order ?? 0);

  // Photos
  const [photos, setPhotos] = useState<{ image_url: string; title: string; alt_text: string; display_order: number }[]>(
    album?.album_photos.map(p => ({
      image_url: p.image_url,
      title: p.title,
      alt_text: p.alt_text ?? "",
      display_order: p.display_order,
    })) ?? []
  );
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  // SEO
  const [metaTitle, setMetaTitle] = useState(album?.album_seo?.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(album?.album_seo?.meta_description ?? "");

  // Tags
  const [tags, setTags] = useState<string[]>(album?.album_tags.map(t => t.tag) ?? []);
  const [newTag, setNewTag] = useState("");

  const [saving, setSaving] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditing && title) {
      setSlug(slugify(title));
    }
  }, [title, isEditing]);

  const addPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    setPhotos(prev => [...prev, { image_url: newPhotoUrl.trim(), title: "", alt_text: "", display_order: prev.length }]);
    setNewPhotoUrl("");
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index).map((p, i) => ({ ...p, display_order: i })));
  };

  const addTag = () => {
    const t = newTag.trim().toLowerCase();
    if (!t || tags.includes(t)) return;
    setTags(prev => [...prev, t]);
    setNewTag("");
  };

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleSave = async () => {
    if (!title || !slug || !location) {
      toast({ title: "Champs obligatoires manquants", description: "Titre, slug et localisation sont requis.", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      let albumId = album?.id;

      const albumData = {
        title,
        slug,
        location,
        description,
        cover_image: coverImage,
        category: category || null,
        subtitle: subtitle || null,
        is_in_progress: isInProgress,
        is_featured: isFeatured,
        display_order: displayOrder,
        is_featured_realisations: isFeaturedRealisations,
        featured_realisations_order: featuredRealisationsOrder,
      };

      if (isEditing && albumId) {
        await updateAlbum.mutateAsync({ id: albumId, ...albumData });
      } else {
        const created = await createAlbum.mutateAsync(albumData);
        albumId = created.id;
      }

      if (!albumId) throw new Error("Missing album ID");

      // Save photos, SEO, and tags in parallel
      await Promise.all([
        savePhotos.mutateAsync({
          albumId,
          photos: photos.map(p => ({
            album_id: albumId!,
            image_url: p.image_url,
            title: p.title,
            alt_text: p.alt_text || null,
            display_order: p.display_order,
          })),
        }),
        saveSeo.mutateAsync({ albumId, metaTitle, metaDescription }),
        saveTags.mutateAsync({ albumId, tags }),
      ]);

      toast({ title: isEditing ? "Album mis à jour" : "Album créé" });
      onBack();
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-xl font-semibold">{isEditing ? "Modifier l'album" : "Nouvel album"}</h2>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Enregistrer
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="photos">Photos ({photos.length})</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="tags">Tags ({tags.length})</TabsTrigger>
        </TabsList>

        {/* GENERAL TAB */}
        <TabsContent value="general">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre *</Label>
                  <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Salle de bain à Paris 17ème" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input id="slug" value={slug} onChange={e => setSlug(e.target.value)} placeholder="salle-de-bain-paris-17" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Localisation *</Label>
                  <Input id="location" value={location} onChange={e => setLocation(e.target.value)} placeholder="Paris 17ème" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Input id="category" value={category} onChange={e => setCategory(e.target.value)} placeholder="salle-de-bain" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Sous-titre</Label>
                <Input id="subtitle" value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Rénovation complète..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Description détaillée du projet..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cover">URL image de couverture</Label>
                <Input id="cover" value={coverImage} onChange={e => setCoverImage(e.target.value)} placeholder="https://..." />
                {coverImage && (
                  <div className="w-32 h-24 rounded-lg overflow-hidden bg-muted mt-2">
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="order">Ordre d'affichage</Label>
                  <Input id="order" type="number" value={displayOrder} onChange={e => setDisplayOrder(Number(e.target.value))} />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <Switch id="in-progress" checked={isInProgress} onCheckedChange={setIsInProgress} />
                  <Label htmlFor="in-progress">En cours</Label>
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <Switch id="featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
                  <Label htmlFor="featured">Mis en avant</Label>
                </div>
              </div>

              {/* Réalisations section */}
              <div className="border-t pt-4 mt-2">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Page Réalisations</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Switch id="featured-rea" checked={isFeaturedRealisations} onCheckedChange={setIsFeaturedRealisations} className="data-[state=checked]:bg-blue-600" />
                    <Label htmlFor="featured-rea">Mettre en avant sur la page Réalisations</Label>
                  </div>
                  {isFeaturedRealisations && (
                    <div className="space-y-2">
                      <Label htmlFor="rea-order">Ordre Réalisations</Label>
                      <Input id="rea-order" type="number" value={featuredRealisationsOrder} onChange={e => setFeaturedRealisationsOrder(Number(e.target.value))} min={0} />
                      <p className="text-xs text-muted-foreground">Les 8 premiers (ordre croissant) seront affichés en priorité.</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PHOTOS TAB */}
        <TabsContent value="photos">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Photos du projet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add photo by URL */}
              <div className="flex gap-2">
                <Input
                  value={newPhotoUrl}
                  onChange={e => setNewPhotoUrl(e.target.value)}
                  placeholder="URL de la photo..."
                  onKeyDown={e => e.key === "Enter" && addPhoto()}
                />
                <Button onClick={addPhoto} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </div>

              {photos.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">Aucune photo. Ajoutez des URLs ci-dessus.</p>
              ) : (
                <div className="space-y-3">
                  {photos.map((photo, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-20 h-16 rounded overflow-hidden bg-muted shrink-0">
                        <img src={photo.image_url} alt="" className="w-full h-full object-cover" onError={e => (e.currentTarget.src = "")} />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Input
                          value={photo.title}
                          onChange={e => {
                            const updated = [...photos];
                            updated[i] = { ...updated[i], title: e.target.value };
                            setPhotos(updated);
                          }}
                          placeholder="Titre de la photo"
                          className="h-8 text-sm"
                        />
                        <Input
                          value={photo.alt_text}
                          onChange={e => {
                            const updated = [...photos];
                            updated[i] = { ...updated[i], alt_text: e.target.value };
                            setPhotos(updated);
                          }}
                          placeholder="Texte alternatif (SEO)"
                          className="h-8 text-sm"
                        />
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removePhoto(i)} className="text-destructive shrink-0">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO TAB */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Métadonnées SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input id="meta-title" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder="Rénovation salle de bain Paris 17 | Un Chantier Heureux" />
                <p className="text-xs text-muted-foreground">{metaTitle.length}/60 caractères</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-desc">Meta Description</Label>
                <Textarea id="meta-desc" value={metaDescription} onChange={e => setMetaDescription(e.target.value)} rows={3} placeholder="Découvrez notre rénovation de salle de bain..." />
                <p className="text-xs text-muted-foreground">{metaDescription.length}/160 caractères</p>
              </div>

              {/* Preview */}
              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">Aperçu Google</p>
                <p className="text-[#1a0dab] text-base truncate">{metaTitle || "Titre de la page"}</p>
                <p className="text-[#006621] text-sm truncate">renovermasalledebain.com › realisations › {slug || "..."}</p>
                <p className="text-sm text-[#545454] line-clamp-2">{metaDescription || "Description de la page..."}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAGS TAB */}
        <TabsContent value="tags">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tags de filtrage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={e => setNewTag(e.target.value)}
                  placeholder="Ex: zellige, terrazzo, noir-blanc..."
                  onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button onClick={addTag} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </div>

              {tags.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Aucun tag</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-sm gap-1.5 pr-1.5">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
