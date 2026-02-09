
-- ==================== QUOTE_REQUESTS ====================
-- Drop existing RESTRICTIVE policies and recreate as PERMISSIVE for admin access
DROP POLICY IF EXISTS "Admins can view all quote_requests" ON public.quote_requests;

-- Create explicit PERMISSIVE policy (default) for admin SELECT access
CREATE POLICY "Admins can view all quote_requests"
  ON public.quote_requests
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- ==================== PARTNER_CONTACTS ====================
DROP POLICY IF EXISTS "Admins can view all partner_contacts" ON public.partner_contacts;

CREATE POLICY "Admins can view all partner_contacts"
  ON public.partner_contacts
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- ==================== SUBCONTRACTORS ====================
DROP POLICY IF EXISTS "Admins can view all subcontractors" ON public.subcontractors;

CREATE POLICY "Admins can view all subcontractors"
  ON public.subcontractors
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- ==================== RELATED DOCUMENT TABLES ====================
-- Ensure subcontractor_documents are accessible only by admins
DROP POLICY IF EXISTS "Admins can view subcontractor documents" ON public.subcontractor_documents;

CREATE POLICY "Admins can view subcontractor documents"
  ON public.subcontractor_documents
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Ensure partner_documents are accessible only by admins
DROP POLICY IF EXISTS "Admins can view partner documents" ON public.partner_documents;

CREATE POLICY "Admins can view partner documents"
  ON public.partner_documents
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
