import { ExternalLink } from "lucide-react";

// Badge unifié "Best of Houzz" - Même taille pour tous
const HouzzBadge = ({ 
  year, 
  category 
}: { 
  year: string; 
  category: "Design" | "Service"; 
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* Badge principal */}
      <div className="w-14 h-14 rounded-full bg-[#7ac142] flex items-center justify-center text-white shadow-sm border-2 border-white/20">
        <div className="text-center">
          <span className="block text-base font-bold leading-none">{year.slice(-2)}</span>
          <span className="block text-[6px] uppercase tracking-wider opacity-90 mt-0.5">Best of</span>
        </div>
      </div>
      {/* Label catégorie */}
      <span className={`text-[10px] font-medium mt-1.5 ${
        category === "Design" 
          ? "text-amber-600" 
          : "text-emerald-600"
      }`}>
        {category}
      </span>
    </div>
  );
};

export function Recompenses() {
  const badges = [
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
    <section className="py-12">
      <div className="container-custom">
        {/* Titre sobre et visible */}
        <h2 className="text-center text-lg font-semibold text-foreground/80 tracking-wide mb-8">
          Distinctions
        </h2>

        {/* Ligne de badges alignés */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {badges.map((badge, index) => (
            <HouzzBadge 
              key={`${badge.year}-${badge.category}-${index}`}
              year={badge.year} 
              category={badge.category}
            />
          ))}
        </div>

        {/* Lien discret vers Houzz */}
        <div className="flex justify-center mt-8">
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
