import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import TopBar from "./TopBar";
import BottomNav, { NavItem } from "./BottomNav";

// Casca padrão das telas internas: topo + corpo rolável + navegação inferior.
export default function AppShell({
  nome,
  onSair,
  onSino,
  navItens,
  onSOS,
  bg,
  children,
}: {
  nome: string;
  onSair: () => void;
  onSino?: () => void;
  navItens: NavItem[];
  onSOS?: () => void;
  bg?: string;
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView style={[styles.safe, bg ? { backgroundColor: bg } : null]} edges={["top", "bottom"]}>
      <TopBar nome={nome} onSair={onSair} onSino={onSino} />
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
      <BottomNav itens={navItens} onSOS={onSOS} />
    </SafeAreaView>
  );
}

// Título de seção (fonte Happy Monkey, fiel ao protótipo).
export function SectionTitle({ children, color }: { children: React.ReactNode; color?: string }) {
  return <Text style={[styles.h2, color ? { color } : null]}>{children}</Text>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  body: { paddingHorizontal: 23, paddingBottom: 24 },
  h2: { fontFamily: fonts.happy, fontSize: 18, color: colors.ink, marginTop: 6, marginBottom: 14 },
});
