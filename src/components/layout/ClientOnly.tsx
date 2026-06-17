import { ReactNode, useEffect, useState } from "react";

/**
 * Rend ses enfants uniquement côté client (après hydratation).
 * Permet d'exclure du SSR/SSG les composants purement UI (sans valeur SEO)
 * pour alléger le HTML pré-rendu.
 */
export function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}