-- Add new fields for SIRET, TVA, manager info and insurance
ALTER TABLE public.subcontractors
ADD COLUMN siret TEXT,
ADD COLUMN vat_number TEXT,
ADD COLUMN manager_first_name TEXT,
ADD COLUMN manager_last_name TEXT,
ADD COLUMN manager_phone TEXT,
ADD COLUMN insurance_company TEXT,
ADD COLUMN insurance_contract_number TEXT;