// ──────────────────────────────────────────────────────────────────
// Tipos e contrato compartilhados do store (local e Firebase usam o mesmo).
// ──────────────────────────────────────────────────────────────────
export type Perfil = "responsavel" | "terapeuta" | "atipico";

export type Usuario = {
  uid: string;
  nome: string;
  email: string;
  senha?: string;        // usado só no modo local (no Firebase, o Auth cuida)
  perfil: Perfil;
  cpf?: string;
  criancaId?: string;    // só para contas de criança (perfil "atipico")
};

export type Crianca = {
  id: string;
  nome: string;
  diagnostico: string;
  cpf?: string;
  dataNascimento?: string;
  responsavelUid: string;
  terapeutaId: string | null;
  contaUid?: string;     // uid da conta de login da criança
  falaHist: number[];
  cognitivaHist: number[];
};

export type Tarefa = {
  id: string;
  criancaId: string;
  emoji: string;
  nome: string;
  hora: string;
  done: boolean;
};

export type Localizacao = { lat: number; lng: number; ts: number; origem: "gps" | "sos" | "inicial" };

export type NovaCrianca = {
  nome: string;
  diagnostico: string;
  email: string;
  senha: string;
  cpf?: string;
  dataNascimento?: string;
  terapeutaId: string | null;
};

export type Stats = {
  fala: number; cognitiva: number; falaHist: number[]; cognitivaHist: number[];
  totalTarefas: number; tarefasFeitas: number; tarefasPct: number;
};

// Contrato único consumido pelas telas via useApp().
export type AppCtx = {
  pronto: boolean;
  modo: "local" | "firebase";
  usuarioAtual: Usuario | null;
  // auth (async para suportar Firebase)
  registrar: (perfil: Exclude<Perfil, "atipico">, d: { nome: string; email: string; senha: string; cpf?: string }) => Promise<Usuario>;
  entrar: (email: string, senha: string, perfilEsperado: Perfil) => Promise<Usuario>;
  trocarSenha: (senhaAtual: string, novaSenha: string) => Promise<void>;
  sair: () => void;
  // terapeutas
  terapeutas: () => Usuario[];
  // crianças
  adicionarCrianca: (d: NovaCrianca) => Promise<Crianca>;
  criancasDoResponsavel: () => Crianca[];
  criancasDoTerapeuta: () => Crianca[];
  criancaPorId: (id: string) => Crianca | undefined;
  // tarefas
  tarefasDaCrianca: (criancaId: string) => Tarefa[];
  adicionarTarefa: (criancaId: string, d: { emoji: string; nome: string; hora: string }) => void;
  alternarTarefa: (id: string) => void;
  removerTarefa: (id: string) => void;
  // progresso (terapeuta)
  avaliarCrianca: (criancaId: string, fala: number, cognitiva: number) => void;
  statsDaCrianca: (criancaId: string) => Stats;
  // localização (rastreio)
  registrarLocalizacao: (criancaId: string, lat: number, lng: number, origem?: Localizacao["origem"]) => void;
  localizacaoDaCrianca: (criancaId: string) => Localizacao | undefined;
};

export const LOC_PADRAO = { lat: -22.8755, lng: -43.5337 }; // Campo Grande, RJ
