import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell, { SectionTitle } from "@/components/internas/AppShell";
import { Atividade, FONO, PSICO, ESCOLA, NOME_KID } from "@/constants/areaData";
import { falar } from "@/utils/speech";

// Tela reutilizável de lista de atividades (Fono / Psico / Escola).
function ListaAtividades({
  navigation,
  titulo,
  itens,
}: {
  navigation: any;
  titulo: string;
  itens: Atividade[];
}) {
  return (
    <AppShell
      nome={NOME_KID}
      onSair={() => navigation.reset({ index: 0, routes: [{ name: "Inicial" }] })}
      navItens={[{ icon: "home", onPress: () => navigation.navigate("HomeKids") }]}
      onSOS={() => navigation.navigate("SOS")}
    >
      <SectionTitle>{titulo}</SectionTitle>
      {itens.map((it, i) => (
        <Pressable key={i} style={styles.item} onPress={() => falar(it.ti)}>
          <Text style={styles.emoji}>{it.emoji}</Text>
          <View style={styles.body}>
            <Text style={styles.ti}>{it.ti}</Text>
            <Text style={styles.su}>{it.su}</Text>
          </View>
          <Text style={styles.go}>▶</Text>
        </Pressable>
      ))}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: colors.white,
    borderWidth: 3, borderColor: colors.ink, borderRadius: 14, padding: 14, marginBottom: 13,
  },
  emoji: { fontSize: 30 },
  body: { flex: 1 },
  ti: { fontFamily: fonts.quicksandBold, fontSize: 16, color: colors.ink },
  su: { fontFamily: fonts.quicksand, fontSize: 13, color: colors.muted },
  go: { fontSize: 18, color: colors.placeholder },
});

export function KidsFonoScreen(p: NativeStackScreenProps<RootStackParamList, "KidsFono">) {
  return <ListaAtividades navigation={p.navigation} titulo="Fonoaudióloga 🎤" itens={FONO} />;
}
export function KidsPsicoScreen(p: NativeStackScreenProps<RootStackParamList, "KidsPsico">) {
  return <ListaAtividades navigation={p.navigation} titulo="Psicólogo 🧠" itens={PSICO} />;
}
export function KidsEscolaScreen(p: NativeStackScreenProps<RootStackParamList, "KidsEscola">) {
  return <ListaAtividades navigation={p.navigation} titulo="Atividade Escolar 📖" itens={ESCOLA} />;
}
