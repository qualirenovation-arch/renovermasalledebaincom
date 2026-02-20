import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { projectLocations, ProjectLocation } from "@/data/albumsData";

export function usePinPositions() {
  const [pins, setPins] = useState<ProjectLocation[]>(projectLocations);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPins = async () => {
      const { data, error } = await supabase
        .from("map_pin_positions")
        .select("pin_id, name, area, x, y");

      if (!error && data && data.length > 0) {
        const dbPins: ProjectLocation[] = data.map(d => ({
          id: d.pin_id,
          name: d.name,
          area: d.area,
          x: Number(d.x),
          y: Number(d.y),
        }));
        // Merge: keep order from static data, override coords from DB
        const merged = projectLocations.map(loc => {
          const dbPin = dbPins.find(p => p.id === loc.id);
          return dbPin ?? loc;
        });
        setPins(merged);
      }
      setLoading(false);
    };
    fetchPins();
  }, []);

  return { pins, loading };
}
