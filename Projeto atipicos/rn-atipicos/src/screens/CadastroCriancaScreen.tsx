import React from "react";
import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import FormScreen from "@/components/FormScreen";
import { CAMPOS_CRIANCA } from "@/constants/formData";
import * as auth from "@/services/auth";
import type { DadosCadastroCrianca } from "@/services/auth";
import { validarCPF, emailValido } from "@/utils/validacao";
import { mensagemErroAuth } from "@/utils/erros";

type Props = NativeStackScreenProps<RootStackParamList, "CadastroCrianca">;

export default function CadastroCriancaScreen({ navigation }: Props) {
  const handleSubmit = async (v: Record<string, string>) => {
    if (!v.nome || !v.diagnostico) {
      Alert.alert("Atenção", "Preencha nome e diagnóstico.");
      return;
    }
    if (v.cpf && !validarCPF(v.cpf)) {
      Alert.alert("Atenção", "CPF inválido. Confira os números digitados.");
      return;
    }
    if (v.email && !emailValido(v.email)) {
      Alert.alert("Atenção", "Digite um e-mail válido.");
      return;
    }
    if (v.senha && v.senha.length < 6) {
      Alert.alert("Atenção", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (v.senha !== v.confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }
    try {
      await auth.cadastrarCrianca(v as unknown as DadosCadastroCrianca);
      Alert.alert("Tudo certo!", "Criança cadastrada com sucesso.");
      navigation.replace("Sucesso", { tipo: "cadastro" });
    } catch (e) {
      Alert.alert("Erro", mensagemErroAuth(e));
    }
  };

  return (
    <FormScreen
      titulo="Cadastro"
      tituloAlinhamento="center"
      campos={CAMPOS_CRIANCA}
      botao="CADASTRAR"
      onBack={() => navigation.goBack()}
      onSubmit={handleSubmit}
    />
  );
}
