import React from "react";

interface RMSBTextLogoProps {
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: { width: 420, fontSize1: 24, fontSize2: 12 },
  md: { width: 560, fontSize1: 32, fontSize2: 15 },
  lg: { width: 720, fontSize1: 42, fontSize2: 20 },
  xl: { width: 880, fontSize1: 52, fontSize2: 24 },
};

const RMSBTextLogo: React.FC<RMSBTextLogoProps> = ({
  className = "",
  variant = "dark",
  size = "md",
}) => {
  const { width, fontSize1, fontSize2 } = sizeMap[size];
  const color = variant === "dark" ? "#124A66" : "#FFFFFF";
  const goldColor = "#C5A55A";
  const height = Math.round(width * 0.28);
  const centerX = width / 2;
  const textY = height * 0.42;
  const s = fontSize1 / 32; // scale factor

  // Position where "o" sits: "Ren" ends, then the icon, then "ver..."
  const renEndX = centerX - fontSize1 * 3.95;
  const iconWidth = fontSize1 * 0.85;
  const verStartX = renEndX + iconWidth;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* "Ren" */}
      <text
        x={renEndX}
        y={textY}
        textAnchor="end"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize={fontSize1}
        fontWeight="700"
        fill={color}
      >
        Ren
      </text>

      {/* Showerhead replacing "o" — matching reference image */}
      <g transform={`translate(${renEndX + iconWidth * 0.1}, ${textY - fontSize1 * 1.05}) scale(${s})`}>
        {/* Shower arm - curved pipe from top-left going right then down */}
        <path
          d="M 4 5 C 4 5, 6 2, 14 2 C 20 2, 22 5, 22 10"
          stroke={goldColor}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        {/* Shower head - wider rounded shape */}
        <path
          d="M 16 10 Q 22 10, 26 13 Q 22 15, 16 15 Q 12 15, 10 13 Q 14 10, 16 10 Z"
          fill={goldColor}
        />
        {/* Water drops - scattered below head like in reference */}
        <circle cx="13" cy="20" r="1.8" fill={color} opacity="0.55" />
        <circle cx="18" cy="22" r="2" fill={color} opacity="0.45" />
        <circle cx="23" cy="20" r="1.6" fill={color} opacity="0.5" />
        <circle cx="15" cy="26" r="1.5" fill={color} opacity="0.35" />
        <circle cx="20" cy="27" r="1.7" fill={color} opacity="0.3" />
        <circle cx="11" cy="25" r="1.3" fill={color} opacity="0.3" />
        <circle cx="24" cy="25" r="1.4" fill={color} opacity="0.25" />
        <circle cx="17" cy="31" r="1.3" fill={color} opacity="0.2" />
      </g>

      {/* "verMaSalleDeBain.com" */}
      <text
        x={verStartX}
        y={textY}
        textAnchor="start"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize={fontSize1}
        fontWeight="700"
        fill={color}
      >
        verMaSalleDeBain.com
      </text>

      {/* Subtitle */}
      <text
        x={centerX}
        y={height * 0.82}
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
