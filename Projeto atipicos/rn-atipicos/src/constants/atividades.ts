// ──────────────────────────────────────────────────────────────────
// Catálogo de atividades das sub-telas (Kids). Cada atividade é uma
// grade de botões que falam ao toque (RF11–RF13). Renderizado pela
// AtividadeGradeScreen, que recebe apenas o id da atividade.
// ──────────────────────────────────────────────────────────────────
export type ItemAtividade = {
  texto?: string;   // exibe um texto grande (letras, números, sílabas)
  emoji?: string;   // exibe um emoji
  cor?: string;     // exibe um quadrado colorido (cores)
  label?: string;   // legenda abaixo
  fala: string;     // o que é falado em voz alta ao tocar
};

export type Atividade = {
  titulo: string;
  colunas: number;
  itens: ItemAtividade[];
};

const LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => ({ texto: l, fala: l }));

const NUMEROS = [
  ["1", "Um"], ["2", "Dois"], ["3", "Três"], ["4", "Quatro"], ["5", "Cinco"],
  ["6", "Seis"], ["7", "Sete"], ["8", "Oito"], ["9", "Nove"], ["10", "Dez"],
].map(([texto, fala]) => ({ texto, fala }));

export const CATALOGO: Record<string, Atividade> = {
  // ── Fonoaudióloga ──
  silabas: {
    titulo: "Repita os sons 🗣️",
    colunas: 3,
    itens: ["PA", "BA", "TA", "DA", "MA", "NA", "LA", "FA", "VA"].map((s) => ({
      texto: s,
      fala: s.toLowerCase(),
    })),
  },
  animais: {
    titulo: "Nomeie os animais 🐶",
    colunas: 2,
    itens: [
      { emoji: "🐶", label: "Cachorro", fala: "Cachorro. Au au!" },
      { emoji: "🐱", label: "Gato", fala: "Gato. Miau!" },
      { emoji: "🐮", label: "Vaca", fala: "Vaca. Muuu!" },
      { emoji: "🦆", label: "Pato", fala: "Pato. Quá quá!" },
      { emoji: "🐓", label: "Galo", fala: "Galo. Có có ró có!" },
      { emoji: "🐑", label: "Ovelha", fala: "Ovelha. Mééé!" },
      { emoji: "🦁", label: "Leão", fala: "Leão. Rárr!" },
      { emoji: "🐝", label: "Abelha", fala: "Abelha. Zzzz!" },
    ],
  },
  musicas: {
    titulo: "Cante a música 🎵",
    colunas: 1,
    itens: [
      { emoji: "🔤", label: "Abcdário", fala: "A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z" },
      { emoji: "⭐", label: "Brilha, Brilha, Estrelinha", fala: "Brilha, brilha, estrelinha. Quero ver você brilhar." },
      { emoji: "🕷️", label: "A Dona Aranha", fala: "A dona aranha subiu pela parede." },
      { emoji: "🦋", label: "Borboletinha", fala: "Borboletinha, tá na cozinha, fazendo chocolate para a madrinha." },
    ],
  },

  // ── Atividade Escolar ──
  letras: { titulo: "Letras 🔤", colunas: 4, itens: LETRAS },
  numeros: { titulo: "Números 🔢", colunas: 5, itens: NUMEROS },
  cores: {
    titulo: "Cores 🎨",
    colunas: 2,
    itens: [
      { cor: "#E53935", label: "Vermelho", fala: "Vermelho" },
      { cor: "#FB8C00", label: "Laranja", fala: "Laranja" },
      { cor: "#FDD835", label: "Amarelo", fala: "Amarelo" },
      { cor: "#43A047", label: "Verde", fala: "Verde" },
      { cor: "#1E88E5", label: "Azul", fala: "Azul" },
      { cor: "#3949AB", label: "Anil", fala: "Anil" },
      { cor: "#8E24AA", label: "Violeta", fala: "Violeta" },
    ],
  },
  formas: {
    titulo: "Formas ⭐",
    colunas: 2,
    itens: [
      { emoji: "⭐", label: "Estrela", fala: "Estrela" },
      { emoji: "🟦", label: "Quadrado", fala: "Quadrado" },
      { emoji: "🔵", label: "Círculo", fala: "Círculo" },
      { emoji: "🔺", label: "Triângulo", fala: "Triângulo" },
      { emoji: "❤️", label: "Coração", fala: "Coração" },
    ],
  },
};

// Menus que apontam para as atividades (ou telas especiais).
export type MenuItem = { emoji: string; ti: string; su: string; destino: string; param?: any };

export const MENU_FONO: MenuItem[] = [
  { emoji: "🗣️", ti: "Repita os sons", su: "Pa, Ba, Ta, Da…", destino: "AtividadeGrade", param: { id: "silabas" } },
  { emoji: "🐶", ti: "Nomeie os animais", su: "Nome e som de cada animal", destino: "AtividadeGrade", param: { id: "animais" } },
  { emoji: "🎵", ti: "Cante a música", su: "Abcdário e cantigas", destino: "AtividadeGrade", param: { id: "musicas" } },
];

export const MENU_PSICO: MenuItem[] = [
  { emoji: "🌬️", ti: "Respiração calmante", su: "Inspira… segura… expira…", destino: "Respiracao" },
  { emoji: "🧩", ti: "Quebra-cabeça das emoções", su: "Em breve", destino: "" },
  { emoji: "🎨", ti: "Pintar sentimentos", su: "Em breve", destino: "" },
  { emoji: "📖", ti: "História social", su: "Em breve", destino: "" },
];

export const MENU_ESCOLA: MenuItem[] = [
  { emoji: "🔤", ti: "Letras", su: "Todo o alfabeto, A a Z", destino: "AtividadeGrade", param: { id: "letras" } },
  { emoji: "🔢", ti: "Números", su: "De 1 a 10", destino: "AtividadeGrade", param: { id: "numeros" } },
  { emoji: "🎨", ti: "Cores", su: "As cores do arco-íris", destino: "AtividadeGrade", param: { id: "cores" } },
  { emoji: "⭐", ti: "Formas", su: "Estrela, quadrado, círculo…", destino: "AtividadeGrade", param: { id: "formas" } },
];
