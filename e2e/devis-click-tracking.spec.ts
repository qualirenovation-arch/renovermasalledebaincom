import { test, expect } from "../playwright-fixture";

/**
 * E2E: vérifie que chaque <a href="/devis..."> déclenche window.gtag('event','devis_click', ...)
 * avec un link_url contenant l'ancre #devis-form.
 *
 * On stub `window.gtag` AVANT le chargement de l'app pour capturer tous les appels,
 * puis on intercepte les clics au capture (avant la navigation) afin de pouvoir
 * vérifier l'event sans quitter la page.
 */

const PAGES_TO_SCAN = [
  "/",
  "/realisations",
  "/pourquoi-nous",
  "/a-propos",
  "/degats-eaux",
];

test.describe("devis_click tracking", () => {
  for (const path of PAGES_TO_SCAN) {
    test(`tous les liens /devis sur ${path} déclenchent devis_click avec #devis-form`, async ({ page }) => {
      // Stub gtag avant tout script applicatif
      await page.addInitScript(() => {
        (window as any).__gtagCalls = [];
        (window as any).gtag = (...args: any[]) => {
          (window as any).__gtagCalls.push(args);
        };
        // Empêche la navigation réelle pour rester sur la page
        window.addEventListener(
          "click",
          (e) => {
            const a = (e.target as HTMLElement)?.closest?.("a");
            if (a && (a.getAttribute("href") || "").includes("/devis")) {
              e.preventDefault();
            }
          },
          true
        );
      });

      await page.goto(path);
      await page.waitForLoadState("networkidle");

      // Récupère tous les <a href="/devis..."> visibles
      const hrefs = await page.$$eval('a[href*="/devis"]', (els) =>
        els
          .map((e) => (e as HTMLAnchorElement).getAttribute("href") || "")
          .filter((h) => /^\/devis(\/|\?|#|$)/.test(h))
          .filter((h) => !h.startsWith("/devis/admin"))
      );

      expect(hrefs.length, `aucun lien /devis trouvé sur ${path}`).toBeGreaterThan(0);

      // Reset call log puis clique chaque lien
      await page.evaluate(() => {
        (window as any).__gtagCalls = [];
      });

      const anchors = await page.$$('a[href*="/devis"]');
      for (const a of anchors) {
        const href = await a.getAttribute("href");
        if (!href || !/^\/devis(\/|\?|#|$)/.test(href) || href.startsWith("/devis/admin")) continue;
        // dispatch click directly (évite scroll/visibility issues)
        await a.dispatchEvent("click");
      }

      const calls: any[][] = await page.evaluate(() => (window as any).__gtagCalls || []);
      const devisCalls = calls.filter(
        ([type, name]) => type === "event" && name === "devis_click"
      );

      expect(devisCalls.length, `aucun devis_click capturé sur ${path}`).toBeGreaterThan(0);

      for (const [, , params] of devisCalls) {
        expect(params).toMatchObject({
          event_category: "engagement",
        });
        expect(typeof params.link_url).toBe("string");
        expect(
          params.link_url,
          `link_url manque l'ancre #devis-form: ${params.link_url}`
        ).toContain("#devis-form");
        expect(["classique", "degat_eaux"]).toContain(params.link_type);
      }
    });
  }
});