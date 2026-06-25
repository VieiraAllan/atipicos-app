import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell, { SectionTitle } from "@/components/internas/AppShell";
import { Card, Bars } from "@/components/internas/widgets";
import SeletorCrianca from "@/components/internas/SeletorCrianca";
import { navPais } from "./HomeResponsavelScreen";
import { useApp } from "@/store/AppStore";

type Props = NativeStackScreenProps<RootStackParamList, "PaisRelatorios">;

// RF16/RF17: relatório de progresso — reflete avaliações do terapeuta
// (barras) e a conclusão das tarefas (porcentagem), em tempo real.
export default function PaisRelatoriosScreen({ navigation, route }: Props) {
  const { usuarioAtual, criancasDoResponsavel, statsDaCrianca, criancaPorId, terapeutas, sair } = useApp();
  const criancas = criancasDoResponsavel();
  const [selId, setSelId] = useState<string | null>(route.params?.criancaId ?? criancas[0]?.id ?? null);
  const selecionada = criancas.find((c) => c.id === selId) ?? criancas[0] ?? null;

  const logout = () => { sair(); navigation.reset({ index: 0, routes: [{ name: "Inicial" }] }); };
  const stats = selecionada ? statsDaCrianca(selecionada.id) : null;
  const terapeuta = selecionada?.terapeutaId
    ? terapeutas().find((t) => t.uid === selecionada.terapeutaId)
    : null;

  return (
    <AppShell
      nome={usuarioAtual?.nome ?? "Responsável"}
      onSair={logout}
      onSino={() => navigation.navigate("PaisNoticias")}
      navItens={navPais(navigation, "rel")}
      onSOS={() => navigation.navigate("SOS")}
    >
      <SectionTitle>Relatório de Progresso</SectionTitle>

      {!selecionada || !stats ? (
        <Text style={styles.vazio}>Cadastre uma criança para ver o progresso.</Text>
      ) : (
        <>
          <SeletorCrianca criancas={criancas} selecionada={selId} onSelecionar={setSelId} />

          <Card title={`${selecionada.nome} — ${selecionada.diagnostico}`}>
            <View style={styles.charts}>
              <View style={styles.chartBox}>
                <Text style={styles.cap}>Evolução da Fala</Text>
                <Bars valores={normaliza(stats.falaHist)} />
              </View>
              <View style={styles.chartBox}>
                <Text style={styles.cap}>Evolução Cognitiva</Text>
                <Bars valores={normaliza(stats.cognitivaHist)} />
              </View>
            </View>
            <View style={styles.stats}>
              <Stat valor={`${stats.tarefasPct}%`} label="Tarefas" />
              <Stat valor={`${stats.tarefasFeitas}/${stats.totalTarefas}`} label="Concluídas" />
              <Stat valor={`${stats.fala}`} label="Fala (atual)" />
            </View>
            <Text style={styles.terapeuta}>
              {terapeuta ? `👩‍⚕️ Acompanhada por ${terapeuta.nome}` : "Sem terapeuta vinculado"}
            </Text>
          </Card>

          <Text style={styles.nota}>
            As barras de fala e cognição são atualizadas pelo terapeuta a cada avaliação. A porcentagem de
            tarefas sobe conforme a criança conclui sua rotina.
          </Text>
        </>
      )}
    </AppShell>
  );
}

// Mostra as últimas 4 avaliações como barras (preenche se houver menos).
function normaliza(hist: number[]): number[] {
  const ult = hist.slice(-4);
  while (ult.length < 4) ult.unshift(ult[0] ?? 0);
  return ult;
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
  vazio: { fontFamily: fonts.quicksand, fontSize: 14, color: colors.muted, textAlign: "center", paddingVertical: 16 },
  charts: { flexDirection: "row", gap: 16 },
  chartBox: { flex: 1 },
  cap: { fontFamily: fonts.quicksandBold, fontSize: 13, color: colors.ink, marginBottom: 6, textAlign: "center" },
  stats: { flexDirection: "row", justifyContent: "space-around", marginTop: 16 },
  statValor: { fontFamily: fonts.quicksandBold, fontSize: 22, color: colors.ink },
  statLabel: { fontFamily: fonts.quicksand, fontSize: 12, color: colors.muted },
  terapeuta: { fontFamily: fonts.quicksandSemi, fontSize: 13, color: colors.muted, textAlign: "center", marginTop: 14 },
  nota: { fontFamily: fonts.quicksand, fontSize: 13, color: colors.muted, lineHeight: 19, marginTop: 4 },
});
