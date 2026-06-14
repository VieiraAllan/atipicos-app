import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell, { SectionTitle } from "@/components/internas/AppShell";
import { TAREFAS, Tarefa, NOME_KID } from "@/constants/areaData";
import { falar } from "@/utils/speech";

type Props = NativeStackScreenProps<RootStackParamList, "KidsTarefas">;

export default function KidsTarefasScreen({ navigation }: Props) {
  const [tarefas, setTarefas] = useState<Tarefa[]>(TAREFAS);

  const toggle = (i: number) =>
    setTarefas((ts) =>
      ts.map((t, j) => {
        if (j !== i) return t;
        if (!t.done) falar(t.t);
        return { ...t, done: !t.done };
      })
    );

  return (
    <AppShell
      nome={NOME_KID}
      onSair={() => navigation.reset({ index: 0, routes: [{ name: "Inicial" }] })}
      navItens={[{ icon: "home", onPress: () => navigation.navigate("HomeKids") }]}
      onSOS={() => navigation.navigate("SOS")}
    >
      <SectionTitle>Minha Rotina de Hoje</SectionTitle>
      {tarefas.map((t, i) => (
        <Pressable key={i} style={[styles.task, t.done && styles.done]} onPress={() => toggle(i)}>
          <View style={[styles.chk, t.done && styles.chkOn]}>
            {t.done && <Text style={styles.chkMark}>✓</Text>}
          </View>
          <Text style={styles.emoji}>{t.emoji}</Text>
          <Text style={styles.t}>{t.t}</Text>
          <Text style={styles.time}>{t.time}</Text>
        </Pressable>
      ))}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  task: {
    flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: colors.white,
    borderWidth: 3, borderColor: colors.ink, borderRadius: 14, padding: 12, marginBottom: 12,
  },
  done: { backgroundColor: colors.taskDone },
  chk: { width: 28, height: 28, borderRadius: 8, borderWidth: 2.5, borderColor: colors.ink, backgroundColor: colors.white, alignItems: "center", justifyContent: "center" },
  chkOn: { backgroundColor: "#98FF98" },
  chkMark: { fontSize: 17, color: colors.ink, fontWeight: "700" },
  emoji: { fontSize: 28 },
  t: { flex: 1, fontFamily: fonts.quicksandSemi, fontSize: 16, color: colors.ink },
  time: { fontFamily: fonts.quicksandBold, fontSize: 14, color: colors.muted },
});
