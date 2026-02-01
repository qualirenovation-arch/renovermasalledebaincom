-- Add RLS policy to rate_limits table (accessed only by service_role in edge functions)
-- This policy ensures no regular users can access this internal table

CREATE POLICY "rate_limits_no_public_access" 
ON public.rate_limits 
FOR ALL 
TO authenticated, anon
USING (false)
WITH CHECK (false);