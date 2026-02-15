import React from "react";

interface RMSBTextLogoProps {
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: { width: 460, fontSize1: 24, fontSize2: 13 },
  md: { width: 620, fontSize1: 32, fontSize2: 14 },
  lg: { width: 900, fontSize1: 50, fontSize2: 20 },
  xl: { width: 960, fontSize1: 52, fontSize2: 22 },
};

const RMSBTextLogo: React.FC<RMSBTextLogoProps> = ({
  className = "",
  variant = "dark",
  size = "md",
}) => {
  const { width, fontSize1, fontSize2 } = sizeMap[size];
  const color = variant === "dark" ? "#124A66" : "#FFFFFF";
  const goldColor = "#C5A55A";
  const goldLight = "#D4B96A";
  const height = Math.round(width * 0.22);
  const centerX = width / 2;
  const textY = height * 0.45;
  const s = fontSize1 / 32;

  const renEndX = centerX - fontSize1 * 3.95;
  const iconWidth = fontSize1 * 0.88;
  const verStartX = renEndX + iconWidth;

  // Baseline position - tighter to main text
  const baselineY = textY + fontSize1 * 0.65;
  // Decorative line
  const lineY = textY + fontSize1 * 0.28;
  const lineHalfWidth = fontSize1 * 3;

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

      {/* Showerhead icon replacing "o" */}
      <g transform={`translate(${renEndX + iconWidth * 0.08}, ${textY - fontSize1 * 1.08}) scale(${s})`}>
        <circle cx="3" cy="6" r="2.5" fill={goldColor} />
        <path
          d="M 5 6 C 8 4, 14 2, 18 2 C 22 2, 24 4, 24 8 L 24 11"
          stroke={goldColor}
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse cx="22" cy="14" rx="7" ry="3.5" fill={goldColor} transform="rotate(-8, 22, 14)" />
        <ellipse cx="22" cy="13.5" rx="5.5" ry="2.5" fill={goldLight} opacity="0.5" transform="rotate(-8, 22, 13.5)" />
        <line x1="17" y1="17" x2="16" y2="22" stroke={color} strokeWidth="0.8" opacity="0.3" />
        <line x1="20" y1="17.5" x2="19" y2="23" stroke={color} strokeWidth="0.8" opacity="0.25" />
        <line x1="23" y1="17.5" x2="22.5" y2="23" stroke={color} strokeWidth="0.8" opacity="0.3" />
        <line x1="26" y1="17" x2="26" y2="22" stroke={color} strokeWidth="0.8" opacity="0.25" />
        <circle cx="15.5" cy="24" r="1.6" fill={color} opacity="0.45" />
        <circle cx="19" cy="25.5" r="1.8" fill={color} opacity="0.4" />
        <circle cx="22.5" cy="25" r="1.7" fill={color} opacity="0.42" />
        <circle cx="26" cy="24" r="1.5" fill={color} opacity="0.38" />
        <circle cx="17" cy="28.5" r="1.3" fill={color} opacity="0.3" />
        <circle cx="21" cy="29.5" r="1.5" fill={color} opacity="0.25" />
        <circle cx="24.5" cy="28" r="1.2" fill={color} opacity="0.28" />
        <circle cx="19" cy="32" r="1.1" fill={color} opacity="0.18" />
        <circle cx="23" cy="32.5" r="1" fill={color} opacity="0.15" />
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

      {/* Thin gold decorative line */}
      <line
        x1={centerX - lineHalfWidth}
        y1={lineY}
        x2={centerX + lineHalfWidth}
        y2={lineY}
        stroke={goldColor}
        strokeWidth="0.8"
        opacity="0.5"
      />

      {/* Subtitle - closer, uppercase with wider tracking */}
      <text
        x={centerX}
        y={baselineY}
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize={fontSize2}
        fontWeight="400"
        fill={color}
        letterSpacing={fontSize2 * 0.18}
        opacity="0.75"
      >
        Une expertise QUALIRÉNOVATION
      </text>
    </svg>
  );
};

export default RMSBTextLogo;
