import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Album } from "@/data/albumsData";

interface RelatedProjectsProps {
  currentAlbum: Album;
  allAlbums: Album[];
}

/**
 * Selects up to 3 related projects based on:
 * 1. Same category (strongest signal)
 * 2. Same geographic area (city/department extracted from location)
 * 3. Fallback: random completed projects
 */
function getRelatedAlbums(current: Album, all: Album[], count = 3): Album[] {
  const candidates = all.filter(a => a.slug !== current.slug && !a.isInProgress);
  if (candidates.length === 0) return [];

  // Extract area key from location (e.g. "Paris 12ème" → "paris 12", "Saint-Maur (94)" → "saint-maur")
  const getArea = (loc: string) => loc.split("-")[0].toLowerCase().replace(/[èéêë]/g, "e").trim();
  const currentArea = getArea(current.location);

  // Score each candidate
  const scored = candidates.map(album => {
    let score = 0;
    // Same category = strong match
    if (current.category && album.category && album.category === current.category) {
      score += 10;
    }
    // Same area = moderate match
    if (getArea(album.location) === currentArea) {
      score += 5;
    }
    // Similar finitions = weak match
    if (current.finitionSol && album.finitionSol === current.finitionSol) score += 2;
    if (current.finitionMur && album.finitionMur === current.finitionMur) score += 2;
    
    // Add small random factor to vary results
    score += Math.random() * 3;
    
    return { album, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map(s => s.album);
}

export function RelatedProjects({ currentAlbum, allAlbums }: RelatedProjectsProps) {
  const related = getRelatedAlbums(currentAlbum, allAlbums);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-border">
      <h2 className="font-display text-2xl md:text-3xl font-light mb-2 text-primary">
        Projets <span className="italic font-normal text-gold">similaires</span>
      </h2>
      <p className="text-muted-foreground mb-8 text-sm">
        Découvrez d'autres rénovations qui pourraient vous inspirer
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((album, index) => (
          <motion.div
            key={album.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={`/realisations/${album.slug}`}
              className="group block rounded-2xl overflow-hidden border border-border/50 bg-card hover:shadow-lg hover:border-gold/30 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={album.coverImage}
                  alt={album.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-wood font-medium mb-1">{album.location}</p>
                <h3 className="font-display text-sm font-medium text-foreground line-clamp-2 mb-2">
                  {album.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-all">
                  Découvrir
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Link to all projects for additional internal linking */}
      <div className="mt-8 text-center">
        <Link
          to="/realisations"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Voir toutes nos réalisations
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
