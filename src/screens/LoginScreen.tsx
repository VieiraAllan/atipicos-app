import React from "react";
import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, TITULOS_PERFIL } from "@/navigation/types";
import FormScreen from "@/components/FormScreen";
import { CAMPOS_LOGIN } from "@/constants/formData";
import * as auth from "@/services/auth";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation, route }: Props) {
  const { perfil } = route.params;

  const handleSubmit = async (v: Record<string, string>) => {
    if (!v.email || !v.senha) {
      Alert.alert("Atenção", "Preencha email e senha.");
      return;
    }
    try {
      await auth.login(v.email, v.senha);
      const destino =
        perfil === "atipico" ? "HomeKids" : perfil === "terapeuta" ? "HomeTerapeuta" : "HomeResponsavel";
      navigation.replace(destino);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível entrar. Verifique seus dados.");
    }
  };

  return (
    <FormScreen
      titulo={`Login ${TITULOS_PERFIL[perfil]}`}
      campos={CAMPOS_LOGIN}
      botao="ENTRAR"
      onBack={() => navigation.goBack()}
      onSubmit={handleSubmit}
      link={{ label: "Esqueci a senha", onPress: () => navigation.navigate("RecuperacaoSenha") }}
    />
  );
}
