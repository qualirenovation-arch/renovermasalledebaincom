-- Add restrictive policy to deny anonymous/public access to subcontractors table
CREATE POLICY "deny_anon_select_subcontractors" 
ON public.subcontractors 
AS RESTRICTIVE
FOR SELECT 
TO anon 
USING (false);

-- Also add the same protection for subcontractor_documents table (related finding)
CREATE POLICY "deny_anon_select_subcontractor_documents" 
ON public.subcontractor_documents 
AS RESTRICTIVE
FOR SELECT 
TO anon 
USING (false);

-- And for subcontractor_portfolio table for consistency
CREATE POLICY "deny_anon_select_subcontractor_portfolio" 
ON public.subcontractor_portfolio 
AS RESTRICTIVE
FOR SELECT 
TO anon 
USING (false);