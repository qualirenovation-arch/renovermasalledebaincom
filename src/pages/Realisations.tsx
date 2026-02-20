import { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { OGTags } from "@/components/seo/OGTags";
import { 
  albums, 
  inProgressAlbums, 
  projectLocations, 
  Album, 
  Photo,
  FinitionType
} from "@/data/albumsData";
import { 
  FinitionsFilter, 
  NoResultsMessage, 
  FinitionsBadge,
  FINITION_TYPES 
} from "@/components/realisations/FinitionsFilter";

export default function Realisations() {
  const location = useLocation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"completed" | "inProgress">("completed");
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [selectedFinitions, setSelectedFinitions] = useState<FinitionType[]>([]);

  // Defensive: ensure the "completed" list never includes in-progress entries
  const completedAlbums = albums.filter((a) => !a.isInProgress);
  
  // Calculer les compteurs de finitions
  const finitionCounts = useMemo(() => {
    const counts: Record<FinitionType, number> = {
      "zellige": 0,
      "marbre": 0,
      "terrazzo": 0,
      "beton": 0,
      "effet-pierre": 0,
      "gres-cerame-uni": 0,
      "gres-cerame-motif": 0,
      "hexagonal": 0,
      "metro-allonge": 0,
      "mosaique": 0,
      "carreaux-de-ciment": 0,
    };
    
    completedAlbums.forEach(album => {
      if (album.finitionSol) {
        counts[album.finitionSol]++;
      }
      if (album.finitionMur && album.finitionMur !== album.finitionSol) {
        counts[album.finitionMur]++;
      }
    });
    
    return counts;
  }, [completedAlbums]);

  // Helper function to extract arrondissement or department number for sorting
  const getGeographicOrder = (location: string): number => {
    // Paris arrondissements: "Paris 3ème", "Paris 15ème" etc. -> order by arrondissement (1-20)
    const parisMatch = location.match(/Paris\s+(\d+)/i);
    if (parisMatch) {
      return parseInt(parisMatch[1], 10); // 1-20
    }
    
    // IDF departments: "(92)", "(93)", "(94)", "(95)" -> order after Paris (21-24)
    const deptMatch = location.match(/\((\d{2})\)/);
    if (deptMatch) {
      const dept = parseInt(deptMatch[1], 10);
      if (dept === 92) return 21;
      if (dept === 93) return 22;
      if (dept === 94) return 23;
      if (dept === 95) return 24;
      return 25 + dept; // Other departments after
    }
    
    return 100; // Unknown locations at the end
  };

  // Filter by finitions (OR logic - album matches if it has at least one selected finition)
  // Then sort geographically: Paris arrondissements first (1-20), then IDF departments (92, 93, 94, 95)
  const filteredCompletedAlbums = useMemo(() => {
    let filtered = completedAlbums;
    
    if (selectedFinitions.length > 0) {
      filtered = completedAlbums.filter(album => {
        return selectedFinitions.some(finition => 
          album.finitionSol === finition || album.finitionMur === finition
        );
      });
    }
    
    // Sort by geographic order
    return [...filtered].sort((a, b) => {
      return getGeographicOrder(a.location) - getGeographicOrder(b.location);
    });
  }, [completedAlbums, selectedFinitions]);

  // Determine if we should show the in-progress view based on URL hash
  useEffect(() => {
    if (location.hash === "#chantiers-en-cours") {
      setViewMode("inProgress");
      setSelectedAlbum(null);
    }
  }, [location.hash]);

  // Scroll to top when selecting an album
  useEffect(() => {
    if (selectedAlbum) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedAlbum]);

  const currentAlbums = viewMode === "completed" ? filteredCompletedAlbums : inProgressAlbums;

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null || !selectedAlbum) return;
      
      if (e.key === "Escape") setSelectedPhotoIndex(null);
      if (e.key === "ArrowLeft") handlePrevPhoto();
      if (e.key === "ArrowRight") handleNextPhoto();
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, selectedAlbum]);

  const handlePrevPhoto = () => {
    if (!selectedAlbum || selectedPhotoIndex === null) return;
    if (selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  const handleNextPhoto = () => {
    if (!selectedAlbum || selectedPhotoIndex === null) return;
    if (selectedPhotoIndex < selectedAlbum.photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  const handleAlbumClick = (album: Album) => {
    if (album.isInProgress) {
      // For in-progress projects, show them in modal
      setSelectedAlbum(album);
    } else {
      // For completed projects, navigate to dedicated page
      navigate(`/realisations/${album.slug}`);
    }
  };

  const handleFinitionsChange = (finitions: FinitionType[]) => {
    setSelectedFinitions(finitions);
  };

  return (
    <Layout>
      <OGTags
        title="Nos réalisations de salles de bain"
        description="Découvrez nos rénovations de salles de bain à Paris et IDF : zellige, marbre, terrazzo. Avant/Après de nos chantiers. Des projets premium, livrés sereinement."
        path="/realisations"
        coverImage="https://renovermasalledebain.com/og/realisations.jpg"
      />
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-16 bg-gradient-to-b from-stone to-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Nos réalisations de salles de bain à Paris et IDF
            </h1>
            <p className="text-muted-foreground text-lg">
              Chaque projet présenté ici est conçu pour garantir un chantier heureux, sans stress et avec un résultat durable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* View Mode Toggle */}
      <section className="py-8 bg-background border-b">
        <div className="container-custom">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setViewMode("completed");
                setSelectedAlbum(null);
                window.history.pushState(null, '', '/realisations');
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                viewMode === "completed"
                  ? "bg-wood text-white"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              Réalisations terminées ({completedAlbums.length})
            </button>
            <button
              onClick={() => {
                setViewMode("inProgress");
                setSelectedAlbum(null);
                window.history.pushState(null, '', '/realisations#chantiers-en-cours');
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                viewMode === "inProgress"
                  ? "bg-wood text-white"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              🚧 Chantiers en cours ({inProgressAlbums.length})
            </button>
          </div>
          
        </div>
      </section>

      {/* Finitions Filter - Only for completed projects */}
      {viewMode === "completed" && (
        <FinitionsFilter
          selectedFinitions={selectedFinitions}
          onFinitionsChange={handleFinitionsChange}
          finitionCounts={finitionCounts}
        />
      )}

      {/* Paris Map for In Progress */}
      {viewMode === "inProgress" && !selectedAlbum && (
        <section className="py-8 bg-stone">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative max-w-4xl mx-auto"
            >
              {/* Carte illustrée Île-de-France — l'image contient déjà le titre et les instructions */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/lovable-uploads/carte-chantiers-idf-clean.png"
                  alt="Carte des chantiers en cours en Île-de-France"
                  className="w-full h-auto block"
                  draggable={false}
                />

                {/* Pins interactifs positionnés par-dessus la carte */}
                {projectLocations.map((loc, index) => (
                  <motion.button
                    key={loc.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 260, damping: 20 }}
                    className="absolute group"
                    style={{
                      left: `${loc.x}%`,
                      top: `${loc.y}%`,
                      transform: "translate(-50%, -100%)",
                    }}
                    onClick={() => {
                      const album = inProgressAlbums.find(a => a.id === loc.id);
                      if (album) setSelectedAlbum(album);
                    }}
                    title={loc.name}
                  >
                    {/* Pin SVG interactif — légèrement transparent pour ne pas masquer les pins de l'image */}
                    <svg
                      viewBox="0 0 36 48"
                      className="w-8 h-11 drop-shadow-xl transition-transform duration-200 group-hover:scale-125 group-hover:-translate-y-1"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 0C8.059 0 0 8.059 0 18c0 13.5 18 30 18 30S36 31.5 36 18C36 8.059 27.941 0 18 0z"
                        fill="#1a4a6b"
                        fillOpacity="0.85"
                      />
                      <circle cx="18" cy="18" r="9" fill="white" fillOpacity="0.95" />
                      <circle cx="18" cy="18" r="5" fill="#1a4a6b" />
                    </svg>

                    {/* Pulse ring */}
                    <span
                      className="absolute rounded-full animate-ping opacity-40 pointer-events-none"
                      style={{
                        width: "32px",
                        height: "32px",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#1a4a6b",
                      }}
                    />

                    {/* Tooltip au survol */}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-foreground text-background text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-10">
                      <span className="font-semibold">{loc.name}</span>
                      <span className="opacity-70 ml-1 text-[10px]">• {loc.area}</span>
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Albums Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            {!selectedAlbum ? (
              <>
                {/* Message "Premier chantier" si aucun résultat */}
                {viewMode === "completed" && currentAlbums.length === 0 && selectedFinitions.length > 0 ? (
                  <NoResultsMessage />
                ) : (
                  <motion.div
                    key="albums"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {currentAlbums.map((album, index) => (
                      <motion.div
                        key={album.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group cursor-pointer"
                        onClick={() => handleAlbumClick(album)}
                        data-finition-sol={album.finitionSol}
                        data-finition-mur={album.finitionMur}
                      >
                        <div className="card-elevated overflow-hidden">
                          <div className="aspect-[4/3] overflow-hidden relative">
                            <img 
                              src={album.coverImage} 
                              alt={album.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {album.isInProgress && (
                              <div className="absolute top-4 left-4 px-3 py-1 bg-wood text-white text-xs font-medium rounded-full">
                                🚧 En cours
                              </div>
                            )}
                            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 text-white text-xs font-medium rounded-full">
                              {album.photos.length} photos
                            </div>
                          </div>
                          <div className="p-6">
                            <p className="text-sm text-wood font-medium mb-2">{album.location}</p>
                            <h3 className="font-display text-xl font-semibold mb-2">
                              {album.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2">{album.description}</p>
                            {/* SEO: Finitions utilisées - texte visible et indexable */}
                            <FinitionsBadge 
                              finitionSol={album.finitionSol} 
                              finitionMur={album.finitionMur} 
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                key="album-detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Back button */}
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="flex items-center gap-2 text-wood font-medium mb-8 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {viewMode === "inProgress" ? "Retour à la carte" : "Retour aux albums"}
                </button>

                {/* Album header */}
                <div className="mb-8">
                  <p className="text-sm text-wood font-medium mb-2">{selectedAlbum.location}</p>
                  <h2 className="font-display text-3xl font-semibold mb-2">{selectedAlbum.title}</h2>
                  {selectedAlbum.subtitle && (
                    <h3 className="font-display text-lg md:text-xl text-wood italic mb-4">{selectedAlbum.subtitle}</h3>
                  )}
                  <p className="text-muted-foreground max-w-3xl whitespace-pre-line">{selectedAlbum.description}</p>
                  
                  {/* CTA Button */}
                  {selectedAlbum.ctaButton && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-6"
                    >
                      <Link 
                        to={selectedAlbum.ctaButton.link}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-wood to-wood-light text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-lg"
                      >
                        {selectedAlbum.ctaButton.label}
                      </Link>
                    </motion.div>
                  )}
                  
                  {/* Avis client */}
                  {selectedAlbum.review && (
                    <motion.div 
                      className="mt-6 p-6 bg-accent/20 rounded-xl border border-border"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-sm text-wood font-medium mb-3">★★★★★ Avis du client</p>
                      <a 
                        href={selectedAlbum.review.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block hover:opacity-80 transition-opacity"
                      >
                        <blockquote className="font-display text-lg italic mb-3 text-foreground">
                          "{selectedAlbum.review.text}"
                        </blockquote>
                        <p className="text-wood font-semibold text-sm">— {selectedAlbum.review.author} <span className="underline ml-2">Voir sur Houzz →</span></p>
                      </a>
                    </motion.div>
                  )}
                  
                  {/* Liens Instagram */}
                  {(selectedAlbum.instagramLink || selectedAlbum.instagramLinks) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-4 flex flex-wrap gap-2"
                    >
                      {selectedAlbum.instagramLinks ? (
                        selectedAlbum.instagramLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            Reel {index + 1}
                          </a>
                        ))
                      ) : (
                        <a
                          href={selectedAlbum.instagramLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                          Voir le Reel Instagram
                        </a>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Photos/Videos grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedAlbum.photos.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedPhotoIndex(index)}
                    >
                      <div className="aspect-square overflow-hidden rounded-xl relative">
                        {photo.isVideo ? (
                          <>
                            <video 
                              src={photo.image} 
                              className="w-full h-full object-cover"
                              muted
                              playsInline
                              preload="metadata"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                          </>
                        ) : (
                          <img 
                            src={photo.image} 
                            alt={photo.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        )}
                      </div>
                      <p className="mt-2 text-sm font-medium truncate">{photo.title}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Navigation entre projets */}
                {(() => {
                  const currentIndex = currentAlbums.findIndex(a => a.id === selectedAlbum.id);
                  const prevAlbum = currentIndex > 0 ? currentAlbums[currentIndex - 1] : null;
                  const nextAlbum = currentIndex < currentAlbums.length - 1 ? currentAlbums[currentIndex + 1] : null;
                  
                  return (
                    <motion.div 
                      className="mt-12 pt-8 border-t border-border"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex justify-between items-center gap-4">
                        {prevAlbum ? (
                          <button
                            onClick={() => setSelectedAlbum(prevAlbum)}
                            className="flex items-center gap-3 px-5 py-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-all group flex-1 max-w-xs"
                          >
                            <ChevronLeft className="w-5 h-5 text-wood group-hover:-translate-x-1 transition-transform" />
                            <div className="text-left">
                              <p className="text-xs text-muted-foreground">Projet précédent</p>
                              <p className="text-sm font-medium truncate">{prevAlbum.title}</p>
                            </div>
                          </button>
                        ) : (
                          <div className="flex-1 max-w-xs" />
                        )}
                        
                        {nextAlbum ? (
                          <button
                            onClick={() => setSelectedAlbum(nextAlbum)}
                            className="flex items-center gap-3 px-5 py-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-all group flex-1 max-w-xs justify-end"
                          >
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">Projet suivant</p>
                              <p className="text-sm font-medium truncate">{nextAlbum.title}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-wood group-hover:translate-x-1 transition-transform" />
                          </button>
                        ) : (
                          <div className="flex-1 max-w-xs" />
                        )}
                      </div>
                    </motion.div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Photo Lightbox */}
      <AnimatePresence>
        {selectedAlbum && selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handlePrevPhoto(); }}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handleNextPhoto(); }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <motion.div
              key={selectedPhotoIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-5xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedAlbum.photos[selectedPhotoIndex].isVideo ? (
                <video 
                  src={selectedAlbum.photos[selectedPhotoIndex].image} 
                  className="max-h-[75vh] w-auto object-contain rounded-lg"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img 
                  src={selectedAlbum.photos[selectedPhotoIndex].image} 
                  alt={selectedAlbum.photos[selectedPhotoIndex].title}
                  className="max-h-[75vh] w-auto object-contain rounded-lg"
                />
              )}
              <div className="mt-4 text-center text-white">
                <h3 className="text-xl font-semibold">{selectedAlbum.photos[selectedPhotoIndex].title}</h3>
                <p className="text-white/70">{selectedAlbum.photos[selectedPhotoIndex].description}</p>
                <p className="text-white/50 text-sm mt-2">
                  {selectedPhotoIndex + 1} / {selectedAlbum.photos.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
              Votre projet nous intéresse
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Envie d'une transformation similaire ? Contactez-nous pour une étude gratuite.
            </p>
            <Button variant="cta" size="xl" asChild>
              <Link to="/devis#devis-form">
                Demander un devis gratuit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
