// Atípicos — Área Kids (Fase 4)
const { useState: useKidsState } = React;
const { TopBar: TopBarK, BottomNav: BottomNavK, falar: falarK, NOME_DEMO: NOMEK } = window;

// Casca comum das telas Kids: topo + corpo + navegação inferior
function KidsShell({ nav, bg = "#fdfbf7", children }) {
  return (
    <div className="itp-page" style={{ background: bg }}>
      <TopBarK nav={nav} nome={NOMEK} />
      <div className="itp-body">{children}</div>
      <BottomNavK
        items={[{ icon: "🏠", on: true, onPress: () => nav.go("homeKids") }]}
        sos
        onSOS={() => nav.go("sos")}
      />
    </div>
  );
}

// ─── Home Kids ───────────────────────────────────────────────────────
const CARDS_KIDS = [
  { label: "EMOÇÕES", to: "kidsEmocoes", bg: "linear-gradient(180deg,#83d6ff 0%,#62dd5b 33%,#dfa13e 62%,#f35b5b 100%)", cluster: true },
  { label: "TAREFAS", to: "kidsTarefas", bg: "#b7f5a6", emoji: "⏰" },
  { label: "FONOAUDIÓLOGA", to: "kidsFono", bg: "#ffc0dd", emoji: "🎤" },
  { label: "PSICÓLOGO", to: "kidsPsico", bg: "#aee3ff", emoji: "🧠" },
  { label: "COMUNICAÇÃO", to: "kidsComunicacao", bg: "#ffd9a8", emoji: "💬" },
  { label: "ATIVIDADE ESCOLAR", to: "kidsEscola", bg: "#ff9e9e", emoji: "📖" },
];

function HomeKids({ nav }) {
  return (
    <KidsShell nav={nav}>
      <div className="itp-grid" style={{ marginTop: 8 }}>
        {CARDS_KIDS.map((c) => (
          <div key={c.label} className="itp-kidcard" style={{ background: c.bg }} onClick={() => nav.go(c.to)}>
            <span className="emoji" style={c.cluster ? { fontSize: 30, lineHeight: 1.1 } : null}>
              {c.cluster ? "😀😢😠😴" : c.emoji}
            </span>
            <span className="lbl">{c.label}</span>
          </div>
        ))}
      </div>
    </KidsShell>
  );
}

// ─── Emoções ─────────────────────────────────────────────────────────
const EMOCOES = [
  { lbl: "FELIZ", emoji: "😀" }, { lbl: "TRISTE", emoji: "😢" },
  { lbl: "BRAVO", emoji: "😠" }, { lbl: "COM SONO", emoji: "😴" },
  { lbl: "CANSADO", emoji: "🥱" }, { lbl: "ANIMADO", emoji: "🤩" },
];
function KidsEmocoes({ nav }) {
  const [sel, setSel] = useKidsState(null);
  const escolher = (e) => { setSel(e.lbl); falarK(`Eu estou ${e.lbl.toLowerCase()}`); };
  return (
    <KidsShell nav={nav} bg="#f53b3b">
      <h2 className="itp-h2" style={{ color: "#fff", fontSize: 20 }}>Como você está se sentindo?</h2>
      <div className="itp-grid">
        {EMOCOES.map((e) => (
          <div key={e.lbl} className={"itp-emotion" + (sel === e.lbl ? " sel" : "")} onClick={() => escolher(e)}>
            <span className="emoji">{e.emoji}</span>
            <span className="lbl">{e.lbl}</span>
          </div>
        ))}
      </div>
    </KidsShell>
  );
}

// ─── Rotina / Tarefas ────────────────────────────────────────────────
const TAREFAS_INIT = [
  { emoji: "🦷", t: "Escovar os dentes", time: "08:00", done: true },
  { emoji: "🥣", t: "Tomar café da manhã", time: "08:30", done: true },
  { emoji: "🎒", t: "Ir para a escola", time: "09:00", done: false },
  { emoji: "🍽️", t: "Almoçar", time: "12:00", done: false },
  { emoji: "📚", t: "Lição de casa", time: "15:00", done: false },
  { emoji: "🛁", t: "Tomar banho", time: "19:00", done: false },
  { emoji: "😴", t: "Hora de dormir", time: "21:00", done: false },
];
function KidsTarefas({ nav }) {
  const [tarefas, setTarefas] = useKidsState(TAREFAS_INIT);
  const toggle = (i) => setTarefas((ts) => ts.map((t, j) => {
    if (j !== i) return t;
    if (!t.done) falarK(t.t);
    return { ...t, done: !t.done };
  }));
  return (
    <KidsShell nav={nav}>
      <h2 className="itp-h2">Minha Rotina de Hoje</h2>
      {tarefas.map((t, i) => (
        <div key={i} className={"itp-task" + (t.done ? " done" : "")} onClick={() => toggle(i)}>
          <span className="chk">{t.done ? "✓" : ""}</span>
          <span className="emoji">{t.emoji}</span>
          <span className="t">{t.t}</span>
          <span className="time">{t.time}</span>
        </div>
      ))}
    </KidsShell>
  );
}

// ─── Listas simples (Fono / Psico / Escola) ──────────────────────────
function ListaAtividades({ nav, titulo, itens }) {
  return (
    <KidsShell nav={nav}>
      <h2 className="itp-h2">{titulo}</h2>
      {itens.map((it, i) => (
        <div key={i} className="itp-listitem" onClick={() => falarK(it.ti)}>
          <span className="emoji">{it.emoji}</span>
          <div className="body">
            <div className="ti">{it.ti}</div>
            <div className="su">{it.su}</div>
          </div>
          <span className="go">▶</span>
        </div>
      ))}
    </KidsShell>
  );
}
const FONO = [
  { emoji: "🗣️", ti: "Repita os sons", su: "Pa, Ba, Ta, Da" },
  { emoji: "🐶", ti: "Nomeie os animais", su: "Cachorro, gato, vaca…" },
  { emoji: "🎵", ti: "Cante a música", su: "Brincando com a fala" },
  { emoji: "👄", ti: "Exercícios de boca", su: "Movimentos da língua" },
];
const PSICO = [
  { emoji: "🧩", ti: "Quebra-cabeça das emoções", su: "Reconhecer sentimentos" },
  { emoji: "🌬️", ti: "Respiração calmante", su: "Inspira… expira…" },
  { emoji: "🎨", ti: "Pintar sentimentos", su: "Expressão livre" },
  { emoji: "📖", ti: "História social", su: "Situações do dia a dia" },
];
const ESCOLA = [
  { emoji: "🔤", ti: "Letras", su: "Conhecer o alfabeto" },
  { emoji: "🔢", ti: "Números", su: "Contar de 1 a 10" },
  { emoji: "🎨", ti: "Cores", su: "Identificar cores" },
  { emoji: "⭐", ti: "Formas", su: "Círculo, quadrado…" },
  { emoji: "🐾", ti: "Animais", su: "Sons e nomes" },
];

// ─── Comunicação (AAC) ───────────────────────────────────────────────
const SIMBOLOS = [
  { lbl: "EU", emoji: "🧒" }, { lbl: "QUERO", emoji: "🙋" }, { lbl: "COMER", emoji: "🍽️" },
  { lbl: "BEBER", emoji: "🥤" }, { lbl: "ÁGUA", emoji: "💧" }, { lbl: "BANHEIRO", emoji: "🚽" },
  { lbl: "BRINCAR", emoji: "🧸" }, { lbl: "DORMIR", emoji: "😴" }, { lbl: "AJUDA", emoji: "🆘" },
  { lbl: "SIM", emoji: "✅" }, { lbl: "NÃO", emoji: "❌" }, { lbl: "MAIS", emoji: "➕" },
];
function KidsComunicacao({ nav }) {
  const [frase, setFrase] = useKidsState([]);
  const add = (s) => { setFrase((f) => [...f, s]); falarK(s.lbl); };
  const limpar = () => setFrase([]);
  const apagar = () => setFrase((f) => f.slice(0, -1));
  const dizer = () => { if (frase.length) falarK(frase.map((s) => s.lbl).join(" ")); };
  return (
    <KidsShell nav={nav}>
      <h2 className="itp-h2">Toque para falar</h2>
      <div className="itp-aac-bar">
        <div className="itp-aac-sentence">
          {frase.length === 0 ? (
            <span className="itp-aac-empty">Monte sua frase…</span>
          ) : (
            frase.map((s, i) => (
              <span key={i} className="itp-aac-chip">{s.emoji} {s.lbl}</span>
            ))
          )}
        </div>
        <button className="itp-speak" onClick={dizer} aria-label="Falar frase">🔊</button>
      </div>
      <div className="itp-aac-tools">
        <button className="itp-aac-tool" onClick={apagar}>⌫ Apagar</button>
        <button className="itp-aac-tool" onClick={limpar}>Limpar</button>
      </div>
      <div className="itp-aac-grid">
        {SIMBOLOS.map((s) => (
          <div key={s.lbl} className="itp-aac-btn" onClick={() => add(s)}>
            <span className="emoji">{s.emoji}</span>
            <span className="lbl">{s.lbl}</span>
          </div>
        ))}
      </div>
    </KidsShell>
  );
}

// ─── SOS (compartilhada Kids/Pais) ───────────────────────────────────
function TelaSOS({ nav }) {
  return (
    <div className="itp-sos-screen">
      <span className="big">🚨</span>
      <div className="ttl">SOS acionado!</div>
      <div className="sub">A localização da criança foi enviada aos responsáveis cadastrados.</div>
      <button className="atp-btn atp-btn-success" onClick={nav.back}>Voltar</button>
    </div>
  );
}

window.KIDS_SCREENS = {
  homeKids: (nav) => <HomeKids nav={nav} />,
  kidsEmocoes: (nav) => <KidsEmocoes nav={nav} />,
  kidsTarefas: (nav) => <KidsTarefas nav={nav} />,
  kidsFono: (nav) => <ListaAtividades nav={nav} titulo="Fonoaudióloga 🎤" itens={FONO} />,
  kidsPsico: (nav) => <ListaAtividades nav={nav} titulo="Psicólogo 🧠" itens={PSICO} />,
  kidsEscola: (nav) => <ListaAtividades nav={nav} titulo="Atividade Escolar 📖" itens={ESCOLA} />,
  kidsComunicacao: (nav) => <KidsComunicacao nav={nav} />,
  sos: (nav) => <TelaSOS nav={nav} />,
};
