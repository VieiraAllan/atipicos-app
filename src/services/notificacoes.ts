// ──────────────────────────────────────────────────────────────────
// Notificações locais (sem servidor, plano gratuito).
//
// Foco: alertar o responsável quando a criança aciona o SOS, enquanto o
// app está aberto (o tempo real do Firestore entrega o evento e nós
// disparamos uma notificação do sistema). Push com app fechado exigiria
// Cloud Functions (plano pago) — fora do escopo.
// ──────────────────────────────────────────────────────────────────
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

const CHAVE_TOGGLE = "atipicos_alerta_sos";

// Mostra a notificação mesmo com o app em primeiro plano.
// (SDK 53+ trocou shouldShowAlert por shouldShowBanner/shouldShowList —
//  mantemos os dois para compatibilidade entre versões.)
Notifications.setNotificationHandler({
  handleNotification: async () =>
    ({
      shouldShowBanner: true,  // SDK 53+
      shouldShowList: true,    // SDK 53+
      shouldPlaySound: true,
      shouldSetBadge: false,
    } as any),
});

export async function alertaSOSLigado(): Promise<boolean> {
  const v = await AsyncStorage.getItem(CHAVE_TOGGLE);
  return v === null ? true : v === "1"; // ligado por padrão
}

export async function definirAlertaSOS(ligado: boolean): Promise<void> {
  await AsyncStorage.setItem(CHAVE_TOGGLE, ligado ? "1" : "0");
}

// Pede permissão de notificação ao usuário. Retorna true se concedida.
export async function pedirPermissaoNotificacoes(): Promise<boolean> {
  const { status: atual } = await Notifications.getPermissionsAsync();
  let status = atual;
  if (atual !== "granted") {
    const r = await Notifications.requestPermissionsAsync();
    status = r.status;
  }
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("sos", {
      name: "Alertas de SOS",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#EB5757",
    });
  }
  return status === "granted";
}

// Dispara a notificação de SOS (se o usuário tiver o alerta ligado).
export async function dispararAlertaSOS(nomeCrianca: string): Promise<void> {
  if (!(await alertaSOSLigado())) return;
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🚨 Alerta de SOS",
      body: `${nomeCrianca} acionou o SOS. Toque para ver a localização.`,
      sound: true,
      ...(Platform.OS === "android" ? { channelId: "sos" } : {}),
    },
    trigger: null, // imediata
  });
}
