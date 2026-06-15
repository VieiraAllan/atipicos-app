import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell from "@/components/internas/AppShell";
import BackChip from "@/components/internas/BackChip";
import { navPais } from "./HomeResponsavelScreen";
import { NOTICIAS, NOME_RESP } from "@/constants/areaData";

type Props = NativeStackScreenProps<RootStackParamList, "PaisNoticias">;

// RF19: informações sobre o TEA (real = NewsAPI).
export default function PaisNoticiasScreen({ navigation }: Props) {
  return (
    <AppShell
      nome={NOME_RESP}
      onSair={() => navigation.reset({ index: 0, routes: [{ name: "Inicial" }] })}
      navItens={navPais(navigation, "home")}
      onSOS={() => navigation.navigate("SOS")}
    >
      <BackChip onBack={() => navigation.goBack()} titulo="Informações sobre TEA" />
      {NOTICIAS.map((n, i) => (
        <View key={i} style={styles.news}>
          <View style={styles.img}><Text style={styles.imgEmoji}>{n.emoji}</Text></View>
          <View style={styles.body}>
            <Text style={styles.ti}>{n.ti}</Text>
            <Text style={styles.de}>{n.de}</Text>
            <Text style={styles.src}>{n.src}</Text>
          </View>
        </View>
      ))}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  news: { backgroundColor: colors.white, borderWidth: 3, borderColor: colors.ink, borderRadius: 14, overflow: "hidden", marginBottom: 16 },
  img: { height: 96, backgroundColor: "#ECE7DF", alignItems: "center", justifyContent: "center" },
  imgEmoji: { fontSize: 34 },
  body: { padding: 12 },
  ti: { fontFamily: fonts.quicksandBold, fontSize: 15, color: colors.ink },
  de: { fontFamily: fonts.quicksand, fontSize: 13, color: colors.muted, marginTop: 4, lineHeight: 18 },
  src: { fontFamily: fonts.inter, fontSize: 10, color: colors.placeholder, marginTop: 6 },
});
