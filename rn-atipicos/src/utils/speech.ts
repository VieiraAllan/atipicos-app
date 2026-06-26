// Voz (RF11–RF13): texto → fala em pt-BR via expo-speech.
import * as Speech from "expo-speech";

export function falar(texto: string): void {
  try {
    Speech.stop();
    Speech.speak(texto, { language: "pt-BR", rate: 0.95 });
  } catch (e) {
    // silencioso — voz é um reforço, não pode quebrar a tela
  }
}
