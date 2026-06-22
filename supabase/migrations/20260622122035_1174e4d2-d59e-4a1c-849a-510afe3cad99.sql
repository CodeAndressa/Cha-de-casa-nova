
CREATE TABLE public.couple_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.couple_photos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.couple_photos TO authenticated;
GRANT ALL ON public.couple_photos TO service_role;

ALTER TABLE public.couple_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view photos" ON public.couple_photos FOR SELECT USING (true);
CREATE POLICY "Admins manage photos" ON public.couple_photos FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER set_updated_at_couple_photos BEFORE UPDATE ON public.couple_photos
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
