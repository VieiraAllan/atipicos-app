import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import { FieldConfig } from "@/constants/formData";
import { MASCARAS } from "@/utils/masks";

type Props = {
  config: FieldConfig;
  value: string;
  onChange: (v: string) => void;
};

export default function Field({ config, value, onChange }: Props) {
  const [focused, setFocused] = useState(false);

  const handleChange = (raw: string) => {
    onChange(config.mascara ? MASCARAS[config.mascara](raw) : raw);
  };

  return (
    <View style={[styles.wrap, focused && styles.wrapFocus]}>
      <Feather name={config.icon} size={19} color={colors.text} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={handleChange}
        placeholder={config.placeholder}
        placeholderTextColor={colors.placeholder}
        secureTextEntry={config.secure}
        keyboardType={config.keyboard ?? "default"}
        autoCapitalize={config.autoCapitalize ?? "sentences"}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    height: 47,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: colors.fieldBg,
    borderWidth: 1.6,
    borderColor: colors.fieldBorder,
  },
  wrapFocus: {
    borderWidth: 2.2,
    borderColor: colors.fieldBorderFocus,
    backgroundColor: colors.fieldBgFocus,
  },
  input: {
    flex: 1,
    fontFamily: fonts.quicksand,
    fontSize: 15,
    color: colors.text,
    padding: 0,
  },
});
