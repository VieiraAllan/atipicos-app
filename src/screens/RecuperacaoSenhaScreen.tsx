import React from "react";
import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import FormScreen from "@/components/FormScreen";
import { CAMPOS_RECUPERACAO } from "@/constants/formData";
import * as auth from "@/services/auth";

type Props = NativeStackScreenProps<RootStackParamList, "RecuperacaoSenha">;

export default function RecuperacaoSenhaScreen({ navigation }: Props) {
  const handleSubmit = async (v: Record<string, string>) => {
    if (v.novaSenha !== v.confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }
    if (!v.email || !v.respostaSeguranca) {
      Alert.alert("Atenção", "Preencha o email e a resposta de segurança.");
      return;
    }
    try {
      await auth.recuperarSenha(v.email, v.respostaSeguranca, v.novaSenha);
      navigation.replace("Sucesso", { tipo: "recuperacao" });
    } catch (e) {
      Alert.alert("Erro", "Não foi possível recuperar a senha.");
    }
  };

  return (
    <FormScreen
      titulo="Recuperação de Senha"
      tituloAlinhamento="center"
      campos={CAMPOS_RECUPERACAO}
      botao="CONFIRMAR"
      onBack={() => navigation.goBack()}
      onSubmit={handleSubmit}
    />
  );
}
