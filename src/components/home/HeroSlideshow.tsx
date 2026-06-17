import { useState, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { albums as staticAlbums } from "@/data/albumsData";
import { resolvePicture } from "@/lib/picture";

// Build static cover lookup once
const staticCoverBySlug = new Map(
  staticAlbums.map((a) => [a.slug, { coverImage: a.coverImage, title: a.title, location: a.location }])
);

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  const { data: heroImages = [] } = useQuery({
    queryKey: ["hero-slideshow"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("albums")
        .select("static_slug, slug, title, location, cover_image")
        .eq("show_in_hero", true)
        .eq("is_in_progress", false)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return (data ?? []).map((a) => {
        const staticData = staticCoverBySlug.get(a.static_slug || "") || staticCoverBySlug.get(a.slug);
        return {
          src: staticData?.coverImage || a.cover_image,
          alt: staticData?.title || a.title,
          location: staticData?.location || a.location,
        };
      }).filter((img) => !!img.src);
    },
    staleTime: 5 * 60 * 1000,
  });

  const next = useCallback(() => {
    setIndex((prev) => (heroImages.length > 0 ? (prev + 1) % heroImages.length : 0));
  }, [heroImages.length]);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = setInterval(next, 30000);
    return () => clearInterval(timer);
  }, [next, heroImages.length]);

  // Reset index if it's out of bounds
  useEffect(() => {
    if (heroImages.length > 0 && index >= heroImages.length) {
      setIndex(0);
    }
  }, [heroImages.length, index]);

  if (heroImages.length === 0) return null;

  const current = heroImages[index];
  const sources = resolvePicture(current.src);

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="wait">
        <motion.picture
          key={index}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.08 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 30, ease: "linear" },
          }}
          className="absolute inset-0 w-full h-full"
        >
          {sources.avif && <source type="image/avif" srcSet={sources.avif} sizes="100vw" />}
          {sources.webp && <source type="image/webp" srcSet={sources.webp} sizes="100vw" />}
          <img
            src={sources.fallback}
            alt={current.alt}
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding={index === 0 ? "sync" : "async"}
          />
        </motion.picture>
      </AnimatePresence>

      {/* Location badge */}
      <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-foreground">
        {current.location}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 right-3 flex gap-1">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i === index ? "bg-white w-4" : "bg-white/50"
            }`}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
