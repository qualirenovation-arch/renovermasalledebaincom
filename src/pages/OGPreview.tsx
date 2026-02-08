import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Check } from "lucide-react";

type OGType = "default" | "page" | "album";

interface FormData {
  type: OGType;
  title: string;
  subtitle: string;
  location: string;
  style: string;
  tag1: string;
  tag2: string;
  cover: string;
}

export default function OGPreview() {
  const [formData, setFormData] = useState<FormData>({
    type: "default",
    title: "Salle de bain Paris 3ème",
    subtitle: "Paris & Île-de-France",
    location: "Paris 3ème",
    style: "Noir & Blanc",
    tag1: "Zellige",
    tag2: "Marbre",
    cover: "",
  });

  const [copied, setCopied] = useState(false);

  const generateImageUrl = () => {
    const params = new URLSearchParams();
    params.set("type", formData.type);

    if (formData.type !== "default") {
      if (formData.title) params.set("title", formData.title);
      if (formData.type === "page" && formData.subtitle) {
        params.set("subtitle", formData.subtitle);
      }
      if (formData.type === "album") {
        if (formData.location) params.set("location", formData.location);
        if (formData.style) params.set("style", formData.style);
        if (formData.tag1) params.set("tag1", formData.tag1);
        if (formData.tag2) params.set("tag2", formData.tag2);
        if (formData.cover) params.set("cover", formData.cover);
      }
    }

    return `https://wacqnrxbszvznfqiiuxm.supabase.co/functions/v1/og?${params.toString()}`;
  };

  const imageUrl = generateImageUrl();

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(imageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Prévisualisation OG</h1>
          <p className="text-muted-foreground">
            Testez et prévisualisez les images Open Graph pour vos partages sociaux
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
                <CardDescription>Paramètres de l'image OG</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">Type d'image</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value as OGType })
                    }
                  >
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Par défaut</SelectItem>
                      <SelectItem value="page">Page</SelectItem>
                      <SelectItem value="album">Album / Réalisation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Title */}
                {formData.type !== "default" && (
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Titre de la page"
                    />
                  </div>
                )}

                {/* Subtitle (pour page) */}
                {formData.type === "page" && (
                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Sous-titre</Label>
                    <Input
                      id="subtitle"
                      value={formData.subtitle}
                      onChange={(e) =>
                        setFormData({ ...formData, subtitle: e.target.value })
                      }
                      placeholder="Sous-titre"
                    />
                  </div>
                )}

                {/* Album fields */}
                {formData.type === "album" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="location">Localisation</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="Paris 3ème"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="style">Style</Label>
                      <Input
                        id="style"
                        value={formData.style}
                        onChange={(e) =>
                          setFormData({ ...formData, style: e.target.value })
                        }
                        placeholder="Noir & Blanc"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tag1">Tag 1</Label>
                      <Input
                        id="tag1"
                        value={formData.tag1}
                        onChange={(e) =>
                          setFormData({ ...formData, tag1: e.target.value })
                        }
                        placeholder="Zellige"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tag2">Tag 2</Label>
                      <Input
                        id="tag2"
                        value={formData.tag2}
                        onChange={(e) =>
                          setFormData({ ...formData, tag2: e.target.value })
                        }
                        placeholder="Marbre"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cover">URL de la couverture (optionnel)</Label>
                      <Input
                        id="cover"
                        value={formData.cover}
                        onChange={(e) =>
                          setFormData({ ...formData, cover: e.target.value })
                        }
                        placeholder="https://renovermasalledebain.com/images/album.jpg"
                      />
                      <p className="text-xs text-muted-foreground">
                        Si renseignée, l'image sera utilisée en fond avec overlay
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Prévisualisation */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Aperçu</CardTitle>
                <CardDescription>Image OG (1200x630px)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg overflow-hidden border border-border">
                  <img
                    src={imageUrl}
                    alt="Aperçu OG"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">URL générée</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-muted p-3 rounded border border-border break-all text-sm font-mono">
                    {imageUrl}
                  </div>
                  <Button
                    onClick={handleCopyUrl}
                    variant="outline"
                    className="w-full"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copié !
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copier l'URL
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Exemples */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Exemples d'utilisation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold mb-2">1. Default (accueil)</p>
                <code className="bg-muted p-2 rounded block break-all">
                  type=default
                </code>
              </div>
              <div>
                <p className="font-semibold mb-2">2. Page statique</p>
                <code className="bg-muted p-2 rounded block break-all">
                  type=page&title=Nos%20réalisations&subtitle=Paris%20%26%20IDF
                </code>
              </div>
              <div>
                <p className="font-semibold mb-2">3. Album / Réalisation</p>
                <code className="bg-muted p-2 rounded block break-all">
                  type=album&title=Salle%20de%20bain&location=Paris%203ème&style=Noir%20%26%20Blanc&tag1=Zellige&tag2=Marbre
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
