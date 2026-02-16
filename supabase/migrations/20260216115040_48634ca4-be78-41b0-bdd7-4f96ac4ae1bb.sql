
-- Add columns for two-step form system
ALTER TABLE public.quote_requests 
  ADD COLUMN IF NOT EXISTS access_token TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS lead_status TEXT NOT NULL DEFAULT 'etape_1',
  ADD COLUMN IF NOT EXISTS project_type TEXT,
  ADD COLUMN IF NOT EXISTS project_room_type TEXT,
  ADD COLUMN IF NOT EXISTS callback_requested BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS callback_requested_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS step2_completed_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS photo_urls TEXT[] DEFAULT '{}';

-- Create index on access_token for fast lookup
CREATE INDEX IF NOT EXISTS idx_quote_requests_access_token ON public.quote_requests (access_token) WHERE access_token IS NOT NULL;

-- Create storage bucket for project photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-photos', 'project-photos', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for project photos
CREATE POLICY "Anyone can upload project photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-photos');

CREATE POLICY "Anyone can view project photos via token"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-photos');
