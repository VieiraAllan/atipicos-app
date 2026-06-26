// Atípicos — Áreas Responsável e Terapeuta (Fase 4)
const { useState: useAdState } = React;
const { TopBar: TopBarA, BottomNav: BottomNavA, Card: CardA, Row: RowA, MapBox: MapBoxA, Bars: BarsA, falar: falarA, NOME_DEMO: NOMEA } = window;

function BackChip({ nav, titulo }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0 14px" }}>
      <button className="atp-btn atp-btn-sm" style={{ minWidth: 0 }} onClick={nav.back}>← Voltar</button>
      <span className="itp-h2" style={{ margin: 0 }}>{titulo}</span>
    </div>
  );
}

// ═══════════════ RESPONSÁVEL ═══════════════
function PaisShell({ nav, active, children }) {
  return (
    <div className="itp-page" style={{ background: "#fdfbf7" }}>
      <TopBarA nav={nav} nome="Maria" bell onBell={() => nav.go("paisNoticias")} />
      <div className="itp-body">{children}</div>
      <BottomNavA
        items={[
          { icon: "🏠", on: active === "home", onPress: () => nav.go("homeResponsavel") },
          { icon: "📊", on: active === "rel", onPress: () => nav.go("paisRelatorios") },
          { icon: "🔧", on: active === "cfg", onPress: () => nav.go("paisConfig") },
        ]}
        sos
        onSOS={() => nav.go("sos")}
      />
    </div>
  );
}

function HomeResponsavel({ nav }) {
  return (
    <PaisShell nav={nav} active="home">
      <CardA title="Rotina da Criança">
        <div className="itp-task done"><span className="chk">✓</span><span className="emoji">🦷</span><span className="t">Escovar os dentes</span><span className="time">08:00</span></div>
        <div className="itp-task"><span className="chk"></span><span className="emoji">🎒</span><span className="t">Ir para a escola</span><span className="time">09:00</span></div>
        <div className="itp-task"><span className="chk"></span><span className="emoji">📚</span><span className="t">Lição de casa</span><span className="time">15:00</span></div>
      </CardA>
      <CardA title="Última localização" onPress={() => nav.go("paisLocalizacao")}>
        <div style={{ margin: -14 }}><MapBoxA /></div>
      </CardA>
      <RowA emoji="📋" label="Editar Tarefas" onPress={() => nav.go("paisEditarTarefas")} />
      <RowA emoji="📱" label="Controle de Uso" onPress={() => nav.go("paisControle")} />
    </PaisShell>
  );
}

// Editar tarefas (RF07–RF09)
function PaisEditarTarefas({ nav }) {
  const [tarefas, setTarefas] = useAdState([
    { emoji: "🦷", t: "Escovar os dentes", time: "08:00" },
    { emoji: "🎒", t: "Ir para a escola", time: "09:00" },
    { emoji: "📚", t: "Lição de casa", time: "15:00" },
  ]);
  const [texto, setTexto] = useAdState("");
  const add = () => { if (texto.trim()) { setTarefas((t) => [...t, { emoji: "⭐", t: texto.trim(), time: "--:--" }]); setTexto(""); } };
  const remover = (i) => setTarefas((t) => t.filter((_, j) => j !== i));
  return (
    <PaisShell nav={nav}>
      <BackChip nav={nav} titulo="Editar Tarefas" />
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input className="atp-field-in" value={texto} onChange={(e) => setTexto(e.target.value)}
          placeholder="Nova tarefa…" style={{ flex: 1, border: "2px solid #151426", borderRadius: 10, padding: "0 12px", height: 44, background: "#fff" }} />
        <button className="atp-btn" style={{ minWidth: 0, height: 44 }} onClick={add}>＋</button>
      </div>
      {tarefas.map((t, i) => (
        <div key={i} className="itp-task">
          <span className="emoji">{t.emoji}</span>
          <span className="t">{t.t}</span>
          <span className="time">{t.time}</span>
          <button className="itp-bell" style={{ fontSize: 20 }} onClick={() => remover(i)}>🗑️</button>
        </div>
      ))}
    </PaisShell>
  );
}

// Controle de uso
function PaisControle({ nav }) {
  const [limite, setLimite] = useAdState(2);
  const [cats, setCats] = useAdState({ Jogos: true, Vídeos: false, Educativos: true });
  const toggle = (k) => setCats((c) => ({ ...c, [k]: !c[k] }));
  return (
    <PaisShell nav={nav}>
      <BackChip nav={nav} titulo="Controle de Uso" />
      <CardA title="Tempo de tela por dia">
        <div style={{ textAlign: "center", fontFamily: "Quicksand", fontWeight: 700, fontSize: 28, color: "#151426" }}>{limite}h</div>
        <input type="range" min="0" max="6" step="0.5" value={limite} onChange={(e) => setLimite(+e.target.value)} style={{ width: "100%", accentColor: "#6d1d00" }} />
      </CardA>
      <h2 className="itp-h2">Categorias liberadas</h2>
      {Object.keys(cats).map((k) => (
        <div key={k} className="itp-listitem" style={{ cursor: "default" }}>
          <span className="emoji">{k === "Jogos" ? "🎮" : k === "Vídeos" ? "📺" : "📚"}</span>
          <div className="body"><div className="ti">{k}</div></div>
          <div className={"itp-toggle" + (cats[k] ? " on" : "")} onClick={() => toggle(k)}><span className="knob" /></div>
        </div>
      ))}
    </PaisShell>
  );
}

// Relatórios (RF16/RF17) + cadastro de criança (RF04)
function PaisRelatorios({ nav }) {
  return (
    <PaisShell nav={nav} active="rel">
      <h2 className="itp-h2">Relatório de Progresso</h2>
      <CardA title="Lucas — 5 anos">
        <div className="itp-charts">
          <div className="itp-chartbox"><div className="cap">Evolução da Fala</div><BarsA valores={[40, 55, 70, 85]} /></div>
          <div className="itp-chartbox"><div className="cap">Evolução Cognitiva</div><BarsA valores={[50, 45, 75, 90]} /></div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: 16, fontFamily: "Quicksand", fontWeight: 700, color: "#151426" }}>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: 24 }}>87%</div><div style={{ fontSize: 12, color: "#6d6c6c" }}>Tarefas</div></div>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: 24 }}>12</div><div style={{ fontSize: 12, color: "#6d6c6c" }}>Atividades</div></div>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: 24 }}>+15%</div><div style={{ fontSize: 12, color: "#6d6c6c" }}>No mês</div></div>
        </div>
      </CardA>
      <button className="atp-btn" style={{ width: "100%" }} onClick={() => nav.go("cadastroAtipico")}>＋ Cadastrar nova criança</button>
    </PaisShell>
  );
}

function PaisLocalizacao({ nav }) {
  return (
    <PaisShell nav={nav}>
      <BackChip nav={nav} titulo="Localização" />
      <div className="itp-card"><MapBoxA height={320} /></div>
      <div style={{ fontFamily: "Quicksand", fontWeight: 600, fontSize: 15, color: "#151426", textAlign: "center", marginBottom: 16 }}>
        Última atualização há 4 minutos<br />Av. Cesário de Melo — Rio de Janeiro
      </div>
      <button className="itp-sos" style={{ width: "100%" }} onClick={() => nav.go("sos")}>SOS — Acionar emergência</button>
    </PaisShell>
  );
}

const NOTICIAS = [
  { emoji: "📰", ti: "Intervenção precoce traz ganhos no TEA", de: "Estudo aponta avanços no desenvolvimento quando a terapia começa antes dos 3 anos.", src: "via NewsAPI" },
  { emoji: "🧩", ti: "Tecnologia assistiva amplia a comunicação", de: "Aplicativos de CAA ajudam crianças não verbais a se expressarem.", src: "via NewsAPI" },
  { emoji: "🏫", ti: "Inclusão escolar e o papel da família", de: "Especialistas destacam a parceria entre escola e responsáveis.", src: "via NewsAPI" },
];
function PaisNoticias({ nav }) {
  return (
    <PaisShell nav={nav}>
      <BackChip nav={nav} titulo="Informações sobre TEA" />
      {NOTICIAS.map((n, i) => (
        <div key={i} className="itp-news">
          <div className="itp-news-img">{n.emoji}</div>
          <div className="itp-news-body">
            <div className="ti">{n.ti}</div>
            <div className="de">{n.de}</div>
            <div className="src">{n.src}</div>
          </div>
        </div>
      ))}
    </PaisShell>
  );
}

const CONFIG_ITENS = [
  { emoji: "🔔", ti: "Notificações", su: "Alertas e lembretes" },
  { emoji: "👤", ti: "Minha conta", su: "Dados pessoais" },
  { emoji: "🔒", ti: "Privacidade e segurança", su: "Senha e dados" },
  { emoji: "❓", ti: "Ajuda", su: "Dúvidas frequentes" },
];
function ConfigGenerica({ nav, shell: Shell }) {
  return (
    <Shell nav={nav} active="cfg">
      <h2 className="itp-h2">Configurações</h2>
      {CONFIG_ITENS.map((c, i) => (
        <div key={i} className="itp-listitem"><span className="emoji">{c.emoji}</span><div className="body"><div className="ti">{c.ti}</div><div className="su">{c.su}</div></div><span className="go">›</span></div>
      ))}
      <div className="itp-listitem" onClick={() => nav.go("inicial")}><span className="emoji">🚪</span><div className="body"><div className="ti" style={{ color: "#eb5757" }}>Sair da conta</div></div><span className="go">›</span></div>
    </Shell>
  );
}

// ═══════════════ TERAPEUTA ═══════════════
const PACIENTES = [
  { nome: "Ana", idade: "6 anos", diag: "TEA Nível 1", emoji: "🧒" },
  { nome: "Pedro", idade: "8 anos", diag: "TEA + TDAH", emoji: "👦" },
  { nome: "Lucas", idade: "5 anos", diag: "TEA Nível 2", emoji: "🧒" },
];
let pacienteAtivo = 0;

function TerapeutaShell({ nav, active, children }) {
  return (
    <div className="itp-page" style={{ background: "#fdfbf7" }}>
      <TopBarA nav={nav} nome="Dra. Helena" bell onBell={() => nav.go("paisNoticias")} />
      <div className="itp-body">{children}</div>
      <BottomNavA
        items={[
          { icon: "🏠", on: active === "home", onPress: () => nav.go("homeTerapeuta") },
          { icon: "📊", on: active === "rel", onPress: () => nav.go("homeTerapeuta") },
          { icon: "🔧", on: active === "cfg", onPress: () => nav.go("terapeutaConfig") },
        ]}
      />
    </div>
  );
}

function PatientCard({ p, onPress }) {
  return (
    <div className="itp-patient" onClick={onPress}>
      <div className="itp-patient-head">
        <div className="itp-avatar">{p.emoji}</div>
        <div className="itp-patient-info">
          <div>“{p.nome}”</div>
          <div><b>Idade:</b> {p.idade}</div>
          <div><b>Diagnóstico:</b> {p.diag}</div>
          <div className="itp-online">● Online</div>
        </div>
      </div>
      <div className="itp-charts">
        <div className="itp-chartbox"><div className="cap">Evolução da Fala</div><BarsA valores={[45, 60, 50, 80]} /></div>
        <div className="itp-chartbox"><div className="cap">Evolução Cognitiva</div><BarsA valores={[55, 50, 70, 85]} /></div>
      </div>
    </div>
  );
}

function HomeTerapeuta({ nav }) {
  return (
    <TerapeutaShell nav={nav} active="home">
      <h2 className="itp-h2">Pacientes Ativos</h2>
      {PACIENTES.map((p, i) => (
        <PatientCard key={i} p={p} onPress={() => { pacienteAtivo = i; nav.go("terapeutaPaciente"); }} />
      ))}
    </TerapeutaShell>
  );
}

// Detalhe do paciente + relatório (RF20–RF22)
function TerapeutaPaciente({ nav }) {
  const p = PACIENTES[pacienteAtivo];
  const [relatorio, setRelatorio] = useAdState("");
  const [salvo, setSalvo] = useAdState(false);
  return (
    <TerapeutaShell nav={nav}>
      <BackChip nav={nav} titulo={`Paciente — ${p.nome}`} />
      <PatientCard p={p} />
      <h2 className="itp-h2">Relatório da sessão</h2>
      <textarea value={relatorio} onChange={(e) => { setRelatorio(e.target.value); setSalvo(false); }}
        placeholder="Descreva a evolução, observações e próximos passos…"
        style={{ width: "100%", minHeight: 120, border: "3px solid #151426", borderRadius: 14, padding: 14, fontFamily: "Quicksand", fontSize: 15, resize: "vertical", background: "#fff", boxSizing: "border-box" }} />
      <button className="atp-btn atp-btn-success" style={{ width: "100%", marginTop: 14 }} onClick={() => setSalvo(true)}>
        {salvo ? "✓ Relatório salvo" : "Salvar relatório"}
      </button>
    </TerapeutaShell>
  );
}

window.ADULTOS_SCREENS = {
  homeResponsavel: (nav) => <HomeResponsavel nav={nav} />,
  paisEditarTarefas: (nav) => <PaisEditarTarefas nav={nav} />,
  paisControle: (nav) => <PaisControle nav={nav} />,
  paisRelatorios: (nav) => <PaisRelatorios nav={nav} />,
  paisLocalizacao: (nav) => <PaisLocalizacao nav={nav} />,
  paisNoticias: (nav) => <PaisNoticias nav={nav} />,
  paisConfig: (nav) => <ConfigGenerica nav={nav} shell={PaisShell} />,
  homeTerapeuta: (nav) => <HomeTerapeuta nav={nav} />,
  terapeutaPaciente: (nav) => <TerapeutaPaciente nav={nav} />,
  terapeutaConfig: (nav) => <ConfigGenerica nav={nav} shell={TerapeutaShell} />,
};
