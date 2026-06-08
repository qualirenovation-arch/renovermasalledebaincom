
-- 1) project-photos: replace public SELECT with admin-only SELECT
DROP POLICY IF EXISTS "Anyone can view project photos via token" ON storage.objects;
CREATE POLICY "Admins can view project photos"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'project-photos' AND public.has_role(auth.uid(), 'admin'));

-- 2) project-photos: tighten INSERT to image extensions only (still allows guest uploads from quote form)
DROP POLICY IF EXISTS "Anyone can upload project photos" ON storage.objects;
CREATE POLICY "Anyone can upload project photos (images only)"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'project-photos'
  AND lower(storage.extension(name)) = ANY (ARRAY['jpg','jpeg','png','webp','heic','heif'])
);

-- 3) water-damage-documents: tighten INSERT to allowed file types
DROP POLICY IF EXISTS "Anyone can upload water damage documents" ON storage.objects;
CREATE POLICY "Anyone can upload water damage documents (allowed types)"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'water-damage-documents'
  AND lower(storage.extension(name)) = ANY (ARRAY['jpg','jpeg','png','webp','heic','heif','pdf'])
);

-- 4) Replace incorrect PERMISSIVE deny on quote_requests SELECT with a RESTRICTIVE one
DROP POLICY IF EXISTS deny_anon_select_quote_requests ON public.quote_requests;
CREATE POLICY deny_anon_select_quote_requests
ON public.quote_requests AS RESTRICTIVE
FOR SELECT
TO anon
USING (false);

-- 5) Revoke EXECUTE on internal helper functions from public roles
REVOKE EXECUTE ON FUNCTION public.cleanup_old_rate_limits() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
