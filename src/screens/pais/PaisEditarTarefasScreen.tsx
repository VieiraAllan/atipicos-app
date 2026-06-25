import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell from "@/components/internas/AppShell";
import BackChip from "@/components/internas/BackChip";
import SeletorCrianca from "@/components/internas/SeletorCrianca";
import { navPais } from "./HomeResponsavelScreen";
import { mascaraHora } from "@/utils/masks";
import { useApp } from "@/store/AppStore";

type Props = NativeStackScreenProps<RootStackParamList, "PaisEditarTarefas">;

const EMOJIS = ["⭐", "🦷", "🥣", "🎒", "🍽️", "📚", "🛁", "😴", "💊", "🎨", "⚽", "🧩"];

// RF07–RF09: criar / remover tarefas da rotina DE UMA CRIANÇA específica.
export default function PaisEditarTarefasScreen({ navigation, route }: Props) {
  const { usuarioAtual, criancasDoResponsavel, tarefasDaCrianca, adicionarTarefa, removerTarefa, sair } = useApp();
  const criancas = criancasDoResponsavel();
  const [selId, setSelId] = useState<string | null>(route.params?.criancaId ?? criancas[0]?.id ?? null);
  const selecionada = criancas.find((c) => c.id === selId) ?? criancas[0] ?? null;

  const [emoji, setEmoji] = useState("⭐");
  const [nome, setNome] = useState("");
  const [hora, setHora] = useState("");

  const logout = () => { sair(); navigation.reset({ index: 0, routes: [{ name: "Inicial" }] }); };

  const add = () => {
    if (!selecionada || !nome.trim()) return;
    adicionarTarefa(selecionada.id, { emoji, nome: nome.trim(), hora: hora || "--:--" });
    setNome(""); setHora(""); setEmoji("⭐");
  };

  const tarefas = selecionada ? tarefasDaCrianca(selecionada.id) : [];

  return (
    <AppShell
      nome={usuarioAtual?.nome ?? "Responsável"}
      onSair={logout}
      navItens={navPais(navigation, "home")}
      onSOS={() => navigation.navigate("SOS")}
    >
      <BackChip onBack={() => navigation.goBack()} titulo="Editar Tarefas" />

      {!selecionada ? (
        <Text style={styles.semCrianca}>Cadastre uma criança primeiro para criar tarefas.</Text>
      ) : (
        <>
          <SeletorCrianca criancas={criancas} selecionada={selId} onSelecionar={setSelId} />

          <Text style={styles.lbl}>Ícone</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.emojiRow}>
            {EMOJIS.map((e) => (
              <Pressable key={e} style={[styles.emojiBtn, emoji === e && styles.emojiBtnOn]} onPress={() => setEmoji(e)}>
                <Text style={styles.emojiTxt}>{e}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.formRow}>
            <TextInput style={[styles.input, { flex: 1 }]} value={nome} onChangeText={setNome}
              placeholder="Nome da tarefa…" placeholderTextColor={colors.placeholder} />
            <TextInput style={[styles.input, styles.inputHora]} value={hora}
              onChangeText={(v) => setHora(mascaraHora(v))} placeholder="00:00"
              placeholderTextColor={colors.placeholder} keyboardType="numeric" maxLength={5} />
            <Pressable style={styles.addBtn} onPress={add}><Text style={styles.addBtnText}>＋</Text></Pressable>
          </View>

          {tarefas.length === 0 ? (
            <Text style={styles.semCrianca}>Nenhuma tarefa para {selecionada.nome} ainda.</Text>
          ) : (
            tarefas.map((t) => (
              <View key={t.id} style={styles.task}>
                <Text style={styles.emojiItem}>{t.emoji}</Text>
                <Text style={styles.tNome}>{t.nome}</Text>
                <Text style={styles.tHora}>{t.hora}</Text>
                <Pressable onPress={() => removerTarefa(t.id)} hitSlop={8}><Text style={styles.del}>🗑️</Text></Pressable>
              </View>
            ))
          )}
        </>
      )}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  semCrianca: { fontFamily: fonts.quicksand, fontSize: 14, color: colors.muted, textAlign: "center", paddingVertical: 16 },
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
