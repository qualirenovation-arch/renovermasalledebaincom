
CREATE TABLE public.map_pin_positions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pin_id text NOT NULL UNIQUE,
  name text NOT NULL,
  area text NOT NULL,
  x numeric NOT NULL,
  y numeric NOT NULL,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

ALTER TABLE public.map_pin_positions ENABLE ROW LEVEL SECURITY;

-- Only admins can read/write pin positions
CREATE POLICY "Admins can manage pin positions"
ON public.map_pin_positions
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Public can read pin positions (needed to display the map)
CREATE POLICY "Public can read pin positions"
ON public.map_pin_positions
FOR SELECT
TO anon, authenticated
USING (true);

-- Seed with current values
INSERT INTO public.map_pin_positions (pin_id, name, area, x, y) VALUES
  ('buttes-chaumont',   'Buttes-Chaumont',   'Paris (19e)',     62, 34),
  ('rocroy',            'Rue de Rocroy',     'Paris (10e)',     57, 43),
  ('port-royal',        'Port-Royal',        'Paris (5e)',      55, 57),
  ('la-tour',           'Rue de la Tour',    'Paris (16e)',     41, 52),
  ('courbevoie-lalyre', 'Rue Ernest Lalyre', 'Courbevoie (92)', 33, 36)
ON CONFLICT (pin_id) DO NOTHING;
