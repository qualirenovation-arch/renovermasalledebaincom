-- ==============================================
-- TABLE: quote_requests (Demandes de devis unifiées)
-- ==============================================
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Type de devis : classique ou degat_des_eaux
  type_devis TEXT NOT NULL DEFAULT 'classique' CHECK (type_devis IN ('classique', 'degat_des_eaux')),
  
  -- Informations client (tronc commun)
  client_first_name TEXT NOT NULL,
  client_last_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  
  -- Informations logement (tronc commun)
  property_type TEXT CHECK (property_type IN ('appartement', 'maison')),
  property_address TEXT,
  property_city TEXT,
  property_postal_code TEXT,
  property_occupied BOOLEAN DEFAULT true,
  property_floor TEXT,
  property_elevator TEXT,
  property_surface TEXT,
  
  -- Champs devis classique (rénovation)
  renovation_type_installation TEXT,
  renovation_type_douche TEXT,
  renovation_type_pommeau TEXT,
  renovation_type_receveur TEXT[],
  renovation_type_baignoire TEXT[],
  renovation_robinetterie_baignoire TEXT,
  renovation_wc_type TEXT[],
  renovation_meuble_vasque TEXT[],
  renovation_porte_douche TEXT[],
  renovation_machine_laver TEXT,
  renovation_emplacement_machine TEXT[],
  renovation_type_machine TEXT[],
  renovation_robinetterie_mlaver TEXT,
  renovation_finitions_robinetterie TEXT[],
  renovation_style_carrelage TEXT[],
  
  -- Champs dégât des eaux - Étape 1 (Le sinistre)
  water_damage_insurance_declared TEXT CHECK (water_damage_insurance_declared IN ('oui', 'non', 'en_cours')),
  water_damage_claim_number TEXT,
  
  -- Champs dégât des eaux - Étape 2 (Origine)
  water_damage_origin TEXT CHECK (water_damage_origin IN ('voisin_dessus', 'voisin_mitoyen', 'parties_communes', 'installation_privative', 'origine_inconnue')),
  water_damage_nature TEXT CHECK (water_damage_nature IN ('alimentation_eau', 'evacuation', 'infiltration_condensation', 'non_identifiee')),
  
  -- Champs dégât des eaux - Étape 3 (Pièces concernées)
  water_damage_rooms TEXT[] DEFAULT '{}',
  water_damage_rooms_other TEXT,
  
  -- Champs dégât des eaux - Étape 4 (Travaux à réaliser)
  water_damage_works TEXT[] DEFAULT '{}',
  water_damage_works_other TEXT,
  
  -- Champs dégât des eaux - Étape 5 (Scope)
  water_damage_scope TEXT CHECK (water_damage_scope IN ('remise_en_etat', 'renovation_partielle', 'renovation_complete')),
  
  -- Champs dégât des eaux - Étape 6 (Documents) - stockés dans storage
  water_damage_documents TEXT[] DEFAULT '{}',
  
  -- Message libre
  message TEXT,
  
  -- Gestion interne
  status TEXT NOT NULL DEFAULT 'nouveau' CHECK (status IN ('nouveau', 'a_qualifier', 'en_cours', 'devis_envoye', 'accepte', 'refuse', 'archive')),
  priority TEXT NOT NULL DEFAULT 'normale' CHECK (priority IN ('basse', 'normale', 'haute', 'urgente')),
  assigned_to TEXT,
  internal_notes TEXT,
  source TEXT NOT NULL DEFAULT 'website'
);

-- Enable Row Level Security
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Admins only (full access)
CREATE POLICY "Admins can view all quote_requests" 
  ON public.quote_requests 
  FOR SELECT 
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert quote_requests" 
  ON public.quote_requests 
  FOR INSERT 
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update quote_requests" 
  ON public.quote_requests 
  FOR UPDATE 
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete quote_requests" 
  ON public.quote_requests 
  FOR DELETE 
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Policy for anonymous inserts (public form submission)
CREATE POLICY "Anyone can insert quote_requests" 
  ON public.quote_requests 
  FOR INSERT 
  WITH CHECK (true);

-- Deny anonymous select
CREATE POLICY "deny_anon_select_quote_requests" 
  ON public.quote_requests 
  FOR SELECT 
  USING (false);

-- Trigger for updated_at
CREATE TRIGGER update_quote_requests_updated_at
  BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ==============================================
-- STORAGE: Bucket pour les documents dégât des eaux
-- ==============================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'water-damage-documents',
  'water-damage-documents',
  false,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
);

-- Storage policies
CREATE POLICY "Anyone can upload water damage documents"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'water-damage-documents');

CREATE POLICY "Admins can view water damage documents"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'water-damage-documents' 
    AND has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Admins can delete water damage documents"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'water-damage-documents' 
    AND has_role(auth.uid(), 'admin'::app_role)
  );