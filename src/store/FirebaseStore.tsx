// ──────────────────────────────────────────────────────────────────
// Store FIREBASE — fonte de verdade no Firestore + Auth, com
// sincronização em tempo real (onSnapshot) entre aparelhos.
// Mesmo contrato (AppCtx) do store local, então as telas não mudam.
//
// Modelo (coleções):
//   usuarios/{uid}        { nome, email, perfil, cpf?, criancaId? }
//   criancas/{id}         { ...dados, responsavelUid, terapeutaId, contaUid,
//                           falaHist[], cognitivaHist[] }
//   tarefas/{id}          { criancaId, responsavelUid, terapeutaId, contaUid,
//                           emoji, nome, hora, done }
//   localizacoes/{criancaId} { criancaId, responsavelUid, terapeutaId,
//                              contaUid, lat, lng, ts, origem }
//
// Os IDs de responsável/terapeuta/conta são denormalizados nas tarefas e
// localizações para simplificar consultas e regras de segurança.
// ──────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import { initializeApp, deleteApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
  getAuth,
  signOut as fbSignOut,
} from "firebase/auth";
import {
  collection, query, where, onSnapshot, doc, setDoc, updateDoc, deleteDoc,
  getDoc, getDocs, serverTimestamp, Unsubscribe,
} from "firebase/firestore";
import { auth, db, firebaseConfig } from "@/services/firebase";
import { AppCtx, Crianca, Localizacao, Stats, Tarefa, Usuario, LOC_PADRAO, Alerta, AlertaView } from "./types";

const novoId = () => "id" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

// Remove chaves com valor undefined (o Firestore não aceita undefined).
const limpo = <T extends Record<string, any>>(o: T): T =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as T;

// Cria a conta de login da criança numa instância SECUNDÁRIA do Firebase,
// para não deslogar o responsável da sessão principal.
async function criarContaSecundaria(email: string, senha: string): Promise<string> {
  const secApp = initializeApp(firebaseConfig, "secundario-" + Date.now());
  try {
    const secAuth = getAuth(secApp);
    const cred = await createUserWithEmailAndPassword(secAuth, email, senha);
    const uid = cred.user.uid;
    await fbSignOut(secAuth);
    return uid;
  } finally {
    await deleteApp(secApp);
  }
}

const mapCrianca = (id: string, d: any): Crianca => ({
  id,
  nome: d.nome,
  diagnostico: d.diagnostico,
  cpf: d.cpf,
  dataNascimento: d.dataNascimento,
  responsavelUid: d.responsavelUid,
  terapeutaId: d.terapeutaId ?? null,
  contaUid: d.contaUid,
  falaHist: d.falaHist ?? [30],
  cognitivaHist: d.cognitivaHist ?? [30],
});

export function useFirebaseStore(): AppCtx {
  const [pronto, setPronto] = useState(false);
  const [usuarioAtual, setUsuarioAtual] = useState<Usuario | null>(null);
  const [criancas, setCriancas] = useState<Crianca[]>([]);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [locs, setLocs] = useState<Record<string, Localizacao>>({});
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [listaTerapeutas, setListaTerapeutas] = useState<Usuario[]>([]);
  const unsubs = useRef<Unsubscribe[]>([]);

  // Sessão sempre começa limpa (cada abertura = login explícito por perfil).
  useEffect(() => {
    (async () => {
      try { await fbSignOut(auth!); } catch (e) {}
      setPronto(true);
    })();
    return () => limparListeners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Carrega a lista de terapeutas (precisa de usuário autenticado pelas regras).
  const carregarTerapeutas = async () => {
    try {
      const snap = await getDocs(query(collection(db!, "usuarios"), where("perfil", "==", "terapeuta")));
      setListaTerapeutas(snap.docs.map((d) => ({ uid: d.id, ...(d.data() as any) })));
    } catch (e) {}
  };

  const limparListeners = () => { unsubs.current.forEach((u) => u()); unsubs.current = []; };

  // Assina os dados conforme o perfil logado.
  const assinar = (u: Usuario) => {
    limparListeners();
    setCriancas([]); setTarefas([]); setLocs({});

    const onCriancas = (campo: string) =>
      onSnapshot(query(collection(db!, "criancas"), where(campo, "==", u.uid)), (snap) =>
        setCriancas(snap.docs.map((d) => mapCrianca(d.id, d.data()))));
    const onTarefas = (campo: string) =>
      onSnapshot(query(collection(db!, "tarefas"), where(campo, "==", u.uid)), (snap) =>
        setTarefas(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))));
    const onLocs = (campo: string) =>
      onSnapshot(query(collection(db!, "localizacoes"), where(campo, "==", u.uid)), (snap) => {
        const m: Record<string, Localizacao> = {};
        snap.docs.forEach((d) => { const x = d.data() as any; m[x.criancaId] = { lat: x.lat, lng: x.lng, ts: x.ts, origem: x.origem }; });
        setLocs(m);
      });
    const onAlertas = (campo: string) =>
      onSnapshot(query(collection(db!, "alertas"), where(campo, "==", u.uid)), (snap) =>
        setAlertas(snap.docs.map((d) => { const x = d.data() as any; return { id: d.id, criancaId: x.criancaId, lat: x.lat, lng: x.lng, ts: x.ts }; })));

    if (u.perfil === "responsavel") {
      unsubs.current.push(onCriancas("responsavelUid"), onTarefas("responsavelUid"), onLocs("responsavelUid"), onAlertas("responsavelUid"));
    } else if (u.perfil === "terapeuta") {
      unsubs.current.push(onCriancas("terapeutaId"), onTarefas("terapeutaId"));
    } else {
      unsubs.current.push(onCriancas("contaUid"), onTarefas("contaUid"));
    }
  };

  // ── Auth ──
  const registrar: AppCtx["registrar"] = async (perfil, d) => {
    const email = d.email.trim().toLowerCase();
    const cred = await createUserWithEmailAndPassword(auth!, email, d.senha);
    try {
      const u: Usuario = { uid: cred.user.uid, nome: d.nome.trim(), email, perfil, cpf: d.cpf };
      await setDoc(doc(db!, "usuarios", u.uid), limpo({ ...u, criadoEm: serverTimestamp() }));
      return u;
    } finally {
      await fbSignOut(auth!); // login explícito em seguida (e não deixa sessão presa em caso de erro)
    }
  };

  const entrar: AppCtx["entrar"] = async (email, senha, perfilEsperado) => {
    const cred = await signInWithEmailAndPassword(auth!, email.trim().toLowerCase(), senha);
    let perfilDoc;
    try {
      perfilDoc = await getDoc(doc(db!, "usuarios", cred.user.uid));
    } catch (e) {
      await fbSignOut(auth!);
      throw e; // revela permission-denied etc.
    }
    if (!perfilDoc.exists()) { await fbSignOut(auth!); throw { code: "auth/user-not-found" }; }
    const u = { uid: cred.user.uid, ...(perfilDoc.data() as any) } as Usuario;
    if (u.perfil !== perfilEsperado) { await fbSignOut(auth!); throw { code: "atipicos/perfil-incorreto", perfil: u.perfil }; }
    setUsuarioAtual(u);
    assinar(u);
    if (u.perfil === "responsavel") carregarTerapeutas(); // para o seletor no cadastro
    return u;
  };

  const sair = () => {
    limparListeners();
    setUsuarioAtual(null); setCriancas([]); setTarefas([]); setLocs({}); setAlertas([]);
    fbSignOut(auth!).catch(() => {});
  };

  const trocarSenha: AppCtx["trocarSenha"] = async (senhaAtual, novaSenha) => {
    const user = auth!.currentUser;
    if (!user || !user.email) throw { code: "auth/user-not-found" };
    // O Firebase exige reautenticação recente para trocar a senha.
    const cred = EmailAuthProvider.credential(user.email, senhaAtual);
    await reauthenticateWithCredential(user, cred);
    await updatePassword(user, novaSenha);
  };

  const terapeutas = () => listaTerapeutas;

  // ── Crianças ──
  const adicionarCrianca: AppCtx["adicionarCrianca"] = async (d) => {
    if (!usuarioAtual) throw new Error("Faça login como responsável.");
    const email = d.email.trim().toLowerCase();
    const contaUid = await criarContaSecundaria(email, d.senha); // não desloga o responsável
    const id = novoId();
    const crianca: Crianca = {
      id, nome: d.nome.trim(), diagnostico: d.diagnostico, cpf: d.cpf, dataNascimento: d.dataNascimento,
      responsavelUid: usuarioAtual.uid, terapeutaId: d.terapeutaId, contaUid,
      falaHist: [30], cognitivaHist: [30],
    };
    await setDoc(doc(db!, "usuarios", contaUid), {
      uid: contaUid, nome: crianca.nome, email, perfil: "atipico", criancaId: id, criadoEm: serverTimestamp(),
    });
    await setDoc(doc(db!, "criancas", id), limpo({ ...crianca, criadoEm: serverTimestamp() }));
    await setDoc(doc(db!, "localizacoes", id), {
      criancaId: id, responsavelUid: usuarioAtual.uid, terapeutaId: d.terapeutaId, contaUid,
      ...LOC_PADRAO, ts: Date.now(), origem: "inicial",
    });
    return crianca;
  };

  const criancasDoResponsavel = () => criancas;  // já filtradas pelo listener
  const criancasDoTerapeuta = () => criancas;
  const criancaPorId = (id: string) => criancas.find((c) => c.id === id);

  // ── Tarefas ──
  const tarefasDaCrianca = (criancaId: string) => tarefas.filter((t) => t.criancaId === criancaId);

  const adicionarTarefa: AppCtx["adicionarTarefa"] = (criancaId, d) => {
    const c = criancas.find((x) => x.id === criancaId);
    if (!c) return;
    const id = novoId();
    setDoc(doc(db!, "tarefas", id), {
      criancaId, responsavelUid: c.responsavelUid, terapeutaId: c.terapeutaId ?? null, contaUid: c.contaUid ?? null,
      emoji: d.emoji, nome: d.nome, hora: d.hora, done: false,
    }).catch(() => {});
  };

  const alternarTarefa = (id: string) => {
    const t = tarefas.find((x) => x.id === id);
    if (!t) return;
    updateDoc(doc(db!, "tarefas", id), { done: !t.done }).catch(() => {});
  };

  const removerTarefa = (id: string) => { deleteDoc(doc(db!, "tarefas", id)).catch(() => {}); };

  // ── Progresso ──
  const avaliarCrianca: AppCtx["avaliarCrianca"] = (criancaId, fala, cognitiva) => {
    const c = criancas.find((x) => x.id === criancaId);
    if (!c) return;
    updateDoc(doc(db!, "criancas", criancaId), {
      falaHist: [...c.falaHist, fala].slice(-6),
      cognitivaHist: [...c.cognitivaHist, cognitiva].slice(-6),
    }).catch(() => {});
  };

  const statsDaCrianca = (criancaId: string): Stats => {
    const c = criancas.find((x) => x.id === criancaId);
    const ts = tarefas.filter((t) => t.criancaId === criancaId);
    const feitas = ts.filter((t) => t.done).length;
    const falaHist = c?.falaHist ?? [0];
    const cognitivaHist = c?.cognitivaHist ?? [0];
    return {
      fala: falaHist[falaHist.length - 1] ?? 0,
      cognitiva: cognitivaHist[cognitivaHist.length - 1] ?? 0,
      falaHist, cognitivaHist,
      totalTarefas: ts.length, tarefasFeitas: feitas,
      tarefasPct: ts.length ? Math.round((feitas / ts.length) * 100) : 0,
    };
  };

  // ── Localização ──
  const registrarLocalizacao: AppCtx["registrarLocalizacao"] = (criancaId, lat, lng, origem = "gps") => {
    const c = criancas.find((x) => x.id === criancaId);
    setDoc(doc(db!, "localizacoes", criancaId), {
      criancaId,
      responsavelUid: c?.responsavelUid ?? null,
      terapeutaId: c?.terapeutaId ?? null,
      contaUid: c?.contaUid ?? null,
      lat, lng, ts: Date.now(), origem,
    }, { merge: true }).catch(() => {});
  };

  const localizacaoDaCrianca = (criancaId: string) => locs[criancaId];

  // ── Alertas de emergência (histórico de SOS) ──
  const registrarAlertaSOS: AppCtx["registrarAlertaSOS"] = (criancaId, lat, lng) => {
    const c = criancas.find((x) => x.id === criancaId);
    const ult = locs[criancaId];
    const id = novoId();
    setDoc(doc(db!, "alertas", id), limpo({
      criancaId,
      responsavelUid: c?.responsavelUid ?? null,
      terapeutaId: c?.terapeutaId ?? null,
      lat: lat ?? ult?.lat ?? LOC_PADRAO.lat,
      lng: lng ?? ult?.lng ?? LOC_PADRAO.lng,
      ts: Date.now(),
    })).catch(() => {});
  };

  const alertasDoResponsavel = (): AlertaView[] => {
    const nomePorId = new Map(criancas.map((c) => [c.id, c.nome]));
    return [...alertas]
      .sort((a, b) => b.ts - a.ts)
      .map((a) => ({ id: a.id, criancaNome: nomePorId.get(a.criancaId) ?? "Criança", lat: a.lat, lng: a.lng, ts: a.ts }));
  };

  return {
    pronto, modo: "firebase", usuarioAtual,
    registrar, entrar, sair,
    trocarSenha,
    terapeutas,
    adicionarCrianca, criancasDoResponsavel, criancasDoTerapeuta, criancaPorId,
    tarefasDaCrianca, adicionarTarefa, alternarTarefa, removerTarefa,
    avaliarCrianca, statsDaCrianca,
    registrarLocalizacao, localizacaoDaCrianca,
    registrarAlertaSOS, alertasDoResponsavel,
  };
}
