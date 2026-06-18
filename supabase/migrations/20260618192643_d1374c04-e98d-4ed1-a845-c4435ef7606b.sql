
-- Enums
CREATE TYPE public.gift_category AS ENUM ('cozinha','banheiro','lavanderia','sala','quarto','decoracao','utilidades','outros');
CREATE TYPE public.gift_status AS ENUM ('disponivel','reservado','presenteado');
CREATE TYPE public.app_role AS ENUM ('admin','user');

-- Updated at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- User roles (standard secure pattern)
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- Event settings (singleton)
CREATE TABLE public.event_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Chá de Casa Nova',
  event_date date,
  event_time time,
  address text,
  city text,
  state text,
  complement text,
  welcome_text text,
  cover_image_url text,
  pix_key text,
  pix_owner text,
  pix_qr_url text,
  whatsapp_phone text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.event_settings TO anon, authenticated;
GRANT ALL ON public.event_settings TO authenticated;
GRANT ALL ON public.event_settings TO service_role;
ALTER TABLE public.event_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view event" ON public.event_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage event" ON public.event_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_event_settings_updated BEFORE UPDATE ON public.event_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Gifts
CREATE TABLE public.gifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category public.gift_category NOT NULL DEFAULT 'outros',
  description text,
  estimated_value numeric(10,2),
  image_url text,
  external_link text,
  quantity int NOT NULL DEFAULT 1,
  status public.gift_status NOT NULL DEFAULT 'disponivel',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gifts TO anon, authenticated;
GRANT ALL ON public.gifts TO authenticated;
GRANT ALL ON public.gifts TO service_role;
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view gifts" ON public.gifts FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage gifts" ON public.gifts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_gifts_updated BEFORE UPDATE ON public.gifts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Reservations
CREATE TABLE public.gift_reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gift_id uuid NOT NULL REFERENCES public.gifts(id) ON DELETE CASCADE,
  guest_name text NOT NULL,
  phone text,
  message text,
  status public.gift_status NOT NULL DEFAULT 'reservado',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.gift_reservations TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.gift_reservations TO authenticated;
GRANT ALL ON public.gift_reservations TO service_role;
ALTER TABLE public.gift_reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view reservations" ON public.gift_reservations FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage reservations" ON public.gift_reservations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Function to reserve gift (anon-callable, atomically updates status)
CREATE OR REPLACE FUNCTION public.reserve_gift(
  _gift_id uuid, _guest_name text, _phone text, _message text, _status public.gift_status
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _res_id uuid; _current public.gift_status;
BEGIN
  IF _status NOT IN ('reservado','presenteado') THEN RAISE EXCEPTION 'invalid status'; END IF;
  SELECT status INTO _current FROM public.gifts WHERE id = _gift_id FOR UPDATE;
  IF _current IS NULL THEN RAISE EXCEPTION 'gift not found'; END IF;
  IF _current <> 'disponivel' THEN RAISE EXCEPTION 'gift unavailable'; END IF;
  INSERT INTO public.gift_reservations(gift_id, guest_name, phone, message, status)
    VALUES (_gift_id, _guest_name, _phone, _message, _status) RETURNING id INTO _res_id;
  UPDATE public.gifts SET status = _status WHERE id = _gift_id;
  RETURN _res_id;
END; $$;
GRANT EXECUTE ON FUNCTION public.reserve_gift(uuid,text,text,text,public.gift_status) TO anon, authenticated;

-- RSVPs
CREATE TABLE public.rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text,
  guests_count int NOT NULL DEFAULT 1,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.rsvps TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.rsvps TO authenticated;
GRANT ALL ON public.rsvps TO service_role;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can rsvp" ON public.rsvps FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins manage rsvps" ON public.rsvps FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Guest Messages
CREATE TABLE public.guest_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.guest_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.guest_messages TO authenticated;
GRANT ALL ON public.guest_messages TO service_role;
ALTER TABLE public.guest_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can post message" ON public.guest_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins manage messages" ON public.guest_messages FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Auto-grant admin to first signup
CREATE OR REPLACE FUNCTION public.bootstrap_first_admin() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles(user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.bootstrap_first_admin();

-- Seed event settings row
INSERT INTO public.event_settings (name, welcome_text, city, state)
VALUES ('Nosso Chá de Casa Nova', 'Estamos começando uma nova etapa e queremos celebrar ao seu lado. Sua presença é o nosso maior presente — e se quiser nos ajudar a montar nosso novo lar, deixamos algumas sugestões com muito carinho.', 'São Paulo', 'SP');

-- Seed a few gifts
INSERT INTO public.gifts (name, category, description, estimated_value, sort_order) VALUES
('Jogo de Panelas', 'cozinha', 'Conjunto antiaderente com 5 peças', 450.00, 1),
('Conjunto de Toalhas', 'banheiro', 'Toalhas de banho e rosto em algodão', 180.00, 2),
('Cesto de Roupas', 'lavanderia', 'Cesto organizador de roupas', 120.00, 3),
('Almofadas Decorativas', 'sala', 'Par de almofadas em tons neutros', 160.00, 4),
('Jogo de Lençóis Queen', 'quarto', '100% algodão, 400 fios', 320.00, 5),
('Vaso Decorativo', 'decoracao', 'Vaso de cerâmica artesanal', 140.00, 6),
('Ferro de Passar', 'utilidades', 'Ferro a vapor com base cerâmica', 220.00, 7);
