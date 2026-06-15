import React from "react";
import { Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import ScreenContainer from "@/components/ScreenContainer";
import Logo from "@/components/Logo";
import PrimaryButton from "@/components/PrimaryButton";

type Props = NativeStackScreenProps<RootStackParamList, "Sucesso">;

const MENSAGENS = {
  cadastro: "Cadastro realizado com sucesso!",
  recuperacao: "Recuperação de senha realizada com sucesso!",
};

export default function SucessoScreen({ navigation, route }: Props) {
  const { tipo } = route.params;
  return (
    <ScreenContainer center>
      <Logo width={230} />
      <Text style={styles.msg}>{MENSAGENS[tipo]}</Text>
      <PrimaryButton
        label="Ir para Log in"
        variant="success"
        onPress={() => navigation.reset({ index: 0, routes: [{ name: "Inicial" }] })}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  msg: {
    fontFamily: fonts.quicksandBold,
    fontSize: 24,
    textAlign: "center",
    color: colors.successText,
    maxWidth: 268,
    lineHeight: 31,
    marginTop: 52,
    marginBottom: 42,
  },
});
