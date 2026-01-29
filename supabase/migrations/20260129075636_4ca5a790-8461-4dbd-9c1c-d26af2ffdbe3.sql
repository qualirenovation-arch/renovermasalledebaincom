-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Allow public select on subcontractors for admin" ON public.subcontractors;
DROP POLICY IF EXISTS "Allow public update on subcontractors for admin" ON public.subcontractors;
DROP POLICY IF EXISTS "Allow public select on subcontractor_documents for admin" ON public.subcontractor_documents;
DROP POLICY IF EXISTS "Allow public select on subcontractor_portfolio for admin" ON public.subcontractor_portfolio;

-- Create secure policies using the has_role function

-- Subcontractors: only admins can view all
CREATE POLICY "Admins can view all subcontractors"
ON public.subcontractors
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Subcontractors: only admins can update
CREATE POLICY "Admins can update subcontractors"
ON public.subcontractors
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Subcontractor documents: only admins can view
CREATE POLICY "Admins can view subcontractor documents"
ON public.subcontractor_documents
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Subcontractor portfolio: only admins can view
CREATE POLICY "Admins can view subcontractor portfolio"
ON public.subcontractor_portfolio
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));