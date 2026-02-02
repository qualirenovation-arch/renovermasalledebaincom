-- Add missing SELECT policy for subcontractors to restrict to admins only
-- (The current policies deny anon but don't restrict authenticated users)

-- Add UPDATE/DELETE policies for subcontractor_documents
CREATE POLICY "Admins can update subcontractor_documents" 
ON public.subcontractor_documents 
FOR UPDATE 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete subcontractor_documents" 
ON public.subcontractor_documents 
FOR DELETE 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Add UPDATE/DELETE policies for subcontractor_portfolio
CREATE POLICY "Admins can update subcontractor_portfolio" 
ON public.subcontractor_portfolio 
FOR UPDATE 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete subcontractor_portfolio" 
ON public.subcontractor_portfolio 
FOR DELETE 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Add DELETE policy for subcontractors
CREATE POLICY "Admins can delete subcontractors" 
ON public.subcontractors 
FOR DELETE 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'::app_role));