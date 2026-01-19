import { ExternalLink } from "lucide-react";

// Badge "Best of Houzz" - Design moderne et compact
const HouzzBadge = ({ 
  year, 
  category 
}: { 
  year: string; 
  category: "Photo" | "Service"; 
}) => {
  const isPhoto = category === "Photo";
  
  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-12 h-14 bg-gradient-to-b from-[#7ac142] to-[#5a9a32] rounded-t-md flex flex-col items-center justify-center text-white shadow-md group-hover:shadow-lg transition-shadow">
        {/* Houzz logo */}
        <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-sm flex items-center justify-center shadow-sm">
          <span className="text-[#7ac142] font-bold text-[8px]">h</span>
        </div>
        <span className="text-lg font-bold mt-2 leading-none">{year}</span>
        <span className="text-[5px] uppercase tracking-wider opacity-90">Best of</span>
      </div>
      {/* Ribbon */}
      <div className="flex">
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-t-[5px] border-t-[#4a8a2a]"></div>
        <div className="w-0 h-0 border-r-[6px] border-r-transparent border-t-[5px] border-t-[#4a8a2a]"></div>
      </div>
      {/* Category label */}
      <span className={`text-[9px] font-medium mt-1 px-2 py-0.5 rounded-full ${
        isPhoto 
          ? "bg-amber-100 text-amber-700" 
          : "bg-emerald-100 text-emerald-700"
      }`}>
        {category}
      </span>
    </div>
  );
};

// Icon badges (Pro, Star, etc.)
const HouzzIconBadge = ({ 
  type 
}: { 
  type: "pro" | "star" | "influence" | "recommended" | "saves";
}) => {
  const configs = {
    pro: {
      bg: "bg-gradient-to-b from-[#7ac142] to-[#5a9a32]",
      content: (
        <>
          <span className="text-[6px] uppercase opacity-80">Pro</span>
          <span className="font-bold text-xs">houzz</span>
        </>
      )
    },
    star: {
      bg: "bg-gradient-to-b from-amber-400 to-amber-500",
      content: (
        <>
          <span className="text-lg">★</span>
          <span className="text-[10px] font-bold">5/5</span>
        </>
      )
    },
    influence: {
      bg: "bg-gradient-to-b from-[#7ac142] to-[#5a9a32]",
      content: (
        <>
          <span className="text-[6px] uppercase opacity-80">Influence</span>
          <span className="text-sm">📢</span>
        </>
      )
    },
    recommended: {
      bg: "bg-gradient-to-b from-[#7ac142] to-[#5a9a32]",
      content: (
        <>
          <span className="text-[6px] uppercase opacity-80">Recommandé</span>
          <span className="text-sm">👍</span>
        </>
      )
    },
    saves: {
      bg: "bg-gradient-to-b from-[#7ac142] to-[#5a9a32]",
      content: (
        <>
          <span className="font-bold text-sm">25K</span>
          <span className="text-[6px] uppercase opacity-80">Ajouts</span>
        </>
      )
    }
  };

  const config = configs[type];

  return (
    <div className={`w-10 h-10 ${config.bg} rounded-lg flex flex-col items-center justify-center text-white shadow-md`}>
      {config.content}
    </div>
  );
};

export function Recompenses() {
  const allBadges = [
    { year: "2025", category: "Photo" as const },
    { year: "2024", category: "Photo" as const },
    { year: "2023", category: "Service" as const },
    { year: "2023", category: "Photo" as const },
    { year: "2022", category: "Service" as const },
    { year: "2022", category: "Photo" as const },
    { year: "2021", category: "Photo" as const },
    { year: "2020", category: "Photo" as const },
    { year: "2020", category: "Service" as const },
    { year: "2019", category: "Photo" as const },
    { year: "2019", category: "Service" as const },
  ];

  return (
    <section className="py-8 bg-stone/50 border-t border-border/50">
      <div className="container-custom">
        {/* Header - minimal */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-border"></div>
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Reconnu par Houzz
          </h2>
          <div className="h-px w-12 bg-border"></div>
        </div>

        {/* Single row of badges */}
        <div className="flex flex-wrap items-end justify-center gap-3 md:gap-4">
          {/* Year badges */}
          {allBadges.map((badge, index) => (
            <HouzzBadge 
              key={`${badge.year}-${badge.category}-${index}`}
              year={badge.year} 
              category={badge.category}
            />
          ))}
          
          {/* Separator */}
          <div className="hidden md:block w-px h-12 bg-border/60 mx-2"></div>
          
          {/* Icon badges */}
          <div className="flex gap-2 mt-4 md:mt-0">
            <HouzzIconBadge type="pro" />
            <HouzzIconBadge type="star" />
            <HouzzIconBadge type="recommended" />
            <HouzzIconBadge type="saves" />
          </div>
        </div>

        {/* Link to Houzz */}
        <div className="flex justify-center mt-5">
          <a 
            href="https://www.houzz.fr/pro/qualirenovation/qualirenovation-by-qualiconcept" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-wood transition-colors"
          >
            Voir notre profil
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
