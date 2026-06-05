# 09 — Métricas e KPIs

**Produto:** Nexo · **Atualizado:** 2026-06-05

> O que medir em cada fase, do beta ao GA. Metas numéricas ficam em aberto até haver baseline real — a estrutura de medição está definida.

---

## 1. North Star Metric

**Eventos ativos gerenciados de ponta a ponta no Nexo.**

Um evento "de ponta a ponta" = criado → com **inscritos e financeiro** lançados → **encerrado com relatório**. Captura valor real entregue (não vaidade), correlaciona com retenção e disposição a pagar.

---

## 2. Métricas por estágio (pirâmide AARRR)

| Estágio | Métrica | Definição |
|---------|---------|-----------|
| **Aquisição** | Leads de waitlist | Submissões no form HubSpot |
| | Taxa de conversão da LP | Visitantes → leads |
| **Ativação** | Setup completo | Conta → workspace → 1º evento criado |
| | "Aha moment" | 1º evento com inscritos **e** ≥1 transação financeira |
| **Retenção** | WAU/MAU | Usuários ativos semanais/mensais |
| | Retenção por coorte | % ativos em S+1, S+4 após ativação |
| | Eventos por usuário | Recorrência de uso (sinal de hábito) |
| **Receita** | Conversão beta→pago | Fundadores que assinam |
| | MRR / ARR | Receita recorrente |
| | Churn | % cancelamento mensal |
| **Indicação** | NPS | Satisfação dos fundadores |
| | Referral | Novos leads vindos de indicação |

---

## 3. KPIs por fase do roadmap

### F0–F3 (Beta)
- Leads qualificados na waitlist (ICP).
- Nº de fundadores ativos semanalmente.
- Taxa de ativação (setup → aha moment).
- NPS dos fundadores.
- Bugs críticos abertos (meta: 0 para avançar).

### F4–F5 (GA)
- MRR / ARR e crescimento.
- Conversão trial/free → Pro.
- Churn mensal e net revenue retention.
- CAC vs. LTV por canal.
- Retenção de coorte (S+4, M+3).

---

## 4. Métricas de produto (operacionais)

| Área | Métrica |
|------|---------|
| Eventos | Criados, ativos, encerrados; % que chega ao relatório |
| Inscritos | Por evento; taxa de confirmação; uso de export/import |
| Checklist | % tarefas concluídas; tarefas atrasadas por evento |
| Financeiro | % eventos com financeiro usado; transações por evento |
| Tempo real | Sessões colaborativas; membros por workspace |

---

## 5. Métricas de saúde técnica (NFR)

| Métrica | Alvo (ref. [PRD](./02-prd.md)) |
|---------|-------------------------------|
| Carregamento de tela | < 2s |
| Latência de tempo real | < 1s |
| Disponibilidade | 99.5%+ no beta |
| Taxa de erro | Monitorada (ex.: Sentry); tendência a zero |

---

## 6. Instrumentação

- **Produto:** eventos de analytics (PostHog ou similar) desde o MVP — `signup`, `workspace_created`, `event_created`, `attendee_added`, `transaction_added`, `event_closed`.
- **Receita:** Stripe como fonte de verdade de MRR/churn; espelhado em `subscriptions`.
- **Erros/performance:** captura de erros + Web Vitals (Vercel).
- **Funil de aquisição:** HubSpot (leads) + analytics da LP.
- **Princípio:** instrumentar a North Star e o funil de ativação **antes** de abrir o beta, para ter baseline.

---

## 7. Cadência de revisão

| Ritmo | O que olhar |
|-------|-------------|
| Semanal (beta) | Ativação, fundadores ativos, bugs críticos, feedback |
| Mensal | MRR, churn, retenção de coorte, NPS |
| Por fase | Critérios de saída do [roadmap](./06-roadmap-lancamento.md) |

> Fim do pacote. Índice em [00 — README](./00-README.md).
