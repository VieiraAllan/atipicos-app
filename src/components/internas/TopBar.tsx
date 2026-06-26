import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";

// Barra superior: saudação (+ sino opcional). O logout fica em Configurações.
export default function TopBar({
  nome,
  onSino,
}: {
  nome: string;
  onSair?: () => void;
  onSino?: () => void;
}) {
  return (
    <View style={styles.bar}>
      <View style={styles.pill}>
        <Text style={styles.pillText} numberOfLines={1}>Olá, {nome}</Text>
      </View>
      {onSino && (
        <Pressable onPress={onSino} hitSlop={8} accessibilityLabel="Notificações">
          <Feather name="bell" size={26} color={colors.ink} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: "row", alignItems: "center", gap: 14, paddingHorizontal: 18, paddingTop: 8, paddingBottom: 16 },
  pill: {
    flex: 1, height: 54, borderRadius: 30, backgroundColor: colors.pill,
    borderWidth: 3, borderColor: colors.ink, justifyContent: "center", paddingHorizontal: 22,
  },
  pillText: { fontFamily: fonts.quicksandBold, fontSize: 18, color: colors.ink },
});
