
-- Create a public function to increment click_count (no auth needed)
CREATE OR REPLACE FUNCTION public.increment_album_click(album_slug text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  UPDATE public.albums 
  SET click_count = click_count + 1 
  WHERE slug = album_slug;
END;
$function$;
