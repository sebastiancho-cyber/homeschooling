import { supabase } from "@/lib/supabase";

export type ExerciseType = "multiple_choice" | "numeric_input" | "true_false" | "drag_sort" | "match_pairs";

export type MultipleChoiceConfig = { options: string[]; correctIndex: number };
export type NumericInputConfig = { correctAnswer: number; unit?: string };
export type TrueFalseConfig = { correctAnswer: boolean };

export type Exercise = {
  id: string;
  type: ExerciseType;
  prompt: string;
  config: MultipleChoiceConfig | NumericInputConfig | TrueFalseConfig;
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

  const { data: dbas, error: dbasError } = await supabase
    .from("dbas")
    .select("id")
    .eq("subject_id", subject.id)
    .eq("grade", grade);
  if (dbasError) throw new Error(dbasError.message);
  const dbaIds = (dbas ?? []).map((d) => d.id);
  if (dbaIds.length === 0) return [];

  const { data: evidences, error: evidencesError } = await supabase
    .from("learning_evidences")
    .select("id")
    .in("dba_id", dbaIds);
  if (evidencesError) throw new Error(evidencesError.message);
  const evidenceIds = (evidences ?? []).map((e) => e.id);
  if (evidenceIds.length === 0) return [];

  const { data: exercises, error: exercisesError } = await supabase
    .from("exercises")
    .select("id, type, prompt, config")
    .in("evidence_id", evidenceIds)
    .order("order_in_evidence", { ascending: true });
  if (exercisesError) throw new Error(exercisesError.message);

  return (exercises ?? []) as Exercise[];
}
