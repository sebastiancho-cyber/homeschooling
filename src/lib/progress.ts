"use client";

/* Progreso del estudiante.

   Vive en el navegador (localStorage), no en la base. Es una decisión con un
   costo que conviene tener presente: el avance NO viaja entre dispositivos y se
   pierde si se borran los datos del navegador. A cambio, un niño de 6 años
   empieza a jugar sin crear una cuenta ni escribir una contraseña, que es la
   barrera que mata estos productos.

   Todo lo que toca localStorage va en try/catch: en modo incógnito o con el
   almacenamiento bloqueado, leerlo LANZA en vez de devolver vacío. Un fallo ahí
   no puede tumbar la pantalla — como mucho, se pierde el progreso.

   Para mudarlo al servidor más adelante solo cambia este archivo: el resto de
   la app habla con estas cuatro funciones y no sabe dónde se guarda. */

export type ProgresoLeccion = { estrellas: number; aciertos: number; total: number };
export type Progreso = Record<string, ProgresoLeccion>;

/* La versión va en la clave a propósito. Las estrellas guardadas se calcularon
   con una escala concreta; si la escala cambia, los registros viejos dejan de
   significar lo mismo y hay que empezar de cero. Subir el número aquí es la
   forma de decirlo. v2 = escala 100/90/70, con reprobación por debajo de 70. */
const CLAVE = "aprende-en-casa:progreso:v2";

export function claveLeccion(grade: number, tema: number): string {
  return `matematicas-${grade}-${tema}`;
}

/* Cotas de calificación. En una lección de 10 preguntas se leen así:
     10/10 → 3 estrellas
      9/10 → 2 estrellas
    8 y 7  → 1 estrella
   menos de 7 → no aprueba, y la estación NO abre la siguiente.

   Van en porcentaje y no en número de errores porque las lecciones no miden
   todas lo mismo (entre 7 y 12 preguntas): la exigencia tiene que ser
   proporcional. Ojo con el borde: en una lección de 7, un solo error da 85%,
   o sea 1 estrella, mientras que en una de 10 un error da 2. Si se prefiere
   que un error valga lo mismo en todas, la regla se cambia aquí. */
export const PORCENTAJE_APROBACION = 70;

export function estrellasPara(aciertos: number, total: number): number {
  if (total === 0) return 0;
  const pct = (aciertos / total) * 100;
  if (pct >= 100) return 3;
  if (pct >= 90) return 2;
  if (pct >= PORCENTAJE_APROBACION) return 1;
  return 0;
}

/** Sin estrellas no hay aprobación: la lección queda pendiente. */
export function aprobo(aciertos: number, total: number): boolean {
  return estrellasPara(aciertos, total) > 0;
}

export function leerProgreso(): Progreso {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return {};
    const datos = JSON.parse(crudo);
    return datos && typeof datos === "object" ? (datos as Progreso) : {};
  } catch {
    return {};
  }
}

/** Guarda solo si mejora: repetir una lección y hacerlo peor no baja la nota. */
export function guardarLeccion(clave: string, resultado: ProgresoLeccion): void {
  try {
    const progreso = leerProgreso();
    const previo = progreso[clave];
    progreso[clave] = {
      estrellas: Math.max(previo?.estrellas ?? 0, resultado.estrellas),
      aciertos: Math.max(previo?.aciertos ?? 0, resultado.aciertos),
      total: resultado.total,
    };
    localStorage.setItem(CLAVE, JSON.stringify(progreso));
  } catch {
    // Sin almacenamiento el juego sigue funcionando; solo no recuerda.
  }
}
