// ──────────────────────────────────────────────────────────────────
// Crianças (RF04/RF05/RF06) — CRUD no Firestore, vinculado ao
// responsável logado.
// ──────────────────────────────────────────────────────────────────
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db, firebaseHabilitado } from "./firebase";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type DadosCadastroCrianca = {
  nome: string;
  cpf: string;
  cep: string;
  email: string;
  dataNascimento: string;
  diagnostico: string;
  senha: string;
  confirmarSenha: string;
};

export type Crianca = {
  id: string;
  responsavelUid: string;
  nome: string;
  cpf: string;
  cep: string;
  dataNascimento: string;
  diagnostico: string;
  observacoes?: string;
  fotoUrl?: string | null;
};

function uidAtual(): string {
  const u = auth?.currentUser;
  if (!u) throw new Error("É necessário estar logado para gerenciar crianças.");
  return u.uid;
}

// RF04 / RF05 — cadastra uma criança vinculada ao responsável logado.
// Obs.: no MVP a criança é um documento de perfil (sem conta de login
// própria). Para habilitar o "Login Atípico" seria necessário criar uma
// conta Auth separada — veja FIREBASE.md.
export async function cadastrarCrianca(dados: DadosCadastroCrianca): Promise<string> {
  if (!firebaseHabilitado) {
    await delay(400); // modo demonstração
    return "demo-" + Date.now();
  }
  const responsavelUid = uidAtual();
  const ref = await addDoc(collection(db!, "criancas"), {
    responsavelUid,
    nome: dados.nome,
    cpf: dados.cpf,
    cep: dados.cep,
    dataNascimento: dados.dataNascimento,
    diagnostico: dados.diagnostico,
    observacoes: "",
    fotoUrl: null,
    criadoEm: serverTimestamp(),
  });
  return ref.id;
}

// Lista as crianças do responsável logado.
export async function listarCriancas(): Promise<Crianca[]> {
  if (!firebaseHabilitado) return [];
  const responsavelUid = uidAtual();
  const q = query(collection(db!, "criancas"), where("responsavelUid", "==", responsavelUid));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Crianca, "id">) }));
}

// RF06 — edita dados de uma criança.
export async function editarCrianca(id: string, dados: Partial<Crianca>): Promise<void> {
  if (!firebaseHabilitado) { await delay(300); return; }
  await updateDoc(doc(db!, "criancas", id), dados as Record<string, unknown>);
}

// RF06 — exclui uma criança.
export async function excluirCrianca(id: string): Promise<void> {
  if (!firebaseHabilitado) { await delay(300); return; }
  await deleteDoc(doc(db!, "criancas", id));
}
