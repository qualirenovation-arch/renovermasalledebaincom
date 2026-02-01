-- Allow admins to read files from subcontractor-files bucket
-- This fixes the issue where admins cannot download partner documents via signed URLs

CREATE POLICY "Admins can view subcontractor files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'subcontractor-files' AND
  public.has_role(auth.uid(), 'admin'::app_role)
);