# 04 — Arquitetura Técnica

**Produto:** Nexo · **Atualizado:** 2026-06-05
**Stack decidida:** Next.js + Supabase + Vercel + Stripe (HubSpot para captação)

> Arquitetura otimizada para **velocidade de entrega de um fundador enxuto** sem comprometer multi-tenant, tempo real e segurança. Decisões registradas como ADRs na seção 7.

---

## 1. Visão geral (topologia)

```
                ┌─────────────────────────────────────────────┐
   Navegador →  │  Next.js (App Router) hospedado na Vercel    │
   (web/mobile) │  - UI React + Tailwind                       │
                │  - Server Components / Route Handlers (API)  │
                │  - Auth helpers do Supabase                  │
                └───────────────┬─────────────────────────────┘
                                │  (SDK supabase-js + RLS)
                ┌───────────────▼─────────────────────────────┐
                │  Supabase (projeto gerenciado)               │
                │  - Postgres (dados + RLS multi-tenant)       │
                │  - Auth (e-mail, OAuth)                       │
                │  - Realtime (sync entre clientes)            │
                │  - Storage (NFs, anexos)                     │
                │  - Edge Functions (webhooks, jobs)           │
                └───────┬───────────────────────┬─────────────┘
                        │                       │
              ┌─────────▼────────┐    ┌─────────▼──────────┐
              │ Stripe (billing) │    │ HubSpot (leads do  │
              │ assinaturas +    │    │ beta — já ativo na │
              │ webhooks         │    │ LP, portal 51566439)│
              └──────────────────┘    └────────────────────┘
```

---

## 2. Camadas e responsabilidades

| Camada | Tecnologia | Responsabilidade |
|--------|-----------|------------------|
| **Front-end** | Next.js (App Router), React, TypeScript, Tailwind CSS | UI, rotas, render server/client, formulários |
| **Componentes UI** | Tokens do [Design System](./08-design-system.md) (preto/branco/verde) | Consistência visual com a marca |
| **API/BFF** | Route Handlers do Next + Server Actions | Lógica de servidor, validação, orquestração |
| **Auth** | Supabase Auth | Sessão, OAuth, recuperação de senha |
| **Dados** | Supabase Postgres + RLS | Persistência multi-tenant, integridade |
| **Tempo real** | Supabase Realtime (Postgres changes / broadcast) | Sincronização de inscritos, checklist, financeiro |
| **Arquivos** | Supabase Storage | Upload de NF e anexos, com políticas de acesso |
| **Jobs/Webhooks** | Supabase Edge Functions | Webhook do Stripe, exportações, tarefas assíncronas |
| **Pagamentos** | Stripe (Checkout + Customer Portal + Webhooks) | Assinaturas, plano de fundador, limites |
| **Captação** | HubSpot Forms (embed) | Leads do beta (já integrado na LP) |
| **Deploy/Infra** | Vercel (front), Supabase (back gerenciado) | CI/CD, edge, observabilidade |

---

## 3. Padrões de aplicação

- **Linguagem:** TypeScript em todo o stack; tipos do banco gerados via `supabase gen types`.
- **Validação:** schema com **Zod** nas bordas (formulários e route handlers).
- **Estado servidor:** preferir Server Components + Server Actions; client components só onde há interação/tempo real.
- **Imports absolutos** (alinhado ao princípio do AIOX): `@/components`, `@/lib`, etc.
- **Camada de dados:** funções tipadas em `@/lib/db/*` encapsulam queries do Supabase; nada de query crua espalhada na UI.
- **Tempo real:** hooks dedicados (`useRealtimeEvent`, `useRealtimeChecklist`) assinam canais por `event_id`.

### Estrutura de pastas proposta
```
app/                # rotas (App Router)
  (auth)/           # login, signup
  (app)/            # área logada
    events/
    events/[id]/    # dashboard, inscritos, financeiro, checklist
  api/              # route handlers (webhooks, exports)
components/         # UI reutilizável (design system)
lib/
  db/               # acesso a dados tipado
  supabase/         # clients (server/client/admin)
  stripe/           # billing
  validations/      # schemas zod
types/              # tipos gerados + domínio
```

---

## 4. Multi-tenant e segurança

- **Modelo:** *shared database, shared schema* com isolamento por `workspace_id` em toda tabela.
- **RLS:** políticas em todas as tabelas garantem que o usuário só lê/escreve linhas do(s) workspace(s) ao qual pertence (via tabela `memberships`). Detalhe em [05 — Modelo de Dados](./05-modelo-de-dados.md).
- **Service role:** chave de admin do Supabase usada **só** em server/Edge Functions (nunca no client).
- **Segredos:** em variáveis de ambiente (Vercel/Supabase), nunca no repositório.
- **PII/LGPD:** dados de inscritos são pessoais → consentimento, exportação e deleção sob demanda; logs sem PII sensível.
- **Webhooks:** validação de assinatura do Stripe; idempotência por `event id`.

---

## 5. Integrações externas

| Integração | Uso | Direção |
|-----------|-----|---------|
| **Stripe** | Assinaturas, plano fundador, limites, portal de cobrança | Bidirecional (Checkout + Webhooks) |
| **HubSpot** | Leads do beta (waitlist) | LP → HubSpot (embed já ativo) |
| **Sympla/Eventbrite** (P1+) | Importar inscritos via CSV; integração API depois | Entrada |
| **E-mail transacional** (P1) | Confirmações, convites de equipe (ex.: Resend) | Saída |

---

## 6. Ambientes e deploy

| Ambiente | Front | Back |
|----------|-------|------|
| **Local** | `next dev` | Supabase local (CLI) ou projeto dev |
| **Preview** | Deploy automático por PR (Vercel) | Projeto Supabase de staging |
| **Produção** | Vercel (domínio `app.nexo.events`) | Projeto Supabase de produção |

- **CI:** lint + typecheck + testes em cada PR; migrations versionadas (`supabase/migrations`).
- **Observabilidade:** logs da Vercel + Supabase; captura de erros (ex.: Sentry) desde o MVP.

---

## 7. Decisões de arquitetura (ADRs resumidos)

| ADR | Decisão | Razão |
|-----|---------|-------|
| ADR-1 | **Supabase** como backend | Postgres + Auth + Realtime + Storage num só serviço gerenciado → menos infra para fundador solo; o "tempo real" da LP sai nativo |
| ADR-2 | **Next.js na Vercel** | Integração de primeira classe, SSR/edge, deploy por PR, ótimo DX |
| ADR-3 | **RLS no banco** como fronteira de segurança | Isolamento multi-tenant garantido no dado, não só na aplicação |
| ADR-4 | **Stripe** para billing | Padrão de mercado, suporta assinatura + plano vitalício de fundador via preços dedicados |
| ADR-5 | **Manter HubSpot** para leads | Já integrado e funcionando na LP; não reinventar captação |
| ADR-6 | **TypeScript + Zod** ponta a ponta | Segurança de tipos e validação nas bordas reduz bugs com equipe enxuta |

---

## 8. Riscos técnicos

| Risco | Mitigação |
|-------|-----------|
| RLS mal configurada vaza dados entre workspaces | Testes automatizados de isolamento; revisão de toda política |
| Lock-in no Supabase | É Postgres padrão; migrável; abstrair acesso em `@/lib/db` |
| Custo do Realtime/escala | Assinar canais por evento, não globais; medir cedo |
| Webhooks do Stripe perdidos | Idempotência + reprocessamento; reconciliação periódica |

> Continua em [05 — Modelo de Dados](./05-modelo-de-dados.md).
