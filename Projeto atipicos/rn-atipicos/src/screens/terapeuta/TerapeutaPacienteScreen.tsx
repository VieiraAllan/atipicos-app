import React, { useState } from "react";
import { Text, TextInput, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell, { SectionTitle } from "@/components/internas/AppShell";
import BackChip from "@/components/internas/BackChip";
import PatientCard from "@/components/internas/PatientCard";
import { navTerapeuta } from "./HomeTerapeutaScreen";
import { PACIENTES, NOME_TERA } from "@/constants/areaData";

type Props = NativeStackScreenProps<RootStackParamList, "TerapeutaPaciente">;

// RF20–RF22: detalhe do paciente + relatório da sessão.
export default function TerapeutaPacienteScreen({ navigation, route }: Props) {
  const p = PACIENTES[route.params.indice] ?? PACIENTES[0];
  const [relatorio, setRelatorio] = useState("");
  const [salvo, setSalvo] = useState(false);

  return (
    <AppShell
      nome={NOME_TERA}
      onSair={() => navigation.reset({ index: 0, routes: [{ name: "Inicial" }] })}
      navItens={navTerapeuta(navigation, "home")}
    >
      <BackChip onBack={() => navigation.goBack()} titulo={`Paciente — ${p.nome}`} />
      <PatientCard p={p} />

      <SectionTitle>Relatório da sessão</SectionTitle>
      <TextInput
        style={styles.textarea}
        value={relatorio}
        onChangeText={(t) => { setRelatorio(t); setSalvo(false); }}
        placeholder="Descreva a evolução, observações e próximos passos…"
        placeholderTextColor={colors.placeholder}
        multiline
        textAlignVertical="top"
      />
      <Pressable style={styles.btn} onPress={() => setSalvo(true)}>
        <Text style={styles.btnText}>{salvo ? "✓ Relatório salvo" : "Salvar relatório"}</Text>
      </Pressable>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  textarea: { minHeight: 120, borderWidth: 3, borderColor: colors.ink, borderRadius: 14, padding: 14, fontFamily: fonts.quicksand, fontSize: 15, backgroundColor: colors.white, color: colors.text },
  btn: { backgroundColor: colors.successFill, borderWidth: 2, borderColor: colors.successBorder, borderRadius: 16, height: 52, alignItems: "center", justifyContent: "center", marginTop: 14 },
  btnText: { fontFamily: fonts.quicksandBold, fontSize: 16, color: colors.ink },
});
