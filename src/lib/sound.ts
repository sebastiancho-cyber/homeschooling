"use client";

// Dos tonos cortos generados en el navegador (sin archivos que cargar): un timbre ascendente
// para acierto, uno grave y descendente para error. Un solo AudioContext, creado al primer
// uso (los navegadores bloquean el audio hasta un gesto del usuario).
let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(freq: number, startOffset: number, duration: number, type: OscillatorType, peakGain: number) {
  const audio = getContext();
  if (!audio) return;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const t0 = audio.currentTime + startOffset;
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(peakGain, t0 + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
  osc.connect(gain).connect(audio.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

export function playCorrect() {
  // Dos notas ascendentes (do-mi), como un "ding" breve — refuerzo, no distracción.
  tone(523.25, 0, 0.16, "sine", 0.18);
  tone(659.25, 0.08, 0.2, "sine", 0.18);
}

export function playIncorrect() {
  // Una sola nota grave y corta, sin dramatismo: informa, no castiga.
  tone(196, 0, 0.22, "sine", 0.15);
}
