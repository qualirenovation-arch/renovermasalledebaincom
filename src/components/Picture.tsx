import { resolvePicture } from "@/lib/picture";
import { ImgHTMLAttributes } from "react";

interface PictureProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "srcSet"> {
  src: string;
  alt: string;
  /** Tailles CSS (ex: "(max-width: 768px) 50vw, 25vw") */
  sizes?: string;
  /** True pour le LCP (skip lazy-loading + fetchpriority=high) */
  priority?: boolean;
}

/**
 * <picture> responsive avec AVIF/WebP/fallback JPG automatiques.
 * Cherche les variantes générées par scripts/optimize-images.mjs.
 * Si absentes → comportement <img> classique.
 */
export function Picture({ src, alt, sizes = "100vw", priority, className, ...rest }: PictureProps) {
  const sources = resolvePicture(src);
  return (
    <picture>
      {sources.avif && <source type="image/avif" srcSet={sources.avif} sizes={sizes} />}
      {sources.webp && <source type="image/webp" srcSet={sources.webp} sizes={sizes} />}
      <img
        src={sources.fallback}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={className}
        {...rest}
      />
    </picture>
  );
}