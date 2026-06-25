import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import ScreenContainer from "@/components/ScreenContainer";
import Logo from "@/components/Logo";
import PrimaryButton from "@/components/PrimaryButton";
import { useApp } from "@/store/AppStore";

type Props = NativeStackScreenProps<RootStackParamList, "Inicial">;

export default function InicialScreen({ navigation }: Props) {
  const { modo } = useApp();
  const firebase = modo === "firebase";

  return (
    <ScreenContainer center>
      <Logo width={250} />
      <View style={styles.stack}>
        <PrimaryButton label="Log in Atípico" size="lg" onPress={() => navigation.navigate("Login", { perfil: "atipico" })} />
        <PrimaryButton label="Log in Responsável" size="lg" onPress={() => navigation.navigate("Login", { perfil: "responsavel" })} />
        <PrimaryButton label="Log in Terapeuta" size="lg" onPress={() => navigation.navigate("Login", { perfil: "terapeuta" })} />
      </View>
      <PrimaryButton label="Criar Conta" size="sm" style={styles.criar} onPress={() => navigation.navigate("CadastroEscolha")} />

      {/* Indicador de modo — mostra se a sincronização em nuvem está ativa */}
      <View style={[styles.badge, firebase ? styles.badgeOn : styles.badgeOff]}>
        <Text style={styles.badgeText}>
          {firebase ? "☁️ Sincronização Firebase ativa" : "📴 Modo local (sem .env / offline)"}
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  stack: { gap: 24, marginTop: 50, alignItems: "center" },
  criar: { marginTop: 26 },
  badge: { marginTop: 30, paddingVertical: 7, paddingHorizontal: 16, borderRadius: 20, borderWidth: 2 },
  badgeOn: { backgroundColor: "rgba(31,138,91,0.12)", borderColor: colors.online },
  badgeOff: { backgroundColor: "rgba(109,29,0,0.08)", borderColor: colors.muted },
  badgeText: { fontFamily: fonts.quicksandBold, fontSize: 12.5, color: colors.ink },
});
