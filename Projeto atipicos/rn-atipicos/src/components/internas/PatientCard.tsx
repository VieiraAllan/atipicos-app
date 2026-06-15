import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import { Bars } from "@/components/internas/widgets";
import { Paciente } from "@/constants/areaData";

// Cartão de paciente reutilizado na lista e no detalhe (terapeuta).
export default function PatientCard({ p, onPress }: { p: Paciente; onPress?: () => void }) {
  const Wrap: any = onPress ? Pressable : View;
  return (
    <Wrap style={styles.card} onPress={onPress}>
      <View style={styles.head}>
        <View style={styles.avatar}><Text style={styles.avatarEmoji}>{p.emoji}</Text></View>
        <View style={styles.info}>
          <Text style={styles.nome}>"{p.nome}"</Text>
          <Text style={styles.line}><Text style={styles.b}>Idade:</Text> {p.idade}</Text>
          <Text style={styles.line}><Text style={styles.b}>Diagnóstico:</Text> {p.diag}</Text>
          <Text style={styles.online}>● Online</Text>
        </View>
      </View>
      <View style={styles.charts}>
        <View style={styles.chartBox}><Text style={styles.cap}>Evolução da Fala</Text><Bars valores={[45, 60, 50, 80]} /></View>
        <View style={styles.chartBox}><Text style={styles.cap}>Evolução Cognitiva</Text><Bars valores={[55, 50, 70, 85]} /></View>
      </View>
    </Wrap>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.patient, borderWidth: 3, borderColor: colors.ink, borderRadius: 15, padding: 16, marginBottom: 18 },
  head: { flexDirection: "row", gap: 14 },
  avatar: { width: 78, height: 78, borderRadius: 39, backgroundColor: colors.cream, borderWidth: 2, borderColor: colors.ink, alignItems: "center", justifyContent: "center" },
  avatarEmoji: { fontSize: 44 },
  info: { flex: 1, justifyContent: "center" },
  nome: { fontFamily: fonts.quicksandBold, fontSize: 16, color: colors.ink },
  line: { fontFamily: fonts.quicksandSemi, fontSize: 14, color: colors.ink, marginTop: 2 },
  b: { fontFamily: fonts.quicksandBold },
  online: { fontFamily: fonts.quicksandBold, fontSize: 13, color: colors.online, marginTop: 4 },
  charts: { flexDirection: "row", gap: 16, marginTop: 14 },
  chartBox: { flex: 1 },
  cap: { fontFamily: fonts.quicksandBold, fontSize: 13, color: colors.ink, marginBottom: 6, textAlign: "center" },
});
