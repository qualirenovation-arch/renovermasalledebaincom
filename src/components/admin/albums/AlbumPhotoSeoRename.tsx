import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileEdit, CheckCircle, AlertCircle, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RenameResult {
  album_slug: string;
  photos_renamed: number;
  cover_renamed: boolean;
  errors: string[];
  renames: { old: string; new: string }[];
}

interface RenameResponse {
  success: boolean;
  dry_run: boolean;
  total_renamed: number;
  total_errors: number;
  total_albums: number;
  results: RenameResult[];
}

export function AlbumPhotoSeoRename() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [dryRunResults, setDryRunResults] = useState<RenameResponse | null>(null);
  const [liveResults, setLiveResults] = useState<RenameResponse | null>(null);

  const runRename = async (dryRun: boolean) => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Non authentifié");

      const { data, error } = await supabase.functions.invoke("rename-photos-seo", {
        body: { dry_run: dryRun },
      });

      if (error) throw error;

      const response = data as RenameResponse;

      if (dryRun) {
        setDryRunResults(response);
      } else {
        setLiveResults(response);
        setDryRunResults(null);
      }

      toast({
        title: dryRun ? "Prévisualisation terminée" : "Renommage terminé",
        description: `${response.total_renamed} photos ${dryRun ? "à renommer" : "renommées"}, ${response.total_errors} erreur(s)`,
      });
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const displayResults = liveResults || dryRunResults;
  const isDryRun = displayResults?.dry_run ?? false;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <FileEdit className="w-4 h-4" />
          Renommage SEO des photos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Renomme toutes les photos en base avec un nommage SEO optimisé :<br />
          <code className="text-xs bg-muted px-1 py-0.5 rounded">
            renovermasalledebain/&#123;slug-album&#125;/&#123;slug-album&#125;-photo-&#123;n&#125;.jpg
          </code>
        </p>

        {!loading && !displayResults && (
          <div className="flex gap-2">
            <Button onClick={() => runRename(true)} variant="outline" className="flex-1">
              <Eye className="w-4 h-4 mr-2" />
              Prévisualiser (dry run)
            </Button>
          </div>
        )}

        {loading && (
          <div className="space-y-2">
            <Progress value={50} className="animate-pulse" />
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" />
              Traitement en cours… (peut prendre quelques minutes)
            </p>
          </div>
        )}

        {displayResults && (
          <>
            {/* Summary */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-muted/40 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{displayResults.total_albums}</div>
                <div className="text-xs text-muted-foreground">Albums</div>
              </div>
              <div className="bg-muted/40 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-primary">{displayResults.total_renamed}</div>
                <div className="text-xs text-muted-foreground">
                  {isDryRun ? "À renommer" : "Renommées"}
                </div>
              </div>
              <div className="bg-muted/40 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-destructive">{displayResults.total_errors}</div>
                <div className="text-xs text-muted-foreground">Erreurs</div>
              </div>
            </div>

            {/* Album list */}
            <div className="space-y-1 max-h-80 overflow-y-auto">
              {displayResults.results
                .filter((r) => r.photos_renamed > 0 || r.cover_renamed || r.errors.length > 0)
                .map((r) => (
                  <div key={r.album_slug} className="flex items-center gap-2 text-sm p-2 bg-muted/30 rounded">
                    {r.errors.length === 0 ? (
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                    )}
                    <span className="truncate flex-1 font-medium">{r.album_slug}</span>
                    <Badge variant="secondary">{r.photos_renamed} photos</Badge>
                    {r.cover_renamed && <Badge variant="outline">cover ✓</Badge>}
                    {r.errors.length > 0 && (
                      <Badge variant="destructive">{r.errors.length} err</Badge>
                    )}
                  </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {isDryRun && (
                <Button
                  onClick={() => runRename(false)}
                  disabled={loading}
                  className="flex-1"
                >
                  <FileEdit className="w-4 h-4 mr-2" />
                  Lancer le renommage ({displayResults.total_renamed} photos)
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => { setDryRunResults(null); setLiveResults(null); }}
                disabled={loading}
              >
                Réinitialiser
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
