import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/theme/colors";

export default function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Voltar"
      hitSlop={10}
      style={({ pressed }) => [styles.btn, pressed && { transform: [{ scale: 0.9 }] }]}
    >
      <Feather name="arrow-left" size={24} color={colors.cream} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    left: 16,
    top: 12,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 30,
  },
});
