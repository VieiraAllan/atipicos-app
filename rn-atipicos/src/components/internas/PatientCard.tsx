import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import { Bars } from "@/components/internas/widgets";

// Cartão de paciente (criança) reutilizado na lista e no detalhe do terapeuta.
export default function PatientCard({
  nome,
  diagnostico,
  falaHist,
  cognitivaHist,
  onPress,
}: {
  nome: string;
  diagnostico: string;
  falaHist: number[];
  cognitivaHist: number[];
  onPress?: () => void;
}) {
  const Wrap: any = onPress ? Pressable : View;
  return (
    <Wrap style={styles.card} onPress={onPress}>
      <View style={styles.head}>
        <View style={styles.avatar}><Text style={styles.avatarEmoji}>🧒</Text></View>
        <View style={styles.info}>
          <Text style={styles.nome}>{nome}</Text>
          <Text style={styles.line}><Text style={styles.b}>Diagnóstico:</Text> {diagnostico}</Text>
          <Text style={styles.online}>● Ativo</Text>
        </View>
      </View>
      <View style={styles.charts}>
        <View style={styles.chartBox}><Text style={styles.cap}>Evolução da Fala</Text><Bars valores={ult4(falaHist)} /></View>
        <View style={styles.chartBox}><Text style={styles.cap}>Evolução Cognitiva</Text><Bars valores={ult4(cognitivaHist)} /></View>
      </View>
    </Wrap>
  );
}

function ult4(hist: number[]): number[] {
  const u = (hist ?? []).slice(-4);
  while (u.length < 4) u.unshift(u[0] ?? 0);
  return u;
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.patient, borderWidth: 3, borderColor: colors.ink, borderRadius: 15, padding: 16, marginBottom: 18 },
  head: { flexDirection: "row", gap: 14 },
  avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: colors.cream, borderWidth: 2, borderColor: colors.ink, alignItems: "center", justifyContent: "center" },
  avatarEmoji: { fontSize: 40 },
  info: { flex: 1, justifyContent: "center" },
  nome: { fontFamily: fonts.quicksandBold, fontSize: 17, color: colors.ink },
  line: { fontFamily: fonts.quicksandSemi, fontSize: 14, color: colors.ink, marginTop: 2 },
  b: { fontFamily: fonts.quicksandBold },
  online: { fontFamily: fonts.quicksandBold, fontSize: 13, color: colors.online, marginTop: 4 },
  charts: { flexDirection: "row", gap: 16, marginTop: 14 },
  chartBox: { flex: 1 },
  cap: { fontFamily: fonts.quicksandBold, fontSize: 13, color: colors.ink, marginBottom: 6, textAlign: "center" },
});
