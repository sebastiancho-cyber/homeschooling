import { supabase } from "@/lib/supabase";

export type ExerciseType = "multiple_choice" | "multiple_response" | "numeric_input" | "true_false" | "drag_sort" | "match_pairs";

// `operation` es opcional: cuando el DBA es de cálculo (una suma, una secuencia), se separa
// del enunciado para poder mostrarla grande y en negrilla, aparte de la instrucción.
export type MultipleChoiceConfig = { options: string[]; correctIndex: number; operation?: string };
// A diferencia de multiple_choice (una sola respuesta correcta), aquí puede haber varias —
// o ninguna: el estudiante marca todas las que apliquen y comprueba con un botón, no al
// primer clic.
export type MultipleResponseConfig = { options: string[]; correctIndices: number[] };
export type NumericInputConfig = { correctAnswer: number; unit?: string };
export type TrueFalseConfig = { correctAnswer: boolean };

export type Exercise = {
  id: string;
  type: ExerciseType;
  prompt: string;
  config: MultipleChoiceConfig | MultipleResponseConfig | NumericInputConfig | TrueFalseConfig;
};

// Baraja las opciones de cada ejercicio (y ajusta correctIndex) para que la respuesta
// correcta no caiga siempre en la misma posición. Se aplica en el servidor, antes de
// pasarle los ejercicios al componente cliente: si el sorteo corriera en el render del
// cliente, el HTML del servidor y el del cliente no coincidirían (error de hidratación).
export function shuffleExerciseOptions(exercises: Exercise[]): Exercise[] {
  return exercises.map((ex) => {
    if (ex.type !== "multiple_choice") return ex;
    const config = ex.config as MultipleChoiceConfig;
    const order = config.options.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return {
      ...ex,
      config: {
        ...config,
        options: order.map((i) => config.options[i]),
        correctIndex: order.indexOf(config.correctIndex),
      },
    };
  });
}

/** Igual que `Sourced` en curriculum.ts: avisa si el contenido es de muestra. */
export async function getGradeExercisesSafe(
  subjectSlug: string,
  grade: number,
  dbaNum?: number,
): Promise<{ data: Exercise[]; isDemo: boolean }> {
  try {
    const data = await getGradeExercises(subjectSlug, grade, dbaNum);
    if (data.length === 0) throw new Error("Sin ejercicios.");
    return { data, isDemo: false };
  } catch {
    const { DEMO_EXERCISES } = await import("@/lib/demo-data");
    // En muestra, un tema concreto devuelve una tanda corta — como sería de verdad.
    const data = dbaNum ? DEMO_EXERCISES.slice(0, 4) : DEMO_EXERCISES;
    return { data, isDemo: true };
  }
}

/** `dbaNum` limita la tanda a un solo tema (una lección corta de la ruta). */
export async function getGradeExercises(
  subjectSlug: string,
  grade: number,
  dbaNum?: number,
): Promise<Exercise[]> {
  const { data: subject, error: subjectError } = await supabase
    .from("subjects")
    .select("id")
    .eq("slug", subjectSlug)
    .single();
  if (subjectError || !subject) {
    throw new Error(subjectError?.message ?? `No se encontró el área "${subjectSlug}".`);
  }

  // El orden importa: los ejercicios deben seguir la secuencia del currículo (DBA 1→N, y
  // dentro de cada DBA sus evidencias en orden), no el orden en que Postgres los devuelva.
  // Con IDs filtrados por `.in(...)` esa secuencia no está garantizada, así que se arma
  // aquí en JS a partir de tres consultas ordenadas.
  const { data: dbas, error: dbasError } = await supabase
    .from("dbas")
    .select("id, num")
    .eq("subject_id", subject.id)
    .eq("grade", grade)
    .order("num", { ascending: true });
  if (dbasError) throw new Error(dbasError.message);
  if (!dbas || dbas.length === 0) return [];

  // Una lección de la ruta es UN tema; sin `dbaNum` se practica el grado entero.
  const scoped = dbaNum ? dbas.filter((d) => d.num === dbaNum) : dbas;
  if (scoped.length === 0) return [];
  const dbaOrder = new Map(scoped.map((d, i) => [d.id, i]));

  const { data: evidences, error: evidencesError } = await supabase
    .from("learning_evidences")
    .select("id, num, dba_id")
    .in("dba_id", scoped.map((d) => d.id))
    .order("num", { ascending: true });
  if (evidencesError) throw new Error(evidencesError.message);
  if (!evidences || evidences.length === 0) return [];
  const dbaDeEvidencia = new Map(evidences.map((e) => [e.id, dbaOrder.get(e.dba_id) ?? 0]));

  const { data: exercises, error: exercisesError } = await supabase
    .from("exercises")
    .select("id, type, prompt, config, evidence_id, order_in_lesson")
    .in("evidence_id", evidences.map((e) => e.id));
  if (exercisesError) throw new Error(exercisesError.message);

  // Dentro de una lección manda `order_in_lesson`, no el número de evidencia.
  // La evidencia dice QUÉ mide el ejercicio (clasificación curricular del MEN);
  // ordenar por ella ponía los ejercicios en el orden del documento, que no es
  // una rampa de dificultad. El orden pedagógico —de lo concreto a lo
  // abstracto— se decide al sembrar el contenido.
  return (exercises ?? [])
    .slice()
    .sort((a, b) => {
      const da = dbaDeEvidencia.get(a.evidence_id)!;
      const db = dbaDeEvidencia.get(b.evidence_id)!;
      if (da !== db) return da - db;
      return a.order_in_lesson - b.order_in_lesson;
    })
    .map(({ id, type, prompt, config }) => ({ id, type, prompt, config })) as Exercise[];
}
