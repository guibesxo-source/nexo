function ToastHost({ children }) {
  return children;
}

const NAV_ITEMS = [
  ['dashboard', 'Dashboard', '▦'],
  ['eventos', 'Eventos', '□'],
  ['inscritos', 'Inscritos', '◎'],
  ['financeiro', 'Financeiro', '$'],
  ['checklist', 'Checklist', '✓'],
  ['membros', 'Membros', '●'],
  ['config', 'Configurações', '⚙'],
];

function Sidebar({ active, onNav, open, eventName }) {
  return (
    <aside className={'sidebar' + (open ? ' open' : '')}>
      <div className="brand"><span className="brand-mark"></span>Nexo</div>

      <div className="event-card">
        <span>Evento ativo</span>
        <strong>{eventName}</strong>
        <small>São Paulo · 18 a 20 jun · 320 inscritos</small>
      </div>

      <nav className="nav" aria-label="Navegação principal">
        {NAV_ITEMS.map(([id, label, icon]) => (
          <button
            key={id}
            type="button"
            className={active === id ? 'active' : ''}
            onClick={() => onNav(id)}
          >
            <span className="icon">{icon}</span>
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function Topbar({ crumb, onMenu }) {
  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="menu-btn" type="button" onClick={onMenu}>☰</button>
        <div className="crumb">
          <span>Nexo App</span>
          <strong>{crumb}</strong>
        </div>
      </div>

      <div className="topbar-actions">
        <button className="btn outline" type="button" onClick={() => window.top.location.hash = '#top'}>Ver LP</button>
        <button className="btn primary" type="button">Novo evento</button>
        <div className="user-pill"><i>GM</i> Guilherme</div>
      </div>
    </header>
  );
}

function PageHead({ title, description, action, onAction }) {
  return (
    <div className="page-head">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action && <button className="btn primary" type="button" onClick={onAction}>{action}</button>}
    </div>
  );
}

function Kpi({ label, value, delta }) {
  return (
    <div className="kpi">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{delta}</small>
    </div>
  );
}

function Tag({ children, tone = '' }) {
  return <span className={'tag' + (tone ? ' ' + tone : '')}>{children}</span>;
}

function Avatar({ children }) {
  return <div className="avatar">{children}</div>;
}
