import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import { FieldConfig } from "@/constants/formData";
import Logo from "./Logo";
import Field from "./Field";
import SelectField from "./SelectField";
import PrimaryButton from "./PrimaryButton";
import ScreenContainer from "./ScreenContainer";

type Valores = Record<string, string>;

type Props = {
  titulo: string;
  tituloAlinhamento?: "left" | "center";
  campos: FieldConfig[];
  botao: string;
  onBack: () => void;
  onSubmit: (valores: Valores) => void | Promise<void>;
  link?: { label: string; onPress: () => void };
};

export default function FormScreen({ titulo, tituloAlinhamento = "left", campos, botao, onBack, onSubmit, link }: Props) {
  const [valores, setValores] = useState<Valores>({});
  const [loading, setLoading] = useState(false);

  const set = (key: string) => (v: string) => setValores((s) => ({ ...s, [key]: v }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit(valores);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer scroll onBack={onBack}>
      <Logo width={208} style={{ marginTop: 30 }} />
      <Text style={[styles.titulo, { textAlign: tituloAlinhamento, alignSelf: tituloAlinhamento === "center" ? "center" : "stretch" }]}>
        {titulo}
      </Text>

      <View style={styles.form}>
        {campos.map((c) =>
          c.kind === "select" ? (
            <SelectField key={c.key} config={c} value={valores[c.key] ?? ""} onChange={set(c.key)} />
          ) : (
            <Field key={c.key} config={c} value={valores[c.key] ?? ""} onChange={set(c.key)} />
          )
        )}
      </View>

      {link && (
        <Pressable onPress={link.onPress} style={styles.linkWrap}>
          <Text style={styles.link}>{link.label}</Text>
        </Pressable>
      )}

      <View style={styles.cta}>
        <PrimaryButton label={botao} size="lg" onPress={handleSubmit} loading={loading} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  titulo: { width: "100%", marginTop: 30, marginBottom: 24, fontFamily: fonts.quicksandBold, fontSize: 25, color: colors.ink },
  form: { width: "100%", gap: 15 },
  linkWrap: { alignSelf: "flex-end", marginTop: 12, marginRight: 2 },
  link: { fontFamily: fonts.inter, fontSize: 12, color: colors.link },
  cta: { width: "100%", alignItems: "center", marginTop: 30 },
});
