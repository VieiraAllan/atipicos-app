import React from "react";
import AppShell from "@/components/internas/AppShell";
import { useApp } from "@/store/AppStore";

// Casca das telas Kids: nome do topo = criança logada, navegação padrão + SOS.
export default function KidsShell({
  navigation,
  bg,
  children,
}: {
  navigation: any;
  bg?: string;
  children: React.ReactNode;
}) {
  const { usuarioAtual, sair } = useApp();
  const logout = () => { sair(); navigation.reset({ index: 0, routes: [{ name: "Inicial" }] }); };
  return (
    <AppShell
      nome={usuarioAtual?.nome ?? "Olá"}
      bg={bg}
      onSair={logout}
      navItens={[{ icon: "home", onPress: () => navigation.navigate("HomeKids") }]}
      onSOS={() => navigation.navigate("SOS")}
    >
      {children}
    </AppShell>
  );
}
