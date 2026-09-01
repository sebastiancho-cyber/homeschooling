import Link from "next/link";
import { notFound } from "next/navigation";
import { getGradeExercises } from "@/lib/exercises";
import ExercisePlayer from "./ExercisePlayer";

export default async function PracticarPage({
  params,
}: {
  params: Promise<{ grade: string }>;
}) {
  const { grade: gradeParam } = await params;
  const grade = Number(gradeParam);

  if (!Number.isInteger(grade) || grade < 1 || grade > 11) {
    notFound();
  }

  const exercises = await getGradeExercises("matematicas", grade);

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
        <Link
          href={`/matematicas/${grade}`}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint hover:text-brand-teal transition-colors"
        >
          ← Grado {grade}º
        </Link>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-3 mb-8">
          Practicar
        </h1>
        <ExercisePlayer grade={grade} exercises={exercises} />
      </div>
    </main>
  );
}
