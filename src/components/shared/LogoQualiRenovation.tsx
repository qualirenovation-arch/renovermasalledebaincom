interface LogoQualiRenovationProps {
  className?: string;
  width?: number;
  height?: number;
}

export function LogoQualiRenovation({ className = "", width = 200, height = 48 }: LogoQualiRenovationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 260 60"
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label="Logo QualiRénovation"
    >
      {/* Icon: house + checkmark */}
      <g fill="#124A66">
        <path d="M30 6 L5 28 H12 V52 H24 V38 H36 V52 H48 V28 H55 Z" />
        <path d="M22 24 L28 30 L40 18" stroke="#C9B575" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Text: QualiRénovation */}
      <text
        x="64"
        y="28"
        fontFamily="'Georgia', 'Times New Roman', serif"
        fontSize="16"
        fontWeight="700"
        fill="#124A66"
        letterSpacing="0.5"
      >
        Quali
        <tspan fill="#C9B575">Rénovation</tspan>
      </text>
      <text
        x="64"
        y="46"
        fontFamily="'Georgia', 'Times New Roman', serif"
        fontSize="10"
        fill="#124A66"
        letterSpacing="1.5"
        opacity="0.7"
      >
        RÉNOVATION GLOBALE
      </text>
    </svg>
  );
}
