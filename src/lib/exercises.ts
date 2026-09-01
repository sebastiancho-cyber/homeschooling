import { supabase } from "@/lib/supabase";

export type ExerciseType = "multiple_choice" | "multiple_response" | "numeric_input" | "true_false" | "drag_sort" | "match_pairs";

export type MultipleChoiceConfig = { options: string[]; correctIndex: number };
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

export async function getGradeExercises(subjectSlug: string, grade: number): Promise<Exercise[]> {
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
  const dbaOrder = new Map(dbas.map((d, i) => [d.id, i]));

  const { data: evidences, error: evidencesError } = await supabase
    .from("learning_evidences")
    .select("id, num, dba_id")
    .in("dba_id", dbas.map((d) => d.id))
    .order("num", { ascending: true });
  if (evidencesError) throw new Error(evidencesError.message);
  if (!evidences || evidences.length === 0) return [];
  const evidenceOrder = new Map(evidences.map((e) => [e.id, { dbaRank: dbaOrder.get(e.dba_id) ?? 0, num: e.num }]));

  const { data: exercises, error: exercisesError } = await supabase
    .from("exercises")
    .select("id, type, prompt, config, evidence_id, order_in_evidence")
    .in("evidence_id", evidences.map((e) => e.id));
  if (exercisesError) throw new Error(exercisesError.message);

  return (exercises ?? [])
    .slice()
    .sort((a, b) => {
      const ea = evidenceOrder.get(a.evidence_id)!;
      const eb = evidenceOrder.get(b.evidence_id)!;
      if (ea.dbaRank !== eb.dbaRank) return ea.dbaRank - eb.dbaRank;
      if (ea.num !== eb.num) return ea.num - eb.num;
      return a.order_in_evidence - b.order_in_evidence;
    })
    .map(({ id, type, prompt, config }) => ({ id, type, prompt, config })) as Exercise[];
}
