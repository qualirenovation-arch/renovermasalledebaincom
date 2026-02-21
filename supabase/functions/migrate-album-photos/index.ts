import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface PhotoInput {
  url: string;
  title: string;
  description: string;
  alt_text: string;
  display_order: number;
  is_video?: boolean;
}

interface AlbumInput {
  album_id: string;
  slug: string;
  cover_image_url?: string;
  photos: PhotoInput[];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate admin auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Verify user is admin
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userErr } = await userClient.auth.getUser();
    if (userErr || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey);
    const { data: roleData } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Admin required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body: { albums: AlbumInput[] } = await req.json();
    const results: { album_id: string; slug: string; photos_migrated: number; cover_migrated: boolean; errors: string[] }[] = [];

    for (const album of body.albums) {
      const albumResult = { album_id: album.album_id, slug: album.slug, photos_migrated: 0, cover_migrated: false, errors: [] as string[] };

      // Helper to download and upload
      async function uploadImage(sourceUrl: string, storagePath: string): Promise<string | null> {
        try {
          const resp = await fetch(sourceUrl);
          if (!resp.ok) {
            albumResult.errors.push(`Failed to fetch ${sourceUrl}: ${resp.status}`);
            return null;
          }
          const blob = await resp.blob();
          const contentType = resp.headers.get("content-type") || "image/jpeg";

          const { error: uploadErr } = await adminClient.storage
            .from("album-photos")
            .upload(storagePath, blob, { contentType, upsert: true });

          if (uploadErr) {
            albumResult.errors.push(`Upload error for ${storagePath}: ${uploadErr.message}`);
            return null;
          }

          const { data: publicUrl } = adminClient.storage
            .from("album-photos")
            .getPublicUrl(storagePath);

          return publicUrl.publicUrl;
        } catch (e: any) {
          albumResult.errors.push(`Error processing ${sourceUrl}: ${e.message}`);
          return null;
        }
      }

      // Migrate cover image
      if (album.cover_image_url) {
        const ext = getExtension(album.cover_image_url);
        const coverPath = `${album.slug}/cover${ext}`;
        const newUrl = await uploadImage(album.cover_image_url, coverPath);
        if (newUrl) {
          await adminClient.from("albums").update({ cover_image: newUrl }).eq("id", album.album_id);
          albumResult.cover_migrated = true;
        }
      }

      // Migrate photos
      const photoInserts: {
        album_id: string;
        image_url: string;
        title: string;
        alt_text: string | null;
        description: string | null;
        display_order: number;
      }[] = [];

      for (const photo of album.photos) {
        if (photo.is_video) {
          // Keep video URLs as-is
          photoInserts.push({
            album_id: album.album_id,
            image_url: photo.url,
            title: photo.title,
            alt_text: photo.alt_text || null,
            description: photo.description || null,
            display_order: photo.display_order,
          });
          albumResult.photos_migrated++;
          continue;
        }

        const ext = getExtension(photo.url);
        const fileName = `photo-${String(photo.display_order).padStart(3, "0")}${ext}`;
        const storagePath = `${album.slug}/${fileName}`;
        const newUrl = await uploadImage(photo.url, storagePath);

        if (newUrl) {
          photoInserts.push({
            album_id: album.album_id,
            image_url: newUrl,
            title: photo.title,
            alt_text: photo.alt_text || null,
            description: photo.description || null,
            display_order: photo.display_order,
          });
          albumResult.photos_migrated++;
        }
      }

      // Replace album_photos in DB
      if (photoInserts.length > 0) {
        await adminClient.from("album_photos").delete().eq("album_id", album.album_id);
        const { error: insertErr } = await adminClient.from("album_photos").insert(photoInserts);
        if (insertErr) {
          albumResult.errors.push(`DB insert error: ${insertErr.message}`);
        }
      }

      results.push(albumResult);
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function getExtension(url: string): string {
  try {
    const pathname = new URL(url, "https://placeholder.com").pathname;
    const match = pathname.match(/\.(jpg|jpeg|png|webp|gif|svg|mp4)(\?|$)/i);
    if (match) return `.${match[1].toLowerCase()}`;
    // Vite hashed assets: /assets/gallery-7-BxK3Hs.jpg
    const viteMatch = pathname.match(/\.([a-z0-9]+)$/i);
    if (viteMatch) return `.${viteMatch[1].toLowerCase()}`;
  } catch {}
  return ".jpg";
}
