import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { albums } from "@/data/albumsData";

// Pick cover images from completed albums, excluding degat des eaux
const heroImages = albums
  .filter((a) => !a.isInProgress && a.coverImage && a.category !== "degat-eaux")
  .map((a) => ({
    src: a.coverImage,
    alt: a.title,
    location: a.location,
  }));

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 30000);
    return () => clearInterval(timer);
  }, [next]);

  const current = heroImages[index];

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={current.src}
          alt={current.alt}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.08 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 30, ease: "linear" },
          }}
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading={index === 0 ? "eager" : "lazy"}
        />
      </AnimatePresence>

      {/* Location badge */}
      <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-foreground/80">
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
