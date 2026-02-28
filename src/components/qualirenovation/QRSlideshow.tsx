import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import chercheMidi from "@/assets/qualirenovation/cherche-midi.jpg";
import avJeanneSalon from "@/assets/qualirenovation/av-jeanne-salon.jpg";
import avJeanneCuisine from "@/assets/qualirenovation/av-jeanne-cuisine.jpg";
import chambre from "@/assets/qualirenovation/chambre.jpg";
import salonBibliotheque from "@/assets/qualirenovation/salon-bibliotheque.jpg";

const slides = [
  { src: chercheMidi, alt: "Rénovation appartement Cherche-Midi, Paris", location: "Paris 6e" },
  { src: avJeanneSalon, alt: "Rénovation salon haussmannien Avenue Jeanne", location: "Île-de-France" },
  { src: avJeanneCuisine, alt: "Rénovation cuisine ouverte Avenue Jeanne", location: "Île-de-France" },
  { src: chambre, alt: "Rénovation chambre parentale, Paris", location: "Paris" },
  { src: salonBibliotheque, alt: "Rénovation salon avec bibliothèque sur mesure", location: "Paris" },
];

export function QRSlideshow() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 30000);
    return () => clearInterval(timer);
  }, [next]);

  const current = slides[index];

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

      <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-foreground/80">
        {current.location}
      </div>

      <div className="absolute bottom-3 right-3 flex gap-1">
        {slides.map((_, i) => (
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
