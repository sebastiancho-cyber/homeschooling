import { notFound } from "next/navigation";
import { getGradeExercisesSafe, shuffleExerciseOptions } from "@/lib/exercises";
import ExercisePlayer from "./ExercisePlayer";

export default async function PracticarPage({
  params,
  searchParams,
}: {
  params: Promise<{ grade: string }>;
  searchParams: Promise<{ tema?: string }>;
}) {
  const { grade: gradeParam } = await params;
  const { tema } = await searchParams;
  const grade = Number(gradeParam);

  if (!Number.isInteger(grade) || grade < 1 || grade > 11) {
    notFound();
  }

  // Sin `tema` se practica el grado entero; con él, solo esa estación de la ruta.
  const temaNum = Number(tema);
  const dbaNum = Number.isInteger(temaNum) && temaNum > 0 ? temaNum : undefined;

  const { data, isDemo } = await getGradeExercisesSafe("matematicas", grade, dbaNum);
  // Barajar en el servidor, no en el cliente: si el sorteo corriera en el render
  // del cliente, el HTML del servidor y el del cliente no coincidirían.
  const exercises = shuffleExerciseOptions(data);

  return <ExercisePlayer grade={grade} exercises={exercises} tema={dbaNum} isDemo={isDemo} />;
}
