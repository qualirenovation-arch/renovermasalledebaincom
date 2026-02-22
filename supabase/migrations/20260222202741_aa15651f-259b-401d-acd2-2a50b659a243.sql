-- Add show_in_hero column to albums table
ALTER TABLE public.albums ADD COLUMN show_in_hero boolean NOT NULL DEFAULT false;

-- Set initial hero albums based on current hardcoded list
UPDATE public.albums SET show_in_hero = true WHERE static_slug IN (
  'paris10-dore',
  'nicolas-roret',
  'cours-vincennes-sdb',
  'cours-vincennes-madame',
  'cours-vincennes-wc',
  'cherche-midi',
  'matignon',
  'st-honore',
  'montreuil-suite',
  'vincennes-mr'
);