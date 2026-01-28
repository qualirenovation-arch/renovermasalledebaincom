-- Add new fields for revenue and managed people count
ALTER TABLE public.subcontractors 
ADD COLUMN annual_revenue text,
ADD COLUMN managed_people_count integer;