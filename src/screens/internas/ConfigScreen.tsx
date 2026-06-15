import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell, { SectionTitle } from "@/components/internas/AppShell";
import { NavItem } from "@/components/internas/BottomNav";
import { CONFIG_ITENS } from "@/constants/areaData";

// Tela de configurações reutilizada por Responsável e Terapeuta.
export default function ConfigScreen({
  nome,
  navItens,
  onSair,
  onSOS,
}: {
  nome: string;
  navItens: NavItem[];
  onSair: () => void;
  onSOS?: () => void;
}) {
  return (
    <AppShell nome={nome} onSair={onSair} navItens={navItens} onSOS={onSOS}>
      <SectionTitle>Configurações</SectionTitle>
      {CONFIG_ITENS.map((c, i) => (
        <View key={i} style={styles.item}>
          <Text style={styles.emoji}>{c.emoji}</Text>
          <View style={styles.body}>
            <Text style={styles.ti}>{c.ti}</Text>
            <Text style={styles.su}>{c.su}</Text>
          </View>
          <Text style={styles.go}>›</Text>
        </View>
      ))}
      <Pressable style={styles.item} onPress={onSair}>
        <Text style={styles.emoji}>🚪</Text>
        <View style={styles.body}><Text style={[styles.ti, { color: "#EB5757" }]}>Sair da conta</Text></View>
        <Text style={styles.go}>›</Text>
      </Pressable>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: colors.white, borderWidth: 3, borderColor: colors.ink, borderRadius: 14, padding: 14, marginBottom: 13 },
  emoji: { fontSize: 30 },
  body: { flex: 1 },
  ti: { fontFamily: fonts.quicksandBold, fontSize: 16, color: colors.ink },
  su: { fontFamily: fonts.quicksand, fontSize: 13, color: colors.muted },
  go: { fontSize: 20, color: colors.placeholder },
});
