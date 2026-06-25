import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import { SectionTitle } from "@/components/internas/AppShell";
import KidsShell from "@/components/internas/KidsShell";
import { MenuItem, MENU_FONO, MENU_PSICO, MENU_ESCOLA } from "@/constants/atividades";
import { falar } from "@/utils/speech";

// Menu de atividades: cada item navega para uma sub-atividade real
// (ou avisa "em breve" quando ainda não há conteúdo).
function MenuAtividades({
  navigation,
  titulo,
  itens,
}: {
  navigation: any;
  titulo: string;
  itens: MenuItem[];
}) {
  const abrir = (it: MenuItem) => {
    if (!it.destino) {
      falar(it.ti); // placeholder: lê o título até a atividade existir
      return;
    }
    navigation.navigate(it.destino, it.param);
  };

  return (
    <KidsShell navigation={navigation}>
      <SectionTitle>{titulo}</SectionTitle>
      {itens.map((it, i) => (
        <Pressable key={i} style={styles.item} onPress={() => abrir(it)}>
          <Text style={styles.emoji}>{it.emoji}</Text>
          <View style={styles.body}>
            <Text style={styles.ti}>{it.ti}</Text>
            <Text style={styles.su}>{it.su}</Text>
          </View>
          <Text style={styles.go}>{it.destino ? "▶" : "•"}</Text>
        </Pressable>
      ))}
    </KidsShell>
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
  return <MenuAtividades navigation={p.navigation} titulo="Fonoaudióloga 🎤" itens={MENU_FONO} />;
}
export function KidsPsicoScreen(p: NativeStackScreenProps<RootStackParamList, "KidsPsico">) {
  return <MenuAtividades navigation={p.navigation} titulo="Psicólogo 🧠" itens={MENU_PSICO} />;
}
export function KidsEscolaScreen(p: NativeStackScreenProps<RootStackParamList, "KidsEscola">) {
  return <MenuAtividades navigation={p.navigation} titulo="Atividade Escolar 📖" itens={MENU_ESCOLA} />;
}
