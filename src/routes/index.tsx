import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { MapPin, Calendar, Clock, MessageCircle, Copy, Heart, Gift as GiftIcon, Check } from "lucide-react";

import coverImg from "@/assets/cover.jpg";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { CATEGORIES, type GiftCategory, type GiftStatus, categoryLabel, formatBRL, statusLabel } from "@/lib/categories";
import { useCountdown } from "@/hooks/use-countdown";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nosso Chá de Casa Nova" },
      { name: "description", content: "Confirme sua presença e veja nossa lista de presentes." },
      { property: "og:title", content: "Nosso Chá de Casa Nova" },
      { property: "og:description", content: "Confirme sua presença e veja nossa lista de presentes." },
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

function PublicPage() {
  const qc = useQueryClient();

  const { data: event } = useQuery({
    queryKey: ["event-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("event_settings").select("*").limit(1).maybeSingle();
      if (error) throw error;
      return data as EventSettings | null;
    },
  });

  const { data: gifts = [] } = useQuery({
    queryKey: ["gifts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gifts").select("*").order("sort_order").order("created_at");
      if (error) throw error;
      return (data ?? []) as Gift[];
    },
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

  const fullAddress = [event?.address, event?.complement, event?.city && event?.state ? `${event.city} - ${event.state}` : event?.city ?? event?.state]
    .filter(Boolean).join(", ");

  const [reserveGift, setReserveGift] = useState<Gift | null>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);

  const copyPix = async () => {
    if (!event?.pix_key) return;
    await navigator.clipboard.writeText(event.pix_key);
    toast.success("Chave Pix copiada!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={event?.cover_image_url || coverImg}
            alt=""
            width={1600}
            height={1024}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-24 text-center sm:pt-28 sm:pb-32">
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Você está convidado</p>
          <h1 className="mt-4 font-display text-5xl text-foreground sm:text-7xl">
            {event?.name ?? "Nosso Chá de Casa Nova"}
          </h1>
          {event?.welcome_text && (
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {event.welcome_text}
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-foreground/80">
            {event?.event_date && (
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(`${event.event_date}T00:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </span>
            )}
            {event?.event_time && (
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" /> {event.event_time.slice(0, 5)}
              </span>
            )}
          </div>

          {cd && !cd.finished && (
            <div className="mx-auto mt-10 grid max-w-md grid-cols-4 gap-2 sm:gap-4">
              {[
                { label: "dias", v: cd.days },
                { label: "horas", v: cd.hours },
                { label: "min", v: cd.minutes },
                { label: "seg", v: cd.seconds },
              ].map((x) => (
                <div key={x.label} className="rounded-2xl border bg-card/80 px-2 py-4 backdrop-blur-sm shadow-soft">
                  <div className="font-display text-3xl text-foreground sm:text-4xl">{String(x.v).padStart(2, "0")}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{x.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="rounded-full px-6" onClick={() => setRsvpOpen(true)}>
              Confirmar presença
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-6">
              <a href="#presentes"><GiftIcon className="mr-2 h-4 w-4" /> Ver lista de presentes</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Address */}
      {fullAddress && (
        <section className="mx-auto max-w-3xl px-6 py-12">
          <Card className="rounded-3xl p-6 sm:p-8 shadow-soft">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.25em] text-terracotta">Onde será</p>
                <h2 className="mt-2 font-display text-2xl text-foreground">Endereço</h2>
                <p className="mt-2 text-sm text-muted-foreground">{fullAddress}</p>
              </div>
              <Button asChild variant="outline" className="rounded-full">
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`} target="_blank" rel="noopener noreferrer">
                  <MapPin className="mr-2 h-4 w-4" /> Abrir no Google Maps
                </a>
              </Button>
            </div>
          </Card>
        </section>
      )}

      {/* Gifts */}
      <section id="presentes" className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Com carinho</p>
          <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">Lista de presentes</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Escolha um item para reservar ou contribua via Pix. Sua presença já é o nosso maior presente.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>Todas</FilterChip>
          {CATEGORIES.map((c) => (
            <FilterChip key={c.value} active={filter === c.value} onClick={() => setFilter(c.value)}>
              {c.label}
            </FilterChip>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((g) => (
            <GiftCard key={g.id} gift={g} onReserve={() => setReserveGift(g)} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-sm text-muted-foreground">Nenhum presente nesta categoria.</p>
          )}
        </div>
      </section>

      {/* Pix */}
      {(event?.pix_key || event?.pix_qr_url) && (
        <section className="bg-secondary/60 py-16">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Contribuir via Pix</p>
              <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">Se preferir, contribua via Pix</h2>
            </div>
            <Card className="mt-8 rounded-3xl p-6 sm:p-8 shadow-soft">
              <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
                {event?.pix_qr_url && (
                  <img src={event.pix_qr_url} alt="QR Code Pix" className="mx-auto h-44 w-44 rounded-2xl border bg-white p-2" />
                )}
                <div className="min-w-0 space-y-3">
                  {event?.pix_owner && (
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">Titular</p>
                      <p className="font-medium text-foreground">{event.pix_owner}</p>
                    </div>
                  )}
                  {event?.pix_key && (
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">Chave Pix</p>
                      <div className="mt-1 flex items-center gap-2">
                        <code className="flex-1 truncate rounded-lg border bg-background px-3 py-2 text-sm">{event.pix_key}</code>
                        <Button size="icon" variant="outline" onClick={copyPix} aria-label="Copiar chave Pix">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Photo gallery */}
      <PhotoGallery />

      {/* Message */}
      <MessageSection />

      {/* Footer */}
      <footer className="border-t bg-background py-10 text-center text-sm text-muted-foreground">
        {event?.whatsapp_phone && (
          <Button asChild variant="outline" className="rounded-full">
            <a href={`https://wa.me/${event.whatsapp_phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> Falar no WhatsApp
            </a>
          </Button>
        )}
        <p className="mt-6 flex items-center justify-center gap-1.5">
          Feito com <Heart className="h-3.5 w-3.5 fill-terracotta text-terracotta" /> para o nosso novo lar
        </p>
      </footer>

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

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
        active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  );
}

function GiftCard({ gift, onReserve }: { gift: Gift; onReserve: () => void }) {
  const isAvailable = gift.status === "disponivel";
  return (
    <Card className="group overflow-hidden rounded-3xl p-0 shadow-soft transition-all hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {gift.image_url ? (
          <img src={gift.image_url} alt={gift.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <GiftIcon className="h-12 w-12 text-muted-foreground/40" />
          </div>
        )}
        <Badge className={`absolute left-3 top-3 rounded-full border-0 ${
          gift.status === "disponivel" ? "bg-olive text-olive-foreground"
          : gift.status === "reservado" ? "bg-accent text-accent-foreground"
          : "bg-terracotta text-terracotta-foreground"
        }`}>
          {statusLabel(gift.status)}
        </Badge>
      </div>
      <div className="p-5">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{categoryLabel(gift.category)}</p>
        <h3 className="mt-1 font-display text-xl text-foreground">{gift.name}</h3>
        {gift.description && <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{gift.description}</p>}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">{formatBRL(gift.estimated_value)}</span>
          <Button size="sm" disabled={!isAvailable} onClick={onReserve} className="rounded-full">
            {isAvailable ? "Quero presentear" : "Indisponível"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

function ReserveDialog({ gift, onClose, onSuccess }: { gift: Gift | null; onClose: () => void; onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"reservado" | "presenteado">("reservado");

  const mutation = useMutation({
    mutationFn: async () => {
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
      toast.success(status === "presenteado" ? "Obrigado pelo presente!" : "Presente reservado com sucesso!");
      setName(""); setPhone(""); setMessage(""); setStatus("reservado");
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
            <Input id="r-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required />
          </div>
          <div>
            <Label htmlFor="r-phone">Telefone</Label>
            <Input id="r-phone" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={30} placeholder="(11) 99999-9999" />
          </div>
          <div>
            <Label htmlFor="r-msg">Mensagem (opcional)</Label>
            <Textarea id="r-msg" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={500} rows={3} />
          </div>
          <div>
            <Label>Você deseja</Label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setStatus("reservado")} className={`rounded-xl border p-3 text-sm transition-all ${status === "reservado" ? "border-primary bg-secondary" : "border-border"}`}>
                Reservar (vou levar)
              </button>
              <button type="button" onClick={() => setStatus("presenteado")} className={`rounded-xl border p-3 text-sm transition-all ${status === "presenteado" ? "border-primary bg-secondary" : "border-border"}`}>
                Já presenteado
              </button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
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
      const { error } = await supabase.from("rsvps").insert({
        name: name.trim(), phone: phone.trim() || null, guests_count: guests, message: message.trim() || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Presença confirmada! Te esperamos.");
      setName(""); setPhone(""); setGuests(1); setMessage("");
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
            <Input id="v-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
          </div>
          <div className="grid grid-cols-[1fr_100px] gap-3">
            <div>
              <Label htmlFor="v-phone">Telefone</Label>
              <Input id="v-phone" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={30} />
            </div>
            <div>
              <Label htmlFor="v-g">Pessoas</Label>
              <Input id="v-g" type="number" min={1} max={20} value={guests} onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))} />
            </div>
          </div>
          <div>
            <Label htmlFor="v-msg">Mensagem (opcional)</Label>
            <Textarea id="v-msg" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={500} rows={3} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={() => mutation.mutate()} disabled={!name.trim() || mutation.isPending}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PhotoGallery() {
  const { data: photos = [] } = useQuery({
    queryKey: ["couple-photos"],
    queryFn: async () => {
      const { data, error } = await supabase.from("couple_photos").select("*").order("sort_order").order("created_at");
      if (error) throw error;
      return data ?? [];
    },
  });
  if (photos.length === 0) return null;
  const tilts = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1", "rotate-0", "-rotate-2"];
  return (
    <section className="bg-forest/5 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Nossa história</p>
          <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">Momentos do casal</h2>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(photos as { id: string; image_url: string; caption: string | null }[]).map((p, i) => (
            <div key={p.id} className={`${tilts[i % tilts.length]} transition-transform hover:rotate-0 hover:scale-[1.02]`}>
              <div className="rounded-[2px] bg-card p-3 pb-10 shadow-card ring-1 ring-border">
                <div className="aspect-[4/5] overflow-hidden rounded-[2px] bg-secondary">
                  <img src={p.image_url} alt={p.caption ?? ""} loading="lazy" className="h-full w-full object-cover" />
                </div>
                {p.caption && (
                  <p className="mt-3 text-center font-display text-sm italic text-foreground/80">{p.caption}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MessageSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("guest_messages").insert({ name: name.trim(), message: message.trim() });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Mensagem enviada com carinho!");
      setName(""); setMessage("");
    },
    onError: (e: Error) => toast.error(e.message || "Erro ao enviar"),
  });

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Deixe uma mensagem</p>
        <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">Um recado para os novos moradores</h2>
      </div>
      <Card className="mt-8 rounded-3xl p-6 sm:p-8 shadow-soft">
        <div className="space-y-3">
          <div>
            <Label htmlFor="m-name">Seu nome</Label>
            <Input id="m-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
          </div>
          <div>
            <Label htmlFor="m-msg">Mensagem</Label>
            <Textarea id="m-msg" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={1000} rows={4} />
          </div>
          <Button className="w-full rounded-full" onClick={() => mutation.mutate()} disabled={!name.trim() || !message.trim() || mutation.isPending}>
            Enviar mensagem
          </Button>
        </div>
      </Card>
    </section>
  );
}
