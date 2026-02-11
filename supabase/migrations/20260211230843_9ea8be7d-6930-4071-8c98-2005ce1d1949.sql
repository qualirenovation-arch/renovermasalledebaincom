-- Add follow-up tracking columns to quote_requests
ALTER TABLE public.quote_requests 
ADD COLUMN IF NOT EXISTS next_followup_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS last_contacted_at TIMESTAMP WITH TIME ZONE;

-- Create index for efficient follow-up queries
CREATE INDEX IF NOT EXISTS idx_quote_requests_next_followup 
ON public.quote_requests (next_followup_at) 
WHERE next_followup_at IS NOT NULL;