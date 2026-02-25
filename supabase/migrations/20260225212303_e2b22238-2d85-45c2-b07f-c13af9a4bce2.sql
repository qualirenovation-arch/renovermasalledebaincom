
-- Add new fields for Réalisations page management
ALTER TABLE public.albums 
  ADD COLUMN IF NOT EXISTS is_featured_realisations boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS featured_realisations_order integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS click_count integer NOT NULL DEFAULT 0;

-- Index for efficient querying
CREATE INDEX IF NOT EXISTS idx_albums_featured_realisations ON public.albums (is_featured_realisations, featured_realisations_order ASC);
CREATE INDEX IF NOT EXISTS idx_albums_click_count ON public.albums (click_count DESC);
