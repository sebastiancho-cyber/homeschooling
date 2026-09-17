import { supabase } from "@/lib/supabase";
import { DEMO_GRADE_COUNTS, demoDbas } from "@/lib/demo-data";

export type GradeSummary = { grade: number; count: number };
/* El tema tiene tres textos y cada uno es para alguien distinto: `titulo` y
   `resumen` son para el niño, `enunciado` es el del MEN, literal, para el adulto
   que acompaña y que algún día tiene que sustentar este trabajo ante un colegio. */
export type Dba = {
  id: string;
  num: number;
  enunciado: string;
  titulo: string | null;
  resumen: string | null;
  /* Una estación de la ruta es casi siempre un DBA del MEN. Las de tipo
     "repaso" no: no tienen ejercicios propios y arman su lección con preguntas
     de los temas que listan en `repasa`. Ver armarRepaso() en lib/exercises. */
  tipo: "dba" | "repaso";
  orden: number;
  repasa: number[] | null;
  ranuras: number | null;
};

/** `isDemo` es la señal de que esto NO vino de la base: la pantalla lo rotula. */
export type Sourced<T> = { data: T; isDemo: boolean };

/* Las consultas van envueltas porque la base puede no estar: en el plan gratuito
   de Supabase el proyecto se PAUSA solo tras unos días sin uso y su host deja de
   resolver. Antes eso tumbaba la página con un 500 en blanco; ahora se sirve
   contenido de muestra, siempre marcado como tal. */

/** Un repliegue silencioso es indepurable: si caemos a muestra, se dice por qué. */
function avisarCaida(donde: string, error: unknown) {
  console.warn(
    `[aprende-en-casa] ${donde}: sin datos de Supabase, se sirve contenido de muestra.`,
    error instanceof Error ? error.message : error,
  );
}

async function subjectId(): Promise<string> {
  const { data, error } = await supabase.from("subjects").select("id").eq("slug", "matematicas").single();
  if (error || !data) throw new Error(error?.message ?? "No se encontró el área de Matemáticas.");
  return data.id;
}

export async function getMatematicasGrades(): Promise<Sourced<GradeSummary[]>> {
  try {
    const id = await subjectId();
    const { data, error } = await supabase.from("dbas").select("grade").eq("subject_id", id);
    if (error) throw new Error(error.message);

    const counts = new Map<number, number>();
    for (const row of data ?? []) counts.set(row.grade, (counts.get(row.grade) ?? 0) + 1);
    const grades = Array.from(counts.entries())
      .map(([grade, count]) => ({ grade, count }))
      .sort((a, b) => a.grade - b.grade);

    if (grades.length === 0) throw new Error("Sin grados.");
    return { data: grades, isDemo: false };
  } catch (error) {
    avisarCaida("getMatematicasGrades", error);
    return { data: DEMO_GRADE_COUNTS, isDemo: true };
  }
}

/** Un tema de la ruta, con cuántos ejercicios tiene listos detrás. */
export type PathNode = Dba & { exerciseCount: number };

/* La ruta necesita saber qué temas ya tienen ejercicios y cuáles no: los que no
   se pintan apagados y no se pueden tocar. Es la diferencia entre una ruta de
   verdad y once botones que hacen todos lo mismo. */
export async function getGradePath(grade: number): Promise<Sourced<PathNode[]>> {
  try {
    const id = await subjectId();
    const { data: dbas, error: dbasError } = await supabase
      .from("dbas")
      .select("id, num, enunciado, titulo, resumen, tipo, orden, repasa, ranuras")
      .eq("subject_id", id)
      .eq("grade", grade)
      // Manda `orden`, no `num`: es lo que deja meter un repaso en la mitad
      // de la ruta sin renumerar los temas que ya existen.
      .order("orden", { ascending: true });
    if (dbasError) throw new Error(dbasError.message);
    if (!dbas || dbas.length === 0) throw new Error("Sin DBA.");

    const { data: evidences, error: evError } = await supabase
      .from("learning_evidences")
      .select("id, dba_id")
      .in("dba_id", dbas.map((d) => d.id));
    if (evError) throw new Error(evError.message);

    const evidenceIds = (evidences ?? []).map((e) => e.id);
    const { data: exercises, error: exError } = evidenceIds.length
      ? await supabase
          .from("exercises")
          .select("id, evidence_id, order_in_lesson")
          .in("evidence_id", evidenceIds)
      : { data: [], error: null };
    if (exError) throw new Error(exError.message);

    /* Se cuentan RANURAS, no filas. Cada pregunta tiene 3 versiones y solo se
       juega una: contar filas diría "30 ejercicios" en una lección de 10. */
    const dbaOfEvidence = new Map((evidences ?? []).map((e) => [e.id, e.dba_id]));
    const ranurasPorDba = new Map<string, Set<number>>();
    for (const ex of exercises ?? []) {
      const dbaId = dbaOfEvidence.get(ex.evidence_id);
      if (!dbaId) continue;
      const set = ranurasPorDba.get(dbaId) ?? new Set<number>();
      set.add(ex.order_in_lesson);
      ranurasPorDba.set(dbaId, set);
    }
    const countByDba = new Map<string, number>(
      Array.from(ranurasPorDba, ([dbaId, ranuras]) => [dbaId, ranuras.size] as const),
    );

    return {
      // Un repaso no tiene ejercicios propios, así que su tamaño lo declara él
      // mismo; si se contaran sus filas daría cero y la ruta lo apagaría.
      data: dbas.map((d) => ({
        ...d,
        exerciseCount: d.tipo === "repaso" ? (d.ranuras ?? 0) : (countByDba.get(d.id) ?? 0),
      })),
      isDemo: false,
    };
  } catch (error) {
    avisarCaida("getGradePath", error);
    // En muestra: los primeros temas "listos", el resto por construir — que es
    // exactamente la forma real del proyecto hoy.
    return {
      data: demoDbas(grade).map((d, i) => ({ ...d, exerciseCount: i < 4 ? 4 : 0 })),
      isDemo: true,
    };
  }
}

/* El tema tiene tres textos y cada uno es para alguien distinto: `titulo` y
   `resumen` son para el niño, `enunciado` es el del MEN, literal, para el adulto
   que acompaña y que algún día tiene que sustentar este trabajo ante un colegio. */
export type ContextoTema = { titulo: string | null; resumen: string | null; enunciado: string };

export async function getContextoTema(grade: number, num: number): Promise<ContextoTema | null> {
  try {
    const id = await subjectId();
    const { data, error } = await supabase
      .from("dbas")
      .select("titulo, resumen, enunciado")
      .eq("subject_id", id)
      .eq("grade", grade)
      .eq("num", num)
      .single();
    if (error || !data) throw new Error(error?.message ?? "Sin tema.");
    return data;
  } catch (error) {
    // Sin contexto la ayuda se degrada a los pasos del ejercicio, que ya es
    // bastante. No vale la pena tumbar la lección por esto.
    avisarCaida("getContextoTema", error);
    return null;
  }
}

export async function getGradeDbas(grade: number): Promise<Sourced<Dba[]>> {
  try {
    const id = await subjectId();
    const { data, error } = await supabase
      .from("dbas")
      .select("id, num, enunciado, titulo, resumen, tipo, orden, repasa, ranuras")
      .eq("subject_id", id)
      .eq("grade", grade)
      .order("orden", { ascending: true });
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) throw new Error("Sin DBA.");
    return { data, isDemo: false };
  } catch {
    return { data: demoDbas(grade), isDemo: true };
  }
}
