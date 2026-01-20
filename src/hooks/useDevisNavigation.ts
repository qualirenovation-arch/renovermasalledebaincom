import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useEffect } from "react";

const DEVIS_FORM_ID = "devis-form";
const SCROLL_OFFSET = 100; // Offset for sticky header

/**
 * Hook to handle navigation to the devis form with proper scroll behavior
 */
export function useDevisNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToForm = useCallback(() => {
    const formElement = document.getElementById(DEVIS_FORM_ID);
    if (formElement) {
      const elementPosition = formElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - SCROLL_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Focus on first input after scroll animation
      setTimeout(() => {
        const firstInput = formElement.querySelector('input, select, textarea') as HTMLElement;
        if (firstInput) {
          firstInput.focus();
        }
      }, 500);
    }
  }, []);

  const navigateToDevis = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (location.pathname === "/devis") {
      // Already on devis page, just scroll
      scrollToForm();
    } else {
      // Navigate to devis page with hash
      navigate("/devis#devis-form");
    }
  }, [location.pathname, navigate, scrollToForm]);

  return { navigateToDevis, scrollToForm };
}

/**
 * Hook to handle scroll on page load when hash is present
 */
export function useDevisScrollOnMount() {
  useEffect(() => {
    if (window.location.hash === "#devis-form") {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const formElement = document.getElementById(DEVIS_FORM_ID);
        if (formElement) {
          const elementPosition = formElement.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - SCROLL_OFFSET;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });

          // Focus on first input
          setTimeout(() => {
            const firstInput = formElement.querySelector('input, select, textarea') as HTMLElement;
            if (firstInput) {
              firstInput.focus();
            }
          }, 500);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);
}
