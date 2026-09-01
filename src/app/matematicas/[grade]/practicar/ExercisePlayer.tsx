"use client";

import { useState } from "react";
import Link from "next/link";
import type { Exercise, MultipleChoiceConfig, TrueFalseConfig } from "@/lib/exercises";
import { playCorrect, playIncorrect } from "@/lib/sound";

type Feedback = "correct" | "incorrect" | null;

// Mismos colores y misma lógica que components/theory/quiz-player.tsx: clic único,
// calificación inmediata, la correcta se rellena en verde sólido, la elegida (si es
// incorrecta) en rojo sólido, y las demás bajan a 40% de opacidad.
const GREEN = "#22c55e";
const RED = "#ef4444";

// Idle: border-hairline hover:bg-raised text-graphite (optionBase de quiz-player.tsx).
const OPTION_BASE = "border-hairline hover:bg-raised text-ink";

export default function ExercisePlayer({ grade, exercises }: { grade: number; exercises: Exercise[] }) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [chosenIndex, setChosenIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const current = exercises[index];
  const done = index >= exercises.length;

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
  }

  function next() {
    setFeedback(null);
    setChosenIndex(null);
    setIndex((i) => i + 1);
  }

  if (exercises.length === 0) {
    return (
      <p className="text-ink-muted">
        Todavía no hay ejercicios cargados para este grado.{" "}
        <Link href={`/matematicas/${grade}`} className="text-brand-teal underline">
          Volver a los temas
        </Link>
        .
      </p>
    );
  }

  if (done) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-canvas">
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint">Resultado</p>
          <p className="text-6xl font-light tabular-nums">
            {score} / {exercises.length}
          </p>
        </div>
        <div className="shrink-0 px-4 pb-8 pt-2 max-w-sm w-full mx-auto flex gap-2">
          <Link
            href={`/matematicas/${grade}`}
            className="duo-press flex-1 rounded-full border border-hairline px-5 py-3.5 text-sm font-semibold text-ink text-center hover:opacity-80 transition-opacity"
          >
            Volver a los temas
          </Link>
          <button
            onClick={() => {
              setIndex(0);
              setScore(0);
              setFeedback(null);
              setChosenIndex(null);
            }}
            className="duo-press flex-1 rounded-full bg-brand-teal text-white px-5 py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Practicar de nuevo
          </button>
        </div>
      </div>
    );
  }

  // Las dos opciones de true_false se tratan como un multiple_choice de 2, con el mismo
  // render: un solo camino visual para "elegir entre opciones" en toda la app.
  const isTrueFalse = current.type === "true_false";
  const options = isTrueFalse ? ["Verdadero", "Falso"] : (current.config as MultipleChoiceConfig).options;
  const correctIndex = isTrueFalse
    ? (current.config as TrueFalseConfig).correctAnswer ? 0 : 1
    : (current.config as MultipleChoiceConfig).correctIndex;
  const operation = isTrueFalse ? undefined : (current.config as MultipleChoiceConfig).operation;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-canvas">
      {/* Barra superior: salir + contador. Alto fijo, no compite por espacio con la pregunta. */}
      <div className="shrink-0 flex items-center justify-between px-3 pt-3">
        <Link
          href={`/matematicas/${grade}`}
          aria-label="Salir del ejercicio"
          className="p-2 -ml-1 rounded-full text-ink-faint hover:opacity-70 transition-opacity"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </Link>
        <span className="text-xs tabular-nums text-ink-faint">
          {index + 1} / {exercises.length}
        </span>
        <span className="text-xs tabular-nums text-ink-faint">{score} ✓</span>
      </div>

      {/* La pregunta ocupa el centro de lo que sobra entre las dos barras fijas: siempre
          en el mismo punto de la pantalla, sin importar cuánto texto tenga cada ejercicio. */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-6 gap-3 text-center">
        <p className="text-base text-ink-muted max-w-xs">{current.prompt}</p>
        {operation && (
          <p className="text-3xl sm:text-4xl font-bold tabular-nums text-ink">{operation}</p>
        )}
      </div>

      {/* Las opciones van SIEMPRE al fondo de la pantalla: es donde cae el pulgar al
          sostener el teléfono con una mano, y es donde las pone quiz-player.tsx. */}
      <div className="shrink-0 px-4 pb-6 pt-2 max-w-md w-full mx-auto">
        <div className={`grid gap-2 ${options.length > 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"}`}>
          {options.map((option, i) => {
            let cls = OPTION_BASE;
            if (chosenIndex !== null) {
              if (i === correctIndex) {
                cls = "border-transparent bg-[#22c55e] text-white";
              } else if (i === chosenIndex) {
                cls = "border-transparent bg-[#ef4444] text-white";
              } else {
                cls = `${OPTION_BASE} opacity-40`;
              }
            }
            return (
              <button
                key={i}
                type="button"
                onClick={() => pick(i, i === correctIndex)}
                disabled={feedback !== null}
                className={`px-3 py-3.5 rounded-xl border text-sm font-medium transition-colors ${cls}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {feedback && (
          <div
            className="mt-3 rounded-xl px-4 py-3 text-sm font-semibold text-center"
            style={
              feedback === "correct"
                ? { background: `${GREEN}1a`, color: GREEN }
                : { background: `${RED}1a`, color: RED }
            }
          >
            {feedback === "correct" ? "¡Correcto!" : "No es correcto."}
          </div>
        )}

        {feedback && (
          <button
            onClick={next}
            className="duo-press mt-3 w-full rounded-full bg-brand-teal text-white px-4 py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Siguiente →
          </button>
        )}
      </div>
    </div>
  );
}
