import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ActivityIndicator, Linking, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell from "@/components/internas/AppShell";
import BackChip from "@/components/internas/BackChip";
import { navPais } from "./HomeResponsavelScreen";
import { Noticia } from "@/constants/areaData";
import { buscarNoticias } from "@/services/noticias";
import { useApp } from "@/store/AppStore";

type Props = NativeStackScreenProps<RootStackParamList, "PaisNoticias">;

// RF19: informações sobre o TEA — consome a NewsAPI (com fallback local).
export default function PaisNoticiasScreen({ navigation }: Props) {
  const { usuarioAtual, sair } = useApp();
  const [itens, setItens] = useState<Noticia[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [aoVivo, setAoVivo] = useState(false);

  const carregar = async () => {
    setCarregando(true);
    const r = await buscarNoticias();
    setItens(r.itens);
    setAoVivo(r.aoVivo);
    setCarregando(false);
  };

  useEffect(() => { carregar(); }, []);

  const abrir = (n: Noticia) => { if (n.url) Linking.openURL(n.url).catch(() => {}); };

  return (
    <AppShell
      nome={usuarioAtual?.nome ?? "Responsável"}
      onSair={() => { sair(); navigation.reset({ index: 0, routes: [{ name: "Inicial" }] }); }}
      navItens={navPais(navigation, "home")}
    >
      <BackChip onBack={() => navigation.goBack()} titulo="Informações sobre TEA" />

      <View style={styles.statusRow}>
        <Text style={styles.status}>{aoVivo ? "● Notícias ao vivo (NewsAPI)" : "○ Conteúdo de exemplo"}</Text>
        <Pressable onPress={carregar} hitSlop={8}><Text style={styles.refresh}>↻ Atualizar</Text></Pressable>
      </View>

      {carregando ? (
        <ActivityIndicator color={colors.ink} style={{ marginTop: 30 }} />
      ) : (
        itens.map((n, i) => (
          <Pressable key={i} style={styles.news} onPress={() => abrir(n)}>
            <View style={styles.img}><Text style={styles.imgEmoji}>{n.emoji}</Text></View>
            <View style={styles.body}>
              <Text style={styles.ti} numberOfLines={3}>{n.ti}</Text>
              {!!n.de && <Text style={styles.de} numberOfLines={3}>{n.de}</Text>}
              <Text style={styles.src}>{n.src}{n.url ? " · toque para abrir" : ""}</Text>
            </View>
          </Pressable>
        ))
      )}
    </AppShell>
  );
}

const styles = StyleSheet.create({
  statusRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  status: { fontFamily: fonts.quicksandSemi, fontSize: 12, color: colors.muted },
  refresh: { fontFamily: fonts.quicksandBold, fontSize: 13, color: colors.link },
  news: { backgroundColor: colors.white, borderWidth: 3, borderColor: colors.ink, borderRadius: 14, overflow: "hidden", marginBottom: 16 },
  img: { height: 80, backgroundColor: "#ECE7DF", alignItems: "center", justifyContent: "center" },
  imgEmoji: { fontSize: 30 },
  body: { padding: 12 },
  ti: { fontFamily: fonts.quicksandBold, fontSize: 15, color: colors.ink },
  de: { fontFamily: fonts.quicksand, fontSize: 13, color: colors.muted, marginTop: 4, lineHeight: 18 },
  src: { fontFamily: fonts.inter, fontSize: 10, color: colors.placeholder, marginTop: 6 },
});
