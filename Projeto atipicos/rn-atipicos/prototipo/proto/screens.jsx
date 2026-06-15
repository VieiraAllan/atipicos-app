// Atípicos — telas do fluxo de autenticação/cadastro + navegação
const { useState, useEffect, useRef } = React;
const { Logo, BackButton, PrimaryButton, Field, Select, PhoneFrame, Icon } = window;

// ─── Dados de apoio ──────────────────────────────────────────────────
const PERGUNTAS_SEG = [
  "Nome do seu primeiro animal de estimação",
  "Cidade onde você nasceu",
  "Nome de solteira da sua mãe",
  "Seu apelido de infância",
];
const DIAGNOSTICOS = [
  "TEA — Nível 1 (suporte leve)",
  "TEA — Nível 2 (suporte substancial)",
  "TEA — Nível 3 (suporte muito substancial)",
  "TEA + TDAH",
  "TEA + TOD",
  "Outro",
];

// ─── Tela genérica de formulário ─────────────────────────────────────
function FormScreen({ nav, title, titleAlign = "left", fields, button, onSubmit, link }) {
  const [vals, setVals] = useState({});
  const set = (k) => (v) => setVals((s) => ({ ...s, [k]: v }));
  return (
    <div className="atp-page">
      <BackButton onClick={nav.back} />
      <div className="atp-scroll">
        <Logo w={208} />
        <h1 className="atp-title" style={{ textAlign: titleAlign }}>{title}</h1>
        <div className="atp-form">
          {fields.map((f) =>
            f.kind === "select" ? (
              <Select key={f.key} icon={f.icon} placeholder={f.placeholder}
                options={f.options} value={vals[f.key]} onChange={set(f.key)} />
            ) : (
              <Field key={f.key} icon={f.icon} placeholder={f.placeholder}
                type={f.type || "text"} value={vals[f.key] || ""} onChange={set(f.key)} />
            )
          )}
        </div>
        {link && (
          <button className="atp-link" onClick={() => nav.go(link.to)}>{link.label}</button>
        )}
        <div className="atp-cta">
          <PrimaryButton size="lg" onClick={onSubmit}>{button}</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

// ─── Tela de sucesso ─────────────────────────────────────────────────
function SuccessScreen({ nav, message, to }) {
  return (
    <div className="atp-page atp-center">
      <Logo w={230} />
      <p className="atp-success-msg">{message}</p>
      <PrimaryButton variant="success" onClick={() => nav.go(to)}>Ir para Log in</PrimaryButton>
    </div>
  );
}

// ─── Placeholder de área interna (Fase 4 / Plano B) ──────────────────
function AreaStub({ nav, titulo, emoji, extra }) {
  return (
    <div className="atp-page atp-center">
      <Logo w={150} />
      <div className="atp-area-badge">{emoji}</div>
      <h2 className="atp-area-title">{titulo}</h2>
      <p className="atp-area-note">Login realizado com sucesso.<br />Esta área será construída na Fase 4 (Plano B).</p>
      <div className="atp-area-actions">
        {extra}
        <PrimaryButton onClick={() => nav.go("inicial")}>Sair</PrimaryButton>
      </div>
    </div>
  );
}

// ─── Telas ───────────────────────────────────────────────────────────
const Screens = {
  splash: (nav) => <SplashScreen nav={nav} />,

  inicial: (nav) => (
    <div className="atp-page atp-center">
      <Logo w={250} />
      <div className="atp-stack">
        <PrimaryButton size="lg" onClick={() => nav.go("loginAtipico")}>Log in Atípico</PrimaryButton>
        <PrimaryButton size="lg" onClick={() => nav.go("loginResponsavel")}>Log in Responsável</PrimaryButton>
        <PrimaryButton size="lg" onClick={() => nav.go("loginTerapeuta")}>Log in Terapeuta</PrimaryButton>
      </div>
      <PrimaryButton size="sm" onClick={() => nav.go("cadastroEscolha")} style={{ marginTop: 26 }}>Criar Conta</PrimaryButton>
    </div>
  ),

  cadastroEscolha: (nav) => (
    <div className="atp-page">
      <BackButton onClick={nav.back} />
      <div className="atp-scroll atp-center" style={{ justifyContent: "center" }}>
        <Logo w={244} />
        <div className="atp-stack" style={{ marginTop: 64 }}>
          <PrimaryButton size="lg" onClick={() => nav.go("cadastroResponsavel")}>Sou Responsável</PrimaryButton>
          <PrimaryButton size="lg" onClick={() => nav.go("cadastroTerapeuta")}>Sou Terapeuta</PrimaryButton>
        </div>
      </div>
    </div>
  ),

  loginResponsavel: (nav) => (
    <FormScreen nav={nav} title="Login Responsável" fields={LOGIN_FIELDS}
      link={{ label: "Esqueci a senha", to: "recuperacao" }} button="ENTRAR"
      onSubmit={() => nav.go("homeResponsavel")} />
  ),
  loginTerapeuta: (nav) => (
    <FormScreen nav={nav} title="Login Terapeuta" fields={LOGIN_FIELDS}
      link={{ label: "Esqueci a senha", to: "recuperacao" }} button="ENTRAR"
      onSubmit={() => nav.go("homeTerapeuta")} />
  ),
  loginAtipico: (nav) => (
    <FormScreen nav={nav} title="Login Atípico" fields={LOGIN_FIELDS}
      link={{ label: "Esqueci a senha", to: "recuperacao" }} button="ENTRAR"
      onSubmit={() => nav.go("homeKids")} />
  ),

  cadastroResponsavel: (nav) => (
    <FormScreen nav={nav} title="Cadastro" titleAlign="center" fields={CAD_ADULTO}
      button="CADASTRAR" onSubmit={() => nav.go("cadastroFeito")} />
  ),
  cadastroTerapeuta: (nav) => (
    <FormScreen nav={nav} title="Cadastro" titleAlign="center" fields={CAD_ADULTO}
      button="CADASTRAR" onSubmit={() => nav.go("cadastroFeito")} />
  ),
  cadastroAtipico: (nav) => (
    <FormScreen nav={nav} title="Cadastro" titleAlign="center" fields={CAD_CRIANCA}
      button="CADASTRAR" onSubmit={() => nav.go("cadastroFeito")} />
  ),

  recuperacao: (nav) => (
    <FormScreen nav={nav} title="Recuperação de Senha" titleAlign="center" fields={REC_FIELDS}
      button="CONFIRMAR" onSubmit={() => nav.go("recuperacaoOk")} />
  ),

  cadastroFeito: (nav) => (
    <SuccessScreen nav={nav} to="inicial" message="Cadastro realizado com sucesso!" />
  ),
  recuperacaoOk: (nav) => (
    <SuccessScreen nav={nav} to="inicial" message="Recuperação de senha realizada com sucesso!" />
  ),

};

// Integra as telas internas (Fase 4): Kids + Responsável + Terapeuta.
Object.assign(Screens, window.KIDS_SCREENS || {}, window.ADULTOS_SCREENS || {});

// ─── Conjuntos de campos ─────────────────────────────────────────────
const LOGIN_FIELDS = [
  { key: "email", icon: "mail", placeholder: "Insira seu email", type: "email" },
  { key: "senha", icon: "lock", placeholder: "Insira sua senha", type: "password" },
];
const CAD_ADULTO = [
  { key: "nome", icon: "user", placeholder: "Nome completo" },
  { key: "cpf", icon: "id", placeholder: "CPF" },
  { key: "cep", icon: "pin", placeholder: "CEP" },
  { key: "email", icon: "mail", placeholder: "Insira seu email", type: "email" },
  { key: "dn", icon: "calendar", placeholder: "Data de nascimento", type: "date" },
  { key: "pergunta", icon: "help", placeholder: "Pergunta de segurança", kind: "select", options: PERGUNTAS_SEG },
  { key: "resposta", icon: "chat", placeholder: "Resposta de segurança" },
  { key: "senha", icon: "lock", placeholder: "Insira sua senha", type: "password" },
  { key: "conf", icon: "lock", placeholder: "Confirme sua senha", type: "password" },
];
const CAD_CRIANCA = [
  { key: "nome", icon: "user", placeholder: "Nome completo" },
  { key: "cpf", icon: "id", placeholder: "CPF" },
  { key: "cep", icon: "pin", placeholder: "CEP" },
  { key: "email", icon: "mail", placeholder: "Insira seu email", type: "email" },
  { key: "dn", icon: "calendar", placeholder: "Data de nascimento", type: "date" },
  { key: "diag", icon: "clipboard", placeholder: "Diagnóstico", kind: "select", options: DIAGNOSTICOS },
  { key: "senha", icon: "lock", placeholder: "Insira sua senha", type: "password" },
  { key: "conf", icon: "lock", placeholder: "Confirme sua senha", type: "password" },
];
const REC_FIELDS = [
  { key: "email", icon: "mail", placeholder: "Insira seu email", type: "email" },
  { key: "dn", icon: "calendar", placeholder: "Data de nascimento", type: "date" },
  { key: "pergunta", icon: "help", placeholder: "Pergunta cadastrada", kind: "select", options: PERGUNTAS_SEG },
  { key: "resposta", icon: "chat", placeholder: "Resposta de segurança" },
  { key: "nova", icon: "lock", placeholder: "Insira sua nova senha", type: "password" },
  { key: "conf", icon: "lock", placeholder: "Confirme sua senha", type: "password" },
];

// ─── Splash ──────────────────────────────────────────────────────────
function SplashScreen({ nav }) {
  useEffect(() => {
    const t = setTimeout(() => nav.go("inicial", true), 1900);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="atp-page atp-center atp-splash" onClick={() => nav.go("inicial", true)}>
      <div className="atp-splash-logo"><Logo w={300} /></div>
    </div>
  );
}

// ─── App / navegação ─────────────────────────────────────────────────
function App() {
  const [stack, setStack] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem("atp_stack"));
      if (Array.isArray(s) && s.length) return s;
    } catch (e) {}
    return ["splash"];
  });
  useEffect(() => { localStorage.setItem("atp_stack", JSON.stringify(stack)); }, [stack]);

  const current = stack[stack.length - 1];
  const nav = {
    go: (id, replace = false) =>
      setStack((s) => (replace ? [...s.slice(0, -1), id] : [...s, id])),
    back: () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)),
    reset: () => setStack(["inicial"]),
  };

  return (
    <div className="atp-stage">
      <PhoneFrame>
        <div key={current} className="atp-anim">{(Screens[current] || Screens.inicial)(nav)}</div>
      </PhoneFrame>
      <div className="atp-caption">
        <span>Protótipo navegável — app completo (auth, Kids, Responsável, Terapeuta)</span>
        <button onClick={nav.reset}>↺ reiniciar</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
