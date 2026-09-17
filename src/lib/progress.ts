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

const CLAVE = "aprende-en-casa:progreso:v1";

export function claveLeccion(grade: number, tema: number): string {
  return `matematicas-${grade}-${tema}`;
}

/** Las mismas cotas que muestra la pantalla final del ejercicio. */
export function estrellasPara(aciertos: number, total: number): number {
  if (total === 0) return 0;
  const pct = (aciertos / total) * 100;
  return pct >= 90 ? 3 : pct >= 60 ? 2 : pct > 0 ? 1 : 0;
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
