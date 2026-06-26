import type { ComponentProps } from "react";
import { Feather } from "@expo/vector-icons";
import { MascaraTipo } from "@/utils/masks";

export type IconName = ComponentProps<typeof Feather>["name"];

export type FieldConfig = {
  key: string;
  icon: IconName;
  placeholder: string;
  kind?: "input" | "select";
  secure?: boolean;
  keyboard?: "default" | "email-address" | "numeric";
  mascara?: MascaraTipo;
  options?: string[];
  autoCapitalize?: "none" | "sentences" | "words";
};

export const PERGUNTAS_SEG = [
  "Nome do seu primeiro animal de estimação",
  "Cidade onde você nasceu",
  "Nome de solteira da sua mãe",
  "Seu apelido de infância",
];

export const DIAGNOSTICOS = [
  "TEA — Nível 1 (suporte leve)",
  "TEA — Nível 2 (suporte substancial)",
  "TEA — Nível 3 (suporte muito substancial)",
  "TEA + TDAH",
  "TEA + TOD",
  "Outro",
];

export const CAMPOS_LOGIN: FieldConfig[] = [
  { key: "email", icon: "mail", placeholder: "Insira seu email", keyboard: "email-address", autoCapitalize: "none" },
  { key: "senha", icon: "lock", placeholder: "Insira sua senha", secure: true },
];

export const CAMPOS_ADULTO: FieldConfig[] = [
  { key: "nome", icon: "user", placeholder: "Nome completo", autoCapitalize: "words" },
  { key: "cpf", icon: "credit-card", placeholder: "CPF", keyboard: "numeric", mascara: "cpf" },
  { key: "cep", icon: "map-pin", placeholder: "CEP", keyboard: "numeric", mascara: "cep" },
  { key: "email", icon: "mail", placeholder: "Insira seu email", keyboard: "email-address", autoCapitalize: "none" },
  { key: "dataNascimento", icon: "calendar", placeholder: "Data de nascimento", keyboard: "numeric", mascara: "data" },
  { key: "perguntaSeguranca", icon: "help-circle", placeholder: "Pergunta de segurança", kind: "select", options: PERGUNTAS_SEG },
  { key: "respostaSeguranca", icon: "message-circle", placeholder: "Resposta de segurança" },
  { key: "senha", icon: "lock", placeholder: "Insira sua senha", secure: true },
  { key: "confirmarSenha", icon: "lock", placeholder: "Confirme sua senha", secure: true },
];

export const CAMPOS_CRIANCA: FieldConfig[] = [
  { key: "nome", icon: "user", placeholder: "Nome completo", autoCapitalize: "words" },
  { key: "cpf", icon: "credit-card", placeholder: "CPF", keyboard: "numeric", mascara: "cpf" },
  { key: "cep", icon: "map-pin", placeholder: "CEP", keyboard: "numeric", mascara: "cep" },
  { key: "email", icon: "mail", placeholder: "Insira seu email", keyboard: "email-address", autoCapitalize: "none" },
  { key: "dataNascimento", icon: "calendar", placeholder: "Data de nascimento", keyboard: "numeric", mascara: "data" },
  { key: "diagnostico", icon: "clipboard", placeholder: "Diagnóstico", kind: "select", options: DIAGNOSTICOS },
  { key: "senha", icon: "lock", placeholder: "Insira sua senha", secure: true },
  { key: "confirmarSenha", icon: "lock", placeholder: "Confirme sua senha", secure: true },
];

export const CAMPOS_RECUPERACAO: FieldConfig[] = [
  { key: "email", icon: "mail", placeholder: "Insira seu email", keyboard: "email-address", autoCapitalize: "none" },
  { key: "dataNascimento", icon: "calendar", placeholder: "Data de nascimento", keyboard: "numeric", mascara: "data" },
  { key: "perguntaSeguranca", icon: "help-circle", placeholder: "Pergunta cadastrada", kind: "select", options: PERGUNTAS_SEG },
  { key: "respostaSeguranca", icon: "message-circle", placeholder: "Resposta de segurança" },
  { key: "novaSenha", icon: "lock", placeholder: "Insira sua nova senha", secure: true },
  { key: "confirmarSenha", icon: "lock", placeholder: "Confirme sua senha", secure: true },
];
