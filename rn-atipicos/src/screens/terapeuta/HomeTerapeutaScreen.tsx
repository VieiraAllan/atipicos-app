import React from "react";
import { Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell, { SectionTitle } from "@/components/internas/AppShell";
import PatientCard from "@/components/internas/PatientCard";
import { useApp } from "@/store/AppStore";

type Props = NativeStackScreenProps<RootStackParamList, "HomeTerapeuta">;

// Navegação inferior da área do terapeuta (sem SOS).
export function navTerapeuta(navigation: any, ativo: string) {
  return [
    { icon: "home" as const, ativo: ativo === "home", onPress: () => navigation.navigate("HomeTerapeuta") },
    { icon: "settings" as const, ativo: ativo === "cfg", onPress: () => navigation.navigate("TerapeutaConfig") },
  ];
}

// RF20: lista de pacientes (crianças) vinculados a ESTE terapeuta.
export default function HomeTerapeutaScreen({ navigation }: Props) {
  const { usuarioAtual, criancasDoTerapeuta, sair } = useApp();
  const pacientes = criancasDoTerapeuta();
  const logout = () => { sair(); navigation.reset({ index: 0, routes: [{ name: "Inicial" }] }); };

  return (
    <AppShell
      nome={usuarioAtual?.nome ?? "Terapeuta"}
      onSair={logout}
      navItens={navTerapeuta(navigation, "home")}
    >
      <SectionTitle>Pacientes Ativos</SectionTitle>
      {pacientes.length === 0 ? (
        <Text style={styles.vazio}>
          Nenhum paciente vinculado ainda. Quando um responsável cadastrar uma criança e escolher você como
          terapeuta, ela aparece aqui.
        </Text>
      ) : (
        pacientes.map((c) => (
          <PatientCard
            key={c.id}
            nome={c.nome}
            diagnostico={c.diagnostico}
            falaHist={c.falaHist}
            cognitivaHist={c.cognitivaHist}
            onPress={() => navigation.navigate("TerapeutaPaciente", { criancaId: c.id })}
          />
        ))
      )}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  vazio: { fontFamily: fonts.quicksand, fontSize: 14, color: colors.muted, lineHeight: 21, paddingVertical: 10 },
});
