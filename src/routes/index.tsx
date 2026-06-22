import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  MapPin,
  Calendar,
  Clock,
  MessageCircle,
  Copy,
  Heart,
  Gift as GiftIcon,
  Check,
  Sparkles,
} from "lucide-react";

import coverImg from "@/assets/cover.jpg";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  CATEGORIES,
  type GiftCategory,
  type GiftStatus,
  categoryLabel,
  formatBRL,
  statusLabel,
} from "@/lib/categories";
import { useCountdown } from "@/hooks/use-countdown";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nosso Chá de Casa Nova" },
      { name: "description", content: "Confirme sua presença e veja nossa lista de presentes." },
      { property: "og:title", content: "Nosso Chá de Casa Nova" },
      {
        property: "og:description",
        content: "Confirme sua presença e veja nossa lista de presentes.",
      },
    ],
  }),
  component: PublicPage,
});

type EventSettings = {
  id: string;
  name: string;
  event_date: string | null;
  event_time: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  complement: string | null;
  welcome_text: string | null;
  cover_image_url: string | null;
  pix_key: string | null;
  pix_owner: string | null;
  pix_qr_url: string | null;
  whatsapp_phone: string | null;
};

type Gift = {
  id: string;
  name: string;
  category: GiftCategory;
  description: string | null;
  estimated_value: number | null;
  image_url: string | null;
  external_link: string | null;
  quantity: number;
  status: GiftStatus;
};

type CouplePhoto = {
  id: string;
  image_url: string;
  caption: string | null;
};

function PublicPage() {
  const qc = useQueryClient();

  const { data: event } = useQuery({
    queryKey: ["event-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("event_settings")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) {
        console.warn("[public-page] event_settings query failed", error);
        return null;
      }
      return data as EventSettings | null;
    },
    enabled: isSupabaseConfigured,
  });

  const { data: gifts = [] } = useQuery({
    queryKey: ["gifts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gifts")
        .select("*")
        .order("sort_order")
        .order("created_at");
      if (error) {
        console.warn("[public-page] gifts query failed", error);
        return [] as Gift[];
      }
      return (data ?? []) as Gift[];
    },
    enabled: isSupabaseConfigured,
  });

  const { data: photos = [] } = useQuery({
    queryKey: ["couple-photos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("couple_photos")
        .select("*")
        .order("sort_order")
        .order("created_at");
      if (error) {
        console.warn("[public-page] couple_photos query failed", error);
        return [] as CouplePhoto[];
      }
      return (data ?? []) as CouplePhoto[];
    },
    enabled: isSupabaseConfigured,
  });

  const [filter, setFilter] = useState<"all" | GiftCategory>("all");
  const filtered = useMemo(
    () => (filter === "all" ? gifts : gifts.filter((g) => g.category === filter)),
    [gifts, filter],
  );

  const eventDateTime = useMemo(() => {
    if (!event?.event_date) return null;
    const t = event.event_time ?? "19:00";
    return new Date(`${event.event_date}T${t}`);
  }, [event]);
  const cd = useCountdown(eventDateTime);

  const fullAddress = [
    event?.address,
    event?.complement,
    event?.city && event?.state ? `${event.city} - ${event.state}` : (event?.city ?? event?.state),
  ]
    .filter(Boolean)
    .join(", ");

  const [reserveGift, setReserveGift] = useState<Gift | null>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);

  const copyPix = async () => {
    if (!event?.pix_key) return;
    await navigator.clipboard.writeText(event.pix_key);
    toast.success("Chave Pix copiada!");
  };

  return (
    <div className="relative min-h-screen isolate overflow-hidden bg-background text-foreground">
      <FloatingPhotoBackground photos={photos} fallback={event?.cover_image_url || coverImg} />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_20%_10%,oklch(0.92_0.05_115_/_0.58),transparent_34%),linear-gradient(180deg,oklch(0.98_0.018_118_/_0.82),oklch(0.94_0.025_122_/_0.76)_48%,oklch(0.98_0.012_105_/_0.86))]" />

      <main className="relative z-10">
        <header className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
          <nav className="flex items-center justify-between rounded-lg border border-white/60 bg-white/55 px-4 py-3 shadow-premium backdrop-blur-xl">
            <a href="#top" className="font-display text-xl text-forest">
              Chá de Casa Nova
            </a>
            <div className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.22em] text-foreground/65 sm:flex">
              <a href="#presentes" className="transition hover:text-forest">
                Presentes
              </a>
              <a href="#pix" className="transition hover:text-forest">
                Pix
              </a>
              <a href="#recado" className="transition hover:text-forest">
                Recado
              </a>
            </div>
            <Button size="sm" className="rounded-lg px-4" onClick={() => setRsvpOpen(true)}>
              Confirmar
            </Button>
          </nav>

          <section
            id="top"
            className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-10"
          >
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-terracotta/20 bg-white/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-terracotta shadow-soft backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Você está convidado
              </div>
              <h1 className="mt-7 font-display text-5xl leading-[0.95] text-forest sm:text-7xl lg:text-8xl">
                {event?.name ?? "Nosso Chá de Casa Nova"}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/72 sm:text-lg">
                {event?.welcome_text ??
                  "Uma tarde para celebrar o novo lar, dividir histórias boas e receber quem faz parte da nossa vida."}
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-foreground/75">
                {event?.event_date && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/65 bg-white/55 px-4 py-2 shadow-soft backdrop-blur">
                    <Calendar className="h-4 w-4 text-terracotta" />
                    {new Date(`${event.event_date}T00:00:00`).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}
                {event?.event_time && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/65 bg-white/55 px-4 py-2 shadow-soft backdrop-blur">
                    <Clock className="h-4 w-4 text-terracotta" /> {event.event_time.slice(0, 5)}
                  </span>
                )}
                {event?.city && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/65 bg-white/55 px-4 py-2 shadow-soft backdrop-blur">
                    <MapPin className="h-4 w-4 text-terracotta" /> {event.city}
                    {event.state ? ` - ${event.state}` : ""}
                  </span>
                )}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  className="rounded-lg px-7 shadow-premium"
                  onClick={() => setRsvpOpen(true)}
                >
                  Confirmar presença
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-lg border-white/70 bg-white/55 px-7 backdrop-blur"
                >
                  <a href="#presentes">
                    <GiftIcon className="mr-2 h-4 w-4" /> Ver lista
                  </a>
                </Button>
              </div>
            </div>

            <aside className="rounded-lg border border-white/70 bg-white/58 p-4 shadow-premium backdrop-blur-2xl sm:p-5">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={event?.cover_image_url || coverImg}
                  alt="Foto do casal"
                  width={900}
                  height={1100}
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/80 to-transparent p-5 text-white">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/75">Novo lar</p>
                  <p className="mt-2 font-display text-3xl">Memórias, afeto e casa cheia</p>
                </div>
              </div>

              {cd && !cd.finished && (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {[
                    { label: "dias", v: cd.days },
                    { label: "horas", v: cd.hours },
                    { label: "min", v: cd.minutes },
                    { label: "seg", v: cd.seconds },
                  ].map((x) => (
                    <div
                      key={x.label}
                      className="rounded-lg border border-forest/10 bg-card/78 px-2 py-3 text-center shadow-soft backdrop-blur"
                    >
                      <div className="font-display text-3xl text-forest">
                        {String(x.v).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {x.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </aside>
          </section>
        </header>

        {fullAddress && (
          <section className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
            <Card className="rounded-lg border-white/70 bg-white/62 p-5 shadow-premium backdrop-blur-xl sm:p-7">
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.25em] text-terracotta">Onde será</p>
                  <h2 className="mt-2 font-display text-3xl text-forest">Endereço</h2>
                  <p className="mt-2 text-sm leading-6 text-foreground/70">{fullAddress}</p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-lg border-forest/15 bg-white/60"
                >
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="mr-2 h-4 w-4" /> Abrir no Maps
                  </a>
                </Button>
              </div>
            </Card>
          </section>
        )}

        <section id="presentes" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Com carinho</p>
            <h2 className="mt-3 font-display text-5xl text-forest sm:text-6xl">
              Lista de presentes
            </h2>
            <p className="mt-4 text-sm leading-7 text-foreground/68">
              Escolha um item para reservar ou contribua via Pix. Sua presença já é o nosso maior
              presente.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
              Todas
            </FilterChip>
            {CATEGORIES.map((c) => (
              <FilterChip
                key={c.value}
                active={filter === c.value}
                onClick={() => setFilter(c.value)}
              >
                {c.label}
              </FilterChip>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((g) => (
              <GiftCard key={g.id} gift={g} onReserve={() => setReserveGift(g)} />
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full rounded-lg border border-white/70 bg-white/55 px-5 py-10 text-center text-sm text-muted-foreground backdrop-blur">
                Nenhum presente nesta categoria.
              </p>
            )}
          </div>
        </section>

        {(event?.pix_key || event?.pix_qr_url) && (
          <section id="pix" className="px-5 py-16 sm:px-8">
            <div className="mx-auto max-w-4xl rounded-lg border border-white/70 bg-forest/92 p-6 text-forest-foreground shadow-premium backdrop-blur-xl sm:p-8">
              <div className="grid gap-7 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/62">
                    Contribuir via Pix
                  </p>
                  <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">
                    Um mimo para o novo lar
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/70">
                    Se preferir, você também pode contribuir por Pix de forma simples.
                  </p>
                </div>
                <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
                  {event?.pix_qr_url && (
                    <img
                      src={event.pix_qr_url}
                      alt="QR Code Pix"
                      className="mx-auto h-40 w-40 rounded-lg border border-white/20 bg-white p-2"
                    />
                  )}
                  <div className="min-w-0 space-y-4">
                    {event?.pix_owner && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-white/55">Titular</p>
                        <p className="font-medium text-white">{event.pix_owner}</p>
                      </div>
                    )}
                    {event?.pix_key && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-white/55">Chave Pix</p>
                        <div className="mt-2 flex items-center gap-2">
                          <code className="flex-1 truncate rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-white">
                            {event.pix_key}
                          </code>
                          <Button
                            size="icon"
                            variant="secondary"
                            onClick={copyPix}
                            aria-label="Copiar chave Pix"
                            className="rounded-lg"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <MessageSection />

        <footer className="mx-auto max-w-7xl px-5 pb-10 pt-2 text-center text-sm text-muted-foreground sm:px-8">
          <div className="rounded-lg border border-white/70 bg-white/60 px-5 py-8 shadow-soft backdrop-blur-xl">
            {event?.whatsapp_phone && (
              <Button asChild variant="outline" className="rounded-lg border-forest/15 bg-white/70">
                <a
                  href={`https://wa.me/${event.whatsapp_phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> Falar no WhatsApp
                </a>
              </Button>
            )}
            <p className="mt-6 flex items-center justify-center gap-1.5">
              Feito com <Heart className="h-3.5 w-3.5 fill-terracotta text-terracotta" /> para o
              nosso novo lar
            </p>
          </div>
        </footer>
      </main>

      <ReserveDialog
        gift={reserveGift}
        onClose={() => setReserveGift(null)}
        onSuccess={() => {
          qc.invalidateQueries({ queryKey: ["gifts"] });
          setReserveGift(null);
        }}
      />
      <RsvpDialog open={rsvpOpen} onOpenChange={setRsvpOpen} />
    </div>
  );
}

function FloatingPhotoBackground({
  photos,
  fallback,
}: {
  photos: CouplePhoto[];
  fallback: string;
}) {
  const backgroundPhotos =
    photos.length > 0 ? photos : [{ id: "fallback", image_url: fallback, caption: null }];
  const items = backgroundPhotos.slice(0, 9);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((photo, index) => (
        <div key={`${photo.id}-${index}`} className={`floating-photo floating-photo-${index + 1}`}>
          <img src={photo.image_url} alt="" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
        active
          ? "border-forest bg-forest text-forest-foreground shadow-soft"
          : "border-white/70 bg-white/58 text-foreground/72 backdrop-blur hover:border-forest/30 hover:text-forest"
      }`}
    >
      {children}
    </button>
  );
}

function GiftCard({ gift, onReserve }: { gift: Gift; onReserve: () => void }) {
  const isAvailable = gift.status === "disponivel";
  return (
    <Card className="group overflow-hidden rounded-lg border-white/70 bg-white/68 p-0 shadow-soft backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-premium">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {gift.image_url ? (
          <img
            src={gift.image_url}
            alt={gift.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-sand to-secondary">
            <GiftIcon className="h-12 w-12 text-muted-foreground/40" />
          </div>
        )}
        <Badge
          className={`absolute left-3 top-3 rounded-full border-0 ${
            gift.status === "disponivel"
              ? "bg-olive text-olive-foreground"
              : gift.status === "reservado"
                ? "bg-accent text-accent-foreground"
                : "bg-terracotta text-terracotta-foreground"
          }`}
        >
          {statusLabel(gift.status)}
        </Badge>
      </div>
      <div className="p-5">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {categoryLabel(gift.category)}
        </p>
        <h3 className="mt-1 font-display text-2xl leading-tight text-forest">{gift.name}</h3>
        {gift.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {gift.description}
          </p>
        )}
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-foreground">
            {formatBRL(gift.estimated_value)}
          </span>
          <Button size="sm" disabled={!isAvailable} onClick={onReserve} className="rounded-lg">
            {isAvailable ? "Quero presentear" : "Indisponível"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

function ReserveDialog({
  gift,
  onClose,
  onSuccess,
}: {
  gift: Gift | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"reservado" | "presenteado">("reservado");

  const mutation = useMutation({
    mutationFn: async () => {
      if (!isSupabaseConfigured)
        throw new Error("Configure as variaveis do Supabase para reservar presentes.");
      if (!gift) return;
      const { error } = await supabase.rpc("reserve_gift", {
        _gift_id: gift.id,
        _guest_name: name.trim(),
        _phone: phone.trim() || "",
        _message: message.trim() || "",
        _status: status,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(
        status === "presenteado" ? "Obrigado pelo presente!" : "Presente reservado com sucesso!",
      );
      setName("");
      setPhone("");
      setMessage("");
      setStatus("reservado");
      onSuccess();
    },
    onError: (e: Error) => toast.error(e.message || "Não foi possível reservar"),
  });

  return (
    <Dialog open={!!gift} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Quero presentear</DialogTitle>
          <DialogDescription>{gift?.name}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label htmlFor="r-name">Seu nome</Label>
            <Input
              id="r-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              required
            />
          </div>
          <div>
            <Label htmlFor="r-phone">Telefone</Label>
            <Input
              id="r-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={30}
              placeholder="(11) 99999-9999"
            />
          </div>
          <div>
            <Label htmlFor="r-msg">Mensagem (opcional)</Label>
            <Textarea
              id="r-msg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              rows={3}
            />
          </div>
          <div>
            <Label>Você deseja</Label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStatus("reservado")}
                className={`rounded-lg border p-3 text-sm transition-all ${status === "reservado" ? "border-primary bg-secondary" : "border-border"}`}
              >
                Reservar (vou levar)
              </button>
              <button
                type="button"
                onClick={() => setStatus("presenteado")}
                className={`rounded-lg border p-3 text-sm transition-all ${status === "presenteado" ? "border-primary bg-secondary" : "border-border"}`}
              >
                Já presenteado
              </button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => mutation.mutate()} disabled={!name.trim() || mutation.isPending}>
            <Check className="mr-2 h-4 w-4" /> Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function RsvpDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      if (!isSupabaseConfigured)
        throw new Error("Configure as variaveis do Supabase para confirmar presenca.");
      const { error } = await supabase.from("rsvps").insert({
        name: name.trim(),
        phone: phone.trim() || null,
        guests_count: guests,
        message: message.trim() || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Presença confirmada! Te esperamos.");
      setName("");
      setPhone("");
      setGuests(1);
      setMessage("");
      onOpenChange(false);
    },
    onError: (e: Error) => toast.error(e.message || "Erro ao confirmar"),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Confirmar presença</DialogTitle>
          <DialogDescription>Mal podemos esperar para receber você.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label htmlFor="v-name">Nome</Label>
            <Input
              id="v-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
            />
          </div>
          <div className="grid grid-cols-[1fr_100px] gap-3">
            <div>
              <Label htmlFor="v-phone">Telefone</Label>
              <Input
                id="v-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={30}
              />
            </div>
            <div>
              <Label htmlFor="v-g">Pessoas</Label>
              <Input
                id="v-g"
                type="number"
                min={1}
                max={20}
                value={guests}
                onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="v-msg">Mensagem (opcional)</Label>
            <Textarea
              id="v-msg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={() => mutation.mutate()} disabled={!name.trim() || mutation.isPending}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function MessageSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      if (!isSupabaseConfigured)
        throw new Error("Configure as variaveis do Supabase para enviar mensagens.");
      const { error } = await supabase
        .from("guest_messages")
        .insert({ name: name.trim(), message: message.trim() });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Mensagem enviada com carinho!");
      setName("");
      setMessage("");
    },
    onError: (e: Error) => toast.error(e.message || "Erro ao enviar"),
  });

  return (
    <section id="recado" className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Deixe uma mensagem</p>
        <h2 className="mt-3 font-display text-4xl text-forest sm:text-5xl">
          Um recado para os novos moradores
        </h2>
      </div>
      <Card className="mt-8 rounded-lg border-white/70 bg-white/66 p-5 shadow-premium backdrop-blur-xl sm:p-7">
        <div className="space-y-4">
          <div>
            <Label htmlFor="m-name">Seu nome</Label>
            <Input
              id="m-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
            />
          </div>
          <div>
            <Label htmlFor="m-msg">Mensagem</Label>
            <Textarea
              id="m-msg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={1000}
              rows={4}
            />
          </div>
          <Button
            className="w-full rounded-lg"
            onClick={() => mutation.mutate()}
            disabled={!name.trim() || !message.trim() || mutation.isPending}
          >
            Enviar mensagem
          </Button>
        </div>
      </Card>
    </section>
  );
}
