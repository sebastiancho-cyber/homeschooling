import Link from "next/link";
import { supabase } from "@/lib/supabase";

type GradeCount = { grade: number; count: number };

async function getMatematicasGrades(): Promise<GradeCount[]> {
  const { data: subject, error: subjectError } = await supabase
    .from("subjects")
    .select("id")
    .eq("slug", "matematicas")
    .single();

  if (subjectError || !subject) {
    throw new Error(subjectError?.message ?? "No se encontró el área de Matemáticas.");
  }

  const { data: dbas, error: dbasError } = await supabase
    .from("dbas")
    .select("grade")
    .eq("subject_id", subject.id);

  if (dbasError) {
    throw new Error(dbasError.message);
  }

  const counts = new Map<number, number>();
  for (const row of dbas ?? []) {
    counts.set(row.grade, (counts.get(row.grade) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([grade, count]) => ({ grade, count }))
    .sort((a, b) => a.grade - b.grade);
}

export default async function Home() {
  const grades = await getMatematicasGrades();
  const total = grades.reduce((sum, g) => sum + g.count, 0);

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint mb-3">
          Aprende en Casa · MEN Colombia
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4 text-balance">
          Matemáticas
        </h1>
        <p className="max-w-prose text-ink-muted mb-10">
          {total} derechos básicos de aprendizaje repartidos en 11 grados. Elige un grado
          para ver sus temáticas.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {grades.map(({ grade, count }) => (
            <Link
              key={grade}
              href={`/matematicas/${grade}`}
              className="group flex flex-col gap-1 rounded-xl border border-hairline bg-surface p-4 shadow-card hover:border-brand-teal transition-colors"
            >
              <span className="text-2xl font-light tabular-nums text-ink group-hover:text-brand-teal transition-colors">
                {grade}º
              </span>
              <span className="text-[10px] uppercase tracking-[0.12em] text-ink-faint">{count} DBA</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
