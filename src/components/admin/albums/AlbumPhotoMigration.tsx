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
  album_id: string;
  slug: string;
  photos_migrated: number;
  cover_migrated: boolean;
  errors: string[];
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
      // Fetch DB albums to get IDs and static_slug mapping
      const { data: dbAlbums, error } = await supabase
        .from("albums")
        .select("id, slug, static_slug");

      if (error) throw error;
      if (!dbAlbums?.length) {
        toast({ title: "Aucun album en base", variant: "destructive" });
        setMigrating(false);
        return;
      }

      // Build mapping: DB album -> static album
      const staticBySlug = new Map(allStaticAlbums.map((a) => [a.slug, a]));

      type AlbumPayload = {
        album_id: string;
        slug: string;
        cover_image_url?: string;
        photos: {
          url: string;
          title: string;
          description: string;
          alt_text: string;
          display_order: number;
          is_video?: boolean;
        }[];
      };

      const albumsToMigrate: AlbumPayload[] = [];

      for (const dbAlbum of dbAlbums) {
        const lookupSlug = dbAlbum.static_slug || dbAlbum.slug;
        const staticAlbum = staticBySlug.get(lookupSlug);
        if (!staticAlbum || staticAlbum.photos.length === 0) continue;

        const origin = window.location.origin;
        const toAbsolute = (url: string) => url.startsWith("http") ? url : `${origin}${url.startsWith("/") ? url : `/${url}`}`;

        albumsToMigrate.push({
          album_id: dbAlbum.id,
          slug: dbAlbum.slug,
          cover_image_url: staticAlbum.coverImage ? toAbsolute(staticAlbum.coverImage) : undefined,
          photos: staticAlbum.photos.map((p, i) => ({
            url: toAbsolute(p.image),
            title: p.title,
            description: p.description,
            alt_text: p.title,
            display_order: i,
            is_video: p.isVideo,
          })),
        });
      }

      if (albumsToMigrate.length === 0) {
        toast({ title: "Aucun album à migrer", description: "Pas de correspondance statique trouvée." });
        setMigrating(false);
        return;
      }

      // Process in batches of 3 to avoid timeouts
      const BATCH_SIZE = 3;
      const allResults: MigrationResult[] = [];

      for (let i = 0; i < albumsToMigrate.length; i += BATCH_SIZE) {
        const batch = albumsToMigrate.slice(i, i + BATCH_SIZE);
        setCurrentAlbum(batch.map((a) => a.slug).join(", "));
        setProgress(Math.round((i / albumsToMigrate.length) * 100));

        const { data: session } = await supabase.auth.getSession();
        const token = session?.session?.access_token;
        if (!token) throw new Error("Non authentifié");

        const response = await supabase.functions.invoke("migrate-album-photos", {
          body: { albums: batch },
        });

        if (response.error) {
          toast({ title: "Erreur batch", description: response.error.message, variant: "destructive" });
          continue;
        }

        if (response.data?.results) {
          allResults.push(...response.data.results);
        }
      }

      setResults(allResults);
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
          Cette opération télécharge les {allStaticAlbums.reduce((s, a) => s + a.photos.length, 0)} photos
          statiques des {allStaticAlbums.length} albums et les envoie dans le storage Cloud.
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
              <div key={r.album_id} className="flex items-center gap-2 text-sm p-2 bg-muted/30 rounded">
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
