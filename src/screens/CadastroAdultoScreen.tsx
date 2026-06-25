import React from "react";
import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import FormScreen from "@/components/FormScreen";
import { CAMPOS_ADULTO } from "@/constants/formData";
import { validarCPF, emailValido } from "@/utils/validacao";
import { mensagemErroAuth } from "@/utils/erros";
import { useApp } from "@/store/AppStore";

type Props = NativeStackScreenProps<RootStackParamList, "CadastroAdulto">;

export default function CadastroAdultoScreen({ navigation, route }: Props) {
  const { perfil } = route.params;
  const { registrar } = useApp();

  const handleSubmit = async (v: Record<string, string>) => {
    const obrigatorios = ["nome", "cpf", "email", "senha", "confirmarSenha"];
    if (obrigatorios.some((k) => !v[k])) {
      Alert.alert("Atenção", "Preencha os campos obrigatórios.");
      return;
    }
    if (!emailValido(v.email)) {
      Alert.alert("Atenção", "Digite um e-mail válido.");
      return;
    }
    if (!validarCPF(v.cpf)) {
      Alert.alert("Atenção", "CPF inválido. Confira os números digitados.");
      return;
    }
    if (v.senha.length < 6) {
      Alert.alert("Atenção", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (v.senha !== v.confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }
    try {
      // cria a conta (local ou Firebase, conforme o .env) com o perfil correto
      await registrar(perfil, { nome: v.nome, email: v.email, senha: v.senha, cpf: v.cpf });
      Alert.alert("Tudo certo!", "Cadastro realizado com sucesso. Agora é só fazer login.");
      navigation.replace("Sucesso", { tipo: "cadastro" });
    } catch (e) {
      Alert.alert("Erro", mensagemErroAuth(e));
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
