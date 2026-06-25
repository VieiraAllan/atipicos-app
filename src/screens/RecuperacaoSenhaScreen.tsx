import React from "react";
import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import FormScreen from "@/components/FormScreen";
import { CAMPOS_RECUPERACAO } from "@/constants/formData";
import * as auth from "@/services/auth";
import { emailValido } from "@/utils/validacao";
import { mensagemErroAuth } from "@/utils/erros";

type Props = NativeStackScreenProps<RootStackParamList, "RecuperacaoSenha">;

export default function RecuperacaoSenhaScreen({ navigation }: Props) {
  const handleSubmit = async (v: Record<string, string>) => {
    if (!v.email || !v.respostaSeguranca) {
      Alert.alert("Atenção", "Preencha o email e a resposta de segurança.");
      return;
    }
    if (!emailValido(v.email)) {
      Alert.alert("Atenção", "Digite um e-mail válido.");
      return;
    }
    if (v.novaSenha && v.novaSenha.length < 6) {
      Alert.alert("Atenção", "A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (v.novaSenha !== v.confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }
    try {
      await auth.recuperarSenha(v.email, v.respostaSeguranca, v.novaSenha);
      Alert.alert("Pronto!", "Se o e-mail existir, enviamos as instruções de recuperação.");
      navigation.replace("Sucesso", { tipo: "recuperacao" });
    } catch (e) {
      Alert.alert("Erro", mensagemErroAuth(e));
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
