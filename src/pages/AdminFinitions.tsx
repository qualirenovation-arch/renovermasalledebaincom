import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { albums } from "@/data/albumsData";
import { FINITION_TYPES, type FinitionType } from "@/components/realisations/FinitionsFilter";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AlbumFinitions {
  id: string;
  title: string;
  location: string;
  finitionSol: FinitionType | undefined;
  finitionMur: FinitionType | undefined;
}

export default function AdminFinitions() {
  // État local pour les modifications
  const [finitions, setFinitions] = useState<Record<string, { sol?: FinitionType; mur?: FinitionType }>>(() => {
    const initial: Record<string, { sol?: FinitionType; mur?: FinitionType }> = {};
    albums.forEach(album => {
      initial[album.id] = {
        sol: album.finitionSol,
        mur: album.finitionMur,
      };
    });
    return initial;
  });

  const [copied, setCopied] = useState(false);

  // Toggle une finition
  const toggleFinition = (albumId: string, type: "sol" | "mur", finitionId: FinitionType) => {
    setFinitions(prev => {
      const current = prev[albumId] || {};
      const currentValue = current[type];
      
      return {
        ...prev,
        [albumId]: {
          ...current,
          [type]: currentValue === finitionId ? undefined : finitionId,
        },
      };
    });
  };

  // Générer le code à copier
  const generateCode = useMemo(() => {
    const lines: string[] = [];
    
    albums.forEach(album => {
      const albumFinitions = finitions[album.id];
      if (albumFinitions?.sol || albumFinitions?.mur) {
        lines.push(`// ${album.id}`);
        if (albumFinitions.sol) {
          lines.push(`finitionSol: "${albumFinitions.sol}",`);
        }
        if (albumFinitions.mur) {
          lines.push(`finitionMur: "${albumFinitions.mur}",`);
        }
        lines.push("");
      }
    });
    
    return lines.join("\n");
  }, [finitions]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Stats
  const stats = useMemo(() => {
    const counts: Record<FinitionType, { sol: number; mur: number }> = {} as any;
    FINITION_TYPES.forEach(f => {
      counts[f.id] = { sol: 0, mur: 0 };
    });
    
    Object.values(finitions).forEach(f => {
      if (f.sol) counts[f.sol].sol++;
      if (f.mur) counts[f.mur].mur++;
    });
    
    return counts;
  }, [finitions]);

  return (
    <div className="min-h-screen bg-background p-6">
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">
            Gestion des finitions par album
          </h1>
          <p className="text-muted-foreground">
            Cochez les finitions pour chaque album. Le code sera généré automatiquement.
          </p>
          <p className="text-sm font-medium mt-2">
            Total albums : <span className="text-primary">{albums.length}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6 p-4 bg-secondary/50 rounded-lg">
          <h2 className="font-semibold mb-3">Statistiques</h2>
          <div className="flex flex-wrap gap-4 text-sm">
            {FINITION_TYPES.map(f => (
              <div key={f.id} className="flex items-center gap-2">
                <span className="font-medium">{f.label}:</span>
                <span className="text-muted-foreground">
                  Sol ({stats[f.id].sol}) / Mur ({stats[f.id].mur})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tableau */}
        <div className="border rounded-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold w-12 text-center">
                    #
                  </TableHead>
                  <TableHead className="font-semibold min-w-[200px] sticky left-[48px] bg-muted/50 z-10">
                    Album
                  </TableHead>
                  <TableHead className="font-semibold min-w-[150px]">
                    Localisation
                  </TableHead>
                  {FINITION_TYPES.map(finition => (
                    <TableHead key={finition.id} className="text-center min-w-[120px]">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-semibold text-xs">{finition.label}</span>
                        <div className="flex gap-2 text-[10px] text-muted-foreground">
                          <span>Sol</span>
                          <span>Mur</span>
                        </div>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {albums.map((album, index) => {
                  const albumFinitions = finitions[album.id] || {};
                  
                  return (
                    <TableRow 
                      key={album.id}
                      className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
                    >
                      <TableCell className="text-center font-mono text-sm text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium sticky left-[48px] bg-inherit z-10">
                        <div className="max-w-[200px]">
                          <p className="truncate text-sm" title={album.title}>
                            {album.id}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {album.location}
                      </TableCell>
                      {FINITION_TYPES.map(finition => (
                        <TableCell key={finition.id} className="text-center">
                          <div className="flex justify-center gap-3">
                            {/* Sol */}
                            <div className="flex flex-col items-center">
                              <Checkbox
                                checked={albumFinitions.sol === finition.id}
                                onCheckedChange={() => toggleFinition(album.id, "sol", finition.id)}
                                className="h-5 w-5 data-[state=checked]:bg-wood data-[state=checked]:border-wood"
                              />
                            </div>
                            {/* Mur */}
                            <div className="flex flex-col items-center">
                              <Checkbox
                                checked={albumFinitions.mur === finition.id}
                                onCheckedChange={() => toggleFinition(album.id, "mur", finition.id)}
                                className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                              />
                            </div>
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Code généré */}
        <div className="bg-secondary/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Code à copier dans albumsData.ts</h2>
            <Button onClick={handleCopy} variant="outline" size="sm">
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copié !
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copier le code
                </>
              )}
            </Button>
          </div>
          <pre className="bg-background border rounded-lg p-4 overflow-x-auto text-sm max-h-[400px] overflow-y-auto">
            <code>{generateCode || "// Aucune finition sélectionnée"}</code>
          </pre>
        </div>

        {/* Légende */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-2">Légende</h3>
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-wood" />
              <span>= Sol sélectionné</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-primary" />
              <span>= Mur sélectionné</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
