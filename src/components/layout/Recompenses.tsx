import { Star, ThumbsUp, Volume2 } from "lucide-react";

// Badge "Best of Houzz" component
const HouzzPrixBadge = ({ 
  year, 
  category, 
  variant = "main" 
}: { 
  year: string; 
  category: "Photo" | "Service"; 
  variant?: "main" | "small";
}) => {
  const isMain = variant === "main";
  
  if (isMain) {
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-20 bg-[#4CAF50] rounded-t-lg flex flex-col items-center justify-center text-white shadow-md">
          {/* Houzz logo */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded flex items-center justify-center">
            <span className="text-[#4CAF50] font-bold text-[10px]">h</span>
          </div>
          <span className="text-2xl font-bold mt-3">{year}</span>
          <span className="text-[8px] uppercase tracking-wide">Best of Houzz</span>
          <span className="text-[7px]">{category}</span>
        </div>
        {/* Ribbon effect */}
        <div className="flex">
          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-[#388E3C]"></div>
          <div className="w-0 h-0 border-r-[8px] border-r-transparent border-t-[8px] border-t-[#388E3C]"></div>
        </div>
      </div>
    );
  }

  // Small variant for older years
  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-sm border border-gray-200 p-2 min-w-[65px]">
      <span className="text-[8px] text-gray-500 uppercase">Best of</span>
      <div className="flex items-center gap-0.5">
        <span className="text-[#4CAF50] font-bold text-[10px]">h</span>
        <span className="text-[10px] font-medium text-gray-700">houzz</span>
      </div>
      <span className="text-sm font-bold text-gray-800">{year}</span>
      <span className="text-[8px] text-white bg-[#4CAF50] px-2 py-0.5 rounded uppercase tracking-wide">
        {category}
      </span>
    </div>
  );
};

// Badge Houzz (icons)
const HouzzBadge = ({ 
  type, 
  value 
}: { 
  type: "pro" | "star" | "influence" | "recommended" | "saves";
  value?: string;
}) => {
  const baseClasses = "w-14 h-14 rounded-lg flex flex-col items-center justify-center shadow-sm";
  
  switch (type) {
    case "pro":
      return (
        <div className={`${baseClasses} bg-[#4CAF50] text-white`}>
          <span className="text-[7px] uppercase">J'utilise</span>
          <span className="font-bold text-[10px]">HOUZZ</span>
          <span className="text-[8px] bg-white text-[#4CAF50] px-1.5 rounded font-medium">PRO</span>
        </div>
      );
    case "star":
      return (
        <div className={`${baseClasses} bg-[#FFC107]`}>
          <Star className="w-6 h-6 text-white fill-white" />
          <span className="text-white font-bold text-sm">{value || "5"}</span>
        </div>
      );
    case "influence":
      return (
        <div className={`${baseClasses} bg-[#4CAF50] text-white`}>
          <div className="flex items-center gap-0.5 mb-1">
            <span className="font-bold text-[10px]">h</span>
            <span className="text-[9px]">houzz</span>
          </div>
          <Volume2 className="w-5 h-5" />
        </div>
      );
    case "recommended":
      return (
        <div className={`${baseClasses} bg-[#4CAF50] text-white`}>
          <div className="flex items-center gap-0.5 mb-1">
            <span className="font-bold text-[10px]">h</span>
            <span className="text-[9px]">houzz</span>
          </div>
          <ThumbsUp className="w-5 h-5" />
        </div>
      );
    case "saves":
      return (
        <div className={`${baseClasses} bg-[#4CAF50] text-white`}>
          <div className="flex items-center gap-0.5">
            <span className="font-bold text-[10px]">h</span>
            <span className="text-[9px]">houzz</span>
          </div>
          <span className="text-lg font-bold">{value || "25K"}</span>
          <span className="text-[7px] uppercase">Ajouts</span>
        </div>
      );
    default:
      return null;
  }
};

export function Recompenses() {
  const mainPrix = [
    { year: "2025", category: "Photo" as const },
    { year: "2024", category: "Photo" as const },
    { year: "2023", category: "Service" as const },
    { year: "2023", category: "Photo" as const },
    { year: "2022", category: "Service" as const },
    { year: "2022", category: "Photo" as const },
  ];

  const smallPrix = [
    { year: "2021", category: "Photo" as const },
    { year: "2020", category: "Photo" as const },
    { year: "2020", category: "Service" as const },
    { year: "2019", category: "Photo" as const },
    { year: "2019", category: "Service" as const },
  ];

  return (
    <section className="py-16 bg-stone border-t border-border">
      <div className="container-custom">
        <h2 className="font-display text-2xl md:text-3xl font-semibold mb-10 text-center">
          Récompenses
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Prix Houzz */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-6">
              11 Prix Houzz
            </h3>
            
            {/* Main badges (2022-2025) */}
            <div className="flex flex-wrap gap-3 mb-6">
              {mainPrix.map((prix, index) => (
                <HouzzPrixBadge 
                  key={`main-${index}`}
                  year={prix.year} 
                  category={prix.category}
                  variant="main"
                />
              ))}
            </div>

            {/* Small badges (2019-2021) */}
            <div className="flex flex-wrap gap-2">
              {smallPrix.map((prix, index) => (
                <HouzzPrixBadge 
                  key={`small-${index}`}
                  year={prix.year} 
                  category={prix.category}
                  variant="small"
                />
              ))}
            </div>
          </div>

          {/* Badges Houzz */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-6">
              6 Badges Houzz
            </h3>
            
            <div className="flex flex-wrap gap-3">
              <HouzzBadge type="pro" />
              <HouzzBadge type="star" value="5" />
              <HouzzBadge type="influence" />
              <HouzzBadge type="recommended" />
              <HouzzBadge type="saves" value="25K" />
            </div>

            {/* Link to Houzz profile */}
            <a 
              href="https://www.houzz.fr/pro/qualirenovation/qualirenovation-by-qualiconcept" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm text-wood hover:underline font-medium"
            >
              Voir notre profil Houzz →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
