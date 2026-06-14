import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { colors } from "@/theme/colors";

// Auth / cadastro
import SplashScreen from "@/screens/SplashScreen";
import InicialScreen from "@/screens/InicialScreen";
import CadastroEscolhaScreen from "@/screens/CadastroEscolhaScreen";
import LoginScreen from "@/screens/LoginScreen";
import CadastroAdultoScreen from "@/screens/CadastroAdultoScreen";
import CadastroCriancaScreen from "@/screens/CadastroCriancaScreen";
import RecuperacaoSenhaScreen from "@/screens/RecuperacaoSenhaScreen";
import SucessoScreen from "@/screens/SucessoScreen";

// Área Kids
import HomeKidsScreen from "@/screens/kids/HomeKidsScreen";
import KidsEmocoesScreen from "@/screens/kids/KidsEmocoesScreen";
import KidsTarefasScreen from "@/screens/kids/KidsTarefasScreen";
import { KidsFonoScreen, KidsPsicoScreen, KidsEscolaScreen } from "@/screens/kids/ListaAtividadesScreens";
import KidsComunicacaoScreen from "@/screens/kids/KidsComunicacaoScreen";
import SOSScreen from "@/screens/kids/SOSScreen";

// Área Responsável
import HomeResponsavelScreen from "@/screens/pais/HomeResponsavelScreen";
import PaisEditarTarefasScreen from "@/screens/pais/PaisEditarTarefasScreen";
import PaisControleScreen from "@/screens/pais/PaisControleScreen";
import PaisRelatoriosScreen from "@/screens/pais/PaisRelatoriosScreen";
import PaisLocalizacaoScreen from "@/screens/pais/PaisLocalizacaoScreen";
import PaisNoticiasScreen from "@/screens/pais/PaisNoticiasScreen";
import PaisConfigScreen from "@/screens/pais/PaisConfigScreen";

// Área Terapeuta
import HomeTerapeutaScreen from "@/screens/terapeuta/HomeTerapeutaScreen";
import TerapeutaPacienteScreen from "@/screens/terapeuta/TerapeutaPacienteScreen";
import TerapeutaConfigScreen from "@/screens/terapeuta/TerapeutaConfigScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.cream },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} options={{ animation: "fade" }} />
      <Stack.Screen name="Inicial" component={InicialScreen} />
      <Stack.Screen name="CadastroEscolha" component={CadastroEscolhaScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CadastroAdulto" component={CadastroAdultoScreen} />
      <Stack.Screen name="CadastroCrianca" component={CadastroCriancaScreen} />
      <Stack.Screen name="RecuperacaoSenha" component={RecuperacaoSenhaScreen} />
      <Stack.Screen name="Sucesso" component={SucessoScreen} options={{ animation: "fade" }} />

      {/* Kids */}
      <Stack.Screen name="HomeKids" component={HomeKidsScreen} options={{ animation: "fade", gestureEnabled: false }} />
      <Stack.Screen name="KidsEmocoes" component={KidsEmocoesScreen} />
      <Stack.Screen name="KidsTarefas" component={KidsTarefasScreen} />
      <Stack.Screen name="KidsFono" component={KidsFonoScreen} />
      <Stack.Screen name="KidsPsico" component={KidsPsicoScreen} />
      <Stack.Screen name="KidsEscola" component={KidsEscolaScreen} />
      <Stack.Screen name="KidsComunicacao" component={KidsComunicacaoScreen} />
      <Stack.Screen name="SOS" component={SOSScreen} options={{ animation: "fade", presentation: "modal" }} />

      {/* Responsável */}
      <Stack.Screen name="HomeResponsavel" component={HomeResponsavelScreen} options={{ animation: "fade", gestureEnabled: false }} />
      <Stack.Screen name="PaisEditarTarefas" component={PaisEditarTarefasScreen} />
      <Stack.Screen name="PaisControle" component={PaisControleScreen} />
      <Stack.Screen name="PaisRelatorios" component={PaisRelatoriosScreen} />
      <Stack.Screen name="PaisLocalizacao" component={PaisLocalizacaoScreen} />
      <Stack.Screen name="PaisNoticias" component={PaisNoticiasScreen} />
      <Stack.Screen name="PaisConfig" component={PaisConfigScreen} />

      {/* Terapeuta */}
      <Stack.Screen name="HomeTerapeuta" component={HomeTerapeutaScreen} options={{ animation: "fade", gestureEnabled: false }} />
      <Stack.Screen name="TerapeutaPaciente" component={TerapeutaPacienteScreen} />
      <Stack.Screen name="TerapeutaConfig" component={TerapeutaConfigScreen} />
    </Stack.Navigator>
  );
}
