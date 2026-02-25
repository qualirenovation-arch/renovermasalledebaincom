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
          "text-2xl md:text-3xl font-light",
          isLight ? "text-white" : ""
        )}
        style={!isLight ? { color: '#124A66' } : undefined}
      >
        {number !== undefined && (
          <span className="text-muted-foreground font-light mr-2 text-lg">{String(number).padStart(2, '0')}.</span>
        )}
        {title}
      </h2>
      {/* Gold underline */}
      <div className="w-10 h-[2px] mt-3" style={{ backgroundColor: '#c2a016' }} />
    </div>
  );
}
