// Dados de demonstração das áreas internas (mock — viriam do Firestore).
export const NOME_KID = "Lucas";
export const NOME_RESP = "Maria";
export const NOME_TERA = "Dra. Helena";

export type Atividade = { emoji: string; ti: string; su: string };
export type Tarefa = { emoji: string; t: string; time: string; done: boolean };
export type Simbolo = { lbl: string; emoji: string };
export type Paciente = { nome: string; idade: string; diag: string; emoji: string };
export type Noticia = { emoji: string; ti: string; de: string; src: string };

export const CARDS_KIDS = [
  { label: "EMOÇÕES", rota: "KidsEmocoes", bg: "#FFC6C6", emoji: "😀" },
  { label: "TAREFAS", rota: "KidsTarefas", bg: "#B7F5A6", emoji: "⏰" },
  { label: "FONOAUDIÓLOGA", rota: "KidsFono", bg: "#FFC0DD", emoji: "🎤" },
  { label: "PSICÓLOGO", rota: "KidsPsico", bg: "#AEE3FF", emoji: "🧠" },
  { label: "COMUNICAÇÃO", rota: "KidsComunicacao", bg: "#FFD9A8", emoji: "💬" },
  { label: "ATIVIDADE ESCOLAR", rota: "KidsEscola", bg: "#FF9E9E", emoji: "📖" },
] as const;

export const EMOCOES: Simbolo[] = [
  { lbl: "FELIZ", emoji: "😀" }, { lbl: "TRISTE", emoji: "😢" },
  { lbl: "BRAVO", emoji: "😠" }, { lbl: "COM SONO", emoji: "😴" },
  { lbl: "CANSADO", emoji: "🥱" }, { lbl: "ANIMADO", emoji: "🤩" },
];

export const TAREFAS: Tarefa[] = [
  { emoji: "🦷", t: "Escovar os dentes", time: "08:00", done: true },
  { emoji: "🥣", t: "Tomar café da manhã", time: "08:30", done: true },
  { emoji: "🎒", t: "Ir para a escola", time: "09:00", done: false },
  { emoji: "🍽️", t: "Almoçar", time: "12:00", done: false },
  { emoji: "📚", t: "Lição de casa", time: "15:00", done: false },
  { emoji: "🛁", t: "Tomar banho", time: "19:00", done: false },
  { emoji: "😴", t: "Hora de dormir", time: "21:00", done: false },
];

export const FONO: Atividade[] = [
  { emoji: "🗣️", ti: "Repita os sons", su: "Pa, Ba, Ta, Da" },
  { emoji: "🐶", ti: "Nomeie os animais", su: "Cachorro, gato, vaca…" },
  { emoji: "🎵", ti: "Cante a música", su: "Brincando com a fala" },
  { emoji: "👄", ti: "Exercícios de boca", su: "Movimentos da língua" },
];
export const PSICO: Atividade[] = [
  { emoji: "🧩", ti: "Quebra-cabeça das emoções", su: "Reconhecer sentimentos" },
  { emoji: "🌬️", ti: "Respiração calmante", su: "Inspira… expira…" },
  { emoji: "🎨", ti: "Pintar sentimentos", su: "Expressão livre" },
  { emoji: "📖", ti: "História social", su: "Situações do dia a dia" },
];
export const ESCOLA: Atividade[] = [
  { emoji: "🔤", ti: "Letras", su: "Conhecer o alfabeto" },
  { emoji: "🔢", ti: "Números", su: "Contar de 1 a 10" },
  { emoji: "🎨", ti: "Cores", su: "Identificar cores" },
  { emoji: "⭐", ti: "Formas", su: "Círculo, quadrado…" },
  { emoji: "🐾", ti: "Animais", su: "Sons e nomes" },
];

export const SIMBOLOS_AAC: Simbolo[] = [
  { lbl: "EU", emoji: "🧒" }, { lbl: "QUERO", emoji: "🙋" }, { lbl: "COMER", emoji: "🍽️" },
  { lbl: "BEBER", emoji: "🥤" }, { lbl: "ÁGUA", emoji: "💧" }, { lbl: "BANHEIRO", emoji: "🚽" },
  { lbl: "BRINCAR", emoji: "🧸" }, { lbl: "DORMIR", emoji: "😴" }, { lbl: "AJUDA", emoji: "🆘" },
  { lbl: "SIM", emoji: "✅" }, { lbl: "NÃO", emoji: "❌" }, { lbl: "MAIS", emoji: "➕" },
];

export const PACIENTES: Paciente[] = [
  { nome: "Ana", idade: "6 anos", diag: "TEA Nível 1", emoji: "🧒" },
  { nome: "Pedro", idade: "8 anos", diag: "TEA + TDAH", emoji: "👦" },
  { nome: "Lucas", idade: "5 anos", diag: "TEA Nível 2", emoji: "🧒" },
];

export const NOTICIAS: Noticia[] = [
  { emoji: "📰", ti: "Intervenção precoce traz ganhos no TEA", de: "Estudo aponta avanços quando a terapia começa antes dos 3 anos.", src: "via NewsAPI" },
  { emoji: "🧩", ti: "Tecnologia assistiva amplia a comunicação", de: "Aplicativos de CAA ajudam crianças não verbais a se expressarem.", src: "via NewsAPI" },
  { emoji: "🏫", ti: "Inclusão escolar e o papel da família", de: "Especialistas destacam a parceria entre escola e responsáveis.", src: "via NewsAPI" },
];

export const CONFIG_ITENS: Atividade[] = [
  { emoji: "🔔", ti: "Notificações", su: "Alertas e lembretes" },
  { emoji: "👤", ti: "Minha conta", su: "Dados pessoais" },
  { emoji: "🔒", ti: "Privacidade e segurança", su: "Senha e dados" },
  { emoji: "❓", ti: "Ajuda", su: "Dúvidas frequentes" },
];
