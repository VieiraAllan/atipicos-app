import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import { SectionTitle } from "@/components/internas/AppShell";
import KidsShell from "@/components/internas/KidsShell";
import { useApp } from "@/store/AppStore";
import { falar } from "@/utils/speech";

type Props = NativeStackScreenProps<RootStackParamList, "KidsTarefas">;

// Rotina da criança logada. Concluir uma tarefa atualiza o progresso
// que o responsável e o terapeuta veem nos relatórios.
export default function KidsTarefasScreen({ navigation }: Props) {
  const { usuarioAtual, tarefasDaCrianca, alternarTarefa } = useApp();
  const criancaId = usuarioAtual?.criancaId ?? "";
  const tarefas = tarefasDaCrianca(criancaId);

  const concluir = (id: string, nome: string, jaFeita: boolean) => {
    if (!jaFeita) falar(`${nome}. Muito bem!`);
    alternarTarefa(id);
  };

  return (
    <KidsShell navigation={navigation}>
      <SectionTitle>Minha Rotina de Hoje</SectionTitle>
      {tarefas.length === 0 ? (
        <Text style={styles.vazio}>Sua rotina ainda está vazia. Peça para o seu responsável adicionar tarefas. 😊</Text>
      ) : (
        tarefas.map((t) => (
          <Pressable key={t.id} style={[styles.task, t.done && styles.done]} onPress={() => concluir(t.id, t.nome, t.done)}>
            <View style={[styles.chk, t.done && styles.chkOn]}>{t.done && <Text style={styles.chkMark}>✓</Text>}</View>
            <Text style={styles.emoji}>{t.emoji}</Text>
            <Text style={[styles.t, t.done && styles.tDone]}>{t.nome}</Text>
            <Text style={styles.time}>{t.hora}</Text>
          </Pressable>
        ))
      )}
    </KidsShell>
  );
}

const styles = StyleSheet.create({
  vazio: { fontFamily: fonts.quicksand, fontSize: 15, color: colors.muted, textAlign: "center", lineHeight: 22, paddingVertical: 20 },
  task: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: colors.white, borderWidth: 3, borderColor: colors.ink, borderRadius: 14, padding: 12, marginBottom: 12 },
  done: { backgroundColor: colors.taskDone },
  chk: { width: 28, height: 28, borderRadius: 8, borderWidth: 2.5, borderColor: colors.ink, backgroundColor: colors.white, alignItems: "center", justifyContent: "center" },
  chkOn: { backgroundColor: "#98FF98" },
  chkMark: { fontSize: 17, color: colors.ink, fontWeight: "700" },
  emoji: { fontSize: 28 },
  t: { flex: 1, fontFamily: fonts.quicksandSemi, fontSize: 16, color: colors.ink },
  tDone: { textDecorationLine: "line-through", color: colors.muted },
  time: { fontFamily: fonts.quicksandBold, fontSize: 14, color: colors.muted },
});
