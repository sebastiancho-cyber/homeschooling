"use client";

import type { ReactNode } from "react";

/* ==========================================================================
   El elenco: diez personajes en SVG.

   Una sola mascota se vuelve papel tapiz a la tercera pregunta. Con diez, cada
   ejercicio trae compañía distinta y la pantalla se siente viva sin cambiar de
   sitio nada de lo que el niño ya aprendió a usar.

   Dos decisiones que sostienen todo el elenco:

   1. La CARA es compartida y los CUERPOS cambian. Así los diez reaccionan
      igual (mira, celebra, se desanima) y se reconocen como una misma familia,
      aunque uno sea un pulpo y otro un robot.
   2. Los rasgos van en tinta oscura, no en blanco. El blanco desaparece sobre
      los cuerpos claros (el pollito amarillo); la tinta oscura funciona sobre
      los diez colores sin excepciones.
   ========================================================================== */

export type Animo = "idle" | "happy" | "sad";

const TINTA = "rgb(var(--ink))";
const ROSA = "rgba(255,105,170,0.5)";

type Cara = { cy: number; spread: number; r: number; mouthY: number; sinBoca?: boolean };

function Rasgos({ animo, cy, spread, r, mouthY, sinBoca }: Cara & { animo: Animo }) {
  const iz = 60 - spread;
  const de = 60 + spread;

  if (animo === "happy") {
    return (
      <>
        {/* Ojos cerrados hacia arriba: el gesto universal de estar contento. */}
        <path
          d={`M${iz - r} ${cy} Q${iz} ${cy - r - 3} ${iz + r} ${cy}`}
          stroke={TINTA}
          strokeWidth={4.5}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M${de - r} ${cy} Q${de} ${cy - r - 3} ${de + r} ${cy}`}
          stroke={TINTA}
          strokeWidth={4.5}
          strokeLinecap="round"
          fill="none"
        />
        {!sinBoca && (
          <path d={`M49 ${mouthY - 3} Q60 ${mouthY + 13} 71 ${mouthY - 3} Z`} fill={TINTA} />
        )}
      </>
    );
  }

  if (animo === "sad") {
    return (
      <>
        <circle cx={iz} cy={cy + 1} r={r * 0.78} fill="white" />
        <circle cx={de} cy={cy + 1} r={r * 0.78} fill="white" />
        <circle cx={iz} cy={cy + 3} r={r * 0.4} fill={TINTA} />
        <circle cx={de} cy={cy + 3} r={r * 0.4} fill={TINTA} />
        {!sinBoca && (
          <path
            d={`M52 ${mouthY + 4} Q60 ${mouthY - 3} 68 ${mouthY + 4}`}
            stroke={TINTA}
            strokeWidth={4}
            strokeLinecap="round"
            fill="none"
          />
        )}
      </>
    );
  }

  return (
    <>
      <circle cx={iz} cy={cy} r={r} fill="white" />
      <circle cx={de} cy={cy} r={r} fill="white" />
      <circle cx={iz + 1} cy={cy + 1} r={r * 0.5} fill={TINTA} />
      <circle cx={de + 1} cy={cy + 1} r={r * 0.5} fill={TINTA} />
      {/* El brillo del ojo: el detalle que separa "vivo" de "dibujado". */}
      <circle cx={iz + 2.6} cy={cy - 1.6} r={r * 0.2} fill="white" />
      <circle cx={de + 2.6} cy={cy - 1.6} r={r * 0.2} fill="white" />
      {!sinBoca && (
        <path
          d={`M52 ${mouthY} Q60 ${mouthY + 7} 68 ${mouthY}`}
          stroke={TINTA}
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
        />
      )}
    </>
  );
}

type Personaje = {
  nombre: string;
  base: string; // token del cuerpo
  deep: string; // token del tono oscuro (orejas, sombras)
  cara: Cara;
  /** Detrás de la cara. */
  cuerpo: (c: string, d: string) => ReactNode;
  /** Delante de la cara: bigotes, picos, hocicos. */
  frente?: (c: string, d: string) => ReactNode;
};

const barriga = <ellipse cx="60" cy="80" rx="28" ry="24" fill="rgba(255,255,255,0.22)" />;
const cachetes = (
  <>
    <ellipse cx="30" cy="76" rx="9" ry="6.5" fill={ROSA} />
    <ellipse cx="90" cy="76" rx="9" ry="6.5" fill={ROSA} />
  </>
);

export const ELENCO: Personaje[] = [
  {
    nombre: "Oso",
    base: "--grape",
    deep: "--grape-deep",
    cara: { cy: 60, spread: 15, r: 10, mouthY: 78 },
    cuerpo: (c, d) => (
      <>
        <circle cx="30" cy="36" r="15" fill={d} />
        <circle cx="90" cy="36" r="15" fill={d} />
        <circle cx="30" cy="36" r="7.5" fill={ROSA} />
        <circle cx="90" cy="36" r="7.5" fill={ROSA} />
        <ellipse cx="60" cy="68" rx="44" ry="42" fill={c} />
        {barriga}
        {cachetes}
      </>
    ),
  },
  {
    nombre: "Gato",
    base: "--tangerine",
    deep: "--tangerine-deep",
    cara: { cy: 60, spread: 15, r: 9.5, mouthY: 78 },
    cuerpo: (c, d) => (
      <>
        <path d="M26 44 L24 14 L50 30 Z" fill={d} strokeLinejoin="round" stroke={d} strokeWidth="6" />
        <path d="M94 44 L96 14 L70 30 Z" fill={d} strokeLinejoin="round" stroke={d} strokeWidth="6" />
        <ellipse cx="60" cy="68" rx="43" ry="41" fill={c} />
        {barriga}
        {cachetes}
      </>
    ),
    frente: (_, d) => (
      <>
        {/* Bigotes: tres trazos por lado, levemente abiertos. */}
        {[-6, 0, 6].map((dy, i) => (
          <g key={i} stroke={d} strokeWidth="2.6" strokeLinecap="round">
            <path d={`M28 ${74 + dy} L10 ${70 + dy * 1.6}`} />
            <path d={`M92 ${74 + dy} L110 ${70 + dy * 1.6}`} />
          </g>
        ))}
      </>
    ),
  },
  {
    nombre: "Rana",
    base: "--grass",
    deep: "--grass-deep",
    // Los ojos de la rana van ARRIBA, montados sobre la cabeza.
    cara: { cy: 36, spread: 20, r: 11, mouthY: 82 },
    cuerpo: (c) => (
      <>
        <circle cx="40" cy="36" r="17" fill={c} />
        <circle cx="80" cy="36" r="17" fill={c} />
        <ellipse cx="60" cy="74" rx="46" ry="36" fill={c} />
        <ellipse cx="60" cy="84" rx="30" ry="20" fill="rgba(255,255,255,0.22)" />
        <ellipse cx="26" cy="80" rx="8" ry="6" fill={ROSA} />
        <ellipse cx="94" cy="80" rx="8" ry="6" fill={ROSA} />
      </>
    ),
  },
  {
    nombre: "Pollito",
    base: "--sun",
    deep: "--sun-deep",
    cara: { cy: 58, spread: 14, r: 9.5, mouthY: 76, sinBoca: true },
    cuerpo: (c, d) => (
      <>
        <ellipse cx="60" cy="68" rx="41" ry="41" fill={c} />
        {/* Ala pegada al costado. */}
        <ellipse cx="26" cy="74" rx="11" ry="17" fill={d} />
        <ellipse cx="60" cy="80" rx="26" ry="22" fill="rgba(255,255,255,0.25)" />
        {/* Tres plumitas en la coronilla. */}
        <path
          d="M52 28 Q60 14 68 28"
          stroke={d}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </>
    ),
    frente: (_, d) => (
      // Pico en vez de boca: por eso este personaje va con `sinBoca`.
      <path d="M53 72 L67 72 L60 84 Z" fill={d} />
    ),
  },
  {
    nombre: "Pulpo",
    base: "--bubble",
    deep: "--bubble-deep",
    cara: { cy: 56, spread: 14, r: 10, mouthY: 74 },
    cuerpo: (c, d) => (
      <>
        <ellipse cx="60" cy="58" rx="40" ry="37" fill={c} />
        {/* Tentáculos: arcos que cuelgan del borde inferior. */}
        {[24, 42, 60, 78, 96].map((x, i) => (
          <path
            key={i}
            d={`M${x} 84 Q${x + (i % 2 ? 7 : -7)} 100 ${x} 112`}
            stroke={i % 2 ? d : c}
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
        ))}
        <ellipse cx="60" cy="66" rx="24" ry="18" fill="rgba(255,255,255,0.22)" />
        <ellipse cx="28" cy="66" rx="8" ry="6" fill={ROSA} />
        <ellipse cx="92" cy="66" rx="8" ry="6" fill={ROSA} />
      </>
    ),
  },
  {
    nombre: "Conejo",
    base: "--sky",
    deep: "--sky-deep",
    cara: { cy: 62, spread: 14, r: 10, mouthY: 80 },
    cuerpo: (c, d) => (
      <>
        <ellipse cx="45" cy="24" rx="9" ry="23" fill={c} />
        <ellipse cx="75" cy="24" rx="9" ry="23" fill={c} />
        <ellipse cx="45" cy="26" rx="4.5" ry="15" fill={ROSA} />
        <ellipse cx="75" cy="26" rx="4.5" ry="15" fill={ROSA} />
        <ellipse cx="60" cy="72" rx="42" ry="38" fill={c} />
        <ellipse cx="60" cy="82" rx="27" ry="21" fill="rgba(255,255,255,0.22)" />
        <ellipse cx="28" cy="78" rx="8" ry="6" fill={ROSA} />
        <ellipse cx="92" cy="78" rx="8" ry="6" fill={ROSA} />
        <ellipse cx="60" cy="72" rx="0" ry="0" fill={d} />
      </>
    ),
  },
  {
    nombre: "Robot",
    base: "--mint",
    deep: "--mint-deep",
    cara: { cy: 62, spread: 15, r: 10, mouthY: 82 },
    cuerpo: (c, d) => (
      <>
        {/* Antena */}
        <path d="M60 30 L60 18" stroke={d} strokeWidth="4" strokeLinecap="round" />
        <circle cx="60" cy="14" r="6" fill={d} />
        {/* Cabeza cuadrada: el único del elenco que no es redondo. */}
        <rect x="20" y="30" width="80" height="72" rx="20" fill={c} />
        <rect x="30" y="44" width="60" height="46" rx="14" fill="rgba(255,255,255,0.2)" />
        {/* Orejeras */}
        <rect x="10" y="56" width="10" height="22" rx="5" fill={d} />
        <rect x="100" y="56" width="10" height="22" rx="5" fill={d} />
      </>
    ),
  },
  {
    nombre: "Dino",
    base: "--grass",
    deep: "--grass-deep",
    cara: { cy: 62, spread: 14, r: 10, mouthY: 80 },
    cuerpo: (c, d) => (
      <>
        {/* Cresta de púas. Ojo con la altura: el cuerpo empieza en y≈30, así que
            una púa que no pase de ahí queda enterrada y el dino es una bola. */}
        {[
          [36, 22],
          [60, 8],
          [84, 22],
        ].map(([x, y], i) => (
          <path key={i} d={`M${x - 11} 48 L${x} ${y} L${x + 11} 48 Z`} fill={d} />
        ))}
        <ellipse cx="60" cy="70" rx="43" ry="40" fill={c} />
        <ellipse cx="60" cy="82" rx="27" ry="20" fill="rgba(255,255,255,0.22)" />
        <ellipse cx="28" cy="78" rx="8" ry="6" fill={ROSA} />
        <ellipse cx="92" cy="78" rx="8" ry="6" fill={ROSA} />
      </>
    ),
  },
  {
    nombre: "Zorro",
    base: "--tangerine",
    deep: "--tangerine-deep",
    cara: { cy: 58, spread: 15, r: 9.5, mouthY: 84, sinBoca: true },
    cuerpo: (c, d) => (
      <>
        <path d="M24 46 L22 12 L52 30 Z" fill={d} strokeLinejoin="round" stroke={d} strokeWidth="5" />
        <path d="M96 46 L98 12 L68 30 Z" fill={d} strokeLinejoin="round" stroke={d} strokeWidth="5" />
        <ellipse cx="60" cy="66" rx="42" ry="40" fill={c} />
      </>
    ),
    frente: (_, d) => (
      <>
        {/* Hocico blanco con nariz: lo que lo hace zorro y no gato. */}
        <ellipse cx="60" cy="84" rx="24" ry="17" fill="white" />
        <ellipse cx="60" cy="76" rx="6" ry="4.5" fill={d} />
        <path
          d="M60 80 L60 86 M52 92 Q60 86 68 92"
          stroke={TINTA}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </>
    ),
  },
  {
    nombre: "Fantasma",
    base: "--grape",
    deep: "--grape-deep",
    cara: { cy: 58, spread: 14, r: 10, mouthY: 76 },
    cuerpo: (c) => (
      <>
        {/* Cuerpo de una sola pieza: cúpula arriba, ondas abajo. */}
        <path
          d="M18 68 A42 42 0 0 1 102 68 L102 100 Q95 112 88 100 Q81 88 74 100 Q67 112 60 100 Q53 88 46 100 Q39 112 32 100 Q25 88 18 100 Z"
          fill={c}
        />
        <ellipse cx="28" cy="72" rx="8" ry="6" fill={ROSA} />
        <ellipse cx="92" cy="72" rx="8" ry="6" fill={ROSA} />
      </>
    ),
  },
];

/** Elige personaje a partir del id del ejercicio: estable entre servidor y
 *  cliente (nada de azar en el render) y distinto en cada pregunta. */
export function personajeParaId(id: string): number {
  let suma = 0;
  for (let i = 0; i < id.length; i++) suma = (suma + id.charCodeAt(i) * (i + 1)) % 9973;
  return suma % ELENCO.length;
}

export function Mascota({
  personaje = 0,
  animo = "idle",
  size = 108,
}: {
  personaje?: number;
  animo?: Animo;
  size?: number;
}) {
  const p = ELENCO[personaje % ELENCO.length];
  // Desanimado, el personaje pierde el color: se apaga a gris.
  const c = animo === "sad" ? "rgb(var(--ink-faint))" : `rgb(var(${p.base}))`;
  const d = animo === "sad" ? "rgb(var(--ink-muted))" : `rgb(var(${p.deep}))`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      role="img"
      aria-label={p.nombre}
      className={animo === "happy" ? "rec-pop" : animo === "sad" ? "rec-shake" : "rec-float"}
    >
      {p.cuerpo(c, d)}
      <Rasgos animo={animo} {...p.cara} />
      {p.frente?.(c, d)}
    </svg>
  );
}
