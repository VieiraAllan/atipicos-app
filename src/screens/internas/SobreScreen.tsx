import React from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell, { SectionTitle } from "@/components/internas/AppShell";
import BackChip from "@/components/internas/BackChip";
import { navPais } from "@/screens/pais/HomeResponsavelScreen";
import { navTerapeuta } from "@/screens/terapeuta/HomeTerapeutaScreen";
import { useApp } from "@/store/AppStore";
import { EQUIPE, MISSAO } from "@/constants/equipe";

type Props = NativeStackScreenProps<RootStackParamList, "Sobre">;

// Dimensões fixas dos cards (largura em % aninhada no ScrollView não resolve
// de forma confiável no RN; calculamos a partir da largura da tela).
const GAP = 16;
const PAD_H = 23; // = paddingHorizontal do corpo do AppShell
const CARD_W = (Dimensions.get("window").width - PAD_H * 2 - GAP) / 2;
const IMG = CARD_W - 20; // - padding interno do card (10 + 10)

// Tela "Sobre o app": missão do projeto + grade da equipe (foto + nome).
// Acessada pelo item "Sobre" das Configurações (Responsável e Terapeuta).
export default function SobreScreen({ route, navigation }: Props) {
  const { usuarioAtual, sair } = useApp();
  const ehPais = route.params?.area === "pais";

  const logout = () => { sair(); navigation.reset({ index: 0, routes: [{ name: "Inicial" }] }); };
  const navItens = ehPais ? navPais(navigation, "cfg") : navTerapeuta(navigation, "cfg");

  return (
    <AppShell
      nome={usuarioAtual?.nome ?? (ehPais ? "Responsável" : "Terapeuta")}
      onSair={logout}
      navItens={navItens}
    >
      <BackChip onBack={() => navigation.goBack()} titulo="Sobre o app" />

      <View style={styles.missao}>
        <View style={styles.missaoHead}>
          <View style={styles.missaoIc}><Text style={styles.missaoEmoji}>💛</Text></View>
          <Text style={styles.missaoTitulo}>Nossa missão</Text>
        </View>
        <Text style={styles.missaoTexto}>{MISSAO}</Text>
      </View>

      <SectionTitle>Nossa equipe</SectionTitle>

      <View style={styles.grade}>
        {EQUIPE.map((m, i) => (
          <View key={i} style={[styles.card, { width: CARD_W, backgroundColor: m.cor }]}>
            <Image source={m.foto} style={[styles.foto, { width: IMG, height: IMG }]} resizeMode="cover" />
            <Text style={styles.nome}>{m.nome}</Text>
          </View>
        ))}
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  missao: { backgroundColor: colors.white, borderWidth: 3, borderColor: colors.ink, borderRadius: 16, padding: 18, marginBottom: 24 },
  missaoHead: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  missaoIc: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.navBar, borderWidth: 2.5, borderColor: colors.ink, alignItems: "center", justifyContent: "center" },
  missaoEmoji: { fontSize: 20 },
  missaoTitulo: { fontFamily: fonts.happy, fontSize: 17, color: colors.ink },
  missaoTexto: { fontFamily: fonts.quicksand, fontSize: 14.5, lineHeight: 22, color: "#3A3942" },

  grade: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: { borderWidth: 3, borderColor: colors.ink, borderRadius: 14, padding: 10, marginBottom: 16, alignItems: "center" },
  foto: { borderWidth: 2.5, borderColor: colors.ink, borderRadius: 10, backgroundColor: "#ECE7DF" },
  nome: { fontFamily: fonts.quicksandBold, fontSize: 15, color: colors.ink, textAlign: "center", marginTop: 9, lineHeight: 18 },
});
