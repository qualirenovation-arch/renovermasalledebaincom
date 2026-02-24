import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuideSectionHeaderProps {
  number?: number;
  icon: LucideIcon;
  title: string;
  variant?: "default" | "light";
}

export function GuideSectionHeader({
  number,
  icon: Icon,
  title,
  variant = "default",
}: GuideSectionHeaderProps) {
  const isLight = variant === "light";

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-shrink-0">
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-sm",
            isLight
              ? "bg-primary-foreground/20 border-primary-foreground/30"
              : "bg-white border-primary/20"
          )}
        >
          <Icon
            className={cn(
              "w-6 h-6",
              isLight ? "text-primary-foreground" : "text-primary"
            )}
          />
        </div>
        {number !== undefined && (
          <span
            className={cn(
              "absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
              isLight
                ? "bg-primary-foreground text-primary"
                : "bg-primary text-primary-foreground"
            )}
          >
            {number}
          </span>
        )}
      </div>
      <h2
        className={cn(
          "text-2xl md:text-3xl font-serif",
          isLight ? "text-primary-foreground" : "text-foreground"
        )}
      >
        {title}
      </h2>
    </div>
  );
}
