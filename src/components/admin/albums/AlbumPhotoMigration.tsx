import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, Upload, CheckCircle, AlertCircle } from "lucide-react";
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

/**
 * Fetches an image from a Vite-resolved URL (works in browser),
 * converts to blob and uploads directly to Supabase Storage.
 */
async function fetchAndUpload(
  imageUrl: string,
  storagePath: string,
  errors: string[]
): Promise<string | null> {
  try {
    const resp = await fetch(imageUrl);
    if (!resp.ok) {
      errors.push(`Fetch failed ${storagePath}: ${resp.status}`);
      return null;
    }
    const blob = await resp.blob();
    // Vite-resolved images have correct content-type
    const contentType = blob.type || "image/jpeg";

    if (contentType.includes("html")) {
      errors.push(`Got HTML instead of image for ${storagePath} — skipping`);
      return null;
    }

    const { error: uploadErr } = await supabase.storage
      .from("album-photos")
      .upload(storagePath, blob, { contentType, upsert: true });

    if (uploadErr) {
      errors.push(`Upload error ${storagePath}: ${uploadErr.message}`);
      return null;
    }

    const { data: publicUrl } = supabase.storage
      .from("album-photos")
      .getPublicUrl(storagePath);

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
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentAlbum, setCurrentAlbum] = useState("");
  const [results, setResults] = useState<MigrationResult[]>([]);
  const [done, setDone] = useState(false);

  const allStaticAlbums = [...staticAlbums, ...staticInProgressAlbums];

  const startMigration = async () => {
    setMigrating(true);
    setProgress(0);
    setResults([]);
    setDone(false);

    try {
      const { data: dbAlbums, error } = await supabase
        .from("albums")
        .select("id, slug, static_slug");

      if (error) throw error;
      if (!dbAlbums?.length) {
        toast({ title: "Aucun album en base", variant: "destructive" });
        setMigrating(false);
        return;
      }

      const staticBySlug = new Map(allStaticAlbums.map((a) => [a.slug, a]));

      // Build list of albums to migrate
      const toMigrate: { dbId: string; dbSlug: string; staticAlbum: StaticAlbum }[] = [];
      for (const dbAlbum of dbAlbums) {
        const lookupSlug = dbAlbum.static_slug || dbAlbum.slug;
        const staticAlbum = staticBySlug.get(lookupSlug);
        if (!staticAlbum || staticAlbum.photos.length === 0) continue;
        toMigrate.push({ dbId: dbAlbum.id, dbSlug: dbAlbum.slug, staticAlbum });
      }

      if (toMigrate.length === 0) {
        toast({ title: "Aucun album à migrer", description: "Pas de correspondance statique trouvée." });
        setMigrating(false);
        return;
      }

      const allResults: MigrationResult[] = [];

      for (let i = 0; i < toMigrate.length; i++) {
        const { dbId, dbSlug, staticAlbum } = toMigrate[i];
        setCurrentAlbum(dbSlug);
        setProgress(Math.round((i / toMigrate.length) * 100));

        const result: MigrationResult = { slug: dbSlug, photos_migrated: 0, cover_migrated: false, errors: [] };

        // Upload cover image
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
          album_id: string;
          image_url: string;
          title: string;
          alt_text: string | null;
          description: string | null;
          display_order: number;
        }[] = [];

        for (let j = 0; j < staticAlbum.photos.length; j++) {
          const photo = staticAlbum.photos[j];

          if (photo.isVideo) {
            // Keep video URLs as-is
            photoInserts.push({
              album_id: dbId,
              image_url: photo.image,
              title: photo.title,
              alt_text: photo.title,
              description: photo.description || null,
              display_order: j,
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
              album_id: dbId,
              image_url: newUrl,
              title: photo.title,
              alt_text: photo.title,
              description: photo.description || null,
              display_order: j,
            });
            result.photos_migrated++;
          }
        }

        // Replace album_photos in DB
        if (photoInserts.length > 0) {
          await supabase.from("album_photos").delete().eq("album_id", dbId);
          const { error: insertErr } = await supabase.from("album_photos").insert(photoInserts);
          if (insertErr) {
            result.errors.push(`DB insert error: ${insertErr.message}`);
          }
        }

        allResults.push(result);
        setResults([...allResults]);
      }

      setProgress(100);
      setDone(true);

      const totalPhotos = allResults.reduce((s, r) => s + r.photos_migrated, 0);
      const totalErrors = allResults.reduce((s, r) => s + r.errors.length, 0);
      toast({
        title: "Migration terminée",
        description: `${totalPhotos} photos migrées, ${totalErrors} erreur(s)`,
      });
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    } finally {
      setMigrating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Migration des photos vers le Cloud
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Upload direct depuis le navigateur : les {allStaticAlbums.reduce((s, a) => s + a.photos.length, 0)} photos
          des {allStaticAlbums.length} albums seront envoyées vers le storage Cloud.
          Les URLs en base seront mises à jour automatiquement.
        </p>

        {!done && (
          <Button onClick={startMigration} disabled={migrating} size="lg">
            {migrating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Migration en cours...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Lancer la migration
              </>
            )}
          </Button>
        )}

        {migrating && (
          <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-xs text-muted-foreground truncate">En cours : {currentAlbum}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
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
                {r.errors.length > 0 && (
                  <Badge variant="destructive">{r.errors.length} erreur(s)</Badge>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
