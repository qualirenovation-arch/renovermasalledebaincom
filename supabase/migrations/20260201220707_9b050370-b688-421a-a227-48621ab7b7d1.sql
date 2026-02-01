-- Remove overly permissive public INSERT policies that allow unauthenticated access
-- These policies allow anyone to bypass the frontend and insert directly into the database

-- Drop the public INSERT policy on subcontractors table
DROP POLICY IF EXISTS "Only service role can insert subcontractors" ON public.subcontractors;

-- Drop the public INSERT policy on subcontractor_documents table
DROP POLICY IF EXISTS "Only service role can insert subcontractor_documents" ON public.subcontractor_documents;

-- Drop the public INSERT policy on subcontractor_portfolio table
DROP POLICY IF EXISTS "Only service role can insert subcontractor_portfolio" ON public.subcontractor_portfolio;

-- The remaining policies are secure:
-- - "Admins can insert subcontractors" requires admin role
-- - "Admins can insert subcontractor_documents" requires admin role
-- - "Admins can insert subcontractor_portfolio" requires admin role
-- 
-- Public submissions go through the edge function (send-partner-confirmation)
-- which uses the service_role key to insert records after captcha verification