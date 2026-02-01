-- Table pour le rate limiting des Edge Functions
CREATE TABLE public.rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index pour recherche rapide
CREATE INDEX idx_rate_limits_lookup ON public.rate_limits (ip_address, endpoint, created_at);

-- RLS activé
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Nettoyage automatique des anciennes entrées (> 24h)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.rate_limits 
  WHERE created_at < now() - INTERVAL '24 hours';
END;
$$;