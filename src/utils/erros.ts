// Traduz códigos de erro do Firebase Auth em mensagens claras em português.
export function mensagemErroAuth(e: any): string {
  const code: string = e?.code || "";
  switch (code) {
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
    default:
      return "Algo deu errado. Tente novamente.";
  }
}
