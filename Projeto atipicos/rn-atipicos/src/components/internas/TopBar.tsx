import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";

// Barra superior: sair + saudação (+ sino opcional).
export default function TopBar({
  nome,
  onSair,
  onSino,
}: {
  nome: string;
  onSair: () => void;
  onSino?: () => void;
}) {
  return (
    <View style={styles.bar}>
      <Pressable
        style={({ pressed }) => [styles.logout, pressed && { transform: [{ scale: 0.92 }] }]}
        onPress={onSair}
        accessibilityRole="button"
        accessibilityLabel="Sair"
      >
        <Feather name="log-out" size={20} color={colors.cream} />
      </Pressable>
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
  logout: {
    width: 42, height: 42, borderRadius: 10, backgroundColor: "#2C2C33",
    alignItems: "center", justifyContent: "center",
  },
  pill: {
    flex: 1, height: 54, borderRadius: 30, backgroundColor: colors.pill,
    borderWidth: 3, borderColor: colors.ink, justifyContent: "center", paddingHorizontal: 22,
  },
  pillText: { fontFamily: fonts.quicksandBold, fontSize: 18, color: colors.ink },
});
