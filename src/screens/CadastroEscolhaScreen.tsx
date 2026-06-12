import React from "react";
import { View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import ScreenContainer from "@/components/ScreenContainer";
import Logo from "@/components/Logo";
import PrimaryButton from "@/components/PrimaryButton";

type Props = NativeStackScreenProps<RootStackParamList, "CadastroEscolha">;

export default function CadastroEscolhaScreen({ navigation }: Props) {
  return (
    <ScreenContainer center onBack={() => navigation.goBack()}>
      <Logo width={244} />
      <View style={styles.stack}>
        <PrimaryButton label="Sou Responsável" size="lg" onPress={() => navigation.navigate("CadastroAdulto", { perfil: "responsavel" })} />
        <PrimaryButton label="Sou Terapeuta" size="lg" onPress={() => navigation.navigate("CadastroAdulto", { perfil: "terapeuta" })} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  stack: { gap: 24, marginTop: 64, alignItems: "center" },
});
