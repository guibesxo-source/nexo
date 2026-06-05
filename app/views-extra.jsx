/* ============================================================
   NEXO App · Checklist, Membros, Configurações
   ============================================================ */
const { useState: uSt } = React;

/* ===================== CHECKLIST ===================== */
const TASK_GROUPS = [
  {
    g: 'Pré-produção', tasks: [
      { id: 't1', nm: 'Definir escopo e objetivo do evento', who: 'LF', due: 'Concluído', done: true },
      { id: 't2', nm: 'Fechar contrato com o local (WTC)', who: 'DA', due: 'Concluído', done: true },
      { id: 't3', nm: 'Aprovar orçamento com a diretoria', who: 'LF', due: 'Concluído', done: true },
      { id: 't4', nm: 'Contratar fornecedor de catering', who: 'MC', due: '07 mai', done: false },
    ],
  },
  {
    g: 'Marketing & Inscrições', tasks: [
      { id: 't5', nm: 'Publicar página de inscrição', who: 'RP', due: 'Concluído', done: true },
      { id: 't6', nm: 'Lançar campanha de mídia paga', who: 'RP', due: 'Concluído', done: true },
      { id: 't7', nm: 'Enviar save-the-date', who: 'CL', due: '04 mai', done: false, late: true },
      { id: 't8', nm: 'Confirmar lista de palestrantes', who: 'MC', due: '09 mai', done: false },
      { id: 't9', nm: 'Preparar kit de imprensa', who: 'CL', due: '11 mai', done: false },
    ],
  },
  {
    g: 'Produção & Dia do evento', tasks: [
      { id: 't10', nm: 'Montar cronograma operacional', who: 'DA', due: '10 mai', done: false },
      { id: 't11', nm: 'Imprimir crachás e sinalização', who: 'PR', due: '12 mai', done: false },
      { id: 't12', nm: 'Briefing com a equipe de staff', who: 'LF', due: '13 mai', done: false },
      { id: 't13', nm: 'Testar equipamentos de A/V', who: 'PR', due: '13 mai', done: false, late: true },
    ],
  },
];

function Checklist() {
  const toast = useToast();
  const init = {};
  TASK_GROUPS.forEach(g => g.tasks.forEach(t => init[t.id] = t.done));
  const [done, setDone] = uSt(init);
  const total = Object.keys(init).length;
  const completed = Object.values(done).filter(Boolean).length;
  const pct = Math.round(completed / total * 100);

  const toggle = (id, nm) => {
    setDone(d => {
      const nv = !d[id];
      toast(nv ? 'Tarefa concluída · ' + nm : 'Tarefa reaberta');
      return { ...d, [id]: nv };
    });
  };

  return h('div', { className: 'view' },
    h(PageHead, {
      title: 'Checklist de produção',
      sub: completed + ' de ' + total + ' tarefas concluídas · 3 atrasadas',
      actions: [
        h('button', { className: 'btn', key: 1 }, h(Icon, { name: 'filter', size: 15 }), 'Filtrar'),
        h('button', { className: 'btn btn-primary', key: 2, onClick: () => toast('Nova tarefa criada') }, h(Icon, { name: 'plus', size: 15 }), 'Nova tarefa'),
      ],
    }),

    h(Card, { style: { marginBottom: 20 } },
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 } },
        h('div', { style: { fontSize: 14, fontWeight: 700 } }, 'Progresso geral'),
        h('div', { style: { fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' } }, pct + '%')),
      h('div', { className: 'prog-bar', style: { height: 9 } }, h('i', { style: { width: pct + '%' } })),
      h('div', { style: { display: 'flex', gap: 24, marginTop: 16 } },
        [['Concluídas', completed, 'var(--green-deep)'], ['Pendentes', total - completed, 'var(--text)'], ['Atrasadas', 3, 'var(--red)']].map(([k, v, c], i) =>
          h('div', { key: i },
            h('div', { style: { fontSize: 20, fontWeight: 800, color: c } }, v),
            h('div', { style: { fontSize: 11.5, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 } }, k))))),

    TASK_GROUPS.map((grp, gi) => {
      const gd = grp.tasks.filter(t => done[t.id]).length;
      return h('div', { key: gi, className: 'checklist' },
        h('div', { className: 'task-group-head' },
          h('span', { className: 'tg-title' }, grp.g),
          h('span', { className: 'tg-count' }, gd + '/' + grp.tasks.length),
          h('span', { className: 'tg-line' })),
        grp.tasks.map(t => h('div', { className: 'task' + (done[t.id] ? ' done' : ''), key: t.id },
          h('span', { className: 'checkbox', onClick: () => toggle(t.id, t.nm) }, h(Icon, { name: 'check', size: 14 })),
          h('div', { className: 'task-main' },
            h('div', { className: 'task-name' }, t.nm),
            h('div', { className: 'task-meta' },
              done[t.id]
                ? h(Badge, { tone: 'green', dot: true }, 'Concluída')
                : t.late
                  ? h(Badge, { tone: 'red', dot: true }, 'Atrasada')
                  : h(Badge, { tone: 'gray', dot: true }, 'Pendente'),
              h('span', { className: 'row', style: { gap: 5 } }, h(Icon, { name: 'clock', size: 12 }), t.due))),
          h('span', { className: 'task-assignee' }, h(Avatar, { initials: t.who, size: 'sm' })))));
    }));
}

/* ===================== MEMBROS ===================== */
const MEMBERS = [
  { in: 'LF', nm: 'Lucas Ferraz', role: 'Owner · Produtor', tasks: 8, events: 6 },
  { in: 'MC', nm: 'Mariana Costa', role: 'Coordenadora', tasks: 12, events: 4 },
  { in: 'DA', nm: 'Diego Almeida', role: 'Produção', tasks: 9, events: 3 },
  { in: 'RP', nm: 'Rafael Pereira', role: 'Marketing', tasks: 7, events: 5 },
  { in: 'CL', nm: 'Carolina Lima', role: 'Comunicação', tasks: 6, events: 2 },
  { in: 'PR', nm: 'Pedro Rocha', role: 'Logística', tasks: 5, events: 3 },
];

function Membros() {
  const toast = useToast();
  return h('div', { className: 'view' },
    h(PageHead, {
      title: 'Membros',
      sub: '6 membros na organização',
      actions: [
        h('button', { className: 'btn btn-primary', key: 1, onClick: () => toast('Convite enviado por email') }, h(Icon, { name: 'mail', size: 15 }), 'Convidar membro'),
      ],
    }),
    h('div', { className: 'member-grid' },
      MEMBERS.map((m, i) => h('div', { className: 'member', key: i },
        h(Avatar, { initials: m.in, size: 'lg' }),
        h('div', { className: 'nm' }, m.nm),
        h('div', { className: 'role' }, m.role),
        h('div', { className: 'stats' },
          h('div', { className: 'st' }, h('div', { className: 'v' }, m.tasks), h('div', { className: 'k' }, 'Tarefas')),
          h('div', { className: 'st' }, h('div', { className: 'v' }, m.events), h('div', { className: 'k' }, 'Eventos')))))));
}

/* ===================== CONFIGURAÇÕES ===================== */
function Config() {
  const toast = useToast();
  const [tg, setTg] = uSt({ email: true, push: true, weekly: false, slack: true, public: false, twofa: true });
  const set = (k) => (v) => { setTg(s => ({ ...s, [k]: v })); toast('Preferência atualizada'); };
  const [navSec, setNavSec] = uSt('geral');

  const rows = [
    { sec: 'Notificações', items: [
      { k: 'email', nm: 'Notificações por email', desc: 'Receba resumos diários e alertas importantes no seu email.' },
      { k: 'push', nm: 'Notificações push', desc: 'Avisos em tempo real de novos inscritos e tarefas.' },
      { k: 'weekly', nm: 'Resumo semanal', desc: 'Um panorama de todos os eventos toda segunda-feira.' },
      { k: 'slack', nm: 'Integração com Slack', desc: 'Envie atualizações de eventos para um canal do Slack.' },
    ] },
    { sec: 'Privacidade & Segurança', items: [
      { k: 'public', nm: 'Página de evento pública', desc: 'Permitir que qualquer pessoa veja a página de inscrição.' },
      { k: 'twofa', nm: 'Autenticação em dois fatores', desc: 'Camada extra de segurança no login da sua conta.' },
    ] },
  ];

  return h('div', { className: 'view' },
    h(PageHead, { title: 'Configurações', sub: 'Gerencie sua conta e preferências da organização' }),
    h('div', { className: 'settings-wrap' },
      h('nav', { className: 'settings-nav' },
        [['geral', 'Geral'], ['notif', 'Notificações'], ['team', 'Equipe'], ['billing', 'Plano & Cobrança'], ['api', 'API & Integrações']].map(([id, lb]) =>
          h('a', { key: id, className: navSec === id ? 'active' : '', onClick: () => setNavSec(id) }, lb))),

      h('div', null,
        h(Card, { style: { marginBottom: 20 } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
            h(Avatar, { initials: 'LF', size: 'lg' }),
            h('div', { style: { flex: 1 } },
              h('div', { style: { fontSize: 16, fontWeight: 700 } }, 'Lucas Ferraz'),
              h('div', { style: { fontSize: 13, color: 'var(--dim)' } }, 'lucas@nexo.events · Owner')),
            h('button', { className: 'btn btn-sm' }, 'Editar perfil')),
          h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 20 } },
            h('div', null, h('label', { className: 'field-label' }, 'Nome da organização'),
              h('input', { className: 'input', defaultValue: 'Nexo Events Co.' })),
            h('div', null, h('label', { className: 'field-label' }, 'Fuso horário'),
              h('input', { className: 'input', defaultValue: '(GMT-3) São Paulo' })))),

        rows.map((r, i) => h(Card, { key: i, title: r.sec, style: { marginBottom: 20 } },
          r.items.map(it => h('div', { className: 'set-row', key: it.k },
            h('div', null,
              h('div', { className: 'sr-name' }, it.nm),
              h('div', { className: 'sr-desc' }, it.desc)),
            h(Toggle, { on: tg[it.k], onChange: set(it.k) }))))),

        h('div', { style: { display: 'flex', justifyContent: 'flex-end', gap: 10 } },
          h('button', { className: 'btn' }, 'Cancelar'),
          h('button', { className: 'btn btn-primary', onClick: () => toast('Alterações salvas') }, 'Salvar alterações')))));
}

Object.assign(window, { Checklist, Membros, Config });
