import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Upload, CheckCircle, AlertCircle, ImageIcon, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  albums as staticAlbums,
  inProgressAlbums as staticInProgressAlbums,
  type Album as StaticAlbum,
} from "@/data/albumsData";

interface MigrationResult {
  slug: string;
  photos_migrated: number;
  cover_migrated: boolean;
  errors: string[];
}

interface AlbumPreview {
  dbId: string;
  dbSlug: string;
  staticAlbum: StaticAlbum;
  photoCount: number;
  hasCover: boolean;
  alreadyMigrated: boolean;
  cloudPhotoCount: number;
}

async function fetchAndUpload(
  imageUrl: string,
  storagePath: string,
  errors: string[]
): Promise<string | null> {
  try {
    const resp = await fetch(imageUrl);
    if (!resp.ok) { errors.push(`Fetch failed ${storagePath}: ${resp.status}`); return null; }
    const blob = await resp.blob();
    const contentType = blob.type || "image/jpeg";
    if (contentType.includes("html")) { errors.push(`Got HTML instead of image for ${storagePath}`); return null; }

    const { error: uploadErr } = await supabase.storage
      .from("album-photos")
      .upload(storagePath, blob, { contentType, upsert: true });
    if (uploadErr) { errors.push(`Upload error ${storagePath}: ${uploadErr.message}`); return null; }

    const { data: publicUrl } = supabase.storage.from("album-photos").getPublicUrl(storagePath);
    return publicUrl.publicUrl;
  } catch (e: any) {
    errors.push(`Error ${storagePath}: ${e.message}`);
    return null;
  }
}

function getExtension(url: string): string {
  try {
    const pathname = new URL(url, "https://placeholder.com").pathname;
    const match = pathname.match(/\.(jpg|jpeg|png|webp|gif|svg|mp4)(\?|$)/i);
    if (match) return `.${match[1].toLowerCase()}`;
    const viteMatch = pathname.match(/\.([a-z0-9]+)$/i);
    if (viteMatch) return `.${viteMatch[1].toLowerCase()}`;
  } catch {}
  return ".jpg";
}

export function AlbumPhotoMigration() {
  const { toast } = useToast();
  const [previews, setPreviews] = useState<AlbumPreview[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loadingPreview, setLoadingPreview] = useState(true);
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentAlbum, setCurrentAlbum] = useState("");
  const [results, setResults] = useState<MigrationResult[]>([]);
  const [done, setDone] = useState(false);

  const allStaticAlbums = useMemo(() => [...staticAlbums, ...staticInProgressAlbums], []);

  // Load preview: match DB albums with static data + check existing cloud photos
  useEffect(() => {
    async function load() {
      setLoadingPreview(true);
      try {
        const { data: dbAlbums, error } = await supabase
          .from("albums")
          .select("id, slug, static_slug");
        if (error) throw error;
        if (!dbAlbums?.length) { setPreviews([]); setLoadingPreview(false); return; }

        // Count existing cloud photos per album
        const { data: photoCounts } = await supabase
          .from("album_photos")
          .select("album_id");

        const cloudCountMap = new Map<string, number>();
        photoCounts?.forEach((p) => {
          cloudCountMap.set(p.album_id, (cloudCountMap.get(p.album_id) || 0) + 1);
        });

        const staticBySlug = new Map(allStaticAlbums.map((a) => [a.slug, a]));
        const items: AlbumPreview[] = [];

        for (const dbAlbum of dbAlbums) {
          const lookupSlug = dbAlbum.static_slug || dbAlbum.slug;
          const staticAlbum = staticBySlug.get(lookupSlug);
          if (!staticAlbum || staticAlbum.photos.length === 0) continue;

          const cloudCount = cloudCountMap.get(dbAlbum.id) || 0;
          items.push({
            dbId: dbAlbum.id,
            dbSlug: dbAlbum.slug,
            staticAlbum,
            photoCount: staticAlbum.photos.length,
            hasCover: !!staticAlbum.coverImage,
            alreadyMigrated: cloudCount >= staticAlbum.photos.length,
            cloudPhotoCount: cloudCount,
          });
        }

        items.sort((a, b) => a.dbSlug.localeCompare(b.dbSlug));
        setPreviews(items);
        // Pre-select albums not yet migrated
        setSelected(new Set(items.filter((i) => !i.alreadyMigrated).map((i) => i.dbId)));
      } catch (e: any) {
        toast({ title: "Erreur", description: e.message, variant: "destructive" });
      } finally {
        setLoadingPreview(false);
      }
    }
    load();
  }, [allStaticAlbums, toast]);

  const totalPhotos = useMemo(
    () => previews.filter((p) => selected.has(p.dbId)).reduce((s, p) => s + p.photoCount, 0),
    [previews, selected]
  );

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? new Set(previews.map((p) => p.dbId)) : new Set());
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const startMigration = async () => {
    const toMigrate = previews.filter((p) => selected.has(p.dbId));
    if (toMigrate.length === 0) return;

    setMigrating(true);
    setProgress(0);
    setResults([]);
    setDone(false);

    const allResults: MigrationResult[] = [];

    for (let i = 0; i < toMigrate.length; i++) {
      const { dbId, dbSlug, staticAlbum } = toMigrate[i];
      setCurrentAlbum(dbSlug);
      setProgress(Math.round((i / toMigrate.length) * 100));

      const result: MigrationResult = { slug: dbSlug, photos_migrated: 0, cover_migrated: false, errors: [] };

      // Upload cover
      if (staticAlbum.coverImage) {
        const ext = getExtension(staticAlbum.coverImage);
        const coverPath = `${dbSlug}/cover${ext}`;
        const newUrl = await fetchAndUpload(staticAlbum.coverImage, coverPath, result.errors);
        if (newUrl) {
          await supabase.from("albums").update({ cover_image: newUrl }).eq("id", dbId);
          result.cover_migrated = true;
        }
      }

      // Upload photos
      const photoInserts: {
        album_id: string; image_url: string; title: string;
        alt_text: string | null; description: string | null; display_order: number;
      }[] = [];

      for (let j = 0; j < staticAlbum.photos.length; j++) {
        const photo = staticAlbum.photos[j];
        if (photo.isVideo) {
          photoInserts.push({
            album_id: dbId, image_url: photo.image, title: photo.title,
            alt_text: photo.title, description: photo.description || null, display_order: j,
          });
          result.photos_migrated++;
          continue;
        }

        const ext = getExtension(photo.image);
        const fileName = `photo-${String(j).padStart(3, "0")}${ext}`;
        const storagePath = `${dbSlug}/${fileName}`;
        const newUrl = await fetchAndUpload(photo.image, storagePath, result.errors);
        if (newUrl) {
          photoInserts.push({
            album_id: dbId, image_url: newUrl, title: photo.title,
            alt_text: photo.title, description: photo.description || null, display_order: j,
          });
          result.photos_migrated++;
        }
      }

      if (photoInserts.length > 0) {
        await supabase.from("album_photos").delete().eq("album_id", dbId);
        const { error: insertErr } = await supabase.from("album_photos").insert(photoInserts);
        if (insertErr) result.errors.push(`DB insert error: ${insertErr.message}`);
      }

      allResults.push(result);
      setResults([...allResults]);
    }

    setProgress(100);
    setDone(true);

    const migrated = allResults.reduce((s, r) => s + r.photos_migrated, 0);
    const errors = allResults.reduce((s, r) => s + r.errors.length, 0);
    toast({ title: "Migration terminée", description: `${migrated} photos migrées, ${errors} erreur(s)` });
    setMigrating(false);
  };

  if (loadingPreview) {
    return (
      <Card>
        <CardContent className="py-8 flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" /> Analyse des albums…
        </CardContent>
      </Card>
    );
  }

  if (previews.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Aucun album à migrer (pas de correspondance statique).
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Migration des photos vers le Cloud
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-muted/40 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{previews.length}</div>
            <div className="text-xs text-muted-foreground">Albums disponibles</div>
          </div>
          <div className="bg-muted/40 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{previews.reduce((s, p) => s + p.photoCount, 0)}</div>
            <div className="text-xs text-muted-foreground">Photos totales</div>
          </div>
          <div className="bg-muted/40 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-primary">{previews.filter((p) => p.alreadyMigrated).length}</div>
            <div className="text-xs text-muted-foreground">Déjà migrés</div>
          </div>
        </div>

        {/* Select all */}
        {!migrating && !done && (
          <div className="flex items-center justify-between border-b pb-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={selected.size === previews.length}
                onCheckedChange={(checked) => toggleAll(!!checked)}
              />
              Tout sélectionner ({selected.size}/{previews.length})
            </label>
            <span className="text-xs text-muted-foreground">
              {totalPhotos} photos sélectionnées
            </span>
          </div>
        )}

        {/* Album list */}
        {!done && (
          <div className="space-y-1 max-h-80 overflow-y-auto">
            {previews.map((p) => (
              <div
                key={p.dbId}
                className={`flex items-center gap-3 p-2 rounded text-sm transition-colors ${
                  p.alreadyMigrated ? "bg-primary/5" : "bg-muted/20"
                }`}
              >
                {!migrating && (
                  <Checkbox
                    checked={selected.has(p.dbId)}
                    onCheckedChange={() => toggleOne(p.dbId)}
                  />
                )}
                <FolderOpen className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="truncate flex-1 font-medium">{p.dbSlug}</span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <ImageIcon className="w-3 h-3" />
                  {p.photoCount}
                </span>
                {p.hasCover && <Badge variant="outline" className="text-xs">cover</Badge>}
                {p.alreadyMigrated ? (
                  <Badge variant="secondary" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" /> cloud ✓
                  </Badge>
                ) : p.cloudPhotoCount > 0 ? (
                  <Badge variant="outline" className="text-xs">
                    {p.cloudPhotoCount}/{p.photoCount} cloud
                  </Badge>
                ) : null}
              </div>
            ))}
          </div>
        )}

        {/* Action button */}
        {!done && (
          <Button onClick={startMigration} disabled={migrating || selected.size === 0} size="lg" className="w-full">
            {migrating ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Migration en cours…</>
            ) : (
              <><Upload className="w-4 h-4 mr-2" />Migrer {selected.size} album(s) — {totalPhotos} photos</>
            )}
          </Button>
        )}

        {/* Progress */}
        {migrating && (
          <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-xs text-muted-foreground truncate">En cours : {currentAlbum}</p>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {results.map((r) => (
              <div key={r.slug} className="flex items-center gap-2 text-sm p-2 bg-muted/30 rounded">
                {r.errors.length === 0 ? (
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                )}
                <span className="truncate flex-1">{r.slug}</span>
                <Badge variant="secondary">{r.photos_migrated} photos</Badge>
                {r.cover_migrated && <Badge variant="outline">cover ✓</Badge>}
                {r.errors.length > 0 && <Badge variant="destructive">{r.errors.length} erreur(s)</Badge>}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
