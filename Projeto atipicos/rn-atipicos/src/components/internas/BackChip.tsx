import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";

// Barra "voltar + título" usada nas sub-telas das áreas internas.
export default function BackChip({ onBack, titulo }: { onBack: () => void; titulo: string }) {
  return (
    <View style={styles.wrap}>
      <Pressable style={styles.btn} onPress={onBack}>
        <Text style={styles.btnText}>← Voltar</Text>
      </Pressable>
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 4, marginBottom: 14 },
  btn: { borderWidth: 2, borderColor: colors.ink, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: colors.fieldBg },
  btnText: { fontFamily: fonts.quicksandBold, fontSize: 13, color: colors.ink },
  titulo: { fontFamily: fonts.happy, fontSize: 18, color: colors.ink },
});
