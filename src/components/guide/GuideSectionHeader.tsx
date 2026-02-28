import { cn } from "@/lib/utils";

interface GuideSectionHeaderProps {
  number?: number;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  variant?: "default" | "light";
  /** Balise HTML à utiliser : h2 (défaut) ou h3 pour les sous-sections */
  tag?: "h2" | "h3";
}

export function GuideSectionHeader({
  number,
  title,
  variant = "default",
  tag = "h2",
}: GuideSectionHeaderProps) {
  const isLight = variant === "light";
  const Tag = tag;

  return (
    <div className="mb-8">
      <Tag
        className={cn(
          "text-2xl md:text-3xl",
          isLight ? "font-semibold" : "font-light"
        )}
        style={isLight ? { color: '#F4F6F8' } : undefined}
      >
        {number !== undefined && (
          <span className={cn("mr-2 text-2xl md:text-3xl", isLight ? "font-light" : "font-light")} style={isLight ? { color: 'rgba(244,246,248,0.6)' } : undefined}>{String(number).padStart(2, '0')}.</span>
        )}
        {title}
      </Tag>
      {/* Gold underline */}
      <div className="w-10 h-[2px] mt-3" style={{ backgroundColor: '#c2a016' }} />
    </div>
  );
}
