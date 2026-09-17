"use client";

import { ELENCO, Mascota } from "@/components/Mascota";

/* Banco de trabajo del elenco: los diez personajes en sus tres estados, de un
   vistazo. No es una pantalla del producto — es la herramienta para decidir
   cambios sin tener que ir respondiendo ejercicios hasta que salga el que uno
   quiere ver. Va numerada para poder señalar "el 4" sin describirlo. */

const ESTADOS = [
  { animo: "idle" as const, rotulo: "normal" },
  { animo: "happy" as const, rotulo: "acierto" },
  { animo: "sad" as const, rotulo: "error" },
];

export default function ElencoPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="font-display text-2xl text-ink">Elenco</h1>
      <p className="mb-6 font-sans text-sm font-bold text-ink-muted">
        {ELENCO.length} personajes · normal · acierto · error
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {ELENCO.map((p, i) => (
          <div key={p.nombre} className="card3d px-3 py-3">
            <div className="mb-1 flex items-baseline gap-2">
              <span className="font-display text-sm tabular-nums text-ink-faint">
                {String(i).padStart(2, "0")}
              </span>
              <span className="font-display text-base text-ink">{p.nombre}</span>
            </div>
            <div className="flex items-end justify-around">
              {ESTADOS.map(({ animo, rotulo }) => (
                <div key={rotulo} className="flex flex-col items-center">
                  <Mascota personaje={i} animo={animo} size={80} />
                  <span className="font-sans text-[10px] font-extrabold uppercase tracking-wider text-ink-faint">
                    {rotulo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
