import qualirenovationLogo from "@/assets/logos/qualirenovation-logo-hor-pos.svg";

interface LogoQualiRenovationProps {
  className?: string;
  width?: number;
  height?: number;
}

export function LogoQualiRenovation({ className = "", width = 200, height = 48 }: LogoQualiRenovationProps) {
  return (
    <img
      src={qualirenovationLogo}
      alt="Logo QualiRénovation"
      width={width}
      height={height}
      className={className}
    />
  );
}
