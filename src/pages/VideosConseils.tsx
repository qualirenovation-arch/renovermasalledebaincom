import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PlayCircle, Filter, ExternalLink } from "lucide-react";
import { videoConseils } from "@/data/newsData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OGTags } from "@/components/seo/OGTags";

export default function VideosConseils() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extraire toutes les catégories uniques
  const categories = useMemo(() => {
    const cats = videoConseils.map((v) => v.category);
    return [...new Set(cats)];
  }, []);

  // Filtrer les vidéos par catégorie
  const filteredVideos = useMemo(() => {
    if (!selectedCategory) return videoConseils;
    return videoConseils.filter((v) => v.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <Layout>
      <OGTags
        title="Vidéos conseils"
        description="Découvrez nos vidéos conseils pour votre rénovation de salle de bain : avantages, inconvénients et astuces d'experts."
        path="/videos-conseils"
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-destructive/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-6">
              <PlayCircle className="w-4 h-4" />
              Vidéos Instagram
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Vidéos Conseils
            </h1>
            <p className="text-lg text-muted-foreground">
              Avantages, inconvénients et astuces pour réussir votre projet de rénovation.
              Des explications claires et honnêtes en vidéo.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              {videoConseils.length} vidéo{videoConseils.length > 1 ? "s" : ""} disponible{videoConseils.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </section>

      {/* Filtres par catégorie */}
      <section className="py-8 border-b border-border bg-background sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span>Filtrer :</span>
            </div>
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="rounded-full"
            >
              Toutes
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Grille de vidéos */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          {filteredVideos.length === 0 ? (
            <div className="text-center py-16">
              <PlayCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Aucune vidéo dans cette catégorie
              </h3>
              <p className="text-muted-foreground">
                Les vidéos conseils arrivent bientôt !
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <a
                  key={video.id}
                  href={video.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border hover:border-destructive/50"
                >
                  {/* Placeholder pour la miniature */}
                  <div className="aspect-[9/16] max-h-80 bg-gradient-to-br from-destructive/20 to-primary/10 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <PlayCircle className="w-16 h-16 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300 z-10" />
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <Badge variant="secondary" className="bg-destructive/90 text-white border-0 mb-2">
                        {video.category}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Contenu */}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-destructive transition-colors mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {video.description}
                    </p>
                    <div className="flex items-center gap-2 text-destructive text-sm font-medium">
                      <span>Voir sur Instagram</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-destructive/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Une question sur votre projet ?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nos vidéos vous donnent un aperçu, mais chaque projet est unique.
            Contactez-nous pour un conseil personnalisé.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link to="/devis#devis-form">Demander un devis gratuit</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
