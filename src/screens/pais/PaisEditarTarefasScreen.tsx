import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell from "@/components/internas/AppShell";
import BackChip from "@/components/internas/BackChip";
import { navPais } from "./HomeResponsavelScreen";
import { NOME_RESP } from "@/constants/areaData";

type Props = NativeStackScreenProps<RootStackParamList, "PaisEditarTarefas">;
type Item = { emoji: string; t: string; time: string };

// RF07–RF09: criar / remover tarefas da rotina.
export default function PaisEditarTarefasScreen({ navigation }: Props) {
  const [tarefas, setTarefas] = useState<Item[]>([
    { emoji: "🦷", t: "Escovar os dentes", time: "08:00" },
    { emoji: "🎒", t: "Ir para a escola", time: "09:00" },
    { emoji: "📚", t: "Lição de casa", time: "15:00" },
  ]);
  const [texto, setTexto] = useState("");

  const add = () => {
    if (!texto.trim()) return;
    setTarefas((t) => [...t, { emoji: "⭐", t: texto.trim(), time: "--:--" }]);
    setTexto("");
  };
  const remover = (i: number) => setTarefas((t) => t.filter((_, j) => j !== i));

  return (
    <AppShell
      nome={NOME_RESP}
      onSair={() => navigation.reset({ index: 0, routes: [{ name: "Inicial" }] })}
      navItens={navPais(navigation, "home")}
      onSOS={() => navigation.navigate("SOS")}
    >
      <BackChip onBack={() => navigation.goBack()} titulo="Editar Tarefas" />

      <View style={styles.addRow}>
        <TextInput
          style={styles.input}
          value={texto}
          onChangeText={setTexto}
          placeholder="Nova tarefa…"
          placeholderTextColor={colors.placeholder}
        />
        <Pressable style={styles.addBtn} onPress={add}><Text style={styles.addBtnText}>＋</Text></Pressable>
      </View>

      {tarefas.map((t, i) => (
        <View key={i} style={styles.task}>
          <Text style={styles.emoji}>{t.emoji}</Text>
          <Text style={styles.t}>{t.t}</Text>
          <Text style={styles.time}>{t.time}</Text>
          <Pressable onPress={() => remover(i)} hitSlop={8}><Text style={styles.del}>🗑️</Text></Pressable>
        </View>
      ))}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  addRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  input: { flex: 1, borderWidth: 2, borderColor: colors.ink, borderRadius: 10, paddingHorizontal: 12, height: 44, backgroundColor: colors.white, fontFamily: fonts.quicksand, fontSize: 15, color: colors.text },
  addBtn: { width: 48, height: 44, borderRadius: 12, borderWidth: 2, borderColor: colors.ink, backgroundColor: colors.fieldBg, alignItems: "center", justifyContent: "center" },
  addBtnText: { fontFamily: fonts.quicksandBold, fontSize: 22, color: colors.ink },
  task: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: colors.white, borderWidth: 3, borderColor: colors.ink, borderRadius: 14, padding: 12, marginBottom: 12 },
  emoji: { fontSize: 28 },
  t: { flex: 1, fontFamily: fonts.quicksandSemi, fontSize: 15, color: colors.ink },
  time: { fontFamily: fonts.quicksandBold, fontSize: 13, color: colors.muted },
  del: { fontSize: 22 },
});
