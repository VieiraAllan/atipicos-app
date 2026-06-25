import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import ConfigScreen from "@/screens/internas/ConfigScreen";
import { navPais } from "./HomeResponsavelScreen";
import { useApp } from "@/store/AppStore";

type Props = NativeStackScreenProps<RootStackParamList, "PaisConfig">;

export default function PaisConfigScreen({ navigation }: Props) {
  const { usuarioAtual, sair } = useApp();
  return (
    <ConfigScreen
      nome={usuarioAtual?.nome ?? "Responsável"}
      navItens={navPais(navigation, "cfg")}
      navigation={navigation}
      onSair={() => { sair(); navigation.reset({ index: 0, routes: [{ name: "Inicial" }] }); }}
      onSOS={() => navigation.navigate("SOS")}
    />
  );
}
