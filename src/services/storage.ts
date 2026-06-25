// ──────────────────────────────────────────────────────────────────
// Foto da criança (RF18) — SEM CUSTO por padrão.
//
// O Firebase Storage passou a exigir plano Blaze (pago). Para manter o
// projeto 100% gratuito, a foto é comprimida e devolvida como data URL
// (base64), que é salva no documento da criança no Firestore (plano
// Spark, gratuito). Funciona como qualquer imagem: <Image source={{ uri }} />.
//
// Se algum dia você optar pelo Storage real (plano Blaze), basta definir
// EXPO_PUBLIC_FIREBASE_USE_STORAGE=true no .env — o upload real é usado
// automaticamente, sem mexer nas telas.
// ──────────────────────────────────────────────────────────────────
import * as ImageManipulator from "expo-image-manipulator";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage, storageHabilitado } from "./firebase";

// Recebe um URI local (ex.: do expo-image-picker) e retorna uma URL utilizável
// como foto: data URL base64 (gratuito) ou URL do Storage (se habilitado).
export async function uploadFotoCrianca(criancaId: string, uriLocal: string): Promise<string> {
  if (storageHabilitado && storage) {
    // Caminho pago (plano Blaze) — só roda se você ligar explicitamente.
    const resposta = await fetch(uriLocal);
    const blob = await resposta.blob();
    const caminho = ref(storage, `criancas/${criancaId}/foto.jpg`);
    await uploadBytes(caminho, blob);
    return getDownloadURL(caminho);
  }

  // Caminho GRATUITO: comprime (largura 400px, qualidade 60%) e gera base64.
  const img = await ImageManipulator.manipulateAsync(
    uriLocal,
    [{ resize: { width: 400 } }],
    { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG, base64: true }
  );
  return `data:image/jpeg;base64,${img.base64}`;
}

// Remoção: no modo gratuito a foto vive dentro do documento da criança
// (basta limpar o campo fotoUrl via editarCrianca); só há objeto a apagar
// quando o Storage real está habilitado.
export async function removerFotoCrianca(criancaId: string): Promise<void> {
  if (storageHabilitado && storage) {
    await deleteObject(ref(storage, `criancas/${criancaId}/foto.jpg`));
  }
}
