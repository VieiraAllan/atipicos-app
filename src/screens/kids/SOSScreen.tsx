import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import PrimaryButton from "@/components/PrimaryButton";

type Props = NativeStackScreenProps<RootStackParamList, "SOS">;

// SOS — RF15 (localização enviada aos responsáveis).
export default function SOSScreen({ navigation }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.big}>🚨</Text>
      <Text style={styles.ttl}>SOS acionado!</Text>
      <Text style={styles.sub}>A localização da criança foi enviada aos responsáveis cadastrados.</Text>
      <PrimaryButton label="Voltar" variant="success" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.sos, alignItems: "center", justifyContent: "center", gap: 24, padding: 40 },
  big: { fontSize: 84 },
  ttl: { fontFamily: fonts.quicksandBold, fontSize: 30, color: colors.ink },
  sub: { fontFamily: fonts.quicksand, fontSize: 17, color: colors.ink, textAlign: "center", maxWidth: 280, lineHeight: 24 },
});
