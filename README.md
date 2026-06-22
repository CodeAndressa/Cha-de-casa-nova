# Chá de Casa Nova — Dani & Andressa

Site de lista de presentes e confirmação de presença para o Open House de Dani e Andressa (agosto de 2026).

## O que tem no site

- **Tela inicial** com contador regressivo, data, horário e botão de confirmação de presença
- **Lista de presentes** com filtro por categoria, cards com foto e links de compra
- **Cotas via Pix** com valores sugeridos e descrições divertidas (R$50 a R$300)
- **Deixe um recado** para o casal
- **Endereço** com link direto para o Google Maps
- **WhatsApp** para falar com as anfitriãs
- **Painel admin** em `/admin` para acompanhar confirmações, reservas e mensagens

## Stack

- [TanStack Start](https://tanstack.com/start) — framework full-stack React
- [TanStack Router](https://tanstack.com/router) — roteamento baseado em arquivos
- [Supabase](https://supabase.com) — banco de dados (PostgreSQL), auth e realtime
- [Tailwind CSS v4](https://tailwindcss.com) — estilização com paleta oklch
- [shadcn/ui](https://ui.shadcn.com) — componentes (Radix UI)

## Tabelas no Supabase

| Tabela | Uso |
|---|---|
| `event_settings` | Nome, data, endereço, chave Pix, WhatsApp |
| `gifts` | Lista de presentes com links de compra |
| `couple_photos` | Fotos para o fundo animado |
| `rsvps` | Confirmações de presença |
| `guest_messages` | Recados dos convidados + confirmações Pix |
| `gift_reservations` | Reservas de presentes |

## Rodando localmente

```bash
npm install
npm run dev
```

Crie um arquivo `.env` na raiz com:

```
VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_aqui
```

## Admin

Acesse `/admin` — redireciona para `/auth` automaticamente. Faça login com as credenciais cadastradas no Supabase.
