
-- ===== ALBUMS =====
CREATE TABLE public.albums (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text,
  location text NOT NULL,
  description text NOT NULL DEFAULT '',
  cover_image text NOT NULL DEFAULT '',
  is_in_progress boolean NOT NULL DEFAULT false,
  is_featured boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  category text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read albums" ON public.albums
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage albums" ON public.albums
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_albums_updated_at
  BEFORE UPDATE ON public.albums
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ===== ALBUM PHOTOS =====
CREATE TABLE public.album_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id uuid NOT NULL REFERENCES public.albums(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  title text NOT NULL DEFAULT '',
  description text,
  alt_text text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.album_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read album photos" ON public.album_photos
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage album photos" ON public.album_photos
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ===== ALBUM SEO =====
CREATE TABLE public.album_seo (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id uuid UNIQUE NOT NULL REFERENCES public.albums(id) ON DELETE CASCADE,
  meta_title text,
  meta_description text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.album_seo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read album SEO" ON public.album_seo
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage album SEO" ON public.album_seo
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_album_seo_updated_at
  BEFORE UPDATE ON public.album_seo
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ===== ALBUM TAGS =====
CREATE TABLE public.album_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id uuid NOT NULL REFERENCES public.albums(id) ON DELETE CASCADE,
  tag text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(album_id, tag)
);

ALTER TABLE public.album_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read album tags" ON public.album_tags
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage album tags" ON public.album_tags
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ===== INDEX PERFORMANCE =====
CREATE INDEX idx_albums_slug ON public.albums(slug);
CREATE INDEX idx_albums_display_order ON public.albums(display_order);
CREATE INDEX idx_albums_is_in_progress ON public.albums(is_in_progress);
CREATE INDEX idx_album_photos_album_id ON public.album_photos(album_id);
CREATE INDEX idx_album_photos_order ON public.album_photos(album_id, display_order);
CREATE INDEX idx_album_seo_album_id ON public.album_seo(album_id);
CREATE INDEX idx_album_tags_album_id ON public.album_tags(album_id);
CREATE INDEX idx_album_tags_tag ON public.album_tags(tag);
