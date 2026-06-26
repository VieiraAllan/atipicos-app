// Traduz códigos de erro do Firebase Auth em mensagens claras em português.
export function mensagemErroAuth(e: any): string {
  const code: string = e?.code || "";
  switch (code) {
    case "atipicos/perfil-incorreto": {
      const nomes: Record<string, string> = {
        responsavel: "Responsável",
        terapeuta: "Terapeuta",
        atipico: "Atípico",
      };
      const p = nomes[e?.perfil] || "outro";
      return `Esta conta é do tipo "${p}". Use o login de ${p}.`;
    }
    case "auth/invalid-email":
      return "E-mail inválido. Confira o formato.";
    case "auth/user-not-found":
      return "Usuário não encontrado. Verifique o e-mail ou crie uma conta.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "E-mail ou senha incorretos.";
    case "auth/email-already-in-use":
      return "Este e-mail já está cadastrado. Tente fazer login.";
    case "auth/weak-password":
      return "A senha deve ter pelo menos 6 caracteres.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Aguarde um momento e tente de novo.";
    case "auth/network-request-failed":
      return "Sem conexão. Verifique sua internet.";

    // ── Erros do Firestore (a conta no Auth pode existir, mas a gravação
    //    dos dados falhou). Causa nº1: regras não publicadas. ──
    case "permission-denied":
      return "Banco bloqueado (permission-denied). Publique o arquivo firestore.rules no Console do Firebase (Firestore → Regras → Publicar).";
    case "unavailable":
      return "Firestore indisponível. Verifique a internet e se o banco foi criado no Console.";
    case "not-found":
      return "Banco de dados não encontrado. Crie o Firestore no Console (Firestore Database → Criar banco de dados).";
    case "failed-precondition":
      return "Firestore não inicializado. Crie o banco no Console e tente de novo.";

    default:
      // Revela o código real para facilitar o diagnóstico.
      return "Erro: " + (code || e?.message || "desconhecido") + ". Tente novamente.";
  }
}
