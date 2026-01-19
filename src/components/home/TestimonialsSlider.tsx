import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

// Avis liés à des projets réels (sans noms de clients)
const testimonials = [
  {
    excerpt: "Un chantier livré dans le délai imparti, avec des finitions soignées et beaucoup de créativité.",
    projectName: "Suite Parentale Les Ternes",
    albumId: "suite-parentale"
  },
  {
    excerpt: "Professionnalisme exemplaire, respect du budget et des délais. Le résultat dépasse nos attentes.",
    projectName: "Bois-Colombes",
    albumId: "bois-colombes"
  },
  {
    excerpt: "Une équipe à l'écoute qui a su transformer notre salle de bain en un véritable espace de bien-être.",
    projectName: "Vincennes",
    albumId: "vincennes"
  },
  {
    excerpt: "Travail soigné et suivi impeccable du chantier. Je recommande vivement !",
    projectName: "Rue Pierre Guérin",
    albumId: "pierre-guerin"
  },
  {
    excerpt: "Une rénovation complète réalisée avec beaucoup de professionnalisme et un sens du détail remarquable.",
    projectName: "Soisy-sous-Montmorency",
    albumId: "soisy"
  },
  {
    excerpt: "Gestion de plusieurs chantiers avec rigueur. Des artisans qualifiés et un résultat parfait.",
    projectName: "Courbevoie Bécon",
    albumId: "courbevoie-guillaume"
  }
];

export function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 4500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-8 md:py-10 bg-accent/20">
      <div className="container-custom">
        <div className="max-w-xl mx-auto">
          {/* Header compact */}
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-wood text-wood" />
            ))}
            <span className="text-xs text-muted-foreground ml-2">Avis vérifiés</span>
          </div>

          {/* Slider content */}
          <div className="relative h-[100px] md:h-[90px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              >
                <blockquote className="text-sm md:text-base italic text-foreground/90 mb-3 leading-relaxed">
                  "{currentTestimonial.excerpt}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-wood">
                    {currentTestimonial.projectName}
                  </span>
                  <Link 
                    to={`/realisations?album=${currentTestimonial.albumId}`}
                    className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1 underline underline-offset-2"
                  >
                    Voir la réalisation
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-1.5 mt-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-wood w-4" 
                    : "bg-wood/30 hover:bg-wood/50"
                }`}
                aria-label={`Aller à l'avis ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
