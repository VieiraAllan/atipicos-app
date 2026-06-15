// Atípicos — componentes compartilhados das telas internas (Fase 4)
const { useState: useStateI } = React;

const NOME_DEMO = "Lucas";

// Ícone de logout (porta + seta), desenhado em traço simples.
function LogoutGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
      <path d="M10 12H3M6 8l-4 4 4 4" />
    </svg>
  );
}

// Barra superior: logout + saudação (+ sino opcional)
function TopBar({ nav, nome = NOME_DEMO, bell = false, onBell }) {
  return (
    <div className="itp-topbar">
      <button className="itp-logout" onClick={() => nav.go("inicial")} aria-label="Sair">
        <LogoutGlyph />
      </button>
      <div className="itp-pill">{`Olá, ${nome}`}</div>
      {bell && <button className="itp-bell" onClick={onBell} aria-label="Notificações">🔔</button>}
    </div>
  );
}

// Navegação inferior. items: [{icon, on, onPress}], sos: boolean
function BottomNav({ items = [], sos = false, onSOS }) {
  return (
    <div className="itp-bottomnav">
      {items.map((it, i) => (
        <button key={i} className="itp-navbtn" data-on={!!it.on} onClick={it.onPress}>{it.icon}</button>
      ))}
      {sos && <button className="itp-sos" onClick={onSOS}>SOS</button>}
    </div>
  );
}

// Card branco com título opcional
function Card({ title, children, onPress }) {
  return (
    <div className="itp-card" onClick={onPress} style={onPress ? { cursor: "pointer" } : null}>
      {title && <div className="itp-card-title">{title}</div>}
      <div className="itp-card-body">{children}</div>
    </div>
  );
}

// Linha com emoji + label (ações da área de pais)
function Row({ emoji, label, onPress }) {
  return (
    <div className="itp-row" onClick={onPress}>
      <span className="emoji">{emoji}</span>
      <span className="lbl">{label}</span>
    </div>
  );
}

// Mapa placeholder (real virá da OpenStreetMap na implementação)
function MapBox({ height = 158 }) {
  return (
    <div className="itp-map" style={{ height }}>
      <span className="pin">📍</span>
      <span className="osm">© OpenStreetMap</span>
    </div>
  );
}

// Mini gráfico de barras (evolução)
function Bars({ valores = [60, 35, 95, 50], cor = "#5a8def" }) {
  const cores = ["#5a8def", "#f2c94c", "#eb5757", "#27ae60"];
  return (
    <div className="itp-bars">
      {valores.map((v, i) => (
        <span key={i} style={{ height: `${v}%`, background: cores[i % cores.length] }} />
      ))}
    </div>
  );
}

// Voz real (Web Speech API) — demonstra RF13 (texto → áudio)
function falar(texto) {
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "pt-BR";
    u.rate = 0.95;
    synth.speak(u);
  } catch (e) {}
}

Object.assign(window, { TopBar, BottomNav, Card, Row, MapBox, Bars, falar, NOME_DEMO });
