import { useMemo } from "react";
import { Check, User, Droplets, Bath, Columns3, Wrench, WashingMachine, Palette, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormProgressBarProps {
  formData: {
    prenom: string;
    nom: string;
    email: string;
    codePostal: string;
    typeInstallation: string;
    wcType: string[];
    meubleVasque: string[];
    porteDouche: string[];
    typeDouche: string;
    machineLaver: string;
    styleCarrelage: string[];
    message: string;
  };
}

interface Step {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  isComplete: (data: FormProgressBarProps['formData']) => boolean;
}

const steps: Step[] = [
  {
    id: "personal",
    label: "Informations personnelles",
    shortLabel: "Infos",
    icon: User,
    isComplete: (data) => !!(data.prenom && data.nom && data.email && data.codePostal)
  },
  {
    id: "installation",
    label: "Type d'installation",
    shortLabel: "Type",
    icon: Droplets,
    isComplete: (data) => !!data.typeInstallation
  },
  {
    id: "wc",
    label: "WC",
    shortLabel: "WC",
    icon: Bath,
    isComplete: (data) => data.wcType.length > 0
  },
  {
    id: "meuble",
    label: "Meuble vasque",
    shortLabel: "Vasque",
    icon: Columns3,
    isComplete: (data) => data.meubleVasque.length > 0
  },
  {
    id: "paroi",
    label: "Paroi de douche",
    shortLabel: "Paroi",
    icon: Columns3,
    isComplete: (data) => data.porteDouche.length > 0
  },
  {
    id: "robinetterie",
    label: "Robinetterie",
    shortLabel: "Robinet",
    icon: Wrench,
    isComplete: (data) => !!data.typeDouche
  },
  {
    id: "machine",
    label: "Machine à laver",
    shortLabel: "Machine",
    icon: WashingMachine,
    isComplete: (data) => !!data.machineLaver
  },
  {
    id: "finitions",
    label: "Finitions",
    shortLabel: "Finitions",
    icon: Palette,
    isComplete: (data) => data.styleCarrelage.length > 0
  },
  {
    id: "message",
    label: "Message",
    shortLabel: "Message",
    icon: FileText,
    isComplete: () => true // Optionnel, toujours considéré OK
  }
];

export function FormProgressBar({ formData }: FormProgressBarProps) {
  const { progressPercent } = useMemo(() => {
    // -1 car le dernier step (message) est toujours "complet"
    const actualSteps = steps.length - 1;
    const actualCompleted = steps.slice(0, -1).filter(step => step.isComplete(formData)).length;
    return {
      progressPercent: Math.round((actualCompleted / actualSteps) * 100)
    };
  }, [formData]);

  return (
    <div className="mb-6 md:mb-8">
      <div className="card-elevated p-4 md:p-6">
        {/* Progress bar with percentage */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              Avancement de votre demande
            </span>
            <span className="text-sm font-bold text-primary">
              {progressPercent}%
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary via-primary to-accent transition-all duration-500 ease-out rounded-full relative"
              style={{ width: `${progressPercent}%` }}
            >
              {progressPercent > 10 && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* Steps indicators - Desktop */}
        <div className="hidden lg:grid grid-cols-8 gap-2">
          {steps.slice(0, -1).map((step, index) => {
            const isComplete = step.isComplete(formData);
            const Icon = step.icon;
            
            return (
              <div 
                key={step.id}
                className={cn(
                  "flex flex-col items-center gap-2 p-2 rounded-xl transition-all",
                  isComplete 
                    ? "bg-primary/5" 
                    : "bg-muted/30"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                  isComplete 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {isComplete ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <span className={cn(
                  "text-[10px] font-medium text-center leading-tight",
                  isComplete ? "text-primary" : "text-muted-foreground"
                )}>
                  {step.shortLabel}
                </span>
              </div>
            );
          })}
        </div>

        {/* Steps indicators - Tablet */}
        <div className="hidden md:flex lg:hidden items-center justify-center gap-2">
          {steps.slice(0, -1).map((step, index) => {
            const isComplete = step.isComplete(formData);
            
            return (
              <div key={step.id} className="flex items-center">
                <div 
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center transition-all text-xs font-bold",
                    isComplete 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  )}
                  title={step.label}
                >
                  {isComplete ? <Check className="w-3 h-3" /> : index + 1}
                </div>
                {index < steps.length - 2 && (
                  <div className={cn(
                    "w-4 h-0.5 mx-0.5",
                    isComplete ? "bg-primary/40" : "bg-muted"
                  )} />
                )}
              </div>
            );
          })}
        </div>

        {/* Steps indicators - Mobile (dots) */}
        <div className="flex md:hidden items-center justify-center gap-2">
          {steps.slice(0, -1).map((step) => {
            const isComplete = step.isComplete(formData);
            
            return (
              <div 
                key={step.id}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  isComplete 
                    ? "bg-primary scale-110" 
                    : "bg-muted"
                )}
                title={step.label}
              />
            );
          })}
        </div>
        
        {/* Help text */}
        <p className="text-xs text-muted-foreground text-center mt-3">
          Complétez les sections pour personnaliser votre devis
        </p>
      </div>
    </div>
  );
}
