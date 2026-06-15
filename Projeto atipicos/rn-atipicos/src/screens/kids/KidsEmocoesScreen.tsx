import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell, { SectionTitle } from "@/components/internas/AppShell";
import { EMOCOES, NOME_KID } from "@/constants/areaData";
import { falar } from "@/utils/speech";

type Props = NativeStackScreenProps<RootStackParamList, "KidsEmocoes">;

export default function KidsEmocoesScreen({ navigation }: Props) {
  const [sel, setSel] = useState<string | null>(null);

  const escolher = (lbl: string) => {
    setSel(lbl);
    falar(`Eu estou ${lbl.toLowerCase()}`);
  };

  return (
    <AppShell
      nome={NOME_KID}
      bg={colors.emotionsBg}
      onSair={() => navigation.reset({ index: 0, routes: [{ name: "Inicial" }] })}
      navItens={[{ icon: "home", onPress: () => navigation.navigate("HomeKids") }]}
      onSOS={() => navigation.navigate("SOS")}
    >
      <SectionTitle color={colors.white}>Como você está se sentindo?</SectionTitle>
      <View style={styles.grid}>
        {EMOCOES.map((e) => (
          <Pressable
            key={e.lbl}
            style={({ pressed }) => [styles.cell, sel === e.lbl && styles.sel, pressed && { transform: [{ scale: 0.95 }] }]}
            onPress={() => escolher(e.lbl)}
          >
            <Text style={styles.emoji}>{e.emoji}</Text>
            <Text style={styles.label}>{e.lbl}</Text>
          </Pressable>
        ))}
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 18 },
  cell: {
    width: "47.5%", aspectRatio: 1 / 0.88, backgroundColor: colors.emotionBlue,
    borderWidth: 3, borderColor: colors.ink, borderRadius: 15,
    alignItems: "center", justifyContent: "center", gap: 6,
  },
  sel: { borderColor: colors.successText, borderWidth: 5 },
  emoji: { fontSize: 56, lineHeight: 62 },
  label: { fontFamily: fonts.happy, fontSize: 18, color: colors.ink },
});
