import Link from "next/link";
import type { PathNode } from "@/lib/curriculum";

/* La ruta: el mapa del grado. Los temas no son una lista, son estaciones de un
   camino que sube. Los que ya tienen ejercicios detrás se pintan a color y se
   pueden tocar; los que todavía no, quedan apagados y con candado — la ruta
   dice la verdad sobre lo que hay construido. */

const COLUMN_W = 300; // Cabe en 375px con margen a los lados.
const NODE = 76; // Diámetro del nodo: pulgar de niño, sin apuntar.
const SPACING = 116;
// El vaivén del camino. Un ciclo de ocho da una onda completa sin repetirse
// demasiado pronto.
const OFFSETS = [0, 52, 74, 52, 0, -52, -74, -52];

export const TONOS_TEMA = [
  { bg: "bg-sky", edge: "var(--sky-deep)", fg: "text-white", dot: "bg-sky" },
  { bg: "bg-grape", edge: "var(--grape-deep)", fg: "text-white", dot: "bg-grape" },
  { bg: "bg-tangerine", edge: "var(--tangerine-deep)", fg: "text-white", dot: "bg-tangerine" },
  { bg: "bg-mint", edge: "var(--mint-deep)", fg: "text-white", dot: "bg-mint" },
  { bg: "bg-bubble", edge: "var(--bubble-deep)", fg: "text-white", dot: "bg-bubble" },
  { bg: "bg-sun", edge: "var(--sun-deep)", fg: "text-ink", dot: "bg-sun" },
  { bg: "bg-grass", edge: "var(--grass-deep)", fg: "text-white", dot: "bg-grass" },
];

export function LearningPath({ grade, nodes }: { grade: number; nodes: PathNode[] }) {
  const pts = nodes.map((_, i) => ({
    x: COLUMN_W / 2 + OFFSETS[i % OFFSETS.length],
    y: SPACING / 2 + i * SPACING,
  }));
  const height = nodes.length * SPACING;

  // Curvas suaves entre estación y estación: los tiradores salen en vertical, así
  // el camino entra y sale de cada nodo por arriba y por abajo, nunca de lado.
  const d = pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = pts[i - 1];
      return ` C ${prev.x} ${prev.y + SPACING / 2}, ${p.x} ${p.y - SPACING / 2}, ${p.x} ${p.y}`;
    })
    .join("");

  const primero = nodes.findIndex((n) => n.exerciseCount > 0);

  return (
    <div className="relative mx-auto" style={{ width: COLUMN_W, height }}>
      <svg
        className="absolute inset-0"
        width={COLUMN_W}
        height={height}
        aria-hidden
        style={{ overflow: "visible" }}
      >
        <path d={d} fill="none" stroke="rgb(var(--hairline))" strokeWidth={16} strokeLinecap="round" />
        {/* Los puntos blancos son la línea central del camino: sin ellos es un
            tubo gris; con ellos, una carretera. */}
        <path
          d={d}
          fill="none"
          stroke="rgb(var(--surface))"
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray="0 22"
        />
      </svg>

      {nodes.map((node, i) => {
        const p = pts[i];
        const tono = TONOS_TEMA[i % TONOS_TEMA.length];
        const listo = node.exerciseCount > 0;
        const esPrimero = i === primero;

        const comun = "absolute flex items-center justify-center rounded-full no-select";
        const pos = { left: p.x - NODE / 2, top: p.y - NODE / 2, width: NODE, height: NODE };

        if (!listo) {
          return (
            <div
              key={node.id}
              className={`${comun} border-4 border-dashed border-hairline bg-raised text-ink-faint`}
              style={pos}
              title={`${node.enunciado} — próximamente`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="4" y="10" width="16" height="10" rx="2.5" fill="currentColor" />
                <path
                  d="M8 10V7.5a4 4 0 0 1 8 0V10"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
              <span className="sr-only">{node.enunciado} (próximamente)</span>
            </div>
          );
        }

        return (
          <div key={node.id}>
            {esPrimero && (
              // Una sola cosa rebota en la pantalla: por dónde se empieza.
              <div
                className="rec-bounce absolute z-10 whitespace-nowrap"
                style={{ left: p.x, top: p.y - NODE / 2 - 44, transform: "translateX(-50%)" }}
              >
                <span className="card3d block px-3 py-1.5 font-display text-xs text-grass">
                  ¡EMPIEZA AQUÍ!
                </span>
              </div>
            )}
            <Link
              href={`/matematicas/${grade}/practicar?tema=${node.num}`}
              className={`btn3d ${comun} ${tono.bg} ${tono.fg}`}
              style={{ ...pos, ["--btn-edge" as string]: tono.edge, ["--btn-depth" as string]: "6px" }}
              title={node.enunciado}
            >
              <span className="font-display text-2xl leading-none tabular-nums">{node.num}</span>
              <span className="sr-only">{node.enunciado}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
