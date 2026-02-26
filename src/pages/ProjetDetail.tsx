import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { AlbumCTA } from "@/components/albums/AlbumCTA";
import { OGTags } from "@/components/seo/OGTags";
import { OG_BASE_URL, getAlbumOgData } from "@/lib/og";
import { Album, Photo } from "@/data/albumsData";
import { usePublicAlbums } from "@/hooks/usePublicAlbums";
import { getRedirectSlug } from "@/data/redirects";

const ProjetDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const { albums, getAlbumBySlug, inProgressAlbums } = usePublicAlbums();
  
  // Check for redirect first
  const redirectSlug = slug ? getRedirectSlug(slug) : null;
  
  // Redirect 301 to new URL if old slug is used
  useEffect(() => {
    if (redirectSlug) {
      navigate(`/realisations/${redirectSlug}`, { replace: true });
    }
  }, [redirectSlug, navigate]);
  
  const album = slug ? getAlbumBySlug(slug) : undefined;
  
  // Get completed albums for navigation
  const completedAlbums = albums.filter(a => !a.isInProgress);
  const currentIndex = album ? completedAlbums.findIndex(a => a.slug === album.slug) : -1;
  const prevAlbum = currentIndex > 0 ? completedAlbums[currentIndex - 1] : null;
  const nextAlbum = currentIndex < completedAlbums.length - 1 ? completedAlbums[currentIndex + 1] : null;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null || !album) return;
      
      if (e.key === "Escape") setSelectedPhotoIndex(null);
      if (e.key === "ArrowLeft" && selectedPhotoIndex > 0) {
        setSelectedPhotoIndex(selectedPhotoIndex - 1);
      }
      if (e.key === "ArrowRight" && selectedPhotoIndex < album.photos.length - 1) {
        setSelectedPhotoIndex(selectedPhotoIndex + 1);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, album]);

  // If redirecting, don't render anything
  if (redirectSlug) {
    return null;
  }

  if (!album) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-semibold mb-4">Projet non trouvé</h1>
            <Button onClick={() => navigate("/realisations")}>
              Retour aux réalisations
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const currentPhoto = selectedPhotoIndex !== null ? album.photos[selectedPhotoIndex] : null;

  // Generate OG data for the album
  const ogData = getAlbumOgData({
    title: album.title,
    location: album.location,
    description: album.description,
    finitionSol: album.finitionSol,
    finitionMur: album.finitionMur,
    category: album.category
  });

  // Build dynamic OG image URL using the edge function with the album cover
  // album.coverImage is a bundled ES6 asset URL (e.g. /assets/xxx.jpg)
  // We pass it as absolute URL to the edge function for compositing
  const coverAbsoluteUrl = album.coverImage.startsWith("http")
    ? album.coverImage
    : `${OG_BASE_URL}${album.coverImage}`;

  const ogParams = new URLSearchParams({
    type: "album",
    title: album.title,
    location: album.location,
    cover: coverAbsoluteUrl,
  });
  const ogImageUrl = `https://wacqnrxbszvznfqiiuxm.supabase.co/functions/v1/og?${ogParams.toString()}`;

  // Short description for OG
  const shortDescription = `${album.location} • ${ogData.style}${ogData.tag1 ? ` • ${ogData.tag1}` : ""}${ogData.tag2 ? ` • ${ogData.tag2}` : ""} • Salle de bain Leroy Merlin, meuble salle de bain Ikea. Finitions premium.`;

  return (
    <Layout>
      <OGTags
        title={`${album.title} – Avant / Après`}
        description={shortDescription}
        path={`/realisations/${album.slug}`}
        type="article"
        coverImage={ogImageUrl}
      />

      <section className="section-padding pt-32 md:pt-40">
        <div className="container-custom">
          {/* Back button */}
          <Link
            to="/realisations"
            className="inline-flex items-center gap-2 text-wood font-medium mb-8 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux réalisations
          </Link>

          {/* Album header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <p className="text-sm text-wood font-medium mb-2">{album.location}</p>
            <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 text-primary">{album.title}</h1>
            {album.subtitle && (
              <h2 className="font-display text-lg md:text-xl text-wood italic mb-4">{album.subtitle}</h2>
            )}
            <p className="text-muted-foreground max-w-3xl whitespace-pre-line text-sm md:text-base leading-relaxed">{album.description}</p>
            
            {/* CTA Button */}
            {album.ctaButton && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6"
              >
                <Link 
                  to={album.ctaButton.link}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-wood to-wood-light text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-lg"
                >
                  {album.ctaButton.label}
                </Link>
              </motion.div>
            )}
            
            {/* Avis client */}
            {album.review && (
              <motion.div 
                className="mt-6 p-6 bg-accent/20 rounded-xl border border-border"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-sm text-wood font-medium mb-3">★★★★★ Avis du client</p>
                <a 
                  href={album.review.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block hover:opacity-80 transition-opacity"
                >
                  <blockquote className="font-display text-lg italic mb-3 text-foreground">
                    "{album.review.text}"
                  </blockquote>
                  <p className="text-wood font-semibold text-sm">— {album.review.author} <span className="underline ml-2">Voir sur Houzz →</span></p>
                </a>
              </motion.div>
            )}
            
            {/* Instagram Links */}
            {(album.instagramLink || album.instagramLinks) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 flex flex-wrap gap-2"
              >
                {album.instagramLinks ? (
                  album.instagramLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Reel {index + 1}
                    </a>
                  ))
                ) : (
                  <a
                    href={album.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Voir le Reel Instagram
                  </a>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Photos grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {album.photos.map((photo, index) => (
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

          {/* CTA Button after photos */}
          <AlbumCTA album={album} />

          {/* Navigation between projects */}
          <motion.div 
            className="mt-12 pt-8 border-t border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-between items-center gap-4">
              {prevAlbum ? (
                <Link
                  to={`/realisations/${prevAlbum.slug}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-all group flex-1 max-w-xs"
                >
                  <ChevronLeft className="w-5 h-5 text-wood group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left overflow-hidden">
                    <p className="text-xs text-muted-foreground">Projet précédent</p>
                    <p className="text-sm font-medium truncate">{prevAlbum.title}</p>
                  </div>
                </Link>
              ) : (
                <div className="flex-1 max-w-xs" />
              )}
              
              {nextAlbum ? (
                <Link
                  to={`/realisations/${nextAlbum.slug}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-all group flex-1 max-w-xs justify-end"
                >
                  <div className="text-right overflow-hidden">
                    <p className="text-xs text-muted-foreground">Projet suivant</p>
                    <p className="text-sm font-medium truncate">{nextAlbum.title}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-wood group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div className="flex-1 max-w-xs" />
              )}
            </div>
          </motion.div>

        </div>
      </section>



      <AnimatePresence>
        {selectedPhotoIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation arrows */}
            {selectedPhotoIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhotoIndex(selectedPhotoIndex - 1);
                }}
                className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors z-10"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
            )}
            {selectedPhotoIndex < album.photos.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhotoIndex(selectedPhotoIndex + 1);
                }}
                className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            )}

            <div className="max-w-5xl max-h-[90vh] mx-4" onClick={(e) => e.stopPropagation()}>
              {currentPhoto.isVideo ? (
                <video
                  src={currentPhoto.image}
                  className="max-w-full max-h-[80vh] object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={currentPhoto.image}
                  alt={currentPhoto.title}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              )}
              <div className="text-center mt-4">
                <h3 className="text-white font-medium">{currentPhoto.title}</h3>
                <p className="text-white/70 text-sm">{currentPhoto.description}</p>
                <p className="text-white/50 text-xs mt-2">
                  {selectedPhotoIndex + 1} / {album.photos.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default ProjetDetail;
