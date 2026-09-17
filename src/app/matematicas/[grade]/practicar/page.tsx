import { notFound } from "next/navigation";
import { elegirVariantes, getGradeExercisesSafe, shuffleExerciseOptions } from "@/lib/exercises";
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
  // Los dos sorteos —qué versión de cada pregunta, y en qué orden van las
  // opciones— corren en el SERVIDOR. Si corrieran en el render del cliente, el
  // HTML del servidor y el del cliente no coincidirían.
  const variantes = shuffleExerciseOptions(data);
  const exercises = elegirVariantes(variantes);

  return (
    // `variantes` va completo para que "Jugar otra vez" pueda sortear de nuevo
    // sin volver al servidor: es justo la repetición donde más importa que las
    // preguntas cambien.
    <ExercisePlayer
      grade={grade}
      exercises={exercises}
      variantes={variantes}
      tema={dbaNum}
      isDemo={isDemo}
    />
  );
}
