"use client";

import { useState } from "react";
import Link from "next/link";
import type { Exercise, MultipleChoiceConfig, NumericInputConfig, TrueFalseConfig } from "@/lib/exercises";

type Feedback = "correct" | "incorrect" | null;

export default function ExercisePlayer({ grade, exercises }: { grade: number; exercises: Exercise[] }) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [numericValue, setNumericValue] = useState("");
  const [score, setScore] = useState(0);

  const current = exercises[index];
  const done = index >= exercises.length;

  function checkMultipleChoice(choiceIndex: number) {
    if (feedback) return;
    const config = current.config as MultipleChoiceConfig;
    const correct = choiceIndex === config.correctIndex;
    setFeedback(correct ? "correct" : "incorrect");
    if (correct) setScore((s) => s + 1);
  }

  function checkTrueFalse(value: boolean) {
    if (feedback) return;
    const config = current.config as TrueFalseConfig;
    const correct = value === config.correctAnswer;
    setFeedback(correct ? "correct" : "incorrect");
    if (correct) setScore((s) => s + 1);
  }

  function checkNumeric() {
    if (feedback || numericValue.trim() === "") return;
    const config = current.config as NumericInputConfig;
    const correct = Number(numericValue) === config.correctAnswer;
    setFeedback(correct ? "correct" : "incorrect");
    if (correct) setScore((s) => s + 1);
  }

  function next() {
    setFeedback(null);
    setNumericValue("");
    setIndex((i) => i + 1);
  }

  if (exercises.length === 0) {
    return (
      <p className="text-ink-soft">
        Todavía no hay ejercicios cargados para este grado.{" "}
        <Link href={`/matematicas/${grade}`} className="text-accent underline">
          Volver a los temas
        </Link>
        .
      </p>
    );
  }

  if (done) {
    return (
      <div className="rounded-lg border border-border-soft bg-surface p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-faint mb-2">Resultado</p>
        <p className="font-display text-4xl font-semibold mb-4">
          {score} / {exercises.length}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => {
              setIndex(0);
              setScore(0);
              setFeedback(null);
              setNumericValue("");
            }}
            className="rounded-md bg-accent text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Practicar de nuevo
          </button>
          <Link
            href={`/matematicas/${grade}`}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-ink hover:border-accent transition-colors"
          >
            Volver a los temas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 font-mono text-xs text-ink-faint">
        <span>
          Ejercicio {index + 1} / {exercises.length}
        </span>
        <span>{score} correctas</span>
      </div>

      <div className="rounded-lg border border-border-soft bg-surface p-6 sm:p-8">
        <p className="text-lg leading-relaxed mb-6">{current.prompt}</p>

        {current.type === "multiple_choice" && (
          <div className="flex flex-col gap-2">
            {(current.config as MultipleChoiceConfig).options.map((option, i) => {
              const config = current.config as MultipleChoiceConfig;
              const isCorrectOption = i === config.correctIndex;
              const showState = feedback !== null;
              return (
                <button
                  key={i}
                  onClick={() => checkMultipleChoice(i)}
                  disabled={feedback !== null}
                  className={`text-left rounded-md border px-4 py-3 text-sm transition-colors ${
                    showState && isCorrectOption
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950"
                      : showState
                        ? "border-border-soft opacity-60"
                        : "border-border hover:border-accent"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {current.type === "true_false" && (
          <div className="flex gap-3">
            {[true, false].map((value) => (
              <button
                key={String(value)}
                onClick={() => checkTrueFalse(value)}
                disabled={feedback !== null}
                className="flex-1 rounded-md border border-border px-4 py-3 text-sm font-medium hover:border-accent transition-colors disabled:opacity-60"
              >
                {value ? "Verdadero" : "Falso"}
              </button>
            ))}
          </div>
        )}

        {current.type === "numeric_input" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              checkNumeric();
            }}
            className="flex gap-2"
          >
            <input
              type="number"
              value={numericValue}
              onChange={(e) => setNumericValue(e.target.value)}
              disabled={feedback !== null}
              autoFocus
              className="w-32 rounded-md border border-border bg-surface px-3 py-2 text-sm font-mono focus:outline-none focus:border-accent disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={feedback !== null}
              className="rounded-md bg-accent text-white px-4 py-2 text-sm font-medium disabled:opacity-50"
            >
              Comprobar
            </button>
          </form>
        )}

        {feedback && (
          <div
            className={`mt-5 rounded-md px-4 py-3 text-sm font-medium ${
              feedback === "correct"
                ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                : "bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
            }`}
          >
            {feedback === "correct" ? "¡Correcto!" : "No es correcto."}
          </div>
        )}
      </div>

      {feedback && (
        <button
          onClick={next}
          className="mt-4 w-full rounded-md bg-accent text-white px-4 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Siguiente →
        </button>
      )}
    </div>
  );
}
