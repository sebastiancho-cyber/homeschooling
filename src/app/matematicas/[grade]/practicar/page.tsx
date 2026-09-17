import { notFound } from "next/navigation";
import { armarRepaso, elegirVariantes, getGradeExercisesSafe, shuffleExerciseOptions } from "@/lib/exercises";
import { getContextoTema, getGradePath } from "@/lib/curriculum";
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

  /* Qué temas del grado tienen contenido, en orden. El jugador lo necesita para
     saber si ESTA lección está desbloqueada: a la pantalla de práctica se llega
     también escribiendo la URL a mano, y así una lección a la que no se debería
     haber llegado todavía no ensucia el avance. */
  const { data: nodos } = await getGradePath(grade);
  const temasConContenido = nodos.filter((n) => n.exerciseCount > 0).map((n) => n.num);

  /* Una estación de repaso no tiene ejercicios propios: toma los de los temas
     que repasa. Se piden todos y `armarRepaso` escoge unos pocos de cada uno. */
  const estacion = dbaNum ? nodos.find((n) => n.num === dbaNum) : undefined;
  const esRepaso = estacion?.tipo === "repaso";
  const deDondeSalen = esRepaso ? (estacion?.repasa ?? undefined) : dbaNum;

  const { data, isDemo } = await getGradeExercisesSafe("matematicas", grade, deDondeSalen);

  // El texto del tema, para la burbuja de ayuda.
  const contextoTema = dbaNum ? await getContextoTema(grade, dbaNum) : null;

  /* Los sorteos corren en el SERVIDOR. Si corrieran en el render del cliente, el
     HTML del servidor y el del cliente no coincidirían. */
  const variantes = shuffleExerciseOptions(data);
  const exercises = esRepaso ? armarRepaso(variantes) : elegirVariantes(variantes);

  return (
    // `variantes` va completo para que "Jugar otra vez" pueda sortear de nuevo
    // sin volver al servidor: es justo la repetición donde más importa que las
    // preguntas cambien. En un repaso cambian incluso más, porque vuelve a
    // escoger qué ranuras entran.
    <ExercisePlayer
      grade={grade}
      exercises={exercises}
      variantes={variantes}
      tema={dbaNum}
      esRepaso={esRepaso}
      contextoTema={contextoTema ?? undefined}
      temasConContenido={temasConContenido}
      isDemo={isDemo}
    />
  );
}
