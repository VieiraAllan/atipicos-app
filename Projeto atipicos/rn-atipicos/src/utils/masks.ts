// Máscaras simples de entrada (CPF, CEP, data) — formatação client-side.
export function mascaraCPF(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function mascaraCEP(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 8);
  return d.replace(/(\d{5})(\d)/, "$1-$2");
}

export function mascaraData(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 8);
  return d
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2");
}

export function mascaraHora(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.replace(/(\d{2})(\d)/, "$1:$2");
}

export const MASCARAS = {
  cpf: mascaraCPF,
  cep: mascaraCEP,
  data: mascaraData,
  hora: mascaraHora,
} as const;

export type MascaraTipo = keyof typeof MASCARAS;
