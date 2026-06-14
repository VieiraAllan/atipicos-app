// ──────────────────────────────────────────────────────────────────
// Upload de arquivos (RF18) — fotos da criança no Firebase Storage.
// ──────────────────────────────────────────────────────────────────
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage, firebaseHabilitado } from "./firebase";

// Recebe um URI local (ex.: vindo do expo-image-picker) e envia ao Storage.
// Retorna a URL pública para salvar no documento da criança.
export async function uploadFotoCrianca(criancaId: string, uriLocal: string): Promise<string> {
  if (!firebaseHabilitado) return uriLocal; // modo demonstração: usa o próprio URI local
  const resposta = await fetch(uriLocal);
  const blob = await resposta.blob();
  const caminho = ref(storage!, `criancas/${criancaId}/foto.jpg`);
  await uploadBytes(caminho, blob);
  return getDownloadURL(caminho);
}

export async function removerFotoCrianca(criancaId: string): Promise<void> {
  if (!firebaseHabilitado) return;
  await deleteObject(ref(storage!, `criancas/${criancaId}/foto.jpg`));
}
