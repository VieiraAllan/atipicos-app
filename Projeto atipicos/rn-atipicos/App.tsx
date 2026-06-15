import React, { useCallback } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import { Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { HappyMonkey_400Regular } from "@expo-google-fonts/happy-monkey";

import RootNavigator from "@/navigation/RootNavigator";
import { colors } from "@/theme/colors";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    Inter_400Regular,
    Inter_700Bold,
    HappyMonkey_400Regular,
  });

  const onReady = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: colors.cream }} onLayout={onReady}>
        <NavigationContainer onReady={onReady}>
          <StatusBar style="dark" />
          <RootNavigator />
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}
