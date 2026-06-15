import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import AppShell, { SectionTitle } from "@/components/internas/AppShell";
import PatientCard from "@/components/internas/PatientCard";
import { PACIENTES, NOME_TERA } from "@/constants/areaData";

type Props = NativeStackScreenProps<RootStackParamList, "HomeTerapeuta">;

export function navTerapeuta(navigation: any, ativo: string) {
  return [
    { icon: "home" as const, ativo: ativo === "home", onPress: () => navigation.navigate("HomeTerapeuta") },
    { icon: "bar-chart-2" as const, ativo: ativo === "rel", onPress: () => navigation.navigate("HomeTerapeuta") },
    { icon: "settings" as const, ativo: ativo === "cfg", onPress: () => navigation.navigate("TerapeutaConfig") },
  ];
}

// RF20: lista de pacientes do terapeuta.
export default function HomeTerapeutaScreen({ navigation }: Props) {
  return (
    <AppShell
      nome={NOME_TERA}
      onSair={() => navigation.reset({ index: 0, routes: [{ name: "Inicial" }] })}
      onSino={() => navigation.navigate("PaisNoticias")}
      navItens={navTerapeuta(navigation, "home")}
    >
      <SectionTitle>Pacientes Ativos</SectionTitle>
      {PACIENTES.map((p, i) => (
        <PatientCard key={i} p={p} onPress={() => navigation.navigate("TerapeutaPaciente", { indice: i })} />
      ))}
    </AppShell>
  );
}
