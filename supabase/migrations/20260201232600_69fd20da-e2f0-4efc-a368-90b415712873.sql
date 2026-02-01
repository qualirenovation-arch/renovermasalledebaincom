-- Fix: Drop vulnerable public INSERT policies that allow anonymous data insertion
-- These policies were created in migration 20260128203429 and bypass captcha/validation

-- Drop public INSERT policies on subcontractors
DROP POLICY IF EXISTS "Allow public insert on subcontractors" ON public.subcontractors;

-- Drop public INSERT policies on subcontractor_documents
DROP POLICY IF EXISTS "Allow public insert on subcontractor_documents" ON public.subcontractor_documents;

-- Drop public INSERT policies on subcontractor_portfolio
DROP POLICY IF EXISTS "Allow public insert on subcontractor_portfolio" ON public.subcontractor_portfolio;

-- Drop public storage upload policy
DROP POLICY IF EXISTS "Allow public upload to subcontractor-files" ON storage.objects;

-- Admin-only INSERT policies already exist from other migrations:
-- - "Admins can insert subcontractors"
-- - "Admins can insert subcontractor_documents" 
-- - "Admins can insert subcontractor_portfolio"
-- These use has_role(auth.uid(), 'admin'::app_role) which is correct