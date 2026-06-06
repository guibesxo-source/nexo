# Nexo — Documentação do Produto

> **O hub que faz os seus eventos acontecerem.**
> SaaS de gestão de eventos que centraliza **financeiro, checklist e inscritos** num só painel — substituindo 6+ ferramentas e planilhas.

**Dono do produto:** Guilherme Bessa
**Status:** Pré-lançamento — beta privado 2026
**Última atualização:** 2026-06-05

---

## O que é esta pasta

Documentação completa do Nexo, do início do desenvolvimento até o lançamento. A **landing page** (`../index.html`) é o artefato canônico de marca/copy e a fonte da qual esta documentação foi destilada.

> ⚠️ **Convenção:** estes documentos são a base de produto/engenharia. As decisões abaixo foram travadas com o dono do produto em 2026-06-05:
> - **Stack:** Next.js + Supabase + Vercel + Stripe (HubSpot já integrado para captação de leads)
> - **Monetização:** assinatura mensal/anual por organizador + plano de fundador (preço vitalício para betas)
> - **Estrutura de documentação:** pacote de produto completo

---

## Índice

| # | Documento | O que cobre |
|---|-----------|-------------|
| 01 | [Visão do Projeto](./01-visao-projeto.md) | Problema, solução, missão, oportunidade de mercado, princípios |
| 02 | [PRD — Requisitos do Produto](./02-prd.md) | Escopo do MVP, requisitos funcionais (FR) e não-funcionais (NFR), fora de escopo |
| 03 | [Personas e ICP](./03-personas-icp.md) | Públicos-alvo, jobs-to-be-done, perfil de cliente ideal |
| 04 | [Arquitetura Técnica](./04-arquitetura-tecnica.md) | Stack, topologia, integrações, decisões (ADRs), segurança |
| 05 | [Modelo de Dados](./05-modelo-de-dados.md) | Entidades, relacionamentos, schema Postgres, RLS, multi-tenant |
| 06 | [Roadmap até o Lançamento](./06-roadmap-lancamento.md) | Fases: discovery → MVP → beta → GA, marcos e critérios de saída |
| 07 | [Go-to-Market](./07-go-to-market.md) | Pricing, funil de beta, canais, plano de lançamento |
| 08 | [Design System](./08-design-system.md) | Tokens, tipografia, componentes, tom de voz |
| 09 | [Métricas e KPIs](./09-metricas-kpis.md) | North star, métricas de produto/negócio, instrumentação |
| 10 | [Deploy GitHub Pages e Prototipo Estatico](./10-deploy-github-pages-prototipo.md) | Fluxo LP -> login -> app, arquivos publicados, deploy e rotina de edicao |

---

## Mapa do produto em uma frase

```
Organizador de eventos  →  cria evento no Nexo  →  gerencia inscritos,
checklist e financeiro num painel único, em tempo real  →  fecha o evento
com relatório de resultado (taxa de confirmação, custo por inscrito, saldo).
```

## Pilares de funcionalidade (da LP)

1. **Financeiro centralizado** — custos, NFs e orçamento por evento, em tempo real.
2. **Checklist com status** — tarefas com acompanhamento compartilhado pela equipe.
3. **Gestão de inscritos** — lista, filtros, histórico e exportação.
4. **Insights por evento** — taxa de confirmação, custo por inscrito, performance.
5. **Hub completo** — do lançamento ao pós-evento, sem trocar de app.
6. **Tempo real** — equipe sincronizada; toda atualização reflete na hora.

---

## Artefatos relacionados

| Artefato | Local |
|----------|-------|
| Landing Page v2 (canônica) | `IA\projetos\Nexo\index.html` |
| Protótipo publicado | GitHub Pages: `https://guibesxo-source.github.io/nexo/` · repo `guibesxo-source/nexo` |
| Workspace no Vault (Obsidian) | `Obsidian\Vault 01\Nexo\` — espaço dedicado do produto (estrutura 00–09 + 99) |
| Notas técnicas (identidade/LP/HubSpot) | `Obsidian\Vault 01\02 - Documentacao Tecnica\Nexo\` |
| Captação de leads | HubSpot portal `51566439` (conta pessoal), form `0c832958-aff1-44b2-bd65-65ad772dab5a` (campo `segmento`) |
