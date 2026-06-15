import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import BackChip from "@/components/internas/BackChip";
import { falar } from "@/utils/speech";

type Props = NativeStackScreenProps<RootStackParamList, "Respiracao">;

const FASES = [
  { nome: "Inspire", escala: 1.45, cor: "#AEE3FF" },
  { nome: "Segure", escala: 1.45, cor: "#FFE08A" },
  { nome: "Expire", escala: 0.75, cor: "#B7F5A6" },
];
const SEG = 3; // segundos por fase

// Respiração guiada: cicla Inspire → Segure → Expire (3s cada), com voz,
// contagem regressiva e um círculo que cresce/encolhe.
export default function RespiracaoScreen({ navigation }: Props) {
  const [fase, setFase] = useState(0);
  const [seg, setSeg] = useState(SEG);
  const escala = useRef(new Animated.Value(0.75)).current;

  const animar = (idx: number) => {
    Animated.timing(escala, {
      toValue: FASES[idx].escala,
      duration: idx === 1 ? 200 : SEG * 1000, // "Segure" não anima
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    let idx = 0;
    falar(FASES[0].nome);
    animar(0);
    const id = setInterval(() => {
      setSeg((prev) => {
        if (prev <= 1) {
          idx = (idx + 1) % FASES.length;
          setFase(idx);
          falar(FASES[idx].nome);
          animar(idx);
          return SEG;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <BackChip onBack={() => navigation.goBack()} titulo="Respiração calmante" />
      <View style={styles.center}>
        <View style={styles.circleWrap}>
          <Animated.View style={[styles.circle, { backgroundColor: FASES[fase].cor, transform: [{ scale: escala }] }]} />
          <Text style={styles.contagem}>{seg}</Text>
        </View>
        <Text style={styles.fase}>{FASES[fase].nome}</Text>
        <Text style={styles.dica}>Siga o círculo com a sua respiração</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream, paddingHorizontal: 23 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 28 },
  circleWrap: { width: 220, height: 220, alignItems: "center", justifyContent: "center" },
  circle: { position: "absolute", width: 150, height: 150, borderRadius: 75, borderWidth: 3, borderColor: colors.ink },
  contagem: { fontFamily: fonts.quicksandBold, fontSize: 52, color: colors.ink },
  fase: { fontFamily: fonts.quicksandBold, fontSize: 30, color: colors.ink },
  dica: { fontFamily: fonts.quicksand, fontSize: 15, color: colors.muted, textAlign: "center" },
});
