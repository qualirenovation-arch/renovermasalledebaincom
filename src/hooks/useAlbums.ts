import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type Album = Tables<"albums"> & {
  album_photos: Tables<"album_photos">[];
  album_seo: Tables<"album_seo"> | null;
  album_tags: Tables<"album_tags">[];
};

export function useAlbums() {
  return useQuery({
    queryKey: ["admin-albums"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("albums")
        .select("*, album_photos(*), album_seo(*), album_tags(*)")
        .order("display_order", { ascending: true });

      if (error) throw error;

      return (data ?? []).map((a: any) => ({
        ...a,
        album_seo: Array.isArray(a.album_seo) ? a.album_seo[0] ?? null : a.album_seo,
      })) as Album[];
    },
  });
}

export function useCreateAlbum() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (album: TablesInsert<"albums">) => {
      const { data, error } = await supabase.from("albums").insert(album).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-albums"] }),
  });
}

export function useUpdateAlbum() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: TablesUpdate<"albums"> & { id: string }) => {
      const { data, error } = await supabase.from("albums").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-albums"] }),
  });
}

export function useDeleteAlbum() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("albums").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-albums"] }),
  });
}

export function useSaveAlbumPhotos() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ albumId, photos }: { albumId: string; photos: TablesInsert<"album_photos">[] }) => {
      // Delete existing photos then insert new ones
      await supabase.from("album_photos").delete().eq("album_id", albumId);
      if (photos.length > 0) {
        const { error } = await supabase.from("album_photos").insert(photos);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-albums"] }),
  });
}

export function useSaveAlbumSeo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ albumId, metaTitle, metaDescription }: { albumId: string; metaTitle: string; metaDescription: string }) => {
      const { data: existing } = await supabase.from("album_seo").select("id").eq("album_id", albumId).maybeSingle();
      if (existing) {
        const { error } = await supabase.from("album_seo").update({ meta_title: metaTitle, meta_description: metaDescription }).eq("album_id", albumId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("album_seo").insert({ album_id: albumId, meta_title: metaTitle, meta_description: metaDescription });
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-albums"] }),
  });
}

export function useSaveAlbumTags() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ albumId, tags }: { albumId: string; tags: string[] }) => {
      await supabase.from("album_tags").delete().eq("album_id", albumId);
      if (tags.length > 0) {
        const { error } = await supabase.from("album_tags").insert(tags.map(tag => ({ album_id: albumId, tag })));
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-albums"] }),
  });
}

export function useUpdateAlbumOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (albums: { id: string; display_order: number }[]) => {
      for (const a of albums) {
        const { error } = await supabase.from("albums").update({ display_order: a.display_order }).eq("id", a.id);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-albums"] }),
  });
}
