import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell from "@/components/internas/AppShell";
import BackChip from "@/components/internas/BackChip";
import { navPais } from "./HomeResponsavelScreen";
import { NOME_RESP } from "@/constants/areaData";
import { mascaraHora } from "@/utils/masks";

type Props = NativeStackScreenProps<RootStackParamList, "PaisEditarTarefas">;
type Item = { emoji: string; t: string; time: string };

const EMOJIS = ["⭐", "🦷", "🥣", "🎒", "🍽️", "📚", "🛁", "😴", "💊", "🎨", "⚽", "🧩"];

// RF07–RF09: criar / remover tarefas da rotina, com emoji e horário.
export default function PaisEditarTarefasScreen({ navigation }: Props) {
  const [tarefas, setTarefas] = useState<Item[]>([
    { emoji: "🦷", t: "Escovar os dentes", time: "08:00" },
    { emoji: "🎒", t: "Ir para a escola", time: "09:00" },
    { emoji: "📚", t: "Lição de casa", time: "15:00" },
  ]);
  const [emoji, setEmoji] = useState("⭐");
  const [nome, setNome] = useState("");
  const [hora, setHora] = useState("");

  const add = () => {
    if (!nome.trim()) return;
    setTarefas((t) => [...t, { emoji, t: nome.trim(), time: hora || "--:--" }]);
    setNome("");
    setHora("");
    setEmoji("⭐");
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

      {/* Seletor de emoji */}
      <Text style={styles.lbl}>Escolha um ícone</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.emojiRow}>
        {EMOJIS.map((e) => (
          <Pressable key={e} style={[styles.emojiBtn, emoji === e && styles.emojiBtnOn]} onPress={() => setEmoji(e)}>
            <Text style={styles.emojiTxt}>{e}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Nome + horário */}
      <View style={styles.formRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          value={nome}
          onChangeText={setNome}
          placeholder="Nome da tarefa…"
          placeholderTextColor={colors.placeholder}
        />
        <TextInput
          style={[styles.input, styles.inputHora]}
          value={hora}
          onChangeText={(v) => setHora(mascaraHora(v))}
          placeholder="00:00"
          placeholderTextColor={colors.placeholder}
          keyboardType="numeric"
          maxLength={5}
        />
        <Pressable style={styles.addBtn} onPress={add}><Text style={styles.addBtnText}>＋</Text></Pressable>
      </View>

      {/* Lista */}
      {tarefas.map((t, i) => (
        <View key={i} style={styles.task}>
          <Text style={styles.emojiItem}>{t.emoji}</Text>
          <Text style={styles.tNome}>{t.t}</Text>
          <Text style={styles.tHora}>{t.time}</Text>
          <Pressable onPress={() => remover(i)} hitSlop={8}><Text style={styles.del}>🗑️</Text></Pressable>
        </View>
      ))}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  lbl: { fontFamily: fonts.quicksandBold, fontSize: 14, color: colors.ink, marginBottom: 8 },
  emojiRow: { gap: 8, paddingBottom: 4, marginBottom: 14 },
  emojiBtn: { width: 46, height: 46, borderRadius: 12, borderWidth: 2, borderColor: colors.ink, backgroundColor: colors.white, alignItems: "center", justifyContent: "center" },
  emojiBtnOn: { backgroundColor: colors.pill, borderWidth: 3 },
  emojiTxt: { fontSize: 24 },
  formRow: { flexDirection: "row", gap: 8, marginBottom: 18, alignItems: "center" },
  input: { borderWidth: 2, borderColor: colors.ink, borderRadius: 10, paddingHorizontal: 12, height: 46, backgroundColor: colors.white, fontFamily: fonts.quicksand, fontSize: 15, color: colors.text },
  inputHora: { width: 78, textAlign: "center" },
  addBtn: { width: 48, height: 46, borderRadius: 12, borderWidth: 2, borderColor: colors.ink, backgroundColor: colors.fieldBg, alignItems: "center", justifyContent: "center" },
  addBtnText: { fontFamily: fonts.quicksandBold, fontSize: 22, color: colors.ink },
  task: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: colors.white, borderWidth: 3, borderColor: colors.ink, borderRadius: 14, padding: 12, marginBottom: 12 },
  emojiItem: { fontSize: 28 },
  tNome: { flex: 1, fontFamily: fonts.quicksandSemi, fontSize: 15, color: colors.ink },
  tHora: { fontFamily: fonts.quicksandBold, fontSize: 14, color: colors.muted },
  del: { fontSize: 22 },
});
