import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle } from "react-native";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";

type Props = {
  label: string;
  onPress: () => void;
  variant?: "outline" | "success";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  style?: ViewStyle;
};

export default function PrimaryButton({ label, onPress, variant = "outline", size = "md", loading, style }: Props) {
  const sizeStyle = size === "lg" ? styles.lg : size === "sm" ? styles.sm : styles.md;
  const textSize = size === "lg" ? 20 : size === "sm" ? 14 : 17;
  return (
    <Pressable
      onPress={loading ? undefined : onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        sizeStyle,
        variant === "success" && styles.success,
        pressed && { transform: [{ scale: 0.96 }] },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.ink} />
      ) : (
        <Text style={[styles.label, { fontSize: textSize }]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.fieldBg,
    borderWidth: 2,
    borderColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },
  md: { height: 52, paddingHorizontal: 24, borderRadius: 16, minWidth: 180 },
  lg: { height: 62, paddingHorizontal: 24, borderRadius: 20, minWidth: 232 },
  sm: { height: 36, paddingHorizontal: 22, borderRadius: 8 },
  success: { backgroundColor: colors.successFill, borderColor: colors.successBorder },
  label: { fontFamily: fonts.quicksandBold, color: colors.ink },
});
