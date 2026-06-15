// Atípicos — primitivos de UI compartilhados (fiel ao protótipo Figma)
// Exportados em window para os outros scripts Babel.
const { useState, useRef, useEffect } = React;

// ─── Ícones de linha simples (stroke = currentColor) ────────────────
const Svg = (p) => (
  <svg width={p.s || 19} height={p.s || 19} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"
    style={{ flex: "0 0 auto" }}>{p.children}</svg>
);
const Icon = {
  user: () => <Svg><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" /></Svg>,
  id: () => <Svg><rect x="3" y="5" width="18" height="14" rx="2.5" /><circle cx="8.5" cy="11" r="2" /><path d="M14 10h4M14 14h4M5 15c.6-1.4 2-2 3.5-2s2.9.6 3.5 2" /></Svg>,
  pin: () => <Svg><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></Svg>,
  mail: () => <Svg><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></Svg>,
  calendar: () => <Svg><rect x="3.5" y="4.5" width="17" height="16" rx="2.5" /><path d="M3.5 9h17M8 3v4M16 3v4" /></Svg>,
  lock: () => <Svg><rect x="5" y="11" width="14" height="9" rx="2.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></Svg>,
  help: () => <Svg><circle cx="12" cy="12" r="9" /><path d="M9.2 9.3a2.9 2.9 0 0 1 5.6.9c0 1.9-2.8 2.5-2.8 4" /><path d="M12 17.5h.01" /></Svg>,
  chat: () => <Svg><path d="M21 11.5a8 8 0 0 1-11.3 7.3L4 20.5l1.7-5.7A8 8 0 1 1 21 11.5Z" /></Svg>,
  clipboard: () => <Svg><rect x="6" y="4" width="12" height="17" rx="2.5" /><path d="M9 4h6v3H9zM9 12h6M9 16h4" /></Svg>,
  chevron: () => <Svg s={17}><path d="m6 9 6 6 6-6" /></Svg>,
};

// ─── Logo ────────────────────────────────────────────────────────────
function Logo({ w = 230 }) {
  return <img src="assets/logo-atipicos.png" alt="Atípicos"
    style={{ width: w, height: "auto", display: "block", margin: "0 auto", userSelect: "none" }} draggable="false" />;
}

// ─── Botão circular Voltar ───────────────────────────────────────────
function BackButton({ onClick }) {
  return (
    <button onClick={onClick} aria-label="Voltar" className="atp-back">
      <svg width="42" height="42" viewBox="0 0 49.167 49.167" fill="none">
        <path d="M 24.583 49.167 C 11.006 49.167 0 38.161 0 24.583 C 0 11.006 11.006 0 24.583 0 C 38.161 0 49.167 11.006 49.167 24.583 C 49.167 38.161 38.161 49.167 24.583 49.167 Z M 17.87 22.617 L 29.5 22.617 C 30.674 22.617 31.799 23.083 32.629 23.913 C 33.459 24.743 33.925 25.868 33.925 27.042 C 33.925 28.215 33.459 29.341 32.629 30.171 C 31.799 31 30.674 31.467 29.5 31.467 L 24.583 31.467 L 24.583 34.417 L 29.5 34.417 C 31.456 34.417 33.332 33.64 34.715 32.257 C 36.098 30.874 36.875 28.998 36.875 27.042 C 36.875 25.086 36.098 23.21 34.715 21.827 C 33.332 20.444 31.456 19.667 29.5 19.667 L 18.007 19.667 L 21.331 16.345 L 19.244 14.258 L 13.162 20.343 C 12.931 20.573 12.802 20.886 12.802 21.212 C 12.802 21.538 12.931 21.85 13.162 22.081 L 19.244 28.165 L 21.331 26.078 L 17.87 22.617 Z" fill="currentColor" fillRule="evenodd" />
      </svg>
    </button>
  );
}

// ─── Botão principal (contorno escuro) ───────────────────────────────
function PrimaryButton({ children, onClick, variant = "outline", size = "md", style }) {
  const cls = "atp-btn " + (variant === "success" ? "atp-btn-success " : "") +
    (size === "lg" ? "atp-btn-lg " : size === "sm" ? "atp-btn-sm " : "");
  return <button className={cls} onClick={onClick} style={style}>{children}</button>;
}

// ─── Campo de formulário (input com ícone) ───────────────────────────
function Field({ icon, placeholder, type = "text", value, onChange }) {
  const I = Icon[icon] || Icon.user;
  return (
    <label className="atp-field">
      <span className="atp-field-ic"><I /></span>
      <input className="atp-field-in" type={type} placeholder={placeholder}
        value={value} onChange={(e) => onChange && onChange(e.target.value)} />
    </label>
  );
}

// ─── Select estilizado (dropdown) ────────────────────────────────────
function Select({ icon, placeholder, options = [], value, onChange }) {
  const I = Icon[icon] || Icon.help;
  return (
    <label className="atp-field">
      <span className="atp-field-ic"><I /></span>
      <select className="atp-field-in atp-select" value={value || ""}
        onChange={(e) => onChange && onChange(e.target.value)}
        style={{ color: value ? "#1d1c1b" : "#8a857f" }}>
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <span className="atp-field-chev"><Icon.chevron /></span>
    </label>
  );
}

// ─── Moldura do telefone com auto-scale ──────────────────────────────
function PhoneFrame({ children }) {
  const wrapRef = useRef(null);
  useEffect(() => {
    const fit = () => {
      const W = 430, H = 932, bezel = 13;
      const availH = window.innerHeight - 96;
      const availW = window.innerWidth - 48;
      const s = Math.min(1.06, availH / (H + bezel * 2), availW / (W + bezel * 2));
      if (wrapRef.current) wrapRef.current.style.transform = `scale(${s})`;
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return (
    <div className="atp-phone-wrap" ref={wrapRef}>
      <div className="atp-phone">
        <div className="atp-notch" />
        <div className="atp-screen">{children}</div>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Logo, BackButton, PrimaryButton, Field, Select, PhoneFrame });
