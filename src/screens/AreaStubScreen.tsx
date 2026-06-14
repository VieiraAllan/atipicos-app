import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import ScreenContainer from "@/components/ScreenContainer";
import Logo from "@/components/Logo";
import PrimaryButton from "@/components/PrimaryButton";
import * as auth from "@/services/auth";

type Props = NativeStackScreenProps<RootStackParamList, "Area">;

const INFO: Record<string, { titulo: string; emoji: string }> = {
  responsavel: { titulo: "Área do Responsável", emoji: "👪" },
  terapeuta: { titulo: "Área do Terapeuta", emoji: "🩺" },
  atipico: { titulo: "Área Kids", emoji: "🧩" },
};

export default function AreaStubScreen({ navigation, route }: Props) {
  const { perfil } = route.params;
  const info = INFO[perfil];

  const sair = async () => {
    await auth.sair();
    navigation.reset({ index: 0, routes: [{ name: "Inicial" }] });
  };

  return (
    <ScreenContainer center>
      <Logo width={150} />
      <View style={styles.badge}>
        <Text style={styles.emoji}>{info.emoji}</Text>
      </View>
      <Text style={styles.titulo}>{info.titulo}</Text>
      <Text style={styles.nota}>
        Login realizado com sucesso.{"\n"}Esta área será construída na Fase 4 (Plano B).
      </Text>
      <View style={styles.actions}>
        {perfil === "responsavel" && (
          <PrimaryButton label="Cadastrar criança" onPress={() => navigation.navigate("CadastroCrianca")} />
        )}
        <PrimaryButton label="Sair" onPress={sair} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 92,
    height: 92,
    borderRadius: 46,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(109,29,0,0.06)",
    borderWidth: 2,
    borderColor: "rgba(21,20,38,0.5)",
  },
  emoji: { fontSize: 44 },
  titulo: { fontFamily: fonts.quicksandBold, fontSize: 26, marginTop: 20, marginBottom: 8, color: colors.ink },
  nota: { fontFamily: fonts.quicksand, fontSize: 15, color: colors.muted, textAlign: "center", lineHeight: 22, maxWidth: 270 },
  actions: { gap: 16, marginTop: 34, alignItems: "center" },
});
