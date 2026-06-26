import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell from "@/components/internas/AppShell";
import BackChip from "@/components/internas/BackChip";
import { Card } from "@/components/internas/widgets";
import MapaLeaflet from "@/components/internas/MapaLeaflet";
import SeletorCrianca from "@/components/internas/SeletorCrianca";
import { navPais } from "./HomeResponsavelScreen";
import { useApp } from "@/store/AppStore";

type Props = NativeStackScreenProps<RootStackParamList, "PaisLocalizacao">;

const ORIGENS: Record<string, string> = {
  inicial: "Local de referência",
  gps: "Compartilhada pela criança",
  sos: "Enviada por SOS 🚨",
};

function tempoRelativo(ts: number): string {
  const min = Math.floor((Date.now() - ts) / 60000);
  if (min < 1) return "agora mesmo";
  if (min < 60) return `há ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `há ${h} h`;
  return `há ${Math.floor(h / 24)} dia(s)`;
}

// RF14/RF15: localização da criança no mapa (OpenStreetMap/Leaflet).
export default function PaisLocalizacaoScreen({ navigation }: Props) {
  const { usuarioAtual, criancasDoResponsavel, localizacaoDaCrianca, sair } = useApp();
  const criancas = criancasDoResponsavel();
  const [selId, setSelId] = useState<string | null>(criancas[0]?.id ?? null);
  const selecionada = criancas.find((c) => c.id === selId) ?? criancas[0] ?? null;
  const loc = selecionada ? localizacaoDaCrianca(selecionada.id) : undefined;

  return (
    <AppShell
      nome={usuarioAtual?.nome ?? "Responsável"}
      onSair={() => { sair(); navigation.reset({ index: 0, routes: [{ name: "Inicial" }] }); }}
      navItens={navPais(navigation, "home")}
    >
      <BackChip onBack={() => navigation.goBack()} titulo="Localização" />

      {!selecionada ? (
        <Text style={styles.vazio}>Cadastre uma criança para acompanhar a localização.</Text>
      ) : !loc ? (
        <Text style={styles.vazio}>Ainda não há localização compartilhada por {selecionada.nome}.</Text>
      ) : (
        <>
          <SeletorCrianca criancas={criancas} selecionada={selId} onSelecionar={setSelId} />
          <Card title={`Onde está ${selecionada.nome}`}>
            <View style={{ margin: -14 }}>
              <MapaLeaflet lat={loc.lat} lng={loc.lng} label={selecionada.nome} height={300} />
            </View>
          </Card>
          <Text style={styles.info}>
            {ORIGENS[loc.origem] ?? "Localização"} · atualizada {tempoRelativo(loc.ts)}
          </Text>
          <Pressable style={styles.sos} onPress={() => navigation.navigate("SOS")}>
            <Text style={styles.sosText}>SOS — Acionar emergência</Text>
          </Pressable>
        </>
      )}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  vazio: { fontFamily: fonts.quicksand, fontSize: 14, color: colors.muted, textAlign: "center", paddingVertical: 16 },
  info: { fontFamily: fonts.quicksandSemi, fontSize: 14, color: colors.ink, textAlign: "center", marginBottom: 16, lineHeight: 21 },
  sos: { backgroundColor: colors.sos, borderWidth: 3, borderColor: colors.ink, borderRadius: 30, height: 54, alignItems: "center", justifyContent: "center" },
  sosText: { fontFamily: fonts.quicksandBold, fontSize: 18, color: colors.ink },
});
