import React from "react";
import { ScrollView, Pressable, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import { Crianca } from "@/store/AppStore";

// Chips horizontais para escolher entre as crianças (quando há mais de uma).
export default function SeletorCrianca({
  criancas,
  selecionada,
  onSelecionar,
}: {
  criancas: Crianca[];
  selecionada: string | null;
  onSelecionar: (id: string) => void;
}) {
  if (criancas.length <= 1) return null;
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {criancas.map((c) => {
        const on = c.id === selecionada;
        return (
          <Pressable key={c.id} style={[styles.chip, on && styles.chipOn]} onPress={() => onSelecionar(c.id)}>
            <Text style={[styles.txt, on && styles.txtOn]}>🧒 {c.nome}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 8, paddingBottom: 12 },
  chip: { borderWidth: 2, borderColor: colors.ink, borderRadius: 20, paddingVertical: 7, paddingHorizontal: 14, backgroundColor: colors.white },
  chipOn: { backgroundColor: colors.pill, borderWidth: 3 },
  txt: { fontFamily: fonts.quicksandSemi, fontSize: 14, color: colors.ink },
  txtOn: { fontFamily: fonts.quicksandBold },
});
