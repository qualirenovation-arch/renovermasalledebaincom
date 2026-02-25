import { cn } from "@/lib/utils";

interface GuideSectionHeaderProps {
  number?: number;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  variant?: "default" | "light";
}

export function GuideSectionHeader({
  number,
  title,
  variant = "default",
}: GuideSectionHeaderProps) {
  const isLight = variant === "light";

  return (
    <div className="mb-8">
      <h2
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
      </h2>
      {/* Gold underline */}
      <div className="w-10 h-[2px] mt-3" style={{ backgroundColor: '#c2a016' }} />
    </div>
  );
}
