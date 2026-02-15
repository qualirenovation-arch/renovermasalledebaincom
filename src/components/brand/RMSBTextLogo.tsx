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
  const goldColor = "#C5A55A";
  const height = Math.round(width * 0.28);
  const centerX = width / 2;
  const textY = height * 0.42;
  const iconScale = fontSize1 / 28;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* "Ren" - left part */}
      <text
        x={centerX - fontSize1 * 3.9}
        y={textY}
        textAnchor="end"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize={fontSize1}
        fontWeight="700"
        fill={color}
      >
        Ren
      </text>

      {/* Showerhead icon replacing "o" */}
      <g transform={`translate(${centerX - fontSize1 * 3.9 + fontSize1 * 0.05}, ${textY - fontSize1 * 0.95}) scale(${iconScale})`}>
        {/* Shower arm */}
        <path
          d="M 6 3 Q 14 2, 15 10 L 15 14"
          stroke={goldColor}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Shower head */}
        <ellipse cx="15" cy="15.5" rx="6" ry="3.2" fill={goldColor} />
        {/* Water drops */}
        <circle cx="11" cy="22" r="1.5" fill={color} opacity="0.5" />
        <circle cx="15" cy="24" r="1.7" fill={color} opacity="0.4" />
        <circle cx="19" cy="22" r="1.4" fill={color} opacity="0.45" />
        <circle cx="13" cy="27" r="1.2" fill={color} opacity="0.3" />
        <circle cx="17" cy="28" r="1.4" fill={color} opacity="0.25" />
      </g>

      {/* "verMaSalleDeBain.com" - right part */}
      <text
        x={centerX - fontSize1 * 3.9 + fontSize1 * 0.95}
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
