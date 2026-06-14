import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell, { SectionTitle } from "@/components/internas/AppShell";
import { Card, Bars } from "@/components/internas/widgets";
import { navPais } from "./HomeResponsavelScreen";
import { NOME_RESP } from "@/constants/areaData";

type Props = NativeStackScreenProps<RootStackParamList, "PaisRelatorios">;

// RF16/RF17: relatório de progresso da criança.
export default function PaisRelatoriosScreen({ navigation }: Props) {
  return (
    <AppShell
      nome={NOME_RESP}
      onSair={() => navigation.reset({ index: 0, routes: [{ name: "Inicial" }] })}
      onSino={() => navigation.navigate("PaisNoticias")}
      navItens={navPais(navigation, "rel")}
      onSOS={() => navigation.navigate("SOS")}
    >
      <SectionTitle>Relatório de Progresso</SectionTitle>
      <Card title="Lucas — 5 anos">
        <View style={styles.charts}>
          <View style={styles.chartBox}>
            <Text style={styles.cap}>Evolução da Fala</Text>
            <Bars valores={[40, 55, 70, 85]} />
          </View>
          <View style={styles.chartBox}>
            <Text style={styles.cap}>Evolução Cognitiva</Text>
            <Bars valores={[50, 45, 75, 90]} />
          </View>
        </View>
        <View style={styles.stats}>
          <Stat valor="87%" label="Tarefas" />
          <Stat valor="12" label="Atividades" />
          <Stat valor="+15%" label="No mês" />
        </View>
      </Card>

      <Pressable style={styles.btn} onPress={() => navigation.navigate("CadastroCrianca")}>
        <Text style={styles.btnText}>＋ Cadastrar nova criança</Text>
      </Pressable>
    </AppShell>
  );
}

function Stat({ valor, label }: { valor: string; label: string }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.statValor}>{valor}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  charts: { flexDirection: "row", gap: 16 },
  chartBox: { flex: 1 },
  cap: { fontFamily: fonts.quicksandBold, fontSize: 13, color: colors.ink, marginBottom: 6, textAlign: "center" },
  stats: { flexDirection: "row", justifyContent: "space-around", marginTop: 16 },
  statValor: { fontFamily: fonts.quicksandBold, fontSize: 24, color: colors.ink },
  statLabel: { fontFamily: fonts.quicksand, fontSize: 12, color: colors.muted },
  btn: { borderWidth: 2, borderColor: colors.ink, borderRadius: 16, height: 52, alignItems: "center", justifyContent: "center", backgroundColor: colors.fieldBg },
  btnText: { fontFamily: fonts.quicksandBold, fontSize: 16, color: colors.ink },
});
