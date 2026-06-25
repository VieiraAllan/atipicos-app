import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import { SectionTitle } from "@/components/internas/AppShell";
import KidsShell from "@/components/internas/KidsShell";
import { SIMBOLOS_AAC, Simbolo } from "@/constants/areaData";
import { falar } from "@/utils/speech";

type Props = NativeStackScreenProps<RootStackParamList, "KidsComunicacao">;

// Comunicação Alternativa e Aumentativa (CAA) — RF11/RF12/RF13.
export default function KidsComunicacaoScreen({ navigation }: Props) {
  const [frase, setFrase] = useState<Simbolo[]>([]);

  const add = (s: Simbolo) => {
    setFrase((f) => [...f, s]);
    falar(s.lbl);
  };
  const apagar = () => setFrase((f) => f.slice(0, -1));
  const limpar = () => setFrase([]);
  const dizer = () => {
    if (frase.length) falar(frase.map((s) => s.lbl).join(" "));
  };

  return (
    <KidsShell navigation={navigation}>
      <SectionTitle>Toque para falar</SectionTitle>

      <View style={styles.bar}>
        <View style={styles.sentence}>
          {frase.length === 0 ? (
            <Text style={styles.empty}>Monte sua frase…</Text>
          ) : (
            frase.map((s, i) => (
              <View key={i} style={styles.chip}>
                <Text style={styles.chipText}>{s.emoji} {s.lbl}</Text>
              </View>
            ))
          )}
        </View>
        <Pressable style={styles.speak} onPress={dizer} accessibilityLabel="Falar frase">
          <Text style={styles.speakIcon}>🔊</Text>
        </Pressable>
      </View>

      <View style={styles.tools}>
        <Pressable style={styles.tool} onPress={apagar}><Text style={styles.toolText}>⌫ Apagar</Text></Pressable>
        <Pressable style={styles.tool} onPress={limpar}><Text style={styles.toolText}>Limpar</Text></Pressable>
      </View>

      <View style={styles.grid}>
        {SIMBOLOS_AAC.map((s) => (
          <Pressable key={s.lbl} style={({ pressed }) => [styles.btn, pressed && { transform: [{ scale: 0.93 }] }]} onPress={() => add(s)}>
            <Text style={styles.btnEmoji}>{s.emoji}</Text>
            <Text style={styles.btnLabel}>{s.lbl}</Text>
          </Pressable>
        ))}
      </View>
    </KidsShell>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: colors.white, borderWidth: 3, borderColor: colors.ink, borderRadius: 14, padding: 10, minHeight: 66, marginBottom: 16 },
  sentence: { flex: 1, flexDirection: "row", flexWrap: "wrap", gap: 8, alignItems: "center", minHeight: 40 },
  empty: { fontFamily: fonts.quicksand, fontSize: 14, color: colors.placeholder },
  chip: { backgroundColor: colors.aacChip, borderWidth: 2, borderColor: colors.ink, borderRadius: 8, paddingVertical: 4, paddingHorizontal: 8 },
  chipText: { fontFamily: fonts.quicksandBold, fontSize: 15, color: colors.ink },
  speak: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.speakBtn, borderWidth: 3, borderColor: colors.ink, alignItems: "center", justifyContent: "center" },
  speakIcon: { fontSize: 22 },
  tools: { flexDirection: "row", justifyContent: "flex-end", gap: 10, marginBottom: 14 },
  tool: { backgroundColor: colors.white, borderWidth: 2, borderColor: colors.ink, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12 },
  toolText: { fontFamily: fonts.quicksandBold, fontSize: 13, color: colors.ink },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 12 },
  btn: { width: "31%", aspectRatio: 1, backgroundColor: colors.white, borderWidth: 3, borderColor: colors.ink, borderRadius: 14, alignItems: "center", justifyContent: "center", gap: 5 },
  btnEmoji: { fontSize: 36 },
  btnLabel: { fontFamily: fonts.quicksandBold, fontSize: 12, color: colors.ink },
});
