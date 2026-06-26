import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell, { SectionTitle } from "@/components/internas/AppShell";
import BackChip from "@/components/internas/BackChip";
import { Card } from "@/components/internas/widgets";
import { navPais } from "./HomeResponsavelScreen";
import { useApp } from "@/store/AppStore";

type Props = NativeStackScreenProps<RootStackParamList, "PaisControle">;

// Controle de uso: limite de tempo + categorias liberadas.
export default function PaisControleScreen({ navigation }: Props) {
  const { usuarioAtual, sair } = useApp();
  const [limite, setLimite] = useState(2);
  const [cats, setCats] = useState<Record<string, boolean>>({ Jogos: true, Vídeos: false, Educativos: true });
  const toggle = (k: string) => setCats((c) => ({ ...c, [k]: !c[k] }));
  const emojiCat = (k: string) => (k === "Jogos" ? "🎮" : k === "Vídeos" ? "📺" : "📚");

  return (
    <AppShell
      nome={usuarioAtual?.nome ?? "Responsável"}
      onSair={() => { sair(); navigation.reset({ index: 0, routes: [{ name: "Inicial" }] }); }}
      navItens={navPais(navigation, "home")}
    >
      <BackChip onBack={() => navigation.goBack()} titulo="Controle de Uso" />

      <Card title="Tempo de tela por dia">
        <Text style={styles.limite}>{limite}h</Text>
        <View style={styles.stepper}>
          <Pressable style={styles.stepBtn} onPress={() => setLimite((l) => Math.max(0, l - 0.5))}><Text style={styles.stepText}>−</Text></Pressable>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${(limite / 6) * 100}%` }]} />
          </View>
          <Pressable style={styles.stepBtn} onPress={() => setLimite((l) => Math.min(6, l + 0.5))}><Text style={styles.stepText}>＋</Text></Pressable>
        </View>
      </Card>

      <SectionTitle>Categorias liberadas</SectionTitle>
      {Object.keys(cats).map((k) => (
        <View key={k} style={styles.item}>
          <Text style={styles.emoji}>{emojiCat(k)}</Text>
          <Text style={styles.label}>{k}</Text>
          <Pressable style={[styles.toggle, cats[k] && styles.toggleOn]} onPress={() => toggle(k)}>
            <View style={[styles.knob, cats[k] && styles.knobOn]} />
          </Pressable>
        </View>
      ))}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  limite: { textAlign: "center", fontFamily: fonts.quicksandBold, fontSize: 28, color: colors.ink },
  stepper: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 8 },
  stepBtn: { width: 40, height: 40, borderRadius: 10, borderWidth: 2, borderColor: colors.ink, alignItems: "center", justifyContent: "center", backgroundColor: colors.fieldBg },
  stepText: { fontFamily: fonts.quicksandBold, fontSize: 22, color: colors.ink },
  track: { flex: 1, height: 10, borderRadius: 6, backgroundColor: "rgba(0,0,0,0.12)", overflow: "hidden" },
  fill: { height: "100%", backgroundColor: colors.fieldBorderFocus },
  item: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: colors.white, borderWidth: 3, borderColor: colors.ink, borderRadius: 14, padding: 14, marginBottom: 13 },
  emoji: { fontSize: 30 },
  label: { flex: 1, fontFamily: fonts.quicksandBold, fontSize: 16, color: colors.ink },
  toggle: { width: 52, height: 30, borderRadius: 20, borderWidth: 2.5, borderColor: colors.ink, backgroundColor: "#ddd", justifyContent: "center" },
  toggleOn: { backgroundColor: "#98FF98" },
  knob: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.ink, marginLeft: 2 },
  knobOn: { marginLeft: 24 },
});
