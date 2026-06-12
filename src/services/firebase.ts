// ──────────────────────────────────────────────────────────────────
// Inicialização do Firebase (Web SDK) para React Native / Expo.
// As chaves vêm de variáveis de ambiente EXPO_PUBLIC_* (ver .env.example).
// ──────────────────────────────────────────────────────────────────
import { initializeApp, getApps, getApp } from "firebase/app";
// getReactNativePersistence existe em runtime, mas pode faltar nos tipos
// de algumas versões do SDK — por isso o ts-ignore na linha do import.
// @ts-ignore
import { initializeAuth, getReactNativePersistence, getAuth, Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Persistência da sessão no AsyncStorage (mantém o usuário logado).
let auth: Auth;
try {
  auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
} catch {
  // Já inicializado (ex.: fast refresh) — reaproveita a instância.
  auth = getAuth(app);
}

export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app);
