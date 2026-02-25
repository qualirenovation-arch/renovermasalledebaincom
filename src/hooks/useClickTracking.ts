import { supabase } from "@/integrations/supabase/client";

/**
 * Increment click_count for an album (fire-and-forget, no auth required).
 * Uses raw RPC to avoid needing RLS write access on public side.
 */
export async function trackAlbumClick(slug: string) {
  try {
    // Use anon-accessible update via the slug (albums table has public SELECT)
    // We use a simple approach: read current count then update
    // Since this is analytics, eventual consistency is fine
    const { data } = await supabase
      .from("albums")
      .select("id, click_count")
      .eq("slug", slug)
      .single();

    if (data) {
      await supabase
        .from("albums")
        .update({ click_count: (data.click_count || 0) + 1 })
        .eq("id", data.id);
    }
  } catch {
    // Silent fail — analytics should never block UX
  }
}
