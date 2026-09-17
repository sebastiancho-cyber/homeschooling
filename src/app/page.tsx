import Link from "next/link";
import { getMatematicasGrades } from "@/lib/curriculum";
import { DemoBanner } from "@/components/DemoBanner";
import { Logo } from "@/components/Logo";

// Cada grado recibe su propio color, en rueda. No es decoración: es lo que
// convierte una lista de once números en once destinos distintos y reconocibles
// ("el morado", "el naranja") para alguien que todavía no lee de corrido.
const TONOS = [
  { bg: "bg-sky", edge: "var(--sky-deep)", fg: "text-white" },
  { bg: "bg-grape", edge: "var(--grape-deep)", fg: "text-white" },
  { bg: "bg-tangerine", edge: "var(--tangerine-deep)", fg: "text-white" },
  { bg: "bg-mint", edge: "var(--mint-deep)", fg: "text-white" },
  { bg: "bg-bubble", edge: "var(--bubble-deep)", fg: "text-white" },
  // El amarillo con letra blanca no se lee: ahí el texto va en tinta.
  { bg: "bg-sun", edge: "var(--sun-deep)", fg: "text-ink" },
  { bg: "bg-grass", edge: "var(--grass-deep)", fg: "text-white" },
];

const PROXIMAMENTE = [
  { nombre: "Lenguaje", icono: "📚" },
  { nombre: "Ciencias", icono: "🔬" },
  { nombre: "Sociales", icono: "🌎" },
];

export default async function Home() {
  const { data: grades, isDemo } = await getMatematicasGrades();
  const total = grades.reduce((sum, g) => sum + g.count, 0);

  return (
    <main className="flex-1 relative overflow-hidden">
      {/* Manchas de color desenfocadas: dan profundidad al fondo sin competir
          con nada. `pointer-events-none` para que no estorben al tocar. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-96 overflow-hidden">
        <div className="absolute -left-16 -top-12 h-56 w-56 rounded-full bg-sky/20 blur-3xl" />
        <div className="absolute -right-12 top-10 h-64 w-64 rounded-full bg-bubble/20 blur-3xl" />
        <div className="absolute left-1/3 top-40 h-52 w-52 rounded-full bg-sun/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-2xl px-4 pb-16 pt-6 sm:px-6">
        <header className="mb-6 flex items-center gap-3">
          <Logo />
          <div className="min-w-0">
            <p className="font-display text-xl leading-none text-ink">Aprende en Casa</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-ink-faint">
              Currículo oficial · Colombia
            </p>
          </div>
        </header>

        {isDemo && <DemoBanner />}

        {/* --- Portada del área ------------------------------------------- */}
        <section className="btn3d mb-8 w-full overflow-hidden rounded-3xl bg-[linear-gradient(140deg,rgb(var(--sky)),rgb(var(--grape)))] p-0 text-left"
          style={{ ["--btn-edge" as string]: "var(--grape-deep)", ["--btn-depth" as string]: "6px" }}
        >
          <div className="relative px-5 pb-6 pt-6 sm:px-7">
            {/* Los símbolos flotando son el "tema" del área, en vez de un icono. */}
            <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
              <span className="rec-float absolute right-4 top-3 text-4xl opacity-25">+</span>
              <span className="rec-float absolute right-16 top-16 text-3xl opacity-20" style={{ animationDelay: "0.8s" }}>
                ×
              </span>
              <span className="rec-float absolute right-8 bottom-4 text-3xl opacity-20" style={{ animationDelay: "1.6s" }}>
                =
              </span>
            </div>

            <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-white/70">Área disponible</p>
            <h1 className="font-display text-4xl text-white sm:text-5xl">Matemáticas</h1>
            <p className="mt-2 max-w-sm font-sans text-sm font-bold text-white/85">
              {total} temas del currículo del MEN, de 1º a 11º, convertidos en retos cortos.
            </p>

            <Link
              href={`/matematicas/${grades[0]?.grade ?? 1}`}
              className="btn3d rec-bounce mt-5 bg-white px-6 py-3 text-base text-ink"
              style={{ ["--btn-edge" as string]: "var(--depth)" }}
            >
              ¡Empezar!
            </Link>
          </div>
        </section>

        {/* --- Los once grados -------------------------------------------- */}
        <section>
          <h2 className="mb-3 px-1 font-display text-lg text-ink">Elige tu grado</h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {grades.map(({ grade, count }, i) => {
              const tono = TONOS[i % TONOS.length];
              return (
                <Link
                  key={grade}
                  href={`/matematicas/${grade}`}
                  className={`btn3d no-select aspect-square flex-col gap-0.5 ${tono.bg} ${tono.fg}`}
                  style={{ ["--btn-edge" as string]: tono.edge }}
                >
                  <span className="font-display text-3xl leading-none tabular-nums">{grade}º</span>
                  <span className="font-sans text-[11px] font-extrabold opacity-80">{count} temas</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* --- Lo que todavía no existe, dicho sin adornos ----------------- */}
        <section className="mt-10">
          <h2 className="mb-3 px-1 font-display text-lg text-ink">Muy pronto</h2>
          <div className="grid grid-cols-3 gap-3">
            {PROXIMAMENTE.map(({ nombre, icono }) => (
              <div
                key={nombre}
                className="card3d flex flex-col items-center gap-1 px-2 py-4 opacity-60"
              >
                <span aria-hidden className="text-2xl grayscale">
                  {icono}
                </span>
                <span className="font-display text-sm text-ink-muted">{nombre}</span>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-10 text-center font-sans text-xs font-bold text-ink-faint">
          Hecho para familias que aprenden en casa 🇨🇴
        </p>
      </div>
    </main>
  );
}
