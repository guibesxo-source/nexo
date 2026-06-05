/* ============================================================
   NEXO App · Shared components + icons
   Exports to window for cross-file use.
   ============================================================ */
const { useState, useEffect, useRef, createElement: h } = React;

/* ---------- Icon set (stroke, currentColor) ---------- */
const I = {
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  calendar: 'M3 9h18M7 3v3m10-3v3M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  wallet: 'M21 12V7H5a2 2 0 0 1 0-4h14v4M3 5v14a2 2 0 0 0 2 2h16v-5M18 12a2 2 0 0 0 0 4h4v-4z',
  check: 'M20 6 9 17l-5-5',
  checkSquare: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
  team: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
  search: 'M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0',
  plus: 'M12 5v14M5 12h14',
  download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
  arrowUp: 'M12 19V5M5 12l7-7 7 7',
  arrowDown: 'M12 5v14M19 12l-7 7-7-7',
  trending: 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6',
  dots: 'M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  filter: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  chevDown: 'M6 9l6 6 6-6',
  chevRight: 'M9 18l6-6-6-6',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
  mapPin: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  menu: 'M3 12h18M3 6h18M3 18h18',
  ticket: 'M3 9a3 3 0 0 0 0 6v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2zM13 5v14',
  bolt: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6',
  sparkle: 'M12 3l1.9 5.8L20 10.7l-5.1 2.9L12 19l-2.9-5.4L4 10.7l6.1-1.9L12 3z',
};

function Icon({ name, size }) {
  const d = I[name] || '';
  return h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round',
    width: size || 18, height: size || 18 },
    d.split(/(?=M)/).map((seg, i) => h('path', { key: i, d: seg })));
}

/* ---------- Avatar helper ---------- */
const AV_COLORS = {
  MC:'#F97316', RP:'#0EA5E9', JS:'#A855F7', DA:'#10B981', CL:'#F43F5E',
  PR:'#EAB308', LM:'#6366F1', TS:'#14B8A6', AF:'#EC4899', BN:'#0891B2',
  VG:'#8B5CF6', RC:'#F59E0B',
};
function Avatar({ initials, color, size }) {
  const c = color || AV_COLORS[initials] || '#444';
  return h('span', { className: 'avatar' + (size ? ' ' + size : ''), style: { background: c } }, initials);
}

/* ---------- Badge ---------- */
function Badge({ tone, dot, children }) {
  return h('span', { className: 'badge ' + (tone || 'gray') },
    dot && h('i', null), children);
}

/* ---------- Toast system ---------- */
const ToastCtx = React.createContext(() => {});
function ToastHost({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = (msg) => {
    const id = Math.random();
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2600);
  };
  return h(ToastCtx.Provider, { value: push },
    children,
    h('div', { className: 'toast-wrap' },
      toasts.map(t => h('div', { className: 'toast', key: t.id },
        h('span', { className: 'tk' }, '✓'), t.msg))));
}
const useToast = () => React.useContext(ToastCtx);

/* ---------- Sidebar ---------- */
const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { id: 'eventos', label: 'Eventos', icon: 'calendar', count: '3' },
  { id: 'inscritos', label: 'Inscritos', icon: 'users', count: '320' },
  { id: 'financeiro', label: 'Financeiro', icon: 'wallet' },
  { id: 'checklist', label: 'Checklist', icon: 'checkSquare', count: '3', warn: true },
];
const NAV2 = [
  { id: 'membros', label: 'Membros', icon: 'team' },
  { id: 'config', label: 'Configurações', icon: 'settings' },
];

function Sidebar({ active, onNav, open, eventName }) {
  return h('aside', { className: 'sidebar' + (open ? ' open' : '') },
    h('div', { className: 'sb-brand' },
      h('span', { className: 'sb-mark' }), 'Nexo'),

    h('div', { className: 'sb-event' },
      h('span', { className: 'ev-dot' }, 'SM'),
      h('div', { className: 'ev-meta' },
        h('div', { className: 'ev-name' }, eventName),
        h('div', { className: 'ev-sub' }, '14 mai · São Paulo')),
      h('span', { className: 'ev-chev' }, h(Icon, { name: 'chevDown', size: 14 }))),

    h('nav', { className: 'sb-nav' },
      NAV.map(it => h('a', {
        key: it.id, className: 'sb-link' + (active === it.id ? ' active' : ''),
        onClick: () => onNav(it.id),
      },
        h('span', { className: 'sb-ic' }, h(Icon, { name: it.icon })),
        it.label,
        it.count && h('span', { className: 'count' + (it.warn ? ' warn' : '') }, it.count))),

      h('div', { className: 'sb-section' }, 'Organização'),
      NAV2.map(it => h('a', {
        key: it.id, className: 'sb-link' + (active === it.id ? ' active' : ''),
        onClick: () => onNav(it.id),
      },
        h('span', { className: 'sb-ic' }, h(Icon, { name: it.icon })),
        it.label))),

    h('div', { className: 'sb-foot' },
      h('div', { className: 'sb-user' },
        h('span', { className: 'ava' }, 'LF'),
        h('div', { className: 'u-meta' },
          h('div', { className: 'u-name' }, 'Lucas Ferraz'),
          h('div', { className: 'u-mail' }, 'lucas@nexo.events')),
        h('span', { style: { color: 'var(--dim)' } }, h(Icon, { name: 'chevDown', size: 14 })))));
}

/* ---------- Topbar ---------- */
function Topbar({ crumb, onMenu }) {
  return h('header', { className: 'topbar' },
    h('button', { className: 'tb-icon-btn sb-toggle', onClick: onMenu },
      h(Icon, { name: 'menu', size: 18 })),
    h('div', { className: 'tb-crumb' },
      h('span', null, 'Nexo'),
      h('span', { className: 'sep' }, h(Icon, { name: 'chevRight', size: 13 })),
      h('span', { className: 'cur' }, crumb)),
    h('div', { className: 'tb-search' },
      h(Icon, { name: 'search', size: 15 }),
      h('input', { placeholder: 'Buscar eventos, inscritos, NFs...' }),
      h('span', { className: 'kbd' }, '⌘K')),
    h('button', { className: 'tb-icon-btn' },
      h(Icon, { name: 'bell', size: 18 }), h('span', { className: 'dot' })),
    h('button', { className: 'btn btn-primary btn-sm' },
      h(Icon, { name: 'plus', size: 15 }), 'Novo evento'));
}

/* ---------- Page header ---------- */
function PageHead({ eyebrow, title, sub, actions }) {
  return h('div', { className: 'page-head' },
    h('div', null,
      eyebrow && h('div', { className: 'page-eyebrow' }, eyebrow),
      h('h1', { className: 'page-title' }, title),
      sub && h('div', { className: 'page-sub' }, sub)),
    actions && h('div', { className: 'page-actions' }, actions));
}

/* ---------- Card ---------- */
function Card({ title, link, onLink, children, pad0, style }) {
  return h('div', { className: 'card' + (pad0 ? ' card-pad-0' : ''), style },
    (title || link) && h('div', { className: 'card-head', style: pad0 ? { padding: '18px 20px 0' } : null },
      h('div', { className: 'card-title' }, title),
      link && h('a', { className: 'card-link', onClick: onLink }, link, h(Icon, { name: 'chevRight', size: 13 }))),
    children);
}

/* ---------- KPI ---------- */
function Kpi({ icon, iconTone, value, label, delta, deltaDir }) {
  return h('div', { className: 'kpi' },
    h('div', { className: 'kpi-top' },
      h('span', { className: 'kpi-ic' + (iconTone ? ' ' + iconTone : '') }, h(Icon, { name: icon })),
      delta && h('span', { className: 'kpi-delta ' + (deltaDir || 'flat') },
        deltaDir === 'up' && h(Icon, { name: 'arrowUp', size: 13 }),
        deltaDir === 'down' && h(Icon, { name: 'arrowDown', size: 13 }),
        delta)),
    h('div', { className: 'kpi-val' }, value),
    h('div', { className: 'kpi-lbl' }, label));
}

/* ---------- Bar chart ---------- */
function BarChart({ data, lastAlt }) {
  const max = Math.max(...data.map(d => d.v));
  return h('div', { className: 'bars' },
    data.map((d, i) => h('div', { className: 'col', key: i },
      h('div', { className: 'b' + (lastAlt && i === data.length - 1 ? ' alt' : ''),
        style: { height: (d.v / max * 100) + '%' } },
        h('span', { className: 'bval' }, d.v)),
      h('div', { className: 'cl' }, d.l))));
}

/* ---------- Donut ---------- */
function Donut({ pct, label, legend }) {
  return h('div', { className: 'donut-wrap' },
    h('div', { className: 'donut', style: { background: `conic-gradient(var(--green) 0 ${pct}%, #E8E8E5 ${pct}% 100%)` } },
      h('div', { className: 'center' },
        h('div', { className: 'n' }, pct + '%'),
        h('div', { className: 'l' }, label))),
    legend && h('div', { className: 'legend' },
      legend.map((lg, i) => h('div', { className: 'lg-row', key: i },
        h('span', { className: 'sw', style: { background: lg.color } }),
        h('span', { className: 'lk' }, lg.label),
        h('span', { className: 'lv' }, lg.value)))));
}

/* ---------- Sparkline (area svg) ---------- */
function Spark({ points, color }) {
  const w = 100, hh = 64, pad = 4;
  const max = Math.max(...points), min = Math.min(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const pts = points.map((p, i) => [i * step, hh - pad - ((p - min) / range) * (hh - pad * 2)]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = line + ` L${w} ${hh} L0 ${hh} Z`;
  return h('svg', { className: 'spark', viewBox: `0 0 ${w} ${hh}`, preserveAspectRatio: 'none' },
    h('defs', null, h('linearGradient', { id: 'sg', x1: 0, y1: 0, x2: 0, y2: 1 },
      h('stop', { offset: '0%', stopColor: color || '#00E47C', stopOpacity: 0.22 }),
      h('stop', { offset: '100%', stopColor: color || '#00E47C', stopOpacity: 0 }))),
    h('path', { d: area, fill: 'url(#sg)' }),
    h('path', { d: line, fill: 'none', stroke: color || '#00B863', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }));
}

/* ---------- Toggle ---------- */
function Toggle({ on, onChange }) {
  return h('button', { className: 'toggle' + (on ? ' on' : ''), onClick: () => onChange(!on) });
}

Object.assign(window, {
  h, Icon, I, Avatar, AV_COLORS, Badge,
  ToastHost, useToast, Sidebar, Topbar, PageHead,
  Card, Kpi, BarChart, Donut, Spark, Toggle,
});
