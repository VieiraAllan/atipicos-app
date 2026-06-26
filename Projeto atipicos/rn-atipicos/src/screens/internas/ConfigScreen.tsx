import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell, { SectionTitle } from "@/components/internas/AppShell";
import { NavItem } from "@/components/internas/BottomNav";
import { CONFIG_ITENS } from "@/constants/areaData";

// Tela de configurações reutilizada por Responsável e Terapeuta.
// Cada item navega para a sua tela; "Sobre" ainda será montada.
export default function ConfigScreen({
  nome,
  navItens,
  navigation,
  onSair,
  onSOS,
  area,
}: {
  nome: string;
  navItens: NavItem[];
  navigation: any;
  onSair: () => void;
  onSOS?: () => void;
  area: "pais" | "terapeuta";
}) {
  const abrir = (rota?: string) => {
    if (!rota) return;
    if (rota === "Sobre") {
      navigation.navigate("Sobre", { area });
      return;
    }
    navigation.navigate(rota);
  };

  return (
    <AppShell nome={nome} onSair={onSair} navItens={navItens} onSOS={onSOS}>
      <SectionTitle>Configurações</SectionTitle>
      {CONFIG_ITENS.map((c, i) => (
        <Pressable
          key={i}
          style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
          onPress={() => abrir(c.rota)}
        >
          <Text style={styles.emoji}>{c.emoji}</Text>
          <View style={styles.body}>
            <Text style={styles.ti}>{c.ti}</Text>
            <Text style={styles.su}>{c.su}</Text>
          </View>
          <Text style={styles.go}>›</Text>
        </Pressable>
      ))}
      <Pressable style={({ pressed }) => [styles.item, pressed && styles.itemPressed]} onPress={onSair}>
        <Text style={styles.emoji}>🚪</Text>
        <View style={styles.body}><Text style={[styles.ti, { color: "#EB5757" }]}>Sair da conta</Text></View>
        <Text style={styles.go}>›</Text>
      </Pressable>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: colors.white, borderWidth: 3, borderColor: colors.ink, borderRadius: 14, padding: 14, marginBottom: 13 },
  itemPressed: { backgroundColor: colors.rowBgHover },
  emoji: { fontSize: 30 },
  body: { flex: 1 },
  ti: { fontFamily: fonts.quicksandBold, fontSize: 16, color: colors.ink },
  su: { fontFamily: fonts.quicksand, fontSize: 13, color: colors.muted },
  go: { fontSize: 20, color: colors.placeholder },
});
