-- Create a table for storing partner contact documents
CREATE TABLE public.partner_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_contact_id UUID NOT NULL REFERENCES public.partner_contacts(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  uploaded_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.partner_documents ENABLE ROW LEVEL SECURITY;

-- Only admins can view documents
CREATE POLICY "Admins can view partner documents" 
ON public.partner_documents 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can insert documents
CREATE POLICY "Admins can insert partner documents" 
ON public.partner_documents 
FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete documents
CREATE POLICY "Admins can delete partner documents" 
ON public.partner_documents 
FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- Deny anonymous access
CREATE POLICY "deny_anon_select_partner_documents"
ON public.partner_documents
AS RESTRICTIVE
FOR SELECT
USING (false);

-- Create storage policies for subcontractor-files bucket (admin upload)
CREATE POLICY "Admins can upload to subcontractor-files"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'subcontractor-files' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can view subcontractor-files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'subcontractor-files' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete from subcontractor-files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'subcontractor-files' 
  AND public.has_role(auth.uid(), 'admin')
);