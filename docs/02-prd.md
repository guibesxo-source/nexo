# 02 — PRD (Product Requirements Document)

**Produto:** Nexo · **Versão do PRD:** 1.0 · **Atualizado:** 2026-06-05

> Requisitos derivados da LP v2 e das decisões do dono do produto. Notação: **FR** = requisito funcional, **NFR** = requisito não-funcional. Prioridade: **P0** (MVP), **P1** (beta), **P2** (pós-lançamento).

---

## 1. Objetivo do produto

Permitir que um organizador gerencie todo o back-office de um evento — inscritos, checklist e financeiro — num painel único, colaborativo e em tempo real, e feche cada evento com um relatório de resultado.

## 2. Métrica norte (North Star)

**Eventos ativos gerenciados de ponta a ponta no Nexo** (criados → com inscritos + financeiro lançados → encerrados com relatório). Detalhe em [09 — Métricas](./09-metricas-kpis.md).

---

## 3. Escopo do MVP (o que entra primeiro)

O MVP cobre **um organizador gerenciando seus eventos** com as 4 capacidades núcleo da LP. Multiusuário em tempo real entra no beta.

### Épico A — Conta e Workspace
- **FR-A1 (P0):** Cadastro/login por e-mail (e social posterior). Autenticação via Supabase Auth.
- **FR-A2 (P0):** Cada conta tem um **workspace** (organização) que isola todos os dados.
- **FR-A3 (P1):** Convidar membros para o workspace com papéis (owner, admin, membro, leitor).

### Épico B — Eventos
- **FR-B1 (P0):** Criar evento (nome, data, local, status, orçamento previsto).
- **FR-B2 (P0):** Listar eventos do workspace com status e progresso de tarefas.
- **FR-B3 (P0):** Página "Visão geral" do evento com KPIs (inscritos, confirmados, % orçamento, tarefas).
- **FR-B4 (P2):** Duplicar evento / criar a partir de template.

### Épico C — Inscritos
- **FR-C1 (P0):** Adicionar inscrito (nome, e-mail, empresa, status).
- **FR-C2 (P0):** Status de inscrito: `pendente`, `confirmado`, `check-in`.
- **FR-C3 (P0):** Tabela com busca (nome/e-mail/empresa) e filtro por status.
- **FR-C4 (P0):** Exportar inscritos em CSV.
- **FR-C5 (P1):** Importar inscritos em CSV (ex.: vindos de Sympla/Eventbrite).
- **FR-C6 (P2):** Check-in via QR code / link público de confirmação.

### Épico D — Checklist
- **FR-D1 (P0):** Criar tarefas por evento com responsável e prazo.
- **FR-D2 (P0):** Marcar tarefa como concluída; indicador de progresso (ex.: 17/24).
- **FR-D3 (P1):** Tarefas atrasadas destacadas; prioridade visual.
- **FR-D4 (P2):** Templates de checklist por tipo de evento (online/presencial).

### Épico E — Financeiro
- **FR-E1 (P0):** Definir orçamento do evento e lançar transações (entrada/saída) com categoria.
- **FR-E2 (P0):** Acompanhar gasto vs. orçamento (valor, % e saldo disponível).
- **FR-E3 (P0):** Gasto por categoria (Local, Marketing, Catering, Equipe etc.).
- **FR-E4 (P1):** Status de pagamento (pago/pendente/recebido) e anexo de NF.
- **FR-E5 (P2):** Relatório financeiro exportável (PDF).

### Épico F — Insights & Relatório
- **FR-F1 (P0):** Dashboard do evento (inscritos por período, taxa de confirmação, orçamento).
- **FR-F2 (P1):** Custo por inscrito e por confirmado.
- **FR-F3 (P2):** Relatório de encerramento do evento (resultado consolidado).

### Épico G — Tempo real & Colaboração
- **FR-G1 (P1):** Atualizações refletem em tempo real para todos os membros (Supabase Realtime).
- **FR-G2 (P2):** Log de atividade por evento (quem mudou o quê).

### Épico H — Billing
- **FR-H1 (P1):** Assinatura via Stripe (mensal/anual); plano de fundador para betas.
- **FR-H2 (P1):** Limites por plano (nº de eventos ativos, membros).
- **FR-H3 (P2):** Portal de autoatendimento de cobrança (Stripe Customer Portal).

---

## 4. Requisitos não-funcionais (NFR)

| ID | Requisito | Alvo |
|----|-----------|------|
| NFR-1 | Performance | Telas principais carregam < 2s; interações < 200ms percebidos |
| NFR-2 | Tempo real | Propagação de mudança entre clientes < 1s |
| NFR-3 | Segurança | Isolamento total entre workspaces via RLS no Postgres |
| NFR-4 | Privacidade/LGPD | Dados de inscritos são PII; consentimento, exportação e deleção sob demanda |
| NFR-5 | Disponibilidade | 99.5%+ no beta; backups diários gerenciados (Supabase) |
| NFR-6 | Responsivo | Uso pleno em desktop; consulta/check-in confortável no mobile |
| NFR-7 | Acessibilidade | Contraste AA; verde nunca como texto longo sobre branco |
| NFR-8 | Observabilidade | Logs de erro e métricas de produto instrumentados desde o MVP |

---

## 5. Fora de escopo (não-objetivos)

- Venda de ingressos / gateway de ticketing (integra com Sympla/Eventbrite, não substitui).
- CRM de marketing completo (a captação de leads do beta segue no HubSpot).
- Emissão fiscal / contabilidade (apenas registro e anexo de NF).
- App mobile nativo no MVP (web responsivo primeiro).
- Marketplace de fornecedores.

---

## 6. Fluxos de usuário principais (MVP)

1. **Onboarding:** cadastro → cria workspace → cria primeiro evento → adiciona inscritos.
2. **Operação diária:** abre evento → atualiza checklist → lança despesa → confere dashboard.
3. **Pré-evento:** confirma inscritos → fecha checklist → valida orçamento.
4. **Pós-evento:** check-in → encerra evento → gera relatório de resultado.

---

## 7. Critérios de aceite do MVP (Definition of Done)

- Um organizador consegue, sem suporte, criar um evento e gerenciar inscritos + checklist + financeiro de ponta a ponta.
- Exportar inscritos em CSV funciona.
- Dashboard do evento mostra números corretos em tempo quase real.
- Isolamento entre workspaces comprovado (testes de RLS).
- Deploy em produção (Vercel + Supabase) com monitoramento básico.

> Requisitos de pricing detalhados em [07 — Go-to-Market](./07-go-to-market.md). Personas em [03](./03-personas-icp.md).
