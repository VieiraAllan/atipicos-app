import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell from "@/components/internas/AppShell";
import { CARDS_KIDS, NOME_KID } from "@/constants/areaData";

type Props = NativeStackScreenProps<RootStackParamList, "HomeKids">;

export default function HomeKidsScreen({ navigation }: Props) {
  return (
    <AppShell
      nome={NOME_KID}
      onSair={() => navigation.reset({ index: 0, routes: [{ name: "Inicial" }] })}
      navItens={[{ icon: "home", ativo: true, onPress: () => {} }]}
      onSOS={() => navigation.navigate("SOS")}
    >
      <View style={styles.grid}>
        {CARDS_KIDS.map((c) => (
          <Pressable
            key={c.label}
            style={({ pressed }) => [styles.card, { backgroundColor: c.bg }, pressed && { transform: [{ scale: 0.96 }] }]}
            onPress={() => navigation.navigate(c.rota as keyof RootStackParamList as any)}
          >
            <Text style={styles.emoji}>{c.emoji}</Text>
            <Text style={styles.label}>{c.label}</Text>
          </Pressable>
        ))}
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 18, marginTop: 8 },
  card: {
    width: "47.5%", aspectRatio: 1 / 0.92, borderRadius: 15, borderWidth: 3, borderColor: colors.ink,
    alignItems: "center", justifyContent: "center", gap: 8, padding: 8,
  },
  emoji: { fontSize: 54, lineHeight: 60 },
  label: { fontFamily: fonts.happy, fontSize: 17, color: colors.ink, textAlign: "center" },
});
