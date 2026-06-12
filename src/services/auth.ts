// ──────────────────────────────────────────────────────────────────
// Autenticação (Fase 3) — Firebase Auth + perfis no Firestore.
// As assinaturas são as mesmas do stub da Fase 2: as telas não mudam.
// ──────────────────────────────────────────────────────────────────
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";
import { Perfil } from "@/navigation/types";

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

// RF02 — Login
export async function login(email: string, senha: string): Promise<void> {
  await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), senha);
}

// RF01 — Cadastro de responsável / terapeuta
export async function cadastrarAdulto(
  perfil: "responsavel" | "terapeuta",
  dados: DadosCadastroAdulto
): Promise<void> {
  const email = dados.email.trim().toLowerCase();
  const cred = await createUserWithEmailAndPassword(auth, email, dados.senha);
  await setDoc(doc(db, "usuarios", cred.user.uid), {
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
  await sendPasswordResetEmail(auth, email.trim().toLowerCase());
}

export async function sair(): Promise<void> {
  await signOut(auth);
}

// Re-exporta o cadastro de criança e seu tipo para manter
// `import * as auth` e `import type { DadosCadastroCrianca }` nas telas.
export { cadastrarCrianca } from "./criancas";
export type { DadosCadastroCrianca } from "./criancas";
