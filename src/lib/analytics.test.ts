import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { trackEvent, trackDevisClick, initDevisClickTracking } from "./analytics";

describe("analytics", () => {
  let gtagMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    gtagMock = vi.fn();
    (window as any).gtag = gtagMock;
    (window as any).__devisClickInit = false;
    window.location.pathname = "/test-page";
  });

  afterEach(() => {
    delete (window as any).gtag;
    delete (window as any).__devisClickInit;
    vi.restoreAllMocks();
  });

  describe("trackEvent", () => {
    it("calls gtag with event name and params", () => {
      trackEvent("test_event", { foo: "bar" });
      expect(gtagMock).toHaveBeenCalledWith("event", "test_event", { foo: "bar" });
    });

    it("does nothing when gtag is missing", () => {
      delete (window as any).gtag;
      expect(() => trackEvent("test_event")).not.toThrow();
    });
  });

  describe("trackDevisClick", () => {
    it("sends devis_click with link_url containing #devis-form", () => {
      trackDevisClick({
        label: "Mon étude",
        link_url: "/devis#devis-form",
        link_type: "classique",
      });

      expect(gtagMock).toHaveBeenCalledWith("event", "devis_click", {
        event_category: "engagement",
        event_label: "Mon étude",
        link_url: "/devis#devis-form",
        link_type: "classique",
      });
    });

    it("sends devis_click with query params and anchor", () => {
      trackDevisClick({
        label: "Urgence",
        link_url: "/devis?type=degat_eaux#devis-form",
        link_type: "degat_eaux",
      });

      expect(gtagMock).toHaveBeenCalledWith("event", "devis_click", {
        event_category: "engagement",
        event_label: "Urgence",
        link_url: "/devis?type=degat_eaux#devis-form",
        link_type: "degat_eaux",
      });
    });
  });

  describe("initDevisClickTracking", () => {
    it("extracts link_url with #devis-form from clicked /devis anchor", () => {
      initDevisClickTracking();

      const anchor = document.createElement("a");
      anchor.href = "/devis#devis-form";
      anchor.textContent = "Demander un devis";
      document.body.appendChild(anchor);

      anchor.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      expect(gtagMock).toHaveBeenCalledTimes(1);
      const [, eventName, params] = gtagMock.mock.calls[0];
      expect(eventName).toBe("devis_click");
      expect(params.link_url).toMatch(/#devis-form$/);

      document.body.removeChild(anchor);
    });

    it("extracts link_url with query and anchor from /devis?type=degat_eaux#devis-form", () => {
      initDevisClickTracking();

      const anchor = document.createElement("a");
      anchor.href = "/devis?type=degat_eaux#devis-form";
      anchor.textContent = "Urgence";
      document.body.appendChild(anchor);

      anchor.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      expect(gtagMock).toHaveBeenCalledTimes(1);
      const [, , params] = gtagMock.mock.calls[0];
      expect(params.link_url).toBe("/devis?type=degat_eaux#devis-form");
      expect(params.link_type).toBe("degat_eaux");

      document.body.removeChild(anchor);
    });

    it("does not track non-/devis links", () => {
      initDevisClickTracking();

      const anchor = document.createElement("a");
      anchor.href = "/a-propos";
      document.body.appendChild(anchor);

      anchor.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      expect(gtagMock).not.toHaveBeenCalled();
      document.body.removeChild(anchor);
    });
  });
});
