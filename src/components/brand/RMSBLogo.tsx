import React from "react";

interface RMSBLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: { width: 120, height: 60 },
  md: { width: 200, height: 100 },
  lg: { width: 300, height: 150 },
  xl: { width: 400, height: 200 },
};

const RMSBLogo: React.FC<RMSBLogoProps> = ({ 
  className = "", 
  showTagline = true,
  size = "md" 
}) => {
  const { width, height } = sizeMap[size];
  const logoColor = "#124A66";

  return (
    <svg
      viewBox="0 0 200 100"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* RMSB Letters */}
      <text
        x="100"
        y={showTagline ? "45" : "55"}
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="42"
        fontWeight="700"
        fill={logoColor}
        letterSpacing="2"
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
