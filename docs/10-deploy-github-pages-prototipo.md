# 10 - Deploy GitHub Pages e Prototipo Estatico

**Produto:** Nexo  
**Atualizado:** 2026-06-05  
**Repositorio:** `https://github.com/guibesxo-source/nexo.git`  
**GitHub Pages:** `https://guibesxo-source.github.io/nexo/`  
**Commit base registrado:** `ba20dcb Atualiza app e adiciona login demo`

---

## 1. Objetivo

Este documento registra o prototipo estatico atual do Nexo: landing page, tela de login demonstrativa e app/dashboard. Ele existe para permitir iteracao rapida antes da migracao para a stack de produto planejada em [04 - Arquitetura Tecnica](./04-arquitetura-tecnica.md).

O fluxo publicado e:

```
index.html  ->  login.html  ->  app.html
LP              login demo       app/dashboard
```

---

## 2. Estrutura atual

| Arquivo/pasta | Responsabilidade |
|---------------|------------------|
| `index.html` | Landing page principal da Nexo. O botao `Entrar` aponta para `login.html`. |
| `login.html` | Tela de login demonstrativa, visualmente alinhada com a marca. |
| `app.html` | Shell React do aplicativo. Carrega CSS e scripts da pasta `app/`. |
| `app/app.css` | Design system e estilos do app. |
| `app/components.jsx` | Componentes compartilhados do app: sidebar, topbar, cards, KPIs, badges, graficos etc. |
| `app/views-main.jsx` | Views principais: dashboard, eventos, inscritos e financeiro. |
| `app/views-extra.jsx` | Views extras: checklist, membros e configuracoes. |
| `old/` | Backups locais ignorados pelo Git. |

---

## 3. Fluxo de acesso

### Landing page

Na LP, os links de entrada foram direcionados para:

```html
login.html
```

Isso inclui:

- botao `Entrar` do menu principal;
- link `Ja tem conta? Entrar` no bloco de cadastro.

### Login demo

O login ainda nao autentica de verdade. Ele e uma camada visual e estrutural para preparar o fluxo futuro.

Comportamento atual:

1. Usuario acessa `login.html`.
2. Preenche qualquer e-mail e senha.
3. Ao clicar em `Entrar no produto`, a pagina grava uma sessao fake no `localStorage`.
4. O usuario e redirecionado para `app.html`.

Chave usada no navegador:

```js
nexo_demo_session
```

Formato atual da sessao:

```js
{
  email,
  remember,
  provider: "demo",
  createdAt
}
```

### App

O `app.html` tem uma guarda simples:

- se existir `localStorage.nexo_demo_session`, o app abre normalmente;
- se nao existir, redireciona para `login.html?next=app.html`;
- se existir hash de rota, ele preserva o destino, por exemplo `app.html#financeiro`.

Esta guarda e apenas demonstrativa. Quando houver autenticacao real, ela deve ser substituida por Supabase Auth ou pelo provedor definido na arquitetura final.

---

## 4. Como editar e publicar

Todos os comandos abaixo partem da pasta:

```powershell
cd C:\Users\guibess\Desktop\IA\projetos\Nexo
```

Depois de editar qualquer arquivo:

```powershell
git status
git add .
git commit -m "Descreva a alteracao"
git push origin main
```

O GitHub Pages publica automaticamente a partir da branch `main`. Normalmente leva de 1 a 2 minutos para refletir a mudanca online.

---

## 5. Como testar localmente

Como este prototipo e estatico, ele pode ser aberto no navegador, mas o ideal e servir por HTTP para evitar problemas com scripts e caminhos relativos.

Opcao com Node, sem instalar dependencias:

```powershell
cd C:\Users\guibess\Desktop\IA\projetos\Nexo
npx serve .
```

Depois, abrir a URL indicada pelo terminal.

Se preferir evitar `npx`, qualquer servidor estatico funciona. O importante e a raiz servida ser a pasta `projetos/Nexo`.

---

## 6. Validacoes feitas no commit `ba20dcb`

Validacoes executadas:

- `app/components.jsx`, `app/views-main.jsx` e `app/views-extra.jsx` passaram em checagem de sintaxe via Node usando stdin.
- `index.html`, `login.html`, `app.html` e arquivos da pasta `app/` responderam `200` em servidor estatico local via Node.
- `git diff --check` nao apontou problemas de whitespace.
- `git push origin main` foi concluido com sucesso.

Validacoes nao executadas:

- `npm run lint`
- `npm run typecheck`
- `npm test`

Motivo: este prototipo estatico ainda nao possui `package.json` nem pipeline npm configurado.

---

## 7. Limitacoes conhecidas

- Login e apenas demonstrativo.
- Sessao e mantida no `localStorage`, sem seguranca real.
- React e Babel sao carregados por CDN no navegador.
- Os arquivos `.jsx` rodam via Babel standalone, adequado para prototipo, mas nao para produto final.
- Nao ha backend, banco, permissao, multi-tenant, nem persistencia real.
- GitHub Pages e suficiente para demonstracao estatica, mas nao substitui a arquitetura planejada com app real.

---

## 8. Proximos passos recomendados

1. Adicionar botao `Sair` no app para limpar `nexo_demo_session` e voltar ao login.
2. Criar uma versao Next.js quando o produto sair do prototipo estatico.
3. Migrar login demo para Supabase Auth.
4. Trocar Babel standalone por build React/TypeScript.
5. Separar componentes do dashboard em estrutura de projeto real.
6. Criar testes minimos de navegacao para LP, login e app.
7. Manter este documento atualizado a cada mudanca importante no fluxo publicado.
