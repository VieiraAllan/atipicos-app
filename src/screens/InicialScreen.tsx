import React from "react";
import { View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import ScreenContainer from "@/components/ScreenContainer";
import Logo from "@/components/Logo";
import PrimaryButton from "@/components/PrimaryButton";

type Props = NativeStackScreenProps<RootStackParamList, "Inicial">;

export default function InicialScreen({ navigation }: Props) {
  return (
    <ScreenContainer center>
      <Logo width={250} />
      <View style={styles.stack}>
        <PrimaryButton label="Log in Atípico" size="lg" onPress={() => navigation.navigate("Login", { perfil: "atipico" })} />
        <PrimaryButton label="Log in Responsável" size="lg" onPress={() => navigation.navigate("Login", { perfil: "responsavel" })} />
        <PrimaryButton label="Log in Terapeuta" size="lg" onPress={() => navigation.navigate("Login", { perfil: "terapeuta" })} />
      </View>
      <PrimaryButton label="Criar Conta" size="sm" style={styles.criar} onPress={() => navigation.navigate("CadastroEscolha")} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  stack: { gap: 24, marginTop: 50, alignItems: "center" },
  criar: { marginTop: 26 },
});
