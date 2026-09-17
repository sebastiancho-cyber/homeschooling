"use client";

/* Ilustraciones de los ejercicios.

   No son adorno: muestran la matemática. "6" es un símbolo que hay que
   descifrar; seis helados apareciendo uno a uno es algo que se CUENTA. A los 6
   años esa diferencia es el ejercicio entero.

   La decisión que hace esto sostenible: hay un puñado de tipos por SITUACIÓN,
   no una animación por ejercicio. Son 300 ejercicios; una animación para cada
   uno no se mantiene. Cada ejercicio declara qué tipo usa y con qué datos, y
   estos siete tipos cubren el grado completo.

   Todo es CSS sobre marcado normal: ni un archivo que descargar, ni un
   temporizador de JavaScript que pueda quedar corriendo. */

export type Visual =
  /** Objetos que aparecen uno a uno. Conteo, pictogramas, cantidades. */
  | { tipo: "contar"; icono: string; cantidad: number }
  /** Dos montones que se juntan. Sumas de "tenía y le dieron". */
  | { tipo: "juntar"; icono: string; primero: number; segundo: number }
  /** Objetos en grupos iguales. Contar de 2 en 2, de 5 en 5. */
  | { tipo: "grupos"; icono: string; grupos: number; porGrupo: number }
  /** Unos aparecen y otros se van. Restas, quitar. */
  | { tipo: "quitar"; icono: string; cantidad: number; seVan: number }
  /** Dos colecciones lado a lado, con nombre. Comparar cuál tiene más. */
  | { tipo: "comparar"; icono: string; a: Lado; b: Lado }
  /** Bloques de diez y unidades sueltas. Valor posicional. */
  | { tipo: "decenas"; decenas: number; unidades: number }
  /** Barras horizontales. Datos, votaciones y medidas que se comparan. */
  | { tipo: "barras"; datos: { etiqueta: string; valor: number }[] };

type Lado = { etiqueta: string; cantidad: number };

const PASO = 110; // ms entre objeto y objeto: se alcanza a seguir con la vista.

/* Cuando la barra se llama "Rojo", la barra tiene que ser roja.
   Muchas preguntas de datos son votaciones de color favorito, y pintar "Rojo"
   de azul porque le tocó ese turno en la paleta es enseñar algo falso a un
   niño que todavía está aprendiendo a leer la etiqueta. Si el nombre no es un
   color, se reparte la paleta por turno, que para "Mango" o "Fútbol" no dice
   nada y por eso da igual. */
const COLORES: [RegExp, string][] = [
  [/^rojo|^roja/i, "bg-coral"],
  [/^azul/i, "bg-sky"],
  [/^verde/i, "bg-grass"],
  [/^amarill/i, "bg-sun"],
  [/^morad|^lila|^violeta/i, "bg-grape"],
  [/^naranja|^anaranjad/i, "bg-tangerine"],
  [/^rosad|^rosa/i, "bg-bubble"],
  [/^caf[eé]|^marr[oó]n/i, "bg-rust"],
];
const TURNOS = ["bg-sky", "bg-grape", "bg-tangerine", "bg-mint"];

function tonoDe(etiqueta: string, turno: number) {
  for (const [re, tono] of COLORES) if (re.test(etiqueta)) return tono;
  return TURNOS[turno % TURNOS.length];
}

function Icono({
  children,
  orden,
  seVa = false,
  retraso,
}: {
  children: string;
  orden: number;
  seVa?: boolean;
  /** Retraso explícito en ms, para las figuras que no van en una sola fila. */
  retraso?: number;
}) {
  return (
    <span
      className={seVa ? "rec-irse text-3xl leading-none sm:text-4xl" : "rec-aparecer text-3xl leading-none sm:text-4xl"}
      style={{ animationDelay: `${retraso ?? orden * PASO}ms` }}
      aria-hidden
    >
      {children}
    </span>
  );
}

export function Ilustracion({ visual }: { visual: Visual }) {
  if (visual.tipo === "contar") {
    return (
      <div className="flex max-w-xs flex-wrap items-center justify-center gap-1.5">
        {Array.from({ length: visual.cantidad }, (_, i) => (
          <Icono key={i} orden={i}>
            {visual.icono}
          </Icono>
        ))}
      </div>
    );
  }

  if (visual.tipo === "juntar") {
    // El segundo montón entra DESPUÉS de que el primero terminó de aparecer.
    // Ese compás es el enunciado: "tenía cuatro… y le dieron tres". Si los dos
    // montones salieran a la vez se vería una cantidad sola, no una suma.
    const espera = visual.primero * PASO + 260;
    return (
      // La fila NO se envuelve: si lo hiciera, el "+" quedaría al final de un
      // renglón y el segundo montón caería debajo, que se lee como otra cosa.
      // Lo que se envuelve es cada montón por dentro, dentro de su ancho.
      <div className="flex max-w-sm items-center justify-center gap-2">
        <span className="flex flex-wrap justify-center gap-1">
          {Array.from({ length: visual.primero }, (_, i) => (
            <Icono key={i} orden={i}>
              {visual.icono}
            </Icono>
          ))}
        </span>
        <span
          className="rec-aparecer shrink-0 font-display text-2xl text-ink-faint"
          style={{ animationDelay: `${espera - 130}ms` }}
          aria-hidden
        >
          +
        </span>
        <span className="flex flex-wrap justify-center gap-1">
          {Array.from({ length: visual.segundo }, (_, i) => (
            <Icono key={i} orden={0} retraso={espera + i * PASO}>
              {visual.icono}
            </Icono>
          ))}
        </span>
      </div>
    );
  }

  if (visual.tipo === "comparar") {
    // Las dos filas empiezan en la misma vertical y usan el mismo icono: así la
    // que sobresale es la que tiene más, y se ve antes de contar.
    return (
      <div className="flex flex-col gap-1.5">
        {[visual.a, visual.b].map((lado, fila) => (
          <div key={lado.etiqueta} className="flex items-center gap-2">
            <span className="w-16 shrink-0 text-right font-sans text-xs font-extrabold text-ink-muted">
              {lado.etiqueta}
            </span>
            <span className="flex flex-wrap gap-1">
              {Array.from({ length: lado.cantidad }, (_, i) => (
                <Icono key={i} orden={0} retraso={fila * 380 + i * 90}>
                  {visual.icono}
                </Icono>
              ))}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (visual.tipo === "grupos") {
    return (
      <div className="flex max-w-xs flex-wrap items-center justify-center gap-3">
        {Array.from({ length: visual.grupos }, (_, g) => (
          // Cada grupo va en su propia caja con borde: se ve que son montones,
          // no una fila larga de objetos sueltos.
          <span key={g} className="flex gap-1 rounded-xl border-2 border-hairline px-2 py-1">
            {Array.from({ length: visual.porGrupo }, (_, i) => (
              <Icono key={i} orden={g * visual.porGrupo + i}>
                {visual.icono}
              </Icono>
            ))}
          </span>
        ))}
      </div>
    );
  }

  if (visual.tipo === "quitar") {
    const quedan = visual.cantidad - visual.seVan;
    return (
      <div className="flex max-w-xs flex-wrap items-center justify-center gap-1.5">
        {Array.from({ length: visual.cantidad }, (_, i) => {
          const seVa = i >= quedan;
          return (
            <Icono key={i} orden={i} seVa={seVa}>
              {visual.icono}
            </Icono>
          );
        })}
      </div>
    );
  }

  if (visual.tipo === "decenas") {
    return (
      <div className="flex items-end justify-center gap-3">
        <div className="flex gap-1.5">
          {Array.from({ length: visual.decenas }, (_, d) => (
            // Una decena es UNA columna de diez celdas: el niño ve por qué se
            // llama "un diez" sin que nadie se lo explique.
            <span key={d} className="flex flex-col gap-0.5 rounded-md bg-sky/15 p-1">
              {Array.from({ length: 10 }, (_, i) => (
                <span
                  key={i}
                  className="rec-aparecer block h-1.5 w-4 rounded-sm bg-sky"
                  style={{ animationDelay: `${(d * 10 + i) * 22}ms` }}
                />
              ))}
            </span>
          ))}
        </div>
        <div className="flex max-w-[6rem] flex-wrap gap-1">
          {Array.from({ length: visual.unidades }, (_, i) => (
            <span
              key={i}
              className="rec-aparecer block h-4 w-4 rounded-sm bg-tangerine"
              style={{ animationDelay: `${(visual.decenas * 10 + i) * 40}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }

  // barras
  const max = Math.max(...visual.datos.map((d) => d.valor), 1);
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      {visual.datos.map((d, i) => (
        <div key={d.etiqueta} className="flex items-center gap-2">
          <span className="w-16 shrink-0 text-right font-sans text-xs font-extrabold text-ink-muted">
            {d.etiqueta}
          </span>
          <span className="flex h-5 flex-1 items-center">
            <span
              className={`rec-crecer h-full rounded-r-md ${tonoDe(d.etiqueta, i)}`}
              style={{ width: `${(d.valor / max) * 100}%`, animationDelay: `${i * 160}ms` }}
            />
            <span className="ml-1.5 font-display text-sm tabular-nums text-ink">{d.valor}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
