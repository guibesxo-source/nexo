# 06 — Roadmap até o Lançamento

**Produto:** Nexo · **Atualizado:** 2026-06-05

> Caminho do estado atual (LP pronta + captação de beta ativa) até o lançamento público (GA). Datas são **alvos de planejamento** para um fundador enxuto — ajustar conforme capacidade real.

---

## Visão das fases

```
F0 Discovery   F1 Fundação   F2 MVP        F3 Beta priv.   F4 Refino     F5 GA
(feito/agora)  (build base)  (core feats)  (fundadores)    (hardening)   (público)
   ✅ LP          setup        eventos+        onboarding      billing       pricing
   ✅ identidade  auth+db      inscritos+      tempo real      polish        público
   🔄 waitlist    deploy       checklist+      feedback        relatórios    marketing
                               financeiro      loop            LGPD          aberto
```

---

## F0 — Discovery & Posicionamento  ✅ (em andamento, ~concluído)

**Objetivo:** validar dor, marca e captar interesse.
- ✅ Landing Page v2 (identidade preto/branco/verde).
- ✅ Identidade visual v0.1 destilada.
- ✅ Formulário HubSpot integrado (waitlist do beta).
- 🔄 Captar lista de espera + conversar com ICPs.
- **Critério de saída:** volume mínimo de leads qualificados na waitlist + N entrevistas com produtores confirmando a dor e disposição a pagar.

---

## F1 — Fundação técnica  ⏳

**Objetivo:** esqueleto rodando em produção, vazio mas seguro.
- Setup Next.js + Tailwind + design tokens.
- Projeto Supabase (dev/staging/prod), schema base + RLS + tipos gerados.
- Auth (e-mail) + workspace na criação de conta.
- CI (lint/typecheck/test) + deploy Vercel em `app.nexo.events`.
- **Critério de saída:** usuário cria conta, cria workspace, faz login; isolamento RLS testado.

---

## F2 — MVP (core do produto)  ⏳

**Objetivo:** um organizador gerencia um evento de ponta a ponta (todos os FR **P0**).
- Eventos: criar, listar, visão geral.
- Inscritos: CRUD, status, busca/filtro, export CSV.
- Checklist: CRUD, status, progresso.
- Financeiro: orçamento, transações, gasto por categoria.
- Dashboard do evento (KPIs P0).
- **Critério de saída:** Definition of Done do MVP atendida (ver [PRD §7](./02-prd.md)). Dogfooding: o próprio fundador gerencia um evento real no Nexo.

---

## F3 — Beta privado (fundadores)  ⏳

**Objetivo:** primeiros usuários reais pagando preço de fundador; FR **P1**.
- Onboarding guiado + convites de equipe (multiusuário).
- Tempo real (Supabase Realtime) em inscritos/checklist/financeiro.
- Import CSV de inscritos; status de pagamento + anexo de NF.
- Billing Stripe + plano de fundador (preço travado).
- Loop de feedback estruturado com os betas.
- **Critério de saída:** N fundadores ativos usando semanalmente; retenção e NPS dentro da meta; bugs críticos zerados.

---

## F4 — Refino & Hardening  ⏳

**Objetivo:** deixar pronto para público.
- Relatório de encerramento de evento; custo por inscrito/confirmado.
- Polish de UX, performance (NFR-1/2), acessibilidade (NFR-7).
- LGPD: exportação/deleção de dados, consentimento.
- Observabilidade completa (erros, métricas de produto).
- Portal de cobrança (Stripe Customer Portal); limites por plano.
- **Critério de saída:** SLA de disponibilidade, segurança revisada, suporte mínimo definido.

---

## F5 — GA / Lançamento público  ⏳

**Objetivo:** abrir para qualquer organizador.
- Pricing público ativo (mantendo fundadores no preço travado).
- Página de pricing + onboarding self-service.
- Ação de lançamento (ver [07 — Go-to-Market](./07-go-to-market.md)).
- **Critério de saída:** funil de aquisição self-service funcionando; primeiras conversões orgânicas.

---

## Marcos (milestones)

| Marco | Significado |
|-------|-------------|
| **M0** | Waitlist com tração + entrevistas (fim de F0) |
| **M1** | Produção viva e segura (fim de F1) |
| **M2** | MVP usável de ponta a ponta (fim de F2) |
| **M3** | Primeiros fundadores pagantes (durante F3) |
| **M4** | Pronto para público (fim de F4) |
| **M5** | GA / lançamento (F5) |

---

## Dependências e gargalos

- Capacidade de desenvolvimento (fundador enxuto) é o gargalo principal → manter escopo P0 rígido.
- Billing depende de Stripe configurado antes de cobrar fundadores.
- Tempo real e RLS precisam de teste cuidadoso (risco de segurança/UX).
- Decisões em aberto que destravam fases: valores de pricing, logo definitivo, imagens do hero.

> Sequência de monetização e lançamento em [07 — Go-to-Market](./07-go-to-market.md).
