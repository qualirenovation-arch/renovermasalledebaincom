import { useEffect, useState, useRef, useCallback } from "react";
import { Layout } from "@/components/layout/Layout";
import { Play, Square, RotateCcw } from "lucide-react";

interface Entry {
  id: number;
  time: string;
  type: "dataLayer" | "gtag" | "devis_click";
  payload: any;
}

let counter = 0;

export default function DebugTracking() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [filter, setFilter] = useState<"all" | "devis_click">("all");
  const [autoTest, setAutoTest] = useState(false);
  const [autoTestCount, setAutoTestCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addEntry = useCallback((type: Entry["type"], payload: any) => {
    setEntries((prev) =>
      [
        { id: ++counter, time: new Date().toLocaleTimeString(), type, payload },
        ...prev,
      ].slice(0, 200)
    );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const w = window as any;
    w.dataLayer = w.dataLayer || [];

    // Snapshot existing dataLayer
    (w.dataLayer as any[]).forEach((item) => addEntry("dataLayer", item));

    // Patch dataLayer.push
    const originalPush = w.dataLayer.push.bind(w.dataLayer);
    w.dataLayer.push = (...args: any[]) => {
      args.forEach((arg) => {
        const isDevisClick =
          (Array.isArray(arg) && arg[0] === "event" && arg[1] === "devis_click") ||
          (arg && typeof arg === "object" && arg.event === "devis_click");
        addEntry(isDevisClick ? "devis_click" : "dataLayer", arg);
      });
      return originalPush(...args);
    };

    // Patch gtag
    const originalGtag = w.gtag;
    const wrappedGtag = (...args: any[]) => {
      const isDevisClick = args[0] === "event" && args[1] === "devis_click";
      addEntry(isDevisClick ? "devis_click" : "gtag", args);
      if (typeof originalGtag === "function") return originalGtag(...args);
    };
    w.gtag = wrappedGtag;

    return () => {
      w.dataLayer.push = originalPush;
      w.gtag = originalGtag;
    };
  }, [addEntry]);

  useEffect(() => {
    if (autoTest) {
      intervalRef.current = setInterval(() => {
        const w = window as any;
        if (typeof w.gtag === "function") {
          w.gtag("event", "devis_click", {
            event_category: "engagement",
            event_label: "Auto-test",
            label: "Auto-test",
            link_url: "/devis#devis-form",
            link_type: "classique",
            page_path: "/debug-tracking",
            source: "auto_test",
          });
          setAutoTestCount((c) => c + 1);
        }
      }, 2000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoTest]);

  const filtered = filter === "all" ? entries : entries.filter((e) => e.type === "devis_click");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-light mb-2">Debug tracking</h1>
        <p className="text-muted-foreground mb-6">
          Affiche en direct les appels <code>dataLayer.push</code>, <code>gtag()</code> et les
          événements <code>devis_click</code>. Cliquez sur un bouton « Mon étude » pour voir
          l'événement apparaître ici.
        </p>

        {/* Auto-test panel */}
        <div className="mb-6 p-5 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h2 className="font-display text-lg font-medium mb-1">Mode Auto-test</h2>
              <p className="text-sm text-muted-foreground">
                Déclenche un événement <code>devis_click</code> simulé toutes les 2 secondes.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm font-mono tabular-nums">
                <span className="text-muted-foreground">Envoyés :</span>{" "}
                <strong className="text-foreground">{autoTestCount}</strong>
              </div>
              <button
                onClick={() => setAutoTest((prev) => !prev)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  autoTest
                    ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {autoTest ? (
                  <>
                    <Square className="w-4 h-4" />
                    Arrêter
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Démarrer
                  </>
                )}
              </button>
              <button
                onClick={() => setAutoTestCount(0)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full border-2 border-border text-sm hover:bg-muted transition-colors"
                title="Réinitialiser le compteur"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
          {autoTest && (
            <div className="mt-3 flex items-center gap-2 text-xs text-primary font-medium animate-pulse">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              Test en cours — événements simulés envoyés toutes les 2 secondes…
            </div>
          )}
        </div>

        <div className="flex gap-2 mb-4 items-center">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full border-2 text-sm ${
              filter === "all" ? "bg-primary text-primary-foreground border-primary" : "border-border"
            }`}
          >
            Tout ({entries.length})
          </button>
          <button
            onClick={() => setFilter("devis_click")}
            className={`px-4 py-2 rounded-full border-2 text-sm ${
              filter === "devis_click"
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border"
            }`}
          >
            devis_click ({entries.filter((e) => e.type === "devis_click").length})
          </button>
          <button
            onClick={() => setEntries([])}
            className="ml-auto px-4 py-2 rounded-full border-2 border-border text-sm"
          >
            Vider
          </button>
        </div>

        <div className="mb-4 p-4 rounded-lg bg-muted text-sm space-y-1">
          <div>
            <strong>gtag :</strong>{" "}
            {typeof window !== "undefined" && typeof (window as any).gtag === "function"
              ? "✅ chargé"
              : "❌ absent (bloqueur ?)"}
          </div>
          <div>
            <strong>dataLayer :</strong>{" "}
            {typeof window !== "undefined" && Array.isArray((window as any).dataLayer)
              ? `✅ ${(window as any).dataLayer.length} entrée(s)`
              : "❌ absent"}
          </div>
        </div>

        <div ref={containerRef} className="space-y-2 font-mono text-xs">
          {filtered.length === 0 && (
            <div className="p-8 text-center text-muted-foreground border-2 border-dashed border-border rounded-lg">
              Aucun événement pour le moment. Naviguez sur le site, cliquez sur un CTA « Mon
              étude », ou lancez le mode <strong>Auto-test</strong> ci-dessus.
            </div>
          )}
          {filtered.map((e) => (
            <div
              key={e.id}
              className={`p-3 rounded-lg border-2 ${
                e.type === "devis_click"
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex justify-between mb-1">
                <span className="font-bold">
                  {e.type === "devis_click" ? "🎯 devis_click" : e.type}
                </span>
                <span className="text-muted-foreground">{e.time}</span>
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap break-all">
                {JSON.stringify(e.payload, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
