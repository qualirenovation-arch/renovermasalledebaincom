import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import chercheMidiData from "@/assets/qualirenovation/cherche-midi.jpg.asset.json";
const chercheMidi = chercheMidiData.url;
import avJeanneSalonData from "@/assets/qualirenovation/av-jeanne-salon.jpg.asset.json";
const avJeanneSalon = avJeanneSalonData.url;
import avJeanneCuisineData from "@/assets/qualirenovation/av-jeanne-cuisine.jpg.asset.json";
const avJeanneCuisine = avJeanneCuisineData.url;
import chambreData from "@/assets/qualirenovation/chambre.jpg.asset.json";
const chambre = chambreData.url;
import salonBibliothequeData from "@/assets/qualirenovation/salon-bibliotheque.jpg.asset.json";
const salonBibliotheque = salonBibliothequeData.url;
import faubourgSalonData from "@/assets/qualirenovation/faubourg-saint-denis-salon.jpg.asset.json";
const faubourgSalon = faubourgSalonData.url;
import faubourgSejourData from "@/assets/qualirenovation/faubourg-saint-denis-sejour.jpg.asset.json";
const faubourgSejour = faubourgSejourData.url;
import faubourgCuisineData from "@/assets/qualirenovation/faubourg-saint-denis-cuisine.jpg.asset.json";
const faubourgCuisine = faubourgCuisineData.url;
import ernestSamData from "@/assets/qualirenovation/ernest-savart-salle-a-manger.jpg.asset.json";
const ernestSam = ernestSamData.url;
import ernestSejourData from "@/assets/qualirenovation/ernest-savart-sejour.jpg.asset.json";
const ernestSejour = ernestSejourData.url;
import rooseveltChambreData from "@/assets/qualirenovation/roosevelt-chambre.jpg.asset.json";
const rooseveltChambre = rooseveltChambreData.url;
import rooseveltChambreMarbreData from "@/assets/qualirenovation/roosevelt-chambre-marbre.jpg.asset.json";
const rooseveltChambreMarbre = rooseveltChambreMarbreData.url;
import rooseveltSejourCuisineData from "@/assets/qualirenovation/roosevelt-sejour-cuisine.jpg.asset.json";
const rooseveltSejourCuisine = rooseveltSejourCuisineData.url;

const slides = [
  { src: chercheMidi, alt: "Rénovation appartement Cherche-Midi, Paris", location: "Paris 6e" },
  { src: avJeanneSalon, alt: "Rénovation salon haussmannien Avenue Jeanne", location: "Île-de-France" },
  { src: avJeanneCuisine, alt: "Rénovation cuisine ouverte Avenue Jeanne", location: "Île-de-France" },
  { src: rooseveltSejourCuisine, alt: "Rénovation séjour et cuisine Avenue Roosevelt, Paris 8e", location: "Paris 8e" },
  { src: chambre, alt: "Rénovation chambre parentale, Paris", location: "Paris" },
  { src: salonBibliotheque, alt: "Rénovation salon avec bibliothèque sur mesure", location: "Paris" },
  { src: rooseveltChambreMarbre, alt: "Rénovation chambre marbre Avenue Roosevelt, Paris 8e", location: "Paris 8e" },
  { src: faubourgSalon, alt: "Rénovation salon Faubourg Saint-Denis, Paris", location: "Paris 10e" },
  { src: faubourgSejour, alt: "Rénovation séjour Faubourg Saint-Denis, Paris", location: "Paris 10e" },
  { src: faubourgCuisine, alt: "Rénovation cuisine ouverte Faubourg Saint-Denis", location: "Paris 10e" },
  { src: rooseveltChambre, alt: "Rénovation chambre Avenue Roosevelt, Paris 8e", location: "Paris 8e" },
  { src: ernestSam, alt: "Rénovation salle à manger Rue Ernest Savart", location: "Île-de-France" },
  { src: ernestSejour, alt: "Rénovation séjour ouvert Rue Ernest Savart", location: "Île-de-France" },
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

      <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-foreground">
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
