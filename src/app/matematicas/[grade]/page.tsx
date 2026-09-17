import Link from "next/link";
import { notFound } from "next/navigation";
import { getGradePath } from "@/lib/curriculum";
import { LearningPath } from "@/components/LearningPath";
import { DemoBanner } from "@/components/DemoBanner";

export default async function GradePage({ params }: { params: Promise<{ grade: string }> }) {
  const { grade: gradeParam } = await params;
  const grade = Number(gradeParam);

  if (!Number.isInteger(grade) || grade < 1 || grade > 11) {
    notFound();
  }

  const { data: nodes, isDemo } = await getGradePath(grade);
  if (nodes.length === 0) notFound();

  const listos = nodes.filter((n) => n.exerciseCount > 0).length;
  const prevGrade = grade > 1 ? grade - 1 : null;
  const nextGrade = grade < 11 ? grade + 1 : null;

  return (
    <main className="flex-1">
      {/* Barra superior fija: salir siempre está en el mismo sitio. */}
      <div className="sticky top-0 z-20 border-b-2 border-hairline bg-canvas/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 py-3">
          <Link
            href="/"
            aria-label="Volver al inicio"
            className="btn3d h-11 w-11 shrink-0 rounded-full bg-surface text-ink-muted"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M15 5 8 12l7 7"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg leading-tight text-ink">Matemáticas · {grade}º</p>
            <p className="font-sans text-xs font-bold text-ink-faint">
              {listos} de {nodes.length} temas listos para jugar
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-2xl px-4 pb-16 pt-6">
        {isDemo && <DemoBanner />}

        <LearningPath grade={grade} nodes={nodes} />

        {/* --- Saltar de grado -------------------------------------------- */}
        <nav className="mt-8 flex gap-2">
          {prevGrade && (
            <Link
              href={`/matematicas/${prevGrade}`}
              className="btn3d flex-1 bg-surface px-4 py-3 text-sm text-ink-muted"
            >
              ← {prevGrade}º
            </Link>
          )}
          {nextGrade && (
            <Link
              href={`/matematicas/${nextGrade}`}
              className="btn3d flex-1 bg-surface px-4 py-3 text-sm text-ink-muted"
            >
              {nextGrade}º →
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
