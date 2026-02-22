import { memo, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

// Types et constantes pour les finitions de carrelage
export type FinitionType = 
  | "zellige"
  | "marbre"
  | "terrazzo"
  | "beton"
  | "effet-pierre"
  | "gres-cerame-uni"
  | "gres-cerame-motif"
  | "hexagonal"
  | "metro-allonge"
  | "mosaique"
  | "carreaux-de-ciment";

export const FINITION_TYPES: readonly { id: FinitionType; label: string; seoLabel: string }[] = [
  { id: "zellige", label: "Zellige", seoLabel: "zellige" },
  { id: "marbre", label: "Marbre & effet marbre", seoLabel: "marbre" },
  { id: "terrazzo", label: "Terrazzo", seoLabel: "terrazzo" },
  { id: "beton", label: "Béton", seoLabel: "béton" },
  { id: "effet-pierre", label: "Effet pierre", seoLabel: "effet pierre" },
  { id: "gres-cerame-uni", label: "Grès cérame uni", seoLabel: "grès cérame uni" },
  { id: "gres-cerame-motif", label: "Grès cérame motif", seoLabel: "grès cérame à motif" },
  { id: "hexagonal", label: "Hexagonal", seoLabel: "carrelage hexagonal" },
  { id: "metro-allonge", label: "Métro & formats allongés", seoLabel: "carrelage métro et formats allongés" },
  { id: "mosaique", label: "Mosaïque", seoLabel: "mosaïque" },
  { id: "carreaux-de-ciment", label: "Carreaux de ciment", seoLabel: "carreaux de ciment" },
] as const;

interface FinitionsFilterProps {
  selectedFinitions: FinitionType[];
  onFinitionsChange: (finitions: FinitionType[]) => void;
  finitionCounts: Record<FinitionType, number>;
}

// Composant individuel de filtre mémorisé
interface FilterChipProps {
  finition: typeof FINITION_TYPES[number];
  isSelected: boolean;
  count: number;
  onToggle: (id: FinitionType) => void;
}

const FilterChip = memo(function FilterChip({ finition, isSelected, count, onToggle }: FilterChipProps) {
  const handleChange = useCallback(() => {
    onToggle(finition.id);
  }, [finition.id, onToggle]);

  return (
    <label
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer
        whitespace-nowrap text-sm font-medium transition-all duration-200
        border select-none shrink-0
        ${isSelected 
          ? "bg-wood text-white border-wood shadow-md" 
          : "bg-secondary/50 text-foreground border-transparent hover:bg-secondary hover:border-border"
        }
      `}
      data-finition={finition.id}
    >
      <Checkbox 
        checked={isSelected}
        onCheckedChange={handleChange}
        className={`
          h-4 w-4 border-2 
          ${isSelected 
            ? "border-white data-[state=checked]:bg-white data-[state=checked]:text-wood" 
            : "border-muted-foreground"
          }
        `}
      />
      <span>{finition.label}</span>
      {count > 0 && (
        <span className={`
          text-xs px-1.5 py-0.5 rounded-full
          ${isSelected ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}
        `}>
          {count}
        </span>
      )}
    </label>
  );
});

export const FinitionsFilter = memo(function FinitionsFilter({ 
  selectedFinitions, 
  onFinitionsChange,
  finitionCounts 
}: FinitionsFilterProps) {
  
  // Set pour vérification O(1) au lieu de O(n) avec includes
  const selectedSet = useMemo(() => new Set(selectedFinitions), [selectedFinitions]);
  
  const handleToggle = useCallback((finitionId: FinitionType) => {
    if (selectedSet.has(finitionId)) {
      onFinitionsChange(selectedFinitions.filter(f => f !== finitionId));
    } else {
      onFinitionsChange([...selectedFinitions, finitionId]);
    }
  }, [selectedSet, selectedFinitions, onFinitionsChange]);

  const handleReset = useCallback(() => {
    onFinitionsChange([]);
  }, [onFinitionsChange]);

  const hasActiveFilters = selectedFinitions.length > 0;

  return (
    <div className="w-full">
      {/* Menu sticky de filtres */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-20 z-30 bg-background/95 backdrop-blur-sm border-b border-border py-4"
      >
        <div className="container-custom">
          {/* Titre discret */}
          <p className="text-sm text-muted-foreground mb-3 font-medium">
            Filtrer par finition
          </p>
          
          {/* Ligne de filtres avec scroll horizontal mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {FINITION_TYPES.map((finition) => (
              <FilterChip
                key={finition.id}
                finition={finition}
                isSelected={selectedSet.has(finition.id)}
                count={finitionCounts[finition.id] || 0}
                onToggle={handleToggle}
              />
            ))}
            
            {/* Bouton Réinitialiser */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="shrink-0 text-muted-foreground hover:text-foreground ml-2"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Réinitialiser
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Texte SEO sous le menu */}
      <div className="container-custom py-6">
        <p className="text-muted-foreground text-sm leading-relaxed max-w-4xl">
          Nos réalisations de salles de bain à Paris et en Île-de-France se déclinent dans une grande variété de finitions : 
          <span className="font-medium text-foreground"> zellige</span>, 
          <span className="font-medium text-foreground"> marbre</span>, 
          <span className="font-medium text-foreground"> terrazzo</span>, 
          <span className="font-medium text-foreground"> béton</span>, 
          <span className="font-medium text-foreground"> effet pierre</span>, 
          <span className="font-medium text-foreground"> grès cérame uni</span>, 
          <span className="font-medium text-foreground"> carrelage métro et formats allongés</span>, ainsi que 
          <span className="font-medium text-foreground"> mosaïque</span>.
          Chaque projet est conçu sur mesure, en fonction des contraintes du lieu et des envies de nos clients, 
          avec une mise en œuvre maîtrisée de la conception à la réalisation.
        </p>
      </div>
    </div>
  );
});

// Composant pour afficher quand aucun résultat ne correspond
export function NoResultsMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-16 px-6 text-center max-w-2xl mx-auto"
    >
      <div className="bg-accent/30 rounded-2xl p-8 md:p-12 border border-border">
        <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4 text-foreground">
          Cette combinaison n'existe pas encore dans nos réalisations.
        </h3>
        <p className="text-lg text-muted-foreground mb-2">
          Bonne nouvelle : vous serez peut-être notre <strong className="text-foreground">premier chantier</strong> avec cette association de matériaux.
        </p>
        <p className="text-muted-foreground mb-8">
          Chez QualiRénovation, chaque projet est conçu sur mesure.
        </p>
        <Button variant="cta" size="lg" asChild>
          <a href="/devis#devis-form">
            Je crée ma nouvelle salle de bain
          </a>
        </Button>
      </div>
    </motion.div>
  );
}

// Badge visible sur les cartes d'album pour le SEO
interface FinitionsBadgeProps {
  finitionSol?: FinitionType;
  finitionMur?: FinitionType;
}

export function FinitionsBadge({ finitionSol, finitionMur }: FinitionsBadgeProps) {
  if (!finitionSol && !finitionMur) return null;
  
  const getLabel = (id: FinitionType) => {
    return FINITION_TYPES.find(f => f.id === id)?.label || id;
  };

  return (
    <p 
      className="text-xs text-muted-foreground mt-2 text-center"
      data-finition-sol={finitionSol}
      data-finition-mur={finitionMur}
    >
      <span className="font-medium">Finitions :</span>{" "}
      {finitionSol && <span>{getLabel(finitionSol)} (sol)</span>}
      {finitionSol && finitionMur && ", "}
      {finitionMur && <span>{getLabel(finitionMur)} (mur)</span>}
    </p>
  );
}
