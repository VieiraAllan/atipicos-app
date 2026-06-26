import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import PrimaryButton from "@/components/PrimaryButton";
import { useApp } from "@/store/AppStore";
import { obterLocalizacaoAtual } from "@/services/localizacao";

type Props = NativeStackScreenProps<RootStackParamList, "SOS">;

// SOS — RF15: ao acionar, captura a localização atual e a envia aos
// responsáveis (registra no store; o responsável vê no mapa).
export default function SOSScreen({ navigation }: Props) {
  const { usuarioAtual, registrarLocalizacao, registrarAlertaSOS } = useApp();
  const [status, setStatus] = useState("Enviando sua localização…");

  useEffect(() => {
    let ativo = true;
    (async () => {
      const criancaId = usuarioAtual?.criancaId;
      if (!criancaId) {
        if (ativo) setStatus("Alerta enviado aos responsáveis.");
        return;
      }
      try {
        const { lat, lng } = await obterLocalizacaoAtual();
        if (!ativo) return;
        registrarLocalizacao(criancaId, lat, lng, "sos");
        registrarAlertaSOS(criancaId, lat, lng);
        setStatus("Localização enviada aos responsáveis. ✓");
      } catch {
        registrarAlertaSOS(criancaId);
        if (ativo) setStatus("Alerta enviado. (Não foi possível obter o GPS.)");
      }
    })();
    return () => { ativo = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.wrap}>
      <Text style={styles.big}>🚨</Text>
      <Text style={styles.ttl}>SOS acionado!</Text>
      <Text style={styles.sub}>{status}</Text>
      <PrimaryButton label="Voltar" variant="success" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.sos, alignItems: "center", justifyContent: "center", gap: 24, padding: 40 },
  big: { fontSize: 84 },
  ttl: { fontFamily: fonts.quicksandBold, fontSize: 30, color: colors.ink },
  sub: { fontFamily: fonts.quicksand, fontSize: 17, color: colors.ink, textAlign: "center", maxWidth: 280, lineHeight: 24 },
});
