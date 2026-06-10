# CLAUDE.md — Nexo

Guia para o Claude Code ao trabalhar nesta pasta. **Projeto pessoal do Guilherme Bessa** — independente do trabalho na Prolog App.

## O que é o Nexo

SaaS de gestão de eventos: centraliza **financeiro, checklist e inscritos** num só painel, em tempo real, substituindo 6+ ferramentas e planilhas.

> *"O hub que faz os seus eventos acontecerem."*

- **Dono:** Guilherme Bessa (solo founder)
- **Status:** pré-lançamento — protótipo publicado, beta privado planejado para 2026
- **Repo:** `guibesxo-source/nexo` · protótipo em GitHub Pages: https://guibesxo-source.github.io/nexo/

## ⚠️ Separação Prolog × Nexo (REGRA CRÍTICA)

O Nexo é **pessoal** e NÃO deve nunca ser misturado com o trabalho da Prolog App.

- **Conta pessoal:** guibesxo@gmail.com
- **HubSpot do Nexo:** portal pessoal `51566439` (captação de leads do beta na LP).
- **NUNCA** usar o HubSpot da Prolog (conta `44667852`) para qualquer coisa do Nexo — a integração HubSpot do Claude está logada na Prolog, então **não a use** para o Nexo.
- Material, dados e credenciais da Prolog ficam fora deste projeto.

## Estado atual do código

Este repo é o **protótipo estático (HTML/CSS/JS)** + LP publicada no GitHub Pages. A **app real Next.js vive em repo separado**: `guibesxo-source/nexo-app` (local: `C:\Users\guibess\Desktop\nexo-app`).

| Arquivo / pasta | O que é |
|-----------------|---------|
| `index.html` | Landing page v2 — artefato **canônico** de marca/copy |
| `login.html` | Tela de login do protótipo |
| `app.html` + `app/` | Protótipo da área logada |
| `site/site.css` · `image-slot.js` · `Imagens/` | Assets da LP |
| `Criativos/` | Criativos de anúncio (PNGs em `1x1/`, `4x5/`, `9x16/`) + `ads.html` (stub de preview, incompleto) |
| `docs/` | Pacote de produto (01–11) — visão, PRD, arquitetura, dados, roadmap, GTM, design system, métricas, deploy, domínio |
| `_old/` | Backups locais (fora do repo, no `.gitignore`) |

Fluxo do protótipo: **LP → login → app**. Ver `docs/10-deploy-github-pages-prototipo.md`.

> `Nexo Site.html` (cópia duplicada da LP) foi removido em 2026-06-09.

## Stack-alvo (decidida em 2026-06-05)

**Next.js (App Router) + Supabase + Vercel + Stripe** · HubSpot para captação de leads.

> **A app nasceu em 2026-06-09** (fase F1 do roadmap) no repo irmão `nexo-app`: esqueleto Next.js (App Router, TS, Tailwind v4) com rotas stub, clients Supabase (`@supabase/ssr`), validações Zod e design tokens da marca portados via `@theme`. Sem banco/auth/billing ainda.

- **Linguagem:** TypeScript ponta a ponta; tipos do banco via `supabase gen types`.
- **Validação:** Zod nas bordas (formulários e route handlers).
- **Estado servidor:** Server Components + Server Actions; client components só onde há interação/tempo real.
- **Imports absolutos:** `@/components`, `@/lib`, etc.
- **Dados:** queries tipadas em `@/lib/db/*` — nada de query crua na UI.
- **Multi-tenant:** *shared schema* isolado por `workspace_id`, com **RLS** em todas as tabelas (fronteira de segurança no banco).
- **Tempo real:** Supabase Realtime, canais assinados por `event_id`.
- **Billing:** Stripe (Checkout + Customer Portal + Webhooks), com plano de fundador (vitalício para betas).

Estrutura de pastas proposta para a app (de `docs/04-arquitetura-tecnica.md`):
```
app/ (auth)/ (app)/events/[id]/ api/
components/   lib/db lib/supabase lib/stripe lib/validations   types/
```

## Pilares de funcionalidade

1. Financeiro centralizado (custos, NFs, orçamento por evento)
2. Checklist com status compartilhado pela equipe
3. Gestão de inscritos (lista, filtros, histórico, exportação)
4. Insights por evento (taxa de confirmação, custo por inscrito)
5. Hub completo (lançamento → pós-evento sem trocar de app)
6. Tempo real (equipe sincronizada)

## Identidade visual & Design System

> **Fontes de verdade.** A marca canônica é o código deste repo: a LP `index.html` (`:root`) para a parte pública e `app/app.css` para a área logada. A documentação narrativa vive no vault em `…\Obsidian\Vault 01\Nexo\` — principalmente `03 - Design e UX\08-design-system.md`, `03 - Design e UX\Nexo - Brief para Site (App).md` e `09 - Referencias\documentacao-tecnica-nexo\Nexo - Identidade Visual.md`. **Atenção:** esses docs são "v0.1, destilada da LP v2" e ainda apontam para caminhos antigos (`IA\nexo-app\lp\Nexo v2.html`, `IA\projetos\Nexo\index.html`); o artefato canônico real é o `index.html` **deste repositório**. Quando o código e o doc divergirem, **o código vence** — ver "Estado atual vs. documentado" abaixo.

### Conceito de marca

Alto contraste **preto sobre branco** com **um único acento: verde sinal**. A disciplina cromática **é** a identidade — sem gradientes coloridos genéricos, sem paletas amplas. Personalidade: direto, pragmático, anti-caos, confiável, "produto sério". Sensação: preto = robustez/foco · verde = ação/confirmar · branco = clareza.

**Regra de ouro:** o verde `#00E47C` é o **único** acento de marca. CTA verde **sempre com texto preto** (nunca branco). As cores de status (âmbar/azul/vermelho/roxo) são **funcionais dentro do app** — não entram na comunicação/marketing.

### Tokens de cor (núcleo) — definidos em `index.html :root` e `app/app.css`

| Token | Hex | Uso |
|-------|-----|-----|
| `--black` | `#000000` | Fundos hero/waitlist, alto contraste |
| `--ink` / `--text` | `#0A0A0A` | Texto principal |
| `--ink-2` | `#111111` | Superfícies escuras |
| `--ink-3` | `#1A1A1A` | Bordas/superfícies escuras |
| `--white` | `#FFFFFF` | Cards, texto sobre escuro |
| `--off-white` | `#F7F7F5` | Fundo geral da página |
| **`--green`** | **`#00E47C`** | **Ação primária: CTA, destaque, pill do headline** |
| `--green-deep` | `#00B863` | Hover de CTA, texto verde sobre claro |
| `--green-soft` | `#E6FBF1` | Tag/eyebrow, badge "confirmado" |
| `--green-glow` | `rgba(0,228,124,0.35)` | Brilho/sombra verde |
| `--muted` | `#4A4A4A` | Texto secundário · `--muted-inv` `#B8B8B8` sobre escuro |
| `--dim` | `#6B6B6B` | Labels, metadados, placeholders |
| `--line` | `rgba(0,0,0,0.10)` | Bordas em fundo claro · `--line-inv` em fundo escuro |

### Tipografia

**Fonte única: `Inter`** (Google Fonts, pesos 400–900), nos dois artefatos. Assinatura: títulos peso **800** com tracking bem negativo (`-0.03` a `-0.035em`) + **uma palavra destacada numa pill verde rotacionada `-1°`** (`.hero h1 .mark`). Eyebrow = pill verde (`.eyebrow`) com **ponto pulsante** antes dos títulos (`.on-dark` para fundo escuro).

| Estilo | Tamanho | Peso | Tracking |
|--------|---------|------|----------|
| `.h-display` (hero) | `clamp(44px, 6vw, 72px)` | 800 | -0.035em |
| `.h-section` | `clamp(32px, 4.4vw, 52px)` | 800 | -0.03em |
| `h3` / card | 19–22px | 700 | -0.015em |
| `.lead` | 18px | 400 | máx. 60ch, line-height 1.6 |
| corpo | 15–17px | 400 | line-height 1.55 |
| `.eyebrow` | 12px | 700 | 0.18em, UPPERCASE |

### Forma, espaço e componentes (LP)

- **Raios (LP):** card `--radius-card: 18px` · botão/input `--radius-btn: 10px` · pills `999px`. Container `--container: 1240px`. Seção `96px` desktop / `64px` mobile.
- **Botão primário** (`.btn-primary`): fundo verde, **texto preto**, peso 700, hover com `translateY` + sombra de glow. **Botão outline:** borda preta 1.5px, hover inverte (preto/branco). **Botão ghost:** sobre fundo escuro, borda branca translúcida.
- **Hero:** full-bleed preto + gradiente cinematográfico sobre imagem + **card de signup branco** flutuante; `trust-card` em glassmorphism. **Marquee** preto superior (escassez do beta). **Showcase** com abas Dashboard/Inscritos/Financeiro numa "janela de navegador". **Cards de feature** em grid (ícone em quadrado verde de 44px).

### Como a identidade atua HOJE (estado real do código)

A LP evoluiu **além** do design system v0.1 documentado. O que está vivo no `index.html` e que os docs ainda não refletem:

- **Gradientes de marca adicionados** (não existem no v0.1 "flat green"):
  - `--grad-btn: linear-gradient(120deg, #00b866, #00e47c 52%, #25ef8e)` — o CTA primário agora é **gradiente verde com varredura animada** no hover (`background-position`) + `translateY(-2px)`, não verde chapado.
  - `--grad-text` + classe `.grad-green` — **texto com gradiente verde animado** (`@keyframes gradFlow`, 6s) para palavras de destaque.
- **`prefers-reduced-motion: reduce`** desliga as animações (`.grad-green`, `.btn-primary`, glow da waitlist) — respeitar ao mexer em motion.
- **Ícones ainda são emojis** nos cards de feature (`💰 ✅ 👥`) — a migração para Lucide **NÃO** foi feita aqui. (Já aparece algum SVG real, ex.: wordmark Apple no bloco de CTA — então SVGs começaram a entrar pontualmente.)
- **Imagens do hero ainda são placeholders** via `image-slot.js` (`<image-slot>`), não fotos/render reais.
- **Logo/símbolo ainda é desenhado em CSS** (`.logo .mark` — quadrado preto + ponto verde com anel duplo). Não há SVG nem favicon definitivos.

### Design System da área logada (`app/app.css`)

`app.html` é um **protótipo React 18 (UMD) + Babel-standalone** single-page, com JSX em `app/components.jsx`, `app/views-main.jsx`, `app/views-extra.jsx`, estilizado por `app/app.css?v=2`. É gated por `nexo_demo_session` no `localStorage` (sem isso, redireciona para `login.html`). Ele **estende o vocabulário da LP** com um sistema de tokens mais formal e completo — efetivamente já adianta o "formalizar o sistema" que os docs listam como pendência:

- **Neutros extras:** `--panel #FAFAF8`, `--faint #9A9A97`, `--line-2`, `--line-strong`.
- **Status como tokens de 1ª classe** (par cor+soft): âmbar `#B45309`/`#FEF3C7`, azul `#0369A1`/`#E0F2FE`, vermelho `#DC2626`/`#FEE2E2`, roxo `#7C3AED`. Mapeiam para pendente / check-in / saída-erro / diferenciação de pessoas.
- **Escala de raio própria:** `--r-sm 8` · `--r-md 12` · `--r-lg 16` · `--r-xl 22`. ⚠️ **Inconsistência conhecida:** difere dos raios da LP (`18`/`10`) — reconciliar quando o app real for construído.
- **Layout/motion/sombra:** `--sidebar-w 252px`, `--topbar-h 68px`, `--shadow-sm/md/lg`, `--ease cubic-bezier(.22,1,.36,1)`. `::selection` verde sobre preto.

### Pendências de evolução da marca (ainda abertas)

1. Verde mais "dono" da marca (`#00E47C` é um verde tech/cripto comum).
2. Fonte de **display distinta** só nos headlines/wordmark (hoje tudo é Inter).
3. **Logo definitivo em SVG** (sistema: ícone, wordmark, lockups, mono) + favicon.
4. Trocar **emojis por ícones vetoriais** (Lucide) nos features.
5. **Imagens reais** do hero (hoje `image-slot` placeholders).
6. **Reconciliar tokens** LP × app (raios, neutros) num arquivo único reutilizável quando a app Next.js nascer.

> Ao construir a UI real (Next.js), herdar estes tokens: o `app/app.css` é o ponto de partida mais maduro; a LP manda na linguagem de marca pública.

## Comandos

> A app Next.js ainda não existe. Quando for criada, os comandos padrão serão:
```bash
npm run dev          # desenvolvimento
npm run lint
npm run typecheck
npm test
supabase gen types   # gerar tipos do banco
supabase db push     # aplicar migrations
```
Protótipo atual: abrir `index.html` direto no navegador (estático).

## Documentação de produto

Toda a base de produto/engenharia está em `docs/` (índice em `docs/00-README.md`). A LP (`index.html`) é a fonte canônica da qual os docs foram destilados.

> **Nota:** este projeto é independente do framework AIOX (que vive em `..\IA\`). As convenções AIOX (agentes, stories, gates) **não se aplicam** aqui.
