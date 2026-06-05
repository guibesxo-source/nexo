# 08 — Design System

**Produto:** Nexo · **Versão:** v0.1 (destilada da LP v2) · **Atualizado:** 2026-06-05

> Fonte canônica de marca: `IA\projetos\Nexo\index.html`. Há uma versão estendida desta especificação no Vault: `Obsidian\Vault 01\02 - Documentacao Tecnica\Nexo\Nexo - Identidade Visual.md`. Distinto do Design System da Prolog (Nexo é projeto próprio).

---

## 1. Conceito

Alto contraste **preto sobre branco** com **um único acento**: verde sinal. A disciplina cromática **é** a identidade — nada de gradientes coloridos ou paletas amplas.

| Eixo | Definição |
|------|-----------|
| Categoria | SaaS de gestão de eventos — "o hub dos seus eventos" |
| Personalidade | Direto, pragmático, anti-caos, confiável, "produto sério" |
| Sensação | Preto = robustez/foco · Verde = ação/confirmar · Branco = clareza |

---

## 2. Tokens de cor

### Núcleo
| Token | Hex | Uso |
|-------|-----|-----|
| `--black` | `#000000` | Fundos hero/waitlist, alto contraste |
| `--ink` / `--text` | `#0A0A0A` | Texto principal |
| `--ink-2` | `#111111` | Superfícies escuras |
| `--ink-3` | `#1A1A1A` | Bordas/superfícies escuras |
| `--white` | `#FFFFFF` | Cards, texto sobre escuro |
| `--off-white` | `#F7F7F5` | Fundo geral da página |
| **`--green`** | **`#00E47C`** | **Ação primária (CTA, destaque, pill do headline)** |
| `--green-deep` | `#00B863` | Hover de CTA, texto verde sobre claro |
| `--green-soft` | `#E6FBF1` | Tag/eyebrow, badge "confirmado" |
| `--green-glow` | `rgba(0,228,124,0.35)` | Brilho/sombra verde |

### Neutros de texto
| Token | Hex | Uso |
|-------|-----|-----|
| `--muted` | `#4A4A4A` | Texto secundário |
| `--muted-inv` | `#B8B8B8` | Secundário sobre escuro |
| `--dim` | `#6B6B6B` | Labels, metadados, placeholders |
| `--line` | `rgba(0,0,0,0.10)` | Bordas em fundo claro |
| `--line-inv` | `rgba(255,255,255,0.10)` | Bordas em fundo escuro |

### Status em UI (funcional, não-marca)
Confirmado = verde · Pendente = âmbar (`#FEF3C7`/`#B45309`) · Check-in = azul (`#E0F2FE`/`#0369A1`) · Saída/erro = `#DC2626`.

> **Regra de ouro:** verde é o **único** acento de marca. Cores de status são funcionais, dentro do app — não entram na comunicação.

---

## 3. Tipografia

**Fonte única:** `Inter` (400–900).

| Estilo | Tamanho | Peso | Tracking | Uso |
|--------|---------|------|----------|-----|
| `.h-display` | clamp(44–72px) | 800 | -0.035em | Headline hero |
| `.h-section` | clamp(32–52px) | 800 | -0.03em | Títulos de seção |
| `h3`/feature | 19–22px | 700 | -0.015em | Cabeçalho de card |
| `.lead` | 18px | 400 | — | Subtítulo (máx 60ch) |
| corpo | 15–17px | 400 | — | Texto (line-height 1.55) |
| `.eyebrow` | 12px | 700 | 0.18em UPPER | Tag pill verde |

**Assinatura:** títulos 800 com tracking muito negativo + palavra destacada numa **pill verde rotacionada -1°**.

---

## 4. Forma, espaço e grid

| Token | Valor |
|-------|-------|
| Raio de card | `18px` |
| Raio de botão/input | `10px` |
| Cards grandes (mockup) | `20–24px` |
| Container | `1240px` |
| Padding de seção | `96px` desktop / `64px` mobile |
| Pills | `border-radius: 999px` |

---

## 5. Componentes

| Componente | Regra |
|-----------|-------|
| **Botão primário** | Fundo verde, **texto preto**, peso 700; hover `green-deep` + `translateY(-1px)` |
| **Botão outline** | Borda preta 1.5px; hover inverte (preto/branco) |
| **Botão ghost** | Sobre fundo escuro, borda branca translúcida |
| **Eyebrow** | Pill verde com ponto pulsante antes de títulos |
| **Card de feature** | Grid 3 col, ícone em quadrado verde |
| **Hero** | Full-bleed preto + gradiente cinematográfico + card de signup branco flutuante |
| **Showcase** | Abas (Dashboard/Inscritos/Financeiro) dentro de "janela de navegador" |
| **Marquee** | Faixa preta superior com mensagens de escassez do beta |

**Contraste:** CTA verde **sempre** com texto preto (nunca branco).

---

## 6. Voz e tom

- Frases curtas, afirmativas, cadência de slogan.
- Vocabulário-âncora: *hub, caos, sem planilha, tempo real, preço de fundador, vaga no beta*.
- Estrutura dor → consequência.
- Escassez **honesta** (sem dark patterns).

---

## 7. Pendências de evolução (do v0.1)

1. Verde mais "dono" da marca (`#00E47C` é um verde tech comum).
2. Fonte de display distinta só nos headlines.
3. Logo definitivo em SVG (hoje o símbolo é CSS) + favicon e versões mono.
4. Ícones vetoriais reais (ex.: Lucide) no lugar de emojis.
5. Imagens reais do hero (hoje `image-slot` placeholders).
6. Elevar tokens da LP para um arquivo reutilizável quando o app crescer.

> Aplicar estes tokens na UI do produto descrita em [04 — Arquitetura](./04-arquitetura-tecnica.md).
