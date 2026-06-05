# 05 — Modelo de Dados

**Produto:** Nexo · **Banco:** PostgreSQL (Supabase) · **Atualizado:** 2026-06-05

> Modelo multi-tenant isolado por `workspace_id`, com RLS em todas as tabelas. DDL abaixo é a **proposta inicial** (a validar pelo desenvolvimento); reflete os FRs do [PRD](./02-prd.md).

---

## 1. Entidades principais

| Entidade | Descrição |
|----------|-----------|
| `profiles` | Usuário (espelha `auth.users` do Supabase) |
| `workspaces` | Organização/conta — fronteira de isolamento de dados |
| `memberships` | Vínculo usuário ↔ workspace, com papel |
| `events` | Evento gerenciado |
| `attendees` | Inscritos de um evento |
| `tasks` | Itens de checklist de um evento |
| `transactions` | Lançamentos financeiros (entrada/saída) |
| `budget_categories` | Categorias de gasto (Local, Marketing, Catering…) |
| `subscriptions` | Estado de assinatura (espelho do Stripe) |
| `activity_log` | Trilha de auditoria (P2) |

---

## 2. Diagrama de relacionamentos (ER textual)

```
profiles ──< memberships >── workspaces
                                 │
                                 ├──< events
                                 │     ├──< attendees
                                 │     ├──< tasks
                                 │     ├──< transactions >── budget_categories
                                 │     └──  (dashboard = agregação)
                                 ├──  subscriptions (1:1 com workspace)
                                 └──< activity_log
```

- Um **workspace** tem muitos eventos, membros, categorias e uma assinatura.
- Um **evento** tem muitos inscritos, tarefas e transações.
- Toda tabela de domínio carrega `workspace_id` (desnormalizado p/ RLS simples e performática).

---

## 3. DDL proposto (resumido)

```sql
-- Enums
create type membership_role as enum ('owner','admin','member','viewer');
create type event_status   as enum ('rascunho','planejamento','confirmado','encerrado','cancelado');
create type attendee_status as enum ('pendente','confirmado','checkin','cancelado');
create type task_status     as enum ('aberta','concluida');
create type tx_kind         as enum ('entrada','saida');
create type tx_payment      as enum ('pago','pendente','recebido');

-- Perfil (1:1 com auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Workspace (tenant)
create table workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references profiles(id),
  created_at timestamptz default now()
);

-- Vínculo usuário ↔ workspace
create table memberships (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  role membership_role not null default 'member',
  created_at timestamptz default now(),
  unique (workspace_id, user_id)
);

-- Evento
create table events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  status event_status not null default 'planejamento',
  starts_at timestamptz,
  location text,
  budget_planned numeric(12,2) default 0,
  created_at timestamptz default now()
);

-- Inscritos
create table attendees (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  event_id uuid not null references events(id) on delete cascade,
  name text not null,
  email text,
  company text,
  status attendee_status not null default 'pendente',
  created_at timestamptz default now()
);

-- Checklist
create table tasks (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  event_id uuid not null references events(id) on delete cascade,
  title text not null,
  status task_status not null default 'aberta',
  assignee_id uuid references profiles(id),
  due_date date,
  created_at timestamptz default now()
);

-- Categorias de orçamento (por workspace)
create table budget_categories (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null
);

-- Financeiro
create table transactions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  event_id uuid not null references events(id) on delete cascade,
  category_id uuid references budget_categories(id),
  kind tx_kind not null,
  description text,
  amount numeric(12,2) not null,
  payment_status tx_payment,
  invoice_url text,            -- NF em Supabase Storage
  occurred_on date default now(),
  created_at timestamptz default now()
);

-- Assinatura (espelho do Stripe)
create table subscriptions (
  workspace_id uuid primary key references workspaces(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text,                   -- 'founder' | 'pro_monthly' | 'pro_annual' | 'trial'
  status text,                 -- 'active' | 'past_due' | 'canceled' ...
  current_period_end timestamptz
);
```

> Índices recomendados: `(workspace_id)` e `(event_id)` nas tabelas filhas; `attendees(event_id, status)`; `transactions(event_id, occurred_on)`.

---

## 4. Row-Level Security (RLS)

Princípio: **um usuário só acessa linhas de workspaces aos quais pertence** (via `memberships`).

```sql
-- Habilitar RLS
alter table events enable row level security;

-- Helper: workspaces do usuário atual
create or replace function auth_workspace_ids()
returns setof uuid language sql stable as $$
  select workspace_id from memberships where user_id = auth.uid()
$$;

-- Política de leitura
create policy "read own workspace events"
on events for select
using ( workspace_id in (select auth_workspace_ids()) );

-- Política de escrita (insert/update/delete) — repetir padrão por tabela
create policy "write own workspace events"
on events for all
using ( workspace_id in (select auth_workspace_ids()) )
with check ( workspace_id in (select auth_workspace_ids()) );
```

O mesmo padrão se aplica a `attendees`, `tasks`, `transactions`, `budget_categories`. Papéis (`role`) refinam permissões na aplicação (ex.: `viewer` não escreve).

---

## 5. Agregações de dashboard (derivadas, não armazenadas)

Calculadas por query/view a partir das tabelas-fonte:

| KPI | Origem |
|-----|--------|
| Inscritos / Confirmados / Taxa | `count(attendees)` por `status` |
| % do orçamento gasto | `sum(transactions.amount where kind='saida') / events.budget_planned` |
| Saldo disponível | `budget_planned - gasto` |
| Tarefas (x/y, atrasadas) | `count(tasks)` por `status` e `due_date < now()` |
| Gasto por categoria | `sum(transactions.amount) group by category_id` |
| Custo por inscrito | `gasto / count(attendees)` |

> Considerar **views** (`event_overview`) para encapsular essas agregações.

---

## 6. Considerações

- **Soft delete** (P2): coluna `deleted_at` em entidades sensíveis para recuperação.
- **Moeda:** assumir BRL no MVP; `numeric(12,2)` evita erro de ponto flutuante.
- **Auditoria (P2):** `activity_log(workspace_id, event_id, actor_id, action, payload, created_at)`.
- **Importação CSV:** staging temporário + validação Zod antes de inserir em `attendees`.

> Continua em [06 — Roadmap até o Lançamento](./06-roadmap-lancamento.md).
