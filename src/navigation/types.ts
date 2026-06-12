// Tipos de navegação (React Navigation, tipado).
export type Perfil = "atipico" | "responsavel" | "terapeuta";

export type RootStackParamList = {
  Splash: undefined;
  Inicial: undefined;
  CadastroEscolha: undefined;
  Login: { perfil: Perfil };
  CadastroAdulto: { perfil: "responsavel" | "terapeuta" };
  CadastroCrianca: undefined;
  RecuperacaoSenha: undefined;
  Sucesso: { tipo: "cadastro" | "recuperacao" };
  Area: { perfil: Perfil };
};

export const TITULOS_PERFIL: Record<Perfil, string> = {
  atipico: "Atípico",
  responsavel: "Responsável",
  terapeuta: "Terapeuta",
};
