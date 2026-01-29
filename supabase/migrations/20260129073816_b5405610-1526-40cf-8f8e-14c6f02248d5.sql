-- Allow SELECT on subcontractors for admin access (public for now, will be restricted with auth later)
CREATE POLICY "Allow public select on subcontractors for admin" 
ON public.subcontractors 
FOR SELECT 
USING (true);

-- Allow UPDATE on subcontractors for admin management
CREATE POLICY "Allow public update on subcontractors for admin" 
ON public.subcontractors 
FOR UPDATE 
USING (true);

-- Allow SELECT on subcontractor_documents for admin
CREATE POLICY "Allow public select on subcontractor_documents for admin" 
ON public.subcontractor_documents 
FOR SELECT 
USING (true);

-- Allow SELECT on subcontractor_portfolio for admin
CREATE POLICY "Allow public select on subcontractor_portfolio for admin" 
ON public.subcontractor_portfolio 
FOR SELECT 
USING (true);