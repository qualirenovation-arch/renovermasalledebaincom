import React from "react";

interface RMSBTextLogoProps {
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: { width: 380, fontSize1: 22, fontSize2: 11 },
  md: { width: 520, fontSize1: 30, fontSize2: 14 },
  lg: { width: 660, fontSize1: 38, fontSize2: 18 },
  xl: { width: 800, fontSize1: 46, fontSize2: 22 },
};

const RMSBTextLogo: React.FC<RMSBTextLogoProps> = ({
  className = "",
  variant = "dark",
  size = "md",
}) => {
  const { width, fontSize1, fontSize2 } = sizeMap[size];
  const color = variant === "dark" ? "#124A66" : "#FFFFFF";
  const height = Math.round(width * 0.22);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x={width / 2}
        y={height * 0.48}
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize={fontSize1}
        fontWeight="700"
        fill={color}
      >
        RenoverMaSalleDeBain.com
      </text>
      <text
        x={width / 2}
        y={height * 0.88}
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize={fontSize2}
        fontWeight="400"
        fill={color}
        letterSpacing="1.5"
      >
        Une expertise QUALIRÉNOVATION
      </text>
    </svg>
  );
};

export default RMSBTextLogo;
