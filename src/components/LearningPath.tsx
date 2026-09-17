"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PathNode } from "@/lib/curriculum";
import { claveLeccion, estrellasDe, leerProgreso, type Progreso } from "@/lib/progress";

/* La ruta: el mapa del grado. Los temas no son una lista, son estaciones de un
   camino que sube, y se abren de a una: hasta no terminar la estación actual no
   aparece la siguiente. Cada estación terminada muestra las estrellas que sacó.

   El progreso se lee DESPUÉS de montar, no durante el render. El servidor no
   tiene acceso a localStorage, así que pinta la ruta como si no hubiera nada
   hecho; si el cliente pintara otra cosa en el primer render, el HTML no
   coincidiría y React tumbaría el árbol (el error de hidratación que ya nos
   costó un rato). Pintando primero lo mismo que el servidor y aplicando el
   progreso en un efecto, los dos coinciden siempre. */

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
  { bg: "bg-sun", edge: "var(--sun-deep)", fg: "text-white", dot: "bg-sun" },
  { bg: "bg-grass", edge: "var(--grass-deep)", fg: "text-white", dot: "bg-grass" },
];

type Estado = "hecha" | "abierta" | "bloqueada" | "sin-contenido";

function Estrellas({ n, size = 12 }: { n: number; size?: number }) {
  return (
    <span className="flex gap-px" role="img" aria-label={`${n} de 3 estrellas`}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden
          style={{
            fontSize: size,
            lineHeight: 1,
            color: i < n ? "rgb(var(--sun))" : "rgb(var(--hairline))",
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function Candado({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="10" width="16" height="10" rx="2.5" fill="currentColor" />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function LearningPath({ grade, nodes }: { grade: number; nodes: PathNode[] }) {
  const [progreso, setProgreso] = useState<Progreso>({});

  useEffect(() => {
    setProgreso(leerProgreso());
  }, []);

  /* Una estación se abre cuando la ANTERIOR CON CONTENIDO quedó APROBADA (al
     menos una estrella). Jugarla y reprobarla no basta: se puede repetir las
     veces que haga falta, pero la ruta no avanza.

     Los temas sin ejercicios no cuentan para el bloqueo: si contaran, un tema
     vacío en medio cerraría la ruta para siempre. */
  let anteriorAprobada = true; // No hay anterior: la primera siempre está abierta.
  const estados: { estado: Estado; estrellas: number; intentada: boolean }[] = nodes.map((n) => {
    if (n.exerciseCount === 0) return { estado: "sin-contenido", estrellas: 0, intentada: false };
    const intento = progreso[claveLeccion(grade, n.num)];
    // La estrella se calcula con la escala de hoy, no con la que estaba
    // vigente cuando se jugó: así un ajuste de la escala recalifica solo.
    const estrellas = estrellasDe(intento);
    const abierta = anteriorAprobada;
    anteriorAprobada = estrellas > 0;
    if (estrellas > 0) return { estado: "hecha", estrellas, intentada: true };
    return { estado: abierta ? "abierta" : "bloqueada", estrellas: 0, intentada: Boolean(intento) };
  });

  const jugables = nodes.filter((n) => n.exerciseCount > 0).length;
  const hechas = estados.filter((e) => e.estado === "hecha").length;
  const primeraAbierta = estados.findIndex((e) => e.estado === "abierta");

  const pts = nodes.map((_, i) => ({
    x: COLUMN_W / 2 + OFFSETS[i % OFFSETS.length],
    y: SPACING / 2 + i * SPACING,
  }));
  // El alto lleva un margen extra abajo: las estrellas del último nodo cuelgan
  // por fuera de su celda.
  const height = nodes.length * SPACING + 20;

  // Curvas suaves entre estación y estación: los tiradores salen en vertical, así
  // el camino entra y sale de cada nodo por arriba y por abajo, nunca de lado.
  const d = pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = pts[i - 1];
      return ` C ${prev.x} ${prev.y + SPACING / 2}, ${p.x} ${p.y - SPACING / 2}, ${p.x} ${p.y}`;
    })
    .join("");

  return (
    <>
      {/* Cuánto llevas del grado. */}
      <div className="mb-6 flex items-center gap-3 px-1">
        <div className="progress-track h-3 flex-1">
          <div
            className="progress-fill"
            style={{ width: `${jugables ? (hechas / jugables) * 100 : 0}%` }}
          />
        </div>
        <span className="shrink-0 font-display text-sm tabular-nums text-ink-muted">
          {hechas}/{jugables}
        </span>
      </div>

      <div className="relative mx-auto" style={{ width: COLUMN_W, height }}>
        <svg className="absolute inset-0" width={COLUMN_W} height={height} aria-hidden style={{ overflow: "visible" }}>
          <path d={d} fill="none" stroke="rgb(var(--hairline))" strokeWidth={16} strokeLinecap="round" />
          {/* Los puntos blancos son la línea central del camino: sin ellos es un
              tubo gris; con ellos, una carretera. */}
          <path d={d} fill="none" stroke="rgb(var(--surface))" strokeWidth={5} strokeLinecap="round" strokeDasharray="0 22" />
        </svg>

        {nodes.map((node, i) => {
          const p = pts[i];
          const tono = TONOS_TEMA[i % TONOS_TEMA.length];
          const { estado, estrellas, intentada } = estados[i];
          const comun = "absolute flex items-center justify-center rounded-full no-select";
          const pos = { left: p.x - NODE / 2, top: p.y - NODE / 2, width: NODE, height: NODE };

          if (estado === "sin-contenido" || estado === "bloqueada") {
            const sinContenido = estado === "sin-contenido";
            return (
              <div key={node.id}>
                <div
                  className={`${comun} text-ink-faint ${
                    sinContenido
                      ? "border-4 border-dashed border-hairline bg-raised"
                      : "border-4 border-hairline bg-raised"
                  }`}
                  style={pos}
                  title={
                    sinContenido
                      ? `${node.enunciado} — próximamente`
                      : `${node.enunciado} — aprueba el tema anterior para abrirlo`
                  }
                >
                  <Candado />
                  <span className="sr-only">
                    {node.enunciado} ({sinContenido ? "próximamente" : "bloqueado"})
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div key={node.id}>
              {i === primeraAbierta && (
                // Una sola cosa rebota en la pantalla: por dónde se sigue.
                <div
                  className="rec-bounce absolute z-10 whitespace-nowrap"
                  // -56 y no -44: a -44 el globo roza las estrellas de la
                  // estación de arriba, que cuelgan por debajo de su nodo.
                  style={{ left: p.x, top: p.y - NODE / 2 - 56, transform: "translateX(-50%)" }}
                >
                  <span className="card3d block px-3 py-1.5 font-display text-xs text-grass">
                    {hechas === 0 ? "¡EMPIEZA AQUÍ!" : "¡SIGUE AQUÍ!"}
                  </span>
                </div>
              )}

              <Link
                href={`/matematicas/${grade}/practicar?tema=${node.num}`}
                className={`btn3d texto-ficha ${comun} ${tono.bg} ${tono.fg}`}
                style={{ ...pos, ["--btn-edge" as string]: tono.edge, ["--btn-depth" as string]: "6px" }}
                title={node.enunciado}
              >
                <span className="font-display text-2xl leading-none tabular-nums">{node.num}</span>
                <span className="sr-only">{node.enunciado}</span>
              </Link>

              {/* Las estrellas también aparecen —vacías— cuando se jugó y no se
                  aprobó: así se ve que ya se intentó y que falta repetirla. */}
              {(estado === "hecha" || intentada) && (
                <div
                  className="absolute z-10"
                  style={{ left: p.x, top: p.y + NODE / 2 - 2, transform: "translateX(-50%)" }}
                >
                  <span className="card3d flex px-1.5 py-0.5" style={{ borderRadius: 999 }}>
                    <Estrellas n={estrellas} />
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* --- El detalle, para quien acompaña ------------------------------- */}
      <section className="mt-12">
        <h2 className="mb-3 px-1 font-display text-lg text-ink">Lo que vas a aprender</h2>
        <ol className="flex flex-col gap-2">
          {nodes.map((node, i) => {
            const tono = TONOS_TEMA[i % TONOS_TEMA.length];
            const { estado, estrellas, intentada } = estados[i];
            const jugable = estado === "hecha" || estado === "abierta";
            return (
              <li
                key={node.id}
                className={`card3d flex items-start gap-3 px-3 py-3 ${jugable ? "" : "opacity-55"}`}
              >
                {/* El mismo color y el mismo número que en la ruta: así se sabe
                    qué bolita del camino es cada renglón. */}
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm tabular-nums ${
                    jugable ? `texto-ficha ${tono.dot} ${tono.fg}` : "bg-raised text-ink-faint"
                  }`}
                >
                  {node.num}
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="font-sans text-sm font-bold leading-snug text-ink">{node.enunciado}</p>
                  <div className="mt-1 flex items-center gap-2">
                    {(estado === "hecha" || intentada) && <Estrellas n={estrellas} size={13} />}
                    <span className="font-sans text-xs font-bold text-ink-faint">
                      {estado === "hecha"
                        ? "Aprobado"
                        : intentada
                          ? "Te faltó poco, inténtalo otra vez"
                          : estado === "abierta"
                            ? `${node.exerciseCount} ejercicios`
                            : estado === "bloqueada"
                              ? "Aprueba el tema anterior"
                              : "Próximamente"}
                    </span>
                  </div>
                </div>
                {jugable && (
                  <Link
                    href={`/matematicas/${grade}/practicar?tema=${node.num}`}
                    className="btn3d shrink-0 self-center bg-grass px-4 py-2 text-xs text-white"
                    style={{ ["--btn-edge" as string]: "var(--grass-deep)", ["--btn-depth" as string]: "4px" }}
                  >
                    {estado === "hecha" ? "Repetir" : "Jugar"}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
