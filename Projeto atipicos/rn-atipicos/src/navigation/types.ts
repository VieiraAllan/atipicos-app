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

  // ── Áreas internas — Kids ──
  HomeKids: undefined;
  KidsEmocoes: undefined;
  KidsTarefas: undefined;
  KidsFono: undefined;
  KidsPsico: undefined;
  KidsEscola: undefined;
  KidsComunicacao: undefined;
  AtividadeGrade: { id: string };
  Respiracao: undefined;
  SOS: undefined;

  // ── Áreas internas — Responsável ──
  HomeResponsavel: undefined;
  PaisEditarTarefas: undefined;
  PaisControle: undefined;
  PaisRelatorios: undefined;
  PaisLocalizacao: undefined;
  PaisNoticias: undefined;
  PaisConfig: undefined;

  // ── Áreas internas — Terapeuta ──
  HomeTerapeuta: undefined;
  TerapeutaPaciente: { indice: number };
  TerapeutaConfig: undefined;
};

export const TITULOS_PERFIL: Record<Perfil, string> = {
  atipico: "Atípico",
  responsavel: "Responsável",
  terapeuta: "Terapeuta",
};
