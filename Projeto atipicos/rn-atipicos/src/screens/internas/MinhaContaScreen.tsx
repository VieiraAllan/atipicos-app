import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import { SafeAreaView } from "react-native-safe-area-context";
import BackChip from "@/components/internas/BackChip";
import { useApp } from "@/store/AppStore";

type Props = NativeStackScreenProps<RootStackParamList, "MinhaConta">;

const PERFIL_LABEL: Record<string, string> = {
  responsavel: "Responsável",
  terapeuta: "Terapeuta",
  atipico: "Criança (Atípico)",
};

// "Minha conta": mostra os dados cadastrados. Campos secretos (senha,
// resposta de segurança) nunca são exibidos.
export default function MinhaContaScreen({ navigation }: Props) {
  const { usuarioAtual, criancaPorId } = useApp();
  const u = usuarioAtual;
  const crianca = u?.criancaId ? criancaPorId(u.criancaId) : undefined;

  const linhas: { rotulo: string; valor?: string }[] = [
    { rotulo: "Nome", valor: u?.nome },
    { rotulo: "E-mail", valor: u?.email },
    { rotulo: "Perfil", valor: u ? PERFIL_LABEL[u.perfil] : undefined },
    { rotulo: "CPF", valor: u?.cpf },
  ];
  if (crianca) {
    linhas.push({ rotulo: "Diagnóstico", valor: crianca.diagnostico });
    if (crianca.dataNascimento) linhas.push({ rotulo: "Nascimento", valor: crianca.dataNascimento });
  }

  const iniciais = (u?.nome ?? "?")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <BackChip onBack={() => navigation.goBack()} titulo="Minha conta" />
      <View style={styles.avatar}><Text style={styles.avatarTxt}>{iniciais}</Text></View>

      <View style={styles.card}>
        {linhas.filter((l) => l.valor).map((l, i, arr) => (
          <View key={l.rotulo} style={[styles.linha, i < arr.length - 1 && styles.divisor]}>
            <Text style={styles.rotulo}>{l.rotulo}</Text>
            <Text style={styles.valor}>{l.valor}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.nota}>
        Por segurança, sua senha e resposta de segurança não são exibidas.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream, paddingHorizontal: 23 },
  avatar: { alignSelf: "center", width: 84, height: 84, borderRadius: 42, backgroundColor: colors.pill, borderWidth: 3, borderColor: colors.ink, alignItems: "center", justifyContent: "center", marginTop: 6, marginBottom: 22 },
  avatarTxt: { fontFamily: fonts.quicksandBold, fontSize: 30, color: colors.ink },
  card: { backgroundColor: colors.white, borderWidth: 3, borderColor: colors.ink, borderRadius: 16, paddingHorizontal: 16 },
  linha: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 15, gap: 16 },
  divisor: { borderBottomWidth: 1.5, borderBottomColor: "rgba(21,20,38,0.10)" },
  rotulo: { fontFamily: fonts.quicksandSemi, fontSize: 14, color: colors.muted },
  valor: { flex: 1, textAlign: "right", fontFamily: fonts.quicksandBold, fontSize: 15, color: colors.ink },
  nota: { fontFamily: fonts.quicksand, fontSize: 13, color: colors.muted, textAlign: "center", marginTop: 18, lineHeight: 19 },
});
