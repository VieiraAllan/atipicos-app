import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell from "@/components/internas/AppShell";
import { Card, MapBox } from "@/components/internas/widgets";
import { NOME_RESP } from "@/constants/areaData";

type Props = NativeStackScreenProps<RootStackParamList, "HomeResponsavel">;

// Itens de navegação inferior compartilhados pela área de pais.
export function navPais(navigation: any, ativo: string) {
  return [
    { icon: "home" as const, ativo: ativo === "home", onPress: () => navigation.navigate("HomeResponsavel") },
    { icon: "bar-chart-2" as const, ativo: ativo === "rel", onPress: () => navigation.navigate("PaisRelatorios") },
    { icon: "settings" as const, ativo: ativo === "cfg", onPress: () => navigation.navigate("PaisConfig") },
  ];
}

type ItemRotina = { emoji: string; texto: string; hora: string; done: boolean };

export default function HomeResponsavelScreen({ navigation }: Props) {
  const sair = () => navigation.reset({ index: 0, routes: [{ name: "Inicial" }] });
  const [rotina, setRotina] = useState<ItemRotina[]>([
    { emoji: "🦷", texto: "Escovar os dentes", hora: "08:00", done: true },
    { emoji: "🎒", texto: "Ir para a escola", hora: "09:00", done: false },
    { emoji: "📚", texto: "Lição de casa", hora: "15:00", done: false },
  ]);
  const toggle = (i: number) =>
    setRotina((r) => r.map((it, j) => (j === i ? { ...it, done: !it.done } : it)));

  return (
    <AppShell
      nome={NOME_RESP}
      onSair={sair}
      onSino={() => navigation.navigate("PaisNoticias")}
      navItens={navPais(navigation, "home")}
      onSOS={() => navigation.navigate("SOS")}
    >
      <Card title="Rotina da Criança">
        {rotina.map((it, i) => (
          <Pressable key={i} style={[styles.task, it.done && styles.taskDone]} onPress={() => toggle(i)}>
            <View style={[styles.chk, it.done && styles.chkOn]}>{it.done && <Text style={styles.chkMark}>✓</Text>}</View>
            <Text style={styles.taskEmoji}>{it.emoji}</Text>
            <Text style={[styles.taskText, it.done && styles.taskTextDone]}>{it.texto}</Text>
            <Text style={styles.taskTime}>{it.hora}</Text>
          </Pressable>
        ))}
        <Text style={styles.dica}>Toque em uma tarefa para concluir ou desfazer.</Text>
      </Card>

      <Pressable onPress={() => navigation.navigate("PaisLocalizacao")}>
        <Card title="Última localização">
          <View style={{ margin: -14 }}><MapBox /></View>
        </Card>
      </Pressable>

      <Acao emoji="📋" label="Editar Tarefas" onPress={() => navigation.navigate("PaisEditarTarefas")} />
      <Acao emoji="📱" label="Controle de Uso" onPress={() => navigation.navigate("PaisControle")} />
    </AppShell>
  );
}

function Acao({ emoji, label, onPress }: { emoji: string; label: string; onPress: () => void }) {
  return (
    <Pressable style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.rowBgHover }]} onPress={onPress}>
      <Text style={styles.rowEmoji}>{emoji}</Text>
      <Text style={styles.rowLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  task: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: colors.white, borderWidth: 3, borderColor: colors.ink, borderRadius: 14, padding: 12, marginBottom: 12 },
  taskDone: { backgroundColor: colors.taskDone },
  chk: { width: 26, height: 26, borderRadius: 8, borderWidth: 2.5, borderColor: colors.ink, backgroundColor: colors.white, alignItems: "center", justifyContent: "center" },
  chkOn: { backgroundColor: "#98FF98" },
  chkMark: { fontSize: 15, color: colors.ink, fontWeight: "700" },
  taskEmoji: { fontSize: 26 },
  taskText: { flex: 1, fontFamily: fonts.quicksandSemi, fontSize: 15, color: colors.ink },
  taskTextDone: { textDecorationLine: "line-through", color: colors.muted },
  taskTime: { fontFamily: fonts.quicksandBold, fontSize: 13, color: colors.muted },
  dica: { fontFamily: fonts.quicksand, fontSize: 12, color: colors.muted, textAlign: "center", marginTop: 2 },
  row: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: colors.rowBg, borderWidth: 3, borderColor: colors.ink, borderRadius: 15, padding: 16, marginBottom: 18 },
  rowEmoji: { fontSize: 38 },
  rowLabel: { fontFamily: fonts.happy, fontSize: 20, color: colors.ink },
});
