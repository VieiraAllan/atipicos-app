import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { colors } from "@/theme/colors";

import SplashScreen from "@/screens/SplashScreen";
import InicialScreen from "@/screens/InicialScreen";
import CadastroEscolhaScreen from "@/screens/CadastroEscolhaScreen";
import LoginScreen from "@/screens/LoginScreen";
import CadastroAdultoScreen from "@/screens/CadastroAdultoScreen";
import CadastroCriancaScreen from "@/screens/CadastroCriancaScreen";
import RecuperacaoSenhaScreen from "@/screens/RecuperacaoSenhaScreen";
import SucessoScreen from "@/screens/SucessoScreen";
import AreaStubScreen from "@/screens/AreaStubScreen";

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
      <Stack.Screen name="Area" component={AreaStubScreen} options={{ animation: "fade" }} />
    </Stack.Navigator>
  );
}
