// ──────────────────────────────────────────────────────────────────
// Seletor do store: usa Firebase (sincroniza entre aparelhos em tempo
// real) quando o .env está configurado; senão, o store local (offline).
// As telas consomem sempre o mesmo contrato via useApp().
// ──────────────────────────────────────────────────────────────────
import React, { createContext, useContext } from "react";
import { AppCtx } from "./types";
import { firebaseHabilitado } from "@/services/firebase";
import { useLocalStore } from "./LocalStore";
import { useFirebaseStore } from "./FirebaseStore";

const AppContext = createContext<AppCtx | null>(null);

// firebaseHabilitado é constante (lido do .env na carga), então a escolha
// do hook é estável entre renders — sem violar as regras dos hooks.
function LocalProvider({ children }: { children: React.ReactNode }) {
  const store = useLocalStore();
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}
function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const store = useFirebaseStore();
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  return firebaseHabilitado ? (
    <FirebaseProvider>{children}</FirebaseProvider>
  ) : (
    <LocalProvider>{children}</LocalProvider>
  );
}

export function useApp(): AppCtx {
  const c = useContext(AppContext);
  if (!c) throw new Error("useApp deve ser usado dentro de <AppStoreProvider>.");
  return c;
}

// Re-exporta os tipos para compatibilidade com imports existentes.
export type { Perfil, Usuario, Crianca, Tarefa, Localizacao } from "./types";
