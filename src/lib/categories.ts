export type GiftCategory =
  | "cozinha" | "banheiro" | "lavanderia" | "sala"
  | "quarto" | "decoracao" | "utilidades" | "outros";

export type GiftStatus = "disponivel" | "reservado" | "presenteado";

export const CATEGORIES: { value: GiftCategory; label: string }[] = [
  { value: "cozinha", label: "Cozinha" },
  { value: "banheiro", label: "Banheiro" },
  { value: "lavanderia", label: "Lavanderia" },
  { value: "sala", label: "Sala" },
  { value: "quarto", label: "Quarto" },
  { value: "decoracao", label: "Decoração" },
  { value: "utilidades", label: "Utilidades" },
  { value: "outros", label: "Outros" },
];

export const STATUSES: { value: GiftStatus; label: string }[] = [
  { value: "disponivel", label: "Disponível" },
  { value: "reservado", label: "Reservado" },
  { value: "presenteado", label: "Presenteado" },
];

export function categoryLabel(v: string) {
  return CATEGORIES.find((c) => c.value === v)?.label ?? v;
}
export function statusLabel(v: string) {
  return STATUSES.find((s) => s.value === v)?.label ?? v;
}

export function formatBRL(value: number | null | undefined) {
  if (value == null) return "—";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}
