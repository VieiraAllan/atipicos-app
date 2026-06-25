import React, { useMemo } from "react";
import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import FormScreen from "@/components/FormScreen";
import { CAMPOS_CRIANCA } from "@/constants/formData";
import { FieldConfig } from "@/constants/formData";
import { validarCPF, emailValido } from "@/utils/validacao";
import { mensagemErroAuth } from "@/utils/erros";
import { useApp } from "@/store/AppStore";

type Props = NativeStackScreenProps<RootStackParamList, "CadastroCrianca">;

const SEM_TERAPEUTA = "Sem terapeuta por enquanto";

export default function CadastroCriancaScreen({ navigation }: Props) {
  const { adicionarCrianca, terapeutas } = useApp();
  const listaTerapeutas = terapeutas();

  // Campos = os padrões + um seletor de terapeuta (atrela a criança a um profissional).
  const campos: FieldConfig[] = useMemo(() => {
    const opcoes = [SEM_TERAPEUTA, ...listaTerapeutas.map((t) => t.nome)];
    return [
      ...CAMPOS_CRIANCA,
      { key: "terapeuta", icon: "activity", placeholder: "Terapeuta responsável", kind: "select", options: opcoes },
    ];
  }, [listaTerapeutas]);

  const handleSubmit = async (v: Record<string, string>) => {
    if (!v.nome || !v.diagnostico) {
      Alert.alert("Atenção", "Preencha nome e diagnóstico.");
      return;
    }
    if (v.cpf && !validarCPF(v.cpf)) {
      Alert.alert("Atenção", "CPF inválido. Confira os números digitados.");
      return;
    }
    if (!v.email || !emailValido(v.email)) {
      Alert.alert("Atenção", "Informe um e-mail válido (será o login da criança).");
      return;
    }
    if (!v.senha || v.senha.length < 6) {
      Alert.alert("Atenção", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (v.senha !== v.confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }

    const terapeuta = listaTerapeutas.find((t) => t.nome === v.terapeuta);
    try {
      await adicionarCrianca({
        nome: v.nome,
        diagnostico: v.diagnostico,
        email: v.email,
        senha: v.senha,
        cpf: v.cpf,
        dataNascimento: v.dataNascimento,
        terapeutaId: terapeuta ? terapeuta.uid : null,
      });
      Alert.alert(
        "Criança cadastrada!",
        terapeuta
          ? `Vinculada a ${terapeuta.nome}. A criança entra pelo "Log in Atípico" com o e-mail e senha cadastrados.`
          : `A criança entra pelo "Log in Atípico" com o e-mail e senha cadastrados.`
      );
      navigation.goBack();
    } catch (e) {
      Alert.alert("Erro", mensagemErroAuth(e));
    }
  };

  return (
    <FormScreen
      titulo="Cadastro da Criança"
      tituloAlinhamento="center"
      campos={campos}
      botao="CADASTRAR"
      onBack={() => navigation.goBack()}
      onSubmit={handleSubmit}
    />
  );
}
