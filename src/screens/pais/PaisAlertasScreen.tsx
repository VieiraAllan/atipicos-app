import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell, { SectionTitle } from "@/components/internas/AppShell";
import { navPais } from "./HomeResponsavelScreen";
import { useApp } from "@/store/AppStore";

type Props = NativeStackScreenProps<RootStackParamList, "PaisAlertas">;

// Formata o horário do alerta de forma amigável (Hoje / Ontem / data).
function quando(ts: number): string {
  const d = new Date(ts);
  const hh = `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  const hoje = new Date();
  const ontem = new Date(); ontem.setDate(hoje.getDate() - 1);
  const mesmoDia = (a: Date, b: Date) => a.toDateString() === b.toDateString();
  if (mesmoDia(d, hoje)) return `Hoje, ${hh}`;
  if (mesmoDia(d, ontem)) return `Ontem, ${hh}`;
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}, ${hh}`;
}

// RF15 (visão do responsável): histórico dos alertas de SOS emitidos pela criança.
export default function PaisAlertasScreen({ navigation }: Props) {
  const { usuarioAtual, sair, alertasDoResponsavel } = useApp();
  const alertas = alertasDoResponsavel();

  return (
    <AppShell
      nome={usuarioAtual?.nome ?? "Responsável"}
      onSair={() => { sair(); navigation.reset({ index: 0, routes: [{ name: "Inicial" }] }); }}
      onSino={() => navigation.navigate("PaisNoticias")}
      navItens={navPais(navigation, "alertas")}
    >
      <SectionTitle>Alertas de emergência</SectionTitle>

      {alertas.length === 0 ? (
        <Text style={styles.vazio}>
          Nenhum alerta por enquanto. Quando a criança acionar o SOS, o aviso aparece aqui com horário e localização.
        </Text>
      ) : (
        alertas.map((a) => (
          <Pressable key={a.id} style={styles.alerta} onPress={() => navigation.navigate("PaisLocalizacao")}>
            <View style={styles.ic}><Text style={styles.icTxt}>🚨</Text></View>
            <View style={styles.body}>
              <Text style={styles.top}><Text style={styles.nome}>{a.criancaNome}</Text> acionou o SOS</Text>
              <Text style={styles.loc}>📍 Ver localização no mapa</Text>
              <Text style={styles.when}>{quando(a.ts)}</Text>
            </View>
            <View style={styles.chip}><Text style={styles.chipTxt}>Visto</Text></View>
          </Pressable>
        ))
      )}

      {alertas.length > 0 && <Text style={styles.note}>Toque num alerta para ver a localização no mapa.</Text>}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  vazio: { fontFamily: fonts.quicksand, fontSize: 15, color: colors.muted, textAlign: "center", paddingVertical: 30, paddingHorizontal: 10, lineHeight: 22 },
  alerta: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: colors.white, borderWidth: 3, borderColor: colors.ink, borderRadius: 15, padding: 14, marginBottom: 13 },
  ic: { width: 48, height: 48, borderRadius: 12, backgroundColor: "rgba(255,77,77,0.16)", borderWidth: 2, borderColor: colors.ink, alignItems: "center", justifyContent: "center" },
  icTxt: { fontSize: 24 },
  body: { flex: 1 },
  top: { fontFamily: fonts.quicksandSemi, fontSize: 15, color: colors.ink },
  nome: { fontFamily: fonts.quicksandBold },
  loc: { fontFamily: fonts.quicksand, fontSize: 13, color: colors.muted, marginTop: 3 },
  when: { fontFamily: fonts.quicksandBold, fontSize: 12, color: colors.placeholder, marginTop: 3 },
  chip: { backgroundColor: colors.taskDone, borderRadius: 12, paddingVertical: 4, paddingHorizontal: 9 },
  chipTxt: { fontFamily: fonts.inter, fontSize: 11, color: colors.online },
  note: { fontFamily: fonts.quicksand, fontSize: 12, color: colors.placeholder, textAlign: "center", marginTop: 6 },
});
