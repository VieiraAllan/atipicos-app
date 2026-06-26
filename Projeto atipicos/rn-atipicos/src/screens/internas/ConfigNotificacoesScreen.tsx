import React, { useEffect, useState } from "react";
import { View, Text, Switch, Pressable, Alert, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import { SafeAreaView } from "react-native-safe-area-context";
import BackChip from "@/components/internas/BackChip";
import { alertaSOSLigado, definirAlertaSOS, pedirPermissaoNotificacoes } from "@/services/notificacoes";

type Props = NativeStackScreenProps<RootStackParamList, "ConfigNotificacoes">;

// Configuração de notificações. Hoje cobre o alerta de SOS (notificação
// local quando a criança aciona emergência com o app aberto).
export default function ConfigNotificacoesScreen({ navigation }: Props) {
  const [sos, setSos] = useState(true);

  useEffect(() => { alertaSOSLigado().then(setSos); }, []);

  const alternar = async (v: boolean) => {
    setSos(v);
    await definirAlertaSOS(v);
    if (v) {
      const ok = await pedirPermissaoNotificacoes();
      if (!ok) {
        Alert.alert(
          "Permissão necessária",
          "Para receber o alerta de SOS, permita as notificações nas configurações do celular."
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <BackChip onBack={() => navigation.goBack()} titulo="Notificações" />

      <View style={styles.card}>
        <View style={styles.linha}>
          <Text style={styles.emoji}>🚨</Text>
          <View style={styles.body}>
            <Text style={styles.ti}>Alerta de SOS</Text>
            <Text style={styles.su}>Receba uma notificação quando a criança acionar o SOS.</Text>
          </View>
          <Switch
            value={sos}
            onValueChange={alternar}
            trackColor={{ true: colors.online, false: "#cfc8bb" }}
            thumbColor={colors.white}
          />
        </View>
      </View>

      <Text style={styles.nota}>
        O alerta funciona com o app aberto. Notificações com o app totalmente
        fechado exigem um servidor de mensagens (fora do escopo deste projeto).
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream, paddingHorizontal: 23 },
  card: { backgroundColor: colors.white, borderWidth: 3, borderColor: colors.ink, borderRadius: 16, padding: 16 },
  linha: { flexDirection: "row", alignItems: "center", gap: 14 },
  emoji: { fontSize: 28 },
  body: { flex: 1 },
  ti: { fontFamily: fonts.quicksandBold, fontSize: 16, color: colors.ink },
  su: { fontFamily: fonts.quicksand, fontSize: 13, color: colors.muted, marginTop: 2, lineHeight: 18 },
  nota: { fontFamily: fonts.quicksand, fontSize: 13, color: colors.muted, textAlign: "center", marginTop: 18, lineHeight: 19 },
});
