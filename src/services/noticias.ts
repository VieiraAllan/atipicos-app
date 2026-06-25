// ──────────────────────────────────────────────────────────────────
// Feed de notícias sobre TEA (RF19).
//
// Consome a NewsAPI (https://newsapi.org) quando há uma chave configurada
// em EXPO_PUBLIC_NEWSAPI_KEY. Sem chave (ou em caso de falha/sem internet),
// cai no conteúdo local — o app nunca quebra na apresentação.
//
// Em React Native o fetch é nativo (sem CORS), então a chamada funciona em
// desenvolvimento e no APK. A chave fica embutida no app (aceitável para um
// projeto acadêmico; em produção, use um proxy/back-end).
// ──────────────────────────────────────────────────────────────────
import { Noticia, NOTICIAS } from "@/constants/areaData";

const CHAVE = process.env.EXPO_PUBLIC_NEWSAPI_KEY;

export const noticiasApiHabilitada = !!CHAVE;

// Busca notícias reais sobre autismo (pt-BR). Retorna sempre uma lista
// utilizável: a da API quando possível, senão a local.
export async function buscarNoticias(): Promise<{ itens: Noticia[]; aoVivo: boolean }> {
  if (!CHAVE) return { itens: NOTICIAS, aoVivo: false };

  try {
    const url =
      "https://newsapi.org/v2/everything?" +
      "q=" + encodeURIComponent('autismo OR TEA OR "transtorno do espectro"') +
      "&language=pt&sortBy=publishedAt&pageSize=12&apiKey=" + CHAVE;

    const resp = await fetch(url);
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    const data = await resp.json();
    if (data.status !== "ok" || !Array.isArray(data.articles)) throw new Error("resposta inválida");

    const itens: Noticia[] = data.articles
      .filter((a: any) => a.title && a.title !== "[Removed]")
      .slice(0, 10)
      .map((a: any) => ({
        emoji: "📰",
        ti: a.title as string,
        de: (a.description || a.source?.name || "") as string,
        src: a.source?.name ? `via ${a.source.name}` : "via NewsAPI",
        url: a.url as string,
      }));

    return itens.length ? { itens, aoVivo: true } : { itens: NOTICIAS, aoVivo: false };
  } catch {
    return { itens: NOTICIAS, aoVivo: false };
  }
}
