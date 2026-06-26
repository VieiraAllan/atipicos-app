// Equipe do projeto Atípicos — exibida na tela "Sobre".
// ✏️  Edite os nomes abaixo (campo "nome"). As fotos já estão recortadas (quadrado, foco no rosto).
import { ImageSourcePropType } from "react-native";

export type Integrante = { foto: ImageSourcePropType; nome: string; cor: string };

export const MISSAO =
  "O Atípicos conecta crianças atípicas, suas famílias e terapeutas num só lugar — rotina, " +
  "comunicação e acompanhamento pensados para o ritmo de cada criança. Acreditamos que tecnologia " +
  "com afeto torna o cuidado mais leve e o desenvolvimento mais conectado.";

export const EQUIPE: Integrante[] = [
  { foto: require("../../assets/equipe/p1.png"), nome: "Nome completo", cor: "#C9F0D4" },
  { foto: require("../../assets/equipe/p2.png"), nome: "Nome completo", cor: "#FFE0B0" },
  { foto: require("../../assets/equipe/p3.png"), nome: "Nome completo", cor: "#D9D4FF" },
  { foto: require("../../assets/equipe/p4.png"), nome: "Nome completo", cor: "#FFD0D0" },
  { foto: require("../../assets/equipe/p5.png"), nome: "Nome completo", cor: "#BFE9EC" },
  { foto: require("../../assets/equipe/p6.png"), nome: "Nome completo", cor: "#FFE9A8" },
];
