-- Create enums for partner_contacts
CREATE TYPE public.partner_family AS ENUM ('sub_traitant', 'installateur', 'marque_site');
CREATE TYPE public.partner_status AS ENUM ('nouveau', 'a_qualifier', 'en_cours', 'partenaire_ok', 'refuse', 'archive');
CREATE TYPE public.partner_priority AS ENUM ('basse', 'normale', 'haute');
CREATE TYPE public.partner_zone AS ENUM ('paris', 'petite_couronne', 'idf', 'autre');

-- Sous-traitant specific enums
CREATE TYPE public.partner_trade AS ENUM ('carrelage', 'plomberie', 'electricite', 'menuiserie', 'peinture', 'autre');
CREATE TYPE public.partner_collaboration_type AS ENUM ('ponctuelle', 'recurrente');
CREATE TYPE public.partner_availability AS ENUM ('immediat', 'moins_1_mois', 'a_definir');

-- Installateur specific enums
CREATE TYPE public.partner_context AS ENUM ('client_signe', 'chiffrage', 'recherche_reguliere', 'mission_ponctuelle');
CREATE TYPE public.partner_intervention_level AS ENUM ('pose_seule', 'pose_plus_mise_en_service', 'avec_maitre_oeuvre', 'cle_en_main');
CREATE TYPE public.partner_timeline AS ENUM ('immediat', 'moins_1_mois', 'a_definir');

-- Marque/Site specific enums
CREATE TYPE public.partner_activity_type AS ENUM ('marque', 'fabricant', 'distributeur', 'showroom', 'site_ecommerce', 'site_decoration_media');
CREATE TYPE public.partner_collaboration_goal AS ENUM ('etre_recommande', 'projets_concrets', 'partenariat_recurrent', 'operation_presse_contenu');

-- Create the partner_contacts table
CREATE TABLE public.partner_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Common fields
  partner_family public.partner_family NOT NULL,
  company_name TEXT NOT NULL,
  contact_first_name TEXT NOT NULL,
  contact_last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  zone public.partner_zone NOT NULL,
  message TEXT NOT NULL,
  status public.partner_status NOT NULL DEFAULT 'nouveau',
  priority public.partner_priority NOT NULL DEFAULT 'normale',
  assigned_to TEXT,
  last_contacted_at TIMESTAMP WITH TIME ZONE,
  next_followup_at TIMESTAMP WITH TIME ZONE,
  internal_notes TEXT,
  source TEXT NOT NULL DEFAULT 'page_partenaires',
  
  -- Sous-traitant specific fields
  trade public.partner_trade,
  collaboration_type public.partner_collaboration_type,
  availability public.partner_availability,
  
  -- Installateur specific fields
  requested_services TEXT[] DEFAULT '{}',
  context public.partner_context,
  intervention_level public.partner_intervention_level,
  timeline public.partner_timeline,
  
  -- Marque/Site specific fields
  activity_type public.partner_activity_type,
  website_url TEXT,
  offer_categories TEXT[] DEFAULT '{}',
  collaboration_goal public.partner_collaboration_goal
);

-- Enable RLS
ALTER TABLE public.partner_contacts ENABLE ROW LEVEL SECURITY;

-- RLS policies - block anonymous access (RESTRICTIVE must come after AS)
CREATE POLICY "deny_anon_select_partner_contacts" 
ON public.partner_contacts AS RESTRICTIVE
FOR SELECT 
TO anon
USING (false);

-- Admins can do everything
CREATE POLICY "Admins can view all partner_contacts" 
ON public.partner_contacts 
FOR SELECT 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can insert partner_contacts" 
ON public.partner_contacts 
FOR INSERT 
TO authenticated 
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update partner_contacts" 
ON public.partner_contacts 
FOR UPDATE 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete partner_contacts" 
ON public.partner_contacts 
FOR DELETE 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_partner_contacts_updated_at
BEFORE UPDATE ON public.partner_contacts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for common queries
CREATE INDEX idx_partner_contacts_family ON public.partner_contacts(partner_family);
CREATE INDEX idx_partner_contacts_status ON public.partner_contacts(status);
CREATE INDEX idx_partner_contacts_created_at ON public.partner_contacts(created_at DESC);
CREATE INDEX idx_partner_contacts_next_followup ON public.partner_contacts(next_followup_at);