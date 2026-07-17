import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  MapPin,
  Calendar,
  Clock,
  MessageCircle,
  MessageSquare,
  Copy,
  Heart,
  Gift as GiftIcon,
  Check,
  ArrowLeft,
  ExternalLink,
  Armchair,
  LampFloor,
  Sofa,
  TableProperties,
} from "lucide-react";

import coverImg from "@/assets/cover.jpg";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";
import { GlowCard } from "@/components/ui/spotlight-card";
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

function parseGiftLinks(external_link: string | null): { label: string; url: string }[] {
  if (!external_link) return [];
  if (external_link.trim().startsWith("[")) {
    try { return JSON.parse(external_link); } catch { /* fall through */ }
  }
  return [{ label: "Ver produto", url: external_link }];
}

type PixTier = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
  description: string;
};

const PIX_TIERS: PixTier[] = [
  {
    id: "detalhe",
    icon: Heart,
    value: 50,
    label: "Um detalhe para o lar",
    description: "Para aqueles pequenos detalhes que, misteriosamente, só aparecem depois da mudança.",
  },
  {
    id: "luz",
    icon: LampFloor,
    value: 100,
    label: "Um cantinho iluminado",
    description: "Uma ajudinha para iluminar a casa — porque viver no escuro só é romântico no cinema.",
  },
  {
    id: "poltrona",
    icon: Armchair,
    value: 150,
    label: "Um lugar para receber",
    description: "Para montarmos um cantinho confortável e recebermos vocês sem disputar a única cadeira.",
  },
  {
    id: "sofa",
    icon: Sofa,
    value: 250,
    label: "Um pedacinho do sofá",
    description: "Um pedacinho do sofá onde vamos maratonar séries e negociar quem fica com o controle.",
  },
  {
    id: "moveis",
    icon: TableProperties,
    value: 400,
    label: "Um móvel mais perto",
    description: "Uma força e tanto para o próximo móvel — e menos uma caixa fazendo papel de mesa.",
  },
];

const TIER_GRADIENTS = [
  "from-[oklch(0.38_0.13_152)] to-[oklch(0.24_0.09_158)]",
  "from-[oklch(0.34_0.11_145)] to-[oklch(0.22_0.08_152)]",
  "from-[oklch(0.43_0.14_148)] to-[oklch(0.28_0.10_155)]",
  "from-[oklch(0.31_0.10_138)] to-[oklch(0.20_0.08_150)]",
  "from-[oklch(0.26_0.13_157)] to-[oklch(0.17_0.11_163)]",
];

const OPEN_HOUSE_DATE = "2026-08-08";
const OPEN_HOUSE_TIME = "15:00";
const OPEN_HOUSE_FALLBACK_TEXT =
  "Casa aberta para celebrar o novo lar, receber pessoas queridas e brindar essa fase com carinho.";

const MONTHS_PT_BR = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

function formatEventDate(value: string | null | undefined) {
  const [year, month, day] = (value ?? OPEN_HOUSE_DATE).split("-").map(Number);
  const monthLabel = MONTHS_PT_BR[month - 1];

  if (!year || !monthLabel || !day) return "Data a confirmar";
  return `${String(day).padStart(2, "0")} ${monthLabel} ${year}`;
}

const localBackgroundPhotoUrls = Object.values(
  import.meta.glob<string>("/src/assets/background-photos/*.{jpg,jpeg,png,webp,avif}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
);

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

type View = "hero" | "contribuicoes" | "recado";

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

  const isPixCota = (g: Gift) => !!g.description?.toLowerCase().startsWith("cota pix");

  const [view, setView] = useState<View>("hero");

  const eventDateTime = useMemo(() => {
    const date = event?.event_date ?? OPEN_HOUSE_DATE;
    const time = event?.event_time ?? OPEN_HOUSE_TIME;
    return new Date(date + "T" + time);
  }, [event]);
  const cd = useCountdown(eventDateTime);

  const fullAddress = [
    event?.address,
    event?.complement,
    event?.city && event?.state ? `${event.city} - ${event.state}` : (event?.city ?? event?.state),
  ]
    .filter(Boolean)
    .join(", ");

  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PixTier | null>(null);
  const pixSectionRef = useRef<HTMLDivElement>(null);

  const copyPix = async () => {
    if (!event?.pix_key) return;
    await navigator.clipboard.writeText(event.pix_key);
    // Haptic feedback on mobile
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
    toast.success("Chave Pix copiada!");
  };

  return (
    <div className="relative h-screen overflow-hidden bg-[oklch(0.20_0.08_155)] text-foreground">
      <FloatingPhotoBackground
        photos={photos}
        localPhotos={localBackgroundPhotoUrls}
        fallback={event?.cover_image_url || coverImg}
      />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_top,oklch(0.30_0.10_148_/_0.45),transparent_50%),linear-gradient(to_bottom,transparent_55%,oklch(0.14_0.07_158_/_0.65))]" />

      {/* ── HERO VIEW ── */}
      <div
        className={`relative z-10 flex h-full flex-col ${view !== "hero" ? "hidden" : ""}`}
      >
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-4 py-3 sm:px-6 lg:px-8">
          {/* Desktop Nav */}
          <nav className="hidden shrink-0 items-center gap-0.5 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-soft backdrop-blur-xl md:flex">
            <span className="mr-auto font-display text-xl tracking-wide text-white">
              Chá de Casa Nova
            </span>
            <NavButton onClick={() => setView("contribuicoes")} icon={Heart} label="Contribuições" />
            <NavButton onClick={() => setView("recado")} icon={MessageSquare} label="Recados" />
            <NavButton
              onClick={() => setAddressOpen(true)}
              icon={MapPin}
              label="Endereço"
              disabled={!fullAddress}
            />
            <NavButton
              href={
                event?.whatsapp_phone
                  ? `https://wa.me/${event.whatsapp_phone.replace(/\D/g, "")}`
                  : undefined
              }
              icon={MessageCircle}
              label="WhatsApp"
              external
              disabled={!event?.whatsapp_phone}
            />
            <Button
              variant="liquidGlass"
              size="sm"
              className="ml-2 rounded-xl px-4"
              onClick={() => setRsvpOpen(true)}
            >
              Confirmar
            </Button>
          </nav>

          {/* Mobile Nav */}
          <div className="flex md:hidden shrink-0 items-center justify-between gap-1 rounded-2xl border border-white/15 bg-white/10 px-2 py-3 shadow-soft backdrop-blur-xl">
            <span className="flex-1 font-display text-xs tracking-wide text-white/40">
              ♡
            </span>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setView("contribuicoes")}
              className="h-10 w-10 text-white hover:bg-white/20 rounded-lg transition-all"
              title="Contribuições"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setView("recado")}
              className="h-10 w-10 text-white hover:bg-white/20 rounded-lg transition-all"
              title="Recados"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setAddressOpen(true)}
              disabled={!fullAddress}
              className="h-10 w-10 text-white hover:bg-white/20 rounded-lg transition-all disabled:opacity-50"
              title="Endereço"
            >
              <MapPin className="h-5 w-5" />
            </Button>
            {event?.whatsapp_phone && (
              <a
                href={`https://wa.me/${event.whatsapp_phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 text-white hover:bg-white/20 rounded-lg transition-all"
                title="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            )}
          </div>

          <section className="flex flex-1 items-center justify-center px-1 py-6 sm:py-8">
            <div className="w-full max-w-md rounded-2xl border border-white/80 bg-white/92 px-6 py-7 shadow-premium backdrop-blur-xl sm:px-8 sm:py-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-terracotta">
                Open house
              </p>
              <h1 className="mt-2 font-display text-5xl leading-tight text-forest sm:text-6xl">
                Dani e Andressa
              </h1>
              <p className="mt-3 text-sm leading-6 text-foreground/68">
                {event?.welcome_text ?? OPEN_HOUSE_FALLBACK_TEXT}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-foreground/70">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-terracotta" />
                  {formatEventDate(event?.event_date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-terracotta" />
                  {event?.event_time?.slice(0, 5) ?? OPEN_HOUSE_TIME}
                </span>
                {event?.city && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-terracotta" />
                    {event.city}
                    {event.state ? " - " + event.state : ""}
                  </span>
                )}
              </div>

              {cd && !cd.finished && (
                <div className="mt-5 grid grid-cols-4 gap-2">
                  {[
                    { label: "dias", v: cd.days },
                    { label: "horas", v: cd.hours },
                    { label: "min", v: cd.minutes },
                    { label: "seg", v: cd.seconds },
                  ].map((x) => (
                    <div
                      key={x.label}
                      className="rounded-lg border border-forest/20 bg-gradient-to-b from-white/90 to-secondary/60 px-2 py-3 text-center shadow-soft will-change-transform"
                    >
                      <div className="font-display text-2xl sm:text-3xl font-semibold leading-none text-forest">
                        {String(x.v).padStart(2, "0")}
                      </div>
                      <div className="mt-1.5 text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
                        {x.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <Button
                  variant="liquidGlass"
                  className="h-12 w-full rounded-xl text-base sm:h-11 sm:text-sm"
                  onClick={() => setRsvpOpen(true)}
                >
                  Confirmar presença
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── CONTRIBUIÇÕES VIEW ── */}
      <div
        className={`relative z-10 flex h-full flex-col ${view !== "contribuicoes" ? "hidden" : ""}`}
      >
        <SubNav title="Contribuições via PIX" onBack={() => setView("hero")} />
        <div className="min-h-0 flex-1 overflow-y-auto">
          {/* ── COTAS PIX ── */}
          <section ref={pixSectionRef} className="px-4 pt-8 pb-8 sm:px-6">
            <div className="mx-auto max-w-5xl">
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-white/55">
                Se você quiser nos presentear
              </p>
              <h2 className="mt-2 text-balance text-center font-display text-4xl text-white sm:text-5xl">
                Um carinho para o nosso novo lar
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-pretty text-center text-sm leading-6 text-white/72">
                A gente já tem os utensílios do dia a dia e, por isso, escolheu não fazer uma
                lista tradicional. Se você quiser nos presentear, uma contribuição via Pix vai
                nos ajudar a comprar os móveis que ainda faltam. Mas fique à vontade: sua
                presença já é o presente mais importante para nós.
              </p>
              <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {PIX_TIERS.map((tier, i) => (
                  <PixTierCard key={tier.id} tier={tier} index={i} onClick={() => setSelectedTier(tier)} />
                ))}
              </div>
            </div>
          </section>

            <section className="px-4 pb-16 sm:px-6">
              <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/6 px-4 py-5 backdrop-blur-sm sm:px-8">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-white/40">
                  Prefere contribuir com outro valor?
                </p>
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                  {event?.pix_qr_url && (
                    <img
                      src={event.pix_qr_url}
                      alt="QR Code Pix"
                      className="h-32 w-32 rounded-xl border border-white/20 bg-white p-2 shrink-0"
                    />
                  )}
                  <div className="w-full space-y-4">
                    {event?.pix_owner && (
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/40">Titular</p>
                        <p className="mt-1 text-sm font-medium text-white/80">{event.pix_owner}</p>
                      </div>
                    )}
                    {event?.pix_key && (
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/40">Chave Pix</p>
                        <div className="mt-2 flex gap-2">
                          <code className="flex-1 truncate rounded-lg border border-white/15 bg-white/8 px-3 py-2.5 text-sm font-mono text-white/80">
                            {event.pix_key}
                          </code>
                          <Button
                            size="icon"
                            variant="secondary"
                            onClick={copyPix}
                            aria-label="Copiar chave Pix"
                            className="rounded-lg h-11 w-11 shrink-0"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

          <MiniFooter whatsappPhone={event?.whatsapp_phone} />
        </div>
      </div>

      {/* ── RECADO VIEW ── */}
      <div
        className={`relative z-10 flex h-full flex-col ${view !== "recado" ? "hidden" : ""}`}
      >
        <SubNav title="Deixe um recado" onBack={() => setView("hero")} />
        <div className="min-h-0 flex-1 overflow-y-auto">
          <section className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
            <RecadoForm />
          </section>
          <MiniFooter whatsappPhone={event?.whatsapp_phone} />
        </div>
      </div>

      <PixTierDialog
        tier={selectedTier}
        pixKey={event?.pix_key ?? null}
        pixOwner={event?.pix_owner ?? null}
        onClose={() => setSelectedTier(null)}
      />
      <RsvpDialog open={rsvpOpen} onOpenChange={setRsvpOpen} />
      <AddressDialog
        open={addressOpen}
        onOpenChange={setAddressOpen}
        fullAddress={fullAddress}
      />
    </div>
  );
}

function FloatingPhotoBackground({
  photos,
  localPhotos,
  fallback,
}: {
  photos: CouplePhoto[];
  localPhotos: string[];
  fallback: string;
}) {
  const remotePhotoUrls = photos.map((photo) => photo.image_url).filter(Boolean);
  const photoUrls = [...localPhotos, ...remotePhotoUrls];
  const sourceUrls = photoUrls.length > 0 ? photoUrls : Array.from({ length: 9 }, () => fallback);
  const itemCount = Math.min(9, Math.max(6, sourceUrls.length));
  const items = Array.from(
    { length: itemCount },
    (_, index) => sourceUrls[index % sourceUrls.length],
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((url, index) => (
        <div key={`${url}-${index}`} className={`floating-photo floating-photo-${index + 1}`}>
          <img src={url} alt="" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}

function SubNav({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[oklch(0.20_0.08_155)]/95 px-4 py-3 sm:px-6 backdrop-blur-xl">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </button>
      <span className="font-display text-xl text-white">{title}</span>
      <div className="w-16" />
    </div>
  );
}

function MiniFooter({ whatsappPhone }: { whatsappPhone?: string | null }) {
  return (
    <footer className="px-4 pb-8 pt-4 text-center sm:px-6">
      {whatsappPhone && (
        <a
          href={`https://wa.me/${whatsappPhone.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-sm font-medium text-white/65 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/14 hover:text-white"
        >
          <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
        </a>
      )}
      <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-white/30">
        Feito com <Heart className="h-3 w-3 fill-white/30 text-white/30" /> para o nosso novo lar
      </p>
      <div className="mt-4 border-t border-white/8 pt-4">
        <p className="text-xs font-medium text-white/40">Desenvolvido por Andressa Soares</p>
        <p className="mx-auto mt-1 max-w-xs text-[11px] leading-5 text-white/22">
          Não achei nenhum site legal para lista de presentes do meu chá de casa nova — então desenvolvi o meu próprio.
        </p>
      </div>
    </footer>
  );
}

function NavButton({
  href,
  onClick,
  icon: Icon,
  label,
  external,
  disabled,
}: {
  href?: string;
  onClick?: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  external?: boolean;
  disabled?: boolean;
}) {
  const cls = `flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/62 transition-all hover:bg-white/12 hover:text-white ${
    disabled ? "pointer-events-none opacity-35" : ""
  }`;

  const inner = (
    <>
      <Icon className="h-4 w-4 shrink-0" />
      <span className="hidden md:inline">{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cls}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}

function AddressDialog({
  open,
  onOpenChange,
  fullAddress,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  fullAddress: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-11/12 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Endereço</DialogTitle>
          <DialogDescription>Como chegar no nosso novo lar</DialogDescription>
        </DialogHeader>
        <p className="py-2 text-sm leading-6 text-foreground/80">{fullAddress}</p>
        <DialogFooter>
          <Button asChild variant="liquidGlass" className="w-full rounded-xl">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin className="mr-2 h-4 w-4" /> Abrir no Maps
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
      className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 ${
        active
          ? "border-moss/50 bg-moss text-moss-foreground shadow-soft"
          : "border-white/20 bg-white/10 text-white/72 backdrop-blur hover:border-white/35 hover:bg-white/16 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function PixTierCard({ tier, index, onClick }: { tier: PixTier; index: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group block h-full w-full rounded-2xl text-left transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      <GlowCard
        glowColor="green"
        customSize
        className="h-full w-full overflow-hidden border-white/15 transition-colors duration-300 group-hover:border-white/35 group-hover:shadow-premium"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${TIER_GRADIENTS[index]}`} />
        <div className="relative flex flex-col">
          <tier.icon className="h-9 w-9 text-white/75" />
          <span className="mt-4 inline-block w-fit rounded-full bg-white/18 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-white">
            {formatBRL(tier.value)}
          </span>
          <h3 className="mt-2 font-display text-xl leading-tight text-white">{tier.label}</h3>
          <p className="mt-1.5 text-[11px] leading-5 text-white/60">{tier.description}</p>
        </div>
        <div className="relative flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-white/50 transition-colors group-hover:text-white/90">
          <Heart className="h-3 w-3" />
          Escolher esta cota
        </div>
      </GlowCard>
    </button>
  );
}

function PixTierDialog({
  tier,
  pixKey,
  pixOwner,
  onClose,
}: {
  tier: PixTier | null;
  pixKey: string | null;
  pixOwner: string | null;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);

  const copyKey = async () => {
    if (!pixKey) return;
    await navigator.clipboard.writeText(pixKey);
    setCopied(true);
    toast.success("Chave Pix copiada!");
    setTimeout(() => setCopied(false), 2500);
  };

  const mutation = useMutation({
    mutationFn: async () => {
      if (!isSupabaseConfigured) throw new Error("Supabase não configurado.");
      if (!tier) return;
      const { error } = await supabase.from("guest_messages").insert({
        name: name.trim(),
        message: `Contribuição Pix – ${tier.label} (${formatBRL(tier.value)})`,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Obrigada pelo carinho! 💚");
      setName("");
      onClose();
    },
    onError: (e: Error) => toast.error(e.message || "Não foi possível registrar"),
  });

  return (
    <Dialog open={!!tier} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="w-11/12 rounded-2xl">
        <DialogHeader>
          {tier && <tier.icon className="h-10 w-10 text-forest" />}
          <DialogTitle className="mt-3 font-display text-3xl">{tier?.label}</DialogTitle>
          <DialogDescription className="text-sm leading-6">{tier?.description}</DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl border border-forest/20 bg-gradient-to-br from-secondary to-sand px-5 py-4 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Valor sugerido
          </p>
          <p className="mt-1 font-display text-4xl text-forest">{formatBRL(tier?.value ?? null)}</p>
        </div>

        {pixKey && (
          <div>
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Chave Pix
            </p>
            <div className="flex gap-2">
              <code className="flex-1 truncate rounded-xl border bg-secondary px-3 py-3 text-sm font-mono text-white/80">
                {pixKey}
              </code>
              <Button size="icon" variant="outline" onClick={copyKey} className="shrink-0 rounded-xl h-11 w-11">
                {copied ? <Check className="h-4 w-4 text-moss" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            {pixOwner && (
              <p className="mt-2 text-xs text-muted-foreground">Titular: {pixOwner}</p>
            )}
          </div>
        )}

        <div>
          <Label htmlFor="pix-name">Seu nome</Label>
          <Input
            id="pix-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Para sabermos quem mandou o carinho"
            maxLength={100}
            className="text-base"
          />
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={onClose} className="order-2 sm:order-1">
            Cancelar
          </Button>
          <Button
            variant="liquidGlass"
            onClick={() => mutation.mutate()}
            disabled={!name.trim() || mutation.isPending}
            className="order-1 sm:order-2 h-12 sm:h-10"
          >
            <Heart className="mr-2 h-4 w-4" />
            Avisar que vou contribuir
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
      <DialogContent className="w-11/12 rounded-2xl">
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
              className="text-base"
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_100px]">
            <div>
              <Label htmlFor="v-phone">Telefone</Label>
              <Input
                id="v-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={30}
                className="text-base"
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
                className="text-base"
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
              rows={4}
              className="text-base"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            variant="liquidGlass"
            onClick={() => mutation.mutate()}
            disabled={!name.trim() || mutation.isPending}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function RecadoForm() {
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
    <Card className="rounded-2xl border-white/75 bg-white/90 p-5 shadow-premium backdrop-blur-xl sm:p-7">
      <div className="space-y-4">
        <div>
          <Label htmlFor="m-name">Seu nome</Label>
          <Input
            id="m-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            className="text-base"
          />
        </div>
        <div>
          <Label htmlFor="m-msg">Mensagem</Label>
          <Textarea
            id="m-msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={1000}
            rows={6}
            className="text-base"
          />
        </div>
        <Button
          variant="liquidGlass"
          className="h-12 w-full rounded-xl text-base sm:h-11 sm:text-sm"
          onClick={() => mutation.mutate()}
          disabled={!name.trim() || !message.trim() || mutation.isPending}
        >
          Enviar mensagem
        </Button>
      </div>
    </Card>
  );
}
