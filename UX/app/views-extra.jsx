function Financeiro() {
  return (
    <>
      <PageHead
        title="Financeiro rastreável."
        description="Orçamento, lançamentos, notas fiscais e receitas do evento em uma única trilha de controle."
        action="Novo lançamento"
      />

      <div className="money-grid">
        <div className="budget">
          <span>Gasto até agora</span>
          <strong>R$ 147.620<i>,00</i></strong>
          <p>82% do orçamento · R$ 32.380 disponível</p>
          <div className="progress"><i style={{ width: '82%' }}></i></div>
        </div>

        <div className="panel">
          <h3>Por categoria</h3>
          <div className="list">
            <div className="row"><i className="dot"></i><div><strong>Local & estrutura</strong><span>R$ 62.400</span></div><Tag>92%</Tag></div>
            <div className="row"><i className="dot"></i><div><strong>Marketing</strong><span>R$ 38.200</span></div><Tag>68%</Tag></div>
            <div className="row"><i className="dot"></i><div><strong>Catering</strong><span>R$ 27.000</span></div><Tag tone="warn">NF</Tag></div>
          </div>
        </div>
      </div>
    </>
  );
}

function Checklist() {
  const tasks = [
    ['Fechar grade de palestrantes', 'Responsável: Carol · concluído', true, 'Ok', ''],
    ['Enviar layout final para fornecedores', 'Responsável: Rafael · concluído', true, 'Ok', ''],
    ['Validar NF do catering', 'Responsável: Diego · vence hoje', false, 'Crítico', 'warn'],
    ['Confirmar equipe de credenciamento', 'Responsável: Mariana · amanhã', false, 'Em andamento', 'info'],
  ];

  return (
    <>
      <PageHead
        title="Checklist vivo."
        description="Todo responsável sabe o que fazer, quando vence e o que já foi concluído."
        action="Adicionar tarefa"
      />
      <div className="checklist">
        {tasks.map(([title, meta, checked, status, tone]) => (
          <label className="task" key={title}>
            <input type="checkbox" defaultChecked={checked} />
            <div><strong>{title}</strong><span>{meta}</span></div>
            <Tag tone={tone}>{status}</Tag>
          </label>
        ))}
      </div>
    </>
  );
}

function Membros() {
  const members = [
    ['GM', 'Guilherme Moraes', 'Owner · acesso total', 'Online', ''],
    ['MC', 'Mariana Costa', 'Operação · checklist e inscritos', 'Ativa', 'info'],
    ['DA', 'Diego Almeida', 'Financeiro · orçamento e NFs', 'Revisão', 'warn'],
  ];

  return (
    <>
      <PageHead
        title="Equipe alinhada."
        description="Distribua papéis, acompanhe responsabilidades e reduza ruído operacional."
        action="Convidar membro"
      />
      <div className="card-grid">
        {members.map(([initials, name, role, status, tone]) => (
          <div className="card" key={name}>
            <Avatar>{initials}</Avatar>
            <h3 style={{ marginTop: 18 }}>{name}</h3>
            <p>{role}</p>
            <div style={{ marginTop: 16 }}><Tag tone={tone}>{status}</Tag></div>
          </div>
        ))}
      </div>
    </>
  );
}

function Config() {
  return (
    <>
      <PageHead
        title="Configurações do hub."
        description="Controle dados do evento, permissões, integrações e preferências da operação."
        action="Salvar alterações"
      />
      <div className="settings-grid">
        <div className="panel">
          <h3>Dados do evento</h3>
          <input className="input" defaultValue="Summit de Marketing 2026" />
          <br /><br />
          <input className="input" defaultValue="São Paulo · WTC Events Center" />
        </div>
        <div className="panel">
          <h3>Integrações</h3>
          <div className="list">
            <div className="row"><i className="dot"></i><div><strong>HubSpot</strong><span>Formulário do beta conectado</span></div><Tag>Ativo</Tag></div>
            <div className="row"><i className="dot"></i><div><strong>Pagamentos</strong><span>Stripe em configuração</span></div><Tag tone="warn">Pendente</Tag></div>
          </div>
        </div>
        <div className="panel">
          <h3>Permissões</h3>
          <p>Owners podem editar financeiro, inscritos, equipe e configurações. Operação pode atualizar checklist e check-in.</p>
        </div>
        <div className="panel">
          <h3>Notificações</h3>
          <p>Alertas de vencimento, orçamento e tarefas críticas habilitados para o evento ativo.</p>
        </div>
      </div>
    </>
  );
}
