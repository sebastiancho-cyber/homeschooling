"use client";

/* La burbuja de ayuda.

   Un niño que estudia en casa no tiene a quién preguntarle. Sin esto, la app
   solo sabe decirle que se equivocó, que es la mitad inútil de enseñar.

   Tiene tres capas, y están en ese orden a propósito:

     1. Cómo se hace ESTE ejercicio — lo que el niño necesita ahora mismo.
     2. De qué se trata el tema — para el niño que quiere entender, no adivinar.
     3. Lo que dice el MEN, literal — para el adulto que acompaña y que algún día
        tiene que sustentar este trabajo ante un colegio.

   La tercera es la que hace que esto sirva para educar en casa y no solo para
   jugar. Va en letra pequeña y al final: no estorba al niño y está ahí cuando
   el acudiente la busca. */

import { useEffect, useState } from "react";
import type { Ayuda as AyudaTexto } from "@/lib/ayuda";

export type ContextoTema = {
  titulo: string | null;
  resumen: string | null;
  enunciado: string;
};

export function BotonAyuda({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Ver la ayuda de este ejercicio"
      className="btn3d h-10 w-10 shrink-0 rounded-full bg-sky text-white"
      style={{ ["--btn-depth" as string]: "3px", ["--btn-edge" as string]: "var(--sky-deep)" }}
    >
      <span className="font-display text-lg leading-none">?</span>
    </button>
  );
}

/** Los pasos, sin la hoja: se usan tal cual dentro de la tarjeta del fallo. */
export function Pasos({ ayuda }: { ayuda: AyudaTexto }) {
  return (
    <div className="flex flex-col gap-2 text-left">
      <ol className="flex flex-col gap-2">
        {ayuda.pasos.map((paso, i) => (
          <li key={i} className="flex gap-2.5">
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky font-display text-[11px] text-white"
              aria-hidden
            >
              {i + 1}
            </span>
            <span className="font-sans text-sm font-bold leading-snug text-ink">{paso}</span>
          </li>
        ))}
      </ol>
      {ayuda.ojo && (
        <p className="rounded-xl bg-sun/20 px-3 py-2 font-sans text-xs font-bold leading-snug text-ink-muted">
          <span className="font-display text-ink">Ojo: </span>
          {ayuda.ojo}
        </p>
      )}
    </div>
  );
}

export function HojaAyuda({
  abierta,
  onCerrar,
  ayuda,
  tema,
  yaRespondio,
}: {
  abierta: boolean;
  onCerrar: () => void;
  ayuda: AyudaTexto | null;
  tema?: ContextoTema;
  /** Mientras no haya respondido solo se le da la pista. Una respuesta
   *  regalada no enseña; una pista sí. */
  yaRespondio: boolean;
}) {
  // El fondo de la app no se debe poder desplazar mientras la hoja está abierta:
  // si no, el dedo arrastra la página de atrás y la hoja se siente pegada.
  useEffect(() => {
    if (!abierta) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (e: KeyboardEvent) => e.key === "Escape" && onCerrar();
    window.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = previo;
      window.removeEventListener("keydown", escape);
    };
  }, [abierta, onCerrar]);

  if (!abierta) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col justify-end">
      <button
        type="button"
        aria-label="Cerrar la ayuda"
        onClick={onCerrar}
        className="absolute inset-0 bg-ink/35"
      />
      <div className="rec-rise relative max-h-[82vh] overflow-y-auto rounded-t-3xl border-t-2 border-hairline bg-surface px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3">
        {/* El agarre: dice "esto se arrastra" sin escribirlo. */}
        <span aria-hidden className="mx-auto mb-3 block h-1.5 w-10 rounded-full bg-hairline" />

        <div className="mx-auto flex w-full max-w-md flex-col gap-5">
          {ayuda && (
            <section className="flex flex-col gap-2">
              <h2 className="font-display text-base text-ink">
                {yaRespondio ? "Cómo se hace" : "Una pista"}
              </h2>
              {yaRespondio ? (
                <Pasos ayuda={ayuda} />
              ) : (
                <p className="text-left font-sans text-sm font-bold leading-relaxed text-ink">
                  {ayuda.pista}
                </p>
              )}
            </section>
          )}

          {tema?.resumen && (
            <section className="flex flex-col gap-1.5">
              <h2 className="font-display text-base text-ink">
                {tema.titulo ?? "De qué se trata este tema"}
              </h2>
              <p className="font-sans text-sm font-bold leading-relaxed text-ink-muted">
                {tema.resumen}
              </p>
            </section>
          )}

          {tema && (
            // Para el acudiente: el texto oficial, sin retocar. Es lo que permite
            // decir "esto es el DBA tal" y que sea verdad.
            <section className="flex flex-col gap-1 border-t-2 border-hairline pt-4">
              <h3 className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-ink-faint">
                Lo que dice el Ministerio de Educación
              </h3>
              <p className="font-sans text-xs leading-relaxed text-ink-faint">{tema.enunciado}</p>
            </section>
          )}

          {!ayuda && !tema?.resumen && (
            <p className="py-6 text-center font-sans text-sm font-bold text-ink-muted">
              Este ejercicio todavía no tiene explicación.
            </p>
          )}

          <button
            type="button"
            onClick={onCerrar}
            className="btn3d w-full bg-grass px-5 py-4 text-base text-white"
            style={{ ["--btn-edge" as string]: "var(--grass-deep)" }}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

/** Estado de la hoja, para no repetirlo en cada pantalla que la use. */
export function useAyuda() {
  const [abierta, setAbierta] = useState(false);
  return { abierta, abrir: () => setAbierta(true), cerrar: () => setAbierta(false) };
}
