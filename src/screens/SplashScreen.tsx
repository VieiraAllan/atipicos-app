import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import ScreenContainer from "@/components/ScreenContainer";
import Logo from "@/components/Logo";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace("Inicial"), 1900);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <ScreenContainer center>
      <Pressable style={styles.fill} onPress={() => navigation.replace("Inicial")}>
        <Logo width={300} />
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, width: "100%", alignItems: "center", justifyContent: "center", backgroundColor: colors.cream },
});
