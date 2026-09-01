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

  // ExercisePlayer toma la pantalla completa (fixed inset-0) mientras hay ejercicios: no
  // hace falta encabezado propio aquí, sería un segundo "salir" debajo del suyo.
  return <ExercisePlayer grade={grade} exercises={exercises} />;
}
