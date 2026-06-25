import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import KidsShell from "@/components/internas/KidsShell";
import BackChip from "@/components/internas/BackChip";
import { CATALOGO, ItemAtividade } from "@/constants/atividades";
import { falar } from "@/utils/speech";

type Props = NativeStackScreenProps<RootStackParamList, "AtividadeGrade">;

const LARGURA: Record<number, string> = { 1: "100%", 2: "47.5%", 3: "31%", 4: "22.5%", 5: "18%" };

// Grade genérica de botões que falam ao toque (sílabas, animais, letras,
// números, cores, formas, músicas). Definida pelo id em constants/atividades.
export default function AtividadeGradeScreen({ navigation, route }: Props) {
  const atividade = CATALOGO[route.params.id];
  if (!atividade) return null;
  const largura = LARGURA[atividade.colunas] ?? "31%";

  return (
    <KidsShell navigation={navigation}>
      <BackChip onBack={() => navigation.goBack()} titulo={atividade.titulo} />
      <View style={styles.grid}>
        {atividade.itens.map((item, i) => (
          <Botao key={i} item={item} largura={largura} alto={atividade.colunas === 1} />
        ))}
      </View>
    </KidsShell>
  );
}

function Botao({ item, largura, alto }: { item: ItemAtividade; largura: string; alto?: boolean }) {
  return (
    <Pressable
      onPress={() => falar(item.fala)}
      style={({ pressed }) => [
        styles.btn,
        { width: largura as any },
        alto ? styles.btnLinha : styles.btnQuadrado,
        pressed && { transform: [{ scale: 0.94 }] },
      ]}
    >
      {item.cor ? (
        <View style={[styles.swatch, { backgroundColor: item.cor }]} />
      ) : item.texto ? (
        <Text style={styles.texto}>{item.texto}</Text>
      ) : (
        <Text style={styles.emoji}>{item.emoji}</Text>
      )}
      {item.label && <Text style={styles.label}>{item.label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 14 },
  btn: {
    backgroundColor: colors.white, borderWidth: 3, borderColor: colors.ink, borderRadius: 14,
    alignItems: "center", justifyContent: "center", gap: 6, padding: 8,
  },
  btnQuadrado: { aspectRatio: 1 },
  btnLinha: { flexDirection: "row", paddingVertical: 16, gap: 14, justifyContent: "flex-start", paddingHorizontal: 18 },
  texto: { fontFamily: fonts.quicksandBold, fontSize: 30, color: colors.ink },
  emoji: { fontSize: 44 },
  swatch: { width: 56, height: 56, borderRadius: 12, borderWidth: 2, borderColor: colors.ink },
  label: { fontFamily: fonts.quicksandBold, fontSize: 14, color: colors.ink, textAlign: "center" },
});
