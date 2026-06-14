import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";

// Card branco com título opcional (área de pais/terapeuta).
export function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      {title && <Text style={styles.cardTitle}>{title}</Text>}
      <View style={styles.cardBody}>{children}</View>
    </View>
  );
}

// Mapa placeholder (a implementação real usa OpenStreetMap — RF14/RF15).
export function MapBox({ height = 158 }: { height?: number }) {
  return (
    <View style={[styles.map, { height }]}>
      <Text style={styles.pin}>📍</Text>
      <Text style={styles.osm}>© OpenStreetMap</Text>
    </View>
  );
}

// Mini gráfico de barras (evolução — RF16/RF22).
export function Bars({ valores }: { valores: number[] }) {
  return (
    <View style={styles.bars}>
      {valores.map((v, i) => (
        <View key={i} style={{ width: 13, height: `${v}%`, borderRadius: 3, borderWidth: 1, borderColor: colors.ink, backgroundColor: colors.chart[i % colors.chart.length] }} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: 15, borderWidth: 3, borderColor: colors.cardBorder, overflow: "hidden", marginBottom: 18 },
  cardTitle: { fontFamily: fonts.happy, fontSize: 15, textAlign: "center", padding: 9, color: colors.ink, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.15)" },
  cardBody: { padding: 14 },
  map: { backgroundColor: colors.mapGrid, alignItems: "center", justifyContent: "center", borderRadius: 6 },
  pin: { fontSize: 34 },
  osm: { position: "absolute", bottom: 6, right: 8, fontFamily: fonts.inter, fontSize: 9, color: colors.placeholder },
  bars: { flexDirection: "row", alignItems: "flex-end", justifyContent: "center", gap: 7, height: 56 },
});
