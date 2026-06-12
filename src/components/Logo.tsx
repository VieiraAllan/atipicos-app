import React from "react";
import { Image, ImageStyle, StyleProp } from "react-native";

const RATIO = 605 / 413; // proporção real do PNG

export default function Logo({ width = 230, style }: { width?: number; style?: StyleProp<ImageStyle> }) {
  return (
    <Image
      source={require("../../assets/logo-atipicos.png")}
      style={[{ width, height: width / RATIO, resizeMode: "contain" }, style]}
      accessibilityLabel="Atípicos"
    />
  );
}
