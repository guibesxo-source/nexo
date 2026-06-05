# 03 — Personas e ICP

**Produto:** Nexo · **Atualizado:** 2026-06-05

> Personas destiladas da LP v2 (seção "Para quem é") e do contexto de mercado. Servem para priorizar features, escrever copy e qualificar o beta.

---

## 1. Persona primária — Produtor independente ("Opera sozinho")

| Campo | Detalhe |
|-------|---------|
| **Quem é** | Produtor/freelancer que organiza eventos por conta própria ou para clientes |
| **Contexto** | Toca tudo: inscritos, fornecedores, dinheiro, logística. Sem equipe ou equipe pequena |
| **Frase** | *"Eu opero sozinho e preciso de controle total sem depender de 10 ferramentas diferentes."* |
| **Dor central** | Fragmentação + sobrecarga cognitiva; tudo na cabeça e em abas abertas |
| **O que valoriza** | Velocidade, simplicidade, visão completa num lugar, financeiro organizado |
| **Gatilho de compra** | Começar a operar mais de um evento ao mesmo tempo |
| **Objeção** | "Será que não resolvo com planilha?" → responder com tempo real + financeiro nativo |

**Jobs-to-be-done:**
- Quando começo um evento, quero um lugar único pra registrar tudo, para não perder contexto entre ferramentas.
- Quando lanço uma despesa, quero ver na hora o impacto no orçamento, para não estourar.
- Quando o evento acaba, quero um resumo do resultado, para mostrar ao cliente e para mim.

---

## 2. Persona secundária — Gestor corporativo ("Justifica cada centavo")

| Campo | Detalhe |
|-------|---------|
| **Quem é** | Profissional de marketing/eventos dentro de uma empresa, organiza eventos internos/externos |
| **Contexto** | Responde a stakeholders; precisa de relatórios e rastreabilidade |
| **Frase** | *"Organizo eventos internos e preciso justificar cada centavo para a diretoria."* |
| **Dor central** | Prestação de contas e visibilidade para terceiros |
| **O que valoriza** | Relatórios claros, rastreabilidade financeira, múltiplos eventos simultâneos |
| **Gatilho de compra** | Auditoria/cobrança da diretoria por números e justificativas |
| **Objeção** | Segurança e conformidade dos dados (PII de participantes, LGPD) |

**Jobs-to-be-done:**
- Quando a diretoria pergunta o ROI, quero relatórios prontos, para responder com dados.
- Quando rodo vários eventos, quero uma visão consolidada, para não perder o controle.
- Quando audito gastos, quero rastreabilidade por categoria e NF, para justificar cada despesa.

---

## 3. Anti-persona (para quem o Nexo NÃO é — agora)

- Quem só precisa **vender ingressos** (já resolvido por Sympla/Eventbrite).
- Grandes operações com ERP/eventos corporativos de altíssima complexidade e integrações pesadas.
- Quem quer um **project manager genérico** (Notion/Asana já servem).

---

## 4. ICP — Perfil de Cliente Ideal (para o beta)

O fundador ideal do beta combina:

1. Organiza **2+ eventos por ano** (recorrência → dor real e retenção).
2. Lida com **dinheiro do evento** (orçamento próprio ou do cliente).
3. Hoje usa **planilha + 2-3 ferramentas** desconectadas (dor de fragmentação ativa).
4. É **acessível para conversa** (dá feedback, topa co-construir).
5. Bônus: tem **alcance/comunidade** (vira referência e canal).

> Qualificação no formulário de beta deve capturar sinais de (1), (2) e (3). Ver [07 — Go-to-Market](./07-go-to-market.md).

---

## 5. Segmentos-alvo (ordem de ataque)

| Prioridade | Segmento | Por quê |
|-----------|----------|---------|
| 1 | Produtores independentes / pequenas produtoras | Dor mais aguda, decisão rápida, sem comitê |
| 2 | Profissionais de eventos corporativos | Ticket maior, mas ciclo de venda + exigências maiores |
| 3 | Agências de eventos / multi-eventos | Precisam de multiusuário e consolidação (features P1/P2) |

---

## 6. Como as personas mapeiam para features

| Necessidade | Persona | Feature (FR) |
|-------------|---------|--------------|
| Controle solo eficiente | Produtor | Hub único, eventos, checklist (Épicos B, D) |
| Financeiro organizado | Ambos | Financeiro nativo (Épico E) |
| Relatórios para stakeholders | Gestor | Insights & relatório (Épico F) |
| Rastreabilidade total | Gestor | Financeiro + NF + log (E4, G2) |
| Múltiplos eventos simultâneos | Gestor / Agência | Lista de eventos + visão consolidada (B2) |

> Continua em [04 — Arquitetura Técnica](./04-arquitetura-tecnica.md).
