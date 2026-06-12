import React from "react";
import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import FormScreen from "@/components/FormScreen";
import { CAMPOS_CRIANCA } from "@/constants/formData";
import * as auth from "@/services/auth";
import type { DadosCadastroCrianca } from "@/services/auth";

type Props = NativeStackScreenProps<RootStackParamList, "CadastroCrianca">;

export default function CadastroCriancaScreen({ navigation }: Props) {
  const handleSubmit = async (v: Record<string, string>) => {
    if (v.senha !== v.confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }
    if (!v.nome || !v.diagnostico) {
      Alert.alert("Atenção", "Preencha nome e diagnóstico.");
      return;
    }
    try {
      await auth.cadastrarCrianca(v as unknown as DadosCadastroCrianca);
      navigation.replace("Sucesso", { tipo: "cadastro" });
    } catch (e) {
      Alert.alert("Erro", "Não foi possível cadastrar a criança.");
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
