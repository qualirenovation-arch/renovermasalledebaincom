import { useState, useRef, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw, Crosshair } from "lucide-react";

interface PinPosition {
  pin_id: string;
  name: string;
  area: string;
  x: number;
  y: number;
}

interface MapPinCalibratorProps {
  onClose: () => void;
}

export function MapPinCalibrator({ onClose }: MapPinCalibratorProps) {
  const { toast } = useToast();
  const mapRef = useRef<HTMLDivElement>(null);
  const [pins, setPins] = useState<PinPosition[]>([]);
  const [originalPins, setOriginalPins] = useState<PinPosition[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPins = async () => {
      const { data, error } = await supabase
        .from("map_pin_positions")
        .select("pin_id, name, area, x, y")
        .order("pin_id");

      if (error) {
        toast({ title: "Erreur", description: "Impossible de charger les positions.", variant: "destructive" });
        return;
      }

      const positions = (data || []).map(d => ({
        pin_id: d.pin_id,
        name: d.name,
        area: d.area,
        x: Number(d.x),
        y: Number(d.y),
      }));
      setPins(positions);
      setOriginalPins(JSON.parse(JSON.stringify(positions)));
      setLoading(false);
    };
    fetchPins();
  }, []);

  const handleMouseDown = useCallback((pinId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(pinId);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging || !mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));
    setPins(prev => prev.map(p => p.pin_id === dragging ? { ...p, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 } : p));
  }, [dragging]);

  const handleMouseUp = useCallback(() => {
    setDragging(null);
  }, []);

  // Touch support
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragging || !mapRef.current) return;
    e.preventDefault();
    const rect = mapRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.min(100, Math.max(0, ((touch.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((touch.clientY - rect.top) / rect.height) * 100));
    setPins(prev => prev.map(p => p.pin_id === dragging ? { ...p, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 } : p));
  }, [dragging]);

  const handleSave = async () => {
    setSaving(true);
    const updates = pins.map(p =>
      supabase.from("map_pin_positions").update({ x: p.x, y: p.y, updated_at: new Date().toISOString() }).eq("pin_id", p.pin_id)
    );
    const results = await Promise.all(updates);
    const hasError = results.some(r => r.error);

    if (hasError) {
      toast({ title: "Erreur", description: "Impossible de sauvegarder les positions.", variant: "destructive" });
    } else {
      toast({ title: "Positions sauvegardées", description: "Les pins sont mis à jour sur la carte." });
      setOriginalPins(JSON.parse(JSON.stringify(pins)));
    }
    setSaving(false);
  };

  const handleReset = () => {
    setPins(JSON.parse(JSON.stringify(originalPins)));
  };

  const hasChanges = JSON.stringify(pins) !== JSON.stringify(originalPins);

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="text-muted-foreground text-sm">Chargement des positions…</div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Instructions */}
      <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <Crosshair className="w-4 h-4 mt-0.5 shrink-0" />
        <span>Glissez-déposez les pins sur la carte pour les repositionner. Cliquez sur <strong>Sauvegarder</strong> pour valider.</span>
      </div>

      {/* Map with draggable pins */}
      <div
        ref={mapRef}
        className="relative rounded-2xl overflow-hidden shadow-xl select-none"
        style={{ cursor: dragging ? "grabbing" : "default" }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <img
          src="/lovable-uploads/carte-chantiers-idf-clean.png"
          alt="Carte calibration"
          className="w-full h-auto block"
          draggable={false}
        />

        {pins.map((pin) => (
          <div
            key={pin.pin_id}
            className="absolute group"
            style={{
              left: `${pin.x}%`,
              top: `${pin.y}%`,
              transform: "translate(-50%, -100%)",
              cursor: dragging === pin.pin_id ? "grabbing" : "grab",
              zIndex: dragging === pin.pin_id ? 50 : 10,
            }}
            onMouseDown={handleMouseDown(pin.pin_id)}
            onTouchStart={(e) => { e.preventDefault(); setDragging(pin.pin_id); }}
          >
            <svg
              viewBox="0 0 36 48"
              className="w-8 h-11 drop-shadow-xl"
              style={{ filter: dragging === pin.pin_id ? "drop-shadow(0 0 6px #f59e0b)" : undefined }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 0C8.059 0 0 8.059 0 18c0 13.5 18 30 18 30S36 31.5 36 18C36 8.059 27.941 0 18 0z"
                fill={dragging === pin.pin_id ? "#d97706" : "#1a4a6b"}
                fillOpacity="0.9"
              />
              <circle cx="18" cy="18" r="9" fill="white" fillOpacity="0.95" />
              <circle cx="18" cy="18" r="5" fill={dragging === pin.pin_id ? "#d97706" : "#1a4a6b"} />
            </svg>

            {/* Label toujours visible */}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap bg-foreground text-background text-[10px] font-medium px-2 py-1 rounded-md shadow-lg pointer-events-none">
              {pin.name}
            </span>

            {/* Coords */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap bg-amber-100 text-amber-800 text-[9px] font-mono px-1.5 py-0.5 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              x:{pin.x} y:{pin.y}
            </span>
          </div>
        ))}
      </div>

      {/* Coords table */}
      <div className="grid grid-cols-5 gap-1 text-xs font-mono bg-secondary/50 rounded-xl p-3">
        <div className="font-semibold col-span-2">Pin</div>
        <div className="font-semibold text-center">X</div>
        <div className="font-semibold text-center">Y</div>
        <div className="font-semibold text-center">Modifié</div>
        {pins.map(pin => {
          const orig = originalPins.find(o => o.pin_id === pin.pin_id);
          const changed = orig && (orig.x !== pin.x || orig.y !== pin.y);
          return (
            <>
              <div key={pin.pin_id + "-name"} className={`col-span-2 truncate ${changed ? "font-bold text-amber-700" : "text-muted-foreground"}`}>{pin.name}</div>
              <div key={pin.pin_id + "-x"} className="text-center">{pin.x}</div>
              <div key={pin.pin_id + "-y"} className="text-center">{pin.y}</div>
              <div key={pin.pin_id + "-ch"} className="text-center">{changed ? "✏️" : "—"}</div>
            </>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Button variant="outline" size="sm" onClick={onClose}>Fermer</Button>
        {hasChanges && (
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Annuler
          </Button>
        )}
        <Button size="sm" onClick={handleSave} disabled={saving || !hasChanges}>
          <Save className="w-4 h-4 mr-1" />
          {saving ? "Sauvegarde…" : "Sauvegarder"}
        </Button>
      </div>
    </div>
  );
}
