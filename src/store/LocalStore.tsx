// ──────────────────────────────────────────────────────────────────
// Store LOCAL (offline) — fonte de verdade no AsyncStorage.
// Usado quando o Firebase não está configurado. Mantém o app 100%
// funcional sem rede (ideal para apresentar). Mesmo contrato (AppCtx)
// do store Firebase, então as telas não mudam.
// ──────────────────────────────────────────────────────────────────
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppCtx, Crianca, Localizacao, Stats, Tarefa, Usuario, LOC_PADRAO } from "./types";

type State = {
  usuarios: Usuario[];
  criancas: Crianca[];
  tarefas: Tarefa[];
  localizacoes: Record<string, Localizacao>;
  sessaoUid: string | null;
};

const CHAVE = "atipicos_store_v1";
const uid = () => "id" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const SEED: State = {
  usuarios: [
    { uid: "seed-t1", nome: "Dra. Helena Martins", email: "helena@atipicos.app", senha: "123456", perfil: "terapeuta" },
    { uid: "seed-t2", nome: "Dr. Rafael Souza", email: "rafael@atipicos.app", senha: "123456", perfil: "terapeuta" },
  ],
  criancas: [],
  tarefas: [],
  localizacoes: {},
  sessaoUid: null,
};

export function useLocalStore(): AppCtx {
  const [state, setState] = useState<State>(SEED);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(CHAVE);
        if (raw) {
          const salvo = JSON.parse(raw) as State;
          const temSeed = salvo.usuarios.some((u) => u.uid === "seed-t1");
          setState({
            ...salvo,
            usuarios: temSeed ? salvo.usuarios : [...SEED.usuarios, ...salvo.usuarios],
            localizacoes: salvo.localizacoes ?? {},
            sessaoUid: null,
          });
        }
      } catch (e) {
        // primeira execução / dados corrompidos — usa SEED
      } finally {
        setPronto(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (pronto) AsyncStorage.setItem(CHAVE, JSON.stringify(state)).catch(() => {});
  }, [state, pronto]);

  const usuarioAtual = state.usuarios.find((u) => u.uid === state.sessaoUid) ?? null;

  const registrar: AppCtx["registrar"] = async (perfil, d) => {
    const email = d.email.trim().toLowerCase();
    if (state.usuarios.some((u) => u.email === email)) throw { code: "auth/email-already-in-use" };
    const novo: Usuario = { uid: uid(), nome: d.nome.trim(), email, senha: d.senha, perfil, cpf: d.cpf };
    setState((s) => ({ ...s, usuarios: [...s.usuarios, novo], sessaoUid: novo.uid }));
    return novo;
  };

  const entrar: AppCtx["entrar"] = async (email, senha, perfilEsperado) => {
    const e = email.trim().toLowerCase();
    const u = state.usuarios.find((x) => x.email === e);
    if (!u) throw { code: "auth/user-not-found" };
    if (u.senha !== senha) throw { code: "auth/wrong-password" };
    if (u.perfil !== perfilEsperado) throw { code: "atipicos/perfil-incorreto", perfil: u.perfil };
    setState((s) => ({ ...s, sessaoUid: u.uid }));
    return u;
  };

  const sair = () => setState((s) => ({ ...s, sessaoUid: null }));

  const trocarSenha: AppCtx["trocarSenha"] = async (senhaAtual, novaSenha) => {
    const u = state.usuarios.find((x) => x.uid === state.sessaoUid);
    if (!u) throw { code: "auth/user-not-found" };
    if (u.senha !== senhaAtual) throw { code: "auth/wrong-password" };
    setState((s) => ({
      ...s,
      usuarios: s.usuarios.map((x) => (x.uid === u.uid ? { ...x, senha: novaSenha } : x)),
    }));
  };

  const terapeutas = () => state.usuarios.filter((u) => u.perfil === "terapeuta");

  const adicionarCrianca: AppCtx["adicionarCrianca"] = async (d) => {
    const responsavelUid = state.sessaoUid;
    if (!responsavelUid) throw new Error("Faça login como responsável.");
    const email = d.email.trim().toLowerCase();
    if (email && state.usuarios.some((u) => u.email === email)) throw { code: "auth/email-already-in-use" };
    const contaUid = email ? uid() : undefined;
    const crianca: Crianca = {
      id: uid(),
      nome: d.nome.trim(),
      diagnostico: d.diagnostico,
      cpf: d.cpf,
      dataNascimento: d.dataNascimento,
      responsavelUid,
      terapeutaId: d.terapeutaId,
      contaUid,
      falaHist: [30],
      cognitivaHist: [30],
    };
    const contaCrianca: Usuario | null = contaUid
      ? { uid: contaUid, nome: d.nome.trim(), email, senha: d.senha, perfil: "atipico", criancaId: crianca.id }
      : null;
    setState((s) => ({
      ...s,
      criancas: [...s.criancas, crianca],
      usuarios: contaCrianca ? [...s.usuarios, contaCrianca] : s.usuarios,
      localizacoes: { ...s.localizacoes, [crianca.id]: { ...LOC_PADRAO, ts: Date.now(), origem: "inicial" } },
    }));
    return crianca;
  };

  const criancasDoResponsavel = () => state.criancas.filter((c) => c.responsavelUid === state.sessaoUid);
  const criancasDoTerapeuta = () => state.criancas.filter((c) => c.terapeutaId === state.sessaoUid);
  const criancaPorId = (id: string) => state.criancas.find((c) => c.id === id);

  const tarefasDaCrianca = (criancaId: string) => state.tarefas.filter((t) => t.criancaId === criancaId);

  const adicionarTarefa: AppCtx["adicionarTarefa"] = (criancaId, d) =>
    setState((s) => ({ ...s, tarefas: [...s.tarefas, { id: uid(), criancaId, ...d, done: false }] }));

  const alternarTarefa = (id: string) =>
    setState((s) => ({ ...s, tarefas: s.tarefas.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) }));

  const removerTarefa = (id: string) =>
    setState((s) => ({ ...s, tarefas: s.tarefas.filter((t) => t.id !== id) }));

  const avaliarCrianca: AppCtx["avaliarCrianca"] = (criancaId, fala, cognitiva) =>
    setState((s) => ({
      ...s,
      criancas: s.criancas.map((c) =>
        c.id === criancaId
          ? { ...c, falaHist: [...c.falaHist, fala].slice(-6), cognitivaHist: [...c.cognitivaHist, cognitiva].slice(-6) }
          : c
      ),
    }));

  const statsDaCrianca = (criancaId: string): Stats => {
    const c = state.criancas.find((x) => x.id === criancaId);
    const ts = state.tarefas.filter((t) => t.criancaId === criancaId);
    const feitas = ts.filter((t) => t.done).length;
    const falaHist = c?.falaHist ?? [0];
    const cognitivaHist = c?.cognitivaHist ?? [0];
    return {
      fala: falaHist[falaHist.length - 1] ?? 0,
      cognitiva: cognitivaHist[cognitivaHist.length - 1] ?? 0,
      falaHist, cognitivaHist,
      totalTarefas: ts.length,
      tarefasFeitas: feitas,
      tarefasPct: ts.length ? Math.round((feitas / ts.length) * 100) : 0,
    };
  };

  const registrarLocalizacao: AppCtx["registrarLocalizacao"] = (criancaId, lat, lng, origem = "gps") =>
    setState((s) => ({ ...s, localizacoes: { ...s.localizacoes, [criancaId]: { lat, lng, ts: Date.now(), origem } } }));

  const localizacaoDaCrianca = (criancaId: string) => state.localizacoes[criancaId];

  return {
    pronto, modo: "local", usuarioAtual,
    registrar, entrar, sair,
    trocarSenha,
    terapeutas,
    adicionarCrianca, criancasDoResponsavel, criancasDoTerapeuta, criancaPorId,
    tarefasDaCrianca, adicionarTarefa, alternarTarefa, removerTarefa,
    avaliarCrianca, statsDaCrianca,
    registrarLocalizacao, localizacaoDaCrianca,
  };
}
