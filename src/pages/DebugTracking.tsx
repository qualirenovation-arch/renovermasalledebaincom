import { useEffect, useState, useRef } from "react";
import { Layout } from "@/components/layout/Layout";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const w = window as any;
    w.dataLayer = w.dataLayer || [];

    const push = (type: Entry["type"], payload: any) => {
      setEntries((prev) =>
        [
          { id: ++counter, time: new Date().toLocaleTimeString(), type, payload },
          ...prev,
        ].slice(0, 200)
      );
    };

    // Snapshot existing dataLayer
    (w.dataLayer as any[]).forEach((item) => push("dataLayer", item));

    // Patch dataLayer.push
    const originalPush = w.dataLayer.push.bind(w.dataLayer);
    w.dataLayer.push = (...args: any[]) => {
      args.forEach((arg) => {
        const isDevisClick =
          (Array.isArray(arg) && arg[0] === "event" && arg[1] === "devis_click") ||
          (arg && typeof arg === "object" && arg.event === "devis_click");
        push(isDevisClick ? "devis_click" : "dataLayer", arg);
      });
      return originalPush(...args);
    };

    // Patch gtag
    const originalGtag = w.gtag;
    const wrappedGtag = (...args: any[]) => {
      const isDevisClick = args[0] === "event" && args[1] === "devis_click";
      push(isDevisClick ? "devis_click" : "gtag", args);
      if (typeof originalGtag === "function") return originalGtag(...args);
    };
    w.gtag = wrappedGtag;

    return () => {
      w.dataLayer.push = originalPush;
      w.gtag = originalGtag;
    };
  }, []);

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

        <div className="mb-4 p-4 rounded-lg bg-muted text-sm">
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
              Aucun événement pour le moment. Naviguez sur le site et cliquez sur un CTA « Mon
              étude ».
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