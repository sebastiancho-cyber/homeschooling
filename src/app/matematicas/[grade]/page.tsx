import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Dba = { id: string; num: number; enunciado: string };

async function getGradeDbas(grade: number): Promise<Dba[]> {
  const { data: subject, error: subjectError } = await supabase
    .from("subjects")
    .select("id")
    .eq("slug", "matematicas")
    .single();

  if (subjectError || !subject) {
    throw new Error(subjectError?.message ?? "No se encontró el área de Matemáticas.");
  }

  const { data, error } = await supabase
    .from("dbas")
    .select("id, num, enunciado")
    .eq("subject_id", subject.id)
    .eq("grade", grade)
    .order("num", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export default async function GradePage({
  params,
}: {
  params: Promise<{ grade: string }>;
}) {
  const { grade: gradeParam } = await params;
  const grade = Number(gradeParam);

  if (!Number.isInteger(grade) || grade < 1 || grade > 11) {
    notFound();
  }

  const dbas = await getGradeDbas(grade);
  if (dbas.length === 0) {
    notFound();
  }

  const prevGrade = grade > 1 ? grade - 1 : null;
  const nextGrade = grade < 11 ? grade + 1 : null;

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-wider text-ink-faint hover:text-accent transition-colors"
        >
          ← Matemáticas
        </Link>

        <div className="flex items-baseline gap-3 mt-3 mb-2">
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            Grado {grade}º
          </h1>
          <span className="font-mono text-sm text-ink-faint">{dbas.length} DBA</span>
        </div>
        <p className="text-ink-soft mb-10">
          Derechos básicos de aprendizaje según el MEN (V.2, 2016).
        </p>

        <ol className="flex flex-col gap-3">
          {dbas.map((dba) => (
            <li
              key={dba.id}
              className="flex gap-4 rounded-lg border border-border-soft bg-surface border-l-4 border-l-accent p-4 shadow-sm"
            >
              <span className="font-mono text-sm font-semibold text-accent shrink-0 pt-0.5">
                {String(dba.num).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed text-ink">{dba.enunciado}</span>
            </li>
          ))}
        </ol>

        <div className="flex justify-between mt-10 font-mono text-sm">
          {prevGrade ? (
            <Link href={`/matematicas/${prevGrade}`} className="text-ink-soft hover:text-accent transition-colors">
              ← Grado {prevGrade}º
            </Link>
          ) : (
            <span />
          )}
          {nextGrade ? (
            <Link href={`/matematicas/${nextGrade}`} className="text-ink-soft hover:text-accent transition-colors">
              Grado {nextGrade}º →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </main>
  );
}
