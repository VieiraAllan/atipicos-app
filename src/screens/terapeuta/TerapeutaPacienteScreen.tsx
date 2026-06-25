import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell, { SectionTitle } from "@/components/internas/AppShell";
import BackChip from "@/components/internas/BackChip";
import PatientCard from "@/components/internas/PatientCard";
import { navTerapeuta } from "./HomeTerapeutaScreen";
import { useApp } from "@/store/AppStore";

type Props = NativeStackScreenProps<RootStackParamList, "TerapeutaPaciente">;

// RF20–RF22: detalhe do paciente + avaliação de progresso (fala/cognitiva).
// Cada avaliação salva é refletida no relatório que o responsável vê.
export default function TerapeutaPacienteScreen({ navigation, route }: Props) {
  const { usuarioAtual, criancaPorId, statsDaCrianca, avaliarCrianca, sair } = useApp();
  const crianca = criancaPorId(route.params.criancaId);
  const stats = crianca ? statsDaCrianca(crianca.id) : null;

  const [fala, setFala] = useState(stats?.fala ?? 30);
  const [cognitiva, setCognitiva] = useState(stats?.cognitiva ?? 30);
  const [salvo, setSalvo] = useState(false);

  const logout = () => { sair(); navigation.reset({ index: 0, routes: [{ name: "Inicial" }] }); };

  if (!crianca || !stats) {
    return (
      <AppShell nome={usuarioAtual?.nome ?? "Terapeuta"} onSair={logout} navItens={navTerapeuta(navigation, "home")}>
        <Text style={styles.vazio}>Paciente não encontrado.</Text>
      </AppShell>
    );
  }

  const salvar = () => {
    avaliarCrianca(crianca.id, fala, cognitiva);
    setSalvo(true);
  };

  return (
    <AppShell nome={usuarioAtual?.nome ?? "Terapeuta"} onSair={logout} navItens={navTerapeuta(navigation, "home")}>
      <BackChip onBack={() => navigation.goBack()} titulo={crianca.nome} />
      <PatientCard nome={crianca.nome} diagnostico={crianca.diagnostico} falaHist={crianca.falaHist} cognitivaHist={crianca.cognitivaHist} />

      <View style={styles.resumo}>
        <Text style={styles.resumoTxt}>
          Tarefas concluídas: <Text style={styles.b}>{stats.tarefasFeitas}/{stats.totalTarefas}</Text> ({stats.tarefasPct}%)
        </Text>
      </View>

      <SectionTitle>Nova avaliação</SectionTitle>
      <Medidor titulo="Evolução da Fala" valor={fala} onChange={(v) => { setFala(v); setSalvo(false); }} />
      <Medidor titulo="Evolução Cognitiva" valor={cognitiva} onChange={(v) => { setCognitiva(v); setSalvo(false); }} />

      <Pressable style={styles.btn} onPress={salvar}>
        <Text style={styles.btnText}>{salvo ? "✓ Avaliação registrada" : "Registrar avaliação"}</Text>
      </Pressable>
      <Text style={styles.nota}>A avaliação aparece no relatório do responsável imediatamente.</Text>
    </AppShell>
  );
}

// Medidor 0–100 com botões − / + (passo de 5) e barra de preenchimento.
function Medidor({ titulo, valor, onChange }: { titulo: string; valor: number; onChange: (v: number) => void }) {
  return (
    <View style={styles.medidor}>
      <View style={styles.medidorHead}>
        <Text style={styles.medidorTitulo}>{titulo}</Text>
        <Text style={styles.medidorValor}>{valor}</Text>
      </View>
      <View style={styles.medidorRow}>
        <Pressable style={styles.stepBtn} onPress={() => onChange(Math.max(0, valor - 5))}><Text style={styles.stepText}>−</Text></Pressable>
        <View style={styles.track}><View style={[styles.fill, { width: `${valor}%` }]} /></View>
        <Pressable style={styles.stepBtn} onPress={() => onChange(Math.min(100, valor + 5))}><Text style={styles.stepText}>＋</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  vazio: { fontFamily: fonts.quicksand, fontSize: 14, color: colors.muted, textAlign: "center", paddingVertical: 20 },
  resumo: { backgroundColor: colors.fieldBg, borderRadius: 12, padding: 12, marginBottom: 4 },
  resumoTxt: { fontFamily: fonts.quicksandSemi, fontSize: 14, color: colors.ink, textAlign: "center" },
  b: { fontFamily: fonts.quicksandBold },
  medidor: { backgroundColor: colors.white, borderWidth: 3, borderColor: colors.ink, borderRadius: 14, padding: 14, marginBottom: 14 },
  medidorHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  medidorTitulo: { fontFamily: fonts.quicksandBold, fontSize: 15, color: colors.ink },
  medidorValor: { fontFamily: fonts.quicksandBold, fontSize: 20, color: colors.ink },
  medidorRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  stepBtn: { width: 40, height: 40, borderRadius: 10, borderWidth: 2, borderColor: colors.ink, alignItems: "center", justifyContent: "center", backgroundColor: colors.fieldBg },
  stepText: { fontFamily: fonts.quicksandBold, fontSize: 22, color: colors.ink },
  track: { flex: 1, height: 12, borderRadius: 6, backgroundColor: "rgba(0,0,0,0.12)", overflow: "hidden" },
  fill: { height: "100%", backgroundColor: colors.online },
  btn: { backgroundColor: colors.successFill, borderWidth: 2, borderColor: colors.successBorder, borderRadius: 16, height: 52, alignItems: "center", justifyContent: "center", marginTop: 6 },
  btnText: { fontFamily: fonts.quicksandBold, fontSize: 16, color: colors.ink },
  nota: { fontFamily: fonts.quicksand, fontSize: 12, color: colors.muted, textAlign: "center", marginTop: 10 },
});
