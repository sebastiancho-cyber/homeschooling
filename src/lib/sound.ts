"use client";

// Sonidos sintetizados en el navegador: cero archivos que descargar y cero
// espera la primera vez. Un solo AudioContext, creado al primer uso (los
// navegadores bloquean el audio hasta que hay un gesto del usuario).
let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(
  freq: number,
  startOffset: number,
  duration: number,
  type: OscillatorType,
  peakGain: number,
) {
  const audio = getContext();
  if (!audio) return;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const t0 = audio.currentTime + startOffset;
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(peakGain, t0 + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
  osc.connect(gain).connect(audio.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

/** Acierto: arpegio mayor ascendente (do-mi-sol). Premia sin durar tanto que estorbe. */
export function playCorrect() {
  tone(523.25, 0, 0.14, "triangle", 0.16);
  tone(659.25, 0.07, 0.14, "triangle", 0.16);
  tone(783.99, 0.14, 0.26, "triangle", 0.18);
}

/** Error: dos notas graves que bajan. Informa, no castiga — nada de "buzz" agresivo. */
export function playIncorrect() {
  tone(233.08, 0, 0.16, "sine", 0.15);
  tone(185.0, 0.1, 0.26, "sine", 0.14);
}

/** Cierre de la tanda: una fanfarria corta, la única recompensa larga del juego. */
export function playFinish() {
  tone(523.25, 0, 0.15, "triangle", 0.15);
  tone(659.25, 0.12, 0.15, "triangle", 0.15);
  tone(783.99, 0.24, 0.15, "triangle", 0.15);
  tone(1046.5, 0.36, 0.45, "triangle", 0.18);
}
