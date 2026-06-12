import React, { useState } from "react";
import { View, Text, Pressable, Modal, FlatList, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import { FieldConfig } from "@/constants/formData";

type Props = {
  config: FieldConfig;
  value: string;
  onChange: (v: string) => void;
};

export default function SelectField({ config, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const options = config.options ?? [];

  return (
    <>
      <Pressable style={styles.wrap} onPress={() => setOpen(true)}>
        <Feather name={config.icon} size={19} color={colors.text} />
        <Text style={[styles.text, !value && styles.placeholder]} numberOfLines={1}>
          {value || config.placeholder}
        </Text>
        <Feather name="chevron-down" size={17} color={colors.text} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <Text style={styles.sheetTitle}>{config.placeholder}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => {
                    onChange(item);
                    setOpen(false);
                  }}
                >
                  <Text style={[styles.optionText, item === value && styles.optionSelected]}>{item}</Text>
                  {item === value && <Feather name="check" size={18} color={colors.successText} />}
                </Pressable>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
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
  text: { flex: 1, fontFamily: fonts.quicksand, fontSize: 15, color: colors.text },
  placeholder: { color: colors.placeholder },
  overlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: "flex-end" },
  sheet: {
    backgroundColor: colors.cream,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 34,
    maxHeight: "70%",
  },
  sheetTitle: { fontFamily: fonts.quicksandBold, fontSize: 17, color: colors.ink, marginBottom: 8 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(21,20,38,0.12)",
  },
  optionText: { fontFamily: fonts.quicksand, fontSize: 15, color: colors.text, flex: 1, paddingRight: 12 },
  optionSelected: { fontFamily: fonts.quicksandBold },
});
