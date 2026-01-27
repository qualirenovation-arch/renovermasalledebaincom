import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRedirectSlug } from "@/data/redirects";

interface RedirectHandlerProps {
  children: React.ReactNode;
}

export const RedirectHandler = ({ children }: RedirectHandlerProps) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      const newSlug = getRedirectSlug(slug);
      if (newSlug) {
        // Effectuer une redirection 301 (remplacée dans l'historique)
        navigate(`/realisations/${newSlug}`, { replace: true });
      }
    }
  }, [slug, navigate]);

  // Si une redirection est nécessaire, on ne rend rien
  if (slug && getRedirectSlug(slug)) {
    return null;
  }

  return <>{children}</>;
};
