// GA4 helpers + delegated click tracking for /devis links
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function trackEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", name, params);
  } catch {
    /* silent */
  }
}

export function trackDevisClick(params: Record<string, any> = {}) {
  trackEvent("devis_click", {
    event_category: "engagement",
    event_label: params.label || params.location || "devis",
    ...params,
  });
}

/**
 * Global delegated listener: any click on an <a> or descendant of <a>
 * pointing to /devis is auto-tracked. Avoids editing every CTA.
 */
export function initDevisClickTracking() {
  if (typeof window === "undefined") return;
  if ((window as any).__devisClickInit) return;
  (window as any).__devisClickInit = true;

  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (!href.startsWith("/devis") && !href.includes("/devis")) return;
      // Only internal /devis links (skip /devis/admin etc. handled by App routes anyway)
      if (!/^\/devis(\/|\?|#|$)/.test(href.replace(/^https?:\/\/[^/]+/, ""))) return;

      const label =
        anchor.getAttribute("aria-label") ||
        (anchor.textContent || "").trim().slice(0, 80) ||
        "devis";

      const type = /type=degat_eaux/.test(href) ? "degat_eaux" : "classique";

      trackDevisClick({
        label,
        link_url: href,
        link_type: type,
        page_path: window.location.pathname,
      });
    },
    { capture: true }
  );
}
