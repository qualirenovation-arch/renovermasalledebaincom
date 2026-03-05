import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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

    const body = await req.json().catch(() => ({}));
    const dryRun = body.dry_run === true;

    // Fetch all albums
    const { data: albums, error: albumErr } = await adminClient
      .from("albums")
      .select("id, slug, title, location")
      .order("slug");

    if (albumErr) throw albumErr;
    if (!albums?.length) {
      return new Response(JSON.stringify({ error: "No albums found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch all photos
    const { data: allPhotos, error: photosErr } = await adminClient
      .from("album_photos")
      .select("id, album_id, image_url, display_order, title")
      .order("display_order");

    if (photosErr) throw photosErr;

    // Group photos by album
    const photosByAlbum = new Map<string, typeof allPhotos>();
    for (const photo of allPhotos || []) {
      const list = photosByAlbum.get(photo.album_id) || [];
      list.push(photo);
      photosByAlbum.set(photo.album_id, list);
    }

    const BUCKET = "album-photos";
    const results: {
      album_slug: string;
      photos_renamed: number;
      cover_renamed: boolean;
      errors: string[];
      renames: { old: string; new: string }[];
    }[] = [];

    let totalRenamed = 0;
    let totalErrors = 0;

    for (const album of albums) {
      const albumResult = {
        album_slug: album.slug,
        photos_renamed: 0,
        cover_renamed: false,
        errors: [] as string[],
        renames: [] as { old: string; new: string }[],
      };

      const photos = photosByAlbum.get(album.id) || [];
      if (photos.length === 0) {
        results.push(albumResult);
        continue;
      }

      // Build SEO path: renovermasalledebain/{slug}/
      // The slug already contains location info like "salle-de-bain-paris-10-faubourg-saint-denis"
      const basePath = `renovermasalledebain/${album.slug}`;

      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        const photoNum = i + 1;
        const ext = getExtension(photo.image_url);

        // SEO filename: salle-de-bain-{slug}-photo-{num}.jpg
        const seoFileName = `${album.slug}-photo-${photoNum}${ext}`;
        const newStoragePath = `${basePath}/${seoFileName}`;

        // Check if already renamed
        if (photo.image_url.includes(`renovermasalledebain/`)) {
          albumResult.renames.push({ old: photo.image_url, new: "(already renamed)" });
          continue;
        }

        // Check if it's a video URL (external) - skip
        if (isExternalUrl(photo.image_url) && !photo.image_url.includes("album-photos")) {
          albumResult.renames.push({ old: photo.image_url, new: "(external/video - skipped)" });
          continue;
        }

        if (dryRun) {
          albumResult.renames.push({ old: photo.image_url, new: newStoragePath });
          albumResult.photos_renamed++;
          continue;
        }

        try {
          // Download current file
          const resp = await fetch(photo.image_url);
          if (!resp.ok) {
            albumResult.errors.push(`Fetch failed for photo ${photo.id}: ${resp.status}`);
            continue;
          }
          const blob = await resp.blob();
          const contentType = resp.headers.get("content-type") || "image/jpeg";

          if (contentType.includes("html")) {
            albumResult.errors.push(`Got HTML for photo ${photo.id}`);
            continue;
          }

          // Upload with new name
          const { error: uploadErr } = await adminClient.storage
            .from(BUCKET)
            .upload(newStoragePath, blob, { contentType, upsert: true });

          if (uploadErr) {
            albumResult.errors.push(`Upload error ${newStoragePath}: ${uploadErr.message}`);
            continue;
          }

          // Get new public URL
          const { data: publicUrl } = adminClient.storage
            .from(BUCKET)
            .getPublicUrl(newStoragePath);

          // Update DB
          const { error: updateErr } = await adminClient
            .from("album_photos")
            .update({ image_url: publicUrl.publicUrl })
            .eq("id", photo.id);

          if (updateErr) {
            albumResult.errors.push(`DB update error for ${photo.id}: ${updateErr.message}`);
            continue;
          }

          // Try to delete old file from storage (if it's in our bucket)
          const oldPath = extractStoragePath(photo.image_url, BUCKET);
          if (oldPath && oldPath !== newStoragePath) {
            await adminClient.storage.from(BUCKET).remove([oldPath]);
          }

          albumResult.renames.push({ old: photo.image_url, new: publicUrl.publicUrl });
          albumResult.photos_renamed++;
        } catch (e: any) {
          albumResult.errors.push(`Error processing photo ${photo.id}: ${e.message}`);
        }
      }

      // Rename cover image too
      if (album.slug) {
        const { data: albumData } = await adminClient
          .from("albums")
          .select("cover_image")
          .eq("id", album.id)
          .single();

        if (albumData?.cover_image && !albumData.cover_image.includes("renovermasalledebain/")) {
          const coverExt = getExtension(albumData.cover_image);
          const coverSeoName = `${album.slug}-cover${coverExt}`;
          const coverPath = `${basePath}/${coverSeoName}`;

          if (dryRun) {
            albumResult.renames.push({ old: albumData.cover_image, new: coverPath });
            albumResult.cover_renamed = true;
          } else {
            try {
              const resp = await fetch(albumData.cover_image);
              if (resp.ok) {
                const blob = await resp.blob();
                const contentType = resp.headers.get("content-type") || "image/jpeg";

                if (!contentType.includes("html")) {
                  const { error: uploadErr } = await adminClient.storage
                    .from(BUCKET)
                    .upload(coverPath, blob, { contentType, upsert: true });

                  if (!uploadErr) {
                    const { data: publicUrl } = adminClient.storage
                      .from(BUCKET)
                      .getPublicUrl(coverPath);

                    await adminClient
                      .from("albums")
                      .update({ cover_image: publicUrl.publicUrl })
                      .eq("id", album.id);

                    const oldCoverPath = extractStoragePath(albumData.cover_image, BUCKET);
                    if (oldCoverPath && oldCoverPath !== coverPath) {
                      await adminClient.storage.from(BUCKET).remove([oldCoverPath]);
                    }

                    albumResult.cover_renamed = true;
                    albumResult.renames.push({ old: albumData.cover_image, new: publicUrl.publicUrl });
                  } else {
                    albumResult.errors.push(`Cover upload error: ${uploadErr.message}`);
                  }
                }
              }
            } catch (e: any) {
              albumResult.errors.push(`Cover error: ${e.message}`);
            }
          }
        }
      }

      totalRenamed += albumResult.photos_renamed;
      totalErrors += albumResult.errors.length;
      results.push(albumResult);
    }

    return new Response(
      JSON.stringify({
        success: true,
        dry_run: dryRun,
        total_renamed: totalRenamed,
        total_errors: totalErrors,
        total_albums: results.length,
        results,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
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
    const viteMatch = pathname.match(/\.([a-z0-9]+)$/i);
    if (viteMatch) return `.${viteMatch[1].toLowerCase()}`;
  } catch {}
  return ".jpg";
}

function isExternalUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return !u.hostname.includes("supabase");
  } catch {
    return false;
  }
}

function extractStoragePath(url: string, bucket: string): string | null {
  try {
    const u = new URL(url);
    const marker = `/object/public/${bucket}/`;
    const idx = u.pathname.indexOf(marker);
    if (idx === -1) return null;
    return decodeURIComponent(u.pathname.substring(idx + marker.length));
  } catch {
    return null;
  }
}
