import { supabase } from "@/integrations/supabase/client";

/**
 * Increment click_count for an album via SECURITY DEFINER function.
 * Fire-and-forget — analytics should never block UX.
 */
export async function trackAlbumClick(slug: string) {
  try {
    await supabase.rpc("increment_album_click", { album_slug: slug });
  } catch {
    // Silent fail
  }
}
