// ──────────────────────────────────────────────────────────────────
// Inicialização do Firebase (Web SDK) para React Native / Expo.
// As chaves vêm de variáveis de ambiente EXPO_PUBLIC_* (ver .env.example).
//
// MODO DEMONSTRAÇÃO: enquanto não houver chaves no .env, o app roda sem
// backend (login entra direto, dados são simulados) — útil para validar
// as telas no Expo Go. Quando você preenche o .env, o Firebase real liga
// automaticamente, sem mexer em mais nada.
// ──────────────────────────────────────────────────────────────────
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
// getReactNativePersistence existe em runtime, mas pode faltar nos tipos
// de algumas versões do SDK — por isso o ts-ignore na linha do import.
// @ts-ignore
import { initializeAuth, getReactNativePersistence, getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Exportado para criar a instância secundária (cadastro da criança sem
// deslogar o responsável).
export { firebaseConfig };

// true quando há configuração real do Firebase no .env.
export const firebaseHabilitado = !!firebaseConfig.apiKey;

// Storage é OPCIONAL e exige plano Blaze (pago). Por padrão fica DESLIGADO —
// as fotos são guardadas como base64 no Firestore (gratuito). Só ligue se você
// realmente optar pelo Storage: defina EXPO_PUBLIC_FIREBASE_USE_STORAGE=true.
export const storageHabilitado =
  firebaseHabilitado && process.env.EXPO_PUBLIC_FIREBASE_USE_STORAGE === "true";

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (firebaseHabilitado) {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  try {
    auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
  } catch {
    // Já inicializado (ex.: fast refresh) — reaproveita a instância.
    auth = getAuth(app);
  }
  db = getFirestore(app);
  if (storageHabilitado) storage = getStorage(app);
} else {
  // eslint-disable-next-line no-console
  console.warn(
    "[Atípicos] Firebase em MODO DEMONSTRAÇÃO (sem .env). " +
      "Login/cadastro não persistem. Configure o .env para ativar o backend (ver FIREBASE.md)."
  );
}

export { app, auth, db, storage };
