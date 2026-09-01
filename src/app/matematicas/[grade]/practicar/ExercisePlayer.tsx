"use client";

import { useState } from "react";
import Link from "next/link";
import type { Exercise, MultipleChoiceConfig, TrueFalseConfig } from "@/lib/exercises";

type Feedback = "correct" | "incorrect" | null;

// Mismos colores y misma lógica que components/theory/quiz-player.tsx: clic único,
// calificación inmediata, la correcta se rellena en verde sólido, la elegida (si es
// incorrecta) en rojo sólido, y las demás bajan a 40% de opacidad. Sin checkboxes,
// sin confirmar aparte, sin escribir nada — se elige entre opciones, como pidió el director.
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

  function checkMultipleChoice(choiceIndex: number) {
    if (feedback) return;
    const config = current.config as MultipleChoiceConfig;
    const correct = choiceIndex === config.correctIndex;
    setChosenIndex(choiceIndex);
    setFeedback(correct ? "correct" : "incorrect");
    if (correct) setScore((s) => s + 1);
  }

  function checkTrueFalse(value: boolean) {
    if (feedback) return;
    const config = current.config as TrueFalseConfig;
    const correct = value === config.correctAnswer;
    setChosenIndex(value ? 0 : 1);
    setFeedback(correct ? "correct" : "incorrect");
    if (correct) setScore((s) => s + 1);
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
      <div className="rounded-2xl border border-hairline bg-surface p-8 text-center shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint mb-2">Resultado</p>
        <p className="text-5xl font-light tabular-nums mb-4">
          {score} / {exercises.length}
        </p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => {
              setIndex(0);
              setScore(0);
              setFeedback(null);
              setChosenIndex(null);
            }}
            className="duo-press rounded-full bg-brand-teal text-white px-5 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Practicar de nuevo
          </button>
          <Link
            href={`/matematicas/${grade}`}
            className="duo-press rounded-full border border-hairline px-5 py-3 text-sm font-semibold text-ink hover:opacity-80 transition-opacity"
          >
            Volver a los temas
          </Link>
        </div>
      </div>
    );
  }

  // Las dos opciones de true_false se tratan como un multiple_choice de 2, con el mismo
  // render: así hay un solo camino visual para "elegir entre opciones" en toda la app.
  const options =
    current.type === "true_false"
      ? ["Verdadero", "Falso"]
      : (current.config as MultipleChoiceConfig).options;
  const correctIndex =
    current.type === "true_false"
      ? (current.config as TrueFalseConfig).correctAnswer
        ? 0
        : 1
      : (current.config as MultipleChoiceConfig).correctIndex;
  const onPick = current.type === "true_false" ? (i: number) => checkTrueFalse(i === 0) : checkMultipleChoice;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 text-xs uppercase tracking-[0.12em] text-ink-faint">
        <span className="tabular-nums">
          Ejercicio {index + 1} / {exercises.length}
        </span>
        <span className="tabular-nums">{score} correctas</span>
      </div>

      <div className="rounded-2xl border border-hairline bg-surface p-6 sm:p-8 shadow-card">
        <p className="text-lg leading-relaxed mb-6">{current.prompt}</p>

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
                onClick={() => onPick(i)}
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
            className="mt-5 rounded-xl px-4 py-3 text-sm font-semibold"
            style={
              feedback === "correct"
                ? { background: `${GREEN}1a`, color: GREEN }
                : { background: `${RED}1a`, color: RED }
            }
          >
            {feedback === "correct" ? "¡Correcto!" : "No es correcto."}
          </div>
        )}
      </div>

      {feedback && (
        <button
          onClick={next}
          className="duo-press mt-4 w-full rounded-full bg-brand-teal text-white px-4 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Siguiente →
        </button>
      )}
    </div>
  );
}
