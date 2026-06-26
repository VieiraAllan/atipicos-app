import { useEffect, useRef } from "react";
import { useApp } from "@/store/AppStore";
import { dispararAlertaSOS } from "@/services/notificacoes";

// Observa a localização das crianças do responsável e dispara uma
// notificação local quando chega um novo acionamento de SOS.
// Montado na home do responsável (tela "pai" da área).
export function useAlertaSOS() {
  const { criancasDoResponsavel, localizacaoDaCrianca } = useApp();
  const criancas = criancasDoResponsavel();
  // último timestamp de SOS já notificado, por criança
  const vistos = useRef<Record<string, number>>({});
  const iniciado = useRef(false);

  useEffect(() => {
    criancas.forEach((c) => {
      const loc = localizacaoDaCrianca(c.id);
      if (!loc) return;
      const ultimoSOS = loc.origem === "sos" ? loc.ts : 0;
      const jaVisto = vistos.current[c.id] ?? 0;

      // Na primeira passada, só registra o estado atual (não notifica
      // SOS antigos ao abrir o app).
      if (!iniciado.current) {
        vistos.current[c.id] = ultimoSOS;
        return;
      }
      if (ultimoSOS > jaVisto) {
        vistos.current[c.id] = ultimoSOS;
        dispararAlertaSOS(c.nome).catch(() => {});
      }
    });
    iniciado.current = true;
  });
}
