import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell from "@/components/internas/AppShell";
import BackChip from "@/components/internas/BackChip";
import { Card, MapBox } from "@/components/internas/widgets";
import { navPais } from "./HomeResponsavelScreen";
import { NOME_RESP } from "@/constants/areaData";

type Props = NativeStackScreenProps<RootStackParamList, "PaisLocalizacao">;

// RF14/RF15: localização da criança (mapa real = OpenStreetMap).
export default function PaisLocalizacaoScreen({ navigation }: Props) {
  return (
    <AppShell
      nome={NOME_RESP}
      onSair={() => navigation.reset({ index: 0, routes: [{ name: "Inicial" }] })}
      navItens={navPais(navigation, "home")}
      onSOS={() => navigation.navigate("SOS")}
    >
      <BackChip onBack={() => navigation.goBack()} titulo="Localização" />
      <Card>
        <View style={{ margin: -14 }}><MapBox height={320} /></View>
      </Card>
      <Text style={styles.info}>Última atualização há 4 minutos{"\n"}Av. Cesário de Melo — Rio de Janeiro</Text>
      <Pressable style={styles.sos} onPress={() => navigation.navigate("SOS")}>
        <Text style={styles.sosText}>SOS — Acionar emergência</Text>
      </Pressable>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  info: { fontFamily: fonts.quicksandSemi, fontSize: 15, color: colors.ink, textAlign: "center", marginBottom: 16, lineHeight: 22 },
  sos: { backgroundColor: colors.sos, borderWidth: 3, borderColor: colors.ink, borderRadius: 30, height: 54, alignItems: "center", justifyContent: "center" },
  sosText: { fontFamily: fonts.quicksandBold, fontSize: 18, color: colors.ink },
});
