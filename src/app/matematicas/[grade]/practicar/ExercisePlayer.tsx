"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Exercise, MultipleChoiceConfig, TrueFalseConfig } from "@/lib/exercises";
import { shuffleExerciseOptions } from "@/lib/exercises";
import { playCorrect, playIncorrect, playFinish } from "@/lib/sound";
import { Mascota, personajeParaId } from "@/components/Mascota";
import { claveLeccion, estrellasPara, guardarLeccion, PORCENTAJE_APROBACION } from "@/lib/progress";

type Feedback = "correct" | "incorrect" | null;

// Cuánto se ve el resultado antes de avanzar solo. Ni tan corto que no dé tiempo
// a leerlo, ni tan largo que se sienta una espera.
const ADVANCE_MS = 1300;

// Las chispas del acierto: ocho puntos que salen en abanico desde el centro.
const CHISPAS = [
  { a: "0deg", d: 52, c: "var(--sun)" },
  { a: "45deg", d: 44, c: "var(--grass)" },
  { a: "90deg", d: 50, c: "var(--sky)" },
  { a: "135deg", d: 42, c: "var(--bubble)" },
  { a: "180deg", d: 52, c: "var(--grape)" },
  { a: "225deg", d: 44, c: "var(--tangerine)" },
  { a: "270deg", d: 50, c: "var(--mint)" },
  { a: "315deg", d: 42, c: "var(--sun)" },
];

export default function ExercisePlayer({
  grade,
  exercises,
  tema,
  isDemo = false,
}: {
  grade: number;
  exercises: Exercise[];
  /** Número del tema de la ruta. Sin él se practica el grado entero y no hay
   *  estación que marcar, así que tampoco se guarda progreso. */
  tema?: number;
  isDemo?: boolean;
}) {
  const [playExercises, setPlayExercises] = useState(exercises);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [chosenIndex, setChosenIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = playExercises[index];
  const done = index >= playExercises.length;
  const total = playExercises.length;

  // Al llegar al final: fanfarria y se guarda la estación. Va en un efecto y no
  // en el render porque escribir en disco durante el render es un efecto
  // secundario — React puede repetir un render y guardaríamos dos veces.
  useEffect(() => {
    if (!done || total === 0) return;
    playFinish();
    if (tema) {
      guardarLeccion(claveLeccion(grade, tema), {
        estrellas: estrellasPara(score, total),
        aciertos: score,
        total,
      });
    }
  }, [done, total, tema, grade, score]);

  useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    },
    [],
  );

  function pick(choiceIndex: number, isCorrect: boolean) {
    if (feedback) return;
    setChosenIndex(choiceIndex);
    setFeedback(isCorrect ? "correct" : "incorrect");
    if (isCorrect) {
      setScore((s) => s + 1);
      playCorrect();
    } else {
      playIncorrect();
    }
    advanceTimer.current = setTimeout(() => {
      setFeedback(null);
      setChosenIndex(null);
      setIndex((i) => i + 1);
    }, ADVANCE_MS);
  }

  function reiniciar() {
    setPlayExercises(shuffleExerciseOptions(exercises));
    setIndex(0);
    setScore(0);
    setFeedback(null);
    setChosenIndex(null);
  }

  /* ---------------------------------------------------------------- vacío */
  if (total === 0) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-canvas px-8 text-center">
        <span className="text-5xl" aria-hidden>
          🚧
        </span>
        <p className="font-display text-xl text-ink">Este tema todavía no tiene ejercicios</p>
        <Link
          href={`/matematicas/${grade}`}
          className="btn3d bg-grass px-6 py-3 text-white"
          style={{ ["--btn-edge" as string]: "var(--grass-deep)" }}
        >
          Volver a la ruta
        </Link>
      </div>
    );
  }

  /* ------------------------------------------------------------- terminó */
  if (done) {
    // Una sola fuente para las cotas: si la pantalla final calculara las suyas,
    // podría felicitar por una lección que el progreso guarda como reprobada.
    const estrellas = estrellasPara(score, total);
    const paso = estrellas > 0;
    const minimo = Math.ceil((total * PORCENTAJE_APROBACION) / 100);

    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-canvas">
        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
          {/* Celebra el personaje del último ejercicio: cierra con la misma cara
              con la que el niño acaba de jugar. */}
          <Mascota
            personaje={personajeParaId(playExercises[total - 1].id)}
            animo={paso ? "happy" : "idle"}
            size={132}
          />

          <div className="flex gap-2" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`rec-rise text-4xl ${i < estrellas ? "" : "opacity-20 grayscale"}`}
                style={{ animationDelay: `${120 + i * 140}ms` }}
              >
                ⭐
              </span>
            ))}
          </div>

          <div>
            <p className="font-display text-5xl tabular-nums text-ink">
              {score}
              <span className="text-ink-faint"> / {total}</span>
            </p>
            <p className="mt-1 font-sans text-sm font-extrabold text-ink-muted">
              {estrellas === 3
                ? "¡Perfecto! No fallaste ni una."
                : estrellas === 2
                  ? "¡Muy bien! Casi perfecto."
                  : estrellas === 1
                    ? "¡Aprobaste! Sigue así."
                    : `Te faltó poco. Necesitas ${minimo} para pasar.`}
            </p>
            {!paso && (
              // Si no pasó hay que decirlo sin rodeos: si no, el niño vuelve a
              // la ruta, ve el candado y no entiende por qué.
              <p className="mt-2 font-display text-sm text-coral">Inténtalo otra vez</p>
            )}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-md shrink-0 flex-col gap-2 px-4 pb-8 pt-2">
          <button
            onClick={reiniciar}
            className="btn3d w-full bg-grass px-5 py-4 text-base text-white"
            style={{ ["--btn-edge" as string]: "var(--grass-deep)" }}
          >
            Jugar otra vez
          </button>
          <Link
            href={`/matematicas/${grade}`}
            className="btn3d w-full bg-surface px-5 py-4 text-base text-ink-muted"
          >
            Volver a la ruta
          </Link>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------ jugando */
  const isTrueFalse = current.type === "true_false";
  const options = isTrueFalse
    ? ["Verdadero", "Falso"]
    : (current.config as MultipleChoiceConfig).options;
  const correctIndex = isTrueFalse
    ? (current.config as TrueFalseConfig).correctAnswer
      ? 0
      : 1
    : (current.config as MultipleChoiceConfig).correctIndex;
  const operation = isTrueFalse ? undefined : (current.config as MultipleChoiceConfig).operation;

  // La barra avanza al CONTESTAR, no al pasar de pregunta: el premio llega con
  // el clic, que es lo que hace el niño.
  const progreso = ((index + (feedback ? 1 : 0)) / total) * 100;

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-canvas">
      {/* ---------------------------------------------------- barra superior */}
      <div className="flex shrink-0 items-center gap-3 px-4 pb-1 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <Link
          href={`/matematicas/${grade}`}
          aria-label="Salir del ejercicio"
          className="btn3d h-10 w-10 shrink-0 rounded-full bg-surface text-ink-faint"
          style={{ ["--btn-depth" as string]: "3px" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </Link>

        <div className="progress-track flex-1">
          <div className="progress-fill" style={{ width: `${progreso}%` }} />
        </div>

        <span className="flex shrink-0 items-center gap-1 font-display text-base tabular-nums text-ink">
          <span aria-hidden>⭐</span>
          {score}
        </span>
      </div>

      {isDemo && (
        <p className="shrink-0 px-4 pt-1 text-center font-sans text-[10px] font-extrabold uppercase tracking-wider text-sun-deep">
          Contenido de muestra · sin conexión a la base
        </p>
      )}

      {/* ------------------------------------------------------- la pregunta */}
      {/* El `pb-14` sesga el centrado hacia arriba: centrado exacto deja la
          pregunta flotando demasiado lejos del pulgar en pantallas altas. */}
      <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-6 pb-14 text-center">
        {/* La mascota y el globo: el enunciado no lo "muestra la pantalla", se lo
            dice alguien. Es la diferencia entre un formulario y un juego. */}
        <div className="flex items-end gap-1">
          {/* El personaje sale del id del ejercicio: cambia en cada pregunta pero
              siempre es el mismo para esa pregunta, y no depende del azar (que
              rompería la hidratación entre servidor y cliente). */}
          <Mascota
            personaje={personajeParaId(current.id)}
            animo={feedback === "correct" ? "happy" : feedback === "incorrect" ? "sad" : "idle"}
          />
          <div className="card3d relative mb-4 max-w-[13rem] px-4 py-3 text-left">
            {/* El pico del globo, apuntando a la mascota. */}
            <span
              aria-hidden
              className="absolute -left-[9px] bottom-4 h-4 w-4 rotate-45 border-b-2 border-l-2 border-hairline bg-surface"
            />
            <p className="relative font-sans text-base font-extrabold leading-snug text-ink">
              {current.prompt}
            </p>
          </div>
        </div>

        {operation && (
          // La operación es lo que el niño tiene que resolver: va sola, enorme,
          // y en una tarjeta, para que no se confunda con el enunciado.
          <div
            key={`op-${index}`}
            className="rec-rise card3d px-7 py-4"
            style={{ ["--depth" as string]: "var(--sky-deep)" }}
          >
            <p className="font-display text-4xl tabular-nums text-sky sm:text-5xl">{operation}</p>
          </div>
        )}

        {/* El resultado flota sobre la pregunta y se disuelve solo: no empuja
            nada y no hay que cerrarlo. `key={index}` remonta el nodo en cada
            ejercicio para que la animación vuelva a correr desde cero. */}
        {feedback && (
          <div
            key={`fb-${index}`}
            className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2"
          >
            <div className="relative">
              {feedback === "correct" &&
                CHISPAS.map((s, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className="rec-spark absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full"
                    style={{
                      ["--a" as string]: s.a,
                      ["--d" as string]: `${s.d}px`,
                      background: `rgb(${s.c})`,
                      animationDelay: "60ms",
                    }}
                  />
                ))}
              <div
                className={`rec-toast relative whitespace-nowrap rounded-full px-6 py-3 font-display text-lg text-white shadow-lg ${
                  feedback === "incorrect" ? "rec-shake" : ""
                }`}
                style={{
                  ["--toast-life" as string]: `${ADVANCE_MS}ms`,
                  background: feedback === "correct" ? "rgb(var(--grass))" : "rgb(var(--coral))",
                }}
              >
                {feedback === "correct" ? "¡Correcto! 🎉" : "Casi... 💪"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------ las opciones */}
      <div className="mx-auto w-full max-w-md shrink-0 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2">
        <div className="grid grid-cols-2 gap-3">
          {options.map((option, i) => {
            // Tras responder: la correcta se rellena en verde, la elegida (si
            // falló) en rojo, y las demás se apagan. Un solo vistazo basta.
            let clase = "bg-surface text-ink";
            let edge = "var(--depth)";
            if (chosenIndex !== null) {
              if (i === correctIndex) {
                clase = "bg-grass text-white";
                edge = "var(--grass-deep)";
              } else if (i === chosenIndex) {
                clase = "bg-coral text-white";
                edge = "var(--coral-deep)";
              } else {
                clase = "bg-surface text-ink opacity-40";
              }
            }
            return (
              <button
                key={i}
                type="button"
                onClick={() => pick(i, i === correctIndex)}
                disabled={feedback !== null}
                className={`btn3d min-h-16 w-full px-3 py-4 text-base leading-tight ${clase}`}
                style={{ ["--btn-edge" as string]: edge }}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
