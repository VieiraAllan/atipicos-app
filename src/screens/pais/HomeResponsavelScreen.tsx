import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import AppShell from "@/components/internas/AppShell";
import { Card } from "@/components/internas/widgets";
import MapaLeaflet from "@/components/internas/MapaLeaflet";
import SeletorCrianca from "@/components/internas/SeletorCrianca";
import { useApp } from "@/store/AppStore";
import { useAlertaSOS } from "@/hooks/useAlertaSOS";

type Props = NativeStackScreenProps<RootStackParamList, "HomeResponsavel">;

// Itens de navegação inferior compartilhados pela área de pais.
export function navPais(navigation: any, ativo: string) {
  return [
    { icon: "home" as const, ativo: ativo === "home", onPress: () => navigation.navigate("HomeResponsavel") },
    { icon: "alert-triangle" as const, ativo: ativo === "alertas", onPress: () => navigation.navigate("PaisAlertas") },
    { icon: "bar-chart-2" as const, ativo: ativo === "rel", onPress: () => navigation.navigate("PaisRelatorios") },
    { icon: "settings" as const, ativo: ativo === "cfg", onPress: () => navigation.navigate("PaisConfig") },
  ];
}

export default function HomeResponsavelScreen({ navigation }: Props) {
  const { usuarioAtual, criancasDoResponsavel, tarefasDaCrianca, alternarTarefa, localizacaoDaCrianca, sair } = useApp();
  const criancas = criancasDoResponsavel();
  const [selId, setSelId] = useState<string | null>(criancas[0]?.id ?? null);
  const selecionada = criancas.find((c) => c.id === selId) ?? criancas[0] ?? null;

  const logout = () => { sair(); navigation.reset({ index: 0, routes: [{ name: "Inicial" }] }); };
  const tarefas = selecionada ? tarefasDaCrianca(selecionada.id) : [];
  const loc = selecionada ? localizacaoDaCrianca(selecionada.id) : undefined;
  const sosAtivo = !!loc && loc.origem === "sos" && Date.now() - loc.ts < 30 * 60 * 1000;

  // Dispara notificação local quando a criança aciona o SOS.
  useAlertaSOS();

  return (
    <AppShell
      nome={usuarioAtual?.nome ?? "Responsável"}
      onSair={logout}
      onSino={() => navigation.navigate("PaisNoticias")}
      navItens={navPais(navigation, "home")}
    >
      {criancas.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.vazioEmoji}>🧒</Text>
          <Text style={styles.vazioTtl}>Nenhuma criança cadastrada</Text>
          <Text style={styles.vazioTxt}>Cadastre a criança para acompanhar a rotina, a evolução e a localização.</Text>
          <Pressable style={styles.btnPrim} onPress={() => navigation.navigate("CadastroCrianca")}>
            <Text style={styles.btnPrimTxt}>＋ Cadastrar criança</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <SeletorCrianca criancas={criancas} selecionada={selId} onSelecionar={setSelId} />

          {sosAtivo && (
            <Pressable style={styles.sosBanner} onPress={() => navigation.navigate("PaisLocalizacao")}>
              <Text style={styles.sosEmoji}>🚨</Text>
              <Text style={styles.sosText}>{selecionada!.nome} acionou o SOS! Toque para ver a localização.</Text>
            </Pressable>
          )}

          <Card title={`Rotina de ${selecionada!.nome}`}>
            {tarefas.length === 0 ? (
              <Text style={styles.semTarefa}>Nenhuma tarefa ainda. Toque em “Editar Tarefas”.</Text>
            ) : (
              tarefas.map((t) => (
                <Pressable key={t.id} style={[styles.task, t.done && styles.taskDone]} onPress={() => alternarTarefa(t.id)}>
                  <View style={[styles.chk, t.done && styles.chkOn]}>{t.done && <Text style={styles.chkMark}>✓</Text>}</View>
                  <Text style={styles.taskEmoji}>{t.emoji}</Text>
                  <Text style={[styles.taskText, t.done && styles.taskTextDone]}>{t.nome}</Text>
                  <Text style={styles.taskTime}>{t.hora}</Text>
                </Pressable>
              ))
            )}
            <Text style={styles.dica}>Toque numa tarefa para concluir ou desfazer.</Text>
          </Card>

          <Card title="Última localização">
            <View style={styles.mapaPreview}>
              {loc ? (
                <>
                  <View style={StyleSheet.absoluteFill} pointerEvents="none">
                    <MapaLeaflet lat={loc.lat} lng={loc.lng} label={selecionada!.nome} height={150} />
                  </View>
                  <Pressable style={StyleSheet.absoluteFill} onPress={() => navigation.navigate("PaisLocalizacao")} />
                </>
              ) : (
                <Pressable style={styles.semMapaBtn} onPress={() => navigation.navigate("PaisLocalizacao")}>
                  <Text style={styles.semMapa}>Sem localização compartilhada ainda.</Text>
                </Pressable>
              )}
            </View>
          </Card>

          <Acao emoji="📋" label="Editar Tarefas" onPress={() => navigation.navigate("PaisEditarTarefas", { criancaId: selecionada!.id })} />
          <Acao emoji="📊" label="Ver Progresso" onPress={() => navigation.navigate("PaisRelatorios", { criancaId: selecionada!.id })} />
          <Acao emoji="📱" label="Controle de Uso" onPress={() => navigation.navigate("PaisControle")} />
          <Acao emoji="➕" label="Cadastrar outra criança" onPress={() => navigation.navigate("CadastroCrianca")} />
        </>
      )}
    </AppShell>
  );
}

function Acao({ emoji, label, onPress }: { emoji: string; label: string; onPress: () => void }) {
  return (
    <Pressable style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.rowBgHover }]} onPress={onPress}>
      <Text style={styles.rowEmoji}>{emoji}</Text>
      <Text style={styles.rowLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  vazio: { alignItems: "center", paddingTop: 40, gap: 10 },
  vazioEmoji: { fontSize: 60 },
  vazioTtl: { fontFamily: fonts.quicksandBold, fontSize: 20, color: colors.ink },
  vazioTxt: { fontFamily: fonts.quicksand, fontSize: 15, color: colors.muted, textAlign: "center", maxWidth: 280, lineHeight: 21 },
  btnPrim: { marginTop: 12, borderWidth: 2, borderColor: colors.ink, borderRadius: 16, height: 52, paddingHorizontal: 24, alignItems: "center", justifyContent: "center", backgroundColor: colors.fieldBg },
  btnPrimTxt: { fontFamily: fonts.quicksandBold, fontSize: 16, color: colors.ink },
  semTarefa: { fontFamily: fonts.quicksand, fontSize: 14, color: colors.muted, textAlign: "center", paddingVertical: 6 },
  sosBanner: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: colors.sos, borderWidth: 3, borderColor: colors.ink, borderRadius: 14, padding: 14, marginBottom: 16 },
  sosEmoji: { fontSize: 28 },
  sosText: { flex: 1, fontFamily: fonts.quicksandBold, fontSize: 14, color: colors.ink },
  mapaPreview: { margin: -14, height: 150, position: "relative" },
  semMapaBtn: { flex: 1, alignItems: "center", justifyContent: "center" },
  semMapa: { fontFamily: fonts.quicksand, fontSize: 13, color: colors.muted, textAlign: "center", paddingVertical: 30 },
  task: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: colors.white, borderWidth: 3, borderColor: colors.ink, borderRadius: 14, padding: 12, marginBottom: 12 },
  taskDone: { backgroundColor: colors.taskDone },
  chk: { width: 26, height: 26, borderRadius: 8, borderWidth: 2.5, borderColor: colors.ink, backgroundColor: colors.white, alignItems: "center", justifyContent: "center" },
  chkOn: { backgroundColor: "#98FF98" },
  chkMark: { fontSize: 15, color: colors.ink, fontWeight: "700" },
  taskEmoji: { fontSize: 26 },
  taskText: { flex: 1, fontFamily: fonts.quicksandSemi, fontSize: 15, color: colors.ink },
  taskTextDone: { textDecorationLine: "line-through", color: colors.muted },
  taskTime: { fontFamily: fonts.quicksandBold, fontSize: 13, color: colors.muted },
  dica: { fontFamily: fonts.quicksand, fontSize: 12, color: colors.muted, textAlign: "center", marginTop: 2 },
  row: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: colors.rowBg, borderWidth: 3, borderColor: colors.ink, borderRadius: 15, padding: 16, marginBottom: 14 },
  rowEmoji: { fontSize: 34 },
  rowLabel: { fontFamily: fonts.happy, fontSize: 19, color: colors.ink },
});
