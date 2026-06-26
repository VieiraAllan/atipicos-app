// ──────────────────────────────────────────────────────────────────
// Localização do dispositivo (RF14/RF15) via expo-location.
// Usado para a criança compartilhar onde está; o responsável visualiza
// no mapa (OpenStreetMap/Leaflet).
// ──────────────────────────────────────────────────────────────────
import * as Location from "expo-location";

export type Coordenada = { lat: number; lng: number };

// Pede permissão e retorna a posição atual. Lança erro se negada.
export async function obterLocalizacaoAtual(): Promise<Coordenada> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permissão de localização negada.");
  }
  const pos = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
  return { lat: pos.coords.latitude, lng: pos.coords.longitude };
}

// Tradução amigável de coordenadas em endereço (reverse geocoding).
// Retorna string curta ou null se indisponível.
export async function descreverLocal(coord: Coordenada): Promise<string | null> {
  try {
    const [r] = await Location.reverseGeocodeAsync({ latitude: coord.lat, longitude: coord.lng });
    if (!r) return null;
    const rua = [r.street, r.name].filter(Boolean)[0];
    const cidade = [r.city, r.subregion, r.region].filter(Boolean)[0];
    return [rua, cidade].filter(Boolean).join(" — ") || null;
  } catch {
    return null;
  }
}
