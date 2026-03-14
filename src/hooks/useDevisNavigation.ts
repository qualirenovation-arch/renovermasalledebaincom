import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";

const DEVIS_FORM_ID = "devis-form";
const SCROLL_OFFSET = 100; // Offset for sticky header

const getFormOffsetTop = (formElement: HTMLElement) => {
  const elementPosition = formElement.getBoundingClientRect().top + window.scrollY;
  return elementPosition - SCROLL_OFFSET;
};

/**
 * Hook to handle navigation to the devis form with proper scroll behavior
 */
export function useDevisNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToForm = useCallback(() => {
    const formElement = document.getElementById(DEVIS_FORM_ID);
    if (!formElement) return;

    window.scrollTo({
      top: getFormOffsetTop(formElement),
      behavior: "smooth",
    });
  }, []);

  const navigateToDevis = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
      }

      if (location.pathname === "/devis") {
        // Already on devis page, just scroll
        scrollToForm();
        return;
      }

      // Navigate to devis page with hash
      navigate("/devis#devis-form");
    },
    [location.pathname, navigate, scrollToForm]
  );

  return { navigateToDevis, scrollToForm };
}

/**
 * Hook to handle scroll on page load when hash is present
 */
export function useDevisScrollOnMount() {
  const hasHandledHash = useRef(false);

  useEffect(() => {
    if (hasHandledHash.current || window.location.hash !== "#devis-form") return;

    hasHandledHash.current = true;

    // Small delay to ensure DOM is ready, then immediate scroll to avoid blocking UX
    const timer = setTimeout(() => {
      const formElement = document.getElementById(DEVIS_FORM_ID);
      if (!formElement) return;

      window.scrollTo({
        top: getFormOffsetTop(formElement),
        behavior: "auto",
      });

      // Remove hash so browser doesn't keep re-applying anchor behavior
      const { pathname, search } = window.location;
      window.history.replaceState(null, "", `${pathname}${search}`);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
}
