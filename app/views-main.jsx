/* ============================================================
   NEXO App · Main views (Dashboard, Eventos, Inscritos, Financeiro)
   ============================================================ */
const { useState: uS } = React;

/* ===================== DASHBOARD ===================== */
function Dashboard({ go }) {
  const weeks = [
    { l: 'S1', v: 28 }, { l: 'S2', v: 42 }, { l: 'S3', v: 38 }, { l: 'S4', v: 60 },
    { l: 'S5', v: 52 }, { l: 'S6', v: 78 }, { l: 'S7', v: 92 }, { l: 'S8', v: 65 },
  ];
  return h('div', { className: 'view' },
    h(PageHead, {
      eyebrow: 'Summit de Marketing 2026',
      title: 'Visão geral',
      sub: 'Atualizado agora · 3 membros online',
      actions: [
        h('button', { className: 'btn', key: 1 }, h(Icon, { name: 'download', size: 15 }), 'Exportar'),
        h('button', { className: 'btn btn-primary', key: 2 }, h(Icon, { name: 'plus', size: 15 }), 'Novo evento'),
      ],
    }),

    h('div', { className: 'kpi-grid' },
      h(Kpi, { icon: 'users', iconTone: 'green', value: '320', label: 'Inscritos totais', delta: '18 hoje', deltaDir: 'up' }),
      h(Kpi, { icon: 'check', value: '247', label: 'Confirmados · 77%', delta: '+12', deltaDir: 'up' }),
      h(Kpi, { icon: 'wallet', value: '82%', label: 'Orçamento usado', delta: 'no plano', deltaDir: 'flat' }),
      h(Kpi, { icon: 'checkSquare', value: '17/24', label: 'Tarefas concluídas', delta: '3 atrasadas', deltaDir: 'down' })),

    h('div', { className: 'grid-2', style: { marginBottom: 16 } },
      h(Card, { title: 'Inscritos por semana', link: 'Ver relatório', onLink: () => go('inscritos') },
        h(BarChart, { data: weeks, lastAlt: true }),
        h('div', { style: { display: 'flex', gap: 18, marginTop: 16, fontSize: 12.5, color: 'var(--dim)' } },
          h('span', { className: 'row', style: { gap: 7 } }, h('span', { style: { width: 10, height: 10, borderRadius: 3, background: 'var(--green)', display: 'inline-block' } }), 'Inscrições confirmadas'),
          h('span', { className: 'row', style: { gap: 7 } }, h('span', { style: { width: 10, height: 10, borderRadius: 3, background: '#E2E2DE', display: 'inline-block' } }), 'Semana atual (parcial)'))),

      h(Card, { title: 'Confirmação' },
        h(Donut, { pct: 62, label: 'conf.', legend: [
          { color: 'var(--green)', label: 'Confirmados', value: '247' },
          { color: '#E8E8E5', label: 'Pendentes', value: '73' },
        ] }),
        h('div', { style: { marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--line-2)', fontSize: 12.5, color: 'var(--dim)' } },
          'Custo por inscrito: ', h('b', { style: { color: 'var(--text)' } }, 'R$ 461')))),

    h('div', { className: 'grid-2' },
      h(Card, { title: 'Atividade recente', link: 'Ver tudo' },
        h('div', { className: 'activity' },
          [
            { ic: '👤', txt: ['Mariana Costa', ' confirmou presença no Summit'], t: 'há 4 minutos' },
            { ic: '💰', txt: ['Lançamento de ', 'R$ 12.450', ' em Marketing aprovado'], t: 'há 1 hora' },
            { ic: '✅', txt: ['Diego Almeida', ' concluiu "Fechar contrato de catering"'], t: 'há 3 horas' },
            { ic: '🎫', txt: ['18 novos inscritos', ' via campanha de Instagram'], t: 'há 5 horas' },
            { ic: '⚠️', txt: ['Tarefa ', '"Enviar save-the-date"', ' está atrasada'], t: 'ontem' },
          ].map((a, i) => h('div', { className: 'act-row', key: i },
            h('span', { className: 'act-ic' }, a.ic),
            h('div', { className: 'act-body' },
              h('div', { className: 'act-txt' }, a.txt.map((s, j) => j % 2 ? h('b', { key: j }, s) : s)),
              h('div', { className: 'act-time' }, a.t)))))),

      h(Card, { title: 'Progresso por área' },
        h('div', { className: 'progress-list' },
          [
            { nm: 'Captação de inscritos', v: 77 },
            { nm: 'Orçamento executado', v: 82 },
            { nm: 'Checklist de produção', v: 71 },
            { nm: 'Patrocínios fechados', v: 60 },
          ].map((p, i) => h('div', { className: 'prog-item', key: i },
            h('div', { className: 'prog-top' },
              h('span', { className: 'nm' }, p.nm),
              h('span', { className: 'vl' }, p.v + '%')),
            h('div', { className: 'prog-bar' }, h('i', { style: { width: p.v + '%' } }))))),
        h('div', { style: { marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          h('div', null,
            h('div', { style: { fontSize: 12.5, color: 'var(--dim)' } }, 'Dias para o evento'),
            h('div', { style: { fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' } }, '8 dias')),
          h('button', { className: 'btn btn-dark btn-sm', onClick: () => go('checklist') }, 'Ver checklist')))));
}

/* ===================== EVENTOS ===================== */
const EVENTS = [
  { id: 1, nm: 'Summit de Marketing 2026', date: '14 mai · 2026', city: 'São Paulo', status: ['green', 'Ativo'], reg: 320, cap: 400, cover: 'linear-gradient(135deg,#00B863,#0A0A0A)', team: ['MC', 'RP', 'DA'], extra: 5 },
  { id: 2, nm: 'Festival Sonora', date: '22 jun · 2026', city: 'Rio de Janeiro', status: ['amber', 'Planejamento'], reg: 1240, cap: 3000, cover: 'linear-gradient(135deg,#7C3AED,#0A0A0A)', team: ['JS', 'CL'], extra: 8 },
  { id: 3, nm: 'Workshop UX Lab', date: '03 jul · 2026', city: 'Online', status: ['green', 'Ativo'], reg: 86, cap: 120, cover: 'linear-gradient(135deg,#0EA5E9,#0A0A0A)', team: ['PR', 'LM'], extra: 2 },
  { id: 4, nm: 'Conferência DevBR', date: '19 ago · 2026', city: 'Belo Horizonte', status: ['gray', 'Rascunho'], reg: 0, cap: 800, cover: 'linear-gradient(135deg,#1A1A1A,#444)', team: ['LF'], extra: 0 },
  { id: 5, nm: 'Encontro de Líderes', date: '12 set · 2026', city: 'Curitiba', status: ['blue', 'Inscrições abertas'], reg: 142, cap: 200, cover: 'linear-gradient(135deg,#0891B2,#0A0A0A)', team: ['TS', 'AF', 'VG'], extra: 3 },
  { id: 6, nm: 'Gala de Premiação', date: '30 nov · 2026', city: 'São Paulo', status: ['amber', 'Planejamento'], reg: 64, cap: 500, cover: 'linear-gradient(135deg,#B45309,#0A0A0A)', team: ['MC', 'RC'], extra: 6 },
];

function Eventos({ go }) {
  const [filter, setFilter] = uS('todos');
  const filters = [['todos', 'Todos', 6], ['ativos', 'Ativos', 2], ['plan', 'Planejamento', 2], ['rasc', 'Rascunhos', 1]];
  return h('div', { className: 'view' },
    h(PageHead, {
      title: 'Eventos',
      sub: '6 eventos · 1.852 inscritos no total',
      actions: [
        h('button', { className: 'btn', key: 1 }, h(Icon, { name: 'filter', size: 15 }), 'Filtros'),
        h('button', { className: 'btn btn-primary', key: 2 }, h(Icon, { name: 'plus', size: 15 }), 'Novo evento'),
      ],
    }),
    h('div', { className: 'row', style: { marginBottom: 20, gap: 8, flexWrap: 'wrap' } },
      filters.map(([id, lb, ct]) => h('button', {
        key: id, className: 'chip' + (filter === id ? ' active' : ''), onClick: () => setFilter(id),
      }, lb, h('span', { className: 'ct' }, ct)))),

    h('div', { className: 'evlist' },
      EVENTS.map(ev => h('div', { className: 'evcard', key: ev.id, onClick: () => go('dashboard') },
        h('div', { className: 'evcard-cover', style: { background: ev.cover } },
          h('span', { className: 'evcard-status' }, h(Badge, { tone: ev.status[0], dot: true }, ev.status[1]))),
        h('div', { className: 'evcard-body' },
          h('div', { className: 'nm' }, ev.nm),
          h('div', { className: 'meta' },
            h('span', { className: 'row', style: { gap: 5 } }, h(Icon, { name: 'calendar', size: 13 }), ev.date),
            h('span', { style: { opacity: 0.4 } }, '·'),
            h('span', { className: 'row', style: { gap: 5 } }, h(Icon, { name: 'mapPin', size: 13 }), ev.city))),
        h('div', { className: 'evcard-foot' },
          h('div', null,
            h('div', { style: { fontSize: 13, fontWeight: 700 } }, ev.reg + ' / ' + ev.cap),
            h('div', { style: { fontSize: 11, color: 'var(--dim)' } }, 'inscritos')),
          h('div', { className: 'avatar-stack' },
            ev.team.map(t => h(Avatar, { key: t, initials: t, size: 'sm' })),
            ev.extra > 0 && h('span', { className: 'avatar sm more' }, '+' + ev.extra)))))));
}

/* ===================== INSCRITOS ===================== */
const PEOPLE = [
  { in: 'MC', nm: 'Mariana Costa', em: 'mariana@octopus.io', co: 'Octopus Studio', st: ['green', 'Confirmado'], reg: '02 mai · 14h32', ticket: 'VIP' },
  { in: 'RP', nm: 'Rafael Pereira', em: 'rafael@brand.co', co: 'Brand & Co.', st: ['blue', 'Check-in'], reg: '30 abr · 09h17', ticket: 'Pro' },
  { in: 'JS', nm: 'Júlia Santos', em: 'julia@hubinc.com', co: 'Hub Inc.', st: ['amber', 'Pendente'], reg: '05 mai · 11h08', ticket: 'Geral' },
  { in: 'DA', nm: 'Diego Almeida', em: 'diego@nexus.ai', co: 'Nexus AI', st: ['green', 'Confirmado'], reg: '04 mai · 16h44', ticket: 'VIP' },
  { in: 'CL', nm: 'Carolina Lima', em: 'caro@summit.co', co: 'Summit.co', st: ['green', 'Confirmado'], reg: '01 mai · 10h22', ticket: 'Pro' },
  { in: 'PR', nm: 'Pedro Rocha', em: 'pedro@brava.studio', co: 'Brava Studio', st: ['amber', 'Pendente'], reg: '06 mai · 08h55', ticket: 'Geral' },
  { in: 'LM', nm: 'Larissa Melo', em: 'larissa@conecta.com', co: 'Conecta', st: ['green', 'Confirmado'], reg: '29 abr · 19h03', ticket: 'Pro' },
  { in: 'TS', nm: 'Thiago Souza', em: 'thiago@ativa.io', co: 'Ativa', st: ['blue', 'Check-in'], reg: '28 abr · 13h47', ticket: 'VIP' },
  { in: 'AF', nm: 'Ana Ferreira', em: 'ana@palco.live', co: 'Palco Live', st: ['green', 'Confirmado'], reg: '03 mai · 21h12', ticket: 'Geral' },
  { in: 'VG', nm: 'Vitor Gomes', em: 'vitor@hubevents.com', co: 'Hub Events', st: ['amber', 'Pendente'], reg: '06 mai · 07h30', ticket: 'Geral' },
];

function Inscritos() {
  const toast = useToast();
  const [q, setQ] = uS('');
  const [tab, setTab] = uS('todos');
  const tabs = [['todos', 'Todos', 320], ['conf', 'Confirmados', 247], ['pend', 'Pendentes', 73], ['check', 'Check-in', 88]];
  const stMap = { conf: 'Confirmado', pend: 'Pendente', check: 'Check-in' };
  const rows = PEOPLE.filter(p => {
    const okTab = tab === 'todos' || p.st[1] === stMap[tab];
    const okQ = !q || (p.nm + p.em + p.co).toLowerCase().includes(q.toLowerCase());
    return okTab && okQ;
  });
  return h('div', { className: 'view' },
    h(PageHead, {
      title: 'Inscritos',
      sub: '320 participantes · 247 confirmados',
      actions: [
        h('button', { className: 'btn', key: 1, onClick: () => toast('Exportação iniciada (CSV)') }, h(Icon, { name: 'download', size: 15 }), 'Exportar CSV'),
        h('button', { className: 'btn btn-primary', key: 2, onClick: () => toast('Convite enviado') }, h(Icon, { name: 'plus', size: 15 }), 'Adicionar'),
      ],
    }),
    h('div', { className: 'row', style: { marginBottom: 16, gap: 10, flexWrap: 'wrap' } },
      h('div', { className: 'input-search', style: { maxWidth: 320 } },
        h(Icon, { name: 'search', size: 16 }),
        h('input', { placeholder: 'Buscar por nome, email ou empresa...', value: q, onChange: e => setQ(e.target.value) })),
      h('div', { style: { flex: 1 } }),
      tabs.map(([id, lb, ct]) => h('button', {
        key: id, className: 'chip' + (tab === id ? ' active' : ''), onClick: () => setTab(id),
      }, lb, h('span', { className: 'ct' }, ct)))),

    h('div', { className: 'tbl-wrap' },
      h('table', { className: 'tbl' },
        h('thead', null, h('tr', null,
          h('th', null, 'Participante'),
          h('th', null, 'Empresa'),
          h('th', null, 'Ingresso'),
          h('th', null, 'Status'),
          h('th', null, 'Inscrição'),
          h('th', null, ''))),
        h('tbody', null,
          rows.length === 0
            ? h('tr', null, h('td', { colSpan: 6, style: { textAlign: 'center', padding: 40, color: 'var(--dim)' } }, 'Nenhum inscrito encontrado.'))
            : rows.map((p, i) => h('tr', { key: i },
              h('td', null, h('div', { className: 'cell-user' },
                h(Avatar, { initials: p.in }),
                h('div', null, h('div', { className: 'nm' }, p.nm), h('div', { className: 'em' }, p.em)))),
              h('td', null, p.co),
              h('td', null, h(Badge, { tone: p.ticket === 'VIP' ? 'green' : p.ticket === 'Pro' ? 'blue' : 'gray' }, p.ticket)),
              h('td', null, h(Badge, { tone: p.st[0], dot: true }, p.st[1])),
              h('td', { style: { color: 'var(--dim)' } }, p.reg),
              h('td', null, h('span', { className: 'row-action' }, h(Icon, { name: 'dots', size: 16 }))))))),
      h('div', { className: 'tbl-foot' },
        h('span', null, 'Mostrando ' + rows.length + ' de 320 inscritos'),
        h('div', { className: 'pager' },
          h('button', { className: 'active' }, '1'),
          h('button', null, '2'), h('button', null, '3'),
          h('button', null, h(Icon, { name: 'chevRight', size: 14 }))))));
}

/* ===================== FINANCEIRO ===================== */
const TX = [
  { ic: '🏢', ttl: 'Centro de Convenções WTC', meta: 'Local · NF #2241 · 04 mai', st: ['green', 'Pago'], amt: '- R$ 42.000,00', dir: 'out' },
  { ic: '📣', ttl: 'Campanha de mídia paga', meta: 'Marketing · NF #2238 · 03 mai', st: ['green', 'Pago'], amt: '- R$ 12.450,00', dir: 'out' },
  { ic: '🍽️', ttl: 'Catering Bistro 320', meta: 'Catering · Aguardando NF · 06 mai', st: ['amber', 'Pendente'], amt: '- R$ 8.900,00', dir: 'out' },
  { ic: '💸', ttl: 'Patrocínio · Stripe Brasil', meta: 'Receita · 28 abr', st: ['green', 'Recebido'], amt: '+ R$ 25.000,00', dir: 'in' },
  { ic: '🎤', ttl: 'Cachê palestrantes', meta: 'Equipe · NF #2235 · 27 abr', st: ['green', 'Pago'], amt: '- R$ 14.200,00', dir: 'out' },
  { ic: '🖨️', ttl: 'Material gráfico e crachás', meta: 'Produção · NF #2230 · 25 abr', st: ['green', 'Pago'], amt: '- R$ 3.820,00', dir: 'out' },
];
const CATS = [
  { nm: 'Local & Estrutura', vl: 'R$ 62.400', pct: 92, c: 'var(--green)' },
  { nm: 'Marketing', vl: 'R$ 38.200', pct: 68, c: 'var(--green)' },
  { nm: 'Catering', vl: 'R$ 27.000', pct: 54, c: 'var(--green)' },
  { nm: 'Equipe & Cachês', vl: 'R$ 20.020', pct: 44, c: 'var(--green)' },
];

function Financeiro() {
  const toast = useToast();
  const [seg, setSeg] = uS('despesas');
  const list = seg === 'receitas' ? TX.filter(t => t.dir === 'in') : seg === 'despesas' ? TX.filter(t => t.dir === 'out') : TX;
  return h('div', { className: 'view' },
    h(PageHead, {
      title: 'Financeiro',
      sub: 'Summit de Marketing 2026 · Orçamento R$ 180.000',
      actions: [
        h('button', { className: 'btn', key: 1, onClick: () => toast('Relatório gerado') }, h(Icon, { name: 'download', size: 15 }), 'Relatório'),
        h('button', { className: 'btn btn-primary', key: 2, onClick: () => toast('Lançamento adicionado') }, h(Icon, { name: 'plus', size: 15 }), 'Lançamento'),
      ],
    }),

    h('div', { className: 'grid-2', style: { marginBottom: 16 } },
      h('div', { className: 'budget-card' },
        h('div', { className: 'lbl' }, 'Gasto até agora'),
        h('div', { className: 'big' }, 'R$ 147.620', h('span', { className: 'cents' }, ',00')),
        h('div', { className: 'sub' }, '82% do orçamento · R$ 32.380 disponível'),
        h('div', { className: 'bbar' }, h('i', { style: { width: '82%' } }))),
      h(Card, { title: 'Por categoria' },
        CATS.map((c, i) => h('div', { className: 'cat-row', key: i },
          h('span', { className: 'nm' }, c.nm),
          h('span', { className: 'vl' }, c.vl),
          h('div', { className: 'bar' }, h('i', { style: { width: c.pct + '%', background: c.c } })))))),

    h('div', { className: 'kpi-grid', style: { gridTemplateColumns: 'repeat(3,1fr)' } },
      h(Kpi, { icon: 'arrowDown', value: 'R$ 147.620', label: 'Total de despesas', delta: '34 lançamentos', deltaDir: 'flat' }),
      h(Kpi, { icon: 'arrowUp', iconTone: 'green', value: 'R$ 25.000', label: 'Receitas (patrocínio)', delta: '1 confirmada', deltaDir: 'up' }),
      h(Kpi, { icon: 'clock', value: 'R$ 8.900', label: 'Pendente de pagamento', delta: '1 NF', deltaDir: 'flat' })),

    h(Card, { pad0: true, style: { marginTop: 4 } },
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px 14px', borderBottom: '1px solid var(--line)' } },
        h('div', { className: 'card-title' }, 'Lançamentos'),
        h('div', { className: 'seg' },
          [['todos', 'Todos'], ['despesas', 'Despesas'], ['receitas', 'Receitas']].map(([id, lb]) =>
            h('button', { key: id, className: seg === id ? 'active' : '', onClick: () => setSeg(id) }, lb)))),
      list.map((t, i) => h('div', { className: 'tx-row', key: i },
        h('span', { className: 'tx-ic' }, t.ic),
        h('div', null, h('div', { className: 'ttl' }, t.ttl), h('div', { className: 'meta' }, t.meta)),
        h(Badge, { tone: t.st[0] }, t.st[1]),
        h('span', { className: 'tx-amt ' + t.dir }, t.amt)))));
}

Object.assign(window, { Dashboard, Eventos, Inscritos, Financeiro });
