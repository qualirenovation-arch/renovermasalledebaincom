
-- Create public storage bucket for album photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('album-photos', 'album-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access
CREATE POLICY "Public can read album photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'album-photos');

-- Admin upload/manage
CREATE POLICY "Admins can upload album photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'album-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update album photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'album-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete album photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'album-photos' AND public.has_role(auth.uid(), 'admin'));
