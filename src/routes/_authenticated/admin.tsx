import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LogOut, Plus, Pencil, Trash2, Home, GripVertical, Image as ImageIcon, ExternalLink } from "lucide-react";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES, STATUSES, type GiftCategory, type GiftStatus, categoryLabel, formatBRL, statusLabel } from "@/lib/categories";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
});

type Gift = {
  id: string; name: string; category: GiftCategory; description: string | null;
  estimated_value: number | null; image_url: string | null; external_link: string | null;
  quantity: number; status: GiftStatus; sort_order: number;
};
type CouplePhoto = { id: string; image_url: string; caption: string | null; sort_order: number };
type GiftLink = { label: string; url: string };

function parseGiftLinks(external_link: string | null): GiftLink[] {
  if (!external_link) return [];
  if (external_link.trim().startsWith("[")) {
    try { return JSON.parse(external_link); } catch { /* fall through */ }
  }
  return [{ label: "Ver produto", url: external_link }];
}

function AdminPage() {
  const navigate = useNavigate();
  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  return (
    <div className="min-h-screen bg-secondary/40">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.3em] text-terracotta">Painel</p>
            <h1 className="font-display text-xl sm:text-2xl">Administração</h1>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" className="rounded-full gap-1">
              <Link to="/"><Home className="h-4 w-4" /><span className="hidden sm:inline">Ver site</span></Link>
            </Button>
            <Button onClick={signOut} variant="outline" size="sm" className="rounded-full gap-1">
              <LogOut className="h-4 w-4" /><span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <Tabs defaultValue="dashboard">
          <TabsList className="grid w-full grid-cols-2 gap-1 bg-transparent sm:grid-cols-3 lg:grid-cols-6 lg:gap-0">
            <TabsTrigger value="dashboard" className="rounded-lg sm:rounded-none">Dashboard</TabsTrigger>
            <TabsTrigger value="gifts" className="rounded-lg sm:rounded-none">Presentes</TabsTrigger>
            <TabsTrigger value="photos" className="rounded-lg sm:rounded-none">Fotos</TabsTrigger>
            <TabsTrigger value="event" className="rounded-lg sm:rounded-none">Evento</TabsTrigger>
            <TabsTrigger value="rsvps" className="rounded-lg sm:rounded-none">Confirmados</TabsTrigger>
            <TabsTrigger value="messages" className="rounded-lg sm:rounded-none">Mensagens</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="mt-6"><Dashboard /></TabsContent>
          <TabsContent value="gifts" className="mt-6"><GiftsTab /></TabsContent>
          <TabsContent value="photos" className="mt-6"><PhotosTab /></TabsContent>
          <TabsContent value="event" className="mt-6"><EventTab /></TabsContent>
          <TabsContent value="rsvps" className="mt-6"><RsvpsTab /></TabsContent>
          <TabsContent value="messages" className="mt-6"><MessagesTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function Dashboard() {
  const { data: gifts = [] } = useQuery({
    queryKey: ["admin-gifts"],
    queryFn: async () => {
      const { data } = await supabase.from("gifts").select("status");
      return (data ?? []) as { status: GiftStatus }[];
    },
  });
  const { data: rsvpCount = 0 } = useQuery({
    queryKey: ["admin-rsvp-count"],
    queryFn: async () => {
      const { count } = await supabase.from("rsvps").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const stats = [
    { label: "Itens cadastrados", value: gifts.length },
    { label: "Disponíveis", value: gifts.filter((g) => g.status === "disponivel").length },
    { label: "Reservados", value: gifts.filter((g) => g.status === "reservado").length },
    { label: "Presenteados", value: gifts.filter((g) => g.status === "presenteado").length },
    { label: "Confirmações", value: rsvpCount },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {stats.map((s) => (
        <Card key={s.label} className="rounded-2xl p-4 sm:p-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
          <p className="mt-2 font-display text-3xl sm:text-4xl">{s.value}</p>
        </Card>
      ))}
    </div>
  );
}

function GiftsTab() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Gift> | null>(null);
  const [localOrder, setLocalOrder] = useState<Gift[] | null>(null);

  const { data: gifts = [] } = useQuery({
    queryKey: ["admin-gifts-full"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gifts").select("*").order("sort_order").order("created_at");
      if (error) throw error;
      return (data ?? []) as Gift[];
    },
  });

  const items = localOrder ?? gifts;

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gifts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Presente removido"); qc.invalidateQueries({ queryKey: ["admin-gifts-full"] }); },
  });

  const reorder = useMutation({
    mutationFn: async (ordered: Gift[]) => {
      // update each row's sort_order
      await Promise.all(ordered.map((g, i) =>
        supabase.from("gifts").update({ sort_order: i }).eq("id", g.id)
      ));
    },
    onSuccess: () => {
      toast.success("Ordem salva");
      qc.invalidateQueries({ queryKey: ["admin-gifts-full"] });
      qc.invalidateQueries({ queryKey: ["gifts"] });
      setLocalOrder(null);
    },
    onError: (e: Error) => { toast.error(e.message); setLocalOrder(null); },
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = items.findIndex((g) => g.id === active.id);
    const newIdx = items.findIndex((g) => g.id === over.id);
    const next = arrayMove(items, oldIdx, newIdx);
    setLocalOrder(next);
    reorder.mutate(next);
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">Arraste pelo <GripVertical className="inline h-3 w-3" /> para reordenar.</p>
        <Button onClick={() => setEditing({ name: "", category: "outros", quantity: 1, status: "disponivel" })} className="rounded-lg">
          <Plus className="mr-2 h-4 w-4" /> Novo presente
        </Button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((g) => g.id)} strategy={verticalListSortingStrategy}>
          <div className="grid gap-3">
            {items.map((g) => (
              <SortableGiftRow key={g.id} gift={g} onEdit={() => setEditing(g)} onDelete={() => { if (confirm("Excluir?")) del.mutate(g.id); }} />
            ))}
            {items.length === 0 && <p className="text-center text-sm text-muted-foreground">Nenhum presente cadastrado.</p>}
          </div>
        </SortableContext>
      </DndContext>

      <GiftFormDialog
        gift={editing}
        onClose={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          qc.invalidateQueries({ queryKey: ["admin-gifts-full"] });
          qc.invalidateQueries({ queryKey: ["gifts"] });
        }}
      />
    </div>
  );
}

function SortableGiftRow({ gift: g, onEdit, onDelete }: { gift: Gift; onEdit: () => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: g.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.6 : 1 };

  return (
    <Card ref={setNodeRef} style={style} className="flex items-center gap-3 rounded-2xl p-4">
      <button
        type="button"
        className="cursor-grab touch-none rounded-md p-1 text-muted-foreground hover:bg-secondary active:cursor-grabbing"
        {...attributes}
        {...listeners}
        aria-label="Arrastar"
      >
        <GripVertical className="h-5 w-5" />
      </button>
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-secondary">
        {g.image_url && <img src={g.image_url} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate font-medium text-sm">{g.name}</h3>
          <Badge variant="secondary" className="text-xs">{categoryLabel(g.category)}</Badge>
          <Badge className={`text-xs ${
            g.status === "disponivel" ? "bg-olive text-olive-foreground"
            : g.status === "reservado" ? "bg-accent text-accent-foreground"
            : "bg-terracotta text-terracotta-foreground"
          }`}>{statusLabel(g.status)}</Badge>
        </div>
        <p className="text-xs text-muted-foreground">{formatBRL(g.estimated_value)} · qtd {g.quantity}</p>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onEdit} className="h-9 w-9 p-0"><Pencil className="h-4 w-4" /></Button>
        <Button size="sm" variant="outline" onClick={onDelete} className="h-9 w-9 p-0"><Trash2 className="h-4 w-4" /></Button>
      </div>
    </Card>
  );
}

function GiftFormDialog({ gift, onClose, onSaved }: { gift: Partial<Gift> | null; onClose: () => void; onSaved: () => void }) {
  const isOpen = !!gift;
  const [form, setForm] = useState<Partial<Gift>>({});
  const [links, setLinks] = useState<GiftLink[]>([]);

  useEffect(() => {
    if (gift) {
      setForm(gift);
      setLinks(parseGiftLinks(gift.external_link ?? null));
    }
  }, [gift]);

  const addLink = () => setLinks((l) => [...l, { label: "", url: "" }]);
  const updateLink = (i: number, field: keyof GiftLink, value: string) =>
    setLinks((l) => l.map((item, j) => (j === i ? { ...item, [field]: value } : item)));
  const removeLink = (i: number) => setLinks((l) => l.filter((_, j) => j !== i));

  const save = useMutation({
    mutationFn: async () => {
      const validLinks = links.filter((l) => l.url.trim());
      const payload = {
        name: form.name!, category: form.category!, description: form.description ?? null,
        estimated_value: form.estimated_value ?? null, image_url: form.image_url ?? null,
        external_link: validLinks.length > 0 ? JSON.stringify(validLinks) : null,
        quantity: form.quantity ?? 1, status: form.status ?? "disponivel",
      };
      if (form.id) {
        const { error } = await supabase.from("gifts").update(payload).eq("id", form.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("gifts").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => { toast.success("Salvo!"); onSaved(); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="w-full max-w-lg sm:max-w-md">
        <DialogHeader><DialogTitle className="font-display text-2xl">{form.id ? "Editar" : "Novo"} presente</DialogTitle></DialogHeader>
        <div className="grid max-h-[60vh] gap-3 overflow-y-auto pr-1">
          <div>
            <Label>Nome</Label>
            <Input value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value })} className="text-base" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label>Categoria</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as GiftCategory })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as GiftStatus })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{STATUSES.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Descrição</Label>
            <Textarea value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="text-base" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label>Valor estimado (R$)</Label>
              <Input type="number" step="0.01" value={form.estimated_value ?? ""} onChange={(e) => setForm({ ...form, estimated_value: e.target.value ? Number(e.target.value) : null })} className="text-base" />
            </div>
            <div>
              <Label>Quantidade</Label>
              <Input type="number" min={1} value={form.quantity ?? 1} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} className="text-base" />
            </div>
          </div>
          <div>
            <Label>URL da imagem</Label>
            <Input value={form.image_url ?? ""} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." className="text-base" />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label>Links de compra</Label>
              <Button type="button" size="sm" variant="outline" onClick={addLink} className="h-7 gap-1 rounded-lg px-2.5 text-xs">
                <Plus className="h-3 w-3" /> Adicionar
              </Button>
            </div>
            {links.length === 0 && (
              <p className="text-xs text-muted-foreground">Nenhum link ainda. Adicione links de lojas.</p>
            )}
            <div className="space-y-2">
              {links.map((link, i) => (
                <div key={i} className="flex flex-col gap-2 sm:flex-row sm:gap-1">
                  <Input
                    placeholder="Amazon"
                    value={link.label}
                    onChange={(e) => updateLink(i, "label", e.target.value)}
                    className="w-full sm:w-24 shrink-0 text-base"
                  />
                  <Input
                    placeholder="https://..."
                    value={link.url}
                    onChange={(e) => updateLink(i, "url", e.target.value)}
                    className="flex-1 text-base"
                  />
                  <Button type="button" size="icon" variant="outline" onClick={() => removeLink(i)} className="shrink-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={onClose} className="order-2 sm:order-1">Cancelar</Button>
          <Button onClick={() => save.mutate()} disabled={!form.name || save.isPending} className="order-1 sm:order-2">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PhotosTab() {
  const qc = useQueryClient();
  const FRAME_COUNT = 6;

  const { data: photos = [] } = useQuery({
    queryKey: ["admin-photos"],
    queryFn: async () => {
      const { data, error } = await supabase.from("couple_photos").select("*").order("sort_order").order("created_at");
      if (error) throw error;
      return (data ?? []) as CouplePhoto[];
    },
  });

  const [editing, setEditing] = useState<Partial<CouplePhoto> | null>(null);
  const [form, setForm] = useState<Partial<CouplePhoto>>({});
  const [uploading, setUploading] = useState(false);
  useEffect(() => { if (editing) setForm(editing); }, [editing]);

  const save = useMutation({
    mutationFn: async () => {
      if (!form.image_url?.trim()) throw new Error("Informe a URL da imagem");
      if (form.id) {
        const { error } = await supabase.from("couple_photos").update({
          image_url: form.image_url, caption: form.caption ?? null,
        }).eq("id", form.id);
        if (error) throw error;
      } else {
        const nextOrder = photos.length;
        const { error } = await supabase.from("couple_photos").insert({
          image_url: form.image_url, caption: form.caption ?? null, sort_order: nextOrder,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Foto salva!");
      qc.invalidateQueries({ queryKey: ["admin-photos"] });
      qc.invalidateQueries({ queryKey: ["couple-photos"] });
      setEditing(null);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("couple_photos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Foto removida");
      qc.invalidateQueries({ queryKey: ["admin-photos"] });
      qc.invalidateQueries({ queryKey: ["couple-photos"] });
    },
  });

  // Build slot array: existing photos + empty frame placeholders
  const slots = Math.max(FRAME_COUNT, photos.length + 1);
  const tilts = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1", "rotate-0", "-rotate-2"];

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl">Galeria do casal</h2>
        <p className="text-sm text-muted-foreground">Clique em uma moldura vazia para adicionar uma foto. As fotos aparecem no site público.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: slots }).map((_, i) => {
          const p = photos[i];
          const tilt = tilts[i % tilts.length];
          return (
            <div key={p?.id ?? `empty-${i}`} className={`group relative ${tilt} transition-transform hover:rotate-0 hover:scale-[1.02]`}>
              <div className="rounded-[2px] bg-card p-3 pb-10 shadow-card ring-1 ring-border">
                <div className="aspect-[4/5] overflow-hidden rounded-[2px] bg-secondary">
                  {p?.image_url ? (
                    <img src={p.image_url} alt={p.caption ?? ""} className="h-full w-full object-cover" />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditing({ image_url: "", caption: "" })}
                      className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground/60 transition-colors hover:bg-accent/40 hover:text-forest"
                    >
                      <ImageIcon className="h-10 w-10" />
                      <span className="text-xs uppercase tracking-widest">Adicionar foto</span>
                    </button>
                  )}
                </div>
                {p?.caption && (
                  <p className="mt-3 text-center font-display text-sm italic text-foreground/80">{p.caption}</p>
                )}
              </div>
              {p && (
                <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button size="icon" variant="secondary" className="h-7 w-7" onClick={() => setEditing(p)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-7 w-7" onClick={() => { if (confirm("Remover esta foto?")) del.mutate(p.id); }}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="w-full max-w-lg sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{form.id ? "Editar" : "Nova"} foto</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Enviar arquivo</Label>
              <Input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    setUploading(true);
                    const ext = file.name.split(".").pop() || "jpg";
                    const path = `${crypto.randomUUID()}.${ext}`;
                    const up = await supabase.storage.from("couple-photos").upload(path, file, { contentType: file.type, upsert: false });
                    if (up.error) throw up.error;
                    const signed = await supabase.storage.from("couple-photos").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
                    if (signed.error) throw signed.error;
                    setForm((f) => ({ ...f, image_url: signed.data.signedUrl }));
                    toast.success("Foto enviada");
                  } catch (err) {
                    toast.error((err as Error).message);
                  } finally {
                    setUploading(false);
                    e.target.value = "";
                  }
                }}
              />
              <p className="mt-1 text-xs text-muted-foreground">JPG, PNG ou WebP, até 5MB. Google Photos e Drive não funcionam por link direto — faça upload do arquivo.</p>
            </div>
            <div>
              <Label>Ou cole uma URL pública</Label>
              <Input value={form.image_url ?? ""} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
            </div>
            <div>
              <Label>Legenda (opcional)</Label>
              <Input value={form.caption ?? ""} onChange={(e) => setForm({ ...form, caption: e.target.value })} placeholder="Nossa viagem..." />
            </div>
            {form.image_url && (
              <div className="mx-auto w-40">
                <div className="rounded-[2px] bg-card p-2 pb-6 shadow-card ring-1 ring-border">
                  <div className="aspect-[4/5] overflow-hidden bg-secondary">
                    <img src={form.image_url} alt="" className="h-full w-full object-cover" onError={() => toast.error("Esta URL não pôde ser carregada — tente fazer upload do arquivo")} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancelar</Button>
            <Button onClick={() => save.mutate()} disabled={save.isPending}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EventTab() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-event"],
    queryFn: async () => {
      const { data } = await supabase.from("event_settings").select("*").limit(1).maybeSingle();
      return data;
    },
  });
  const [form, setForm] = useState<Record<string, unknown> | null>(null);
  const current = form ?? data;

  const save = useMutation({
    mutationFn: async () => {
      const id = (current as any)?.id as string | undefined;
      if (!id) return;
      const { id: _omit, created_at: _c, updated_at: _u, ...payload } = current as any;
      const { error } = await supabase.from("event_settings").update(payload).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Evento atualizado!"); qc.invalidateQueries({ queryKey: ["admin-event"] }); qc.invalidateQueries({ queryKey: ["event-settings"] }); },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!data) return <p className="text-sm text-muted-foreground">Carregando...</p>;
  const c = current as any;
  const upd = (k: string, v: unknown) => setForm({ ...(current as any), [k]: v });

  return (
    <Card className="rounded-2xl p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome do evento"><Input value={c?.name ?? ""} onChange={(e) => upd("name", e.target.value)} /></Field>
        <Field label="Data"><Input type="date" value={c?.event_date ?? ""} onChange={(e) => upd("event_date", e.target.value || null)} /></Field>
        <Field label="Horário"><Input type="time" value={c?.event_time?.slice(0,5) ?? ""} onChange={(e) => upd("event_time", e.target.value || null)} /></Field>
        <Field label="Endereço"><Input value={c?.address ?? ""} onChange={(e) => upd("address", e.target.value)} /></Field>
        <Field label="Complemento"><Input value={c?.complement ?? ""} onChange={(e) => upd("complement", e.target.value)} /></Field>
        <Field label="Cidade"><Input value={c?.city ?? ""} onChange={(e) => upd("city", e.target.value)} /></Field>
        <Field label="Estado"><Input value={c?.state ?? ""} onChange={(e) => upd("state", e.target.value)} maxLength={2} /></Field>
        <Field label="WhatsApp (com DDD)"><Input value={c?.whatsapp_phone ?? ""} onChange={(e) => upd("whatsapp_phone", e.target.value)} placeholder="11999999999" /></Field>
        <Field className="sm:col-span-2" label="Texto de convite / boas-vindas">
          <Textarea rows={3} value={c?.welcome_text ?? ""} onChange={(e) => upd("welcome_text", e.target.value)} />
        </Field>
        <Field className="sm:col-span-2" label="URL imagem de capa"><Input value={c?.cover_image_url ?? ""} onChange={(e) => upd("cover_image_url", e.target.value)} /></Field>
        <Field label="Chave Pix"><Input value={c?.pix_key ?? ""} onChange={(e) => upd("pix_key", e.target.value)} /></Field>
        <Field label="Titular do Pix"><Input value={c?.pix_owner ?? ""} onChange={(e) => upd("pix_owner", e.target.value)} /></Field>
        <Field className="sm:col-span-2" label="URL do QR Code Pix"><Input value={c?.pix_qr_url ?? ""} onChange={(e) => upd("pix_qr_url", e.target.value)} /></Field>
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={() => save.mutate()} disabled={save.isPending} className="rounded-full">Salvar alterações</Button>
      </div>
    </Card>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="mb-1.5 block">{label}</Label>
      {children}
    </div>
  );
}

function RsvpsTab() {
  const { data: rsvps = [] } = useQuery({
    queryKey: ["admin-rsvps"],
    queryFn: async () => {
      const { data } = await supabase.from("rsvps").select("*").order("created_at", { ascending: false });
      return data ?? [];
    },
  });
  const { data: reservations = [] } = useQuery({
    queryKey: ["admin-reservations"],
    queryFn: async () => {
      const { data } = await supabase.from("gift_reservations").select("*, gifts(name)").order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="rounded-2xl p-5">
        <h3 className="font-display text-xl">Confirmações de presença</h3>
        <div className="mt-4 space-y-2">
          {(rsvps as any[]).map((r) => (
            <div key={r.id} className="rounded-xl border p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">{r.name}</p>
                <span className="text-xs text-muted-foreground">{r.guests_count} pessoa(s)</span>
              </div>
              {r.phone && <p className="text-xs text-muted-foreground">{r.phone}</p>}
              {r.message && <p className="mt-1 text-sm">{r.message}</p>}
            </div>
          ))}
          {rsvps.length === 0 && <p className="text-sm text-muted-foreground">Sem confirmações ainda.</p>}
        </div>
      </Card>
      <Card className="rounded-2xl p-5">
        <h3 className="font-display text-xl">Reservas de presentes</h3>
        <div className="mt-4 space-y-2">
          {(reservations as any[]).map((r) => (
            <div key={r.id} className="rounded-xl border p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">{r.guest_name}</p>
                <Badge className={r.status === "presenteado" ? "bg-terracotta text-terracotta-foreground" : "bg-accent text-accent-foreground"}>
                  {statusLabel(r.status)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{r.gifts?.name}</p>
              {r.phone && <p className="text-xs text-muted-foreground">{r.phone}</p>}
              {r.message && <p className="mt-1 text-sm">{r.message}</p>}
            </div>
          ))}
          {reservations.length === 0 && <p className="text-sm text-muted-foreground">Sem reservas ainda.</p>}
        </div>
      </Card>
    </div>
  );
}

function MessagesTab() {
  const { data: messages = [] } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const { data } = await supabase.from("guest_messages").select("*").order("created_at", { ascending: false });
      return data ?? [];
    },
  });
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {(messages as any[]).map((m) => (
        <Card key={m.id} className="rounded-2xl p-5">
          <p className="font-display text-lg">{m.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">{m.message}</p>
          <p className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground">
            {new Date(m.created_at).toLocaleString("pt-BR")}
          </p>
        </Card>
      ))}
      {messages.length === 0 && <p className="text-sm text-muted-foreground">Sem mensagens.</p>}
    </div>
  );
}
