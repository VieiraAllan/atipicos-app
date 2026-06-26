// Dados estáticos das áreas internas (conteúdo fixo de UI).
// Os dados dinâmicos (usuários, crianças, tarefas, progresso) vivem no store.
export type ItemLista = { emoji: string; ti: string; su: string };
export type Simbolo = { lbl: string; emoji: string };
export type Noticia = { emoji: string; ti: string; de: string; src: string; url?: string };

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

export const SIMBOLOS_AAC: Simbolo[] = [
  { lbl: "EU", emoji: "🧒" }, { lbl: "QUERO", emoji: "🙋" }, { lbl: "COMER", emoji: "🍽️" },
  { lbl: "BEBER", emoji: "🥤" }, { lbl: "ÁGUA", emoji: "💧" }, { lbl: "BANHEIRO", emoji: "🚽" },
  { lbl: "BRINCAR", emoji: "🧸" }, { lbl: "DORMIR", emoji: "😴" }, { lbl: "AJUDA", emoji: "🆘" },
  { lbl: "SIM", emoji: "✅" }, { lbl: "NÃO", emoji: "❌" }, { lbl: "MAIS", emoji: "➕" },
];

export const NOTICIAS: Noticia[] = [
  { emoji: "📰", ti: "Intervenção precoce traz ganhos no TEA", de: "Estudo aponta avanços quando a terapia começa antes dos 3 anos.", src: "via NewsAPI" },
  { emoji: "🧩", ti: "Tecnologia assistiva amplia a comunicação", de: "Aplicativos de CAA ajudam crianças não verbais a se expressarem.", src: "via NewsAPI" },
  { emoji: "🏫", ti: "Inclusão escolar e o papel da família", de: "Especialistas destacam a parceria entre escola e responsáveis.", src: "via NewsAPI" },
];

export const CONFIG_ITENS: (ItemLista & { rota?: string })[] = [
  { emoji: "🔔", ti: "Notificações", su: "Alerta de SOS", rota: "ConfigNotificacoes" },
  { emoji: "👤", ti: "Minha conta", su: "Seus dados cadastrados", rota: "MinhaConta" },
  { emoji: "🔒", ti: "Privacidade e segurança", su: "Trocar senha", rota: "TrocarSenha" },
  { emoji: "💛", ti: "Sobre", su: "A equipe do projeto", rota: "Sobre" },
];
