import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import ConfigScreen from "@/screens/internas/ConfigScreen";
import { navTerapeuta } from "./HomeTerapeutaScreen";
import { NOME_TERA } from "@/constants/areaData";

type Props = NativeStackScreenProps<RootStackParamList, "TerapeutaConfig">;

export default function TerapeutaConfigScreen({ navigation }: Props) {
  return (
    <ConfigScreen
      nome={NOME_TERA}
      navItens={navTerapeuta(navigation, "cfg")}
      onSair={() => navigation.reset({ index: 0, routes: [{ name: "Inicial" }] })}
    />
  );
}
