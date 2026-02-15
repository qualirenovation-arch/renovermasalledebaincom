import { ExternalLink } from "lucide-react";
import houzzBadge2019 from "@/assets/logos/houzz-badge-2019.png";

// Badge officiel Houzz - Style rectangulaire/vertical
const HouzzBadge = ({ 
  year, 
  category 
}: { 
  year: string; 
  category: "Design" | "Service" | "Photo"; 
}) => {
  const categoryColor = category === "Design" ? "hsl(30, 35%, 42%)" : category === "Photo" ? "hsl(120, 50%, 35%)" : "hsl(197, 70%, 24%)";
  
  return (
    <div className="flex flex-col items-center">
      {/* Badge rectangulaire vertical style officiel */}
      <div 
        className="w-20 h-[104px] rounded-sm flex flex-col items-center justify-between py-2.5 px-1.5 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
        style={{ backgroundColor: categoryColor }}
      >
        {/* Année */}
        <span className="text-white text-xl font-bold leading-none">{year}</span>
        
        {/* Séparateur */}
        <div className="w-12 h-px bg-white/40" />
        
        {/* Best of Houzz - plus visible */}
        <div className="text-center">
          <span className="block text-white text-[10px] font-semibold uppercase tracking-wide leading-tight">
            Best of
          </span>
          <span className="block text-white text-[11px] font-bold uppercase tracking-wider leading-tight">
            Houzz
          </span>
        </div>
        
        {/* Catégorie */}
        <span className="text-white text-[9px] uppercase tracking-wide font-semibold">
          {category}
        </span>
      </div>
    </div>
  );
};

// Badge officiel Houzz image
const HouzzOfficialBadge = () => (
  <a 
    href="https://www.houzz.fr/pro/qualirenovation" 
    target="_blank" 
    rel="noopener noreferrer"
    className="transition-transform hover:scale-105"
  >
    <img 
      src={houzzBadge2019} 
      alt="Badge Houzz" 
      className="w-20 h-20 object-contain"
    />
  </a>
);

export function Recompenses() {
  const badges = [
    { year: "2026", category: "Photo" as const },
    { year: "2025", category: "Design" as const },
    { year: "2024", category: "Design" as const },
    { year: "2023", category: "Service" as const },
    { year: "2023", category: "Design" as const },
    { year: "2022", category: "Service" as const },
    { year: "2022", category: "Design" as const },
    { year: "2021", category: "Design" as const },
    { year: "2020", category: "Design" as const },
    { year: "2020", category: "Service" as const },
    { year: "2019", category: "Design" as const },
    { year: "2019", category: "Service" as const },
  ];

  return (
    <section className="py-10">
      <div className="container-custom">
        {/* Titre sobre et visible */}
        <h2 className="text-center text-base font-semibold text-foreground tracking-wide mb-6 uppercase">
          Récompenses
        </h2>

        {/* Ligne de badges alignés */}
        <div className="flex flex-wrap items-end justify-center gap-3 md:gap-4">
          {/* Badge officiel Houzz cliquable */}
          <HouzzOfficialBadge />
          
          {badges.map((badge, index) => (
            <HouzzBadge 
              key={`${badge.year}-${badge.category}-${index}`}
              year={badge.year} 
              category={badge.category}
            />
          ))}
        </div>

        {/* Lien discret vers Houzz */}
        <div className="flex justify-center mt-6">
          <a 
            href="https://www.houzz.fr/pro/qualirenovation/qualirenovation-by-qualiconcept" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-wood transition-colors"
          >
            Voir notre profil Houzz
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
