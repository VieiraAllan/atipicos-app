import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import { SafeAreaView } from "react-native-safe-area-context";
import BackChip from "@/components/internas/BackChip";
import PrimaryButton from "@/components/PrimaryButton";
import { useApp } from "@/store/AppStore";
import { mensagemErroAuth } from "@/utils/erros";

type Props = NativeStackScreenProps<RootStackParamList, "TrocarSenha">;

// Privacidade e segurança: troca de senha real (reautentica no Firebase).
export default function TrocarSenhaScreen({ navigation }: Props) {
  const { trocarSenha } = useApp();
  const [atual, setAtual] = useState("");
  const [nova, setNova] = useState("");
  const [conf, setConf] = useState("");
  const [salvando, setSalvando] = useState(false);

  const salvar = async () => {
    if (!atual || !nova) { Alert.alert("Atenção", "Preencha a senha atual e a nova senha."); return; }
    if (nova.length < 6) { Alert.alert("Atenção", "A nova senha deve ter pelo menos 6 caracteres."); return; }
    if (nova !== conf) { Alert.alert("Atenção", "A confirmação não coincide com a nova senha."); return; }
    if (nova === atual) { Alert.alert("Atenção", "A nova senha deve ser diferente da atual."); return; }

    setSalvando(true);
    try {
      await trocarSenha(atual, nova);
      Alert.alert("Pronto!", "Sua senha foi alterada com sucesso.");
      navigation.goBack();
    } catch (e) {
      Alert.alert("Erro", mensagemErroAuth(e));
    } finally {
      setSalvando(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <BackChip onBack={() => navigation.goBack()} titulo="Privacidade e segurança" />
      <Text style={styles.titulo}>Trocar senha</Text>

      <Campo rotulo="Senha atual" valor={atual} onChange={setAtual} placeholder="Sua senha atual" />
      <Campo rotulo="Nova senha" valor={nova} onChange={setNova} placeholder="Mínimo 6 caracteres" />
      <Campo rotulo="Confirmar nova senha" valor={conf} onChange={setConf} placeholder="Repita a nova senha" />

      <View style={{ height: 26 }} />
      {salvando ? (
        <ActivityIndicator color={colors.ink} />
      ) : (
        <PrimaryButton label="Salvar nova senha" onPress={salvar} />
      )}
    </SafeAreaView>
  );
}

function Campo({ rotulo, valor, onChange, placeholder }: { rotulo: string; valor: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <View style={styles.grupo}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        secureTextEntry
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream, paddingHorizontal: 23 },
  titulo: { fontFamily: fonts.quicksandBold, fontSize: 20, color: colors.ink, marginBottom: 18 },
  grupo: { marginBottom: 14 },
  rotulo: { fontFamily: fonts.quicksandSemi, fontSize: 13, color: colors.muted, marginBottom: 6 },
  input: { borderWidth: 2, borderColor: colors.ink, borderRadius: 12, paddingHorizontal: 14, height: 48, backgroundColor: colors.white, fontFamily: fonts.quicksand, fontSize: 15, color: colors.text },
});
