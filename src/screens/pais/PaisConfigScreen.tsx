import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import ConfigScreen from "@/screens/internas/ConfigScreen";
import { navPais } from "./HomeResponsavelScreen";
import { NOME_RESP } from "@/constants/areaData";

type Props = NativeStackScreenProps<RootStackParamList, "PaisConfig">;

export default function PaisConfigScreen({ navigation }: Props) {
  return (
    <ConfigScreen
      nome={NOME_RESP}
      navItens={navPais(navigation, "cfg")}
      onSair={() => navigation.reset({ index: 0, routes: [{ name: "Inicial" }] })}
      onSOS={() => navigation.navigate("SOS")}
    />
  );
}
