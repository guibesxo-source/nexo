function Dashboard({ go }) {
  return (
    <>
      <PageHead
        title="Operação em tempo real."
        description="Visão executiva do evento, com inscrições, receita, orçamento e tarefas críticas no mesmo painel."
        action="Ver financeiro"
        onAction={() => go('financeiro')}
      />

      <div className="kpis">
        <Kpi label="Inscritos" value="320" delta="+24 hoje" />
        <Kpi label="Receita" value="R$ 186k" delta="+12%" />
        <Kpi label="Check-in previsto" value="74%" delta="alta confiança" />
        <Kpi label="Tarefas abertas" value="18" delta="4 críticas" />
      </div>

      <div className="grid-2">
        <div className="panel">
          <h3>Inscrições por semana</h3>
          <div className="bars">
            {[44, 36, 58, 72, 64, 88, 76, 92].map((height, index) => (
              <div className="bar" key={index}>
                <i style={{ height: height + '%' }}></i>
                <span>S{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>Alertas da operação</h3>
          <div className="list">
            <div className="row"><i className="dot"></i><div><strong>Catering pendente de NF</strong><span>Fornecedor Bistro 320</span></div><Tag tone="warn">Hoje</Tag></div>
            <div className="row"><i className="dot"></i><div><strong>Credenciamento aprovado</strong><span>Equipe de recepção confirmada</span></div><Tag>Ok</Tag></div>
            <div className="row"><i className="dot"></i><div><strong>Patrocínio recebido</strong><span>Stripe Brasil · R$ 25.000</span></div><Tag tone="info">Novo</Tag></div>
          </div>
        </div>
      </div>
    </>
  );
}

function Eventos() {
  const eventos = [
    ['Summit de Marketing 2026', '18 a 20 jun · São Paulo', 'Ativo', '', '82%'],
    ['Brand Experience Day', '04 ago · Rio de Janeiro', 'Planejamento', 'warn', '46%'],
    ['Meetup Founders', '21 set · Belo Horizonte', 'Rascunho', 'info', '18%'],
  ];

  return (
    <>
      <PageHead
        title="Eventos conectados."
        description="Centralize múltiplos eventos e acompanhe status, orçamento, equipe e próximos marcos."
        action="Criar evento"
      />
      <div className="card-grid">
        {eventos.map(([title, meta, status, tone, progress]) => (
          <div className="card" key={title}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
              <div>
                <h3>{title}</h3>
                <p>{meta}</p>
              </div>
              <Tag tone={tone}>{status}</Tag>
            </div>
            <strong style={{ display: 'block', marginTop: 26 }}>320 inscritos</strong>
            <div className="progress"><i style={{ width: progress }}></i></div>
          </div>
        ))}
      </div>
    </>
  );
}

function Inscritos() {
  const rows = [
    ['MC', 'Mariana Costa', 'mariana@octopus.io', 'Octopus Studio', 'Confirmado', ''],
    ['RP', 'Rafael Pereira', 'rafael@brand.co', 'Brand & Co.', 'Check-in', 'info'],
    ['JS', 'Júlia Santos', 'julia@hubinc.com', 'Hub Inc.', 'Pendente', 'warn'],
    ['DA', 'Diego Almeida', 'diego@nexus.ai', 'Nexus AI', 'Confirmado', ''],
    ['CL', 'Carolina Lima', 'carol@summit.co', 'Summit.co', 'Confirmado', ''],
  ];

  return (
    <>
      <PageHead
        title="Inscritos sem planilha."
        description="Filtre participantes, acompanhe status de pagamento, confirme check-in e exporte listas em segundos."
        action="Exportar CSV"
      />
      <div className="table">
        {rows.map(([initials, name, email, company, status, tone]) => (
          <div className="row" key={email}>
            <Avatar>{initials}</Avatar>
            <div><strong>{name}</strong><span>{email}</span></div>
            <span>{company}</span>
            <Tag tone={tone}>{status}</Tag>
          </div>
        ))}
      </div>
    </>
  );
}
