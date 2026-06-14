// ──────────────────────────────────────────────────────────────────
// Autenticação (Fase 3) — Firebase Auth + perfis no Firestore.
// As assinaturas são as mesmas do stub da Fase 2: as telas não mudam.
// Em MODO DEMONSTRAÇÃO (sem .env) as funções simulam sucesso para
// permitir validar as telas no Expo Go.
// ──────────────────────────────────────────────────────────────────
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, firebaseHabilitado } from "./firebase";

export type DadosCadastroAdulto = {
  nome: string;
  cpf: string;
  cep: string;
  email: string;
  dataNascimento: string;
  perguntaSeguranca: string;
  respostaSeguranca: string;
  senha: string;
  confirmarSenha: string;
};

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// RF02 — Login
export async function login(email: string, senha: string): Promise<void> {
  if (!firebaseHabilitado) {
    await delay(400); // modo demonstração: entra direto
    return;
  }
  await signInWithEmailAndPassword(auth!, email.trim().toLowerCase(), senha);
}

// RF01 — Cadastro de responsável / terapeuta
export async function cadastrarAdulto(
  perfil: "responsavel" | "terapeuta",
  dados: DadosCadastroAdulto
): Promise<void> {
  if (!firebaseHabilitado) {
    await delay(400);
    return;
  }
  const email = dados.email.trim().toLowerCase();
  const cred = await createUserWithEmailAndPassword(auth!, email, dados.senha);
  await setDoc(doc(db!, "usuarios", cred.user.uid), {
    uid: cred.user.uid,
    perfil,
    nome: dados.nome,
    cpf: dados.cpf,
    cep: dados.cep,
    email,
    dataNascimento: dados.dataNascimento,
    perguntaSeguranca: dados.perguntaSeguranca,
    // ⚠️ MVP: armazenado em texto. Em produção, faça hash (ex.: bcrypt via
    // Cloud Function) e nunca exponha via regras de leitura pública.
    respostaSeguranca: dados.respostaSeguranca,
    criadoEm: serverTimestamp(),
  });
}

// RF03 — Recuperação de senha
// Abordagem padrão e segura do Firebase: envia link de redefinição por email.
// (O fluxo "pergunta de segurança + nova senha" exige Cloud Function com
//  Admin SDK — veja FIREBASE.md. A assinatura aceita os 3 campos para manter
//  a tela inalterada; aqui usamos apenas o email.)
export async function recuperarSenha(
  email: string,
  _respostaSeguranca?: string,
  _novaSenha?: string
): Promise<void> {
  if (!firebaseHabilitado) {
    await delay(400);
    return;
  }
  await sendPasswordResetEmail(auth!, email.trim().toLowerCase());
}

export async function sair(): Promise<void> {
  if (!firebaseHabilitado) return;
  await signOut(auth!);
}

// Re-exporta o cadastro de criança e seu tipo para manter
// `import * as auth` e `import type { DadosCadastroCrianca }` nas telas.
export { cadastrarCrianca } from "./criancas";
export type { DadosCadastroCrianca } from "./criancas";
