import { notFound } from "next/navigation";
import { elegirVariantes, getGradeExercisesSafe, shuffleExerciseOptions } from "@/lib/exercises";
import { getGradePath } from "@/lib/curriculum";
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

  /* Qué temas del grado tienen contenido, en orden. El jugador lo necesita para
     saber si ESTA lección está desbloqueada: a la pantalla de práctica se llega
     también escribiendo la URL a mano, y así una lección a la que no se debería
     haber llegado todavía no ensucia el avance. */
  const { data: nodos } = await getGradePath(grade);
  const temasConContenido = nodos.filter((n) => n.exerciseCount > 0).map((n) => n.num);
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
      temasConContenido={temasConContenido}
      isDemo={isDemo}
    />
  );
}
