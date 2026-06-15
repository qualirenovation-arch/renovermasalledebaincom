-- Add admin DELETE and UPDATE storage policies for project-photos bucket
CREATE POLICY "Admins can delete project-photos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'project-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update project-photos"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'project-photos' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'project-photos' AND public.has_role(auth.uid(), 'admin'));

-- Add admin UPDATE policy for subcontractor-files bucket
CREATE POLICY "Admins can update subcontractor-files"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'subcontractor-files' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'subcontractor-files' AND public.has_role(auth.uid(), 'admin'));
