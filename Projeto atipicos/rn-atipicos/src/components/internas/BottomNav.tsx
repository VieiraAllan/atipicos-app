import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";

export type NavItem = { icon: React.ComponentProps<typeof Feather>["name"]; ativo?: boolean; onPress: () => void };

// Barra de navegação inferior (+ botão SOS opcional).
export default function BottomNav({ itens, onSOS }: { itens: NavItem[]; onSOS?: () => void }) {
  return (
    <View style={styles.bar}>
      {itens.map((it, i) => (
        <Pressable
          key={i}
          onPress={it.onPress}
          style={({ pressed }) => [styles.btn, pressed && { transform: [{ scale: 0.88 }] }]}
        >
          <Feather name={it.icon} size={26} color={colors.ink} style={it.ativo ? styles.ativo : styles.inativo} />
        </Pressable>
      ))}
      {onSOS && (
        <Pressable
          onPress={onSOS}
          style={({ pressed }) => [styles.sos, pressed && { transform: [{ scale: 0.94 }] }]}
        >
          <Text style={styles.sosText}>SOS</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 74, backgroundColor: colors.navBar, borderTopWidth: 2, borderTopColor: colors.navBorder,
    flexDirection: "row", alignItems: "center", justifyContent: "space-around", paddingHorizontal: 24,
  },
  btn: { padding: 6 },
  ativo: { opacity: 1, transform: [{ scale: 1.12 }] },
  inativo: { opacity: 0.55 },
  sos: {
    minWidth: 78, height: 50, borderRadius: 30, backgroundColor: colors.sos,
    borderWidth: 3, borderColor: colors.ink, alignItems: "center", justifyContent: "center", paddingHorizontal: 14,
  },
  sosText: { fontFamily: fonts.quicksandBold, fontSize: 22, color: colors.ink },
});
