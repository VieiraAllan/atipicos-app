import React from "react";
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";
import BackButton from "./BackButton";

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  center?: boolean;
  onBack?: () => void;
};

export default function ScreenContainer({ children, scroll, center, onBack }: Props) {
  const content = scroll ? (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  ) : (
    <View style={[styles.flex, center && styles.center]}>{children}</View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      {onBack && <BackButton onPress={onBack} />}
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  flex: { flex: 1 },
  center: { alignItems: "center", justifyContent: "center", paddingHorizontal: 36 },
  scrollContent: { alignItems: "center", paddingHorizontal: 44, paddingTop: 24, paddingBottom: 44 },
});
