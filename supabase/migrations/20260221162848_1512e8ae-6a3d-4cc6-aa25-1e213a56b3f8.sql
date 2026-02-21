-- Add static_slug column for mapping to albumsData.ts static slugs
ALTER TABLE public.albums ADD COLUMN static_slug text;

-- Create index for faster lookups
CREATE INDEX idx_albums_static_slug ON public.albums(static_slug) WHERE static_slug IS NOT NULL;