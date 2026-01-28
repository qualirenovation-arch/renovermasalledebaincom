-- Enum pour le statut des sous-traitants
CREATE TYPE public.subcontractor_status AS ENUM (
  'pending',
  'reviewing', 
  'validated',
  'refused',
  'archived'
);

-- Enum pour le statut des documents
CREATE TYPE public.document_status AS ENUM (
  'valid',
  'expiring_soon',
  'expired',
  'non_compliant'
);

-- Table principale des sous-traitants
CREATE TABLE public.subcontractors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Bloc 1: Informations générales
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_function TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  zones TEXT[] NOT NULL DEFAULT '{}',
  zone_other TEXT,
  
  -- Bloc 2: Corps de métier
  trades TEXT[] NOT NULL DEFAULT '{}',
  trade_other TEXT,
  experience TEXT NOT NULL,
  
  -- Bloc 3: Organisation chantier
  employee_count INTEGER NOT NULL,
  works_as_subcontractor BOOLEAN NOT NULL DEFAULT false,
  autonomous_intervention BOOLEAN NOT NULL DEFAULT false,
  occupied_sites_experience BOOLEAN NOT NULL DEFAULT false,
  
  -- Bloc 6: Présence en ligne
  website_url TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  linkedin_url TEXT,
  houzz_url TEXT,
  
  -- Bloc 7: Message libre
  presentation TEXT,
  
  -- Bloc 8: Validation
  certify_accuracy BOOLEAN NOT NULL DEFAULT false,
  accept_contact BOOLEAN NOT NULL DEFAULT false,
  
  -- Admin fields
  status public.subcontractor_status NOT NULL DEFAULT 'pending',
  collaboration_type TEXT,
  internal_notes TEXT,
  internal_rating INTEGER CHECK (internal_rating >= 1 AND internal_rating <= 5),
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index pour performance
CREATE INDEX idx_subcontractors_status ON public.subcontractors(status);
CREATE INDEX idx_subcontractors_email ON public.subcontractors(email);
CREATE INDEX idx_subcontractors_created_at ON public.subcontractors(created_at DESC);

-- Table des documents légaux
CREATE TABLE public.subcontractor_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subcontractor_id UUID NOT NULL REFERENCES public.subcontractors(id) ON DELETE CASCADE,
  
  document_type TEXT NOT NULL CHECK (document_type IN ('kbis', 'urssaf', 'rc_pro', 'decennale', 'rib')),
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  
  upload_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  expiry_date DATE,
  status public.document_status NOT NULL DEFAULT 'valid',
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(subcontractor_id, document_type)
);

CREATE INDEX idx_subcontractor_documents_subcontractor ON public.subcontractor_documents(subcontractor_id);
CREATE INDEX idx_subcontractor_documents_status ON public.subcontractor_documents(status);

-- Table des photos de réalisations
CREATE TABLE public.subcontractor_portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subcontractor_id UUID NOT NULL REFERENCES public.subcontractors(id) ON DELETE CASCADE,
  
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  description TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_subcontractor_portfolio_subcontractor ON public.subcontractor_portfolio(subcontractor_id);

-- Enable RLS
ALTER TABLE public.subcontractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcontractor_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcontractor_portfolio ENABLE ROW LEVEL SECURITY;

-- Policies: Insertion publique (formulaire), lecture restreinte (admin)
CREATE POLICY "Allow public insert on subcontractors"
ON public.subcontractors
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow public insert on subcontractor_documents"
ON public.subcontractor_documents
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow public insert on subcontractor_portfolio"
ON public.subcontractor_portfolio
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_subcontractors_updated_at
BEFORE UPDATE ON public.subcontractors
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subcontractor_documents_updated_at
BEFORE UPDATE ON public.subcontractor_documents
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket pour les fichiers
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('subcontractor-files', 'subcontractor-files', false, 10485760);

-- Policies storage: upload public, lecture restreinte
CREATE POLICY "Allow public upload to subcontractor-files"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'subcontractor-files');

CREATE POLICY "Allow service role to manage subcontractor-files"
ON storage.objects
FOR ALL
TO service_role
USING (bucket_id = 'subcontractor-files')
WITH CHECK (bucket_id = 'subcontractor-files');