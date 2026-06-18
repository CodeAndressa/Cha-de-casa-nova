
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Tighten anon insert policies with length checks
DROP POLICY IF EXISTS "Anyone can rsvp" ON public.rsvps;
CREATE POLICY "Anyone can rsvp" ON public.rsvps FOR INSERT TO anon, authenticated
  WITH CHECK (char_length(name) BETWEEN 1 AND 100 AND (phone IS NULL OR char_length(phone) <= 30) AND (message IS NULL OR char_length(message) <= 1000));

DROP POLICY IF EXISTS "Anyone can post message" ON public.guest_messages;
CREATE POLICY "Anyone can post message" ON public.guest_messages FOR INSERT TO anon, authenticated
  WITH CHECK (char_length(name) BETWEEN 1 AND 100 AND char_length(message) BETWEEN 1 AND 1000);
