import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import ConfigScreen from "@/screens/internas/ConfigScreen";
import { navTerapeuta } from "./HomeTerapeutaScreen";
import { useApp } from "@/store/AppStore";

type Props = NativeStackScreenProps<RootStackParamList, "TerapeutaConfig">;

export default function TerapeutaConfigScreen({ navigation }: Props) {
  const { usuarioAtual, sair } = useApp();
  return (
    <ConfigScreen
      nome={usuarioAtual?.nome ?? "Terapeuta"}
      navItens={navTerapeuta(navigation, "cfg")}
      navigation={navigation}
      onSair={() => { sair(); navigation.reset({ index: 0, routes: [{ name: "Inicial" }] }); }}
      area="terapeuta"
    />
  );
}
