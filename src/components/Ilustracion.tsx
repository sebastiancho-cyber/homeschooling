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

import { Figura, type NombreFigura } from "@/components/Figura";

export type Visual =
  /** Objetos que aparecen uno a uno. Conteo, pictogramas, cantidades. */
  | { tipo: "contar"; icono: string; cantidad: number }
  /** Dos montones que se juntan. Sumas de "tenía y le dieron". */
  | { tipo: "juntar"; icono: string; primero: number; segundo: number }
  /** Objetos en grupos iguales. Contar de 2 en 2, de 5 en 5. */
  | { tipo: "grupos"; icono: string; grupos: number; porGrupo: number }
  /** Unos aparecen y otros se van. Restas, quitar. */
  | { tipo: "quitar"; icono: string; cantidad: number; seVan: number }
  /** Varias colecciones alineadas, con nombre. Comparar cuál tiene más. */
  | { tipo: "comparar"; icono: string; lados: Lado[] }
  /** Una figura geométrica. Ver components/Figura.tsx. */
  | { tipo: "figura"; nombre: NombreFigura }
  /** Bloques de diez y unidades sueltas. Valor posicional. */
  | { tipo: "decenas"; decenas: number; unidades: number }
  /** Barras horizontales. Datos, votaciones y medidas que se comparan. */
  | { tipo: "barras"; datos: { etiqueta: string; valor: number }[] }
  /** Filas iguales de objetos. El dibujo ES el dato: se cuenta por montones. */
  | { tipo: "arreglo"; icono: string; filas: number; columnas: number }
  /** Dibujos que valen VARIOS. La escala se declara y se muestra abajo. */
  | { tipo: "pictograma"; icono: string; escala: number; unidad: string; datos: { etiqueta: string; valor: number }[] }
  /** Líneas: horizontal, vertical, paralelas, perpendiculares. */
  | { tipo: "lineas"; clase: "horizontal" | "vertical" | "paralelas" | "perpendiculares" };

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
  talla = "grande",
}: {
  children: string;
  orden: number;
  seVa?: boolean;
  /** Retraso explícito en ms, para los dibujos que no van en una sola fila. */
  retraso?: number;
  /** Para las colecciones largas, que si no se salen de la pantalla. */
  talla?: "grande" | "medio" | "chico";
}) {
  const tamaño =
    talla === "chico" ? "text-base sm:text-lg" : talla === "medio" ? "text-xl sm:text-2xl" : "text-3xl sm:text-4xl";
  return (
    <span
      className={`${seVa ? "rec-irse" : "rec-aparecer"} leading-none ${tamaño}`}
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
    // Todas las filas empiezan en la misma vertical y usan el mismo icono: así
    // la que sobresale es la que tiene más, y se ve antes de contar.
    //
    // Con muchos objetos el icono se achica para que las filas no se envuelvan:
    // una fila partida en dos renglones deja de servir para comparar de un
    // vistazo, que es justo lo que este dibujo existe para permitir.
    // El icono se achica según la fila más larga. Es la única manera de que
    // las filas quepan en un teléfono sin envolverse, y una fila partida en dos
    // renglones deja de servir para comparar de un vistazo, que es justo para
    // lo que existe este dibujo.
    const mayor = Math.max(...visual.lados.map((l) => l.cantidad), 1);
    const talla = mayor <= 5 ? "grande" : mayor <= 8 ? "medio" : "chico";
    let orden = 0;
    return (
      <div className="flex max-w-full flex-col gap-1.5">
        {visual.lados.map((lado) => (
          <div key={lado.etiqueta} className="flex items-center gap-1.5">
            <span className="w-14 shrink-0 text-right font-sans text-[11px] font-extrabold leading-tight text-ink-muted">
              {lado.etiqueta}
            </span>
            <span className={`flex ${talla === "grande" ? "gap-1" : "gap-0.5"}`}>
              {Array.from({ length: lado.cantidad }, (_, i) => (
                <Icono key={i} orden={0} retraso={orden++ * 55} talla={talla}>
                  {visual.icono}
                </Icono>
              ))}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (visual.tipo === "figura") {
    return <Figura nombre={visual.nombre} />;
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

  if (visual.tipo === "arreglo") {
    // Filas iguales, alineadas en columna. Puesto así, el mismo dibujo se puede
    // contar por filas o por columnas y da lo mismo — que es exactamente lo que
    // el grado 2 tiene que descubrir de la multiplicación.
    const total = visual.filas * visual.columnas;
    const talla = total <= 12 ? "grande" : total <= 25 ? "medio" : "chico";
    let orden = 0;
    return (
      <div className="flex flex-col gap-1.5">
        {Array.from({ length: visual.filas }, (_, f) => (
          <div key={f} className={`flex ${talla === "grande" ? "gap-1.5" : "gap-1"}`}>
            {Array.from({ length: visual.columnas }, (_, c) => (
              <Icono key={c} orden={0} retraso={orden++ * 70} talla={talla}>
                {visual.icono}
              </Icono>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (visual.tipo === "pictograma") {
    // Un dibujo vale varios, y eso hay que DECIRLO. Un pictograma con escala en
    // el que la escala no se ve no es un pictograma: es una cuenta mal hecha.
    // Por eso la leyenda es parte del dibujo y no un adorno debajo.
    let orden = 0;
    return (
      <div className="flex w-full max-w-xs flex-col gap-2">
        <div className="flex flex-col gap-1.5">
          {visual.datos.map((d) => (
            <div key={d.etiqueta} className="flex items-center gap-1.5">
              <span className="w-16 shrink-0 text-right font-sans text-[11px] font-extrabold leading-tight text-ink-muted">
                {d.etiqueta}
              </span>
              <span className="flex gap-1">
                {Array.from({ length: Math.round(d.valor / visual.escala) }, (_, i) => (
                  <Icono key={i} orden={0} retraso={orden++ * 70} talla="medio">
                    {visual.icono}
                  </Icono>
                ))}
              </span>
            </div>
          ))}
        </div>
        <p className="border-t border-hairline pt-1.5 text-center font-sans text-[11px] font-bold text-ink-muted">
          <span aria-hidden>{visual.icono}</span> = {visual.escala} {visual.unidad}
        </p>
      </div>
    );
  }

  if (visual.tipo === "lineas") {
    // Horizontal y vertical solo significan algo CONTRA algo: una línea suelta
    // en una hoja en blanco no es ninguna de las dos. Por eso van dentro de un
    // marco, que es el suelo y la pared contra los que se leen.
    const barra = "rec-crecer absolute rounded-full bg-sky";
    return (
      <div className="relative h-24 w-40 rounded-xl border-2 border-hairline bg-sky/5" aria-hidden>
        {visual.clase === "horizontal" && <span className={`${barra} left-4 right-4 top-1/2 h-1.5 -translate-y-1/2`} />}
        {visual.clase === "vertical" && <span className={`${barra} bottom-4 left-1/2 top-4 w-1.5 -translate-x-1/2`} />}
        {visual.clase === "paralelas" && (
          <>
            <span className={`${barra} left-4 right-4 top-7 h-1.5`} />
            <span className={`${barra} bottom-7 left-4 right-4 h-1.5`} style={{ animationDelay: "220ms" }} />
          </>
        )}
        {visual.clase === "perpendiculares" && (
          <>
            <span className={`${barra} left-4 right-4 top-1/2 h-1.5 -translate-y-1/2`} />
            <span className={`${barra} bottom-3 left-1/2 top-3 w-1.5 -translate-x-1/2`} style={{ animationDelay: "220ms" }} />
          </>
        )}
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
