import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  albums as staticAlbums,
  inProgressAlbums as staticInProgressAlbums,
  getAlbumBySlug as staticGetAlbumBySlug,
  type Album,
  type Photo,
} from "@/data/albumsData";

/**
 * Hybrid hook: fetches album metadata from DB, merges with static data
 * for photos/reviews/instagram/CTA/finitions. Falls back to pure static on error.
 *
 * DB provides: title, slug, location, description, subtitle, category,
 *              display_order, is_in_progress, is_featured, cover_image (unused until storage migration)
 * Static provides: photos, coverImage, review, instagramLink(s), ctaButton, finitionSol, finitionMur
 */

interface DbAlbum {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  location: string;
  description: string;
  cover_image: string;
  category: string | null;
  display_order: number;
  is_in_progress: boolean;
  is_featured: boolean;
  album_tags: { tag: string }[];
  album_seo: { meta_title: string | null; meta_description: string | null } | null;
}

function mergeAlbum(dbAlbum: DbAlbum, staticAlbum: Album | undefined): Album {
  // Start from static (has photos, reviews, etc.) and override with DB metadata
  const base: Album = staticAlbum ?? {
    id: dbAlbum.slug,
    slug: dbAlbum.slug,
    title: dbAlbum.title,
    location: dbAlbum.location,
    description: dbAlbum.description,
    coverImage: dbAlbum.cover_image || "",
    photos: [],
  };

  return {
    ...base,
    // DB overrides for metadata fields
    title: dbAlbum.title,
    subtitle: dbAlbum.subtitle ?? base.subtitle,
    location: dbAlbum.location,
    description: dbAlbum.description,
    category: (dbAlbum.category as Album["category"]) ?? base.category,
    isInProgress: dbAlbum.is_in_progress,
    // Keep static fields that aren't in DB yet
    coverImage: base.coverImage,
    photos: base.photos,
    review: base.review,
    instagramLink: base.instagramLink,
    instagramLinks: base.instagramLinks,
    ctaButton: base.ctaButton,
    finitionSol: base.finitionSol,
    finitionMur: base.finitionMur,
  };
}

async function fetchDbAlbums(): Promise<DbAlbum[]> {
  const { data, error } = await supabase
    .from("albums")
    .select("*, album_tags(tag), album_seo(*)")
    .order("display_order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((a: any) => ({
    ...a,
    album_seo: Array.isArray(a.album_seo) ? a.album_seo[0] ?? null : a.album_seo,
  }));
}

export function usePublicAlbums() {
  const query = useQuery({
    queryKey: ["public-albums"],
    queryFn: fetchDbAlbums,
    staleTime: 5 * 60 * 1000, // 5 min cache
  });

  // Build the static lookup by slug
  const allStatic = [...staticAlbums, ...staticInProgressAlbums];
  const staticBySlug = new Map(allStatic.map((a) => [a.slug, a]));

  if (query.data) {
    // Merge DB albums with static data
    const merged = query.data.map((dbAlbum) => {
      const staticAlbum = staticBySlug.get(dbAlbum.slug);
      return mergeAlbum(dbAlbum, staticAlbum);
    });

    const completedAlbums = merged.filter((a) => !a.isInProgress);
    const inProgressAlbums = merged.filter((a) => a.isInProgress);

    return {
      ...query,
      albums: completedAlbums,
      inProgressAlbums,
      allAlbums: merged,
      getAlbumBySlug: (slug: string) => merged.find((a) => a.slug === slug),
      isHybrid: true as const,
    };
  }

  // Fallback to static data
  return {
    ...query,
    albums: staticAlbums.filter((a) => !a.isInProgress),
    inProgressAlbums: staticInProgressAlbums,
    allAlbums: allStatic,
    getAlbumBySlug: staticGetAlbumBySlug,
    isHybrid: false as const,
  };
}
