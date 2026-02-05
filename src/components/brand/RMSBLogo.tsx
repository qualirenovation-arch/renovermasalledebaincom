import React from "react";

interface RMSBLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "dark" | "light";
}

const sizeMap = {
  sm: { width: 100, height: 50 },
  md: { width: 200, height: 100 },
  lg: { width: 300, height: 150 },
  xl: { width: 400, height: 200 },
};

const RMSBLogo: React.FC<RMSBLogoProps> = ({ 
  className = "", 
  showTagline = true,
  size = "md",
  variant = "dark"
}) => {
  const { width, height } = sizeMap[size];
  const logoColor = variant === "dark" ? "#124A66" : "#FFFFFF";

  return (
    <svg
      viewBox="0 0 200 100"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* RMSB Letters - lettres rapprochées */}
      <text
        x="100"
        y={showTagline ? "45" : "55"}
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="44"
        fontWeight="700"
        fill={logoColor}
        letterSpacing="-1"
      >
        RMSB
      </text>
      
      {/* Tagline */}
      {showTagline && (
        <text
          x="100"
          y="72"
          textAnchor="middle"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="14"
          fontWeight="400"
          fontStyle="italic"
          fill={logoColor}
        >
          Un chantier heureux
        </text>
      )}
    </svg>
  );
};

export default RMSBLogo;
