import React from "react";
import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import FormScreen from "@/components/FormScreen";
import { CAMPOS_ADULTO } from "@/constants/formData";
import * as auth from "@/services/auth";
import type { DadosCadastroAdulto } from "@/services/auth";

type Props = NativeStackScreenProps<RootStackParamList, "CadastroAdulto">;

export default function CadastroAdultoScreen({ navigation, route }: Props) {
  const { perfil } = route.params;

  const handleSubmit = async (v: Record<string, string>) => {
    if (v.senha !== v.confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }
    const obrigatorios = ["nome", "cpf", "email", "senha"];
    if (obrigatorios.some((k) => !v[k])) {
      Alert.alert("Atenção", "Preencha os campos obrigatórios.");
      return;
    }
    try {
      await auth.cadastrarAdulto(perfil, v as unknown as DadosCadastroAdulto);
      navigation.replace("Sucesso", { tipo: "cadastro" });
    } catch (e) {
      Alert.alert("Erro", "Não foi possível concluir o cadastro.");
    }
  };

  return (
    <FormScreen
      titulo="Cadastro"
      tituloAlinhamento="center"
      campos={CAMPOS_ADULTO}
      botao="CADASTRAR"
      onBack={() => navigation.goBack()}
      onSubmit={handleSubmit}
    />
  );
}
